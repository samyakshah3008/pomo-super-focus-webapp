"use client";

import { get } from "@/config/API";
import { customWorkingFrameworkTemplatesEndpoint } from "@/constants/APIEndpoints";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PrepareYourFramework from "./prepare-your-framework";
import YourCustomFrameworks from "./your-custom-frameworks";

const CustomTemplate = () => {
  const [customTemplates, setCustomTemplates] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const currentUser = useSelector((state: any) => state?.user?.pomoSuperUser);
  const itemsPerPage = 9;
  const totalPages = Math.ceil(customTemplates.length / itemsPerPage);

  const getCustomWorkingFrameworkTemplates = async () => {
    const response = await get(customWorkingFrameworkTemplatesEndpoint, {
      userId: currentUser?._id,
    });
    setCustomTemplates(
      response?.data?.data?.customTemplates[0]?.customTemplates || []
    );
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    getCustomWorkingFrameworkTemplates();
  }, []);

  if (!currentUser?._id) {
    return null;
  }

  return (
    <div>
      <PrepareYourFramework />

      <YourCustomFrameworks
        customTemplates={customTemplates}
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
        getCustomWorkingFrameworkTemplates={getCustomWorkingFrameworkTemplates}
      />
    </div>
  );
};

export default CustomTemplate;
