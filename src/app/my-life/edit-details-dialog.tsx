"use client";

import { Button } from "@/components/ui/primitives/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/primitives/dialog";
import { Input } from "@/components/ui/primitives/input";
import { useToast } from "@/components/ui/primitives/use-toast";
import { fetchUserData } from "@/lib/store/features/user/userSlice";
import { updateMyLifeDetailsService } from "@/services/user/user";
import { format } from "date-fns";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { validateBirthDateAndEstimateTimeLeft } from "./helper";

const EditDetailsDialog = ({ isOpen, onClose }: any) => {
  const today = format(new Date(), "yyyy-MM-dd");
  const [birthDate, setBirthDate] = useState<any>("");
  const [lifeSpan, setLifeSpan] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmationScreen, setShowConfirmationScreen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { toast } = useToast();
  const dispatch = useDispatch();
  const currentUser = useSelector((state: any) => state?.user?.pomoSuperUser);

  const validateValuesAndShowConfirmScreen = () => {
    const validateValuesCheck = validateBirthDateAndEstimateTimeLeft(
      birthDate,
      lifeSpan
    );
    if (!validateValuesCheck.validationPass) {
      setErrorMessage(validateValuesCheck.errorMessage);
    } else {
      setShowConfirmationScreen(true);
    }
  };

  const updateMyLifeDetails = async () => {
    setIsLoading(true);

    try {
      await updateMyLifeDetailsService(birthDate, lifeSpan);
      dispatch(fetchUserData());
      toast({
        variant: "default",
        title: "Successfully updated! ✅",
        description:
          "We have successfully updated your birth date and estimate life span details;)",
      });
      setShowConfirmationScreen(false);
      onClose();
    } catch (error) {
      toast({
        variant: "destructive",
        title:
          "Unable to update your birth date and estimate life span details;((",
        description:
          "Uh oh! We are extremely sorry but we are not able to update your birth date and estimate life span details;((, please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      const { birthDate, estimateLifeSpan } = currentUser;
      setBirthDate(birthDate);
      setLifeSpan(estimateLifeSpan);
      setErrorMessage("");
    }
    if (!isOpen && showConfirmationScreen) {
      setShowConfirmationScreen(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!currentUser?._id) return;
    const { birthDate, estimateLifeSpan } = currentUser;
    setBirthDate(birthDate);
    setLifeSpan(estimateLifeSpan);
  }, [currentUser]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Details</DialogTitle>
        </DialogHeader>

        {currentUser?._id ? (
          showConfirmationScreen ? (
            <>
              <DialogDescription>
                <div
                  className="
           text-sm border-2 border-solid border-red-500 p-2 rounded-md bg-red-100"
                >
                  You are about to change your birth-date and estimate life span
                  details, this will change the data of statistics which we show
                  to you. However you can always come back and change it
                  anytime. Are you sure you want to change??{" "}
                </div>
              </DialogDescription>
              <DialogFooter className="mt-4">
                <Button onClick={onClose} variant="secondary">
                  Cancel
                </Button>
                <Button
                  onClick={updateMyLifeDetails}
                  variant="destructive"
                  disabled={isLoading || !birthDate || !lifeSpan}
                >
                  {isLoading ? (
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  {isLoading ? "Updating..." : "Yes I am absolutely sure!"}
                </Button>
              </DialogFooter>
            </>
          ) : (
            <>
              <DialogDescription>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <div className="font-bold">Enter your birth date:</div>{" "}
                    <Input
                      max={today}
                      type="date"
                      value={birthDate}
                      onChange={(e: any) => setBirthDate(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="font-bold">
                      Decide your own estimate life span:
                    </div>{" "}
                    <Input
                      type="number"
                      value={lifeSpan}
                      onChange={(e: any) => setLifeSpan(e.target.value)}
                      placeholder="60"
                      min={0}
                      minLength={0}
                    />{" "}
                  </div>
                  {errorMessage?.length !== 0 ? (
                    <div className="text-sm text-red-500 font-semibold">
                      {errorMessage}
                    </div>
                  ) : null}
                </div>
              </DialogDescription>
              <DialogFooter className="mt-4">
                <Button onClick={onClose} variant="secondary">
                  Cancel
                </Button>
                <Button
                  onClick={validateValuesAndShowConfirmScreen}
                  variant="destructive"
                  disabled={isLoading || !birthDate || !lifeSpan}
                >
                  Update details!
                </Button>
              </DialogFooter>
            </>
          )
        ) : (
          <div className="h-56 flex items-center">
            {" "}
            <Loader className="m-auto h-4 w-4 animate-spin" />{" "}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditDetailsDialog;
