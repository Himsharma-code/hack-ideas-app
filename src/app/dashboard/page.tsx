"use client";
import DashBoard from "@/pages/DashBoard";
import { isLoggedIn } from "@/utils/isLoggedIn";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const DashBoardPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn()) {
      router.push("/dashboard");
    }
  }, []);
  // useEffect(() => {
  //   // Fetch data from the API when the component mounts
  //   const fetchData = async () => {
  //     try {
  //       const data = await request("/api/users/getAllUserTasks", "GET");
  //       console.log("data", data);
  //       if (data.success) {
  //         // setTasks(data.allTasks);
  //       } else {
  //         console.error(data.error);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);
  return <DashBoard />;
};

export default DashBoardPage;
