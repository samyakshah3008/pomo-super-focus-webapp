"use client";

import { Button } from "@/components/ui/primitives/button";
import { Input } from "@/components/ui/primitives/input";
import { useToast } from "@/components/ui/primitives/use-toast";
import { fetchUserData } from "@/lib/store/features/user/userSlice";
import { updateBasicInformationService } from "@/services/user/user";
import { IconEdit } from "@tabler/icons-react";
import { Loader } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const BasicInformation = ({
  basicInformationObj,
  setBasicInformationObj,
  isGuestUser,
}: any) => {
  const [isBasicInformationEditing, setIsBasicInformationEditing] =
    useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const { toast } = useToast();
  const dispatch = useDispatch();
  const currentUser = useSelector((state: any) => state?.user?.pomoSuperUser);

  const updateBasicInformation = async () => {
    if (
      currentUser?.firstName?.toLowerCase() ==
        basicInformationObj?.firstName?.toLowerCase() &&
      currentUser?.lastName?.toLowerCase() ==
        basicInformationObj?.lastName?.toLowerCase()
    ) {
      setIsBasicInformationEditing(false);
    } else {
      setIsUpdating(true);
      try {
        await updateBasicInformationService(basicInformationObj);
        toast({
          variant: "default",
          title: "Basic information updated successfully! ✅",
          description: `We have successfully updated your basic information!`,
        });
        dispatch(fetchUserData());
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Failed to update your basic information! 😵",
          description:
            "Uh oh! We are extremely sorry but something is wrong with our server, please try again later.",
        });
      } finally {
        setIsUpdating(false);
        setIsBasicInformationEditing(false);
      }
    }
  };

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
              onClick={updateBasicInformation}
              size="sm"
              variant="destructive"
              disabled={isUpdating || !basicInformationObj?.firstName?.length}
            >
              {isUpdating ? (
                <Loader className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              {isUpdating ? "Saving..." : "Save"}
            </Button>{" "}
          </div>
        ) : (
          <IconEdit
            cursor="pointer"
            onClick={() => {
              if (!isGuestUser) {
                setIsBasicInformationEditing(true);
              }
            }}
            size={24}
          />
        )}
      </div>
      <div className="flex flex-col lg:flex-row gap-2">
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
                lastName: e.target.value,
              })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default BasicInformation;
