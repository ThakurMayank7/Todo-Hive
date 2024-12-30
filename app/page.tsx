"use client";

import { signInWithGoogle } from "@/firebase/auth";
import GoogleIcon from "@/icons/GoogleIcon";
import { LogInIcon } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  const { loading, user } = useAuth();

  useEffect(() => {
    if (user && !loading) {
      router.push("/Home");
    }
  }, [user, loading, router]);

  return (
    <div>
      <h1>Start by creating your account</h1>
      <GoogleIcon />

      <button
        className="bg-white text-xl p-2 rounded flex gap-2 items-center border-2 border-black hover:text-2xl"
        onClick={() => signInWithGoogle()}
      >
        <LogInIcon />
        Sign In with Google
      </button>
    </div>
  );
}
