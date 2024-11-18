"use client";

import { Button } from "@/components/ui/primitives/button";
import { fetchSelfReviewItemsService } from "@/services/self-review/self-review";
import { Loader } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import NotFoundItem from "../../../public/empty-state-box.png";
import CreateSelfReviewEventSidesheet from "../../components/(self-review)/create-event-sidesheet";
import Timeline from "./timeline";

const MainContainer = () => {
  const [selfReviewItems, setSelfReviewItems] = useState([]);
  const [isFetching, setisFetching] = useState(true);
  const [listOfYears, setListOfYears] = useState<any>([]);
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString()
  );

  const fetchSelfReviewItems = async () => {
    setisFetching(true);
    try {
      const response = await fetchSelfReviewItemsService();
      let items: any = response?.data?.data?.selfReviewListItems;
      setSelfReviewItems(items);
      setListOfYears(Object.keys(items));
      setSelectedYear(new Date().getFullYear().toString());
    } catch (error) {
    } finally {
      setisFetching(false);
    }
  };

  useEffect(() => {
    fetchSelfReviewItems();
  }, []);

  if (isFetching) {
    return (
      <div className="h-96 flex items-center">
        <Loader className="mr-2 h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!Object.keys(selfReviewItems).length) {
    return (
      <div className="flex flex-col gap-2 justify-center items-center">
        <Image src={NotFoundItem} alt="Not Found" className="w-40 h-40" />
        <h1 className="text-2xl font-bold ">
          Start documenting your year today!
        </h1>
        <p className="text-gray-600">
          You haven't documented anything yet, start today 😻
        </p>

        <CreateSelfReviewEventSidesheet
          fetchSelfReviewItems={fetchSelfReviewItems}
        >
          <Button size="sm">Add new event to my self review list! 🚀</Button>
        </CreateSelfReviewEventSidesheet>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-[70%] m-auto mb-5 ">
      <div className="flex gap-4 justify-center items-center cursor-pointer">
        {listOfYears?.map((year: any, index: any) => {
          return (
            <div
              key={index}
              className={`${
                selectedYear == year ? "text-blue-500 underline" : ""
              }`}
              onClick={() => setSelectedYear(year)}
            >
              {" "}
              {year}{" "}
            </div>
          );
        })}
      </div>
      <Timeline
        fetchSelfReviewItems={fetchSelfReviewItems}
        selfReviewItems={selfReviewItems}
        selectedYear={selectedYear}
      />
      <CreateSelfReviewEventSidesheet
        fetchSelfReviewItems={fetchSelfReviewItems}
      >
        <div className="flex justify-end">
          <Button size="sm" className="w-fit">
            Add new event to my self review list! 🚀
          </Button>
        </div>
      </CreateSelfReviewEventSidesheet>
    </div>
  );
};

export default MainContainer;
