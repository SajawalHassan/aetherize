import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hook";
import { handleStyleChange } from "@/lib/helper";
import { editorActions } from "@/slices/editor-slice";
import React, { useEffect, useMemo, useState } from "react";
import { EditorSelectDropdownItem } from "./editor-select-dropdown-item";

type Props = {
  dropdownList: string[];
  value: string;
  id: string;
  placeholder: string;
  defaultValue: string;
};

export const EditorSelect = (props: Props) => {
  const [selectedVar, setSelectedVar] = useState("");
  const [selectedVarValue, setSelectedVarValue] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [openChange, setOpenChange] = useState(false);

  const { elements, selectedElement, variables } = useAppSelector(
    (state) => state.editor,
  );

  const variable = useMemo(() => {
    return variables.filter(
      (variable) => variable.variableName === selectedVar,
    )[0];
  }, [openChange]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!selectedValue || !variable) {
      handleStyleChange(
        {
          target: {
            id: props.id,
            value: selectedValue,
          },
        },
        selectedElement!,
        elements,
        dispatch,
      );
    }
  }, [selectedValue]);

  useEffect(() => {
    setSelectedValue(props.value);
    const variable = variables.filter((variable) => variable.cssProp)[0];

    if (variable) {
      setSelectedVar(variable.variableName);
      setSelectedVarValue(variable.variableValue);
    }
  }, []);

  return (
    <div className="flex h-[40px] w-full items-center justify-between bg-th-btn/30">
      <Select
        onValueChange={(e) => setSelectedValue(e || "")}
        value={selectedValue}
        defaultValue={props.defaultValue}
      >
        <SelectTrigger
          showTrigger={false}
          className="rounded-none border-none bg-transparent p-0 pl-3 pr-3 hover:bg-th-btn"
        >
          <p>{props.placeholder}</p>
          <SelectValue placeholder="-" className="font-semibold" />
        </SelectTrigger>
        <SelectContent className="border-none bg-th-btn text-white">
          {props.dropdownList.map((item) => (
            <SelectItem value={item} key={item}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <DropdownMenu open={openChange} onOpenChange={setOpenChange}>
        <DropdownMenuTrigger asChild>
          <button className="h-[40px] cursor-pointer border-l border-white/20 px-4 hover:bg-th-btn">
            {selectedVar ? `${selectedVar}==${selectedVarValue}` : "if"}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="border-none bg-th-btn p-0 text-white">
          {variables.map((variableObj) => (
            <EditorSelectDropdownItem
              setSelectedVar={setSelectedVar}
              setSelectedVarValue={setSelectedVarValue}
              variableObj={variableObj}
              key={variableObj.id}
              id={props.id}
              selectedValue={selectedValue}
              selectedVar={selectedVar}
              selectedVarValue={selectedVarValue}
            />
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
