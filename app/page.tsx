import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link className="rounded-sm bg-gray-200 p-2" href="/editor">
        Go to editor
      </Link>
    </div>
  );
}
