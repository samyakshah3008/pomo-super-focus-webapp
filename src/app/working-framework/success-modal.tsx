"use client";

import Lottie from "lottie-react";
import CheckmarkSuccess from "../../../public/checkmark-success.json";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
} from "../../components/ui/animated-modal";

const SuccessModal = ({
  show,
  setShow,
  customFrameworkName,
  isGuestUser,
}: any) => {
  const onCloseHandler = () => {
    setShow(false);
  };

  if (!show) {
    return null;
  }

  return (
    <div className="flex items-center justify-center">
      <Modal>
        <ModalBody showCloseIcon={false}>
          <ModalContent>
            <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
              Congratulations!
              <span className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
                Your framework is Successfully cooked
              </span>{" "}
              👨‍🍳
            </h4>
            <div className="flex items-center justify-center w-[200px] h-[200px] m-auto">
              <Lottie
                animationData={CheckmarkSuccess}
                loop={true}
                width={200}
                height={200}
              />
            </div>

            <div className="flex flex-col gap-4">
              <div className="text-lg font-semibold">
                Your framework
                <span className="text-primary bg-secondary">
                  "{customFrameworkName}"
                </span>
                is ready to use!
              </div>
              <div className="border-2 border-solid border-green-500 p-2 rounded-md bg-green-100 ">
                Please note that you can find this in custom framework's
                section.
              </div>
              <div className="underline text-bold text-center text-red-500 text-sm">
                Guest users don't have creds to activate. But this is how the UI
                will look upon activation! -- Verify your account today to
                create custom framework today!
              </div>
            </div>
          </ModalContent>
          <ModalFooter className="gap-4">
            <button
              className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-2 rounded-md border border-black w-full"
              onClick={onCloseHandler}
            >
              Thanks and close
            </button>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default SuccessModal;
