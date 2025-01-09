"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IoMdSearch } from "react-icons/io";

function SearchBar() {
  return (
    <aside>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          className="bg-white text-black"
          type="search"
          placeholder="Search..."
        />
        <Button
          className="bg-gray-200 text-black hover:text-white"
          type="submit"
        >
          <IoMdSearch />
        </Button>
      </div>
    </aside>
  );
}

export default SearchBar;
