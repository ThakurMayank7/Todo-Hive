"use client";

import { useUserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user, updateUser } = useUserContext();

  const router = useRouter();

  const update = () => {
    updateUser({ name: "this is new name" });
  };

  return (
    <div>
      <p>{user?.name} here</p>

      {/* Call the update function by adding parentheses */}
      <button onClick={update}>Update</button>
      <button onClick={() => router.push("/Home")}>navigate</button>
    </div>
  );
}
