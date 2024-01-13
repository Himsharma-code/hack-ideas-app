import ChallengeCard from "@/components/ChallengeCard";
import React from "react";

let cards = new Array(10).fill(1);

const DashBoard = () => {
  return (
    <div>
      {cards.map((d) => {
        return <ChallengeCard key={d} />;
      })}
    </div>
  );
};

export default DashBoard;
