import FroalaEditor from "froala-editor"
import { useFroalaModals } from "~/composables/useFroalaModals"
import InputFieldModal from "~/components/editor/InputField/Modal.vue"
import FlashcardModal from "~/components/editor/Flashcard/Modal.vue"
import { generateInputFieldHtml } from "~/components/editor/InputField/Template"
import { generateFlashcardHtml, type FlashcardDeckData } from "~/components/editor/Flashcard/Template"

/**
 * Plugin definition interface for Froala custom commands
 */
export interface FroalaPlugin {
  name: string
  config: {
    title: string
    icon?: string
    focus?: boolean
    undo?: boolean
    refreshAfterCallback?: boolean
    [key: string]: any
  }
  callback: (this: any, ...args: any[]) => void | Promise<void>
  initialize?: () => void
  cleanup?: () => void
}

// ============================================================================
// HELPER FUNCTIONS FOR FLASHCARD EDITING
// ============================================================================

/**
 * Global function to handle flashcard editing
 * This is called from the onclick handler in the button
 */
export async function editFlashcardDeck(deckId: string) {
  try {
    // Find the deck element
    const deckElement = document.querySelector(`[data-deck-id="${deckId}"]`)
    
    if (!deckElement) {
      console.error('Deck not found:', deckId)
      return
    }
    
    // Get serialized data
    const serializedData = deckElement.getAttribute('data-deck-data')
    if (!serializedData) {
      console.error('Deck data not found')
      return
    }
    
    // Decode and parse the data
    const existingData: FlashcardDeckData = JSON.parse(
      decodeURIComponent(atob(serializedData))
    )
    
    // Open modal with existing data
    const { openModal } = useFroalaModals()
    const result = await openModal<FlashcardDeckData>(FlashcardModal, {
      existingData,
      uploadEndpoint: '/api/upload-image'
    })
    
    if (!result.confirmed || !result.data) return
    
    // Generate new HTML
    const newHtml = generateFlashcardHtml(result.data)
    
    // Replace the old element
    deckElement.outerHTML = newHtml
  } catch (error) {
    console.error('Error editing flashcard:', error)
    alert('Failed to edit flashcard. Please try again.')
  }
}

export function deleteFlashcardDeck(deckId: string) {

  
  try {
    const deckElement = document.querySelector(`[data-deck-id="${deckId}"]`)
    
    if (deckElement) {
      deckElement.remove()
    }
  } catch (error) {
    console.error('Error deleting flashcard:', error)
    alert('Failed to delete flashcard. Please try again.')
  }
}


export function deleteInputField(fieldId: string) {

  try {
    const fieldElement = document.querySelector(`[data-field-id="${fieldId}"]`)
    
    if (fieldElement) {
      fieldElement.remove()
    }
  } catch (error) {
    console.error('Error deleting input field:', error)
    alert('Failed to delete input field. Please try again.')
  }
}


// Make it globally available
if (typeof window !== 'undefined') {
  (window as any).editFlashcardDeck = editFlashcardDeck;
  (window as any).deleteFlashcardDeck = deleteFlashcardDeck;
  (window as any).deleteInputField = deleteInputField;
}

// ============================================================================
// PLUGINS
// ============================================================================

let inputFieldCounter = 0

/**
 * Plugin: Insert Input Field
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
    const result = await openModal<{ placeholder: string; fieldLabel: string; inputType: 'single' | 'multi' }>(
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

    const defaultPlaceholder = `Response ${inputFieldCounter}`
    const html = generateInputFieldHtml({
      placeholder: result.data.placeholder || defaultPlaceholder,
      fieldLabel: result.data.fieldLabel,
      inputType: result.data.inputType,
      fieldName,
      fieldId
    })

    editor.html.insert(html)
  },
}

/**
 * Plugin: Insert Flashcard
 */
let flashcardCounter = 0

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
    const result = await openModal<FlashcardDeckData>(FlashcardModal, {
      uploadEndpoint: '/api/upload-image'
    })

    if (!result.confirmed || !result.data) {
      editor.selection.restore()
      return
    }

    editor.selection.restore()

    flashcardCounter++
    const html = generateFlashcardHtml(result.data)

    editor.html.insert(html)
  }
}

/**
 * Plugin: Insert Components Dropdown
 */
FroalaEditor.DefineIcon("edit", { NAME: "edit", SVG_KEY: "edit" })

const insertComponentsDropdownPlugin: FroalaPlugin = {
  name: "insertComponentsDropdown",
  config: {
    title: "Insert",
    icon: '<span style="font-size:14px; font-weight:500;">GRADPATH CAPABILITIES</span>',
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

const plugins: FroalaPlugin[] = [
  insertInputFieldPlugin,
  insertFlashcardPlugin,
  insertComponentsDropdownPlugin
]

/**
 * Register all plugins with FroalaEditor
 */
export const registerFroalaPlugins = (): void => {
  plugins.forEach((plugin) => {
    const { name, config, callback } = plugin

    if (plugin.initialize) {
      plugin.initialize()
    }

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