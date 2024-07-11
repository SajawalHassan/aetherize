import { Editor } from "@/components/editor";
import { db } from "@/lib/db";
import EditorStoreProvider from "@/providers/editor-store-provider";
import { redirect } from "next/navigation";

type Props = {
  params: {
    editorId: string;
    realmId: string;
  };
};

export default async function Page({ params }: Props) {
  const realmPage = await db.realmPage.findUnique({
    where: {
      id: params.editorId,
    },
  });

  if (!realmPage) return redirect(`/realm/${params.realmId}`);

  return (
    <EditorStoreProvider editor={JSON.parse(realmPage.content)}>
      <Editor />
    </EditorStoreProvider>
  );
}
