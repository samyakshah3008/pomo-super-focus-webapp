"use client";

import { useEffect } from "react";

const MyGoal = () => {
  const getGoals = async () => {
    // const goals = await getGoalsService()
  };

  useEffect(() => {
    getGoals();
  }, []);

  return (
    <div>
      <div>Add your top 10 goals</div>

      <div>Your goals</div>
    </div>
  );
};

export default MyGoal;
