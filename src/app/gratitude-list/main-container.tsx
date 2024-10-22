"use client";

import GratitudeListDialog from "@/components/(gratitude-list)/dialog";
import { CardStackUsage, Highlight } from "@/components/common/card-stack";
import { Button } from "@/components/ui/primitives/button";
import Image from "next/image";
import { useState } from "react";
import ThinkingFace from "../../../public/thinking-face.png";
import EmptyState from "./empty-state";
import GratitudeListCard from "./gratitude-list-card";

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
      <div className="flex flex-col gap-4 p-5 items-center">
        {isEmpty ? (
          <EmptyState />
        ) : (
          <div className="flex flex-col gap-10 justify-center">
            <CardStackUsage className="mt-10" items={gratitudeItems} />
            <GratitudeListCard />
          </div>
        )}

        <div className="flex flex-col gap-4 items-center">
          <Image src={ThinkingFace} alt="thinking" className="w-64 h-52" />
          <div className="text-xl underline">
            Want to add more items to your gratitude list?
          </div>
          <Button
            onClick={() => setIsAddNewItemDialogOpen(true)}
            className="w-full"
          >
            Add Item!
          </Button>
        </div>
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
