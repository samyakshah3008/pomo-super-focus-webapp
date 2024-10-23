"use client";

import { Button } from "@/components/ui/primitives/button";
import { Separator } from "@/components/ui/primitives/separator";
import {
  IconClockStop,
  IconLock,
  IconSubtask,
  IconWebhook,
} from "@tabler/icons-react";

const IntegrationsInformation = () => {
  return (
    <div className="flex flex-col gap-4 border-2 rounded-md p-4">
      <div className="flex gap-2 items-center">
        <h1 className="font-bold">Integrations - Coming Soon!</h1>
        <IconClockStop className="font-bold" size={20} />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 justify-between items-center">
          <span className="flex gap-2">
            {" "}
            Todoist <IconSubtask size={24} />{" "}
          </span>
          <Button size="sm" disabled variant="ghost">
            {" "}
            <IconLock size={24} /> Connect
          </Button>
        </div>

        <Separator />

        <div className="flex gap-2 justify-between items-center">
          <span className="flex gap-2">
            Webhook <IconWebhook size={24} />
          </span>
          <Button size="sm" disabled variant="ghost">
            {" "}
            <IconLock size={24} /> Connect
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IntegrationsInformation;
