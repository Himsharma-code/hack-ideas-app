// 02-insert-data.js
db.users.insertMany([
  {
    employeeId: "EMP001",
    tasks: [
      {
        id: "212", // Generate a new ObjectId for the task
        title: "Task 1",
        description: "Description 1",
        tags: ["frontend", "backend"],
        likes: 5,
        likedBy: ["EMP002", "EMP003"],
        createdBy: "EMP001", // Added createdBy field
      },
      {
        id: "222", // Generate a new ObjectId for the task
        title: "Task 2",
        description: "Description 2",
        tags: ["frontend", "backend"],
        likes: 1,
        likedBy: ["EMP001"],
        createdBy: "EMP001", // Added createdBy field
      },
    ],
  },
  {
    employeeId: "EMP002",
    tasks: [
      {
        id: "21", // Generate a new ObjectId for the task
        title: "Task 3",
        description: "Description 3",
        tags: ["dsa", "ai"],
        likes: 2,
        likedBy: ["EMP001", "EMP003"],
        createdBy: "EMP002", // Added createdBy field
      },
      {
        id: "214", // Generate a new ObjectId for the task
        title: "Task 4",
        description: "Description 4",
        tags: ["frontend", "backend"],
        likes: 2,
        likedBy: ["EMP002", "EMP004"],
        createdBy: "EMP002", // Added createdBy field
      },
    ],
  },
]);
