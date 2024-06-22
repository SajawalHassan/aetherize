import Link from "next/link";

export default function Home() {
  return (
    <>
      <Link href="/editor" prefetch className="text-blue-500 underline">
        Go to editor
      </Link>
    </>
  );
}
