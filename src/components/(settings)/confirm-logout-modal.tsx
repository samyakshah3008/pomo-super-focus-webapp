"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Cat2 from "../../../public/sad-cat-2.jpg";
import Cat3 from "../../../public/sad-cat-3.jpg";
import Cat4 from "../../../public/sad-cat-4.jpg";
import Cat1 from "../../../public/sad-cat-5.jpg";

import { logoutUser } from "@/lib/store/features/user/userSlice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
} from "../ui/animated-modal";

export type ConfirmLogoutModalProps = {
  show: boolean;
  setShow: any;
  screenTitle: any;
  screenHeader: any;
  screenDescription: any;
  showCats: boolean;
  ctaBtnText: string;
};

const ConfirmLogoutModal = ({
  show,
  setShow,
  screenTitle,
  screenHeader,
  screenDescription,
  showCats,
  ctaBtnText,
}: ConfirmLogoutModalProps) => {
  const images = [Cat1.src, Cat2.src, Cat3.src, Cat4.src];

  const dispatch = useDispatch();
  const router = useRouter();

  if (!show) {
    return null;
  }

  return (
    <div className="flex items-center justify-center">
      <Modal>
        <ModalBody showCloseIcon={false}>
          <ModalContent>
            <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
              {screenTitle}
            </h4>
            {showCats ? (
              <div className="flex justify-center items-center">
                {images.map((image, idx) => (
                  <motion.div
                    key={"images" + idx}
                    style={{
                      rotate: Math.random() * 20 - 10,
                    }}
                    whileHover={{
                      scale: 1.1,
                      rotate: 0,
                      zIndex: 100,
                    }}
                    whileTap={{
                      scale: 1.1,
                      rotate: 0,
                      zIndex: 100,
                    }}
                    className="rounded-xl -mr-4 mt-4 p-1 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 flex-shrink-0 overflow-hidden"
                  >
                    <Image
                      src={image}
                      alt="cat images"
                      width="200"
                      height="200"
                      className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover flex-shrink-0"
                    />
                  </motion.div>
                ))}
              </div>
            ) : null}

            <div className="flex flex-col gap-4">
              <div className="text-lg font-semibold">{screenHeader}</div>
              <div className="border-2 text-sm border-solid border-green-500 p-2 rounded-md bg-green-100 ">
                {screenDescription}
              </div>
            </div>
          </ModalContent>
          <ModalFooter className="flex-col gap-2">
            <button
              className="bg-pink-500 text-white dark:bg-white dark:text-black text-sm px-2 py-2 rounded-md border border-black w-full"
              onClick={() => {
                setShow(false);
              }}
            >
              No, I can't leave them alone, I'll stay here with them! 🖤
            </button>
            <button
              className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-2 rounded-md border border-black w-full"
              onClick={() => {
                setShow(false);
                dispatch(logoutUser());
                router.push("/signin");
              }}
            >
              {ctaBtnText}
            </button>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ConfirmLogoutModal;
