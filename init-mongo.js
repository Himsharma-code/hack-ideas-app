// 02-insert-data.js
db.users.insertMany([
  {
    employeeId: "EMP001",
    tasks: [
      {
        title: "Task 1",
        description: "Description 1",
        tags: ["tag1", "tag2"],
        likes: 5,
        likedBy: ["EMP002", "EMP003"],
      },
      {
        title: "Task 2",
        description: "Description 2",
        tags: ["frontend", "backend"],
        likes: 3,
        likedBy: ["EMP001", "EMP003"],
      },
    ],
  },
  {
    employeeId: "EMP002",
    tasks: [
      {
        title: "Task 3",
        description: "Description 3",
        tags: ["dsa", "ai"],
        likes: 8,
        likedBy: ["EMP001", "EMP003"],
      },
      {
        title: "Task 4",
        description: "Description 4",
        tags: ["tag2", "tag4"],
        likes: 2,
        likedBy: ["EMP002", "EMP004"],
      },
    ],
  },
]);
