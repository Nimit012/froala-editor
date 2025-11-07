# Map Froala - Froala Editor with Custom Plugin Support 

A Nuxt.js application that extends the Froala WYSIWYG editor with custom plugins and components. This project provides a rich text editor with custom dropdown capabilities for inserting specialized content like input fields, flashcards, graphs, and equations.

## What Does This Project Do?

This project creates a Froala editor implementation with:

- **Custom Dropdown Plugin**: A "Gradpath Capabilities" dropdown menu in the Froala toolbar that allows users to insert custom components
- **Input Field Component**: Insert customizable input fields (single-line or multi-line) with various configuration options
- **Flashcard Component**: Create and insert interactive flashcard decks with front/back cards, images, and text
- **Auto-save Functionality**: Automatically saves editor content to localStorage
- **Modal System**: A reusable modal system for component configuration forms
- **Template Generation**: HTML template generators for each component type

## File Structure

```
map-froala/
├── app/
│   ├── assets/
│   │   ├── css/
│   │   │   └── tailwind.css          # Tailwind CSS styles
│   │   └── icons/
│   │       └── chevron-right.svg     # SVG icons
│   ├── components/
│   │   ├── froalaEditor.vue          # Main Froala editor wrapper component
│   │   ├── ModalWrapper.vue          # Reusable modal wrapper component
│   │   ├── previewModal.vue          # Preview modal for document content
│   │   └── plugin/
│   │       ├── Flashcard/
│   │       │   ├── Form.vue          # Flashcard configuration form component
│   │       │   └── Template.ts       # HTML template generator for flashcards
│   │       └── InputField/
│   │           ├── Form.vue          # Input field configuration form component
│   │           └── Template.ts       # HTML template generator for input fields
│   ├── layouts/
│   │   └── default.vue               # Default Nuxt layout
│   ├── pages/
│   │   ├── index.vue                 # Main editor page
│   │   └── author/
│   │       └── flashcard.vue         # Flashcard authoring page
│   ├── plugins/
│   │   └── froala.client.ts          # Froala client-side plugin initialization
│   ├── utils/
│   │   ├── froalaConfig.ts           # Froala editor configuration
│   │   ├── froalaPlugins.ts          # Custom plugin definitions and registration
│   │   ├── froalaStorage.ts          # localStorage utilities for auto-save
│   │   └── modal.ts                  # Modal system utilities
│   ├── app.vue                       # Root Vue component
│   └── tailwind.config.ts            # Tailwind CSS configuration
├── server/
│   └── api/
│       └── upload-image.post.ts      # Image upload API endpoint
├── nuxt.config.ts                    # Nuxt configuration
├── package.json                      # Project dependencies
└── tsconfig.json                     # TypeScript configuration
```

## Key Files Explained

### Core Editor Files

- **`app/components/froalaEditor.vue`**: The main wrapper component that initializes Froala editor, handles plugin registration, and manages editor lifecycle
- **`app/utils/froalaConfig.ts`**: Contains the default Froala editor configuration including toolbar buttons, allowed HTML attributes, and event handlers
- **`app/utils/froalaPlugins.ts`**: **Main plugin registry** - defines custom plugins, their dropdown options, and callback handlers

### Plugin Component Files

Each plugin component follows this structure:
- **`Form.vue`**: Vue component that renders the configuration form/modal for the plugin
- **`Template.ts`**: TypeScript file that exports a function to generate HTML from component data

### Utility Files

- **`app/utils/modal.ts`**: Provides `openModal()` function for displaying Vue components as modals
- **`app/utils/froalaStorage.ts`**: Handles localStorage operations for auto-save functionality

## How to Add a New Item to the Custom Dropdown Plugin

Follow these steps to add a new item (e.g., "Insert Graph" or "Insert Equation") to the custom dropdown:

### Step 1: Create the Plugin Component Directory

Create a new directory under `app/components/plugin/` for your new component:

```
app/components/plugin/
└── YourNewComponent/
    ├── Form.vue          # Configuration form
    └── Template.ts       # HTML template generator
```

### Step 2: Create the Form Component (`Form.vue`)

Create a Vue component that collects configuration data from the user:

**Important**: The form component should:
- Emit a `submit` event with the configuration data
- Emit a `cancel` event when cancelled
- Accept `inModal` prop if using the modal system

### Step 3: Create the Template Generator (`Template.ts`)

Create a TypeScript file that generates HTML from your component data:


### Step 4: Create Handler Function in `froalaPlugins.ts`

Add a handler function that opens the modal and inserts the HTML:

```typescript
import YourComponentForm from "~/components/plugin/YourComponent/Form.vue"
import { generateYourComponentHtml } from "~/components/plugin/YourComponent/Template"

async function handleInsertYourComponent(editor: any) {
  editor.selection.save()

  const result = await openModal<YourComponentData>(YourComponentForm)

  if (!result.confirmed || !result.data) {
    editor.selection.restore()
    return
  }

  editor.selection.restore()

  const html = generateYourComponentHtml(result.data)
  editor.html.insert(html)
}
```

### Step 5: Add Option to Dropdown in `froalaPlugins.ts`

Update the `insertComponentsDropdownPlugin` configuration:

```typescript
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
      assessmentInputBox: "Assessment Input Box",
      insertFlashcard: "Insert Flashcard",
      insertGraph: "Insert Graph",
      insertEquation: "Insert Equation",
      insertYourComponent: "Insert Your Component",  // Add your new option
    },
  },
  callback: async function (this: any, _cmd: string, val: string) {
    const editor = this

    if (val === "assessmentInputBox") {
      await handleInsertInputField(editor)
    } else if (val === "insertFlashcard") {
      await handleInsertFlashcard(editor)
    } else if (val === "insertYourComponent") {  // Add your handler
      await handleInsertYourComponent(editor)
    }
  },
}
```

### Step 6: Add Delete/Edit Functions (Optional)

If your component needs delete/edit functionality, add global functions:

```typescript
// In froalaPlugins.ts
export function deleteYourComponent(componentId: string) {
  try {
    const element = document.querySelector(`[data-component-id="${componentId}"]`)
    if (element) {
      element.remove()
    }
  } catch (error) {
    console.error('Error deleting component:', error)
    alert('Failed to delete component. Please try again.')
  }
}

// Make globally available
if (typeof window !== 'undefined') {
  (window as any).deleteYourComponent = deleteYourComponent
}
```

## Example: Adding "Insert Graph" Component

Here's a minimal example structure:

```
app/components/plugin/Graph/
├── Form.vue          # Form with graph type, data source, etc.
└── Template.ts       # Generates HTML for graph visualization
```

Then in `froalaPlugins.ts`:
- Import `GraphForm` and `generateGraphHtml`
- Create `handleInsertGraph()` function
- Add `insertGraph: "Insert Graph"` to dropdown options
- Add handler in callback: `else if (val === "insertGraph") { await handleInsertGraph(editor) }`

## Development

### Prerequisites

- Node.js (v18+)
- pnpm (v10+)

### Installation

```bash
pnpm install
```

### Development Server

```bash
pnpm dev
```

### Build

```bash
pnpm build
```

## Technologies Used

- **Nuxt.js 4**: Vue.js framework
- **Froala Editor**: WYSIWYG editor
- **Vue 3**: Frontend framework
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling
- **Vite**: Build tool

## License

[Add your license information here]
