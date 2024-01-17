// pages/api/addTask.ts
import { NextApiResponse } from "next";
import connectDB from "@/db";
import User from "@/models/userModal";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { secretKey } from "@/utils/constants";

// Connect to the MongoDB database
connectDB();

// Function to generate a unique identifier
const generateUniqueId = () => {
  const timestamp = Date.now().toString(36);
  const randomString = Math.random().toString(36).substr(2, 5);
  return `${timestamp}${randomString}`;
};

export async function POST(req: NextRequest, res: NextApiResponse) {
  try {
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decodedToken: any = jwt.verify(token, secretKey);

    const { taskData } = await req.json();

    if (!taskData) {
      return res.status(400).json({ error: "Invalid request data" });
    }

    const user = await User.findOne({
      employeeId: decodedToken.employeeId,
    }).select("-__v -_id");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.tasks.push({ ...taskData, id: generateUniqueId() });
    await user.save();

    return res
      .status(200)
      .json({ success: true, message: "Task added successfully" });
  } catch (error) {
    console.error("Error adding task:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
