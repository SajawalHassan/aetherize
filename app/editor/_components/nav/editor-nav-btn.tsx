import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

type Props = {
  Icon: LucideIcon;
  srText: string;
};

export const EditorNavBtn = (props: Props) => {
  return (
    <>
      <Button
        size={"icon"}
        className="bg-transparent transition-all hover:bg-white hover:bg-opacity-10 active:bg-transparent"
      >
        <props.Icon className="h-7 w-7" />
      </Button>
      <p className="sr-only">{props.srText}</p>
    </>
  );
};
