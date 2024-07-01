import { TabsContent } from "@/components/ui/tabs";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hook";
import { functionsSidebarTabBtns } from "@/lib/types";
import { VariableInput } from "../variable-input";
import clsx from "clsx";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { editorActions } from "@/slices/editor-slice";
import { v4 } from "uuid";

type Props = {};

export const VariablesTab = (props: Props) => {
  const [variableInput, setVariableInput] = useState("");

  const { variables } = useAppSelector((state) => state.editor);
  const dispatch = useAppDispatch();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      variables.filter((variable) => variable.variableName === variableInput)
        .length > 0
    )
      return;

    dispatch(
      editorActions.changeVariablesList({
        id: v4(),
        elementId: "",
        cssProp: "",
        cssPropValue: "",
        variableName: variableInput,
        variableValue: true,
        variableTrigger: true,
      }),
    );
    setVariableInput("");
  };

  return (
    <TabsContent value={"Variables" as functionsSidebarTabBtns}>
      <h3 className="mb-6 pl-2 text-3xl font-bold">Variables</h3>
      <div className="space-y-2">
        {variables.map((variableObj) => (
          <VariableInput
            key={variableObj.variableName}
            variable={variableObj}
          />
        ))}
      </div>

      <form className={clsx("mt-4 flex items-center")} onSubmit={handleSubmit}>
        <Input
          value={variableInput}
          onChange={(e) => setVariableInput(e.target.value)}
          placeholder="New variable"
          className="rounded-none bg-background p-3 focus:border-white/10"
        />
        <Button className="rounded-none">Add</Button>
      </form>
    </TabsContent>
  );
};
