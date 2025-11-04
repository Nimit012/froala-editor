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

export async function editFlashcardDeck(deckId: string) {
  try {
    const deckElement = document.querySelector(`[data-deck-id="${deckId}"]`)
    
    if (!deckElement) {
      console.error('Deck not found:', deckId)
      return
    }
    
    const serializedData = deckElement.getAttribute('data-deck-data')
    if (!serializedData) {
      console.error('Deck data not found')
      return
    }
    
    const existingData: FlashcardDeckData = JSON.parse(
      decodeURIComponent(atob(serializedData))
    )
    
    const { openModal } = useFroalaModals()
    const result = await openModal<FlashcardDeckData>(FlashcardModal, {
      existingData,
      uploadEndpoint: '/api/upload-image'
    })
    
    if (!result.confirmed || !result.data) return
    
    const newHtml = generateFlashcardHtml(result.data)
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

// Make globally available
if (typeof window !== 'undefined') {
  (window as any).editFlashcardDeck = editFlashcardDeck;
  (window as any).deleteFlashcardDeck = deleteFlashcardDeck;
  (window as any).deleteInputField = deleteInputField;
}

// ============================================================================
// ACTION HANDLERS (Not plugins, just functions)
// ============================================================================

let inputFieldCounter = 0
let flashcardCounter = 0

/**
 * Handles inserting an input field
 */
async function handleInsertInputField(editor: any) {
  editor.selection.save()

  const { openModal } = useFroalaModals()
  const result = await openModal<{ 
    placeholder: string
    inputType: 'single' | 'multi'
    singleLineType?: string
    minRows?: number
    maxRows?: number
    maxWords?: number
    enableFormatting?: boolean
    allowImageUpload?: boolean
    spellChecker?: boolean
    disablePaste?: boolean
  }>(InputFieldModal)

  if (!result.confirmed || !result.data) {
    editor.selection.restore()
    return
  }

  editor.selection.restore()

  inputFieldCounter++
  const fieldName = `input${String(inputFieldCounter).padStart(2, "0")}`
  const fieldId = `input-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

  const defaultPlaceholder = `Response ${inputFieldCounter}`
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
    fieldId
  })

  editor.html.insert(html)
}

/**
 * Handles inserting a flashcard
 */
async function handleInsertFlashcard(editor: any) {
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

// ============================================================================
// PLUGIN - Single Dropdown
// ============================================================================



FroalaEditor.DefineIcon('gradpathIcon', {
  template: 'text',
  NAME: '<span style="font-size:13px; font-weight:500;">GRADPATH CAPABILITIES</span>'

})

const insertComponentsDropdownPlugin: FroalaPlugin = {
  name: "insertComponentsDropdown",
  config: {
    title: "Gradpath Capabilities",
    icon: 'gradpathIcon',
    type: "dropdown",
    focus: false,
    undo: false,
    refreshAfterCallback: false,
    options: {
      insertInputField: "Insert Input Field",
      insertFlashcard: "Insert Flashcard",
    },
  },
  callback: async function (this: any, _cmd: string, val: string) {
    const editor = this

    if (val === "insertInputField") {
      await handleInsertInputField(editor)
    } else if (val === "insertFlashcard") {
      await handleInsertFlashcard(editor)
    }
  },
}

// ============================================================================
// REGISTRY
// ============================================================================

const plugins: FroalaPlugin[] = [
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

