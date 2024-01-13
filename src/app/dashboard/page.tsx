"use client";
import DashBoard from "@/pages/DashBoard";
import React, { useEffect, useState } from "react";

const DashBoardPage = () => {
  useEffect(() => {
    // Fetch data from the API when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch("/api/users/getAllUserTasks");
        const data = await response.json();

        if (data.success) {
          // setTasks(data.allTasks);
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return <DashBoard />;
};

export default DashBoardPage;
