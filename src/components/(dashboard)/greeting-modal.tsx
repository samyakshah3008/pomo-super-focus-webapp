"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Cat3 from "../../../public/cat-4.png";
import Cat4 from "../../../public/cat-5.png";
import Cat2 from "../../../public/cat-with-a-witch-hat-rafiki.png";
import Cat1 from "../../../public/cat-with-witch-hat-and-skull.png";

import { userIdKeyBrowserStorage } from "@/constants/browser-storage";
import { getLocalStorageItem } from "@/lib/browser-storage";
import { fetchUserData } from "@/lib/store/features/user/userSlice";
import { updateUserDetailsService } from "@/services/user/user";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
} from "../ui/animated-modal";

const GreetingModal = () => {
  const images = [Cat1.src, Cat2.src, Cat3.src, Cat4.src];
  const [show, setShow] = useState(false);

  const currentUser = useSelector((state: any) => state?.user);
  const dispatch = useDispatch();

  const userId = getLocalStorageItem(userIdKeyBrowserStorage);

  const updateUserDetails = async () => {
    try {
      await updateUserDetailsService(userId);
      dispatch(fetchUserData());
    } catch (error) {
      console.log(error);
    } finally {
      setShow(false);
    }
  };

  const onCloseHandler = () => {
    updateUserDetails();
  };

  useEffect(() => {
    if (!currentUser?.pomoSuperUser) return;
    let timeoutId = setTimeout(() => {
      if (currentUser?.pomoSuperUser?.isGreetingModalShown) {
        setShow(false);
      } else {
        setShow(true);
      }
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [currentUser]);

  if (!show || !currentUser?.pomoSuperUser) {
    return null;
  }

  return (
    <div className="flex items-center justify-center">
      <Modal>
        <ModalBody showCloseIcon={false}>
          <ModalContent>
            <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
              Welcome,
              <span className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
                {currentUser?.pomoSuperUser?.firstName}
              </span>{" "}
              ✈️
            </h4>
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

            <div className="flex flex-col gap-4">
              <div className="text-lg font-semibold">
                Welcome onboard to{" "}
                <span className="text-primary bg-secondary">
                  PomoSuperFocus
                </span>
                , we are super pleased to have you!
              </div>
              <div className="border-2 border-solid border-green-500 p-2 rounded-md bg-green-100 ">
                Please note that PomoSuperFocus is free and open source software
                and we won't charge anything forever. However, we encourage you
                when you see a stray animal, please feed them if you liked our
                product, and that's the only thing we request from our side.{" "}
              </div>
            </div>
          </ModalContent>
          <ModalFooter className="gap-4">
            <button
              className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-2 rounded-md border border-black w-full"
              onClick={onCloseHandler}
            >
              Ready to bring the best out of me!
            </button>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default GreetingModal;
