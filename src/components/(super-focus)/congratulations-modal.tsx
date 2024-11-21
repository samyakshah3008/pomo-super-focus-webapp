"use client";

import { tmkocTheme } from "@/app/super-focus/theme";
import Image from "next/image";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
} from "../../components/ui/animated-modal";

interface CongratulationsModalProps {
  show: boolean;
  setShow: (value: boolean) => void;
}

const CongratulationsModal = ({ show, setShow }: CongratulationsModalProps) => {
  const handleClose = () => setShow(false);

  if (!show) return null;

  return (
    <div className="flex items-center justify-center">
      <Modal>
        <ModalBody showCloseIcon={false}>
          <ModalContent>
            <h4 className="text-center text-lg md:text-2xl font-bold text-neutral-600 dark:text-neutral-100 mb-8">
              {tmkocTheme.congratulationsModal.title}{" "}
            </h4>

            <div className="flex items-center justify-center w-96 object-contain mx-auto rounded-md">
              <Image
                className="rounded-md"
                src={tmkocTheme.congratulationsModal.img}
                alt="babuchak-jethiya"
              />
            </div>

            <div className="flex flex-col gap-4 mt-4 text-center">
              <div className="text-lg font-semibold">
                {tmkocTheme.congratulationsModal.headerText}
              </div>
              <div className="p-4 bg-green-100 border border-green-500 rounded-md">
                {tmkocTheme.congratulationsModal.descriptionText}
              </div>
            </div>
          </ModalContent>

          <ModalFooter className="mt-4 gap-4">
            <button
              className="w-full bg-black text-white dark:bg-white dark:text-black text-sm px-4 py-2 rounded-md border border-black"
              onClick={handleClose}
            >
              {tmkocTheme.congratulationsModal.footerCtaText}
            </button>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default CongratulationsModal;
