"use client";

import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "./header";
import MainContainer from "./main-container";

const Settings = () => {
  const [showConfirmLogoutModal, setShowConfirmLogoutModal] = useState(false);

  const [isGuestUser, setIsGuestUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const currentUser = useSelector((state: any) => state?.user?.pomoSuperUser);

  useEffect(() => {
    if (!currentUser?._id) return;
    if (currentUser?.isGuestUser) {
      setIsGuestUser(true);
    } else {
      setIsGuestUser(false);
    }
    setIsLoading(false);
  }, [currentUser]);

  if (isLoading) {
    return (
      <div className="h-96 flex items-center">
        <Loader className="mr-2 h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 items-center p-4">
      <Header />
      <div className="border-2 m-auto mt-2 text-sm rounded-md border-green-500 border-solid p-2 bg-green-200 font-medium lg:w-[600px] text-center">
        {isGuestUser
          ? `Dear ${
              currentUser?.pomoSuperUser?.firstName || "Super User"
            }, for beta access - please
        mail me at samyakshah3008@gmail.com to unlock this for absolutely free
        of cost! 💝`
          : `Dear ${
              currentUser?.pomoSuperUser?.firstName || "Super User"
            }, you have beta access for this feature. We hope you will love it! 💝`}
      </div>
      <MainContainer
        showConfirmLogoutModal={showConfirmLogoutModal}
        setShowConfirmLogoutModal={setShowConfirmLogoutModal}
      />
    </div>
  );
};

export default Settings;
