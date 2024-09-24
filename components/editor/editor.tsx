"use client";

import { EditorStoreProvider } from "@/providers/editor-store-provider";
import { EditorHeader } from "./editor-header";
import { useEffect, useState } from "react";
import { EditorSidebar } from "./editor-sidebar";
import { EditorWebsite } from "./editor-website";

interface Props {}

export const Editor = (props: Props) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return;

  return (
    <EditorStoreProvider>
      <div className="bg-gradient-to-br from-th-accent/25 to-th-primary/25 min-h-screen px-[16px] py-[8px]">
        <EditorHeader />
        <main>
          <article className="flex items-start justify-end flex-row-reverse gap-x-[28px] mt-[25px] h-[calc(100vh_-_120px)]">
            <EditorSidebar />
            <EditorWebsite />
          </article>
        </main>
      </div>
    </EditorStoreProvider>
  );
};
