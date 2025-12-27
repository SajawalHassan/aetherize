import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {};

export const CTA = (props: Props) => {
  return (
    <div className="w-full relative h-full mt-50 lg:mt-120">
      {/* Background blur color */}
      <div className="relative w-500 -ml-250 rounded-full min-h-180 h-full">
        <div className="absolute inset-0 bg-primary rounded-full filter blur-[300px] opacity-40"></div>
      </div>

      <div className="absolute inset-0 m-auto h-max w-full">
        <h1 className="font-bold text-[40px] text-center leading-tight mb-2">
          Still Not Convincing Enough?
        </h1>
        <p className="text-[16px] leading-tight text-center opacity-75">
          Not convinced yet? Go to our playground to explore the editor
          yourself, no sign-up, nothing. Play around and you decide.
        </p>

        <div className="flex items-center gap-x-4 w-max mx-auto mt-5">
          <Link href={"/playground"}>
            <Button variant={"special"}>Go to Playground</Button>
          </Link>
          <Button variant={"secondary"}>Create an Account</Button>
        </div>
      </div>
    </div>
  );
};
