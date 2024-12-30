"use client";

import { LogInIcon } from "lucide-react";

// import { useUserContext } from "@/context/UserContext";
// import { useRouter } from "next/navigation";

export default function Home() {

  return (
    <div>
<h1>Start by creating your account</h1>
<svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.34 0 6.17 1.19 8.49 3.13l6.36-6.36C35.41 3.18 30.11 1 24 1 14.73 1 7.13 6.48 3.7 14.15l7.69 5.93C13.06 14.24 17.92 9.5 24 9.5z"
                />
                <path
                  fill="#4285F4"
                  d="M46.1 24.5c0-1.63-.15-3.21-.43-4.72H24v9h12.7c-.61 3.06-2.49 5.66-5.31 7.43l7.62 5.89c4.45-4.1 7.09-10.15 7.09-17.6z"
                />
                <path
                  fill="#FBBC04"
                  d="M12.9 29.85C11.97 27.9 11.5 25.76 11.5 23.5s.47-4.4 1.4-6.35L5.2 11.22C3.4 14.58 2.5 18.34 2.5 23c0 4.66.9 8.42 2.7 11.78l7.7-5.93z"
                />
                <path
                  fill="#34A853"
                  d="M24 46c6.11 0 11.29-2.01 15.06-5.45l-7.62-5.89c-2.1 1.4-4.79 2.24-7.44 2.24-6.07 0-11.23-4.04-13.06-9.47l-7.69 5.93C7.13 41.52 14.73 46 24 46z"
                />
                <path fill="none" d="M2 2h44v44H2z" />
              </svg>

              <button
                className="bg-white text-xl p-2 rounded flex gap-2 items-center border-2 border-black hover:text-2xl"
                // onClick={log}
              >
                <LogInIcon />
                Sign In with Google
              </button>
    </div>
  );
}
