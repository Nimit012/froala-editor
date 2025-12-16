import FlashcardForm from "./Form.vue";
import { generateFlashcardHtml, type FlashcardDeckData } from "./Template";
import { openModal } from "~/utils/modal";

let flashcardCounter = 0;

export async function handleInsertFlashcard(editor: any) {
  editor.selection.save();

  const result = await openModal<FlashcardDeckData>(FlashcardForm, {
    uploadEndpoint: "/api/upload-image",
  });

  if (!result.confirmed || !result.data) {
    editor.selection.restore();
    return;
  }

  editor.selection.restore();

  flashcardCounter++;
  const html = generateFlashcardHtml(result.data);

  editor.html.insert(html);
}
