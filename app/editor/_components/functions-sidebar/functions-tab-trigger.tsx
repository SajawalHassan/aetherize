import { TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { functionsSidebarTabBtns } from "@/lib/types";
import clsx from "clsx";
import { LucideIcon } from "lucide-react";
import React from "react";

type Props = {
  Icon: LucideIcon;
  value: functionsSidebarTabBtns;
};

export const FunctionsTabTrigger = (props: Props) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <TabsTrigger
          value={props.value}
          className={clsx(
            "rounded-md bg-th-btn/30 p-3 text-white hover:bg-th-btn/80",
          )}
        >
          <props.Icon size={24} />
        </TabsTrigger>
      </TooltipTrigger>
      <TooltipContent
        className={clsx("border-white/10 bg-th-btn text-white")}
        side="right"
      >
        <p>{props.value}</p>
      </TooltipContent>
    </Tooltip>
  );
};
