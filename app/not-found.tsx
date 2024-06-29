import Link from "next/link";
import React from "react";

type Props = {};

export default function NotFound(props: Props) {
  return (
    <div className="pt-10 text-center text-white">
      <h1 className="text-4xl font-bold">404, Page not found</h1>
      <Link href={"/"} className="mt-10 text-blue-500 underline">
        Back home?
      </Link>
    </div>
  );
}
