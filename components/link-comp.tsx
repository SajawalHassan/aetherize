import { cn } from "@/lib/utils";
import Link from "next/link";

interface Props {
  text: string;
  href: string;
  className?: string;
}

export const LinkComp = (props: Props) => {
  return (
    <Link
      href={props.href}
      className={cn("text-[15px] sm:text-[18px]  text-white/75 hover:text-white", props.className)}
      prefetch={true}>
      {props.text}
    </Link>
  );
};
