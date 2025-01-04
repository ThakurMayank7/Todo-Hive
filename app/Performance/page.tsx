"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";


import { useUserContext } from "@/context/UserContext";
import WeekPerformanceBarChart from "@/components/WeekPerformanceBarChart";

function PerformancePage() {
  const { userData } = useUserContext();

  



  

  if(!userData?.tasks){
    return <div><h1>Not Enough Data to Show</h1></div>
  }

  return (
    <ScrollArea>
      <WeekPerformanceBarChart tasks={userData.tasks}/>
    </ScrollArea>
  );
}

export default PerformancePage;
