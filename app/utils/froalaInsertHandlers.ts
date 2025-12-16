import InputFieldForm from "~/components/plugin/InputField/Form.vue";
import FlashcardForm from "~/components/plugin/Flashcard/Form.vue";
import { openModal } from "./modal";
import { generateInputFieldHtml } from "~/components/plugin/InputField/Template";
import {
  generateFlashcardHtml,
  type FlashcardDeckData,
} from "~/components/plugin/Flashcard/Template";

/**
 * Shape of the data emitted by the input-field modal component.
 * Mirrors the props that ultimately become data-* attributes in the HTML.
 */
export interface InputFieldModalData {
  placeholder: string;
  inputType: "single" | "multi";
  singleLineType?: string;
  minRows?: number;
  maxRows?: number;
  maxWords?: number;
  enableFormatting?: boolean;
  allowImageUpload?: boolean;
  spellCheck?: boolean;
  disablePaste?: boolean;
}

// Keep simple incrementing counters so generated field IDs/names remain unique per session.
let inputFieldCounter = 0;
let flashcardCounter = 0;

/**
 * Launches the InputField modal, converts the response into HTML, and injects it at the cursor.
 */
export async function handleInsertInputField(editor: any) {
  editor.selection.save();

  const result = await openModal<InputFieldModalData>(InputFieldForm);

  if (!result.confirmed || !result.data) {
    editor.selection.restore();
    return;
  }

  editor.selection.restore();

  inputFieldCounter++;
  const fieldName = `input${String(inputFieldCounter).padStart(2, "0")}`;
  const fieldId = `input-${Date.now()}-${Math.random()
    .toString(36)
    .substr(2, 9)}`;

  const defaultPlaceholder = `Response ${inputFieldCounter}`;
  const html = generateInputFieldHtml({
    placeholder: result.data.placeholder || defaultPlaceholder,
    inputType: result.data.inputType,
    singleLineType: result.data.singleLineType,
    minRows: result.data.minRows,
    maxRows: result.data.maxRows,
    maxWords: result.data.maxWords,
    enableFormatting: result.data.enableFormatting,
    allowImageUpload: result.data.allowImageUpload,
    spellCheck: result.data.spellCheck,
    disablePaste: result.data.disablePaste,
    fieldName,
    fieldId,
  });

  const wrappedHtml = `
    <div class="froala-component-block" data-block-id="${fieldId}" style="position: relative; margin: 10px 0; padding: 5px; transition: all 0.2s;">
      <style>
        .froala-component-block:hover {
          border-color: #ccc !important;
        }
        .froala-component-block:hover .froala-block-delete-btn {
          display: flex !important;
        }
      </style>
      <div class="froala-block-delete-btn" onclick="deleteBlock('${fieldId}')" contenteditable="false" style="
        position: absolute; 
        top: -12px; 
        right: -12px; 
        width: 24px; 
        height: 24px; 
        color: black; 
        border-radius: 50%; 
        padding: 2px;
        display: none; 
        align-items: center; 
        justify-content: center; 
        cursor: pointer; 
        z-index: 10; 
        font-size: 16px; 
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        user-select: none;
      ">
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
<path d="M 20 2 C 18.35503 2 17 3.3550302 17 5 L 17 7 L 4 7 A 1.0001 1.0001 0 1 0 4 9 L 17.832031 9 A 1.0001 1.0001 0 0 0 18.158203 9 L 29.832031 9 A 1.0001 1.0001 0 0 0 30.158203 9 L 44 9 A 1.0001 1.0001 0 1 0 44 7 L 31 7 L 31 5 C 31 3.3550302 29.64497 2 28 2 L 20 2 z M 20 4 L 28 4 C 28.56503 4 29 4.4349698 29 5 L 29 7 L 19 7 L 19 5 C 19 4.4349698 19.43497 4 20 4 z M 6.9804688 10.986328 A 1.0001 1.0001 0 0 0 5.9941406 12.09375 L 8.6640625 40.462891 C 8.900709 43.030242 11.061274 45 13.640625 45 L 34.359375 45 C 36.938726 45 39.099291 43.030242 39.335938 40.462891 L 39.335938 40.460938 L 42.005859 12.09375 A 1.0004955 1.0004955 0 1 0 40.013672 11.90625 L 37.34375 40.275391 A 1.0001 1.0001 0 0 0 37.34375 40.279297 C 37.199488 41.851004 35.939375 43 34.359375 43 L 13.640625 43 C 12.060625 43 10.800512 41.850998 10.65625 40.279297 A 1.0001 1.0001 0 0 0 10.65625 40.275391 L 7.9863281 11.90625 A 1.0001 1.0001 0 0 0 6.9804688 10.986328 z"></path>
</svg>
      </div>
      ${html}
    </div>
  `;

  editor.html.insert(wrappedHtml);
}

/**
 * Opens the design-block picker component and inserts the chosen markup verbatim.
 */
export async function handleInsertDesignBlocks(editor: any) {
  editor.selection.save();

  const DesignBlocksSelector = (
    await import("~/components/plugin/DesignBlocks/DesignBlocksSelector.vue")
  ).default;

  const result = await openModal<string>(DesignBlocksSelector);

  if (!result.confirmed || !result.data) {
    editor.selection.restore();
    return;
  }

  editor.selection.restore();
  editor.html.insert(result.data);
}

/**
 * Creates a flashcard deck from modal data and injects the rendered template.
 */
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
