"use client";

import React from "react";
import { Separator } from "./ui/separator";
import { useUserContext } from "@/context/UserContext";
import { Plus } from "lucide-react";
import AddNewTagDialog from "./AddNewTagDialog";

function Tags() {
  const { userData } = useUserContext();

  return (
    <div>
      <div className="flex">
        <span className="text-xl mx-auto">Tags</span>
        <div className="">
          <AddNewTagDialog>
            <button className="bg-white p-1 text-sm rounded border border-black hover:bg-gray-200 hover:font-semibold m-0.5">
              <Plus color="black" size="24" />
            </button>
          </AddNewTagDialog>
        </div>
      </div>
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
