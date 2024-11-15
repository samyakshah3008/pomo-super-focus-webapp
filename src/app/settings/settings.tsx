"use client";

import { useState } from "react";
import Header from "./header";
import MainContainer from "./main-container";

const Settings = () => {
  const [showConfirmLogoutModal, setShowConfirmLogoutModal] = useState(false);

  return (
    <div className="flex flex-col gap-4 items-center p-4">
      <Header />
      <MainContainer
        showConfirmLogoutModal={showConfirmLogoutModal}
        setShowConfirmLogoutModal={setShowConfirmLogoutModal}
      />
    </div>
  );
};

export default Settings;
