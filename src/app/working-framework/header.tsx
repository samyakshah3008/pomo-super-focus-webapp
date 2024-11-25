import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import Image from "next/image";
import WorkingFramework from "../../../public/working-framework.png";

const Header = ({ isGuestUser, currentUser }: any) => {
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
      <div className="border-2 mt-2 text-sm rounded-md border-green-500 border-solid p-2 bg-green-200 font-medium lg:w-[600px] text-center">
        {isGuestUser
          ? `Dear ${
              currentUser?.firstName || "Super User"
            }, for beta access - please
        mail me at samyakshah3008@gmail.com to unlock this for absolutely free
        of cost! 💝`
          : `Dear ${
              currentUser?.firstName || "Super User"
            }, you have beta access for this feature. We hope you will love it! 💝`}
      </div>
    </div>
  );
};

export default Header;
