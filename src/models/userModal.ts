import mongoose from "mongoose";

if (!mongoose.models.User) {
  const userSchema = new mongoose.Schema({
    employeeId: {
      type: String,
      required: true,
      unique: true,
    },
    tasks: [
      {
        id: {
          type: String,
          unique: true,
        },
        title: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        tags: {
          type: [String],
          default: [],
        },
        likes: {
          type: Number,
          default: 0,
        },
        likedBy: {
          type: [String],
          default: [],
        },
        createdBy: {
          type: String, // Change the type according to your employeeId type
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  });

  mongoose.model("User", userSchema);
}

export default mongoose.model("User");
