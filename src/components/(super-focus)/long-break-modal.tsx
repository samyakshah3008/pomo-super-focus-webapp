"use client";

import { tmkocTheme } from "@/app/super-focus/theme";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
} from "../../components/ui/animated-modal";

interface LongBreakSessionActivatedModalProps {
  show: boolean;
  setShow: (value: boolean) => void;
}

const LongBreakSessionActivatedModal = ({
  show,
  setShow,
}: LongBreakSessionActivatedModalProps) => {
  const handleClose = () => setShow(false);

  if (!show) return null;

  return (
    <div className="flex items-center justify-center">
      <Modal>
        <ModalBody showCloseIcon={false}>
          <ModalContent>
            <h4 className="text-center text-lg md:text-2xl font-bold text-neutral-600 dark:text-neutral-100 mb-8">
              {tmkocTheme.longBreakModal.title}{" "}
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
                src={tmkocTheme.longBreakModal.youtubeLink}
                allowFullScreen
                className="rounded-3xl w-[300px] lg:w-[350px] xl:w-[500px]"
              ></iframe>
            </div>

            <div className="flex flex-col gap-4 mt-4 text-center">
              <div className="text-lg font-semibold">
                {tmkocTheme.longBreakModal.headerText}
              </div>
              <div className="p-4 bg-green-100 border border-green-500 rounded-md">
                {tmkocTheme.longBreakModal.descriptionText}
              </div>
            </div>
          </ModalContent>

          <ModalFooter className="mt-4 gap-4">
            <button
              className="w-full bg-black text-white dark:bg-white dark:text-black text-sm px-4 py-2 rounded-md border border-black"
              onClick={handleClose}
            >
              {tmkocTheme.longBreakModal.footerCtaText}
            </button>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default LongBreakSessionActivatedModal;
