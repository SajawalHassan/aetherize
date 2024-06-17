import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAppDispatch, useAppSelector } from "@/hooks/store-hook";
import { handleStyleChange } from "@/lib/helper";
import { LucideIcon } from "lucide-react";
import React from "react";

export type ButtonsSelectItems = {
  value: string;
  tooltipText: string;
  Icon: LucideIcon;
}[];

type Props = {
  items: ButtonsSelectItems;
  property: string;
  label: string;
};

export const ButtonsSelect = (props: Props) => {
  const { selectedElement, elements } = useAppSelector((state) => state.editor);
  const dispatch = useAppDispatch();

  return (
    <div className="space-y-1">
      <Label className="text-muted-foreground">{props.label}</Label>
      <TooltipProvider delayDuration={0}>
        <Tabs
          onValueChange={(e) =>
            handleStyleChange(
              {
                target: {
                  id: props.property,
                  value: e,
                },
              },
              selectedElement!,
              elements,
              dispatch,
            )
          }
        >
          <TabsList className="flex h-fit flex-row items-center justify-between rounded-md border-[1px] border-white/20 bg-transparent">
            {props.items.map((item) => (
              <TabsTrigger
                key={item.value}
                value={item.value}
                className="h-10 w-10 flex-grow p-0 hover:bg-th-btn data-[active=true]:bg-th-btn"
                data-active={
                  (selectedElement?.styles as any)[props.property] ===
                  item.value
                }
                tooltipText={item.tooltipText}
              >
                <item.Icon size={18} />
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </TooltipProvider>
    </div>
  );
};
