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
  defaultValue: string;
  setValuePlaceholder: React.Dispatch<React.SetStateAction<string>>;
  cssProp: string;
};

export const TriggerSelect = (props: Props) => {
  const [selectedTrigger, setSelectedTrigger] = useState("");
  const [selectedTriggerValue, setSelectedTriggerValue] = useState(false);
  const [openChange, setOpenChange] = useState(false);

  const dispatch = useAppDispatch();
  const { stateValue, setValuePlaceholder } = props;
  const { selectedElement, triggers } = useAppSelector((state) => state.editor);

  const trigger = triggers.filter(
    (trigger) => trigger.name === selectedTrigger,
  )[0];

  useEffect(() => {
    if (stateValue && trigger) {
      dispatch(
        editorActions.updateTriggers({
          ...trigger,
          elementId: selectedElement!.id,
          name: selectedTrigger,
          triggerValue: selectedTriggerValue,
          cssPropValue: stateValue,
          cssProp: props.cssProp,
        }),
      );
    }
  }, [selectedTriggerValue, stateValue, openChange]);

  useEffect(() => {
    const trigger = triggers.filter(
      (trigger) =>
        trigger.elementId === selectedElement!.id &&
        trigger.cssProp === props.cssProp,
    )[0];

    if (trigger) {
      setSelectedTrigger(trigger.name);
      setSelectedTriggerValue(trigger.triggerValue);
      setValuePlaceholder(trigger.cssPropValue);
    }
  }, []);

  return (
    <DropdownMenu open={openChange} onOpenChange={setOpenChange}>
      <DropdownMenuTrigger asChild>
        <button className="h-[40px] cursor-pointer border-l border-white/20 px-4 hover:bg-th-btn">
          {selectedTrigger
            ? `${selectedTrigger}=${selectedTriggerValue}`
            : "if"}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="border-none bg-th-btn p-0 text-white">
        {triggers.length > 0 ? (
          triggers.map((triggerObj) => (
            <DropdownMenuSub key={triggerObj.id}>
              <DropdownMenuSubTrigger className="cursor-pointer py-2.5 focus:bg-black/20 data-[state=open]:bg-black/20">
                {triggerObj.name}
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="border-none bg-th-btn text-white">
                  <DropdownMenuItem
                    className="focus:bg-black/20 focus:text-white"
                    onClick={() => {
                      setSelectedTrigger(triggerObj.name);
                      setSelectedTriggerValue(true);
                    }}
                  >
                    true
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="focus:bg-black/20 focus:text-white"
                    onClick={() => {
                      setSelectedTrigger(triggerObj.name);
                      setSelectedTriggerValue(false);
                    }}
                  >
                    false
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          ))
        ) : (
          <p className="p-2 text-center font-bold">No triggers</p>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
