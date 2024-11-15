"use client";
import { cn } from "@/lib/utils";
import {
  IconBucket,
  IconBug,
  IconCat,
  IconChartBar,
  IconChecklist,
  IconFocus2,
  IconGhostOff,
  IconGolf,
  IconHeart,
  IconHeartbeat,
  IconHome,
  IconLogout2,
  IconSettingsAutomation,
  IconStairsUp,
  IconTableSpark,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import ConfirmLogoutModal from "../(settings)/confirm-logout-modal";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";

const SideNav = () => {
  const navData = [
    {
      label: "My space",
      href: "/dashboard",
      icon: (
        <IconHome className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Super Focus",
      href: "/super-focus",
      icon: (
        <IconFocus2 className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Leaderboard",
      href: "/leaderboard",
      icon: (
        <IconChartBar className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Goals Review",
      href: "/goals",
      icon: (
        <IconGolf className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Tasks",
      href: "/tasks",
      icon: (
        <IconTableSpark className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Working Framework",
      href: "/working-framework",
      icon: (
        <IconGhostOff className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Habits Scorecard",
      href: "/habits-scorecard",
      icon: (
        <IconChecklist className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "You vs You",
      href: "/self-review",
      icon: (
        <IconHeart className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "My gratitude list",
      href: "/gratitude-list",
      icon: (
        <IconHeartbeat className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "My bucket list",
      href: "/bucket-list",
      icon: (
        <IconBucket className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "My life",
      href: "/my-life",
      icon: (
        <IconCat className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Settings",
      href: "/settings",
      icon: (
        <IconSettingsAutomation className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];

  const [open, setOpen] = useState(false);
  const [showConfirmLogoutModal, setShowConfirmLogoutModal] = useState(false);

  return (
    <>
      {" "}
      <div
        className={cn(
          "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 max-w-7xl border border-neutral-200 dark:border-neutral-700 overflow-hidden",
          "md:h-screen sm:h-8 md:sticky top-0 h-screen"
        )}
      >
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="justify-between gap-10">
            <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
              {open ? <Logo /> : <LogoIcon />}
              <div className="mt-8 flex flex-col gap-2">
                {navData.map((link, idx) => (
                  <SidebarLink key={idx} link={link} />
                ))}
              </div>
            </div>
            <div>
              <SidebarLink
                link={{
                  label: "Logout",
                  href: "#",
                  icon: (
                    <IconLogout2 className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
                  ),
                  onClick: () => {
                    setShowConfirmLogoutModal(true);
                  },
                }}
              />

              <SidebarLink
                link={{
                  label: "Report a bug",
                  href: "/report-bug",
                  icon: (
                    <IconBug className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
                  ),
                }}
              />
            </div>
          </SidebarBody>
        </Sidebar>
      </div>
      <ConfirmLogoutModal
        show={showConfirmLogoutModal}
        setShow={setShowConfirmLogoutModal}
        showCats={true}
        ctaBtnText="I promise to comeback soon, please give a virtual hug to cats and log me out!"
        screenTitle="Wait! Before you go... 🐾"
        screenDescription="We're just a bunch of humble cats, but we thought we'd ask... could you stay a little longer? We've got all these cozy corners and warm vibes, and honestly, it's just not the same without you here. But if you really must go, promise you'll come back soon? We'll be here, purring patiently and counting the seconds. 💖"
        screenHeader="Request from cats and witches:"
      />
    </>
  );
};

export const Logo = () => {
  return (
    <Link
      href="#"
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

export default SideNav;
