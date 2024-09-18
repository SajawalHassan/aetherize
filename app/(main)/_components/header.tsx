import { IconButton } from "@/components/icon-button";
import { MenuIcon } from "lucide-react";
import React from "react";

type Props = {};

export const Header = (props: Props) => {
  return (
    <header>
      <nav className="px-[16px] py-[18px] flex items-center justify-between">
        <h1 className="font-bold text-[35px]">Aetherize</h1>
        <IconButton Icon={MenuIcon} />
      </nav>
    </header>
  );
};
