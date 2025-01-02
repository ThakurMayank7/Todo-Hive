"use client";

import { useRouter } from "next/navigation";
import React from "react";

function Header() {
  const router = useRouter();

  return (
    <header className="bg-teal-600 h-14 flex items-center justify-center rounded-b-lg shadow-md shadow-black">
      <span
        className="text-4xl text-teal-900 font-semibold hover:cursor-pointer"
        onClick={() => router.push("/Home")}
      >
        Task Hive
      </span>
    </header>
  );
}

export default Header;
