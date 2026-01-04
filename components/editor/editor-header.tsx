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
import Link from "next/link";
import { useAppDispatch } from "@/editor-store/hooks";
import { redoState, undoState } from "@/editor-store/editor-slice";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

type Props = {};

export const EditorHeader = (props: Props) => {
  const dispatch = useAppDispatch();

  return (
    <nav className="p-4 flex items-center justify-between bg-section-bg">
      <div className="flex items-center gap-x-2">
        <Image src={Logo} alt="Logo, Aetherize" width={42} height={42} />
        <Separator className="ml-2.5" />
        <div className="flex items-center gap-x-2">
          <Link href={"/"}>
            <Button variant={"icon"}>
              <ArrowLeft className="icon" />
            </Button>
          </Link>
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
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant={"icon"} onClick={(_) => dispatch(undoState())}>
              <UndoIcon className="icon" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Undo</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant={"icon"} onClick={(_) => dispatch(redoState())}>
              <RedoIcon className="icon" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Redo</TooltipContent>
        </Tooltip>

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
