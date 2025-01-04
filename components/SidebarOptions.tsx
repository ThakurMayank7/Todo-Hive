import React from "react";

function SidebarOptions() {
  return (
    <div className="flex flex-col gap-1">
      <button className="bg-white text-black p-2 border-2 border-black shadow-gray-500 shadow-md hover:cursor-pointer hover:bg-gray-100 hover:font-bold font-semibold">
        Upcoming
      </button>
      <button className="bg-white text-black p-2 border-2 border-black shadow-gray-500 shadow-md hover:cursor-pointer hover:bg-gray-100 hover:font-bold font-semibold">
        Today
      </button>
      <button className="bg-white text-black p-2 border-2 border-black shadow-gray-500 shadow-md hover:cursor-pointer hover:bg-gray-100 hover:font-bold font-semibold">
        Performance
      </button>
      <button className="bg-white text-black p-2 border-2 border-black shadow-gray-500 shadow-md hover:cursor-pointer hover:bg-gray-100 hover:font-bold font-semibold">
        Calender
      </button>
      <button className="bg-white text-black p-2 border-2 border-black shadow-gray-500 shadow-md hover:cursor-pointer hover:bg-gray-100 hover:font-bold font-semibold">
        Sticky Wall
      </button>
    </div>
  );
}

export default SidebarOptions;
