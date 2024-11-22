"use client";

import CreateGratitudeSidesheet from "@/components/(gratitude-list)/create-gratitude-sidesheet";
import { DataTable } from "@/components/(gratitude-list)/data-table";
import { Button } from "@/components/ui/primitives/button";
import { useToast } from "@/components/ui/primitives/use-toast";
import { fetchGratitudeListService } from "@/services/gratitude-list/gratitude-list";
import { Loader } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NotFoundItem from "../../../public/empty-state-box.png";
import { guestUserGratitudeList } from "./constants";

const MainContainer = () => {
  const [gratitudeItems, setGratitudeItems] = useState<any>([]);
  const [fetchingGratitudeItems, setFetchingGratitudeItems] = useState(true);
  const [isGuestUser, setIsGuestUser] = useState(false);

  const currentUser = useSelector((state: any) => state?.user?.pomoSuperUser);
  const { toast } = useToast();

  const fetchGratitudeItems = async () => {
    try {
      const response = await fetchGratitudeListService();
      let gratitudeItems = response?.data?.data?.gratitudeItems;
      let reversedGratitudeItems = [...gratitudeItems].reverse();
      setGratitudeItems(reversedGratitudeItems || []);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Oops, failed to fetch your gratitude list! ⚠️",
        description:
          "We are extremely sorry for this, please try again later. Appreciate your patience meanwhile we fix!",
      });
    } finally {
      setFetchingGratitudeItems(false);
    }
  };

  useEffect(() => {
    if (!currentUser?._id) return;
    if (currentUser?.isGuestUser) {
      setIsGuestUser(true);
      setGratitudeItems(guestUserGratitudeList);
      setFetchingGratitudeItems(false);
    } else {
      setIsGuestUser(false);
      fetchGratitudeItems();
    }
  }, [currentUser]);

  if (fetchingGratitudeItems || !currentUser?._id) {
    return (
      <div className="h-96 flex items-center">
        <Loader className="mr-2 h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!gratitudeItems?.length) {
    return (
      <div className="h-96 flex flex-col gap-2 justify-center items-center">
        <Image src={NotFoundItem} alt="Not Found" className="w-40 h-40" />
        <h1 className="text-2xl font-bold">Start your gratitude list today!</h1>
        <p className="text-gray-600">
          You haven't added any items to your gratitude list. Add one today! 😻
        </p>
        <CreateGratitudeSidesheet
          fetchGratitudeItems={fetchGratitudeItems}
          isGuestUser={isGuestUser}
        >
          <Button size="sm">Add a new gratitude item! 🚀</Button>
        </CreateGratitudeSidesheet>
      </div>
    );
  }

  return (
    <>
      <div className="w-[80%]">
        <DataTable
          data={gratitudeItems}
          fetchGratitudeItems={fetchGratitudeItems}
          isGuestUser={isGuestUser}
        />
      </div>
    </>
  );
};

export default MainContainer;
