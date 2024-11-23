"use client";

import FrameworkForm from "@/components/(working-framework)/framework-form";
import FrameworkRules from "@/components/(working-framework)/rules";
import ReusableDialog from "@/components/common/reusable-dialog";
import { useToast } from "@/components/ui/primitives/use-toast";
import { postWithToken } from "@/config/API";
import { customWorkingFrameworkTemplatesEndpoint } from "@/constants/APIEndpoints";
import { fetchUserData } from "@/lib/store/features/user/userSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cooking from "../../../../public/cooking-custom-framework-create.png";
import PreparingScreen from "../../../components/(working-framework)/preparing-screen";

const CreateFramework = () => {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rules, setRules] = useState<string[]>([""]);
  const [disableFormStepTwo, setDisableFormStepTwo] = useState(true);
  const [showCookingState, setShowCookingState] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmLaunchDialogOpen, setIsConfirmLaunchDialogOpen] =
    useState(false);

  const currentUser = useSelector((state: any) => state?.user?.pomoSuperUser);
  const dispatch = useDispatch();
  const router = useRouter();

  const { toast } = useToast();

  const handleAddRule = () => {
    setRules([...rules, ""]);
  };

  const handleRuleChange = (index: number, value: string) => {
    const updatedRules = [...rules];
    updatedRules[index] = value;
    setRules(updatedRules);
  };

  const checkForDisableFormStepTwo = () => {
    for (let i = 0; i < rules?.length; i++) {
      if (!rules[i]?.length) {
        setDisableFormStepTwo(true);
        return;
      }
    }
    setDisableFormStepTwo(false);
  };

  const launchFramework = async () => {
    if (currentUser?.isGuestUser) {
      setIsSubmitting(true);
      setShowCookingState(true);
      setTimeout(() => {
        router.push(
          `/working-framework?from=create-flow&frameworkName=${title}`
        );
      }, 10000);
    } else {
      setIsSubmitting(true);
      try {
        await postWithToken(customWorkingFrameworkTemplatesEndpoint, {
          userId: currentUser?._id,
          customWorkTemplateObj: {
            template: {
              title,
              rules,
              description,
              createdBy: `${currentUser?.firstName + currentUser?.lastName}`,
            },
            isLaunched: false,
          },
        });
        setShowCookingState(true);
        setTimeout(() => {
          router.push(
            `/working-framework?from=create-flow&frameworkName=${title}`
          );
        }, 10000);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Failed to launch",
          description:
            "Something went wrong while launching, please try again later.",
        });
      } finally {
        dispatch(fetchUserData());
        setIsSubmitting(false);
      }
    }
  };

  const onCloseConfirmLaunchDialog = () => {
    setIsConfirmLaunchDialogOpen(false);
  };

  const removeRule = (index: any) => {
    let updatedRules: any = [];
    for (let i = 0; i < rules?.length; i++) {
      if (i !== index) {
        updatedRules.push(rules[i]);
      }
    }
    setRules(updatedRules);
  };

  useEffect(() => {
    if (step == 1) return;
    checkForDisableFormStepTwo();
  }, [rules]);

  if (showCookingState) {
    return <PreparingScreen />;
  }

  return (
    <>
      <div className="flex flex-col items-center gap-10">
        <div className="flex flex-col items-center">
          <div className="w-[300px] h-[300px]">
            <Image src={Cooking} alt="cooking-chef" />
          </div>
          <div className="text-2xl font-bold text-center">
            We hope you will love to prepare your own recipe!
          </div>
        </div>

        {step === 1 && (
          <FrameworkForm
            flow="create"
            title={title}
            description={description}
            setTitle={setTitle}
            setDescription={setDescription}
            onNext={() => setStep(2)}
          />
        )}

        {step === 2 && (
          <FrameworkRules
            flow="create"
            rules={rules}
            onAddRule={handleAddRule}
            onRuleChange={handleRuleChange}
            onRemoveRule={removeRule}
            onPrev={() => setStep(1)}
            onLaunch={() => setIsConfirmLaunchDialogOpen(true)}
            disableLaunch={disableFormStepTwo || isSubmitting}
          />
        )}
      </div>
      <ReusableDialog
        isOpen={isConfirmLaunchDialogOpen}
        onClose={onCloseConfirmLaunchDialog}
        onConfirm={launchFramework}
        isLoading={isSubmitting}
        title="Confirm Active and Launch"
        description={`You are about to activate and launch your custom active working framework - "${title}"!`}
        confirmText="Launch!"
        cancelText="Cancel"
        variant="default"
      />
    </>
  );
};

export default CreateFramework;
