"use client";
import Filter from "@/components/Filter";
import useAllUserTasks from "@/hooks/useAllUserTasks";
import DashBoard from "@/pages/DashBoard";

import React, { useEffect, useState } from "react";

export type TaskProps = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  likes: number;
  likedBy: string[];
};

const filters = [
  {
    label: "Most liked",
    value: "most_liked",
  },
  // {
  //   label: "My task",
  //   value: "me",
  // },
];

const DashBoardPage = () => {
  const { allTasks, setAllTasks, fetchAllTasks } = useAllUserTasks();

  const handleApply = (selectedOptions: string[]) => {
    if (selectedOptions.includes("most_liked")) {
      const tasksClone = [...allTasks];
      const sortedTasks = tasksClone.sort((a, b) => b.likes - a.likes);
      setAllTasks(sortedTasks);
    } else {
      const tasksClone = [...allTasks];
      const sortedTasks = tasksClone.sort((a, b) => a.likes - b.likes);
      setAllTasks(sortedTasks);
    }

    // Implement logic when Apply button is clicked
  };

  return (
    <>
      <div className="mb-4">
        <Filter filters={filters} handleApply={handleApply} />
      </div>
      <DashBoard fetchAllTasks={fetchAllTasks} allTasks={allTasks} />
    </>
  );
};

export default DashBoardPage;
