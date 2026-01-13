import Image from "next/image";
import Atom1 from "@/assets/atom1.svg";
import Atom2 from "@/assets/atom2.svg";
import Telescope from "@/assets/telescope.svg";

type Props = {
  mode: "login" | "register";
};

export const AuthGraphics = (props: Props) => {
  return (
    <div className="flex-40 min-h-screen bg-linear-to-b from-[#0F0F0F] via-[#0f0F0F] to-black relative  items-center justify-center hidden xl:flex">
      <Image
        loading="eager"
        src={Atom1}
        alt="Atom"
        width={316}
        height={316}
        className="absolute -right-3.25 -top-10"
      />
      <Image
        loading="eager"
        src={Atom2}
        alt="Atom2"
        width={192}
        height={192}
        className="absolute -bottom-17.5 right-2.75"
      />
      <Image
        loading="eager"
        src={Telescope}
        alt="Telescope"
        width={280}
        height={280}
        className="absolute right-0 bottom-0 left-8"
      />
      <h1 className="text-[70px] font-bold text-center leading-tight">
        {props.mode === "login"
          ? "Hey there, welcome back."
          : "Start your journey today."}
      </h1>
    </div>
  );
};
