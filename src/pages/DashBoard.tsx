import { TaskProps } from "@/app/dashboard/page";
import ChallengeCard from "@/components/ChallengeCard";
import React from "react";

type Props = {
  allTasks: TaskProps[];
  fetchAllTasks: () => void;
};

const DashBoard = ({ allTasks = [], fetchAllTasks }: Props) => {
  return (
    <div>
      {allTasks.map((task, d) => {
        return (
          <ChallengeCard key={d} fetchAllTasks={fetchAllTasks} {...task} />
        );
      })}
    </div>
  );
};

export default DashBoard;
