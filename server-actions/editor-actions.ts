"use server";

import { EditorState } from "@/editor-store/editor-slice";
import { prisma } from "@/lib/prisma";

// Testing purposes...
export const saveEditorState = async (editorState: EditorState) => {
  return await prisma.$transaction(async (tx) => {
    // 1. Create editor
    const editor = await tx.editor.create({
      data: {},
    });

    // 2. Create elements
    const elementsData = editorState.elements.map((el) => ({
      id: el.id,
      name: el.name,
      type: el.type,
      styles: el.styles,
      canContain: el.canContain,
      relativeIdx: el.relativeIdx,
      parentId: el.parentId || null,
      editorId: editor.id,
    }));

    await tx.element.createMany({
      data: elementsData.map((e) => {
        return { ...e, styles: e.styles as any };
      }),
    });

    return editor;
  });
};
