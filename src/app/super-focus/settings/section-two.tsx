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

const SectionTwo = ({
  isStudySectionEditing,
  setIsStudySectionEditing,
  saveSettings,
  superFocusDetails,
  setSuperFocusDetails,
  onCancelEdit,
  isGuestUser,
}: any) => {
  return (
    <div className="flex flex-col gap-4 border-2 rounded-md p-4">
      <div className="flex justify-between">
        <h1 className="text-xl underline">Study Options:</h1>
        {isStudySectionEditing ? (
          <div>
            {" "}
            <Button onClick={() => onCancelEdit(2)} size="sm">
              Cancel
            </Button>{" "}
            <Button
              onClick={() => saveSettings(2)}
              size="sm"
              variant="destructive"
            >
              Save
            </Button>{" "}
          </div>
        ) : (
          <IconEdit
            cursor="pointer"
            onClick={() => {
              if (!isGuestUser) {
                setIsStudySectionEditing(true);
              }
            }}
            size={24}
          />
        )}
      </div>

      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <div>Auto Start Study Timer</div>
          <div className="text-slate-500 text-sm">
            When the break timer ends, start the next study timer (Coming Soon!)
          </div>
        </div>
        <Switch
          checked={superFocusDetails?.studyOptions?.autoStartStudyTimer}
          disabled={true}
          onCheckedChange={() =>
            setSuperFocusDetails({
              ...superFocusDetails,
              studyOptions: {
                ...superFocusDetails?.studyOptions,
                autoStartStudyTimer:
                  !superFocusDetails?.studyOptions?.autoStartStudyTimer,
              },
            })
          }
        />
      </div>

      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <div>Auto Play Study Music</div>
          <div className="text-slate-500 text-sm">
            Start music when pomodoro study starts (Coming Soon!)
          </div>
        </div>
        <Switch
          checked={superFocusDetails?.studyOptions?.autoPlayStudyMusic}
          disabled={true}
          onCheckedChange={() =>
            setSuperFocusDetails({
              ...superFocusDetails,
              studyOptions: {
                ...superFocusDetails?.studyOptions,
                autoPlayStudyMusic:
                  !superFocusDetails?.studyOptions?.autoPlayStudyMusic,
              },
            })
          }
        />
      </div>

      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <div>Study Music Source</div>
          <div className="text-slate-500 text-sm">
            YouTube Video or Spotify playlist
          </div>
        </div>
        <div className="flex gap-2">
          {superFocusDetails?.studyOptions?.studyMusicSource == "youtube" ? (
            <>
              <IconBrandYoutubeFilled size={24} />
              <IconBrandSpotify
                onClick={() => {
                  if (!isStudySectionEditing) return;
                  setSuperFocusDetails({
                    ...superFocusDetails,
                    studyOptions: {
                      ...superFocusDetails?.studyOptions,
                      studyMusicSource: "spotify",
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
                  if (!isStudySectionEditing) return;
                  setSuperFocusDetails({
                    ...superFocusDetails,
                    studyOptions: {
                      ...superFocusDetails?.studyOptions,
                      studyMusicSource: "youtube",
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
          <div>Study Music Playlist </div>

          <div className="text-slate-500 text-sm">
            {superFocusDetails?.studyOptions?.studyMusicSource == "youtube"
              ? "A YouTube Playlist ID"
              : "A Spotify Playlist ID"}{" "}
          </div>
        </div>
        <Input
          onChange={(e) =>
            setSuperFocusDetails({
              ...superFocusDetails,
              studyOptions: {
                ...superFocusDetails?.studyOptions,
                studyMusicPlaylistId: e.target.value,
              },
            })
          }
          value={superFocusDetails?.studyOptions?.studyMusicPlaylistId}
          disabled={!isStudySectionEditing}
        />
      </div>
    </div>
  );
};

export default SectionTwo;
