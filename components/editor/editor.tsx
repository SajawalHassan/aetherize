"use client";

import { EditorStoreProvider } from "@/providers/editor-store-provider";
import { EditorHeader } from "./header/editor-header";
import { useEffect, useState } from "react";

interface Props {}

export const Editor = (props: Props) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return;

  return (
    <EditorStoreProvider>
      <main>
        <article className="bg-gradient-to-br from-th-accent/25 to-th-primary/25 min-h-screen px-[16px] py-[8px]">
          <EditorHeader />
        </article>
      </main>
    </EditorStoreProvider>
  );
};
