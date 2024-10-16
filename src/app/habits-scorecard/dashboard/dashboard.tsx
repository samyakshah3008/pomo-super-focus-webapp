"use client";

import { DotBackground } from "@/components/common/grid-and-dot-background";
import { Separator } from "@/components/ui/primitives/separator";
import { fetchHabitsService } from "@/services/habits-scorecard/habits-scorecard";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import HabitsCompleted from "./habits-completed";
import TodayOverview from "./today-overview";

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

  const sections = [
    <TodayOverview habits={habits?.incomplete} fetchHabits={fetchHabits} />,
    <HabitsCompleted habits={habits?.complete} />,
  ];

  return (
    <div>
      <DotBackground widthFull={true}>
        <div className="flex flex-col w-[90%] gap-10 pb-5">
          {sections.map((section: any, id: any) => {
            return (
              <>
                {section}
                {sections?.length !== id + 1 ? <Separator /> : null}
              </>
            );
          })}
        </div>
      </DotBackground>
    </div>
  );
};

export default Dashboard;
