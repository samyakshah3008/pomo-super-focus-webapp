"use client";

import BucketListDialog from "@/components/(bucket-list)/dialog";
import { Button } from "@/components/ui/primitives/button";
import Image from "next/image";
import { useState } from "react";
import ThinkingFace from "../../../public/thinking-face.png";
import BucketListCard from "./bucket-list-card";
import EmptyState from "./empty-state";

const MainContainer = () => {
  let isEmpty = false;
  let itemTitle = "Meet Virat Kohli";
  let itemDescription = "I want to meet Virat Kohli in-person";
  let isItemCompleted = false;

  const [isAddNewItemDialogOpen, setIsAddNewItemDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const onConfirm = () => {};

  const onClose = () => {
    setIsAddNewItemDialogOpen(false);
  };

  return (
    <>
      <div className="flex flex-col gap-4 p-5 items-center">
        {isEmpty ? <EmptyState /> : <BucketListCard />}
        <div className="flex flex-col gap-4 items-center">
          <Image src={ThinkingFace} alt="thinking" className="w-64 h-52" />
          <div className="text-xl underline">
            Want to add more items to your bucket list?
          </div>
          <Button
            onClick={() => setIsAddNewItemDialogOpen(true)}
            className="w-full"
          >
            Add Item!
          </Button>
        </div>
      </div>
      <BucketListDialog
        isOpen={isAddNewItemDialogOpen}
        isLoading={isLoading}
        isProcessing={isProcessing}
        onClose={onClose}
        onConfirm={onConfirm}
        title="Add new item"
        cancelText="I'll add later"
        confirmText="Add to my bucket!"
        showDeleteOption={false}
      />
    </>
  );
};

export default MainContainer;
