<template>
  <div>
    <div ref="froalaContainer" :id="editorId"></div>
  </div>
</template>

<script setup>
import FroalaEditor from "froala-editor";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  config: {
    type: Object,
    default: () => ({}),
  },
  editorId: {
    type: String,
    default: () => `froala-${Math.random().toString(36).substr(2, 9)}`,
  },
});

const emit = defineEmits(["update:modelValue"]);

const froalaContainer = ref(null);
let editor = null;
let inputFieldCounter = 0; // Counter for input field IDs

// Register custom command for wrapping in box
FroalaEditor.RegisterCommand("wrapInBox", {
  title: "Box Text",
  icon: "paragraphStyle",
  focus: true,
  undo: true,
  refreshAfterCallback: true,
  callback: function () {
    const selected = this.html.getSelected();
    if (!selected) return;
    this.html.insert(`<div class="fr-text-box">${selected}</div>`);
  },
});

// Register custom command for inserting input fields
FroalaEditor.RegisterCommand("insertInputField", {
  title: "Insert Input Field",
  icon: "insertImage",
  focus: true,
  undo: true,
  refreshAfterCallback: true,
  callback: function () {
    const editor = this;
    
    // Single prompt for placeholder
    const placeholder = prompt("Enter placeholder text (optional):", "");
    
    // Auto-generate field name
    inputFieldCounter++;
    const fieldName = `input${String(inputFieldCounter).padStart(2, '0')}`;
    
    // Generate unique ID
    const fieldId = `input-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Create the input field HTML (default to text input)
    const inputHtml = `
      <div class="fr-input-field" data-field-id="${fieldId}" data-field-name="${fieldName}" contenteditable="false">
        <input 
          type="text" 
          class="fr-input-control" 
          placeholder="${placeholder || ''}"
          data-input-type="text"
        />
      </div>
    `;
    
    editor.html.insert(inputHtml);
  },
});

//Register custom command for inserting dropdown menu
FroalaEditor.DefineIcon('insertFieldDropdown', { NAME: 'edit', SVG_KEY: 'edit' });

FroalaEditor.RegisterCommand('insertFieldDropdown', {
  title: 'Insert Field',
  type: 'dropdown',
  focus: true,
  undo: true,
  refreshAfterCallback: true,

  // Menu items
  options: {
    text: 'Insert TextField',
    textarea: 'Insert Textarea',
  },

  // What happens when an item is clicked
  callback: function (cmd, val) {
    const editor = this;
    let html = '';

    // Auto-generate unique IDs
    const fieldId = `field-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    const fieldName = `field-${val}-${Math.random().toString(36).substr(2, 3)}`;

    if (val === 'text') {
      html = `
        <div class="fr-input-field" data-field-id="${fieldId}" data-field-name="${fieldName}" contenteditable="false">
          <input type="text" class="fr-input-control" placeholder="Enter text" />
        </div>
      `;
    } else if (val === 'textarea') {
      html = `
        <div class="fr-input-field" data-field-id="${fieldId}" data-field-name="${fieldName}" contenteditable="false">
          <textarea class="fr-input-control" placeholder="Enter multiline text"></textarea>
        </div>
      `;
    }

    editor.html.insert(html);
  },
});


const defaultConfig = {
  documentReady: true,
  height: "auto",
  width: "auto",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",

  fontSize: [
    "8", "10", "12", "14", "16", "18", "20", "24", 
    "28", "32", "36", "48", "60", "72",
  ],

  imageUpload: true,
  imageUploadURL: "/api/upload-image",
  imageMaxSize: 5 * 1024 * 1024,
  imageAllowedTypes: ["jpeg", "jpg", "png", "gif"],

  htmlAllowedAttrs: [
    "style", "class", "id", "data-index", "alt", "src", 
    "href", "placeholder", "data-field-id", "data-field-name",
    "data-input-type", "type", "contenteditable"
  ],
  htmlAllowedEmptyTags: ["textarea", "img", "br", "hr", "input"],
  htmlAllowedStyleProps: [".*"],
  htmlRemoveTags: [],
  htmlUntouched: true,
  htmlExecuteScripts: false,
  
  imageStyles: {
    rounded: "Rounded",
    bordered: "Bordered",
    shadow: "Shadow",
    circle: "Circle Image",
  },

  wordPasteModal: true,
  wordPasteKeepFormatting: true,
  wordAllowedStyleProps: [
    "font-family", "font-size", "background", "color", "width",
    "text-align", "vertical-align", "background-color", 
    "padding", "margin", "border",
  ],

  toolbarButtons: [
    "undo", "redo", "|",
    "bold", "italic", "underline", "strikeThrough", 
    "subscript", "superscript", "|",
    "alignLeft", "alignCenter", "alignRight", "alignJustify", "|",
    "insertLink", "insertImage", "insertVideo", "insertFile", "|",
    "insertTable", "insertHR", "emoticons", "specialCharacters", "|",
    "selectAll", "html", "help", 
    "wrapInBox", "insertInputField",
    "wrapInBox", "insertFieldDropdown"
  ],

  events: {
    contentChanged: function () {
      emit("update:modelValue", this.html.get());
      console.log("html", this.html.get());
    },

    initialized: function () {
      const contentElement = this.el.querySelector(".fr-element.fr-view");
      if (contentElement) {
        contentElement.style.setProperty("width", "20rem", "important");
        contentElement.style.setProperty("max-width", "10in", "important");
        contentElement.style.setProperty("margin", "0 auto", "important");
        contentElement.style.setProperty("padding", "1in", "important");
      }
    },
  },
};

onMounted(() => {
  nextTick(() => {
    if (froalaContainer.value) {
      const editorConfig = defaultConfig;
      editor = new FroalaEditor(`#${props.editorId}`, editorConfig);

      if (props.modelValue) {
        editor.html.set(props.modelValue);
      }
    }
  });
});

onBeforeUnmount(() => {
  if (editor) {
    editor.destroy();
    editor = null;
  }
});

watch(
  () => props.modelValue,
  (newValue) => {
    if (editor && editor.html.get() !== newValue) {
      editor.html.set(newValue || "");
    }
  }
);
</script>

<style>
.fr-wrapper {
  padding:2rem 18rem !important; /* top/bottom = 0, left/right = 5rem */
}
.fr-toolbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: white;
  border-bottom: 1px solid #ddd;
}

.fr-element.fr-view {
  width: 100% !important;
}

.fr-text-box {
  background-color: #e9f5ff;
  border: 2px solid #5b9bd5;
  border-radius: 8px;
  padding: 12px;
  margin: 8px 0;
}

/* Input field styles for editor */
.fr-input-field {
  background-color: #f9fafb;
  border: 2px dashed #d1d5db;
  border-radius: 8px;
  padding: 16px;
  margin: 12px 0;
  display: block;
}

.fr-input-control {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  font-family: inherit;
  background-color: white;
  pointer-events: none; /* Disable in editor */
  opacity: 0.7;
}

.circle {
  border-radius: 50% !important;
  object-fit: cover;
  aspect-ratio: 1 / 1;
}

.fr-element.fr-view h1 {
  font-size: 2em;
  font-weight: 700;
  margin: 0.67em 0;
}

.fr-element.fr-view h2 {
  font-size: 1.5em;
  font-weight: 600;
  margin: 0.75em 0;
}

.fr-element.fr-view h3 {
  font-size: 1.25em;
  font-weight: 600;
  margin: 0.83em 0;
}

.fr-element.fr-view p {
  margin: 0.5em 0;
}
</style>