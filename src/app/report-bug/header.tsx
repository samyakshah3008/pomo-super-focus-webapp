import Lottie from "lottie-react";
import ReportBug from "../../../public/report-bug.json";

const Header = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-[300px] h-[300px]">
        <Lottie
          animationData={ReportBug}
          loop={true}
          width={300}
          height={300}
        />
      </div>
      <div className="text-xs sm:text-base md:text-xl lg:text-3xl xl:text-5xl font-bold text-center">
        We promise to fix the <span className="text-blue-500">Bug</span>
      </div>
      <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base text-center mt-3 lg:w-[800px]">
        We are very sorry to disappoint you, please fill this form of what exact
        issue you are facing and we promise to fix it to the soonest! 💙 or
        create manual github ticket{" "}
        <a
          className="text-blue-500 font-semibold underline"
          href="https://github.com/samyakshah3008/pomo-super-focus-webapp/issues"
          target="_blank"
        >
          here
        </a>
      </p>
    </div>
  );
};

export default Header;
