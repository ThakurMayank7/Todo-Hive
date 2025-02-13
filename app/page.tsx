"use client";

import { signInWithGoogle, signOutUser } from "@/firebase/auth";
import GoogleIcon from "@/icons/GoogleIcon";
import { LogInIcon } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { createNewUser } from "@/actions/actions";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import Spinner from "@/components/Spinner";

export default function Home() {
  const router = useRouter();

  const { loading, user } = useAuth();

  useEffect(() => {
    if (user && !loading && user.email && user.displayName && user.photoURL) {
      interface User {
        uid: string;
        email: string;
        name: string;
        photoUrl: string;
      }

      const newUser: User = {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        photoUrl: user.photoURL,
      };

      const createAccount = async () => {
        const userSnapshot = await getDoc(doc(db, "users", user.uid));

        if (userSnapshot.exists()) {
        } else {
          const result = await createNewUser(newUser);
          if (result) {
            router.push("/Home");
          } else {
            signOutUser();
          }
        }
      };
      createAccount();
    }
  }, [user, loading, router]);

  return (
    <div>
      {user?
    <div>
      <h1>Redirecting you to Home Page...</h1>
      <Spinner/>
    </div>
    
    :  
    <>
      <h1>Start by creating your account</h1>
      <GoogleIcon />

      <button
      className="bg-white text-xl p-2 rounded flex gap-2 items-center border-2 border-black hover:text-2xl"
      onClick={() => signInWithGoogle()}
      >
        <LogInIcon />
        Sign In with Google
      </button>
    </>
      }
    </div>
  );
}
