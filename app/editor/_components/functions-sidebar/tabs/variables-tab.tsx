import { TabsContent } from "@/components/ui/tabs";
import { useAppSelector } from "@/hooks/store-hook";
import { functionsSidebarTabBtns } from "@/lib/types";
import React from "react";
import { VariableInput } from "../_components/variable-input";

type Props = {};

export const VariablesTab = (props: Props) => {
  const { variables } = useAppSelector((state) => state.editor);

  return (
    <TabsContent value={"Variables" as functionsSidebarTabBtns}>
      <h3 className="mb-6 pl-2 text-3xl font-bold">Variables</h3>
      <div className="space-y-2">
        {variables.map((variable) => (
          <VariableInput key={variable.name} variable={variable} />
        ))}
      </div>
    </TabsContent>
  );
};
