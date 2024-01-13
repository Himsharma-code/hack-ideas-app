import Login from "@/pages/Login";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex gap-2 min-h-screen flex-col  p-12">
      <Login />
    </main>
  );
}
