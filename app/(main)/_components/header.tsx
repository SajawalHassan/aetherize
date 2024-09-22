import { Button } from "@/components/button";
import { IconButton } from "@/components/icon-button";
import { LinkComp } from "@/components/link-comp";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

interface Props {}

export const Header = (props: Props) => {
  return (
    <header>
      <nav className="px-[16px] py-[18px] md:px-[32px] z-50 flex items-center justify-between md:max-w-[900px] lg:max-w-[1100px] xl:max-w-[1348px] mx-auto absolute top-0 inset-x-0 w-full">
        <h1 className="font-bold text-[35px]">Aetherize</h1>
        <div className="lg:flex items-center gap-x-[30px] hidden">
          <LinkComp href="#" text="Templates" />
          <LinkComp href="#" text="Learn" />
          <LinkComp href="#" text="Pricing" />
          <LinkComp href="#" text="Community" />
          <LinkComp href="#" text="About" />
        </div>

        <Link href="/auth/sign-up" className="hidden lg:block">
          <Button text="Sign up" variant="primary" className="py-[10px] px-[38px] text-[20px] " />
        </Link>
        <IconButton Icon={MenuIcon} className="lg:hidden" />
      </nav>
    </header>
  );
};
