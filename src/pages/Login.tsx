"use client";
import React, { useState } from "react";
import { Card, Input, Button } from "@nextui-org/react";
import { request } from "@/utils/request";
import { useRouter } from "next/navigation";

const Login = () => {
  const [employeeId, setEmployeeId] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await request("/api/users/login", "POST", {
        employeeId,
      });

      if (response.success) {
        sessionStorage.setItem("token", response?.data?.token || "");
        router.push("/dashboard");
      } else {
        console.error(response.error);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="flex justify-center">
      <Card className="max-w-[500px] w-full p-6 bg-gray-800 text-white rounded-md">
        <h1 className="text-2xl font-bold mb-4">Hack Ideas</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <Input
            label="Employee ID"
            // placeholder="Employee ID"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            className="mb-4"
          />
          <Button type="submit">Login</Button>
        </form>
      </Card>
    </div>
  );
};

export default Login;
