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
    <nav className="pt-2 flex items-center justify-between md:pt-4 lg:max-w-280 2xl:max-w-320 mx-auto">
      <div className="flex items-center gap-x-4">
        <Image
          src={Logo}
          alt="Aetherize Logo"
          width={32}
          height={32}
          className="xl:h-9.5 xl:w-9.5"
        />
        <h1 className="font-finlandica text-[35px] md:text-[30px] xl:text-[36px] font-bold bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
          Aetherize
        </h1>
      </div>

      <div className="items-center gap-x-3 xl:gap-x-6 hidden md:flex">
        {linksData.map((linkData) => (
          <Link
            href={linkData.href}
            className="text-[16px] xl:text-[18px] opacity-75"
            key={linkData.name}
          >
            {linkData.name}
          </Link>
        ))}
      </div>

      <Button className="rounded-full h-10 bg-primary px-6 text-[18px] hidden md:flex items-center justify-center xl:text-[20px] xl:h-11 xl:px-8">
        Sign up
      </Button>

      <button className="md:hidden">
        <Image src={MenuIcon} alt="Menu Icon" width={38} height={38} />
      </button>
    </nav>
  );
};
