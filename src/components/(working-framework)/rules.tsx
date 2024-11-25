import { Button } from "@/components/ui/primitives/button";
import { Input } from "@/components/ui/primitives/input";
import { IconCircleMinus } from "@tabler/icons-react";
import { Plus } from "lucide-react";

interface FrameworkRulesProps {
  flow: "create" | "edit";
  rules: string[];
  onAddRule: () => void;
  onRuleChange: (index: number, value: string) => void;
  onRemoveRule: (index: number) => void;
  onPrev: () => void;
  onLaunch: () => void;
  disableLaunch: boolean;
}

const FrameworkRules: React.FC<FrameworkRulesProps> = ({
  flow,
  rules,
  onAddRule,
  onRuleChange,
  onRemoveRule,
  onPrev,
  onLaunch,
  disableLaunch,
}) => {
  return (
    <div className="flex flex-col gap-5 lg:w-[500px]">
      <h2 className="text-xl font-semibold text-center">
        Step 2:{" "}
        {flow === "edit" ? "Update Framework Rules" : "Create Framework Rules"}
      </h2>

      {rules.map((rule, index) => (
        <div key={index} className="flex gap-2 items-center">
          <Input
            type="text"
            placeholder={`Rule ${index + 1}`}
            value={rule}
            onChange={(e) => onRuleChange(index, e.target.value)}
            className="w-full"
            divClassName="flex-1"
          />
          {rules.length > 1 && (
            <IconCircleMinus
              cursor="pointer"
              onClick={() => onRemoveRule(index)}
            />
          )}
        </div>
      ))}

      <Button
        variant="outline"
        onClick={onAddRule}
        className="flex items-center gap-2"
      >
        <Plus className="w-4 h-4" />
        Add More Rules
      </Button>

      <Button variant="secondary" onClick={onPrev}>
        Edit Step 1
      </Button>

      <Button disabled={disableLaunch} onClick={onLaunch}>
        {flow == "create" ? "Active" : "Edit"} and Launch Framework
      </Button>
    </div>
  );
};

export default FrameworkRules;
