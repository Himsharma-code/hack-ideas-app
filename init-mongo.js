// 02-insert-data.js
const dateTask1 = new Date("2022-01-01T12:00:00Z");
const dateTask2 = new Date("2022-02-01T14:30:00Z");
const dateTask3 = new Date("2022-03-01T10:15:00Z");
const dateTask4 = new Date("2022-04-01T16:45:00Z");

db.users.insertMany([
  {
    employeeId: "EMP001",
    tasks: [
      {
        id: "212",
        title: "Task 1",
        description: "Description 1",
        tags: ["frontend", "backend"],
        likes: 5,
        likedBy: ["EMP002", "EMP003"],
        createdBy: "EMP001",
        createdAt: dateTask1,
      },
      {
        id: "222",
        title: "Task 2",
        description: "Description 2",
        tags: ["frontend", "backend"],
        likes: 1,
        likedBy: ["EMP001"],
        createdBy: "EMP001",
        createdAt: dateTask2,
      },
    ],
  },
  {
    employeeId: "EMP002",
    tasks: [
      {
        id: "21",
        title: "Task 3",
        description: "Description 3",
        tags: ["dsa", "ai"],
        likes: 2,
        likedBy: ["EMP001", "EMP003"],
        createdBy: "EMP002",
        createdAt: dateTask3,
      },
      {
        id: "214",
        title: "Task 4",
        description: "Description 4",
        tags: ["frontend", "backend"],
        likes: 2,
        likedBy: ["EMP002", "EMP004"],
        createdBy: "EMP002",
        createdAt: dateTask4,
      },
    ],
  },
]);
