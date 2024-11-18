"use client";

import { useSuperFocus } from "@/context/super-focus";

const MusicWidget = ({
  studySource,
  currentSettingDetails,
}: {
  studySource: "spotify" | "youtube";
  currentSettingDetails: any;
}) => {
  const { activeState } = useSuperFocus();

  return (
    <div className="">
      {studySource === "spotify" ? (
        <iframe
          title="Spotify Playlist"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          width="100%"
          height="360"
          src={
            activeState === "study"
              ? `https://open.spotify.com/embed/playlist/${
                  currentSettingDetails?.studyOptions?.studyMusicPlaylistId
                }?autoplay=${
                  currentSettingDetails?.studyOptions?.autoPlayStudyMusic
                    ? 1
                    : 0
                }`
              : `https://open.spotify.com/embed/playlist/${
                  currentSettingDetails?.breakOptions?.breakMusicPlaylistId
                }?autoplay=${
                  currentSettingDetails?.breakOptions?.autoPlayBreakTimer
                    ? 1
                    : 0
                }`
          }
          className="rounded-3xl"
        ></iframe>
      ) : (
        <iframe
          id="player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          title="YouTube Playlist"
          width="640"
          height="320"
          src={
            activeState === "study"
              ? `https://www.youtube.com/embed/${
                  currentSettingDetails?.studyOptions?.studyMusicPlaylistId
                }?autoplay=${
                  currentSettingDetails?.studyOptions?.autoPlayStudyMusic
                    ? 1
                    : 0
                }`
              : `https://www.youtube.com/embed/${
                  currentSettingDetails?.breakOptions?.breakMusicPlaylistId
                }?autoplay=${
                  currentSettingDetails?.breakOptions?.autoPlayBreakTimer
                    ? 1
                    : 0
                }`
          }
          allowFullScreen
          className="rounded-3xl"
        ></iframe>
      )}
    </div>
  );
};

export default MusicWidget;
