"use client";

import { Button } from "@/components/ui/primitives/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/primitives/sheet";
import { createHabitService } from "@/services/habits-scorecard/habits-scorecard";
import { IconArrowBack } from "@tabler/icons-react";
import { Loader } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/primitives/input";
import { useToast } from "../ui/primitives/use-toast";
import {
  defineHabitsExamples,
  getSpecificExamples,
  groundItToIdentityExamples,
} from "./constants";

type HabitsSidesheetProps = {
  children: React.ReactNode;
  fetchHabitsItems: any;
  fetchTodayHabits: any;
  isGuestUser: boolean;
};

type HabitObj = {
  defineHabitText: string;
  getSpecificText: string;
  identityText: string;
};

const CreateHabitSidesheet = ({
  children,
  fetchHabitsItems,
  fetchTodayHabits,
  isGuestUser,
}: HabitsSidesheetProps) => {
  const [habitObj, setHabitObj] = useState<HabitObj>({
    defineHabitText: "",
    getSpecificText: "",
    identityText: "",
  });
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [repeat, setRepeat] = useState<"daily" | "weekly" | "">("");
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  const onOpenChangeHandler = () => {
    setHabitObj({
      defineHabitText: "",
      getSpecificText: "",
      identityText: "",
    });
    setLoading(false);
    setCurrentStep(0);
    setSelectedDays([]);
    setRepeat("");
  };

  const addNewItemToUserHabits = async () => {
    if (isGuestUser) {
      toast({
        variant: "destructive",
        title: "Guest users don't have creds for now! 😄",
        description:
          "However, we promise to give you a verified account access to the soonest!",
      });
    } else {
      setLoading(true);

      try {
        await createHabitService(
          habitObj.defineHabitText,
          habitObj.getSpecificText,
          habitObj.identityText,
          repeat,
          selectedDays
        );
        toast({
          variant: "default",
          title: "Item added to Habits List ✅",
          description:
            "Yay! we have successfully added your new item to your habit list!",
        });
        fetchHabitsItems();
        fetchTodayHabits();
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Oops, failed to add your item to habit list! ⚠️",
          description:
            "We are extremely sorry for this, please try again later. Appreciate your patience meanwhile we fix!",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleToggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const getSidesheetTitle = () => {
    if (currentStep == 0) {
      return "Create New Habit";
    } else if (currentStep == 1) {
      return "Define Your Habit";
    } else if (currentStep == 2) {
      return "Get Specific";
    } else if (currentStep == 3) {
      return "Ground it in an identity";
    } else if (currentStep == 4) {
      return "Set Frequency";
    } else if (currentStep == 5) {
      return "Final Review";
    }
  };

  const getSidesheetDescription = () => {
    if (currentStep == 0) {
      return "The best habits are made up of an action, a time and place, and - most importantly -- an identity";
    } else if (currentStep == 1) {
      return "What's your habit? Think small and specific.";
    } else if (currentStep == 2) {
      return "Where can you do this habit easily?";
    } else if (currentStep == 3) {
      return "The goal is not to read a book, the goal is to become a reader. Set your identity!";
    } else if (currentStep == 4) {
      return "Decide when you want this habit to be done.";
    } else if (currentStep == 5) {
      return "Review your final version of habit!";
    }
  };

  return (
    <>
      <Sheet onOpenChange={onOpenChangeHandler}>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent className="p-6 bg-gray-50 rounded-lg shadow-lg overflow-y-auto w-full sm:w-full md:max-w-[500px] flex flex-col gap-4">
          <SheetHeader>
            <SheetTitle className="text-2xl font-semibold text-gray-800">
              {getSidesheetTitle()}
            </SheetTitle>
            <SheetDescription>{getSidesheetDescription()}</SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-4">
            {currentStep === 0 ? (
              <div className="flex flex-col gap-2">
                <div className="text-black text-sm font-semibold">
                  This is the skeleton of the habit which you will create:{" "}
                </div>
                <div className="border-2 rounded-md border-dashed p-2 text-sm">
                  I will <span className="underline">habit</span>,{" "}
                  <span className="underline">time/location</span> so that I can
                  become{" "}
                  <span className="underline">type of person I want to be</span>{" "}
                </div>
                <Button size="sm" onClick={() => setCurrentStep(1)}>
                  Ready to create mine! 🚀
                </Button>
              </div>
            ) : null}

            {currentStep === 1 ? (
              <div className="flex flex-col gap-2">
                <div className="text-sm text-black">Define your Habit!</div>
                <Input
                  value={habitObj.defineHabitText}
                  onChange={(e: any) =>
                    setHabitObj({
                      ...habitObj,
                      defineHabitText: e.target.value,
                    })
                  }
                />
                <div className="flex flex-col gap-2">
                  <div className="text-sm text-black">Check examples:</div>
                  <div className="flex flex-wrap gap-1">
                    {defineHabitsExamples?.map((habit: string, index) => {
                      return (
                        <div
                          key={index}
                          className="rounded-md border-2 p-2 text-sm"
                        >
                          {" "}
                          {habit}{" "}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="flex gap-2 mt-5">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setCurrentStep(0)}
                  >
                    <IconArrowBack size={20} className="mr-2" /> Previous
                  </Button>
                  <Button
                    disabled={!habitObj.defineHabitText.length}
                    size="sm"
                    onClick={() => setCurrentStep(2)}
                  >
                    Go Next! 🚀
                  </Button>
                </div>
              </div>
            ) : null}

            {currentStep == 2 ? (
              <div className="flex flex-col gap-2">
                <div className="text-sm text-black">Get Specific!</div>
                <Input
                  value={habitObj.getSpecificText}
                  onChange={(e: any) =>
                    setHabitObj({
                      ...habitObj,
                      getSpecificText: e.target.value,
                    })
                  }
                />
                <div className="flex flex-col gap-2">
                  <div className="text-sm text-black">Check examples:</div>
                  <div className="flex flex-wrap gap-1">
                    {getSpecificExamples?.map((habit: string, index) => {
                      return (
                        <div
                          key={index}
                          className="rounded-md border-2 p-2 text-sm"
                        >
                          {" "}
                          {habit}{" "}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex gap-2 mt-5">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setCurrentStep(1)}
                  >
                    <IconArrowBack size={20} className="mr-2" /> Previous
                  </Button>
                  <Button
                    disabled={!habitObj.getSpecificText.length}
                    size="sm"
                    onClick={() => setCurrentStep(3)}
                  >
                    Go Next! 🚀
                  </Button>
                </div>
              </div>
            ) : null}

            {currentStep == 3 ? (
              <div className="flex flex-col gap-2">
                <div className="text-sm text-black">
                  Ground it to an Identity!
                </div>
                <Input
                  value={habitObj.identityText}
                  onChange={(e: any) =>
                    setHabitObj({
                      ...habitObj,
                      identityText: e.target.value,
                    })
                  }
                />
                <div className="flex flex-col gap-2">
                  <div className="text-sm text-black">Check examples:</div>
                  <div className="flex flex-wrap gap-1">
                    {groundItToIdentityExamples?.map((habit: string, index) => {
                      return (
                        <div
                          key={index}
                          className="rounded-md border-2 p-2 text-sm"
                        >
                          {" "}
                          {habit}{" "}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex gap-2 mt-5">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setCurrentStep(2)}
                  >
                    <IconArrowBack size={20} className="mr-2" /> Previous
                  </Button>
                  <Button
                    disabled={!habitObj.identityText.length}
                    size="sm"
                    onClick={() => setCurrentStep(4)}
                  >
                    Go Next! 🚀
                  </Button>
                </div>
              </div>
            ) : null}

            {currentStep == 4 ? (
              <>
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
                            selectedDays.includes(day) ? "default" : "outline"
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

                <div className="flex gap-2 mt-5">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setCurrentStep(3)}
                  >
                    <IconArrowBack size={20} className="mr-2" /> Previous
                  </Button>
                  <Button
                    disabled={!habitObj.defineHabitText.length}
                    size="sm"
                    onClick={() => setCurrentStep(5)}
                  >
                    Go Next! 🚀
                  </Button>
                </div>
              </>
            ) : null}

            {currentStep == 5 ? (
              <div className="flex flex-col gap-4">
                <div className="text-black text-sm font-semibold">
                  This is the final preview of the habit which you created!:{" "}
                </div>
                <div className="border-2 rounded-md border-dashed p-2 text-sm">
                  I will{" "}
                  <span className="underline">
                    {" "}
                    {habitObj?.defineHabitText}{" "}
                  </span>
                  ,{" "}
                  <span className="underline">{habitObj?.getSpecificText}</span>{" "}
                  so that I can become{" "}
                  <span className="underline">{habitObj?.identityText}</span>{" "}
                </div>
                <div className="text-sm">Repeat Frequency: {repeat}</div>
                <div className="text-sm flex gap-2 flex-wrap items-center">
                  Repeat days:{" "}
                  {selectedDays?.map((day) => {
                    return <div className="rounded-md border-2 p-2">{day}</div>;
                  })}
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-fit"
                  onClick={() => setCurrentStep(4)}
                >
                  <IconArrowBack size={20} className="mr-2" /> I want to edit!
                </Button>
              </div>
            ) : null}
          </div>
          <SheetFooter className="flex-1 items-end">
            <SheetClose asChild>
              <Button
                onClick={addNewItemToUserHabits}
                disabled={loading || currentStep !== 5}
                className="w-full"
              >
                {loading ? (
                  <Loader className="mr-2 h-8 w-8 animate-spin" />
                ) : null}
                {loading ? "Launching your habit..." : "Launch Habit!"}
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default CreateHabitSidesheet;
