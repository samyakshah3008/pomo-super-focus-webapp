"use client";

import {
  convertMinutesToHour,
  getWeekTimeline,
} from "@/utils/helper-functions";
import moment from "moment";
import Image from "next/image";
import Aim from "../../../public/dart-aim.png";

const UserRank = ({ userRank }: { userRank: any }) => {
  const { startOfWeek, endOfWeek } = getWeekTimeline();

  const formattedStartOfWeek = moment(startOfWeek).format("MMM D, YYYY");
  const formattedEndOfWeek = moment(endOfWeek).format("MMM D, YYYY");

  return (
    <div className="flex flex-col gap-10 align-center justify-center">
      <div className="text-2xl font-bold text-center underline">
        Your performance from:{" "}
        <span className="text-blue-500">
          {formattedStartOfWeek} to {formattedEndOfWeek}!
        </span>
      </div>

      <div className="flex items-center justify-center gap-10">
        <Image src={Aim.src} alt="aim" width={200} height={200} />
        <div className="flex flex-col gap-3 items-center">
          {userRank?.rank ? (
            <>
              {" "}
              <div className="text-xl font-semibold">Congratulations!</div>
              <div>
                You secured Rank {userRank?.rank} with{" "}
                {convertMinutesToHour(userRank.totalTime)}
                {convertMinutesToHour(userRank.totalTime) > 1
                  ? "hours"
                  : "hour"}{" "}
                🎯
              </div>
              <div>Share this! </div>
            </>
          ) : (
            <>
              <div className="text-xl font-semibold">No activity so far</div>
              <div>Complete your first Pomodoro session today 🚀</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserRank;
