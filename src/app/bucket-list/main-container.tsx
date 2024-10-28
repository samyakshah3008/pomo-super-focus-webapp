"use client";

import CreateBucketItemSidesheet from "@/components/(bucket-list)/create-bucket-item-sidesheet";
import { DataTable } from "@/components/(bucket-list)/data-table";
import { Button } from "@/components/ui/primitives/button";
import { useToast } from "@/components/ui/primitives/use-toast";
import { fetchBucketListService } from "@/services/bucket-list/bucket-list";
import { Loader } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import NotFoundItem from "../../../public/empty-state-box.png";

const MainContainer = () => {
  const [bucketItems, setBucketItems] = useState<any>([]);
  const [fetchingBucketItems, setFetchingBucketItems] = useState(true);

  const { toast } = useToast();

  const fetchBucketItems = async () => {
    try {
      const response = await fetchBucketListService();
      let bucketItems = response?.data?.data?.bucketItems;
      let reversedBucketItems = [...bucketItems].reverse();
      setBucketItems(reversedBucketItems || []);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Oops, failed to fetch your bucket list! ⚠️",
        description:
          "We are extremely sorry for this, please try again later. Appreciate your patience meanwhile we fix!",
      });
    } finally {
      setFetchingBucketItems(false);
    }
  };

  useEffect(() => {
    fetchBucketItems();
  }, []);

  if (fetchingBucketItems) {
    return (
      <div className="h-96 flex items-center">
        <Loader className="mr-2 h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!bucketItems?.length) {
    return (
      <div className="h-96 flex flex-col gap-2 justify-center items-center">
        <Image src={NotFoundItem} alt="Not Found" className="w-40 h-40" />
        <h1 className="text-2xl font-bold ">Fill your bucket list today!</h1>
        <p className="text-gray-600">
          You haven't added any item to your unlimited storage bucket, add one
          today 😻
        </p>
        <CreateBucketItemSidesheet fetchBucketItems={fetchBucketItems}>
          <Button size="sm">Add new item to my bucket! 🚀</Button>
        </CreateBucketItemSidesheet>
      </div>
    );
  }

  return (
    <>
      <div className="w-[80%]">
        <DataTable data={bucketItems} fetchBucketItems={fetchBucketItems} />
      </div>
    </>
  );
};

export default MainContainer;
