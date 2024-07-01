"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { loginSchema } from "@/schemas/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState, useTransition } from "react";
import { AuthSubmit } from "./auth-submit";
import { loginCredQuery } from "@/queries/auth/auth-queries";

type Props = {};

export const LoginForm = (props: Props) => {
  const [serverError, setServerError] = useState("");
  const [isPending, setTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(true);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    setTransition(async () => {
      const { error } = await loginCredQuery(data);
      if (error) setServerError(error);
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="space-y-2">
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

        <AuthSubmit isPending={isPending} btnText="Login" />
      </form>
    </Form>
  );
};
