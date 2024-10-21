"use client";

import { Button } from "@/components/ui/primitives/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/primitives/dialog";
import { Input } from "@/components/ui/primitives/input";
import { format } from "date-fns";
import { Loader } from "lucide-react";
import { useState } from "react";

const EditDetailsDialog = ({ isOpen, onClose }: any) => {
  const today = format(new Date(), "yyyy-MM-dd");
  const [birthDate, setBirthDate] = useState<any>();
  const [lifeSpan, setLifeSpan] = useState();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Details</DialogTitle>
        </DialogHeader>

        <DialogDescription>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="font-bold">Enter your birth date:</div>{" "}
              <Input
                max={today}
                type="date"
                value={birthDate}
                onChange={(e: any) => setBirthDate(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="font-bold">
                Decide your own estimate life span:
              </div>{" "}
              <Input
                type="number"
                value={lifeSpan}
                onChange={(e: any) => setLifeSpan(e.target.value)}
                placeholder="60"
              />{" "}
            </div>
          </div>
        </DialogDescription>

        <DialogFooter className="mt-4">
          <Button onClick={onClose} variant="secondary">
            Cancel
          </Button>
          <Button
            onClick={() => {}}
            variant="destructive"
            disabled={isLoading || !birthDate || !lifeSpan}
          >
            {isLoading ? (
              <Loader className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            {isLoading ? "Updating..." : "Update details"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditDetailsDialog;
