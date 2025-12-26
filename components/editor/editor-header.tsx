import Image from "next/image";
import Logo from "@/assets/logo.svg";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  EyeIcon,
  LaptopIcon,
  RedoIcon,
  SmartphoneIcon,
  TabletIcon,
  UndoIcon,
} from "lucide-react";
import { Separator } from "../ui/separator";

type Props = {};

export const EditorHeader = (props: Props) => {
  const newLocal = "p-4 flex items-center justify-between bg-section-bg";
  return (
    <nav className={newLocal}>
      <div className="flex items-center gap-x-2">
        <Image
          src={Logo}
          alt="Logo, Aetherize"
          width={62}
          height={62}
          className="border-r border-border pr-4"
        />
        <div className="flex items-center gap-x-2">
          <Button variant={"icon"}>
            <ArrowLeft className="icon" />
          </Button>
          <div className="">
            <h1 className="font-bold text-[24px]">Page Name</h1>
            <p className="italic text-[12px] opacity-75">
              [Username]’s projects / [Project Name]
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-x-2 h-full">
        <Button variant={"icon"}>
          <SmartphoneIcon className="icon" />
        </Button>
        <Button variant={"icon"}>
          <TabletIcon className="icon" />
        </Button>
        <Button variant={"icon"}>
          <LaptopIcon className="icon" />
        </Button>

        <Separator />

        <p className="text-[16px] ml-2">100%</p>
      </div>

      <div className="flex items-center gap-x-2">
        <Button variant={"icon"}>
          <UndoIcon className="icon" />
        </Button>
        <Button variant={"icon"}>
          <RedoIcon className="icon" />
        </Button>

        <Separator />
        <Button variant={"icon"}>
          <EyeIcon className="icon" />
        </Button>
        <Separator />

        <Button
          variant={"default"}
          className="text-[19.5px] font-bold h-11 w-30"
        >
          Publish
        </Button>
      </div>
    </nav>
  );
};
