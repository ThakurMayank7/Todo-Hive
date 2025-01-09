"use client";

import React from "react";
import SearchBar from "./SearchBar";
import SidebarOptions from "./SidebarOptions";
import Lists from "./Lists";
import { Separator } from "./ui/separator";
import { useRouter } from "next/navigation";
import Tags from "./Tags";
import { ScrollArea } from "./ui/scroll-area";

function Sidebar() {
  const router = useRouter();

  return (
    <ScrollArea className="h-full bg-gray-700 border-2 border-teal-900 shadow-md shadow-black rounded-r-lg w-60 text-white p-4 flex flex-col">
      <SearchBar />
      <br />
      <SidebarOptions />
      <br />
      <Lists />
      <br />
      <Tags />
      <div className="mt-auto flex flex-col gap-2">
        <Separator className="mt-20" />
        <button
          className="border border-black text-2xl bg-gray-100 text-black p-2 hover:font-semibold hover:bg-gray-200"
          onClick={() => router.push("/Settings")}
        >
          Settings
        </button>
        <button className="border border-red-950 text-lg bg-red-500 p-1 rounded hover:font-semibold hover:bg-red-600">
          Sign Out
        </button>
      </div>
    </ScrollArea>
  );
}

export default Sidebar;
