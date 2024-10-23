"use client";

import { DataTable } from "@/components/(bucket-list)/data-table";
import BucketListDialog from "@/components/(bucket-list)/dialog";
import { useState } from "react";
import { dummyBucketList } from "./constants";

const MainContainer = () => {
  let isEmpty = false;

  const [isAddNewItemDialogOpen, setIsAddNewItemDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const onConfirm = () => {};

  const onClose = () => {
    setIsAddNewItemDialogOpen(false);
  };

  return (
    <>
      <div className="w-[80%]">
        <DataTable data={dummyBucketList} />
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
