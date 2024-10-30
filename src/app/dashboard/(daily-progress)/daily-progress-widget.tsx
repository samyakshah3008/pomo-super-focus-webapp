"use client";

import ProgressWrapper from "@/components/(super-focus)/progress-wrapper";
import { useToast } from "@/components/ui/primitives/use-toast";
import { getProgressPercentage } from "@/utils/helper-functions";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import EditGoalButton from "./edit-goal-btn";

const DailyProgressWidget = () => {
  const [isLoading, setIsLoading] = useState(true);

  const dailyProgressDetails = useSelector(
    (state: any) => state?.dailyProgress
  );
  const streakDetails = useSelector((state: any) => state?.streakDetails);
  const { toast } = useToast();

  const checkForErrors = () => {
    if (dailyProgressDetails.status == "rejected") {
      toast({
        variant: "destructive",
        title: "Failed to fetch daily progress",
        description:
          "Something went wrong with our servers, we are sorry about it. Please try again later.",
      });
    }

    if (streakDetails.status == "rejected") {
      toast({
        variant: "destructive",
        title: "Failed to fetch streak details",
        description:
          "Something went wrong with our servers, we are sorry about it. Please try again later.",
      });
    }
  };

  useEffect(() => {
    if (
      dailyProgressDetails?.status == "pending" ||
      streakDetails?.status == "pending"
    )
      return;
    setIsLoading(false);
    checkForErrors();
  }, [dailyProgressDetails, streakDetails]);

  if (isLoading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <Loader className="mr-2 h-8 w-8 animate-spin" />
      </div>
    );
  }

  const progressPercentage = getProgressPercentage(
    streakDetails?.streakDetails?.dailyGoalInHours,
    dailyProgressDetails?.dailyProgressDetails?.today?.totalTime
  );

  return (
    <div className="flex flex-col gap-5 p-4 w-[500px]">
      <div className="flex justify-between items-center">
        <div className="text-base font-medium">Daily Progress</div>
        <EditGoalButton
          currentDailyGoal={streakDetails?.streakDetails?.dailyGoalInHours}
        />
      </div>

      <div className="flex items-center justify-around">
        <div className="flex flex-col gap-2 items-center">
          <div className="text-sm text-muted-foreground">Yesterday</div>
          <div className="text-3xl font-bold tracking-tighter">
            {dailyProgressDetails?.dailyProgressDetails?.yesterday?.totalTime}
          </div>
          <div className="text-sm text-muted-foreground">minutes</div>
        </div>

        <div className="flex flex-col gap-2 items-center">
          <ProgressWrapper
            progress={progressPercentage > 100 ? 100 : progressPercentage}
          >
            <div className="text-sm text-muted-foreground">Daily goal</div>
            <div className="text-3xl font-bold tracking-tighter">
              {streakDetails?.streakDetails?.dailyGoalInHours}
            </div>
            <div className="text-sm text-muted-foreground">
              {streakDetails?.streakDetails?.dailyGoalInHours < 1.5
                ? "hour"
                : "hours"}
            </div>
          </ProgressWrapper>
          <div className="text-sm text-muted-foreground">
            Completed:{" "}
            {dailyProgressDetails?.dailyProgressDetails?.today?.totalTime}{" "}
            minutes
          </div>
        </div>

        <div className="flex flex-col gap-2 items-center">
          <div className="text-sm text-muted-foreground">Streak</div>
          <div className="text-3xl font-bold tracking-tighter">
            {streakDetails?.streakDetails?.streakCount}
          </div>
          <div className="text-sm text-muted-foreground"> days</div>
        </div>
      </div>
    </div>
  );
};

export default DailyProgressWidget;
