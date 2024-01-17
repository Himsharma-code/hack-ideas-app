import { TaskProps } from "@/app/dashboard/page";
import ChallengeCard from "@/components/ChallengeCard";
import React from "react";

type Props = {
  allTasks: TaskProps[];
  fetchAllTasks: () => void;
};

const DashBoard = ({ allTasks = [], fetchAllTasks }: Props) => {
  return (
    <div
      className="grid gap-5"
      // className="flex flex-wrap gap-5"
    >
      {allTasks.map((task, d) => {
        return (
          <ChallengeCard key={d} fetchAllTasks={fetchAllTasks} {...task} />
        );
      })}
    </div>
  );
};

export default DashBoard;
