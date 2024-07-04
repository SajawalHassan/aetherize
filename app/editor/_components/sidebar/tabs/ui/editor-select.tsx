import { useAppDispatch, useAppSelector } from "@/hooks/store-hook";
import { handleStyleChange } from "@/lib/helper";
import React, { useEffect, useState } from "react";
import { TriggerSelect } from "../customization-tab/_components/trigger-select";
import { Variable, editorActions } from "@/slices/editor-slice";
import { VariableIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Props = {
  dropdownList: string[];
  value: string;
  cssProp: string;
  placeholder: string;
  defaultValue: string;
  variables?: Variable[];
};

export const EditorSelect = (props: Props) => {
  const [selectedValue, setSelectedValue] = useState("");
  const [placeholder, setPlaceholder] = useState("-");

  const { elements, selectedElement } = useAppSelector((state) => state.editor);

  const dispatch = useAppDispatch();

  const handleOnChange = (value: string) => {
    setSelectedValue(value);
    handleStyleChange(
      {
        target: {
          id: props.cssProp,
          value,
        },
      },
      selectedElement!,
      elements,
      dispatch,
    );
  };

  const handleVariableChange = (variable: Variable) => {
    dispatch(
      editorActions.updateVariables({
        ...variable,
        cssProp: props.cssProp,
        elementId: selectedElement!.id,
      }),
    );
    setSelectedValue(variable.value as string);
  };

  useEffect(() => {
    setSelectedValue(props.value);
  }, []);

  return (
    <div className="flex h-[40px] w-full items-center justify-between bg-th-btn/30">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex h-full w-full items-center justify-between rounded-none border-none bg-transparent p-0 pl-3 pr-3 hover:bg-th-btn">
          <p className="capitalize">{props.cssProp}</p>
          <p>{props.value ? props.value : placeholder}</p>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="border-none bg-th-btn text-white">
          {props.dropdownList.map((item) => (
            <DropdownMenuItem
              key={item}
              onClick={(e) => handleOnChange(item || "")}
              data-active={selectedValue === item}
            >
              {item}
            </DropdownMenuItem>
          ))}
          {props.variables && props.variables.length > 0 && (
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="flex h-full w-full items-center justify-between rounded-none border-none bg-transparent px-3 py-1.5 focus:text-black data-[state=open]:text-black">
                <VariableIcon size={20} />
              </DropdownMenuSubTrigger>

              <DropdownMenuSubContent className="border-none bg-th-btn text-white">
                {props.variables.map((variable) => (
                  <DropdownMenuItem
                    key={variable.id}
                    onClick={() => handleVariableChange(variable)}
                  >
                    {variable.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <TriggerSelect
        cssProp={props.cssProp}
        defaultValue={props.defaultValue}
        stateValue={selectedValue}
        setValuePlaceholder={setPlaceholder}
      />
    </div>
  );
};
