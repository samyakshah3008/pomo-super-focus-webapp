"use client";

import { Button } from "@/components/ui/primitives/button";
import { Checkbox } from "@/components/ui/primitives/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/primitives/dialog";
import { Input } from "@/components/ui/primitives/input";
import { Label } from "@/components/ui/primitives/label";
import { useToast } from "@/components/ui/primitives/use-toast";
import { put } from "@/config/API";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { habitCategories } from "../constants";

export function UpdateHabitDialog({
  isUpdateHabitDialogOpen,
  onCloseUpdateHabitDialog,
  habit,
  fetchHabits,
}: any) {
  const [title, setTitle] = useState<any>(habit?.title);
  const [repeat, setRepeat] = useState<"daily" | "weekly" | "">(habit?.repeat);
  const [selectedDays, setSelectedDays] = useState<string[]>(
    habit?.selectedDays
  );
  const [dailyReminder, setDailyReminder] = useState<boolean>(
    habit?.dailyReminder
  );
  const [reminderTime, setReminderTime] = useState<string>(habit?.reminderTime);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    habit?.categories
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { toast }: any = useToast();

  const currentUser: any = useSelector((state: any) => state?.user);

  const handleToggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const resetValues = () => {
    setTitle("");
    setRepeat("");
    setSelectedDays([]);
    setDailyReminder(false);
    setReminderTime("");
    setSelectedCategories([]);
    setIsSubmitting(false);
  };

  const isFormValid =
    title &&
    selectedDays.length > 0 &&
    (dailyReminder ? reminderTime : true) &&
    selectedCategories.length > 0;

  const handleSubmit = async () => {
    if (!isFormValid) return;

    try {
      setIsSubmitting(true);
      await put(`/habits/${habit?._id}`, {
        title,
        repeat,
        selectedDays,
        dailyReminder,
        reminderTime,
        categories: selectedCategories,
        userId: currentUser?.pomoSuperUser?._id,
      });
      toast({
        variant: "default",
        title: "Success!",
        description: "Habit updated",
      });
      fetchHabits();
    } catch (error) {
      console.error("Error creating habit:", error);

      toast({
        variant: "destructive",
        title: "Failed to create a habit!",
        description:
          "Uh oh! Something is wrong with our server, please try again later.",
      });
    } finally {
      setIsSubmitting(false);
      onCloseUpdateHabitDialog();
      resetValues();
    }
  };

  useEffect(() => {
    if (selectedDays?.length !== 7 && repeat == "daily") {
      setRepeat("weekly");
    }
  }, [selectedDays]);

  return (
    <Dialog
      open={isUpdateHabitDialogOpen}
      onOpenChange={onCloseUpdateHabitDialog}
    >
      <DialogContent className="min-h-[662px]">
        <DialogHeader>
          <DialogTitle>Update Habit</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <Label htmlFor="habit-title">Habit Title:</Label>
            <Input
              id="habit-title"
              value={title}
              className=""
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="font-semibold text-sm">Repeat:</div>
            <div className="flex gap-4">
              <Button
                variant={repeat === "daily" ? "default" : "outline"}
                onClick={() => {
                  setSelectedDays([
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri",
                    "Sat",
                    "Sun",
                  ]);
                  setRepeat("daily");
                }}
              >
                Daily
              </Button>
              <Button
                variant={repeat === "weekly" ? "default" : "outline"}
                onClick={() => {
                  setRepeat("weekly");
                }}
              >
                Weekly
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="font-semibold text-sm">Select Days:</div>
            <div className="flex gap-2">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                (day, idx) => (
                  <Button
                    key={idx}
                    variant={
                      selectedDays?.includes(day) ? "default" : "outline"
                    }
                    onClick={() => handleToggleDay(day)}
                    size="sm"
                  >
                    {day}
                  </Button>
                )
              )}
            </div>
          </div>

          <div className="flex gap-1 items-center">
            <Checkbox
              id="daily-reminder"
              checked={dailyReminder}
              onCheckedChange={() => setDailyReminder(!dailyReminder)}
            />
            <Label htmlFor="daily-reminder" className="text-sm">
              Daily Reminder
            </Label>
          </div>

          {dailyReminder && (
            <div>
              <Label htmlFor="reminder-time">Reminder Time</Label>
              <Input
                type="time"
                id="reminder-time"
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
              />
            </div>
          )}

          <div className="flex flex-col gap-2">
            <div className="text-sm font-semibold">Select Categories:</div>
            <div className="flex gap-2 flex-wrap">
              {habitCategories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategories?.includes(category)
                      ? "default"
                      : "outline"
                  }
                  onClick={() =>
                    setSelectedCategories((prev) =>
                      prev.includes(category)
                        ? prev.filter((c) => c !== category)
                        : [...prev, category]
                    )
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter className="items-end">
          <Button onClick={handleSubmit} disabled={!isFormValid}>
            Update Habit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
