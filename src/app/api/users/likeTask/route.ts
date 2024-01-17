// pages/api/likeTask.ts
import connectDB from "@/db";
import User from "@/models/userModal";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { secretKey } from "@/utils/constants";

// Connect to the MongoDB database
connectDB();

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized: Token missing" },
        { status: 401 }
      );
    }

    const decodedToken: any = jwt.verify(token, secretKey); // Replace with your actual secret key

    const { id, is_liked } = await req.json();

    if (!id || typeof is_liked !== "boolean") {
      return NextResponse.json(
        { error: "Invalid request data" },
        { status: 400 }
      );
    }

    // Update likes count and likedBy array based on is_liked value directly in the database
    const updatedUser = await User.findOneAndUpdate(
      { "tasks.id": id },
      {
        $inc: { "tasks.$.likes": is_liked ? 1 : -1 },
        [is_liked ? "$addToSet" : "$pull"]: {
          "tasks.$.likedBy": decodedToken.employeeId,
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { error: "User or Task not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Task liked successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error liking task:", error);
    return NextResponse.json(
      { error: `Internal Server Error` },
      { status: 500 }
    );
  }
}
