"use client";

import Spinner from "@/components/Spinner";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function SettingsPage() {
  const { user, loading } = useAuth();

  const router = useRouter();

  const [redirecting, setRedirecting] = useState<boolean>(false);

  useEffect(() => {
    if (!user && !loading) {
      setRedirecting(true);
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading || redirecting) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return <div>SettingsPage</div>;
}

export default SettingsPage;
