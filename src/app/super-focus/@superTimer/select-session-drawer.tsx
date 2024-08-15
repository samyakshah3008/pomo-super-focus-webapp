"use client";

import { Button } from "@/components/ui/primitives/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/primitives/drawer";
import { Minus, Plus } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer } from "recharts";
import {
  sampleIncreasingBarGraphData,
  sessionFocusTimePickerData,
} from "./constants";

type SelectSessionDrawerProps = {
  isSelectSessionDrawerOpen: boolean;
  onCloseDrawer: any;
  focusTimeInputValue: number;
  setFocusTimeInputValue: any;
  onStartFocus: any;
};

const SelectSessionDrawer = ({
  isSelectSessionDrawerOpen,
  onCloseDrawer,
  focusTimeInputValue,
  setFocusTimeInputValue,
  onStartFocus,
}: SelectSessionDrawerProps) => {
  const onIncrease = () => {
    const findCurrentSessionFocusTimeItemIndex =
      sessionFocusTimePickerData.findIndex(
        (item) => item.minutes == focusTimeInputValue
      );
    const nextItem =
      sessionFocusTimePickerData[findCurrentSessionFocusTimeItemIndex + 1];
    setFocusTimeInputValue(nextItem.minutes);
  };

  const onDecrease = () => {
    const findCurrentSessionFocusTimeItemIndex =
      sessionFocusTimePickerData.findIndex(
        (item) => item.minutes == focusTimeInputValue
      );
    const prevItem =
      sessionFocusTimePickerData[findCurrentSessionFocusTimeItemIndex - 1];
    setFocusTimeInputValue(prevItem.minutes);
  };

  return (
    <Drawer open={isSelectSessionDrawerOpen}>
      <DrawerTrigger asChild></DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Choose Laser Focus Time</DrawerTitle>
            <DrawerDescription>
              Bring the best out of yourself
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex items-center justify-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={onDecrease}
                disabled={focusTimeInputValue <= 10}
              >
                <Minus className="h-4 w-4" />
                <span className="sr-only">Decrease</span>
              </Button>
              <div className="flex-1 text-center">
                <div className="text-7xl font-bold tracking-tighter">
                  {focusTimeInputValue}
                </div>
                <div className="text-[0.70rem] uppercase text-muted-foreground">
                  Mins of Laser Focus
                </div>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={onIncrease}
                disabled={focusTimeInputValue >= 90}
              >
                <Plus className="h-4 w-4" />
                <span className="sr-only">Increase</span>
              </Button>
            </div>
            <div className="mt-3 h-[120px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sampleIncreasingBarGraphData}>
                  <Bar
                    dataKey="goal"
                    style={
                      {
                        fill: "hsl(var(--foreground))",
                        opacity: 0.9,
                      } as React.CSSProperties
                    }
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <DrawerFooter>
            <Button onClick={onStartFocus}>Start Laser Focus</Button>
            <DrawerClose asChild>
              <Button onClick={onCloseDrawer} variant="outline">
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default SelectSessionDrawer;
