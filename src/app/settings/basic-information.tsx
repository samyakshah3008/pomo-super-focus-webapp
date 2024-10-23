"use client";

import { Button } from "@/components/ui/primitives/button";
import { Input } from "@/components/ui/primitives/input";
import { IconEdit } from "@tabler/icons-react";
import { useState } from "react";

const BasicInformation = () => {
  const [isBasicInformationEditing, setIsBasicInformationEditing] =
    useState(false);
  const [basicInformationObj, setBasicInformationObj] = useState({
    firstName: "Samyak",
    lastName: "Shah",
  });

  return (
    <div className="flex flex-col gap-4 border-2 rounded-md p-4">
      <div className="flex justify-between">
        <h1 className="font-bold">Personal Details:</h1>
        {isBasicInformationEditing ? (
          <div>
            {" "}
            <Button
              onClick={() => setIsBasicInformationEditing(false)}
              size="sm"
            >
              Cancel
            </Button>{" "}
            <Button
              onClick={() => setIsBasicInformationEditing(false)}
              size="sm"
              variant="destructive"
            >
              Save
            </Button>{" "}
          </div>
        ) : (
          <IconEdit
            cursor="pointer"
            onClick={() => setIsBasicInformationEditing(true)}
            size={24}
          />
        )}
      </div>
      <div className="flex gap-2">
        <div className="flex flex-col gap-4 flex-1">
          First Name:{" "}
          <Input
            className=""
            disabled={!isBasicInformationEditing}
            value={basicInformationObj.firstName}
            onChange={(e: any) =>
              setBasicInformationObj({
                ...basicInformationObj,
                firstName: e.target.value,
              })
            }
          />
        </div>
        <div className="flex flex-col gap-4 flex-1">
          Last Name:{" "}
          <Input
            className=""
            value={basicInformationObj.lastName}
            disabled={!isBasicInformationEditing}
            onChange={(e: any) =>
              setBasicInformationObj({
                ...basicInformationObj,
                firstName: e.target.value,
              })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default BasicInformation;
