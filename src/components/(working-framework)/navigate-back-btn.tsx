"use client";

import { IconArrowBack } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

const NavigateBackBtn = () => {
  const router = useRouter();

  const goBackHandler = () => {
    router.push("/working-framework");
  };

  return (
    <div className="flex gap-2 cursor-pointer">
      <IconArrowBack />

      <div className="text-blue-500 font-semibold" onClick={goBackHandler}>
        Go back
      </div>
    </div>
  );
};

export default NavigateBackBtn;
