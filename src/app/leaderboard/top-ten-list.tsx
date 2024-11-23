"use client";

import {
  convertMinutesToHour,
  getWeekTimeline,
} from "@/utils/helper-functions";
import moment from "moment";

const TopTenList = ({ leaderboardList }: { leaderboardList: any }) => {
  const { startOfWeek, endOfWeek } = getWeekTimeline();

  const formattedStartOfWeek = moment(startOfWeek).format("MMM D, YYYY");
  const formattedEndOfWeek = moment(endOfWeek).format("MMM D, YYYY");

  return (
    <div className="flex flex-col gap-10 align-center justify-center">
      <div className="text-2xl font-bold text-center underline">
        Top 10 Leaders for:{" "}
        <span className="text-blue-500">
          Week from {formattedStartOfWeek} to {formattedEndOfWeek}
        </span>
      </div>

      <div className="flex flex-col align-center items-center">
        <ul className="w-full max-w-[800px] border-2 border-green-500 bg-green-100 rounded-md p-4">
          {Array.from({ length: 10 }).map((_, index) => {
            const leader = leaderboardList[index];

            return (
              <li
                key={leader?.rank || index + 1}
                className="border-b-2 last:border-b-0 py-2 px-4 flex justify-between items-center transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer"
              >
                <span className="font-medium text-base">
                  {leader
                    ? `Rank: ${leader.rank} - ${leader.userDetails?.firstName} ${leader.userDetails?.lastName}`
                    : `Rank: ${index + 1} - ------`}
                </span>
                <span className="text-neutral-600 dark:text-neutral-400">
                  {leader
                    ? `${convertMinutesToHour(leader.totalTime)} ${
                        convertMinutesToHour(leader.totalTime) > 1
                          ? "hours"
                          : "hour"
                      }`
                    : "--"}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default TopTenList;
