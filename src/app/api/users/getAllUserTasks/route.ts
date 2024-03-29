import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/db";
import User from "@/models/userModal";

// Connect to the MongoDB database
connectDB();

// Handle GET request to retrieve tasks for all users using aggregation pipeline
export async function GET(request: NextRequest) {
  try {
    // Use aggregation pipeline to retrieve all user tasks
    const allTasks = await User.aggregate([
      {
        $unwind: "$tasks", // Deconstructs the tasks array into separate documents
      },
      {
        $replaceRoot: {
          newRoot: "$tasks",
        },
      },
      {
        $project: {
          _id: 0, // Exclude _id field from the result
        },
      },
    ]);
    return NextResponse.json({ data: { allTasks }, success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
