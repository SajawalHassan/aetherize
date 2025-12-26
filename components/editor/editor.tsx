import { EditorHeader } from "./editor-header";

type Props = {
  playgroundMode: boolean;
};

export const Editor = (props: Props) => {
  return (
    <div className="min-h-screen bg-black text-white font-finlandica">
      <EditorHeader />
    </div>
  );
};
