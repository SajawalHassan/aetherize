import {
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hook";
import React, { useEffect, useState } from "react";
import { editorActions } from "@/slices/editor-slice";

type Props = {
  stateValue: string;
  setValuePlaceholder: React.Dispatch<React.SetStateAction<string>>;
  cssProp: string;
};

export const VariableSelect = (props: Props) => {
  const [selectedVar, setSelectedVar] = useState("");
  const [selectedVarValue, setSelectedVarValue] = useState(false);
  const [openChange, setOpenChange] = useState(false);

  const dispatch = useAppDispatch();
  const { stateValue, setValuePlaceholder } = props;
  const { selectedElement, variables } = useAppSelector(
    (state) => state.editor,
  );

  const variable = variables.filter(
    (variable) => variable.variableName === selectedVar,
  )[0];

  useEffect(() => {
    if (stateValue && variable) {
      dispatch(
        editorActions.changeVariablesList({
          ...variable,
          elementId: selectedElement!.id,
          variableName: selectedVar,
          variableTrigger: selectedVarValue,
          cssPropValue: stateValue,
          cssProp: props.cssProp,
        }),
      );
    }
  }, [selectedVarValue, stateValue, openChange]);

  useEffect(() => {
    const variable = variables.filter(
      (variable) =>
        variable.elementId === selectedElement!.id &&
        variable.cssProp === props.cssProp,
    )[0];

    if (variable) {
      setSelectedVar(variable.variableName);
      setSelectedVarValue(variable.variableTrigger);
      setValuePlaceholder(variable.cssPropValue);
    }
  }, []);

  return (
    <DropdownMenu open={openChange} onOpenChange={setOpenChange}>
      <DropdownMenuTrigger asChild>
        <button className="h-[40px] cursor-pointer border-l border-white/20 px-4 hover:bg-th-btn">
          {selectedVar ? `${selectedVar}=${selectedVarValue}` : "if"}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="border-none bg-th-btn p-0 text-white">
        {variables.length > 0 ? (
          variables.map((variableObj) => (
            <DropdownMenuSub key={variableObj.id}>
              <DropdownMenuSubTrigger className="cursor-pointer py-2.5 focus:bg-black/20 data-[state=open]:bg-black/20">
                {variableObj.variableName}
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="border-none bg-th-btn text-white">
                  <DropdownMenuItem
                    className="focus:bg-black/20 focus:text-white"
                    onClick={() => {
                      setSelectedVar(variableObj.variableName);
                      setSelectedVarValue(true);
                    }}
                  >
                    true
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="focus:bg-black/20 focus:text-white"
                    onClick={() => {
                      setSelectedVar(variableObj.variableName);
                      setSelectedVarValue(false);
                    }}
                  >
                    false
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          ))
        ) : (
          <p className="p-2 text-center font-bold">No variables</p>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
