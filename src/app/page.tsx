"use client";
import Login from "@/pages/Login";
import { isLoggedIn } from "@/utils/isLoggedIn";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn()) {
      router.push("/dashboard");
    }
  }, []);

  return (
    <main className="flex gap-2 min-h-screen flex-col  p-12">
      <Login />
    </main>
  );
}
