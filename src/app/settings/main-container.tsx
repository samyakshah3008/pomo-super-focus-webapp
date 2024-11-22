"use client";

import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BasicInformation from "./basic-information";
import CredentialInformation from "./credential-information";
import IntegrationsInformation from "./integrations-information";
import LogoutFlow from "./logoutFlow";
import Notifications from "./notifications";

const MainContainer = ({
  showConfirmLogoutModal,
  setShowConfirmLogoutModal,
  showExplodingHeart,
  setShowExplodingHeart,
}: any) => {
  const [basicInformationObj, setBasicInformationObj] = useState({
    firstName: "",
    lastName: "",
  });
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isGuestUser, setIsGuestUser] = useState(false);

  const currentUser = useSelector((state: any) => state?.user?.pomoSuperUser);

  useEffect(() => {
    if (!currentUser?._id) return;
    if (currentUser?.isGuestUser) {
      setIsGuestUser(true);
    } else {
      setIsGuestUser(false);
    }
    setBasicInformationObj({
      firstName: currentUser?.firstName,
      lastName: currentUser?.lastName,
    });
    setEmail(currentUser?.email);
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
    <div className="flex flex-col gap-4 w-[70%] m-auto ">
      <BasicInformation
        basicInformationObj={basicInformationObj}
        setBasicInformationObj={setBasicInformationObj}
        isGuestUser={isGuestUser}
      />
      <CredentialInformation
        email={email}
        setEmail={setEmail}
        isGuestUser={isGuestUser}
      />
      <IntegrationsInformation />
      <Notifications />
      <LogoutFlow
        showConfirmLogoutModal={showConfirmLogoutModal}
        setShowConfirmLogoutModal={setShowConfirmLogoutModal}
        showExplodingHeart={showExplodingHeart}
        setShowExplodingHeart={setShowExplodingHeart}
      />
    </div>
  );
};

export default MainContainer;
