import Link from "next/link";
import { AuthCardWrapper } from "../_components/auth-card-wrapper";
import { RegisterForm } from "../_components/register-form";

type Props = {};

export default async function Page(props: Props) {
  return (
    <AuthCardWrapper heading="Register">
      <RegisterForm />
      <p className="mt-3 text-center">
        Already have an account?{" "}
        <Link className="text-blue-500 hover:underline" href={"/auth/login"}>
          Login here
        </Link>
      </p>
    </AuthCardWrapper>
  );
}
