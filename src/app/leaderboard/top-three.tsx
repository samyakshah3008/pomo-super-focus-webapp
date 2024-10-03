"use client";

import Lottie from "lottie-react";

import {
  convertMinutesToHour,
  getWeekTimeline,
} from "@/utils/helper-functions";
import moment from "moment";
import Rank1 from "../../../public/rank-one.json";
import Rank3 from "../../../public/rank-three.json";
import Rank2 from "../../../public/rank-two.json";

const TopThree = ({ leaderboardList }: { leaderboardList: any }) => {
  const { startOfWeek, endOfWeek } = getWeekTimeline();

  const formattedStartOfWeek = moment(startOfWeek).format("MMM D, YYYY");
  const formattedEndOfWeek = moment(endOfWeek).format("MMM D, YYYY");

  return (
    <div className="flex flex-col gap-10 align-center justify-center">
      <div className="text-2xl font-bold text-center underline">
        Top Three Leaders of this Week from{" "}
        <span className="text-blue-500">
          {formattedStartOfWeek} to {formattedEndOfWeek}!
        </span>
      </div>

      <div className="flex items-center justify-center gap-10">
        <div className="w-[250px]">
          <Lottie animationData={Rank1} loop={false} width={250} />
        </div>
        {leaderboardList?.[0] ? (
          <div className="flex flex-col gap-3 items-center">
            <div className="text-xl font-semibold">
              {leaderboardList[0]?.userDetails?.firstName}{" "}
              {leaderboardList[0]?.userDetails?.lastName}
            </div>
            <div>
              Tops the board with{" "}
              {convertMinutesToHour(leaderboardList[0]?.totalTime)} focused{" "}
              {convertMinutesToHour(leaderboardList[0]?.totalTime) > 1
                ? "hours!"
                : "hour!"}{" "}
              🎯
            </div>
            <div>Congratulate: </div>
          </div>
        ) : (
          <div>Waiting for leader! You can be the next one!</div>
        )}
      </div>

      <div className="flex items-center justify-center gap-10">
        {leaderboardList?.[1] ? (
          <div className="flex flex-col gap-3 items-center">
            <div className="text-xl font-semibold">
              {leaderboardList[1]?.userDetails?.firstName}{" "}
              {leaderboardList[1]?.userDetails?.lastName}
            </div>
            <div>
              Runners up the board with{" "}
              {convertMinutesToHour(leaderboardList[1]?.totalTime)} focused{" "}
              {convertMinutesToHour(leaderboardList[1]?.totalTime) > 1
                ? "hours!"
                : "hour!"}{" "}
              🎯
            </div>
            <div>Congratulate: </div>
          </div>
        ) : (
          <div>Waiting for leader! You can be the next one!</div>
        )}

        <div className="w-[200px]">
          <Lottie animationData={Rank2} loop={false} width={200} />
        </div>
      </div>

      <div className="flex items-center justify-center gap-10">
        <div className="w-[200px]">
          <Lottie animationData={Rank3} loop={false} width={200} />
        </div>
        {leaderboardList?.[2] ? (
          <div className="flex flex-col gap-3 items-center">
            <div className="text-xl font-semibold">
              {leaderboardList[0]?.userDetails?.firstName}{" "}
              {leaderboardList[0]?.userDetails?.lastName}
            </div>
            <div>
              Secures broze medal with{" "}
              {convertMinutesToHour(leaderboardList[0]?.totalTime)} focused{" "}
              {convertMinutesToHour(leaderboardList[0]?.totalTime) > 1
                ? "hours!"
                : "hour!"}{" "}
              🎯
            </div>
            <div>Congratulate: </div>
          </div>
        ) : (
          <div>Waiting for leader! You can be the next one!</div>
        )}
      </div>
    </div>
  );
};

export default TopThree;
