<template>
  <div>
    <div ref="froalaContainer" :id="editorId"></div>
  </div>
</template>

<script setup>
import FroalaEditor from "froala-editor";
import { useFroalaStorage } from "~/composables/useFroalaStorage";
import { useFroalaConfig } from "~/composables/useFroalaConfig";
import { registerFroalaPlugins } from "~/composables/froalaPlugins";

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
  storageKey: {
    type: String,
    default: "froala-editor-content",
  },
  autoSave: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const froalaContainer = ref(null);
let editor = null;

// Initialize storage composable
const { loadFromStorage, saveToStorage, clearStorage } = useFroalaStorage(
  props.storageKey
);

// Initialize config composable
const { getDefaultConfig } = useFroalaConfig();

// Register all custom plugins
registerFroalaPlugins();

// Get default configuration with event handlers
const defaultConfig = {
  ...getDefaultConfig(
    emit,
    props.autoSave,
    saveToStorage,
    loadFromStorage,
    props.modelValue
  ),
  // Merge with user-provided config
  ...props.config,
};

onMounted(() => {
  nextTick(() => {
    if (froalaContainer.value) {
      editor = new FroalaEditor(`#${props.editorId}`, defaultConfig);
    }
  });
});

onBeforeUnmount(() => {
  if (editor) {
    // Save one final time before unmounting
    if (props.autoSave) {
      saveToStorage(editor.html.get());
    }

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

// Expose methods for manual control
defineExpose({
  saveToStorage: () => {
    if (editor) {
      saveToStorage(editor.html.get());
    }
  },
  clearStorage,
  loadFromStorage: () => {
    const content = loadFromStorage();
    if (content && editor) {
      editor.html.set(content);
    }
    return content;
  },
});
</script>

<style>
.fr-element.fr-view {
  width: 100% !important;
}


.fr-wrapper {
  padding:2rem 18rem !important; /* top/bottom = 0, left/right = 5rem */
  height :auto !important;
}

.fr-text-box {
  background-color: #e9f5ff;
  border: 2px solid #5b9bd5;
  border-radius: 8px;
  padding: 12px;
  margin: 8px 0;
}

.fr-input-control {
  display: block;
  width: 100%;
  padding: 8px 12px;
  font-size: 14px;
  font-family: inherit;
  margin: 12px 0;
  pointer-events: none;
  background-color: rgb(248, 250, 252);
  border: 1px dashed rgb(203, 213, 224);
  border-radius: 6px;
  padding: 12px;
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
