"use client";

import { DataTable } from "@/components/(gratitude-list)/data-table";
import GratitudeListDialog from "@/components/(gratitude-list)/dialog";
import { Highlight } from "@/components/common/card-stack";
import { useState } from "react";
import { dummyGratitudeList } from "./constants";

const gratitudeItems = [
  {
    id: 0,
    name: "Samyak Shah",
    designation: "22nd October 2024",
    content: (
      <p>
        I am immensely grateful for my <Highlight>best health</Highlight> 🙏,
        2024 made me realized what bad health mean and the importance of taking
        care of health asset.
      </p>
    ),
  },
  {
    id: 1,
    name: "Samyak Shah",
    designation: "22nd October 2024",
    content: (
      <p>
        I am immensely grateful for
        <Highlight>Cosmofeed, ProCred and Dicot</Highlight> where I did
        internships during my <Highlight>College</Highlight> which will help me
        later in my career.
      </p>
    ),
  },
  {
    id: 2,
    name: "Samyak Shah",
    designation: "22nd October 2024",
    content: (
      <p>
        I am immensely grateful for
        <Highlight>Open source communities</Highlight> where I am involved which
        is responsible for my blazing growth in software engineering career.
      </p>
    ),
  },
];

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
        <DataTable data={dummyGratitudeList} />
      </div>
      <GratitudeListDialog
        isOpen={isAddNewItemDialogOpen}
        isLoading={isLoading}
        isProcessing={isProcessing}
        onClose={onClose}
        onConfirm={onConfirm}
        title="Add new gratitude"
        cancelText="I'll add later"
        confirmText="Add to my gratitude list!"
        showDeleteOption={false}
      />
    </>
  );
};

export default MainContainer;
