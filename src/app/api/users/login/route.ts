// Import necessary modules and configurations
import User from "@/models/userModal";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "@/db";
const secretKey = "yourSecretKey";

// Connect to the MongoDB database
connectDB();

// Handle POST request for login or create new user
export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const reqBody = await request.json();
    const { employeeId } = reqBody;

    // Find or create user with the given employeeId
    let user = await User.findOne({ employeeId });

    if (!user) {
      // If user does not exist, create a new one
      user = await User.create({ employeeId, tasks: [] });
    }

    // Create token data
    const tokenData = {
      id: user._id,
      employeeId: user.employeeId,
    };

    // Create token
    const token = await jwt.sign(tokenData, secretKey, {
      expiresIn: "1d",
    });

    // Create response with success message and set token as a cookie
    const response = NextResponse.json({
      data: { token },
      message: "Login successful",
      success: true,
    });

    return response;
  } catch (error: any) {
    // Handle any unexpected errors
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
