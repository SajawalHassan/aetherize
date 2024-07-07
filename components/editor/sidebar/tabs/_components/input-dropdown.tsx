import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hook";
import { handleStyleChange } from "@/lib/helper";
import { cn } from "@/lib/utils";
import { useEffect, useMemo, useState, useTransition } from "react";
import { VariableSelect } from "../customization-tab/_components/variable-select";

type Props = {
  value: string;
  placeholder: string;
  cssProp: string;
  className?: string;
};

export const InputDropdown = (props: Props) => {
  const [_isPending, startTransition] = useTransition();
  const [inputValue, setInputValue] = useState("");

  const { selectedElement, elements, variables } = useAppSelector(
    (state) => state.editor,
  );

  const dispatch = useAppDispatch();

  const variable = useMemo(() => {
    return variables.filter(
      (variable) =>
        variable.elementId === selectedElement!.id &&
        variable.cssProp === props.cssProp,
    )[0];
  }, [variables]);

  useEffect(() => {
    if (variable) return;

    startTransition(() => {
      const newInputValue = props.value.split(/(\d+)/)[1] || "";

      setInputValue(newInputValue);
    });
  }, [selectedElement]);

  const handleInputChange = (newInputValue: string) => {
    if (variable) return;

    startTransition(() => setInputValue(newInputValue));

    handleStyleChange(
      {
        target: {
          id: props.cssProp,
          value: newInputValue + "px",
        },
      },
      selectedElement!,
      elements,
      dispatch,
    );
  };

  return (
    <div
      className={cn(
        "flex items-center border border-white/10 bg-th-bg pl-3 pt-0",
        props.className,
      )}
    >
      <Input
        value={variable ? variable.value : inputValue}
        onChange={(e) =>
          handleInputChange(e.target.value.split(/(\d+)/)[1] || "")
        }
        placeholder={props.placeholder}
        className="border-none bg-transparent p-0"
      />

      <VariableSelect cssProp={props.cssProp} variables={variables} />
    </div>
  );
};
