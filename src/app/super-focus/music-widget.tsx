const MusicWidget = ({
  studySource,
}: {
  studySource: "spotify" | "youtube";
}) => {
  return (
    <div className="">
      {studySource == "spotify" ? (
        <iframe
          title="Spotify Playlist"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          width="100%"
          height="360"
          src="https://open.spotify.com/embed/playlist/0vvXsWCC9xrXsKd4FyS8kM?utm_source=iframe-api"
          className="rounded-3xl"
        ></iframe>
      ) : (
        <iframe
          id="player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          title="lofi hip hop radio - beats to study/relax to 🐾"
          width="640"
          height="320"
          src="https://www.youtube.com/embed/7NOSDKb0HlU?playsinline=1&enablejsapi=1&origin=https%3A%2F%2Ftimer.flotes.app&widgetid=2"
          allowFullScreen
          className="rounded-3xl"
        ></iframe>
      )}
    </div>
  );
};

export default MusicWidget;
