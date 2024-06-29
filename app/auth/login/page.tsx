import Link from "next/link";
import { AuthCardWrapper } from "../_components/auth-card-wrapper";
import { LoginForm } from "../_components/login-form";

type Props = {};

export default async function Page(props: Props) {
  return (
    <AuthCardWrapper heading="Login">
      <LoginForm />
      <p className="mt-3 text-center">
        Don't have an account?{" "}
        <Link className="text-blue-500 hover:underline" href={"/auth/register"}>
          Register here
        </Link>
      </p>
    </AuthCardWrapper>
  );
}
