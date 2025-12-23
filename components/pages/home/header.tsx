import Logo from "@/assets/logo.svg";
import MenuIcon from "@/assets/menu.svg";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

type Props = {};

type LinkData = {
  name: string;
  href: string;
};

const linksData: LinkData[] = [
  {
    name: "Templates",
    href: "#",
  },

  {
    name: "Learn",
    href: "#",
  },
  {
    name: "Pricing",
    href: "#",
  },

  {
    name: "Community",
    href: "#",
  },

  {
    name: "About",
    href: "#",
  },
];

export const Header = (props: Props) => {
  return (
    <div className="pt-2 flex items-center justify-between">
      <div className="flex items-center gap-x-4">
        <Image src={Logo} alt="Aetherize Logo" width={32} height={32} />
        <h1 className="font-finlandica text-[35px] font-bold bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
          Aetherize
        </h1>
      </div>

      <div className="items-center gap-x-4 hidden md:flex">
        {linksData.map((linkData) => (
          <Link
            href={linkData.href}
            className="text-[16px] opacity-75"
            key={linkData.name}
          >
            {linkData.name}
          </Link>
        ))}
      </div>

      <Button className="rounded-full h-10 bg-primary px-8 text-[18px] hidden md:block">
        Sign up
      </Button>

      <button className="md:hidden">
        <Image src={MenuIcon} alt="Menu Icon" width={38} height={38} />
      </button>
    </div>
  );
};
