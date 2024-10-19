"use client";

import { Button } from "@/components/ui/primitives/button";
import { Input } from "@/components/ui/primitives/input";
import { Switch } from "@/components/ui/primitives/switch";
import {
  IconBrandSpotifyFilled,
  IconBrandYoutube,
  IconEdit,
} from "@tabler/icons-react";
import { useState } from "react";

const Settings = () => {
  const [pomodoroSessionTimeBreakdown, setPomodoroSessionTimeBreakdown] =
    useState({ study: 25, shortBreak: 5, longBreak: 15 });
  const [studyMusicSourceId, setStudyMusicSourceId] = useState("7NOSDKb0HlU");
  const [isTimeSectionEditing, setIsTimeSectionEditing] = useState(false);
  const [isStudySectionEditing, setIsStudySectionEditing] = useState(false);
  const [isBreakSectionEditing, setIsBreakSectionEditing] = useState(false);
  const [isUIOptionsEditing, setIsUIOptionsEditing] = useState(false);

  return (
    <div className="flex flex-col gap-4 w-[70%] m-auto ">
      {/* Section 1 */}
      <div className="flex flex-col gap-4 border-2 rounded-md p-4">
        <div className="flex justify-between">
          <h1 className="text-xl underline">Time(Minutes):</h1>
          {isTimeSectionEditing ? (
            <div>
              {" "}
              <Button onClick={() => setIsTimeSectionEditing(false)} size="sm">
                Cancel
              </Button>{" "}
              <Button
                onClick={() => setIsTimeSectionEditing(false)}
                size="sm"
                variant="destructive"
              >
                Save
              </Button>{" "}
            </div>
          ) : (
            <IconEdit
              cursor="pointer"
              onClick={() => setIsTimeSectionEditing(true)}
              size={24}
            />
          )}
        </div>
        <div className="flex gap-2">
          <div className="flex flex-col gap-4 flex-1">
            Study:{" "}
            <Input
              className=""
              disabled={!isTimeSectionEditing}
              value={pomodoroSessionTimeBreakdown.study}
            />
          </div>
          <div className="flex flex-col gap-4 flex-1">
            Short break:{" "}
            <Input
              className=""
              value={pomodoroSessionTimeBreakdown.shortBreak}
              disabled={!isTimeSectionEditing}
            />
          </div>
          <div className="flex flex-col gap-4 flex-1">
            Long break:{" "}
            <Input
              className=""
              value={pomodoroSessionTimeBreakdown.longBreak}
              disabled={!isTimeSectionEditing}
            />
          </div>
        </div>
      </div>

      {/* Section 2 */}

      <div className="flex flex-col gap-4 border-2 rounded-md p-4">
        <div className="flex justify-between">
          <h1 className="text-xl underline">Study Options:</h1>
          {isStudySectionEditing ? (
            <div>
              {" "}
              <Button onClick={() => setIsStudySectionEditing(false)} size="sm">
                Cancel
              </Button>{" "}
              <Button
                onClick={() => setIsStudySectionEditing(false)}
                size="sm"
                variant="destructive"
              >
                Save
              </Button>{" "}
            </div>
          ) : (
            <IconEdit
              cursor="pointer"
              onClick={() => setIsStudySectionEditing(true)}
              size={24}
            />
          )}
        </div>

        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-1">
            <div>Auto Start Study Timer</div>
            <div className="text-slate-500 text-sm">
              When the break timer ends, start the next study timer
            </div>
          </div>
          <Switch checked={true} disabled={!isStudySectionEditing} />
        </div>

        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-1">
            <div>Auto Play Study Music</div>
            <div className="text-slate-500 text-sm">
              Start music when pomodoro study starts
            </div>
          </div>
          <Switch checked={true} disabled={!isStudySectionEditing} />
        </div>

        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-1">
            <div>Study Music Source</div>
            <div className="text-slate-500 text-sm">
              YouTube Video or Spotify playlist
            </div>
          </div>
          <div className="flex gap-2">
            <IconBrandYoutube size={24} />
            <IconBrandSpotifyFilled size={24} />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-1">
            <div>Study Music Playlist </div>
            <div className="text-slate-500 text-sm">A Spotify Playlist ID</div>
          </div>
          <Input value={studyMusicSourceId} disabled={!isStudySectionEditing} />
        </div>
      </div>

      {/* Section 3  */}

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
                onClick={() => setIsBreakSectionEditing(false)}
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
            <div>Break Music Source</div>
            <div className="text-slate-500 text-sm">
              YouTube Video or Spotify playlist
            </div>
          </div>
          <div className="flex gap-2">
            <IconBrandYoutube size={24} />
            <IconBrandSpotifyFilled size={24} />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-1">
            <div>Break Music Video</div>
            <div className="text-slate-500 text-sm">
              A YouTube ID for a video or livestream
            </div>
          </div>
          <Switch checked={true} disabled={!isBreakSectionEditing} />
        </div>

        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-1">
            <div>Break Music Video</div>
            <div className="text-slate-500 text-sm">
              A YouTube ID for a video or livestream
            </div>
          </div>
          <Input value={studyMusicSourceId} disabled={!isBreakSectionEditing} />
        </div>

        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-1">
            <div>Long Break Interval</div>
            <div className="text-slate-500 text-sm">
              Start long break after number of sessions (0 to disable)
            </div>
          </div>
          <Input value={4} type="number" disabled={!isBreakSectionEditing} />
        </div>
      </div>

      {/* section 4 */}

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
                onClick={() => setIsUIOptionsEditing(false)}
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
            value="https://ik.imagekit.io/flotes/city-bg.jpg"
            disabled={!isUIOptionsEditing}
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;
