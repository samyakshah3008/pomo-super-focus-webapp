import DescriptionContainer from "./description-container";
import PomodoroContainer from "./pomodoro-container";

const MainContainer = () => {
  return (
    <div>
      <PomodoroContainer />
      <DescriptionContainer themeColor="emerald" />
    </div>
  );
};

export default MainContainer;
