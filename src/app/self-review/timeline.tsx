"use client";

import UpdateSelfReviewEventItemSidesheet from "@/components/(self-review)/update-event-sidesheet";
import moment from "moment";
import { useState } from "react";

const Timeline = ({
  selfReviewItems,
  fetchSelfReviewItems,
  selectedYear,
}: any) => {
  const [selectedItemObj, setSelectedItemObj] = useState(null);
  const [isUpdateEventSheetOpen, setIsUpdateEventSheetOpen] = useState(false);

  const onOpenChange = () => {
    setIsUpdateEventSheetOpen(false);
  };

  return (
    <>
      <div className="mt-10 flex flex-col gap-6 pl-8 relative">
        <div className="absolute left-4 top-0 bottom-0 w-1 bg-blue-500"></div>

        {selfReviewItems[selectedYear]?.map((item: any) => (
          <div
            key={item?._id}
            className="flex gap-6 items-start relative border-2 border-solid cursor-pointer"
            onClick={() => {
              setSelectedItemObj(item);
              setIsUpdateEventSheetOpen(true);
            }}
          >
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-2xl font-semibold">{item?.title}</div>
              <div className="text-sm text-gray-500">
                {moment(item?.date).format("DD-MM-YYYY")}
              </div>

              <div className="text-gray-700">{item?.description}</div>
            </div>
          </div>
        ))}
      </div>

      <UpdateSelfReviewEventItemSidesheet
        itemObj={selectedItemObj}
        setSelectedItemObj={setSelectedItemObj}
        fetchSelfReviewItems={fetchSelfReviewItems}
        open={isUpdateEventSheetOpen}
        onOpenChange={onOpenChange}
      />
    </>
  );
};

export default Timeline;
