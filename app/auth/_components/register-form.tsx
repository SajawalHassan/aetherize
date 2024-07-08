"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { registerUserQuery } from "@/queries/auth-queries";
import { registerSchema } from "@/schemas/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { AuthSubmit } from "./auth-submit";

type Props = {};

export const RegisterForm = (props: Props) => {
  const [serverError, setServerError] = useState("");
  const [isPending, setTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(true);

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  const onSubmit = (data: z.infer<typeof registerSchema>) => {
    setTransition(async () => {
      const { error } = await registerUserQuery(data);
      if (error) setServerError(error);
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <>
                    <FormLabel className="text-muted-foreground">
                      Username
                    </FormLabel>
                    <Input
                      {...field}
                      placeholder="Username"
                      className="!mt-1"
                      name="name"
                      type="text"
                    />
                  </>
                </FormControl>
                <FormMessage className="!mt-1" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <>
                    <FormLabel className="text-muted-foreground">
                      Email
                    </FormLabel>
                    <Input
                      {...field}
                      placeholder="Email"
                      className="!mt-1"
                      type="email"
                      name="Email"
                    />
                  </>
                </FormControl>
                <FormMessage className="!mt-1" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <>
                    <FormLabel className="text-muted-foreground">
                      Password
                    </FormLabel>
                    <div className="flex items-center justify-between rounded-md border border-white/10 bg-background px-3">
                      <Input
                        {...field}
                        placeholder="Password"
                        type={showPassword ? "password" : "text"}
                        name="Password"
                        className="border-none bg-transparent px-0"
                      />
                      {showPassword ? (
                        <EyeIcon
                          className="cursor-pointer"
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      ) : (
                        <EyeOffIcon
                          className="cursor-pointer"
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      )}
                    </div>
                  </>
                </FormControl>
                <FormMessage className="!mt-1" />
              </FormItem>
            )}
          />
        </div>

        {serverError && (
          <div className="mt-4 flex h-[50px] w-full items-center justify-center rounded-md border-2 border-black bg-red-600">
            <p className="font-bold">{serverError}</p>
          </div>
        )}

        <AuthSubmit isPending={isPending} btnText="Register" />
      </form>
    </Form>
  );
};
