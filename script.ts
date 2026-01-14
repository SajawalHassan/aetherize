// TO TEST PRISMA QUERIES.

import { EditorState } from "./editor-store/editor-slice";
import { BODY_TAG_ID } from "./lib/constants";
import { prisma } from "./lib/prisma";
import { saveEditorState } from "./server-actions/editor-actions";

async function main() {
  const initialState: EditorState = {
    elements: [
      {
        id: BODY_TAG_ID,
        name: "Body",
        styles: {},
        type: "body",
        parentId: "",
        canContain: true,
        relativeIdx: 0,
      },
    ],
    selectedElementId: BODY_TAG_ID,
  };

  const newEditorState = await saveEditorState(initialState);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
