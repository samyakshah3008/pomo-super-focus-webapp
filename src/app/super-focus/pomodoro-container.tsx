import MusicWidget from "./music-widget";
import SuperFocusTimer from "./super-focus-timer";

const PomodoroContainer = () => {
  return (
    <div className="w-[620px] flex flex-col gap-5 m-auto">
      <SuperFocusTimer />
      <MusicWidget studySource="spotify" />
    </div>
  );
};

export default PomodoroContainer;
