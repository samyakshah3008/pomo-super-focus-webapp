"use client";

import ReusableDialog from "@/components/common/reusable-dialog";
import { Button } from "@/components/ui/primitives/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/primitives/sheet";
import { useToast } from "@/components/ui/primitives/use-toast";
import { fetchUserData } from "@/lib/store/features/user/userSlice";
import { activateWorkFrameworkService } from "@/services/user/user";
import { deleteCustomWorkingFrameworkService } from "@/services/working-framework/working-framework";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FrameworkChangedModal from "./framework-changed-modal";

interface CustomWorkingFrameworkSidesheetProps {
  children: React.ReactNode;
  item: {
    title: string;
    rules: string[];
  };
  workingFrameworkObj: {
    _id: string;
  };
  getCustomWorkingFrameworkTemplates: () => void;
  isGuestUser: any;
}

const CustomWorkingFrameworkSidesheet = ({
  children,
  item,
  workingFrameworkObj,
  isGuestUser,
  getCustomWorkingFrameworkTemplates,
}: CustomWorkingFrameworkSidesheetProps) => {
  const [showFrameworkChangeModal, setShowFrameworkChangeModal] =
    useState(false);
  const [isConfirmDeleteDialogOpen, setIsConfirmDeleteDialogOpen] =
    useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const currentUser = useSelector((state: any) => state?.user);
  const router = useRouter();
  const { toast } = useToast();
  const dispatch = useDispatch();

  const activateWorkFramework = async () => {
    if (isGuestUser) {
      toast({
        variant: "destructive",
        title: "Guest users don't have creds for now! 😄",
        description:
          "However, we promise to give you a verified account access to the soonest!",
      });
      setShowFrameworkChangeModal(true);
    } else {
      try {
        await activateWorkFrameworkService(
          currentUser?.pomoSuperUser?._id,
          item
        );
        dispatch(fetchUserData());
        setShowFrameworkChangeModal(true);
      } catch (error) {
        console.error("Error activating work framework:", error);
        toast({
          title: "Failed!",
          description: `Failed to activate ${item?.title} framework, please try again later.`,
          variant: "destructive",
        });
      }
    }
  };

  const deleteWorkingFramework = async () => {
    try {
      setIsDeleting(true);
      const response = await deleteCustomWorkingFrameworkService(
        workingFrameworkObj?._id,
        currentUser?.pomoSuperUser?._id
      );
      if (response?.data?.message === "Custom framework deleted successfully") {
        toast({
          variant: "default",
          title: "Success!",
          description: "Custom Framework deleted successfully!",
        });
        dispatch(fetchUserData());
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong",
          description:
            "Something went wrong while deleting custom framework, please try again later.",
        });
      }
    } catch (error) {
      console.error("Error deleting custom framework:", error);
    } finally {
      setIsDeleting(false);
      setIsConfirmDeleteDialogOpen(false);
      getCustomWorkingFrameworkTemplates();
    }
  };

  const onCloseConfirmDeleteDialog = () => {
    setIsConfirmDeleteDialogOpen(false);
  };

  const onConfirmDelete = () => {
    deleteWorkingFramework();
  };

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent className="p-6 bg-gray-50 rounded-lg shadow-lg overflow-y-auto w-full sm:w-full md:max-w-[500px] flex flex-col gap-4">
          <SheetHeader>
            <SheetTitle className="text-2xl font-semibold text-gray-800">
              {item?.title}
            </SheetTitle>
            <SheetDescription>
              {currentUser?.pomoSuperUser?.workingFramework?.title ===
              item?.title
                ? "This is your activated framework!"
                : "Review the framework below. Click 'Activate' if you want to use it."}
            </SheetDescription>
          </SheetHeader>
          <ul className="flex flex-col gap-4">
            {item?.rules?.map((rule: string, index: number) => (
              <li
                key={index}
                className="flex items-start space-x-2 text-gray-700"
              >
                <span className="text-sm">
                  {index + 1}. {rule}
                </span>
              </li>
            ))}
          </ul>
          <div className="flex gap-2 items-end justify-end">
            <Button
              size="sm"
              onClick={() =>
                router.push(`/working-framework/${workingFrameworkObj?._id}`)
              }
            >
              Edit Framework
            </Button>
            <SheetClose asChild>
              <Button
                onClick={() => setIsConfirmDeleteDialogOpen(true)}
                variant="destructive"
                size="sm"
              >
                Delete Framework
              </Button>
            </SheetClose>
          </div>
          <SheetFooter className="flex-1 flex flex-col items-end">
            <SheetClose asChild>
              <Button
                disabled={
                  currentUser?.pomoSuperUser?.workingFramework?.title ===
                  item?.title
                }
                className="w-full"
                onClick={activateWorkFramework}
              >
                {currentUser?.pomoSuperUser?.workingFramework?.title ===
                item?.title
                  ? "Already active"
                  : "Activate"}
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      <FrameworkChangedModal
        show={showFrameworkChangeModal}
        setShow={setShowFrameworkChangeModal}
        newFrameworkName={item?.title}
        isGuestUser={isGuestUser}
      />
      <ReusableDialog
        isOpen={isConfirmDeleteDialogOpen}
        onClose={onCloseConfirmDeleteDialog}
        onConfirm={onConfirmDelete}
        isProcessing={isDeleting}
        title="Confirm Delete?"
        description={`You are about to delete your custom working framework - "${item?.title}". This action is irreversible. Are you sure you want to delete it?`}
        confirmText="Yes, I want to delete!"
        cancelText="Cancel"
        variant="destructive"
      />
    </>
  );
};

export default CustomWorkingFrameworkSidesheet;
