"use client";

import { useUserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import React from "react";

function HomePage() {
  const { user, updateUser } = useUserContext();

  const router = useRouter();

  const update = () => {
    updateUser({ name: "this just this" });
  };

  return (
    <div>
      <p>{user?.name} here</p>

      {/* Call the update function by adding parentheses */}
      <button onClick={update}>Update</button>
      <button onClick={() => router.push("/")}>navigate</button>
    </div>
  );
}

export default HomePage;
