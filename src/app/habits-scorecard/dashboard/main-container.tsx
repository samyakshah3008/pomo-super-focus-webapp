"use client";

import CreateHabitSidesheet from "@/components/(habits)/create-habit-sidesheet";
import { DataTable } from "@/components/(habits)/data-table";
import { Button } from "@/components/ui/primitives/button";
import { Separator } from "@/components/ui/primitives/separator";
import {
  fetchAllHabitsService,
  fetchTodaysHabitsService,
} from "@/services/habits-scorecard/habits-scorecard";
import { Loader } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import NotFoundItem from "../../../../public/empty-state-box.png";

const MainContainer = () => {
  const [allHabits, setAllHabits] = useState<[] | any>([]);
  const [todayHabits, setTodayHabits] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [isGuestUser, setIsGuestUser] = useState(false);

  const currentUser = useSelector((state: any) => state?.user?.pomoSuperUser);
  const fetchRef = useRef(0);

  const fetchAllHabits = async () => {
    try {
      const response = await fetchAllHabitsService();
      setAllHabits(response?.data?.data?.habits);
    } catch (error) {
      console.log("error");
    } finally {
      setLoading(false);
    }
  };

  const fetchTodayHabits = async () => {
    try {
      const response = await fetchTodaysHabitsService();
      setTodayHabits(response?.data?.data?.habits);
    } catch (error) {
      console.log("error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!currentUser?._id || fetchRef.current == 1) return;
    // if (currentUser?.isGuestUser) {
    //   setIsGuestUser(true);
    //   setAllHabits(guestUserAllHabits);
    //   setTodayHabits(guestUserTodayHabits);
    //   setLoading(false);
    //   fetchRef.current = 1;
    // } else {
    //   fetchAllHabits();
    //   fetchTodayHabits();
    //   fetchRef.current = 1;
    // }

    fetchAllHabits();
    fetchTodayHabits();
    fetchRef.current = 1;
  }, [currentUser?._id]);

  if (loading || !currentUser?._id) {
    return (
      <div className="h-96 flex items-center">
        <Loader className="mr-2 h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!allHabits?.length) {
    return (
      <div className="flex flex-col gap-2 justify-center items-center mt-10">
        <Image src={NotFoundItem} alt="Not Found" className="w-40 h-40" />
        <h1 className="text-2xl font-bold ">Get started today!</h1>
        <p className="text-gray-600">
          Seems like you haven't created any habits, create one today on the way
          to get 1% better everyday!😻
        </p>

        <div className="flex gap-2">
          <CreateHabitSidesheet
            fetchHabitsItems={fetchAllHabits}
            fetchTodayHabits={fetchTodayHabits}
            // isGuestUser={isGuestUser}
            isGuestUser={false}
          >
            <Button size="sm">Create a New Habit! 🚀</Button>
          </CreateHabitSidesheet>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[80%]">
      <div className="flex flex-col gap-4">
        {todayHabits?.length ? (
          <>
            <div className="mt-5 mb-5 flex flex-col gap-4">
              <div className="text-xl font-semibold">
                Your today's habits: 📈
              </div>
              {todayHabits?.map((habit: any, index: any) => {
                return (
                  <div className="" key={index}>
                    {index + 1}. I will{" "}
                    <span className=""> {habit?.defineHabitText} </span>,{" "}
                    <span className="">{habit?.getSpecificText}</span> so that I
                    can become <span className="">{habit?.identityText}</span>{" "}
                  </div>
                );
              })}
            </div>
            <Separator />
          </>
        ) : (
          <div className="mt-5 mb-5 flex flex-col gap-4">
            <div className="text-xl font-semibold">Your today's habits: 📈</div>
            <div className="text-sm">No habits for today! </div>
          </div>
        )}

        <DataTable
          data={allHabits}
          fetchAllHabits={fetchAllHabits}
          fetchTodayHabits={fetchTodayHabits}
          // isGuestUser={isGuestUser}
          isGuestUser={false}
        />
      </div>
    </div>
  );
};

export default MainContainer;
