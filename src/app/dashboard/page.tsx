"use client";
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

  return <DashBoard allTasks={allTasks} />;
};

export default DashBoardPage;
