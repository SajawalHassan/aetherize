import { TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { tabBtns } from "@/lib/types";
import { LucideIcon } from "lucide-react";
import clsx from "clsx";

type Props = {
  Icon: LucideIcon;
  value: tabBtns;
};

export const EditorSidebarTabTrigger = (props: Props) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <TabsTrigger
          value={props.value}
          className={clsx(
            "hover:bg-th-btn-hover h-full flex-grow rounded-none bg-th-btn text-white",
          )}
        >
          <props.Icon size={32} />
        </TabsTrigger>
      </TooltipTrigger>
      <TooltipContent className={clsx("border-white/10 bg-th-btn text-white")}>
        <p>{props.value}</p>
      </TooltipContent>
    </Tooltip>
  );
};
