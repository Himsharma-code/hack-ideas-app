// Import necessary modules and configurations
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "@/db";
import User from "@/models/userModal";
const secretKey = "yourSecretKey";

// Connect to the MongoDB database
connectDB();

// Handle GET request to retrieve user data with the provided token
export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decodedToken: any = jwt.verify(token, secretKey);

    // Use findOne instead of findById to query by employeeId
    const user = await User.findOne({
      employeeId: decodedToken.employeeId,
    }).select("-__v -_id");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ data: { user }, success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
