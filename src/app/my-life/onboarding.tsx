"use client";

import { Button } from "@/components/ui/primitives/button";
import { Input } from "@/components/ui/primitives/input";
import { useToast } from "@/components/ui/primitives/use-toast";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { fetchUserData } from "@/lib/store/features/user/userSlice";
import { completeMyLifeOnboardingFlowService } from "@/services/user/user";
import { format } from "date-fns";
import Lottie from "lottie-react";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GemBox from "../../../public/skull-reward.json";
import {
  calculateLifeLeft,
  validateBirthDateAndEstimateTimeLeft,
} from "./helper";

type Word = {
  text: string;
  className?: string;
};

const Onboarding = ({
  setIsOnboardingCompleted,
  showSuccessOnboarding,
  isGuestUser,
  setLifeLeftObj,
  setGuestUserBirthDate,
  setGuestUserLifeSpan,
}: any) => {
  const today = format(new Date(), "yyyy-MM-dd");

  const currentUser = useSelector((state: any) => state?.user);
  const [words, setWords] = useState<Word[]>([]);
  const [birthDate, setBirthDate] = useState<any>("");
  const [lifeSpan, setLifeSpan] = useState<any>("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const { toast } = useToast();

  const completeMyLifeOnboardingFlow = async () => {
    if (isGuestUser) {
      setIsOnboardingCompleted(true);
      showSuccessOnboarding();
      const timeLeft = calculateLifeLeft(birthDate, lifeSpan);
      setLifeLeftObj(timeLeft);
      setGuestUserBirthDate(birthDate);
      setGuestUserLifeSpan(lifeSpan);
    } else {
      setIsLoading(true);
      try {
        await completeMyLifeOnboardingFlowService(birthDate, lifeSpan);
        setIsOnboardingCompleted(true);
        dispatch(fetchUserData());
        showSuccessOnboarding();
      } catch (error: any) {
        console.log(error);
        toast({
          variant: "destructive",
          title: "Unable to complete my life onboarding",
          description:
            "Uh oh! We are extremely sorry but we are not able to complete your my life onboarding, please try again later.",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const completeOnboardingHandler = () => {
    const validateValuesCheck = validateBirthDateAndEstimateTimeLeft(
      birthDate,
      lifeSpan
    );
    if (!validateValuesCheck.validationPass) {
      setErrorMessage(validateValuesCheck.errorMessage);
    } else {
      completeMyLifeOnboardingFlow();
    }
  };

  useEffect(() => {
    if (!currentUser?.pomoSuperUser) return;
    setWords([
      {
        text: "Track",
      },
      {
        text: `your`,
      },
      {
        text: `precious`,
      },
      {
        text: `time,`,
      },
      {
        text: `${currentUser?.pomoSuperUser?.firstName}!`,
        className: "text-blue-500 dark:text-blue-500",
      },
    ]);
  }, [currentUser?.pomoSuperUser]);

  if (!currentUser?.pomoSuperUser || !words?.length) {
    return null;
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-80 h-80 flex m-auto">
        <Lottie animationData={GemBox} loop={true} width={250} />
      </div>
      <TypewriterEffectSmooth words={words} />
      <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base  ">
        Life moves very fast, set your personalized life span eg. 50years and
        see visual progress of how much span is left as per your age to get
        awared! 👀
      </p>
      <div className="flex flex-col gap-5 w-[600px] ">
        <div className="flex mt-10 gap-4">
          <div className="flex flex-col gap-2 w-[50%]">
            <div className="font-bold">Enter your birth date:</div>{" "}
            <Input
              max={today}
              type="date"
              value={birthDate}
              onChange={(e: any) => setBirthDate(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2 w-[50%] ">
            <div className="font-bold">Decide your own estimate life span:</div>{" "}
            <Input
              type="number"
              value={lifeSpan}
              onChange={(e: any) => {
                if (e.target.value > 100) {
                  setLifeSpan(100);
                } else {
                  setLifeSpan(e.target.value);
                }
              }}
              placeholder="60"
            />{" "}
          </div>
        </div>
        {errorMessage?.length !== 0 ? (
          <div className="text-sm text-red-500 font-semibold">
            {errorMessage}
          </div>
        ) : null}
        <Button
          onClick={completeOnboardingHandler}
          disabled={!birthDate || !lifeSpan || isLoading}
        >
          {isLoading ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : null}
          {isLoading
            ? "Taking you to precious time tracker..."
            : "Take me to precious time tracker!"}
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;
