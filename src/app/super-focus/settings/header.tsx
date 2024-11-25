import Image from "next/image";
import Settings from "../../../../public/settings.png";

const Header = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-64 m-auto">
        <Image src={Settings} alt="goals checklist" />
      </div>
      <div className="text-xs sm:text-base md:text-xl lg:text-3xl xl:text-5xl font-bold text-center">
        Configure how you want,
        <span className="text-blue-500"> It's all yours!</span>
      </div>
      <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base text-center mt-3 lg:w-[800px]">
        Welcome to the Settings page! Customize how you want to use our
        pomodoro!
      </p>
    </div>
  );
};

export default Header;
