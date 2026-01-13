import { AuthGraphics } from "@/components/auth/auth-graphics";
import Image from "next/image";
import Graphic from "@/assets/smthmanidk.svg";
import { AuthForm } from "@/components/auth/auth-form";
import Link from "next/link";
import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";

type Props = {};

const Signin = async (props: Props) => {
  const session = await auth();

  if (session) return redirect("/playground");

  return (
    <div className="bg-black min-h-screen xl:max-h-screen md:overflow-y-hidden md:overflow-x-hidden flex text-white font-finlandica!">
      <AuthGraphics mode="login" />
      <div className="flex-60 relative">
        <Image
          loading="eager"
          src={Graphic}
          alt="graphic"
          width={1061}
          height={1061}
          className="absolute top-0 xl:-right-75.5 bottom-0 z-0"
          draggable={false}
        />

        <div className="md:px-20 space-y-3">
          <AuthForm mode="login" />
          <p className="pl-4 md:pl-0">
            Don't have an account?{" "}
            <Link href={"/signup"} className="text-blue-500 font-medium">
              Create one!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
