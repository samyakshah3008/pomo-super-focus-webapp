"use client";

import { Progress } from "@/components/ui/primitives/progress";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import EditDetailsDialog from "./edit-details-dialog";
import { calculateLifeLeft } from "./helper";

const TimeLeftGrid = ({
  isGuestUser,
  guestUserBirthDate,
  guestUserLifeSpan,
}: any) => {
  const [isEditLifeDetailsDialogOpen, setIsEditLifeDetailsDialogOpen] =
    useState(false);
  const [lifeLeftObj, setLifeLeftObj] = useState<any>(null);

  const currentUser = useSelector((state: any) => state?.user);

  useEffect(() => {
    if (!currentUser?.pomoSuperUser?._id) return;
    let id: any;
    if (isGuestUser) {
      id = setInterval(() => {
        const timeLeft = calculateLifeLeft(
          guestUserBirthDate,
          guestUserLifeSpan
        );
        if (timeLeft) {
          setLifeLeftObj(timeLeft);
          if (timeLeft.isLifeSpanCompleted) {
            clearInterval(id);
          }
        }
      }, 1000);
    } else {
      if (!currentUser.pomoSuperUser.isMyLifeOnboardingComplete) return;

      const { birthDate, estimateLifeSpan } = currentUser.pomoSuperUser;

      id = setInterval(() => {
        const timeLeft = calculateLifeLeft(birthDate, estimateLifeSpan);
        if (timeLeft) {
          setLifeLeftObj(timeLeft);
          if (timeLeft.isLifeSpanCompleted) {
            clearInterval(id);
          }
        }
      }, 1000);
    }

    return () => {
      clearInterval(id);
    };
  }, [currentUser]);

  if (!currentUser?.pomoSuperUser?._id) {
    return null;
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="text-red-500 font-bold text-xl mt-5 text-center">
          Life span completed: {lifeLeftObj?.progressPercentage || 0.7}%
        </div>
        <Progress value={Math.ceil(lifeLeftObj?.progressPercentage) || 1} />
        <div className="text-center">
          {lifeLeftObj?.isLifeSpanCompleted
            ? "Your estimated life span is completed, please choose a new estimate life span!"
            : " We count based on your birth date and life span you entered,"}{" "}
          <span
            className="underline cursor-pointer"
            onClick={() => setIsEditLifeDetailsDialogOpen(true)}
          >
            Edit Details?
          </span>
        </div>

        {/* Time left section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 mt-5">
          <div className="bg-white shadow-md rounded-lg flex flex-col justify-center items-center p-6 text-center">
            <div className="text-4xl mb-4">⌚</div>
            <h2 className="text-xl font-semibold mb-2">
              {" "}
              {lifeLeftObj?.years}{" "}
            </h2>
            <p className="text-gray-600">Years</p>
          </div>

          <div className="bg-white shadow-md rounded-lg flex flex-col justify-center items-center p-6 text-center">
            <div className="text-4xl mb-4">⏰</div>
            <h2 className="text-xl font-semibold mb-2">
              {lifeLeftObj?.months}
            </h2>
            <p className="text-gray-600">Months</p>
          </div>

          <div className="bg-white shadow-md rounded-lg flex flex-col justify-center items-center p-6 text-center">
            <div className="text-4xl mb-4">⏱️</div>
            <h2 className="text-xl font-semibold mb-2">{lifeLeftObj?.weeks}</h2>
            <p className="text-gray-600">Weeks</p>
          </div>

          <div className="bg-white shadow-md rounded-lg flex flex-col justify-center items-center p-6 text-center">
            <div className="text-4xl mb-4">⏲️</div>
            <h2 className="text-xl font-semibold mb-2">{lifeLeftObj?.days}</h2>
            <p className="text-gray-600">Days</p>
          </div>

          <div className="bg-white shadow-md rounded-lg flex flex-col justify-center items-center p-6 text-center">
            <div className="text-4xl mb-4">🕰️</div>
            <h2 className="text-xl font-semibold mb-2">{lifeLeftObj?.hours}</h2>
            <p className="text-gray-600">Hours</p>
          </div>

          <div className="bg-white shadow-md rounded-lg flex flex-col justify-center items-center p-6 text-center">
            <div className="text-4xl mb-4">⌛</div>
            <h2 className="text-xl font-semibold mb-2">
              {lifeLeftObj?.seconds}
            </h2>
            <p className="text-gray-600">Seconds</p>
          </div>
        </div>
      </div>
      <EditDetailsDialog
        isOpen={isEditLifeDetailsDialogOpen}
        onClose={() => setIsEditLifeDetailsDialogOpen(false)}
      />
    </>
  );
};

export default TimeLeftGrid;
