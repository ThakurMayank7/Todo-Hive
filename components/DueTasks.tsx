import React from "react";
import NumberTicker from "./ui/number-ticker";
import { useUserContext } from "@/context/UserContext";

function DueTasks() {

const {userData}=useUserContext();

  return (
    <div className="w-full h-full bg-amber-400 rounded p-2 shadow-sm">DueTasks
    <p className="whitespace-pre-wrap text-8xl font-medium tracking-tighter text-black dark:text-white">
      <NumberTicker value={userData?.tasks.map((task)=>{
        
        
        
        return
        ()
      })} />
    </p>
    </div>
  );
}

export default DueTasks;
