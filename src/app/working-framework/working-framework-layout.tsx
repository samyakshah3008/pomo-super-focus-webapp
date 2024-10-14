"use client";

import { DotBackground } from "@/components/common/grid-and-dot-background";
import { Separator } from "@/components/ui/primitives/separator";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ActivatedFramework from "./activated-framework";
import CustomTemplate from "./custom-template";
import Header from "./header";
import StarterTemplates from "./starter-templates";
import SuccessModal from "./success-modal";

const WorkingFrameworkLayout = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [customFrameworkName, setCustomFrameworkName] = useState<any>("");

  const searchParams = useSearchParams();
  const router = useRouter();
  const currentUser = useSelector((state: any) => state?.user?.pomoSuperUser);

  useEffect(() => {
    const fromFlow = searchParams.get("from");
    const frameworkName = searchParams.get("frameworkName");
    if (fromFlow == "create-flow") {
      setShowSuccessModal(true);
      setCustomFrameworkName(frameworkName);
    } else {
      setShowSuccessModal(false);
    }
  }, []);

  useEffect(() => {
    if (!showSuccessModal) {
      router.push("/working-framework");
    }
  }, [showSuccessModal]);

  if (!currentUser?._id) {
    return null;
  }

  const sections = [
    <Header />,
    <ActivatedFramework framework={currentUser?.workingFramework} />,
    <StarterTemplates />,
    <CustomTemplate />,
  ];

  return (
    <>
      <DotBackground>
        <div className="flex flex-col w-[80%] gap-10 ">
          {sections.map((section: any, id: any) => {
            return (
              <React.Fragment key={id}>
                {section}
                {sections?.length !== id ? <Separator /> : null}
              </React.Fragment>
            );
          })}
        </div>
      </DotBackground>
      <SuccessModal
        show={showSuccessModal}
        setShow={setShowSuccessModal}
        customFrameworkName={customFrameworkName}
      />
    </>
  );
};

export default WorkingFrameworkLayout;
