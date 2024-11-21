"use client";

import { tmkocTheme } from "@/app/super-focus/theme";
import { useRouter } from "next/navigation";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
} from "../../components/ui/animated-modal";
import { Button } from "../ui/primitives/button";

interface ExitModalProps {
  show: boolean;
  setShow: (value: boolean) => void;
}

const ExitModal = ({ show, setShow }: ExitModalProps) => {
  const handleClose = () => setShow(false);
  const router = useRouter();

  if (!show) return null;

  return (
    <div className="flex items-center justify-center">
      <Modal>
        <ModalBody showCloseIcon={false}>
          <ModalContent>
            <h4 className="text-center text-lg md:text-2xl font-bold text-neutral-600 dark:text-neutral-100 mb-8">
              {tmkocTheme.exitModal.title}{" "}
            </h4>

            <div className="flex items-center justify-center object-contain mx-auto rounded-md">
              <iframe
                id="player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                title="YouTube Playlist"
                width="500"
                height="250"
                src={tmkocTheme.exitModal.youtubeLink}
                allowFullScreen
                className="rounded-3xl"
              ></iframe>
            </div>

            <div className="flex flex-col gap-4 mt-4 text-center">
              <div className="text-lg font-semibold">
                {tmkocTheme.exitModal.headerText}
              </div>
              <div className="p-4 bg-green-100 border border-green-500 rounded-md">
                {tmkocTheme.exitModal.descriptionText}
              </div>
            </div>
          </ModalContent>

          <ModalFooter className="mt-4 flex flex-col gap-2">
            <Button
              variant="destructive"
              onClick={() => {
                handleClose();
                router.push("/dashboard");
              }}
            >
              {tmkocTheme.exitModal.footerCtaText}
            </Button>
            <Button variant="default" onClick={() => setShow(false)}>
              No, I want to continue work.{" "}
            </Button>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ExitModal;
