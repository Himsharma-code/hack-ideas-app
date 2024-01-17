import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isLoggedIn } from "@/utils/isLoggedIn";
import { request } from "@/utils/request";
import { TaskProps } from "@/app/dashboard/page";

const useAllUserTasks = () => {
  const [allTasks, setAllTasks] = useState<TaskProps[]>([]);
  const router = useRouter();

  const fetchData = async () => {
    if (!isLoggedIn()) {
      router.push("/");
      return;
    }

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

  useEffect(() => {
    fetchData();
  }, []);

  return { allTasks, setAllTasks, fetchAllTasks: fetchData };
};

export default useAllUserTasks;
