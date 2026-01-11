"use client";

import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { authSchema } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import GoogleIcon from "@/assets/google.svg";

type Props = {
  mode: "login" | "register";
};

type AuthFormValues = z.infer<typeof authSchema>;

export const AuthForm = ({ mode }: Props) => {
  const isLogin = mode === "login";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
  });

  const onSubmit = (data: AuthFormValues) => {
    if (isLogin) {
      const { email, password } = data;
      console.log("LOGIN", { email, password });
    } else {
      console.log("REGISTER", data);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-[130px] space-y-6 max-w-[800px] relative z-50"
    >
      <h1 className="text-[64px] font-bold">
        {isLogin ? "Sign in" : "Sign up"}
      </h1>

      <p className="text-[15px] md:text-[20px] opacity-75 -mt-5 mb-6">
        {isLogin
          ? "Log back in to continue working on your websites."
          : "Create an account to start making your websites today."}
      </p>

      {!isLogin && (
        <div className="flex items-center gap-x-10">
          <div>
            <Input
              placeholder="First name"
              label="First Name"
              {...register("firstName")}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div>
            <Input
              placeholder="Last name"
              label="Last Name"
              {...register("lastName")}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>
      )}

      <div>
        <Input placeholder="Email" label="Email" {...register("email")} />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <Input
          type="password"
          placeholder="Password"
          label="Password"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      <div className="flex items-center gap-x-8">
        <Button
          type="submit"
          variant={"default"}
          className="w-63.75 text-[22px] h-[56px] font-bold"
        >
          {isLogin ? "Sign in" : "Create your account"}
        </Button>
        <p className="text-[18px] font-bold text-center">OR</p>
        <Button
          className="hover:bg-black2 bg-[#171717] border border-[#262626] h-11.5 w-11.5 max-w-11.5"
          type="button"
        >
          <Image
            src={GoogleIcon}
            alt="google"
            width={26}
            height={26}
            className="min-w-6.5 h-6.5"
          />
        </Button>
      </div>
    </form>
  );
};
