import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";
import React from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

type Props = {
  isPending: boolean;
  btnText: string;
};

export const AuthSubmit = (props: Props) => {
  return (
    <div className="mt-4">
      <Button
        className="w-full text-lg font-bold"
        type="submit"
        disabled={props.isPending}
      >
        {props.isPending ? (
          <Loader2 className="h-6 w-6 animate-spin" />
        ) : (
          props.btnText
        )}
      </Button>
      <div className="relative top-1 mt-4">
        <Separator
          orientation="horizontal"
          className="absolute inset-0 m-auto w-full"
        />
        <p className="absolute inset-0 -top-3 m-auto w-max bg-[#171717] p-1 text-xs uppercase text-muted-foreground">
          or
        </p>
      </div>
      <div className="mt-9 flex items-center gap-x-2">
        <Button
          className="flex-grow rounded-md border border-none bg-th-btn"
          type="button"
        >
          <FcGoogle size={20} />
        </Button>

        <Button
          className="flex-grow rounded-md border border-none bg-th-btn"
          type="button"
        >
          <FaGithub size={20} />
        </Button>
      </div>
    </div>
  );
};
