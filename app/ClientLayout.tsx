"use client";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useAuth } from "@/hooks/useAuth";
import React, { useEffect } from "react";

function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (user && !loading) {
      // fetch initially here
    }
  }, [user, loading]);

  if (loading) {
    return <p>loading...</p>;
  }

  return (
    <>
      {user && !loading && <Header />}
      <main className="flex flex-row mt-2 h-screen w-screen">
        <>
          <Sidebar />
        </>

        <div className="mx-2 bg-teal-600 border-2 border-teal-900 flex-1 p-4 rounded-lg shadow-lg shadow-black h-full w-full">
          <>{children}</>
        </div>
      </main>
    </>
  );
}

export default ClientLayout;
