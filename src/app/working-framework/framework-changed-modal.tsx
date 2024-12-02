"use client";

import Lottie from "lottie-react";
import CheckmarkSuccess from "../../../public/checkmark-success.json";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
} from "../../components/ui/animated-modal";

interface FrameworkChangedModalProps {
  show: boolean;
  setShow: (value: boolean) => void;
  newFrameworkName: string;
  isGuestUser: boolean;
}

const FrameworkChangedModal = ({
  show,
  setShow,
  newFrameworkName,
  isGuestUser,
}: FrameworkChangedModalProps) => {
  const handleClose = () => setShow(false);

  if (!show) return null;

  return (
    <div className="flex items-center justify-center">
      <Modal>
        <ModalBody showCloseIcon={false}>
          <ModalContent>
            <h4 className="text-center text-lg md:text-2xl font-bold text-neutral-600 dark:text-neutral-100 mb-8">
              New framework{" "}
              <span className="px-2 py-1 bg-gray-100 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-md">
                activated! 🚀
              </span>
            </h4>

            <div className="flex items-center justify-center w-48 h-48 mx-auto">
              <Lottie
                animationData={CheckmarkSuccess}
                loop
                width={200}
                height={200}
              />
            </div>

            <div className="flex flex-col gap-4 mt-4 text-center">
              <div className="text-lg font-semibold">
                The framework{" "}
                <span className="text-primary bg-secondary px-1 py-0.5 rounded-md">
                  "{newFrameworkName}"
                </span>{" "}
                has been successfully activated!
              </div>
              <div className="p-4 bg-green-100 border border-green-500 rounded-md">
                Activation is just the beginning of your productivity journey.
                To see real results, stick to the framework and push yourself to
                achieve the best version of yourself. Stay committed!
              </div>

              {isGuestUser ? (
                <div className="underline text-bold text-center text-red-500 text-sm">
                  Guest users don't have creds to activate. But this is how the
                  UI will look upon activation! -- Verify your account today to
                  activate a framework today!
                </div>
              ) : null}
            </div>
          </ModalContent>

          <ModalFooter className="mt-4 gap-4">
            <button
              className="w-full bg-black text-white dark:bg-white dark:text-black text-sm px-4 py-2 rounded-md border border-black"
              onClick={handleClose}
            >
              I agree and close
            </button>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default FrameworkChangedModal;
