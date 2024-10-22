"use client";

import { fetchHabitsService } from "@/services/habits-scorecard/habits-scorecard";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "./header";
import Today from "./today";

const Dashboard = () => {
  const [habits, setHabits] = useState<[] | any>([]);
  const [loading, setLoading] = useState(true);
  const currentUser = useSelector((state: any) => state?.user);

  const fetchHabits = async () => {
    try {
      const response = await fetchHabitsService(currentUser);
      setHabits(response?.data?.data);
    } catch (error) {
      console.log("error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!currentUser?.pomoSuperUser?._id) return;
    fetchHabits();
  }, [currentUser]);

  if (loading) {
    return null;
  }

  return (
    <div>
      <div className="flex flex-col gap-5 w-[70%] m-auto">
        {/* <TodayOverview habits={habits?.incomplete} fetchHabits={fetchHabits} />, */}
        <Header />
        <Today />
        {/* <HabitsCompleted habits={habits?.complete} />, */}
      </div>
    </div>
  );
};

export default Dashboard;
