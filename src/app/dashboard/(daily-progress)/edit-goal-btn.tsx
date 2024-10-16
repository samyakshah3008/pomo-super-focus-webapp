"use client";

import { IconPencilHeart } from "@tabler/icons-react";
import { useState } from "react";
import EditGoalDrawer from "./edit-daily-goal-drawer";

type EditGoalButtonProps = {
  currentDailyGoal: Number;
};

const EditGoalButton = ({ currentDailyGoal }: EditGoalButtonProps) => {
  const [isEditGoalDrawerOpen, setIsEditGoalDrawerOpen] = useState(false);

  const onCloseDrawer = () => {
    setIsEditGoalDrawerOpen(false);
  };

  const onOpenDrawer = () => {
    setIsEditGoalDrawerOpen(true);
  };

  return (
    <div>
      <IconPencilHeart cursor="pointer" size={20} onClick={onOpenDrawer} />
      <EditGoalDrawer
        isEditGoalDrawerOpen={isEditGoalDrawerOpen}
        onCloseDrawer={onCloseDrawer}
        currentDailyGoal={currentDailyGoal}
      />
    </div>
  );
};

export default EditGoalButton;
