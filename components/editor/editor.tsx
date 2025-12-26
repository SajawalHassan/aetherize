import { EditorHeader } from "./editor-header";
import { Sidebar } from "./sidebar/sidebar";

type Props = {
  playgroundMode: boolean;
};

export const Editor = (props: Props) => {
  return (
    <div className="min-h-screen bg-black text-white font-finlandica">
      <EditorHeader />
      <Sidebar />
    </div>
  );
};
