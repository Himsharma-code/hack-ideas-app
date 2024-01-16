"use client";
import Filter from "@/components/Filter";
import DashBoard from "@/pages/DashBoard";
import { isLoggedIn } from "@/utils/isLoggedIn";
import { request } from "@/utils/request";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export type TaskProps = {
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
  const router = useRouter();
  const [allTasks, setAllTasks] = useState<TaskProps[]>([]);

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push("/");
    } else {
      const fetchData = async () => {
        try {
          const data = await request("/api/users/getAllUserTasks", "GET");
          if (data.success) {
            setAllTasks(data?.data?.allTasks || []);
          } else {
            console.error(data.error);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }
  }, []);

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
      <DashBoard allTasks={allTasks} />
    </>
  );
};

export default DashBoardPage;
