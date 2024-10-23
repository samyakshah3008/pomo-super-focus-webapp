"use client";

import { Separator } from "@/components/ui/primitives/separator";
import { Switch } from "@/components/ui/primitives/switch";
import { IconClockStop } from "@tabler/icons-react";

const Notifications = () => {
  return (
    <div className="flex flex-col gap-4 border-2 rounded-md p-4">
      <div className="flex gap-2">
        <h1 className="font-bold">Email Reminders - Coming soon!</h1>
        <IconClockStop className="font-bold" size={20} />
      </div>

      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <div>Remind me about my goals!</div>
          <div className="text-slate-500 text-sm">
            We often tend to forget about our goals and deadlines we created,
            but we have got you! enable it and we will send you email to remind
            you!
          </div>
        </div>
        <Switch checked={false} disabled={true} />
      </div>

      <Separator />

      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <div>Remind my gratitude list!</div>
          <div className="text-slate-500 text-sm">
            Enable it and we will make sure you start your day with gratitude!
          </div>
        </div>
        <Switch checked={false} disabled={true} />
      </div>

      <Separator />

      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <div>Remind my days remaining in this life! 🙀</div>
          <div className="text-slate-500 text-sm">
            Take this as an opportunity to focus on important things because
            everyone have limited time on this earth. We will email you your
            remaining days of your estimate life span!
          </div>
        </div>
        <Switch checked={false} disabled={true} />
      </div>

      <Separator />

      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <div>Remind my bucket list</div>
          <div className="text-slate-500 text-sm">
            Take this as an opportunity to also take some break and check off
            your bucket list, enable and we will send you email reminder!
          </div>
        </div>
        <Switch checked={false} disabled={true} />
      </div>

      <Separator />

      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <div>Remind my bucket list</div>
          <div className="text-slate-500 text-sm">
            Take this as an opportunity to also take some break and check off
            your bucket list, enable and we will send you email reminder!
          </div>
        </div>
        <Switch checked={false} disabled={true} />
      </div>
    </div>
  );
};

export default Notifications;
