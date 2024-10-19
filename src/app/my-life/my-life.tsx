"use client";

import { useState } from "react";
import Header from "./header";
import Onboarding from "./onboarding";

const MyLife = () => {
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(false);
  if (!isOnboardingCompleted) {
    return <Onboarding />;
  }
  return (
    <div>
      <Header />
    </div>
  );
};

export default MyLife;
