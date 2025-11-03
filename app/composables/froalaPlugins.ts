import FroalaEditor from "froala-editor"
import { useFroalaModals } from "~/composables/useFroalaModals"
import InputFieldModal from "~/components/editor/InputField/Modal.vue"
import FlashcardModal from "~/components/editor/Flashcard/Modal.vue"
import { generateInputFieldHtml } from "~/components/editor/InputField/Template"
import { generateFlashcardHtml } from "~/components/editor/Flashcard/Template"

/**
 * Plugin definition interface for Froala custom commands
 */
export interface FroalaPlugin {
  /**
   * The command name (e.g., "insertInputField")
   */
  name: string

  /**
   * Plugin configuration
   */
  config: {
    title: string
    icon?: string
    focus?: boolean
    undo?: boolean
    refreshAfterCallback?: boolean
    [key: string]: any
  }

  /**
   * Callback function that executes when the command is invoked
   * @param editor - The Froala editor instance
   */
  callback: (editor: any) => void

  /**
   * Optional: Initialize function called when plugin is registered
   */
  initialize?: () => void

  /**
   * Optional: Cleanup function called when plugin is unregistered
   */
  cleanup?: () => void
}

// ============================================================================
// PLUGINS
// ============================================================================

let inputFieldCounter = 0

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
  callback: async function (this: any) {
    const editor = this
    editor.selection.save()

    const { openModal } = useFroalaModals()
    const result = await openModal<{ placeholder: string; fieldLabel: string }>(
      InputFieldModal
    )

    if (!result.confirmed || !result.data) {
      editor.selection.restore()
      return
    }

    editor.selection.restore()

    inputFieldCounter++
    const fieldName = `input${String(inputFieldCounter).padStart(2, "0")}`
    const fieldId = `input-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)}`

    const html = generateInputFieldHtml({
      placeholder: result.data.placeholder,
      fieldLabel: result.data.fieldLabel,
      fieldName,
      fieldId
    })

    editor.html.insert(html)
  },
}

let flashcardCounter = 0

/**
 * Plugin: Insert Flashcard
 * Inserts a flashcard into the editor
 */
const insertFlashcardPlugin: FroalaPlugin = {
  name: "insertFlashcard",
  config: {
    title: "Insert Flashcard",
    icon: "insertImage",
    focus: true,
    undo: true,
    refreshAfterCallback: true,
  },
  callback: async function (this: any) {
    const editor = this
    editor.selection.save()

    const { openModal } = useFroalaModals()
    const result = await openModal<{ question: string; answer: string }>(
      FlashcardModal
    )

    if (!result.confirmed || !result.data) {
      editor.selection.restore()
      return
    }

    editor.selection.restore()

    flashcardCounter++
    const flashcardId = `flashcard-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)}`

    const html = generateFlashcardHtml({
      question: result.data.question,
      answer: result.data.answer,
      flashcardNumber: flashcardCounter,
      flashcardId
    })

    editor.html.insert(html)
  },
}

/**
 * Plugin: Insert Components Dropdown
 * Provides a dropdown menu for inserting Input Fields or Flashcards
 */
/**
 * Plugin: Insert Components Dropdown
 * Dropdown to insert Input Field or Flashcard
 */

FroalaEditor.DefineIcon("edit", { NAME: "edit", SVG_KEY: "edit" })

const insertComponentsDropdownPlugin: FroalaPlugin = {
  name: "insertComponentsDropdown",
  config: {
    title: "Insert",
    icon: '<span style="font-size:16px; font-weight:500;">GRADPATH CAPABILITIES</span>',
    type: "dropdown",
    focus: false,
    undo: false,
    refreshAfterCallback: false,
    options: {
      insertInputField: "Insert Input Field",
      insertFlashcard: "Insert Flashcard",
    },
  },
  callback: function (this: any, _cmd: string, val: string) {
    const editor = this

    if (val === "insertInputField") {
      const plugin = plugins.find((p) => p.name === "insertInputField")
      plugin?.callback?.call(editor, editor)
    } else if (val === "insertFlashcard") {
      const plugin = plugins.find((p) => p.name === "insertFlashcard")
      plugin?.callback?.call(editor, editor)
    }
  },
}


// ============================================================================
// REGISTRY
// ============================================================================

/**
 * Registry of all Froala custom plugins
 * To add a new plugin:
 * 1. Create it above
 * 2. Add it to this array
 * 3. (Optional) Add the plugin name to toolbarButtons in useFroalaConfig.ts
 */
const plugins: FroalaPlugin[] = [
  insertInputFieldPlugin,
  insertFlashcardPlugin,
  insertComponentsDropdownPlugin
  // Add more plugins here
]

/**
 * Register all plugins with FroalaEditor
 */
export const registerFroalaPlugins = (): void => {
  plugins.forEach((plugin) => {
    const { name, config, callback } = plugin

    // Call initialize if provided
    if (plugin.initialize) {
      plugin.initialize()
    }

    // Register the command with Froala
    FroalaEditor.RegisterCommand(name, {
      ...config,
      callback: callback,
    })

    console.log(`Registered Froala plugin: ${name}`)
  })
}

/**
 * Unregister all plugins (cleanup)
 */
export const unregisterFroalaPlugins = (): void => {
  plugins.forEach((plugin) => {
    if (plugin.cleanup) {
      plugin.cleanup()
    }
  })
}

/**
 * Get all registered plugin names
 */
export const getRegisteredPluginNames = (): string[] => {
  return plugins.map((p) => p.name)
}