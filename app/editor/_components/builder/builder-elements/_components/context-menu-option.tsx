import { LucideIcon } from "lucide-react";
import { MouseEvent } from "react";

type Props = {
  text: string;
  Icon: LucideIcon;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  hotKey: string;
};

export const ContextMenuOption = (props: Props) => {
  return (
    <button
      onClick={props.onClick}
      className="flex w-full items-center justify-between px-2.5 py-2 hover:bg-white/20 disabled:text-gray-400 disabled:hover:bg-transparent"
      disabled={props.disabled}
    >
      <div className="flex items-center gap-x-2">
        <props.Icon />
        <p className="font-[550]">{props.text}</p>
      </div>
      <p className="font-mono text-xs text-gray-400">{props.hotKey}</p>
    </button>
  );
};
