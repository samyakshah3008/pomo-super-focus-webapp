"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cooking from "../../../../public/cooking-custom-framework-create.png";

import FrameworkForm from "@/components/(working-framework)/framework-form";
import FrameworkRules from "@/components/(working-framework)/rules";
import ReusableDialog from "@/components/common/reusable-dialog";
import { useToast } from "@/components/ui/primitives/use-toast";
import { postWithToken } from "@/config/API";
import { updateCustomFrameworkByIdEndpoint } from "@/constants/APIEndpoints";
import { fetchUserData } from "@/lib/store/features/user/userSlice";
import { fetchCustomFrameworkByIdService } from "@/services/working-framework/working-framework";
import FrameworkNotFound from "../../../components/(working-framework)/framework-not-found";
import PreparingScreen from "../../../components/(working-framework)/preparing-screen";

const EditCustomFramework = ({ id }: any) => {
  const [customFramework, setCustomFramework] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rules, setRules] = useState<string[]>([""]);
  const [disableFormStepTwo, setDisableFormStepTwo] = useState(false);
  const [showCookingState, setShowCookingState] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmLaunchDialogOpen, setIsConfirmLaunchDialogOpen] =
    useState(false);

  const currentUser = useSelector((state: any) => state?.user?.pomoSuperUser);
  const { toast } = useToast();
  const router = useRouter();
  const dispatch = useDispatch();

  const fetchCustomFramework = async () => {
    try {
      const response = await fetchCustomFrameworkByIdService(
        currentUser?._id,
        id
      );
      const customFramework = response?.data?.data?.customTemplate?.template[0];
      setCustomFramework(customFramework);
      setTitle(customFramework?.title);
      setDescription(customFramework?.description);
      setRules(customFramework?.rules);
    } catch (error: any) {
      console.log(error);
      toast({
        title: "Failed to fetch framework details",
        description: "Please try again later. ",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const launchFramework = async () => {
    setIsSubmitting(true);
    try {
      await postWithToken(updateCustomFrameworkByIdEndpoint, {
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
        customWorkingFrameworkId: id,
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
  };

  const handleAddRule = () => setRules([...rules, ""]);

  const handleRuleChange = (index: number, value: string) => {
    const updatedRules = [...rules];
    updatedRules[index] = value;
    setRules(updatedRules);
  };

  const removeRule = (index: number) => {
    const updatedRules = rules.filter((_, i) => i !== index);
    setRules(updatedRules);
  };

  const checkForDisableFormStepTwo = () => {
    const isDisabled = rules.some((rule) => !rule.length);
    setDisableFormStepTwo(isDisabled);
  };

  useEffect(() => {
    if (step === 1) return;
    checkForDisableFormStepTwo();
  }, [rules]);

  useEffect(() => {
    if (!currentUser?._id) return;
    fetchCustomFramework();
  }, [currentUser]);

  if (!currentUser?._id || loading) {
    return null;
  }

  if (!customFramework) {
    return <FrameworkNotFound className="mt-36" />;
  }

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
            We hope you will love to edit your recipe!
          </div>
        </div>

        {step === 1 && (
          <FrameworkForm
            flow="edit"
            title={title}
            description={description}
            setTitle={setTitle}
            setDescription={setDescription}
            onNext={() => setStep(2)}
          />
        )}

        {step === 2 && (
          <FrameworkRules
            flow="edit"
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
        onClose={() => setIsConfirmLaunchDialogOpen(false)}
        onConfirm={launchFramework}
        isProcessing={isSubmitting}
        title="Confirm Edit and Launch"
        description={`You are about to update and launch your custom active working framework - "${title}"`}
        confirmText="Update and Launch!"
        cancelText="Cancel"
        variant="default"
      />
    </>
  );
};

export default EditCustomFramework;
