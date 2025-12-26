import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusIcon } from "lucide-react";
import LogoCircle from "@/assets/logo-circle.svg";
import Image from "next/image";

type Props = {};

export type SidebarTypes = "Add";

export const Sidebar = (props: Props) => {
  return (
    <Tabs
      defaultValue={"Add" as SidebarTypes}
      className="bg-section-bg min-h-[calc(100vh-86px)] flex w-max border-t border-border relative"
    >
      <div className="px-2 absolute -top-1.5 bg-section-bg left-[61.4px]">
        <Image src={LogoCircle} alt="Logo circle" width={14} height={14} />
      </div>
      <div className="flex grow mt-4">
        <TabsList className="bg-transparent text-white! gap-x-2 w-max flex-col h-full rounded-none pl-4 pr-[13.5px] gap-y-4 pb-4">
          <TabsTrigger value={"Add" as SidebarTypes} asChild>
            <Button
              variant={"icon"}
              className="text-white! data-[state=active]:bg-zinc-500/25! p-2!"
            >
              <PlusIcon className="icon" />
            </Button>
          </TabsTrigger>
          <TabsTrigger value={"SSS" as SidebarTypes} asChild>
            <Button
              variant={"icon"}
              className="text-white! data-[state=active]:bg-zinc-500/25! p-2!"
            >
              <PlusIcon className="icon" />
            </Button>
          </TabsTrigger>
        </TabsList>

        <Separator />

        <div className="min-w-70">
          <TabsContent value={"Add" as SidebarTypes} className="ml-4">
            Hello World
          </TabsContent>
        </div>
      </div>
    </Tabs>
  );
};
