import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import Image from "next/image";
import WorkingFramework from "../../../public/working-framework.png";

const Header = () => {
  const words = `Follow the Working Framework and bring the best version of you!
`;

  return (
    <div className="flex flex-col items-center">
      <div className="w-[300px] h-[300px] mt-10">
        <Image src={WorkingFramework} alt="working-framework" />
      </div>
      <TextGenerateEffect words={words} />
      <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base mt-2 ">
        Everyone wants to be successful, but it's the one who stay consistent
        with the working framework is able to make it to top 1% club.
      </p>
    </div>
  );
};

export default Header;
