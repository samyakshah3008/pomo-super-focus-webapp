"use client";

import { DotBackground } from "@/components/common/grid-and-dot-background";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  const getActiveTab = (currentPath: string) => {
    if (currentPath === "/habits-scorecard/dashboard") return "Dashboard";
    if (currentPath === "/habits-scorecard/statistics") return "Statistics";
    if (currentPath === "/habits-scorecard/areas") return "Areas";
    return "";
  };

  const activeTab = getActiveTab(pathname);

  if (pathname === "/habits-scorecard") {
    return null;
  }

  return (
    <DotBackground widthFull={true}>
      <nav className="p-4 border-b-2 w-[100%]">
        <div className="container mx-auto flex justify-center">
          <div className="flex space-x-4">
            <a
              href="/habits-scorecard/dashboard"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                activeTab === "Dashboard"
                  ? "text-blue-500 font-bold"
                  : "text-gray-900 hover:bg-gray-200"
              }`}
            >
              Dashboard
            </a>

            <a
              href="/habits-scorecard/statistics"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                activeTab === "Statistics"
                  ? "text-blue-500 font-bold"
                  : "text-gray-900 hover:bg-gray-200"
              }`}
            >
              Statistics
            </a>

            <a
              href="/habits-scorecard/areas"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                activeTab === "Areas"
                  ? "text-blue-500 font-bold"
                  : "text-gray-900 hover:bg-gray-200"
              }`}
            >
              Areas
            </a>
          </div>
        </div>
      </nav>
    </DotBackground>
  );
};

export default Navbar;
