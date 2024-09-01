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
import { fetchActivePomodoroSession } from "@/lib/store/features/active-pomodoro-session/activePomodoroSessionSlice";
import { deleteActivePomodoroSessionService } from "@/services/pomodoros/pomodoro";
import { useDispatch } from "react-redux";

type ConfirmDeleteSessionDialogProps = {
  showConfirmDialog: boolean;
  setShowConfirmDialog: any;
  userId: any;
};

const ConfirmDeleteSessionDialog = ({
  showConfirmDialog,
  setShowConfirmDialog,
  userId,
}: ConfirmDeleteSessionDialogProps) => {
  const dispatch = useDispatch();
  const { toast } = useToast();

  const deletePomodoroSession = async () => {
    const queryParam = {
      userId,
    };

    try {
      await deleteActivePomodoroSessionService(queryParam);
      dispatch(fetchActivePomodoroSession());
      toast({
        variant: "default",
        title: "Success!",
        description: "Session deleted successfully",
      });
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Failure!",
        description: "Failed to delete a session!",
      });
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
          Are you sure you want to delete this on-going pomodoro session??
        </div>

        <DialogFooter className="mt-4">
          <Button variant="destructive" onClick={onDialogClose}>
            Cancel
          </Button>
          <Button onClick={deletePomodoroSession}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDeleteSessionDialog;
