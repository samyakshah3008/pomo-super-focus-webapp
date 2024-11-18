"use client";

import { Button } from "@/components/ui/primitives/button";
import { Input } from "@/components/ui/primitives/input";
import { Switch } from "@/components/ui/primitives/switch";
import {
  IconBrandSpotify,
  IconBrandSpotifyFilled,
  IconBrandYoutube,
  IconBrandYoutubeFilled,
  IconEdit,
} from "@tabler/icons-react";

const SectionThree = ({
  isBreakSectionEditing,
  setIsBreakSectionEditing,
  saveSettings,
  superFocusDetails,
  setSuperFocusDetails,
}: any) => {
  return (
    <div className="flex flex-col gap-4 border-2 rounded-md p-4">
      <div className="flex justify-between">
        <h1 className="text-xl underline">Break Options:</h1>
        {isBreakSectionEditing ? (
          <div>
            {" "}
            <Button onClick={() => setIsBreakSectionEditing(false)} size="sm">
              Cancel
            </Button>{" "}
            <Button
              onClick={() => saveSettings(3)}
              size="sm"
              variant="destructive"
            >
              Save
            </Button>{" "}
          </div>
        ) : (
          <IconEdit
            cursor="pointer"
            onClick={() => setIsBreakSectionEditing(true)}
            size={24}
          />
        )}
      </div>

      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <div>Auto Start Break Timer </div>
          <div className="text-slate-500 text-sm">
            When the study timer ends, start the next break timer
          </div>
        </div>
        <Switch
          checked={superFocusDetails?.breakOptions?.autoStartBreakTimer}
          disabled={!isBreakSectionEditing}
          onCheckedChange={() =>
            setSuperFocusDetails({
              ...superFocusDetails,
              breakOptions: {
                ...superFocusDetails?.breakOptions,
                autoStartBreakTimer:
                  !superFocusDetails?.breakOptions?.autoStartBreakTimer,
              },
            })
          }
        />
      </div>

      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <div>Auto Play Break Music</div>
          <div className="text-slate-500 text-sm">
            Start music when pomodoro break starts
          </div>
        </div>
        <Switch
          checked={superFocusDetails?.breakOptions?.autoPlayBreakTimer}
          disabled={!isBreakSectionEditing}
          onCheckedChange={() =>
            setSuperFocusDetails({
              ...superFocusDetails,
              breakOptions: {
                ...superFocusDetails?.breakOptions,
                autoPlayBreakTimer:
                  !superFocusDetails?.breakOptions?.autoPlayBreakTimer,
              },
            })
          }
        />
      </div>

      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <div>Break Music Source</div>
          <div className="text-slate-500 text-sm">
            YouTube Video or Spotify playlist
          </div>
        </div>
        <div className="flex gap-2">
          {superFocusDetails?.breakOptions?.breakMusicSource == "youtube" ? (
            <>
              <IconBrandYoutubeFilled size={24} />
              <IconBrandSpotify
                onClick={() => {
                  if (!isBreakSectionEditing) return;
                  setSuperFocusDetails({
                    ...superFocusDetails,
                    breakOptions: {
                      ...superFocusDetails?.breakOptions,
                      breakMusicSource: "spotify",
                    },
                  });
                }}
                size={24}
              />
            </>
          ) : (
            <>
              <IconBrandYoutube
                onClick={() => {
                  if (!isBreakSectionEditing) return;
                  setSuperFocusDetails({
                    ...superFocusDetails,
                    breakOptions: {
                      ...superFocusDetails?.breakOptions,
                      breakMusicSource: "youtube",
                    },
                  });
                }}
                size={24}
              />{" "}
              <IconBrandSpotifyFilled size={24} />{" "}
            </>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <div>Break Music Video</div>
          <div className="text-slate-500 text-sm">
            {superFocusDetails?.breakOptions?.breakMusicSource == "youtube"
              ? "A YouTube ID for a video or livestream"
              : "A Spotify ID for break songs"}
          </div>
        </div>
        <Input
          value={superFocusDetails?.breakOptions?.breakMusicPlaylistId}
          disabled={!isBreakSectionEditing}
          onChange={(e) => {
            setSuperFocusDetails({
              ...superFocusDetails,
              breakOptions: {
                ...superFocusDetails?.breakOptions,
                breakMusicPlaylistId: e.target.value,
              },
            });
          }}
        />
      </div>

      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <div>Long Break Interval</div>
          <div className="text-slate-500 text-sm">
            Start long break after number of sessions (0 to disable)
          </div>
        </div>
        <Input
          value={superFocusDetails?.breakOptions?.longBreakInterval}
          type="number"
          disabled={!isBreakSectionEditing}
          onChange={(e) => {
            setSuperFocusDetails({
              ...superFocusDetails,
              breakOptions: {
                ...superFocusDetails?.breakOptions,
                longBreakInterval: e.target.value,
              },
            });
          }}
        />
      </div>
    </div>
  );
};

export default SectionThree;
