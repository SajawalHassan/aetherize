import { cn } from "@/lib/utils";
import { Checkbox } from "./checkbox";
import { Label } from "./label";

type Props = {
  label: string;
  className?: string;
  checked: boolean;
  func: (val: boolean) => void;
};

export const LabelCheckbox = (props: Props) => {
  return (
    <div
      className={cn(
        "w-full flex items-center justify-between",
        props.className
      )}
    >
      <Label className="text-">{props.label}</Label>

      <Checkbox
        checked={props.checked}
        onCheckedChange={(val) => props.func(val as boolean)}
      />
    </div>
  );
};
