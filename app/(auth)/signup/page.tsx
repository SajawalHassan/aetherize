import { AuthGraphics } from "@/components/auth/auth-graphics";
import Image from "next/image";
import Graphic from "@/assets/smthmanidk.svg";
import { AuthForm } from "@/components/auth/auth-form";
import Link from "next/link";

type Props = {};

const Signup = (props: Props) => {
  return (
    <div className="bg-black min-h-screen xl:max-h-screen overflow-y-hidden overflow-x-hidden flex text-white font-finlandica!">
      <AuthGraphics mode="register" />
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
          <AuthForm mode="register" />
          Already have an account?{" "}
          <Link href={"/signin"} className="text-blue-500 font-medium">
            Log in!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
