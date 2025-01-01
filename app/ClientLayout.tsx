"use client";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useUserContext } from "@/context/UserContext";
import { db } from "@/firebase/firebaseConfig";
import { useAuth } from "@/hooks/useAuth";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useRef } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Task, UserData } from "@/lib/types";

function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, loading } = useAuth();

  const { userData, updateUserData } = useUserContext();

  const updateUserDataRef = useRef(updateUserData);

  useEffect(() => {
    updateUserDataRef.current = updateUserData;
  }, [updateUserData]);

  useEffect(() => {
    if (user && !loading) {
      const unsubscribe = onSnapshot(
        doc(db, "userData", user.uid),
        async (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.data();
            console.log("Snapshot data received:", data);

            const taskIds: string[] = data.tasks;

            // Check for tasks not already in userData
            const existingTaskIds = new Set(
              userData?.tasks.map((task) => task.taskId)
            );
            const newTaskIds = taskIds.filter((id) => !existingTaskIds.has(id));

            console.log("Fetching new tasks for IDs:", newTaskIds);

            const tasksToPush = await Promise.all(
              newTaskIds.map(async (taskId) => {
                const taskSnapshot = await getDoc(doc(db, "tasks", taskId));
                if (taskSnapshot.exists()) {
                  const taskData = taskSnapshot.data();
                  return {
                    uid: taskData.uid,
                    taskName: taskData.taskName,
                    taskDescription: taskData.taskDescription,
                    list: taskData.list,
                    dueDate: taskData.dueDate?.toDate?.() || null, // Check if `dueDate` exists and is a Firestore Timestamp
                    tags: taskData.tags,
                    subTasks: taskData.subTasks,
                    status: taskData.status,
                    createdAt: taskData.createdAt?.toDate?.() || new Date(), // Default to current date if missing
                    taskId,
                  } as Task;
                }
                return null; // Return null if taskSnapshot does not exist
              })
            );

            // Filter out null values
            const validTasks: Task[] = tasksToPush.filter(
              (task): task is Task => task !== null
            );

            console.log("New tasks fetched:", validTasks);

            // Update userData
            updateUserDataRef.current({
              tasks: [...(userData?.tasks || []), ...validTasks],
              lists: data.lists || [],
              tags: data.tags || [],
            });
          } else {
            console.warn("No userData found for the user.");
          }
        }
      );

      return () => unsubscribe();
    }
  }, [user, loading]);
  if (loading) {
    return <p>loading...</p>;
  }

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {user && !loading && <Header />}
        <main className="flex flex-row mt-2 h-screen w-screen">
          <>
            <Sidebar />
          </>
          <div className="mx-2 bg-teal-600 border-2 border-teal-900 flex-1 p-4 rounded-lg shadow-lg shadow-black h-full w-full">
            <>{children}</>
          </div>
        </main>
      </LocalizationProvider>
    </>
  );
}

export default ClientLayout;
