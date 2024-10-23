"use client";

import BasicInformation from "./basic-information";
import CredentialInformation from "./credential-information";
import IntegrationsInformation from "./integrations-information";
import Notifications from "./notifications";

const MainContainer = () => {
  return (
    <div className="flex flex-col gap-4 w-[70%] m-auto ">
      <BasicInformation />
      <CredentialInformation />
      <IntegrationsInformation />
      <Notifications />
    </div>
  );
};

export default MainContainer;
