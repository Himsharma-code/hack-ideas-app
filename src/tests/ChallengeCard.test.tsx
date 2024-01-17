// components/ChallengeCard.test.tsx

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ChallengeCard from "@/components/ChallengeCard";

// Mocking the useMyContext hook
jest.mock("@/context/AppContext", () => ({
  useMyContext: () => ({
    user: { employeeId: "EMP001" },
    setUser: jest.fn(),
  }),
}));

// Mocking the request function
jest.mock("@/utils/request", () => ({
  request: jest.fn(),
}));

describe("ChallengeCard component", () => {
  test("renders challenge card with correct content", () => {
    const task = {
      id: "1",
      title: "Test Challenge",
      description: "This is a test challenge.",
      tags: ["frontend", "backend"],
      likes: 5,
      likedBy: ["EMP001", "EMP002"],
      createdBy: "EMP002",
      createdAt: "2024-01-17T11:05:17.300Z",
    };

    render(<ChallengeCard {...task} fetchAllTasks={() => {}} />);

    // Check if the title is rendered correctly
    expect(screen.getByText("Test Challenge")).toBeInTheDocument();

    // Check if the description is rendered correctly
    expect(screen.getByText("This is a test challenge.")).toBeInTheDocument();

    // Check if the like button is rendered correctly
    expect(
      screen.getByLabelText("Like") as HTMLButtonElement
    ).toBeInTheDocument();

    // Check if the timestamp is rendered correctly
    expect(screen.getByText("17/01/2024")).toBeInTheDocument();
  });

  test("handles like button click", async () => {
    const task = {
      id: "1",
      title: "Test Challenge",
      description: "This is a test challenge.",
      tags: ["frontend", "backend"],
      likes: 5,
      likedBy: ["EMP001", "EMP002"],
      createdBy: "EMP002",
      createdAt: "2024-01-17T11:05:17.300Z",
    };

    render(<ChallengeCard {...task} fetchAllTasks={() => {}} />);

    // Mock the request function to return a success response
    require("@/utils/request").request.mockResolvedValue({ success: true });

    // Click the like button
    fireEvent.click(screen.getByLabelText("Like") as HTMLButtonElement);

    // Wait for the fetchAllTasks function to be called
    await screen.findByText("This is a test challenge.");

    // Expect the fetchAllTasks function to be called
    expect(require("@/utils/request").request).toHaveBeenCalledWith(
      "/api/users/likeTask",
      "POST",
      {
        is_liked: false,
        id: "1",
      }
    );
  });
});
