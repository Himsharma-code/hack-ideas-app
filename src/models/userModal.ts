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
      },
    ],
  });

  mongoose.model("User", userSchema);
}

export default mongoose.model("User");
