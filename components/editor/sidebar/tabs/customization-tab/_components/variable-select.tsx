import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hook";
import React, { useEffect, useState } from "react";
import { Variable, editorActions } from "@/slices/editor-slice";

type Props = {
  cssProp: string;
  variables: Variable[];
};

export const VariableSelect = (props: Props) => {
  const [selectedVariable, setSelectedVariable] = useState<Variable | null>(
    null,
  );

  const dispatch = useAppDispatch();
  const { variables } = props;
  const { selectedElement } = useAppSelector((state) => state.editor);

  const handleVariableChange = (variable: Variable) => {
    const newValue = variable?.value as string;
    setSelectedVariable(variable);

    dispatch(
      editorActions.updateVariables({
        ...variable,
        elementId: selectedElement!.id,
        cssProp: props.cssProp,
        value: newValue,
      }),
    );
  };

  useEffect(() => {
    const variable = variables.filter(
      (variable) =>
        variable.elementId === selectedElement!.id &&
        variable.cssProp === props.cssProp,
    )[0];

    setSelectedVariable(variable);
  }, [selectedElement]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-[40px] cursor-pointer border-l border-white/20 px-4 hover:bg-th-btn">
          {selectedVariable ? `${selectedVariable.name}` : "Var"}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="border-none bg-th-btn p-0 text-white">
        {variables.length > 0 ? (
          variables.map((variableObj) => (
            <DropdownMenuItem
              key={variableObj.id}
              onClick={() => handleVariableChange(variableObj)}
            >
              {variableObj.name}
            </DropdownMenuItem>
          ))
        ) : (
          <p className="p-2 text-center font-bold">No variables</p>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
