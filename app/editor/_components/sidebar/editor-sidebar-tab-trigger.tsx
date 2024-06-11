import { TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { tabBtns } from "@/lib/constants";
import { LucideIcon } from "lucide-react";
import clsx from "clsx";

type Props = {
  Icon: LucideIcon;
  value: tabBtns;
};

export const EditorSidebarTabTrigger = (props: Props) => {
  return (
    <Tooltip>
      <TabsTrigger
        value={props.value}
        className={clsx(
          "h-full flex-grow rounded-none bg-th-btn/50 text-white hover:bg-th-btn/80 data-[state=active]:bg-th-btn data-[state=active]:text-white",
        )}
        asChild
      >
        <TooltipTrigger>
          <props.Icon size={32} />
        </TooltipTrigger>
      </TabsTrigger>
      <TooltipContent className={clsx("border-white/10 bg-th-btn text-white")}>
        <p>{props.value}</p>
      </TooltipContent>
    </Tooltip>
  );
};
