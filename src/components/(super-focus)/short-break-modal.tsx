"use client";

import { tmkocTheme } from "@/app/super-focus/theme";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
} from "../../components/ui/animated-modal";

interface ShortBreakSessionActivatedModalProps {
  show: boolean;
  setShow: (value: boolean) => void;
}

const ShortBreakSessionActivatedModal = ({
  show,
  setShow,
}: ShortBreakSessionActivatedModalProps) => {
  const handleClose = () => setShow(false);

  if (!show) return null;

  return (
    <div className="flex items-center justify-center">
      <Modal>
        <ModalBody showCloseIcon={false}>
          <ModalContent>
            <h4 className="text-center text-lg md:text-2xl font-bold text-neutral-600 dark:text-neutral-100 mb-8">
              {tmkocTheme.shortBreakModal.title}{" "}
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
                src={tmkocTheme.shortBreakModal.youtubeLink}
                allowFullScreen
                className="rounded-3xl"
              ></iframe>
            </div>

            <div className="flex flex-col gap-4 mt-4 text-center">
              <div className="text-lg font-semibold">
                {tmkocTheme.shortBreakModal.headerText}
              </div>
              <div className="p-4 bg-green-100 border border-green-500 rounded-md">
                {tmkocTheme.shortBreakModal.descriptionText}
              </div>
            </div>
          </ModalContent>

          <ModalFooter className="mt-4 gap-4">
            <button
              className="w-full bg-black text-white dark:bg-white dark:text-black text-sm px-4 py-2 rounded-md border border-black"
              onClick={handleClose}
            >
              {tmkocTheme.shortBreakModal.footerCtaText}
            </button>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ShortBreakSessionActivatedModal;
