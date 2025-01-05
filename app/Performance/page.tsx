"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useEffect, useState } from "react";

import { useUserContext } from "@/context/UserContext";
import WeekPerformanceBarChart from "@/components/WeekPerformanceBarChart";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";

function PerformancePage() {
  const { userData } = useUserContext();

  const { user, loading } = useAuth();

  const router = useRouter();

  const [redirecting, setRedirecting] = useState<boolean>(false);

  useEffect(() => {
    if (!user && !loading) {
      setRedirecting(true);
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading || redirecting) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  if (!userData?.tasks) {
    return (
      <div>
        <h1>Not Enough Data to Show</h1>
      </div>
    );
  }

  return (
    <ScrollArea>
      <WeekPerformanceBarChart tasks={userData.tasks} />
    </ScrollArea>
  );
}

export default PerformancePage;
