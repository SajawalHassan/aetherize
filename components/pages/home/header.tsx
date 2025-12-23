import MenuIcon from "@/assets/menu.svg";
import Image from "next/image";

type Props = {};

export const Header = (props: Props) => {
  return (
    <div className="pt-2 flex items-center justify-between">
      <h1 className="font-finlandica text-[35px] font-bold">Aetherize</h1>

      <button>
        <Image src={MenuIcon} alt="Menu Icon" width={38} height={38} />
      </button>
    </div>
  );
};
