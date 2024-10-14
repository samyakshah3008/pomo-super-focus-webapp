import { Button } from "@/components/ui/primitives/button";
import { Input } from "@/components/ui/primitives/input";

interface FrameworkFormProps {
  flow: "create" | "edit";
  title: string;
  description: string;
  setTitle: (value: string) => void;
  setDescription: (value: string) => void;
  onNext: () => void;
}

const FrameworkForm: React.FC<FrameworkFormProps> = ({
  flow = "create",
  title,
  description,
  setTitle,
  setDescription,
  onNext,
}) => {
  return (
    <div className="flex flex-col gap-5 w-[500px]">
      <h2 className="text-xl font-semibold text-center">
        Step 1:{" "}
        {flow == "edit" ? "Edit Framework Details" : "Enter Framework Details"}
      </h2>

      <div className="flex flex-col gap-2">
        <div className="text-sm">Framework's title:</div>
        <Input
          id="title"
          type="text"
          value={title}
          onChange={(e: any) => setTitle(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="text-sm">Framework's description:</div>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="h-24 p-2 text-sm border rounded-md placeholder:text-gray-300 placeholder:text-sm"
        />
      </div>

      <Button onClick={onNext} disabled={!title.length || !description.length}>
        Next
      </Button>
    </div>
  );
};

export default FrameworkForm;
