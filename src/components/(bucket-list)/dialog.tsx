"use client";

import { Button } from "@/components/ui/primitives/button";
import { Loader } from "lucide-react";
import { useState } from "react";
import { Checkbox } from "../ui/primitives/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/primitives/dialog";
import { Input } from "../ui/primitives/input";
import { Label } from "../ui/primitives/label";
import { Textarea } from "../ui/primitives/textarea";

interface BucketListDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void; // Optional, for dialogs that require confirmation
  isProcessing?: boolean; // To show loading state for the confirm button
  isLoading?: boolean; // To show loading state for the entire dialog
  title: string;
  confirmText?: string; // Text for the confirm button
  cancelText?: string; // Text for the cancel button
  bucketItemTitle?: string;
  bucketItemDescription?: string;
  isBucketItemCompleted?: boolean;
  showDeleteOption: boolean;
}

const BucketListDialog = ({
  isOpen,
  onClose,
  title,
  isProcessing,
  isLoading,
  onConfirm,
  confirmText,
  cancelText,
  bucketItemTitle,
  bucketItemDescription,
  isBucketItemCompleted,
  showDeleteOption,
}: BucketListDialogProps) => {
  const [itemTitle, setItemTitle] = useState(bucketItemTitle || "");
  const [itemDescription, setItemDescription] = useState(
    bucketItemDescription || ""
  );
  const [isItemCompleted, setIsItemCompleted] = useState(
    isBucketItemCompleted || false
  );

  const [isDeleteScreenEnable, setIsDeleteScreenEnable] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <DialogDescription>
          {isDeleteScreenEnable ? (
            <div
              className={
                "border-2 border-solid border-red-500 p-2 rounded-md bg-red-100"
              }
            >
              Are you sure you want to delete this item from your bucket list?
              It's irreversible action. Please review carefully.
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <div className="text-sm text-black">Bucket Item Title: </div>
                <Input
                  value={itemTitle}
                  onChange={(e: any) => setItemTitle(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="text-sm text-black">
                  Bucket Item Description:{" "}
                </div>

                <Textarea
                  value={itemDescription}
                  onChange={(e: any) => setItemDescription(e.target.value)}
                />
              </div>
              <div className="flex gap-1 items-center">
                <Checkbox
                  id="item-completed"
                  checked={isItemCompleted}
                  onCheckedChange={() => setIsItemCompleted(!isItemCompleted)}
                />
                <Label htmlFor="item-completed" className="text-sm">
                  I have completed this!! 🥳
                </Label>
              </div>
              {showDeleteOption ? (
                <div
                  onClick={() => setIsDeleteScreenEnable(true)}
                  className="text-red-500 underline text-sm cursor-pointer"
                >
                  I want to delete this
                </div>
              ) : null}
            </div>
          )}
        </DialogDescription>

        <DialogFooter className="mt-4">
          {isDeleteScreenEnable ? (
            <>
              <Button onClick={onClose} variant="secondary">
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={onConfirm}
                disabled={isProcessing || isLoading}
              >
                {isLoading ? (
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                {isLoading ? "deleting..." : "Yes, please delete."}
              </Button>
            </>
          ) : (
            <>
              <Button onClick={onClose} variant="secondary">
                {cancelText}
              </Button>
              <Button onClick={onConfirm} disabled={isProcessing || isLoading}>
                {isLoading ? (
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                {isLoading ? "Loading..." : confirmText}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BucketListDialog;
