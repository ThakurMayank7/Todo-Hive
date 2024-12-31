"use client";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useUserContext } from "@/context/UserContext";
import { db } from "@/firebase/firebaseConfig";
import { useAuth } from "@/hooks/useAuth";
import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
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

  const [initialFetched, setInitialFetched] = useState<boolean>(false);

  useEffect(() => {
    if (user && !initialFetched) {
      console.log("reached here 1");
      setInitialFetched(true);
      // Real-time listener
      const unsubscribe = onSnapshot(
        doc(db, "userData", user.uid),
        (snapshot) => {
          console.log("I have reached here");
          if (snapshot.exists()) {
            const data = snapshot.data();

            console.log("Snapshot data received:", data);

            const userData: UserData = {
              tasks: data.tasks || [],
              lists: data.lists || [],
              tags: data.tags || [],
            };

            updateUserData(userData);
          } else {
            console.warn("No userData found for the user.");
          }
        },
        (error) => {
          console.error("Error listening to userData:", error);
        }
      );

      // Cleanup on unmount
      return () => unsubscribe();
    }
  }, [user, updateUserData, initialFetched]);

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
