"use client";

import { useSelector } from "react-redux";

const YearsGrid = ({ lifeLeftObj }: any) => {
  if (!lifeLeftObj?.totalWeeksCompleted) {
    return null;
  }

  const currentUser = useSelector((state: any) => state?.user);

  let yearsCompleted = Math.floor(lifeLeftObj?.totalWeeksCompleted / 52);
  let totalWeeksFromYearsCompleted = yearsCompleted * 52;
  let remainingWeeks =
    lifeLeftObj?.totalWeeksCompleted - totalWeeksFromYearsCompleted;
  let onGoingYear = yearsCompleted + 1;

  const isThisWeekCompleted = (yearIdx: any, weekIdx: any) => {
    if (yearIdx == onGoingYear && weekIdx <= remainingWeeks) {
      return true;
    } else if (yearIdx > yearsCompleted) {
      return false;
    }
    return true;
  };

  if (!currentUser?.pomoSuperUser?.estimateLifeSpan) {
    return null;
  }

  return (
    <>
      <div className="flex flex-col gap-2 justify-center items-center">
        <div className="mt-4 text-center text-lg uppercase underline text-green-500 font-bold">
          Life of {currentUser?.pomoSuperUser?.firstName}:
        </div>
        <div className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base w-[700px] text-center ">
          Time is ticking⏱️ See the visual grid view, where each dot in year
          represents a week, red represents completed, green means - it's
          remaining.
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4 mt-8 px-4">
        {[...Array(currentUser?.pomoSuperUser?.estimateLifeSpan)].map(
          (_, yearIdx) => (
            <div key={yearIdx} className="flex flex-col items-center">
              <div className="text-center underline">Year {yearIdx + 1}</div>

              <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 grid grid-cols-6 sm:grid-cols-8 md:grid-cols-13 gap-1">
                {[...Array(52)].map((_, weekIdx) => (
                  <div
                    key={weekIdx}
                    className={`w-4 h-4 rounded-full ${
                      isThisWeekCompleted(yearIdx + 1, weekIdx + 1)
                        ? "bg-red-400"
                        : "bg-green-300"
                    }`}
                  ></div>
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
};

export default YearsGrid;
