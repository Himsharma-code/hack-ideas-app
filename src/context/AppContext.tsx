// components/MyContext.tsx
"use client";
import { TaskProps } from "@/app/dashboard/page";
import { isLoggedIn, logout } from "@/utils/isLoggedIn";
import { request } from "@/utils/request";
import { usePathname, useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

interface MyContextProps {
  someState: string;
  setSomeState: React.Dispatch<React.SetStateAction<string>>;
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  allTasks: TaskProps[];
  setAllTasks: React.Dispatch<React.SetStateAction<any>>;
  fetchTasks: () => void;
}

const MyContext = createContext<MyContextProps | undefined>(undefined);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [someState, setSomeState] = useState("initial value");
  const [user, setUser] = useState(null);
  const [allTasks, setAllTasks] = useState<TaskProps[]>([]);

  const fetchTasks = async () => {
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
  const fetchUser = async () => {
    try {
      const data = await request("/api/users/me", "GET");
      if (data.success) {
        setUser(data.data.user);
      }
    } catch (error) {
      logout();
      setUser(null);
      router.push("/");
    }
  };

  useEffect(() => {
    if (isLoggedIn()) {
      fetchUser();
      fetchTasks();
    }
  }, [pathname]);

  const contextValue: MyContextProps = {
    someState,
    setSomeState,
    user,
    setUser,
    allTasks,
    setAllTasks,
    fetchTasks,
  };

  return (
    <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>
  );
};

export const useMyContext = (): MyContextProps => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useMyContext must be used within a MyContextProvider");
  }
  return context;
};
