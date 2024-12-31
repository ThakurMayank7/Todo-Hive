"use client";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useUserContext } from "@/context/UserContext";
import { db } from "@/firebase/firebaseConfig";
import { useAuth } from "@/hooks/useAuth";
import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useRef } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface Task {
  uid: string;
  taskName: string;
  taskDescription?: string;
  list: string;
  dueDate: Date;
  tags?: string[];
  subTasks?: { sTask: string; sStatus: boolean }[];
  status: boolean;
  createdAt: Date;
}

interface UserData {
  tasks: Task[];
  lists: string[];
  tags: string[];
}

function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, loading } = useAuth();

  const { updateUserData } = useUserContext();

  const updateUserDataRef = useRef(updateUserData);

  useEffect(() => {
    updateUserDataRef.current = updateUserData;
  }, [updateUserData]);

  useEffect(() => {
    if (user && !loading) {
      const unsubscribe = onSnapshot(
        doc(db, "userData", user.uid),
        (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.data();
            console.log("Snapshot data received:", data);

            const userData: UserData = {
              tasks: data.tasks || [],
              lists: data.lists || [],
              tags: data.tags || [],
            };

            // Use the current ref to call the function
            updateUserDataRef.current(userData);
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
