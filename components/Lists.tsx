"use client";

import { useUserContext } from "@/context/UserContext";
import React from "react";
import { Separator } from "./ui/separator";

function Lists() {
  const { userData } = useUserContext();

  return (
    <div>
      <h1 className="text-center text-xl">Lists</h1>
      <Separator className="my-2" />

      <div className="p-2 flex flex-col gap-1 text-black">
        {userData &&
          userData.lists.map((list, index) => (
            <button
              key={index}
              className="bg-white p-1 hover:bg-gray-200 hover:font-semibold border-black border shadow-sm shadow-black"
            >
              {list}
            </button>
          ))}
      </div>
    </div>
  );
}

export default Lists;
