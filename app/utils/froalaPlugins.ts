import FroalaEditor from "froala-editor";
import InputFieldForm from "~/components/plugin/InputField/Form.vue";
import FlashcardForm from "~/components/plugin/Flashcard/Form.vue";
import { openModal } from "../utils/modal";
import { generateInputFieldHtml } from "~/components/plugin/InputField/Template";
import {
  generateFlashcardHtml,
  type FlashcardDeckData,
} from "~/components/plugin/Flashcard/Template";

/**
 * Plugin definition interface for Froala custom commands
 */
export interface FroalaPlugin {
  name: string;
  config: {
    title: string;
    icon?: string;
    focus?: boolean;
    undo?: boolean;
    refreshAfterCallback?: boolean;
    [key: string]: any;
  };
  callback: (this: any, ...args: any[]) => void | Promise<void>;
  initialize?: () => void;
  cleanup?: () => void;
}

// ============================================================================
// HELPER FUNCTIONS FOR FLASHCARD EDITING
// ============================================================================

export async function editFlashcardDeck(deckId: string) {
  try {
    const deckElement = document.querySelector(`[data-deck-id="${deckId}"]`);

    if (!deckElement) {
      console.error("Deck not found:", deckId);
      return;
    }

    const serializedData = deckElement.getAttribute("data-deck-data");
    if (!serializedData) {
      console.error("Deck data not found");
      return;
    }

    const existingData: FlashcardDeckData = JSON.parse(
      decodeURIComponent(atob(serializedData))
    );

    const result = await openModal<FlashcardDeckData>(FlashcardForm, {
      existingData,
      uploadEndpoint: "/api/upload-image",
    });

    if (!result.confirmed || !result.data) return;

    const newHtml = generateFlashcardHtml(result.data);
    deckElement.outerHTML = newHtml;
  } catch (error) {
    console.error("Error editing flashcard:", error);
    alert("Failed to edit flashcard. Please try again.");
  }
}

export function deleteFlashcardDeck(deckId: string) {
  try {
    const deckElement = document.querySelector(`[data-deck-id="${deckId}"]`);
    if (deckElement) {
      deckElement.remove();
    }
  } catch (error) {
    console.error("Error deleting flashcard:", error);
    alert("Failed to delete flashcard. Please try again.");
  }
}

// export function deleteInputField(fieldId: string) {
//   try {
//     const fieldElement = document.querySelector(`[data-field-id="${fieldId}"]`)
//     if (fieldElement) {
//       fieldElement.remove()
//     }
//   } catch (error) {
//     console.error('Error deleting input field:', error)
//     alert('Failed to delete input field. Please try again.')
//   }
// }

// Make globally available
if (typeof window !== "undefined") {
  (window as any).editFlashcardDeck = editFlashcardDeck;
  (window as any).deleteFlashcardDeck = deleteFlashcardDeck;
  // (window as any).deleteInputField = deleteInputField;
}

// ============================================================================
// ACTION HANDLERS (Not plugins, just functions)
// ============================================================================

let inputFieldCounter = 0;
let flashcardCounter = 0;

async function handleInsertInputField(editor: any) {
  editor.selection.save();

  const result = await openModal<{
    placeholder: string;
    inputType: "single" | "multi";
    singleLineType?: string;
    minRows?: number;
    maxRows?: number;
    maxWords?: number;
    enableFormatting?: boolean;
    allowImageUpload?: boolean;
    spellChecker?: boolean;
    disablePaste?: boolean;
  }>(InputFieldForm);

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
    spellChecker: result.data.spellChecker,
    disablePaste: result.data.disablePaste,
    fieldName,
    fieldId,
  });

  editor.html.insert(html);
}

async function handleInsertFlashcard(editor: any) {
  editor.selection.save();

  const result = await openModal<FlashcardDeckData>(FlashcardForm, {
    // Changed this line
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

// ============================================================================
// PLUGIN - Single Dropdown
// ============================================================================

// // Simple Design Block Plugin
// FroalaEditor.DefineIcon("designBlockIcon", {
//   NAME: "th-large", // Using a built-in icon
// });

// const simpleDesignBlockPlugin: FroalaPlugin = {
//   name: "insertSimpleBlock",
//   config: {
//     title: "Insert Header Block",
//     icon: "gradpathIcon",
//     focus: true,
//     undo: true,
//     refreshAfterCallback: true,
//   },
//   callback: function () {
//     const editor = this;

//     // This is a simple Froala Design Block HTML
//     const blockHtml = `
// <section class="fdb-block" style="padding: 100px 0; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
//   <div class="container">
//     <div class="row text-center">
//       <div class="col-12">
//         <h1 style="color: white; font-size: 48px; margin-bottom: 20px;">Welcome to Our Website</h1>
//         <p class="lead" style="color: rgba(255,255,255,0.9); font-size: 24px;">Edit this text to make it your own</p>
//         <p style="margin-top: 30px;">
//           <a class="btn btn-primary btn-lg" href="#" style="padding: 15px 40px; font-size: 18px;">Get Started</a>
//         </p>
//       </div>
//     </div>
//   </div>
// </section>
//     `;

//     // Insert it at cursor position
//     editor.html.insert(blockHtml);
//   },
// };

FroalaEditor.DefineIcon("gradpathIcon", {
  template: "text",
  NAME: '<span style="font-size:13px; font-weight:500;">GRADPATH CAPABILITIES</span>',
});

const insertComponentsDropdownPlugin: FroalaPlugin = {
  name: "insertComponentsDropdown",
  config: {
    title: "Gradpath Capabilities",
    icon: "gradpathIcon",
    type: "dropdown",
    focus: false,
    undo: false,
    refreshAfterCallback: false,
    options: {
      assessmentInputBox: "Assessment Input Box",
      insertFlashcard: "Insert Flashcard",
      insertGraph: "Insert Graph",
      insertEquation: "Insert Equation",
    },
  },
  callback: async function (this: any, _cmd: string, val: string) {
    const editor = this;
    console.log("Froala license key:", FroalaEditor.LICENSE_KEY);

    if (val === "assessmentInputBox") {
      await handleInsertInputField(editor);
    } else if (val === "insertFlashcard") {
      await handleInsertFlashcard(editor);
    }
  },
};

// ============================================================================
// REGISTRY
// ============================================================================

const plugins: FroalaPlugin[] = [insertComponentsDropdownPlugin];

/**
 * Register all plugins with FroalaEditor
 */
export const registerFroalaPlugins = (): void => {
  plugins.forEach((plugin) => {
    const { name, config, callback } = plugin;

    if (plugin.initialize) {
      plugin.initialize();
    }

    FroalaEditor.RegisterCommand(name, {
      ...config,
      callback: callback,
    });

    console.log(`Registered Froala plugin: ${name}`);
  });
};

/**
 * Unregister all plugins (cleanup)
 */
export const unregisterFroalaPlugins = (): void => {
  plugins.forEach((plugin) => {
    if (plugin.cleanup) {
      plugin.cleanup();
    }
  });
};
