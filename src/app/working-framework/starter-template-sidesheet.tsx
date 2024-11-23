"use client";

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
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FrameworkChangedModal from "./framework-changed-modal";

const StarterTemplateSidesheet = ({ children, item, isGuestUser }: any) => {
  const [show, setShow] = useState(false);

  const currentUser = useSelector((state: any) => state?.user);
  const { toast } = useToast();
  const dispatch = useDispatch();
  const activateWorkingFramework = async () => {
    if (isGuestUser) {
      toast({
        variant: "destructive",
        title: "Guest users don't have creds for now! 😄",
        description:
          "However, we promise to give you a verified account access to the soonest!",
      });
      setShow(true);
    } else {
      try {
        await activateWorkFrameworkService(
          currentUser?.pomoSuperUser?._id,
          item
        );
        dispatch(fetchUserData());
        setShow(true);
      } catch (error) {
        console.log("something went wrong while activating work framework.");
        toast({
          title: "Failed!",
          description: `Failed to active ${item?.title} framework, please try again later.`,
          variant: "destructive",
        });
      }
    }
  };

  const activateWorkFrameworkHandler = () => {
    activateWorkingFramework();
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
              {currentUser?.pomoSuperUser?.workingFramework?.title ==
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
                  {" "}
                  {index + 1}. {rule}
                </span>
              </li>
            ))}
          </ul>
          <SheetFooter className="flex-1 items-end">
            <SheetClose asChild>
              <Button
                disabled={
                  currentUser?.pomoSuperUser?.workingFramework?.title ==
                  item?.title
                }
                className="w-full"
                onClick={activateWorkFrameworkHandler}
              >
                {currentUser?.pomoSuperUser?.workingFramework?.title ==
                item?.title
                  ? "Already active"
                  : "Activate"}
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      <FrameworkChangedModal
        show={show}
        setShow={setShow}
        newFrameworkName={item?.title}
        isGuestUser={isGuestUser}
      />
    </>
  );
};

export default StarterTemplateSidesheet;
