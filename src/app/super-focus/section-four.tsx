"use client";

import { Button } from "@/components/ui/primitives/button";
import { Input } from "@/components/ui/primitives/input";
import { IconEdit } from "@tabler/icons-react";

const SectionFour = ({
  isUIOptionsEditing,
  setIsUIOptionsEditing,
  saveSettings,
  superFocusDetails,
  setSuperFocusDetails,
}: any) => {
  const bgOptions = [
    "https://ik.imagekit.io/flotes/city-bg.jpg",
    "https://v3img.voot.com/v3Storage/assets/batman-begins_ivy-16x9-carousel--1683955875734.jpg",
    "https://images.bauerhosting.com/legacy/empire-tmdb/films/272/images/65JWXDCAfwHhJKnDwRnEgVB411X.jpg?ar=16%3A9&fit=crop&crop=top&auto=format&w=1440&q=80",
    "https://t3.ftcdn.net/jpg/05/60/77/40/360_F_560774032_WnWsB5kwhiKhstIWxmRhvE0gbsUmab3z.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRntfMfassAk9yuKMz0JTi559ybzh_IUtRejQ&usqp=CAU", // bapuji
    "https://i.pinimg.com/originals/8a/c9/8c/8ac98c370d75c1a2570494668ac364e0.jpg", // bapiju
    "https://i.pinimg.com/originals/0e/4b/48/0e4b488853b18d1038350bf5bc5b90a3.jpg",
  ];

  return (
    <div className="flex flex-col gap-4 border-2 rounded-md p-4">
      <div className="flex justify-between">
        <h1 className="text-xl underline">UI Options:</h1>
        {isUIOptionsEditing ? (
          <div>
            {" "}
            <Button onClick={() => setIsUIOptionsEditing(false)} size="sm">
              Cancel
            </Button>{" "}
            <Button
              onClick={() => saveSettings(4)}
              size="sm"
              variant="destructive"
            >
              Save
            </Button>{" "}
          </div>
        ) : (
          <IconEdit
            cursor="pointer"
            onClick={() => setIsUIOptionsEditing(true)}
            size={24}
          />
        )}
      </div>

      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <div>Background Image URL</div>
          <div className="text-slate-500 text-sm">
            Add a background image (Optional)
          </div>
          <div className="flex gap-2">
            <div className="text-sm">Try our few options:</div>
            <div className="underline text-sm cursor-pointer">Batman</div>
            <div className="underline text-sm cursor-pointer">Midnight</div>
          </div>
        </div>
        <Input
          value={superFocusDetails?.uiOptions?.backgroundImageUrl}
          disabled={!isUIOptionsEditing}
          onChange={(e) => {
            setSuperFocusDetails({
              ...superFocusDetails,
              uiOptions: {
                ...superFocusDetails?.uiOptions,
                backgroundImageUrl: e.target.value,
              },
            });
          }}
        />
      </div>
    </div>
  );
};

export default SectionFour;
