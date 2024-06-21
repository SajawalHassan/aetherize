import {
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hook";
import { Variable, editorActions } from "@/slices/editor-slice";
import React, { useEffect, useMemo, useState } from "react";

type Props = {
  variableObj: Variable;
  setSelectedVar: React.Dispatch<React.SetStateAction<string>>;
  setSelectedVarValue: React.Dispatch<React.SetStateAction<boolean>>;
  selectedValue: string;
  selectedVar: string;
  selectedVarValue: boolean;
  id: string;
};

export const EditorSelectDropdownItem = (props: Props) => {
  const [openChange, setOpenChange] = useState(false);

  const {
    id,
    selectedValue,
    selectedVar,
    selectedVarValue,
    setSelectedVar,
    setSelectedVarValue,
    variableObj,
  } = props;
  const { variables, selectedElement } = useAppSelector(
    (state) => state.editor,
  );

  const variable = useMemo(() => {
    return variables.filter(
      (variable) => variable.variableName === selectedVar,
    )[0];
  }, [openChange]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (selectedValue && variable) {
      dispatch(
        editorActions.changeVariablesList({
          ...variable,
          elementId: selectedElement!.id,
          variableName: selectedVar,
          variableTrigger: selectedVarValue,
          cssProp: id,
          cssPropValue: selectedValue,
        }),
      );
    }
  }, [selectedVarValue, selectedValue, openChange]);

  return (
    <DropdownMenuSub
      open={openChange}
      onOpenChange={setOpenChange}
      key={variableObj.id}
    >
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
  );
};
