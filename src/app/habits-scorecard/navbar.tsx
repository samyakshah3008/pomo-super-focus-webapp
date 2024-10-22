"use client";

import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  const getActiveTab = (currentPath: string) => {
    if (currentPath === "/habits-scorecard/dashboard") return "Dashboard";
    if (currentPath === "/habits-scorecard/statistics") return "Statistics";
    if (currentPath === "/habits-scorecard/categories") return "Categories";
    return "";
  };

  const activeTab = getActiveTab(pathname);

  if (pathname === "/habits-scorecard") {
    return null;
  }

  return (
    <nav className="p-4 border-b-2 w-[100%]">
      <div className="container mx-auto flex justify-center">
        <div className="flex">
          <a
            href="/habits-scorecard/dashboard"
            className={`px-3 py-2 rounded-md font-medium ${
              activeTab === "Dashboard"
                ? "text-blue-500 font-bold underline"
                : "text-gray-900 hover:bg-gray-200"
            }`}
          >
            Dashboard
          </a>

          <a
            href="/habits-scorecard/statistics"
            className={`px-3 py-2 rounded-md font-medium ${
              activeTab === "Statistics"
                ? "text-blue-500 font-bold underline"
                : "text-gray-900 hover:bg-gray-200"
            }`}
          >
            Statistics
          </a>

          <a
            href="/habits-scorecard/categories"
            className={`px-3 py-2 rounded-md font-medium ${
              activeTab === "Categories"
                ? "text-blue-500 font-bold underline"
                : "text-gray-900 hover:bg-gray-200"
            }`}
          >
            Categories
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
