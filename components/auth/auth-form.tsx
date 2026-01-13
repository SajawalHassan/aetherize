"use client";

import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { authSchema } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import GoogleIcon from "@/assets/google.svg";
import {
  createUser,
  loginWithCreds,
  logInWithGoogle,
} from "@/server-actions/auth-actions";
import { UserRegisterResponse } from "@/lib/constants";
import { useState } from "react";
import { Loader2Icon } from "lucide-react";

type Props = {
  mode: "login" | "register";
};

type AuthFormValues = z.infer<typeof authSchema>;

export const AuthForm = ({ mode }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isLogin = mode === "login";

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
  });

  const handleRegister = async (data: AuthFormValues) => {
    setIsSubmitting(true);
    try {
      await createUser(data);
    } catch (error: any) {
      switch (error.message) {
        case UserRegisterResponse.ERR_EMAIL:
          return setError("root", {
            message: "User with that E-mail already exists.",
          });

        case UserRegisterResponse.ERR_MISSINGFIELD:
          return setError("root", {
            message: "Some field was not properly filled out.",
          });

        case UserRegisterResponse.ERROR:
          return setError("root", {
            message: "An unexpected error occured, please try again later.",
          });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmit = async (data: AuthFormValues) => {
    if (isLogin) {
      await loginWithCreds(data.email, data.password);
    } else {
      await handleRegister(data);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-32.5 space-y-6 max-w-200 relative z-50"
    >
      <h1 className="text-[64px] font-bold pl-4 md:pl-0">
        {isLogin ? "Sign in" : "Sign up"}
      </h1>

      <p className="text-[15px] md:text-[20px] opacity-75 -mt-5 mb-6 pl-4 md:pl-0">
        {isLogin
          ? "Log back in to continue working on your websites."
          : "Create an account to start making your websites today."}
      </p>

      {!isLogin && (
        <div className="flex flex-col md:flex-row md:items-center gap-x-10 gap-y-6 px-4 md:px-0!">
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

      <div className="px-4 md:px-0!">
        <Input
          placeholder="Email"
          label="Email"
          type="email"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div className="px-4 md:px-0!">
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

      <div className="space-y-3.5">
        {errors.root && (
          <p className="px-4 py-2 rounded-sm w-max bg-red-400/20 font-medium border border-red-400 text-center">
            {errors.root.message}
          </p>
        )}
        <div className="flex items-center gap-x-8 px-4 md:px-0">
          <Button
            type="submit"
            variant={"default"}
            className="w-max md:w-63.75 text-[22px] h-14 font-bold"
          >
            {isSubmitting ? (
              <Loader2Icon className="w-7! h-7! animate-spin" />
            ) : isLogin ? (
              "Sign in"
            ) : (
              "Create your account"
            )}
          </Button>
          <p className="text-[18px] font-bold text-center">OR</p>
          <Button
            className="hover:bg-black2 bg-[#171717] border border-[#262626] h-11.5 w-11.5 max-w-11.5"
            type="button"
            onClick={(_) => logInWithGoogle()}
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
      </div>
    </form>
  );
};
