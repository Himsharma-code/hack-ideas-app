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

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decodedToken: any = jwt.verify(token, secretKey);

    const { taskData } = await req.json();

    if (!taskData) {
      return NextResponse.json(
        { error: "Invalid request data" },
        { status: 400 }
      );
    }

    const user = await User.findOne({
      employeeId: decodedToken.employeeId,
    }).select("-__v -_id");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    user.tasks.push({ ...taskData, id: generateUniqueId() });
    await user.save();

    return NextResponse.json(
      { success: true, message: "Task added successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding task:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
