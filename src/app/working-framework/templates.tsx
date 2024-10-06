"use client";

import CardHoverEffect from "@/components/common/card-hover-effect";
import { fetchTemplatesService } from "@/services/working-framework/working-framework";
import { useEffect, useState } from "react";

const Templates = () => {
  const [templates, setTemplates] = useState<any>([]);

  const fetchTemplates = async () => {
    const response = await fetchTemplatesService();
    let fetchedTemplates = response?.data?.data?.frameworkTemplates;
    setTemplates(fetchedTemplates);
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  if (!templates?.length) {
    return null;
  }

  return (
    <div className="flex flex-col gap-5 align-center justify-center">
      <div className="text-2xl font-bold text-center">
        Here are some starter working framework templates!
      </div>
      <div>
        <CardHoverEffect
          cardItems={templates}
          type="working-framework-sidesheet"
        />
      </div>
    </div>
  );
};

export default Templates;
