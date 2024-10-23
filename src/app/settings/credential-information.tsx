"use client";

import { Input } from "@/components/ui/primitives/input";
import { IconEdit } from "@tabler/icons-react";

const CredentialInformation = () => {
  let email = "samyakshah3008@gmail.com";

  return (
    <div className="flex flex-col gap-4 border-2 rounded-md p-4">
      <div className="flex justify-between">
        <h1 className="font-bold">Credentials Details:</h1>
        <IconEdit cursor="pointer" size={24} />
      </div>
      <div className="flex gap-2">
        <div className="flex flex-col gap-4 flex-1">
          Email Address: <Input className="" disabled={true} value={email} />
        </div>
      </div>
    </div>
  );
};

export default CredentialInformation;
