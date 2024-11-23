"use client";

import { getCurrentYear, getDaysUntilYearEnd } from "@/utils/helper-functions";
import Image from "next/image";
import { useRouter } from "next/navigation";
import WorkingPerson from "../../../public/working-person-two.png";

const Header = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center h-screen">
      <div>
        <Image
          width={300}
          height={200}
          src={WorkingPerson}
          alt="witchy-leaders"
          className="w-[300px] h-[300px]"
        />
      </div>
      <div className="text-xs sm:text-base md:text-xl lg:text:3xl xl:text-5xl font-bold">
        Tiny Changes, <span className="text-blue-500">Remarkable Results!</span>{" "}
      </div>
      <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base text-center mt-3 ">
        A revolutionary system to get per cent better every day. People think
        when you want to change your life, you need to think big. Real change
        comes from compound effect of hundreds of small decisions - doing two
        push ups a day, waking up five minutes earlier, or reading just one more
        page. These small changes will have a transformative effect on your
        career, your relationships and your life. You have{" "}
        {getDaysUntilYearEnd()} days remaining of {getCurrentYear()}, make the
        best out of it;)
      </p>

      <div
        className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 text-white font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 mt-8 cursor-pointer"
        onClick={() => router.push("/habits-scorecard/dashboard")}
      >
        Go to Atomic Habits Dashboard with Witch
      </div>
    </div>
  );
};

export default Header;
