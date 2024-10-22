"use client";

import GratitudeListDialog from "@/components/(gratitude-list)/dialog";
import { useState } from "react";

const GratitudeListCard = () => {
  const [gratitudeList, setGratitudeList] = useState([
    { text: "For my best health" },
    { text: "Because I am born - Jain" },
    { text: "I live with my parents" },
    { text: "I got to know linkedin's alternative - peerlist" },
    { text: "Have got opportunity to intern at 3 different companies" },
  ]);

  const [isUpdateItemDialogOpen, setIsUpdateItemDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  // const [bucketItemObj, setBucketItemObj] = useState({
  //   title: "",
  //   description: "",
  //   isCompleted: false,
  // });

  const onConfirm = () => {};

  const onClose = () => {
    setIsUpdateItemDialogOpen(false);
  };

  const updateItemHandler = (item: any) => {
    setIsUpdateItemDialogOpen(true);
  };

  return (
    <>
      <div className="w-[800px] bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          I am grateful for,{" "}
        </h2>
        <ul className="space-y-4">
          {gratitudeList.map((item, index) => (
            <li
              onClick={updateItemHandler}
              key={index}
              className={`flex items-center justify-between p-4 bg-gray-100 rounded-lg hover:bg-blue-100 
                        transition duration-200 cursor-pointer`}
            >
              <span>{item.text}</span>
              🙏
            </li>
          ))}
        </ul>
      </div>
      <GratitudeListDialog
        isOpen={isUpdateItemDialogOpen}
        isLoading={isLoading}
        isProcessing={isProcessing}
        onClose={onClose}
        onConfirm={onConfirm}
        title="Update gratitude"
        cancelText="I'll update later"
        confirmText="Update to my gratitude list!"
        showDeleteOption={true}
      />
    </>
  );
};

export default GratitudeListCard;
