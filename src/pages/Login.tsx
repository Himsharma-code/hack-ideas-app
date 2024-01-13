"use client";
import { useState } from "react";
import { Card, Input, Button } from "@nextui-org/react";

const Login = () => {
  const [employeeId, setEmployeeId] = useState("");

  const handleLogin = () => {
    // Add any login logic here
    // For simplicity, just pass the employeeId to the onLogin callback
    // onLogin(employeeId);
  };

  return (
    <div className="flex justify-center">
      <Card className="max-w-[500px] w-full p-6 bg-gray-800 text-white rounded-md">
        <h1 className="text-2xl font-bold mb-4">Hack Ideas</h1>
        <Input
          label="Employee ID"
          // placeholder="Employee ID"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          className="mb-4"
        />
        <Button onClick={handleLogin}>Login</Button>
      </Card>
    </div>
  );
};

export default Login;
