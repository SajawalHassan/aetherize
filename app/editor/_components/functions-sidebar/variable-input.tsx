import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppDispatch } from "@/hooks/store-hook";
import { editorActions } from "@/slices/editor-slice";
import { useState } from "react";

type Props = {
  name: string;
  value: string;
  type:
    | "string"
    | "number"
    | "bigint"
    | "boolean"
    | "symbol"
    | "undefined"
    | "object"
    | "function";
};

export const VariableInput = (props: Props) => {
  const dispatch = useAppDispatch();

  const changeVariable = (newValue: string) => {
    dispatch(
      editorActions.changeVariablesList({
        variableName: props.name,
        newValue: JSON.parse(newValue),
      }),
    );
  };

  return (
    <div className="flex items-center justify-between gap-x-2 bg-th-btn/20 px-3 py-1">
      <p className="">{props.name}</p>
      {props.type === "boolean" && (
        <Select
          onValueChange={(e) => changeVariable(e)}
          value={props.value.toString()}
        >
          <SelectTrigger
            className="w-max border-none bg-th-btn/40 hover:bg-th-btn/60"
            showTrigger={false}
          >
            <SelectValue placeholder="-" />
          </SelectTrigger>
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
      )}
    </div>
  );
};
