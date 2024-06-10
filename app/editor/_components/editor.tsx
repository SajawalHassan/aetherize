"use client";

import { EditorNav } from "./nav/editor-nav";

type Props = {};

export const Editor = (props: Props) => {
  return (
    <div className="min-h-screen bg-th-bg text-th-text">
      <EditorNav />
    </div>
  );
};
