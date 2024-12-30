import React from "react";
import SearchBar from "./SearchBar";
import SidebarOptions from "./SidebarOptions";
import Lists from "./Lists";

function Sidebar() {
  return (
    <div className="min-h-screen bg-teal-600 border-2 border-teal-900 shadow-md shadow-black rounded-r-lg w-60 text-white p-4">
      <SearchBar />
      <br />
      <SidebarOptions />
      <br />
      <Lists />
    </div>
  );
}

export default Sidebar;
