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
import { useToast } from "@/components/ui/primitives/use-toast";
import { userId } from "@/constants/user";
import { updateStreakDetails } from "@/lib/store/features/streaks/streakSlice";
import { updateDailyFocusTimeService } from "@/services/daily-progress/daily-progress";
import { useDispatch } from "react-redux";

type ConfirmUpdateGoalDialogProps = {
  showConfirmDialog: boolean;
  setShowConfirmDialog: any;
  newDailyGoalFocusTimeValue: Number;
};

const ConfirmUpdateGoalDialog = ({
  showConfirmDialog,
  setShowConfirmDialog,
  newDailyGoalFocusTimeValue,
}: ConfirmUpdateGoalDialogProps) => {
  const dispatch = useDispatch();
  const { toast } = useToast();

  const updateDailyFocusTime = async () => {
    const payload = {
      userId,
      newGoalFocusTimeInHours: newDailyGoalFocusTimeValue,
    };
    try {
      const response = await updateDailyFocusTimeService(payload);
      if (response?.success) {
        dispatch(updateStreakDetails(response?.data?.streakDetails));
        toast({
          variant: "default",
          title: "Success!",
          description: "Daily Focus Time Updated.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Unable to update daily goals",
          description:
            "Uh oh! Something is wrong with our server, please try again later.",
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Unable to update daily goals",
        description:
          error?.message ??
          "Uh oh! Something is wrong with our server, please try again later.",
      });
    } finally {
      setShowConfirmDialog(false);
    }
  };

  const onDialogClose = () => {
    setShowConfirmDialog(false);
  };

  return (
    <Dialog open={showConfirmDialog} onOpenChange={onDialogClose}>
      <DialogContent aria-description="content" aria-describedby="content">
        <DialogDescription />
        <DialogHeader>
          <DialogTitle>Confirmation!</DialogTitle>
        </DialogHeader>

        <div className="text-sm">
          By doing this, your streaks will re-start. Are you sure you want to
          change your daily goal?
        </div>

        <DialogFooter className="mt-4">
          <Button variant="destructive" onClick={onDialogClose}>
            Cancel
          </Button>
          <Button onClick={updateDailyFocusTime}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmUpdateGoalDialog;
