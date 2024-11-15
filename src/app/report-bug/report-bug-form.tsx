"use client";

import { Button } from "@/components/ui/primitives/button";
import { Input } from "@/components/ui/primitives/input";
import { Textarea } from "@/components/ui/primitives/textarea";
import { useToast } from "@/components/ui/primitives/use-toast";
import { postWithToken } from "@/config/API";
import { Loader } from "lucide-react";
import { useState } from "react";

const ReportBugForm = ({ setIsFormSubmitted, setFormResponse }: any) => {
  const [reportBugFormDetails, setReportBugFormDetails] = useState({
    title: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: any) => {
    setIsSubmitting(true);

    try {
      const response = await postWithToken("/users/report-bug", {
        title: reportBugFormDetails.title,
        description: reportBugFormDetails.description,
      });
      setIsFormSubmitted(true);
      setFormResponse(response?.issueURL);
      toast({ title: "Successfully created a new github ticket!" });
    } catch (error) {
      console.log(error, "error while submitting report bug form");
      toast({
        title: "Failed to create a ticket",
        description:
          "Uh oh, we are sorry to disappoint but we failed to create a ticket for now, please try again later. ",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="border-border dark:bg-background z-10 rounded-xl border bg-neutral-100 p-6 w-[600px] flex flex-col gap-4 mt-4">
      <div className="flex flex-col gap-2">
        <div className="text-sm">Title:</div>
        <Input
          value={reportBugFormDetails.title}
          onChange={(e) =>
            setReportBugFormDetails({
              ...reportBugFormDetails,
              title: e.target.value,
            })
          }
          disabled={isSubmitting}
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-sm">Describe your issue:</div>
        <Textarea
          onChange={(e) =>
            setReportBugFormDetails({
              ...reportBugFormDetails,
              description: e.target.value,
            })
          }
          disabled={isSubmitting}
        />
      </div>
      <Button
        disabled={
          isSubmitting ||
          !reportBugFormDetails.title.length ||
          !reportBugFormDetails.description.length
        }
        onClick={handleSubmit}
      >
        {isSubmitting ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : null}{" "}
        {isSubmitting ? "We are submitting your issue..." : "Submit issue!"}
      </Button>
    </div>
  );
};

export default ReportBugForm;
