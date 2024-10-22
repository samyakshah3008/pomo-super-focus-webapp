"use client";

import BucketListDialog from "@/components/(bucket-list)/dialog";
import { IconCheck } from "@tabler/icons-react";
import { useState } from "react";

const BucketListCard = () => {
  const [bucketListItems, setBucketListItems] = useState([
    { text: "Build a remote office", completed: true },
    { text: "Travel to Ladakh via bike", completed: true },
    { text: "Watch RCB lifting IPL Trophy alive", completed: false },
    { text: "Retire parents", completed: false },
    { text: "Meet Virat Kohli", completed: false },
  ]);

  const [isUpdateItemDialogOpen, setIsUpdateItemDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [bucketItemObj, setBucketItemObj] = useState({
    title: "",
    description: "",
    isCompleted: false,
  });

  const onConfirm = () => {};

  const onClose = () => {
    setIsUpdateItemDialogOpen(false);
  };

  const updateItemHandler = (item: any) => {
    setBucketItemObj({
      title: item?.text,
      description: item?.text,
      isCompleted: item?.completed,
    });
    setIsUpdateItemDialogOpen(true);
  };

  return (
    <>
      <div className="w-[800px] bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          My Bucket List
        </h2>
        <ul className="space-y-4">
          {bucketListItems.map((item, index) => (
            <li
              onClick={() => updateItemHandler(item)}
              key={index}
              className={`flex items-center justify-between p-4 bg-gray-100 rounded-lg hover:bg-blue-100 
                        transition duration-200 cursor-pointer ${
                          item.completed
                            ? "line-through text-gray-400"
                            : "text-gray-800"
                        }`}
            >
              <span>{item.text}</span>
              {item.completed ? (
                <IconCheck className="w-6 h-6 text-green-500" />
              ) : (
                <IconCheck className="w-6 h-6 text-gray-400 invisible" />
              )}
            </li>
          ))}
        </ul>
      </div>
      <BucketListDialog
        isOpen={isUpdateItemDialogOpen}
        isLoading={isLoading}
        isProcessing={isProcessing}
        onClose={onClose}
        onConfirm={onConfirm}
        title="Update item"
        cancelText="I'll update later"
        confirmText="Update this to my bucket!"
        bucketItemTitle={bucketItemObj.title}
        bucketItemDescription={bucketItemObj.description}
        isBucketItemCompleted={bucketItemObj.isCompleted}
        showDeleteOption={true}
      />
    </>
  );
};

export default BucketListCard;
