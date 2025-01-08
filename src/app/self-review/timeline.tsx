"use client";

import UpdateSelfReviewEventItemSidesheet from "@/components/(self-review)/update-event-sidesheet";
import { Separator } from "@/components/ui/primitives/separator";
import { IconEdit } from "@tabler/icons-react";
import moment from "moment";
import Image from "next/image";
import React, { useState } from "react";
import NotFoundItem from "../../../public/empty-state-box.png";

const Timeline = ({
  selfReviewItems,
  fetchSelfReviewItems,
  selectedYear,
  isGuestUser,
}: any) => {
  const [selectedItemObj, setSelectedItemObj] = useState(null);
  const [isUpdateEventSheetOpen, setIsUpdateEventSheetOpen] = useState(false);

  const onOpenChange = () => {
    setIsUpdateEventSheetOpen(false);
  };

  return (
    <>
      <div className="mt-10 flex flex-col gap-6">
        {!selfReviewItems[selectedYear]?.length ? (
          <div className="flex flex-col gap-2 justify-center items-center">
            <Image src={NotFoundItem} alt="Not Found" className="w-40 h-40" />
            <h1 className="text-2xl font-bold ">
              Start documenting your year today!
            </h1>
            <p className="text-gray-600">
              You haven't documented anything yet, start today 😻
            </p>
          </div>
        ) : (
          selfReviewItems[selectedYear]?.map((item: any, index: any) => (
            <React.Fragment key={item?._id}>
              <div
                className="flex gap-6 items-start cursor-pointer "
                onClick={() => {
                  if (!isGuestUser) {
                    setSelectedItemObj(item);
                    setIsUpdateEventSheetOpen(true);
                  }
                }}
              >
                <div className="flex flex-col gap-2 flex-1">
                  <div className="flex justify-between">
                    <div className="">
                      <div className="text-xl font-bold text-gray-700">
                        {moment(item?.date).format("Do MMMM YYYY")}
                      </div>
                      <div className="text-lg font-semibold text-gray-500">
                        {item?.title}
                      </div>
                    </div>
                    <IconEdit size={20} />
                  </div>
                  {/* Description */}
                  <div className="text-base text-gray-600">
                    {item?.description}
                  </div>
                </div>
              </div>
              {index < selfReviewItems[selectedYear]?.length - 1 ? (
                <Separator />
              ) : null}
            </React.Fragment>
          ))
        )}
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
