"use client";
import Filter from "@/components/Filter";
import { useMyContext } from "@/context/AppContext";
import DashBoard from "@/pages/DashBoard";

import React, { useEffect, useState } from "react";

export type TaskProps = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  likes: number;
  likedBy: string[];
  createdBy: string;
  createdAt: string;
};

const filters = [
  {
    label: "Most liked",
    value: "most_liked",
  },
  {
    label: "Recent",
    value: "recent",
  },
];

const DashBoardPage = () => {
  const { allTasks, setAllTasks, fetchTasks } = useMyContext();

  const handleApply = (selectedOptions: string[]) => {
    if (selectedOptions.includes("most_liked")) {
      const tasksClone = [...allTasks];
      const sortedTasks = tasksClone.sort((a, b) => b.likes - a.likes);
      setAllTasks(sortedTasks);
    } else if (selectedOptions.includes("recent")) {
      const tasksClone = [...allTasks];
      const sortedTasks = tasksClone.sort(
        (a, b) =>
          (new Date(b.createdAt) as any) - (new Date(a.createdAt) as any)
      );
      setAllTasks(sortedTasks);
    }

    // Implement logic when Apply button is clicked
  };

  return (
    <>
      <div className="mb-4 text-end">
        <Filter filters={filters} handleApply={handleApply} />
      </div>
      <DashBoard fetchAllTasks={fetchTasks} allTasks={allTasks} />
    </>
  );
};

export default DashBoardPage;
