import { AuthGraphics } from "@/components/auth/auth-graphics";
import Image from "next/image";
import Graphic from "@/assets/smthmanidk.svg";
import { AuthForm } from "@/components/auth/auth-form";
import Link from "next/link";

type Props = {};

const Signin = (props: Props) => {
  return (
    <div className="bg-black min-h-screen xl:max-h-screen overflow-y-hidden overflow-x-hidden flex text-white font-finlandica!">
      <AuthGraphics mode="login" />
      <div className="flex-60 relative">
        <Image
          src={Graphic}
          alt="graphic"
          width={1061}
          height={1061}
          className="absolute top-0 xl:-right-75.5 bottom-0 z-0"
          draggable={false}
        />

        <div className="px-20 space-y-3">
          <AuthForm mode="login" />
          Don't have an account?{" "}
          <Link href={"/signup"} className="text-blue-500 font-medium">
            Create one!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signin;
