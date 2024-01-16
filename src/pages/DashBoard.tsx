import { TaskProps } from "@/app/dashboard/page";
import ChallengeCard from "@/components/ChallengeCard";
import React from "react";

type Props = {
  allTasks: TaskProps[];
};

const DashBoard = ({ allTasks = [] }: Props) => {
  return (
    <div>
      {allTasks.map((task, d) => {
        return <ChallengeCard key={d} {...task} />;
      })}
    </div>
  );
};

export default DashBoard;
