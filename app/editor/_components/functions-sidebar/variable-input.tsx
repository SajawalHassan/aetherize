import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hook";
import { Variable, editorActions } from "@/slices/editor-slice";
import { TrashIcon } from "lucide-react";

type Props = {
  variable: Variable;
};

export const VariableInput = (props: Props) => {
  const dispatch = useAppDispatch();
  const { variable } = props;
  const { selectedElement } = useAppSelector((state) => state.editor);

  const changeVariable = (newValue: string) => {
    dispatch(
      editorActions.changeVariablesList({
        ...variable,
        variableValue: JSON.parse(newValue),
        elementId: selectedElement!.id,
      }),
    );
  };

  return (
    <div className="group relative flex items-center justify-between gap-x-2 bg-th-btn/20 pl-3">
      <p title={variable.variableName} className="max-w-[150px] truncate py-1">
        {variable.variableName}
      </p>
      <Select
        onValueChange={(e) => changeVariable(e)}
        value={variable?.variableValue?.toString()}
      >
        <div className="flex items-center">
          <SelectTrigger
            className="w-max rounded-none border-none bg-th-btn/40 hover:bg-th-btn/60"
            showTrigger={false}
          >
            <SelectValue placeholder="-" />
          </SelectTrigger>
          <Button className="w-max rounded-none border-l border-white/40 bg-th-btn/40 hover:bg-th-btn/60">
            <TrashIcon size={18} />
          </Button>
        </div>
        <SelectContent className="border-none bg-th-btn text-white">
          <SelectItem
            className="cursor-pointer focus:bg-white/10 focus:text-white"
            value={"true"}
          >
            true
          </SelectItem>
          <SelectItem
            className="cursor-pointer focus:bg-white/10 focus:text-white"
            value={"false"}
          >
            false
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
