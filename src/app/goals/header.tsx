import Image from "next/image";
import Goals from "../../../public/goals-checklist-with-cat.png";

const Header = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-64 m-auto">
        <Image src={Goals} alt="goals checklist" />
      </div>
      <div className="text-xs sm:text-base md:text-xl lg:text-3xl xl:text-5xl font-bold text-center">
        Divide Your Yearly Goals{" "}
        <span className="text-blue-500">In Chunks</span>
      </div>
      <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base text-center mt-3 lg:w-[800px]">
        Break down your big dreams into smaller, actionable goals. Goal should
        have a clear title, description, and progress status. Stay on track and
        celebrate every milestone on your journey.
      </p>
    </div>
  );
};

export default Header;
