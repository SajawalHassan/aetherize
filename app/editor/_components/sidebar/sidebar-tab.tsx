import { TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LucideIcon } from "lucide-react";

type Props = {
  Icon: LucideIcon;
  value: string;
  tooltipText?: string;
};

export const SidebarTab = (props: Props) => {
  return (
    <>
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger>
            <TabsTrigger
              value={props.value}
              className="p-2 hover:bg-white hover:bg-opacity-10 active:bg-transparent data-[state=active]:bg-zinc-700"
            >
              <props.Icon className="text-white" />
            </TabsTrigger>
          </TooltipTrigger>
          <TooltipContent
            side="left"
            className="mr-2 border-none bg-zinc-800 text-white shadow shadow-zinc-700"
          >
            {props.tooltipText ? props.tooltipText : props.value}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <p className="sr-only">{props.value}</p>
    </>
  );
};
