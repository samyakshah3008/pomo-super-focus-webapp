"use client";

import { cn } from "@/lib/utils";
import {
  IconBulb,
  IconFocus2,
  IconHeartHandshake,
  IconHome,
  IconSettings,
  IconStairsUp,
  IconTableSpark,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ExitModal from "../(super-focus)/exit-modal";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";

const PomodoroSideNav = () => {
  const [open, setOpen] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [activeTab, setActiveTab] = useState("");

  const pathname = usePathname();

  const navData = [
    {
      label: "Super Focus",
      href: "/super-focus",
      icon: (
        <IconFocus2
          className={` ${
            activeTab == "Super Focus" ? "text-blue-500" : "text-neutral-700"
          }  dark:text-neutral-200 h-5 w-5 flex-shrink-0`}
        />
      ),
    },
    {
      label: "What is Pomodoro?",
      href: "/super-focus/guide",
      icon: (
        <IconBulb
          className={` ${
            activeTab == "What is Pomodoro?"
              ? "text-blue-500"
              : "text-neutral-700"
          }  dark:text-neutral-200 h-5 w-5 flex-shrink-0`}
        />
      ),
    },
    {
      label: "Pomo Super Tasks!",
      href: "/super-focus/tasks",
      icon: (
        <IconTableSpark
          className={` ${
            activeTab == "Pomo Super Tasks!"
              ? "text-blue-500"
              : "text-neutral-700"
          }  dark:text-neutral-200 h-5 w-5 flex-shrink-0`}
        />
      ),
    },
    {
      label: "Settings",
      href: "/super-focus/settings",
      icon: (
        <IconSettings
          className={` ${
            activeTab == "Settings" ? "text-blue-500" : "text-neutral-700"
          }  dark:text-neutral-200 h-5 w-5 flex-shrink-0`}
        />
      ),
    },
    {
      label: "Go back to dashboard!",
      href: "#",
      icon: (
        <IconHome className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      onClick: () => {
        setShowExitModal(true);
      },
    },
  ];

  useEffect(() => {
    if (pathname == "/super-focus") {
      setActiveTab("Super Focus");
    } else if (pathname == "/super-focus/guide") {
      setActiveTab("What is Pomodoro?");
    } else if (pathname == "/super-focus/tasks") {
      setActiveTab("Pomo Super Tasks!");
    } else if (pathname == "/super-focus/settings") {
      setActiveTab("Settings");
    }
  }, [pathname]);

  return (
    <>
      {" "}
      <div
        className={cn(
          "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 max-w-7xl border border-neutral-200 dark:border-neutral-700 overflow-hidden",
          "md:h-screen sm:h-8 md:sticky top-0"
        )}
      >
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="justify-between gap-10">
            <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden hide-scrollbar">
              {open ? <Logo /> : <LogoIcon />}
              <div className="mt-8 flex flex-col gap-2">
                {navData.map((link, idx) => (
                  <SidebarLink
                    key={idx}
                    link={link}
                    labelTextColor={
                      link?.label == activeTab
                        ? "text-blue-500"
                        : "text-neutral-700"
                    }
                  />
                ))}
              </div>
            </div>
            <div>
              <SidebarLink
                link={{
                  label: "Support us!",
                  href: "https://github.com/samyakshah3008/pomo-super-focus-webapp",
                  icon: (
                    <IconHeartHandshake className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
                  ),
                }}
                target="_blank"
              />
            </div>
          </SidebarBody>
        </Sidebar>
      </div>
      <ExitModal show={showExitModal} setShow={setShowExitModal} />
    </>
  );
};

export const Logo = () => {
  return (
    <Link
      href="/"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <IconStairsUp className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        PomoSuperFocus
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <IconStairsUp className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    </Link>
  );
};

export default PomodoroSideNav;
