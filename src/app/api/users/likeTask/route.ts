// pages/api/likeTask.ts
import { NextApiResponse } from "next";
import connectDB from "@/db";
import User from "@/models/userModal";
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { secretKey } from "@/utils/constants";

// Connect to the MongoDB database
connectDB();

export async function POST(req: NextRequest, res: NextApiResponse) {
  try {
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ error: "Unauthorized: Token missing" });
    }

    const decodedToken: any = jwt.verify(token, secretKey); // Replace with your actual secret key

    const { taskId, is_liked } = await req.json();

    if (!taskId || typeof is_liked !== "boolean") {
      return res.status(400).json({ error: "Invalid request data" });
    }

    // Find the user and the task by taskId
    const user = await User.findOne({
      employeeId: decodedToken.employeeId,
    });

    if (!user) {
      return res.status(404).json({ error: "User or Task not found" });
    }

    const task = user.tasks.find((t: any) => t.id.toString() === taskId);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Update likes count and likedBy array based on is_liked value
    if (is_liked) {
      task.likes += 1;

      if (!task.likedBy.includes(user.employeeId)) {
        task.likedBy.push(user.employeeId);
      }
    } else {
      task.likes -= 1;
      task.likedBy = task.likedBy.filter((id: any) => id !== user.employeeId);
    }

    // Save the updated user document
    await user.save();

    return res
      .status(200)
      .json({ success: true, message: "Task liked successfully" });
  } catch (error) {
    console.error("Error liking task:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
