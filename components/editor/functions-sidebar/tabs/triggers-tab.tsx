import { TabsContent } from "@/components/ui/tabs";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hook";
import { functionsSidebarTabBtns } from "@/lib/types";
import { TriggerInput } from "../_components/trigger-input";
import clsx from "clsx";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { editorActions } from "@/slices/editor-slice";
import { v4 } from "uuid";

type Props = {};

export const TriggersTab = (props: Props) => {
  const [triggerInput, setTriggerInput] = useState("");

  const { triggers } = useAppSelector((state) => state.editor);
  const dispatch = useAppDispatch();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (triggers.filter((trigger) => trigger.name === triggerInput).length > 0)
      return;

    dispatch(
      editorActions.updateTriggers({
        id: v4(),
        elementId: "",
        cssProp: "",
        cssPropValue: "",
        name: triggerInput,
        value: true,
        triggerValue: true,
      }),
    );
    setTriggerInput("");
  };

  return (
    <TabsContent value={"Triggers" as functionsSidebarTabBtns}>
      <h3 className="mb-6 pl-2 text-3xl font-bold">Triggers</h3>
      <div className="space-y-2">
        {triggers.map((triggerObj) => (
          <TriggerInput key={triggerObj.name} trigger={triggerObj} />
        ))}
      </div>

      <form className={clsx("mt-4 flex items-center")} onSubmit={handleSubmit}>
        <Input
          value={triggerInput}
          onChange={(e) => setTriggerInput(e.target.value)}
          placeholder="New trigger"
          className="rounded-none p-3 focus:border-white/10"
        />
        <Button className="rounded-none">Add</Button>
      </form>
    </TabsContent>
  );
};
