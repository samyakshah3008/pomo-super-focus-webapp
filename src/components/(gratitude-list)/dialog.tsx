"use client";

import { Button } from "@/components/ui/primitives/button";
import { Loader } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/primitives/dialog";
import { Input } from "../ui/primitives/input";
import { Textarea } from "../ui/primitives/textarea";

interface GratitudeListDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void; // Optional, for dialogs that require confirmation
  isProcessing?: boolean; // To show loading state for the confirm button
  isLoading?: boolean; // To show loading state for the entire dialog
  title: string;
  confirmText?: string; // Text for the confirm button
  cancelText?: string; // Text for the cancel button
  gratitudeItemTitle?: string;
  gratitudeItemDescription?: string;
  showDeleteOption: boolean;
}

const GratitudeListDialog = ({
  isOpen,
  onClose,
  title,
  isProcessing,
  isLoading,
  onConfirm,
  confirmText,
  cancelText,
  gratitudeItemTitle,
  gratitudeItemDescription,
  showDeleteOption,
}: GratitudeListDialogProps) => {
  const [itemTitle, setItemTitle] = useState(gratitudeItemTitle || "");
  const [itemDescription, setItemDescription] = useState(
    gratitudeItemDescription || ""
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
              Are you sure you want to delete this gratitude? It's irreversible
              action. Please review carefully.
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <div className="text-sm text-black"> Title: </div>
                <Input
                  value={itemTitle}
                  onChange={(e: any) => setItemTitle(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="text-sm text-black">Description: </div>

                <Textarea
                  value={itemDescription}
                  onChange={(e: any) => setItemDescription(e.target.value)}
                />
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

export default GratitudeListDialog;
