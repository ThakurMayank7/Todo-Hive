"use client";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useUserContext } from "@/context/UserContext";
import { db } from "@/firebase/firebaseConfig";
import { useAuth } from "@/hooks/useAuth";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Task, UserData } from "@/lib/types";
import Spinner from "@/components/Spinner";

function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, loading } = useAuth();

  const { userData, updateUserData } = useUserContext();

  const updateUserDataRef = useRef(updateUserData);

  const [fetching, setFetching] = useState<boolean>(false);

  const latestUserDataRef = useRef<UserData | null>(null);

  // Sync the ref with the latest userData whenever it changes
  useEffect(() => {
    latestUserDataRef.current = userData;
  }, [userData]);

  useEffect(() => {
    updateUserDataRef.current = updateUserData;
  }, [updateUserData]);

  useEffect(() => {
    if (user && !loading) {
      setFetching(true);
      const unsubscribe = onSnapshot(
        doc(db, "userData", user.uid),
        async (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.data();

            const taskIds: string[] = data.tasks;
            const latestUserData = latestUserDataRef.current;
            // Check for tasks not already in userData
            const existingTaskIds = new Set(
              latestUserData?.tasks.map((task) => task.taskId)
            );
            const newTaskIds = taskIds.filter((id) => !existingTaskIds.has(id));

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

            // Update userData
            updateUserDataRef.current({
              tasks: [...(latestUserData?.tasks || []), ...validTasks],
              lists: data.lists || [],
              tags: data.tags || [],
            });
            setFetching(false);
          } else {
            console.warn("No userData found for the user.");
          }
        }
      );

      const unsubscribeUpdateListener = onSnapshot(
        doc(db, "taskUpdates", user.uid),
        async (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.data();
            const taskId: string = data.taskId;

            console.log("taskUpdates data:", data);

            const latestUserData = latestUserDataRef.current;
            console.log(
              "tasks existing in latestUserDataRef:",
              latestUserData?.tasks
            );

            if (taskId && latestUserData) {
              try {
                // Fetch updated task
                const taskDocRef = doc(db, "tasks", taskId);
                const taskSnapshot = await getDoc(taskDocRef);

                if (taskSnapshot.exists()) {
                  const updatedTask = taskSnapshot.data();

                  console.log("Updated task:", updatedTask);

                  const tasksToPush = latestUserData.tasks.map((task: Task) => {
                    if (task.taskId === taskId) {
                      return {
                        ...task,
                        uid: updatedTask.uid,
                        taskName: updatedTask.taskName,
                        taskDescription: updatedTask.taskDescription,
                        list: updatedTask.list,
                        dueDate: updatedTask.dueDate?.toDate?.() || null,
                        tags: updatedTask.tags,
                        subTasks: updatedTask.subTasks,
                        status: updatedTask.status,
                        createdAt:
                          updatedTask.createdAt?.toDate?.() || new Date(),
                        taskId,
                      };
                    }
                    return task;
                  });

                  console.log("Tasks to push:", tasksToPush);

                  // Update user data
                  updateUserDataRef.current({
                    tasks: tasksToPush,
                  });
                } else {
                  console.warn(`Task with ID ${taskId} not found.`);
                }
              } catch (error) {
                console.error("Error fetching updated task:", error);
              }
            }
          } else {
            console.warn("No updates found for the user.");
          }
        },
        (error) => {
          console.error("Error listening to taskUpdates:", error);
        }
      );

      return () => {
        unsubscribe();
        unsubscribeUpdateListener();
      };
    }
  }, [user, loading]);
  if (loading || fetching) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <main className="h-screen">
          {user && !loading && <Header />}
          <div className="h-[90vh] pt-2">
            <div className="flex flex-row h-full">
              <Sidebar />
              <div className="mx-2 bg-white border-2 border-teal-900 flex-1 p-4 rounded-lg shadow-lg shadow-black h-full w-full">
                <>{children}</>
              </div>
            </div>
          </div>
        </main>
      </LocalizationProvider>
    </>
  );
}

export default ClientLayout;
