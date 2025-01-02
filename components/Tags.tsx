"use client";

import React from "react";
import { Separator } from "./ui/separator";
import { useUserContext } from "@/context/UserContext";

function Tags() {
  const { userData } = useUserContext();

  return (
    <div>
      <h1 className="text-center text-xl">Tags</h1>
      <Separator className="my-2" />
      <div className="flex-1 text-black">
        {userData &&
          userData.tags.map((tag, index) => (
            <button
              key={index}
              className="bg-white p-1 text-sm rounded border border-black hover:bg-gray-200 hover:font-semibold m-0.5"
            >
              {tag}
            </button>
          ))}
      </div>
    </div>
  );
}

export default Tags;
