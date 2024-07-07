import { TabsContent } from "@/components/ui/tabs";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hook";
import { VariableTypes, functionsSidebarTabBtns } from "@/lib/types";
import React, { useState } from "react";
import { VariableInput } from "../_components/variable-input";
import clsx from "clsx";
import { editorActions } from "@/slices/editor-slice";
import { v4 } from "uuid";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { variableTypesConstants } from "@/lib/constants";

type Props = {};

export const VariablesTab = (props: Props) => {
  const [variableInput, setVariableInput] = useState("");
  const [variableType, setVariableType] = useState<VariableTypes>("string");
  const [error, setError] = useState("");

  const { variables } = useAppSelector((state) => state.editor);
  const dispatch = useAppDispatch();

  const setNewError = (error: string) => {
    setError(error);
    setTimeout(() => setError(""), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!variableInput || !variableType)
      return setNewError("Variable name cannot be empty");

    dispatch(
      editorActions.updateVariables({
        id: v4(),
        elementId: "",
        cssProp: "",
        name: "variable_" + variables.length,
        type: variableType,
        value: variableInput,
      }),
    );
    setVariableInput("");
  };

  return (
    <TabsContent value={"Variables" as functionsSidebarTabBtns}>
      <h3 className="mb-6 pl-2 text-3xl font-bold">Variables</h3>
      <div className="space-y-2">
        {variables.map((variable) => (
          <VariableInput key={variable.id} variable={variable} />
        ))}
      </div>

      <form className={clsx("mt-4 space-y-2")} onSubmit={handleSubmit}>
        <div className="flex items-center">
          <Input
            value={variableInput}
            onChange={(e) => setVariableInput(e.target.value)}
            placeholder="New variable"
            className="rounded-none p-3 focus:border-white/10"
          />
          <Select
            defaultValue={"string" as VariableTypes}
            value={variableType}
            onValueChange={(e) => setVariableType(e as VariableTypes)}
          >
            <SelectTrigger
              className="w-max rounded-none border-none bg-th-btn/40 hover:bg-th-btn/60"
              showTrigger={false}
            >
              <SelectValue placeholder="-" />
            </SelectTrigger>
            <SelectContent className="border-none bg-th-btn text-white">
              {variableTypesConstants.map((variableTypeConst) => (
                <SelectItem
                  key={variableTypeConst}
                  value={variableTypeConst}
                  className="cursor-pointer focus:bg-white/10 focus:text-white"
                >
                  {variableTypeConst}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {error && <p className="font-bold text-red-500">{error}</p>}
        <Button className="w-full rounded-sm font-bold">Add</Button>
      </form>
    </TabsContent>
  );
};
