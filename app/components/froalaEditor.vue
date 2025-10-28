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

FroalaEditor.RegisterCommand("wrapInBox", {
  title: "Box Text",
  icon: "paragraphStyle", // temporary icon
  focus: true,
  undo: true,
  refreshAfterCallback: true,
  callback: function () {
    const selected = this.html.getSelected();
    if (!selected) return;
    this.html.insert(`<div class="fr-text-box">${selected}</div>`);
  },
});

const defaultConfig = {
  // Document ready mode configuration
  documentReady: true,
  height: 480,
  width: 1200,

  fontSize: [
    "8",
    "10",
    "12",
    "14",
    "16",
    "18",
    "20",
    "24",
    "28",
    "32",
    "36",
    "48",
    "60",
    "72",
  ],

  imageUpload: true,
  imageUploadURL: "/api/upload-image",
  imageMaxSize: 5 * 1024 * 1024,
  imageAllowedTypes: ["jpeg", "jpg", "png", "gif"],

  htmlAllowedAttrs: [
    "style",
    "class",
    "id",
    "data-index",
    "alt",
    "src",
    "href",
    "placeholder",
  ],
  htmlAllowedEmptyTags: ["textarea", "img", "br", "hr"],
  htmlAllowedStyleProps: [".*"],
  htmlRemoveTags: [],
  htmlUntouched: true,
  htmlExecuteScripts: false,
  imageStyles: {
    rounded: "Rounded",
    bordered: "Bordered",
    shadow: "Shadow",
    circle: "Circle Image", // ✅ new option
  },
  


  // // Toolbar configuration
  // toolbarButtons: {
  //   'moreText': {
  //     'buttons': ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'fontSize', 'textColor', 'backgroundColor', 'inlineClass', 'inlineStyle', 'clearFormatting']
  //   },
  //   'moreParagraph': {
  //     'buttons': ['alignLeft', 'alignCenter', 'formatOLSimple', 'alignRight', 'alignJustify', 'formatOL', 'formatUL', 'paragraphFormat', 'paragraphStyle', 'lineHeight', 'outdent', 'indent', 'quote']
  //   },
  //   'moreRich': {
  //     'buttons': ['insertLink', 'insertImage', 'insertVideo', 'insertTable', 'emoticons', 'fontAwesome', 'specialCharacters', 'embedly', 'insertFile', 'insertHR']
  //   },
  //   'moreMisc': {
  //     'buttons': ['undo', 'redo', 'fullscreen', 'print', 'getPDF', 'spellChecker', 'selectAll', 'html', 'help']
  //   }
  // },

  wordPasteModal: true, // Show the Word paste dialog
  wordPasteKeepFormatting: true, // Keep original formatting by default
  wordAllowedStyleProps: [
    // Allow these style properties
    "font-family",
    "font-size",
    "background",
    "color",
    "width",
    "text-align",
    "vertical-align",
    "background-color",
    "padding",
    "margin",
    "border",
  ],

  toolbarButtons: [
    "fullscreen",
    "print",
    "getPDF",
    "undo",
    "redo",
    "|",
    "bold",
    "italic",
    "underline",
    "strikeThrough",
    "subscript",
    "superscript",
    "|",
    "fontFamily",
    "fontSize",
    "textColor",
    "backgroundColor",
    "|",
    "inlineClass",
    "inlineStyle",
    "clearFormatting",
    "|",
    "alignLeft",
    "alignCenter",
    "alignRight",
    "alignJustify",
    "|",
    "formatOL",
    "formatUL",
    "outdent",
    "indent",
    "|",
    "paragraphFormat",
    "paragraphStyle",
    "lineHeight",
    "quote",
    "|",
    "insertLink",
    "insertImage",
    "insertVideo",
    "insertFile",
    "|",
    "insertTable",
    "insertHR",
    "emoticons",
    "specialCharacters",
    "|",
    "selectAll",
    "html",
    "help",
    "wrapInBox",
  ],

  // Events
  events: {
    contentChanged: function () {
      emit("update:modelValue", this.html.get());
      console.log("html", this.html.get());
    },

    initialized: function () {
      // Additional styling for the content element after initialization
      const contentElement = this.el.querySelector(".fr-element.fr-view");
      if (contentElement) {
        contentElement.style.setProperty("width", "20rem", "important");
        contentElement.style.setProperty("max-width", "10in", "important");
        contentElement.style.setProperty("margin", "0 auto", "important");
        contentElement.style.setProperty("padding", "1in", "important");
        console.log("Content element width set to 10in");
      }

      const editor = this;

      FroalaEditor.RegisterCommand("wrapInBox", {
        title: "Box Text",
        icon: "highlight", // you can replace with custom icon later
        focus: true,
        undo: true,
        refreshAfterCallback: true,

        callback: function () {
          const selectedHtml = editor.html.getSelected();

          if (!selectedHtml) return;

          const wrapped = `<div class="fr-text-box">${selectedHtml}</div>`;
          editor.html.insert(wrapped);
        },
      });
    },
  },
};

onMounted(() => {
  nextTick(() => {
    if (froalaContainer.value) {
      // Merge default config with user config
      const editorConfig = defaultConfig;

      // Initialize Froala editor
      editor = new FroalaEditor(`#${props.editorId}`, editorConfig);

      // Set initial content
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

// Watch for external content changes
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
/* Simple CSS to set the content element width */
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

.circle {
  border-radius: 50% !important;
  object-fit: cover;
  aspect-ratio: 1 / 1; /* keeps perfect circle */
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
