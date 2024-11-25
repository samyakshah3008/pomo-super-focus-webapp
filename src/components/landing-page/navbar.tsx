"use client";

import { IconBrandGithub, IconStairsUp } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/primitives/button";

export default function Navbar({ isAuthenticated }: any) {
  const router = useRouter();
  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <div className="flex gap-2">
            <IconStairsUp /> PomoSuperFocus
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-2">
          <Button
            onClick={() => {
              if (!window) return;
              window.open(
                "https://github.com/samyakshah3008/pomo-super-focus-webapp",
                "_blank"
              );
            }}
          >
            <IconBrandGithub className="mr-2" /> Star on GitHub
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              if (isAuthenticated) {
                router.push("/dashboard");
              } else {
                router.push("/signup");
              }
            }}
            className="hidden lg:block "
          >
            {isAuthenticated ? "Go to Dashboard 🚀" : "Create Account 🚀"}
          </Button>
        </div>
      </div>
    </nav>
  );
}
