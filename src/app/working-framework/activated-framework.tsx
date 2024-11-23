"use client";

import { IconCircleFilled } from "@tabler/icons-react";
import Image from "next/image";
import ThinkingFace from "../../../public/empty-state-box.png";

interface Framework {
  title: string;
  description: string;
  rules: string[];
}

interface ActivatedFrameworkProps {
  framework: Framework | null;
}

const ActivatedFramework: React.FC<ActivatedFrameworkProps> = ({
  framework,
}) => {
  const hasNoFramework = !framework?.rules?.length;

  return (
    <div className="flex flex-col items-center gap-5">
      <h2 className="text-2xl font-bold text-center">
        {hasNoFramework
          ? "No Active Framework!"
          : "Have a look at your activated framework!"}
      </h2>

      {hasNoFramework ? (
        <div className="flex flex-col gap-1 justify-center items-center">
          <Image
            src={ThinkingFace}
            alt="Thinking face"
            width={200}
            height={200}
          />
          <h3 className="text-xl font-semibold text-center text-blue-600">
            Looks like you haven't picked your framework! 🤔
          </h3>
          <div className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base">
            Choose from our starter frameworks or create a custom framework!
          </div>
        </div>
      ) : (
        <>
          <h3 className="text-xl font-semibold text-center text-blue-600">
            {framework.title}
          </h3>
          <div className="text-neutral-600 text-center dark:text-neutral-200 text-xs sm:text-base">
            {framework.description}
          </div>

          <div className="flex flex-col items-start w-full max-w-2xl gap-3 p-4 mt-4 border border-gray-300 rounded-lg shadow-md bg-white">
            {framework.rules.map((rule, index) => (
              <div key={index} className="flex items-center gap-2">
                <IconCircleFilled className="text-green-500" />
                <span className="text-base text-gray-700">{rule}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ActivatedFramework;
