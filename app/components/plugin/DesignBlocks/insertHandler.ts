import { openModal } from "~/utils/modal";

export async function handleInsertDesignBlocks(editor: any) {
  editor.selection.save();

  const DesignBlocksSelector = (await import("./DesignBlocksSelector.vue"))
    .default;

  const result = await openModal<string>(DesignBlocksSelector);

  if (!result.confirmed || !result.data) {
    editor.selection.restore();
    return;
  }

  editor.selection.restore();
  editor.html.insert(result.data);
}
