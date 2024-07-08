import Link from "next/link";

export default function Home() {
  return (
    <>
      <Link href="/playground" prefetch className="text-blue-500 underline">
        Go to playground
      </Link>
    </>
  );
}
