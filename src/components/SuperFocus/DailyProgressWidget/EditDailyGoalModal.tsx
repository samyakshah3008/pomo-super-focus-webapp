"use client";

import { userId } from "@/constants/user";
import { updateDailyFocusTimeService } from "@/services/daily-progress/daily-progress";
import { useState } from "react";

const EditDailyGoalModal = () => {
  const [newDailyGoalFocusTimeValue, setNewDailyGoalFocusTimeValue] =
    useState(0);

  const focusTimeChangeHandler = (e: any) => {
    setNewDailyGoalFocusTimeValue(e.target.value);
  };

  const updateDailyFocusTimeHandler = () => {
    updateDailyFocusTime();
  };

  const updateDailyFocusTime = async () => {
    const payload = {
      userId,
      newFocusMinutes: newDailyGoalFocusTimeValue,
    };
    try {
      const response = await updateDailyFocusTimeService(payload);
      console.log(response, "res");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <input
        value={newDailyGoalFocusTimeValue}
        onChange={focusTimeChangeHandler}
        style={{ border: "2px solid black" }}
      />
      <button onClick={updateDailyFocusTimeHandler}>Update time</button>
    </div>
  );
};

export default EditDailyGoalModal;
