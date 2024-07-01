import { auth } from "@/next-auth/auth";

type Props = {};

export default async function Page({}: Props) {
  const session = await auth();

  return <div className="text-white">{JSON.stringify(session)}</div>;
}
