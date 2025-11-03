import FroalaEditor from "froala-editor";

/**
 * Plugin definition interface for Froala custom commands
 */
export interface FroalaPlugin {
  /**
   * The command name (e.g., "insertInputField")
   */
  name: string;

  /**
   * Plugin configuration
   */
  config: {
    title: string;
    icon?: string;
    focus?: boolean;
    undo?: boolean;
    refreshAfterCallback?: boolean;
    [key: string]: any;
  };

  /**
   * Callback function that executes when the command is invoked
   * @param editor - The Froala editor instance
   */
  callback: (editor: any) => void;

  /**
   * Optional: Initialize function called when plugin is registered
   */
  initialize?: () => void;

  /**
   * Optional: Cleanup function called when plugin is unregistered
   */
  cleanup?: () => void;
}

// ============================================================================
// PLUGINS
// ============================================================================

let inputFieldCounter = 0;

/**
 * Plugin: Insert Input Field
 * Inserts a form input field into the editor
 */
const insertInputFieldPlugin: FroalaPlugin = {
  name: "insertInputField",
  config: {
    title: "Insert Input Field",
    icon: "insertImage",
    focus: true,
    undo: true,
    refreshAfterCallback: true,
  },
  callback: function (this: any) {
    const editor = this;


    editor.selection.save();


    const modal = createInputFieldModal((placeholder, fieldLabel) => {

      editor.selection.restore();

      
      inputFieldCounter++;
      const fieldName = `input${String(inputFieldCounter).padStart(2, "0")}`;
      const fieldId = `input-${Date.now()}-${Math.random()
        .toString(36)
        .substr(2, 9)}`;

      const inputHtml = `
        <input 
          type="text" 
          class="fr-input-control" 
          placeholder="${placeholder || ""}"
          data-input-type="text"
          data-field-id="${fieldId}"
          data-field-name="${fieldName}"
          data-label="${escapeHtml(fieldLabel || '')}"
          contenteditable="false"
          style="display: block; width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; margin: 12px 0; font-size: 14px; pointer-events: none; opacity: 0.7;"
        />
      `;

      editor.html.insert(inputHtml);
      modal.remove();
    });

    document.body.appendChild(modal);
  },
};

/**
 * Creates a modal for input field configuration
 */
function createInputFieldModal(
  onSubmit: (placeholder: string, fieldLabel: string) => void
): HTMLElement {
  const overlay = document.createElement("div");
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
  `;

  const modal = document.createElement("div");
  modal.style.cssText = `
    background: white;
    border-radius: 12px;
    padding: 24px;
    width: 90%;
    max-width: 500px;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  `;

  modal.innerHTML = `
    <h3 style="margin: 0 0 20px 0; font-size: 20px; color: #1e293b;">Insert Input Field</h3>
    
    <div style="margin-bottom: 16px;">
      <label style="display: block; margin-bottom: 8px; font-weight: 500; color: #334155;">Field Label (Optional)</label>
      <input 
        type="text"
        id="input-field-label" 
        placeholder="e.g., Full Name, Email Address..."
        style="width: 100%; padding: 10px; border: 1px solid #d1d5db; border-radius: 6px; font-family: inherit; font-size: 14px;"
      />
    </div>
    
    <div style="margin-bottom: 24px;">
      <label style="display: block; margin-bottom: 8px; font-weight: 500; color: #334155;">Placeholder Text (Optional)</label>
      <input 
        type="text"
        id="input-field-placeholder" 
        placeholder="e.g., Enter your name..."
        style="width: 100%; padding: 10px; border: 1px solid #d1d5db; border-radius: 6px; font-family: inherit; font-size: 14px;"
      />
    </div>
    
    <div style="display: flex; gap: 12px; justify-content: flex-end;">
      <button 
        id="input-field-cancel"
        style="padding: 8px 16px; border: 1px solid #d1d5db; border-radius: 6px; background: white; cursor: pointer; font-size: 14px;"
      >
        Cancel
      </button>
      <button 
        id="input-field-submit"
        style="padding: 8px 16px; border: none; border-radius: 6px; background: #3b82f6; color: white; cursor: pointer; font-size: 14px; font-weight: 500;"
      >
        Insert Field
      </button>
    </div>
  `;

  overlay.appendChild(modal);

  // Event handlers
  const labelInput = modal.querySelector("#input-field-label") as HTMLInputElement;
  const placeholderInput = modal.querySelector("#input-field-placeholder") as HTMLInputElement;
  const submitBtn = modal.querySelector("#input-field-submit") as HTMLButtonElement;
  const cancelBtn = modal.querySelector("#input-field-cancel") as HTMLButtonElement;

  submitBtn.addEventListener("click", () => {
    onSubmit(placeholderInput.value, labelInput.value);
  });

  cancelBtn.addEventListener("click", () => {
    overlay.remove();
  });

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      overlay.remove();
    }
  });

  // Focus the first input
  setTimeout(() => labelInput.focus(), 100);

  return overlay;
}

let flashcardCounter = 0;

const insertFlashcardPlugin: FroalaPlugin = {
  name: "insertFlashcard",
  config: {
    title: "Insert Flashcard",
    icon: "insertImage",
    focus: true,
    undo: true,
    refreshAfterCallback: true,
  },
  callback: function (this: any) {
    const editor = this;

    const modal = createFlashcardModal((question, answer) => {
      if (!question.trim() || !answer.trim()) {
        alert("Both question and answer are required");
        return;
      }

      flashcardCounter++;
      const flashcardId = `flashcard-${Date.now()}-${Math.random()
        .toString(36)
        .substr(2, 9)}`;

      const flashcardHtml = `
        <div 
          class="fr-flashcard-block" 
          data-flashcard-id="${flashcardId}"
          data-flashcard-number="${flashcardCounter}"
          contenteditable="false"
          style="border: 2px solid #3b82f6; border-radius: 8px; padding: 16px; margin: 16px 0; background: #f8fafc; pointer-events: none;"
        >
          <div style="font-weight: 600; color: #3b82f6; margin-bottom: 12px; font-size: 12px; text-transform: uppercase;">
            Flashcard ${flashcardCounter}
          </div>
          <div 
            class="fr-flashcard-question" 
            data-question="${escapeHtml(question)}"
            style="margin-bottom: 12px;"
          >
            <strong style="color: #1e293b;">Q:</strong> ${question}
          </div>
          <div 
            class="fr-flashcard-answer" 
            data-answer="${escapeHtml(answer)}"
            style="border-top: 1px solid #cbd5e1; padding-top: 12px; color: #475569;"
          >
            <strong style="color: #1e293b;">A:</strong> ${answer}
          </div>
        </div>
      `;

      editor.html.insert(flashcardHtml);
      modal.remove();
    });

    document.body.appendChild(modal);
  },
};

/**
 * Creates a modal for flashcard authoring
 */
function createFlashcardModal(
  onSubmit: (question: string, answer: string) => void
): HTMLElement {
  const overlay = document.createElement("div");
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
  `;

  const modal = document.createElement("div");
  modal.style.cssText = `
    background: white;
    border-radius: 12px;
    padding: 24px;
    width: 90%;
    max-width: 600px;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  `;

  modal.innerHTML = `
    <h3 style="margin: 0 0 20px 0; font-size: 20px; color: #1e293b;">Create Flashcard</h3>
    
    <div style="margin-bottom: 16px;">
      <label style="display: block; margin-bottom: 8px; font-weight: 500; color: #334155;">Question</label>
      <textarea 
        id="flashcard-question" 
        rows="3"
        placeholder="Enter the question or prompt..."
        style="width: 100%; padding: 10px; border: 1px solid #d1d5db; border-radius: 6px; font-family: inherit; font-size: 14px; resize: vertical;"
      ></textarea>
    </div>
    
    <div style="margin-bottom: 24px;">
      <label style="display: block; margin-bottom: 8px; font-weight: 500; color: #334155;">Answer</label>
      <textarea 
        id="flashcard-answer" 
        rows="4"
        placeholder="Enter the answer..."
        style="width: 100%; padding: 10px; border: 1px solid #d1d5db; border-radius: 6px; font-family: inherit; font-size: 14px; resize: vertical;"
      ></textarea>
    </div>
    
    <div style="display: flex; gap: 12px; justify-content: flex-end;">
      <button 
        id="flashcard-cancel"
        style="padding: 8px 16px; border: 1px solid #d1d5db; border-radius: 6px; background: white; cursor: pointer; font-size: 14px;"
      >
        Cancel
      </button>
      <button 
        id="flashcard-submit"
        style="padding: 8px 16px; border: none; border-radius: 6px; background: #3b82f6; color: white; cursor: pointer; font-size: 14px; font-weight: 500;"
      >
        Insert Flashcard
      </button>
    </div>
  `;

  overlay.appendChild(modal);

  // Event handlers
  const questionInput = modal.querySelector("#flashcard-question") as HTMLTextAreaElement;
  const answerInput = modal.querySelector("#flashcard-answer") as HTMLTextAreaElement;
  const submitBtn = modal.querySelector("#flashcard-submit") as HTMLButtonElement;
  const cancelBtn = modal.querySelector("#flashcard-cancel") as HTMLButtonElement;

  submitBtn.addEventListener("click", () => {
    onSubmit(questionInput.value, answerInput.value);
  });

  cancelBtn.addEventListener("click", () => {
    overlay.remove();
  });

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      overlay.remove();
    }
  });

  return overlay;
}

/**
 * Escape HTML to prevent XSS and preserve data in attributes
 */
function escapeHtml(text: string): string {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// ============================================================================
// REGISTRY
// ============================================================================

/**
 * Registry of all Froala custom plugins
 * To add a new plugin:
 * 2. Add it to this array
 * 3. (Optional) Add the plugin name to toolbarButtons in useFroalaConfig.ts
 */
const plugins: FroalaPlugin[] = [
  insertInputFieldPlugin,
  insertFlashcardPlugin
  // Add more plugins here:
  // insertTextBlockPlugin,
];

/**
 * Register all plugins with FroalaEditor
 */
export const registerFroalaPlugins = (): void => {
  plugins.forEach((plugin) => {
    const { name, config, callback } = plugin;

    // Call initialize if provided
    if (plugin.initialize) {
      plugin.initialize();
    }

    // Register the command with Froala
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

/**
 * Get all registered plugin names
 */
export const getRegisteredPluginNames = (): string[] => {
  return plugins.map((p) => p.name);
};