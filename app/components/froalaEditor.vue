<template>
  <div>
    <div ref="froalaContainer" :id="editorId"></div>
  </div>
</template>

<script setup>
import FroalaEditor from "froala-editor"
import { useFroalaStorage } from "~/composables/useFroalaStorage"
import { getFroalaConfig } from "~/utils/froalaConfig"
import { registerFroalaPlugins } from "~/utils/froalaPlugins"

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
})

const emit = defineEmits(["update:modelValue"])

const froalaContainer = ref(null)
let editor = null

const { loadFromStorage, saveToStorage, clearStorage } = useFroalaStorage(
  props.storageKey
)

const defaultConfig = {
  ...getFroalaConfig(
    emit,
    props.autoSave,
    saveToStorage,
    loadFromStorage,
    props.modelValue
  ),
  ...props.config,
}

// Track plugin registration globally to avoid multiple registrations
const PLUGINS_REGISTERED_KEY = "__froala_plugins_registered__"

onMounted(() => {
  // Register plugins only once across all editor instances
  if (!window[PLUGINS_REGISTERED_KEY]) {
    registerFroalaPlugins()
    window[PLUGINS_REGISTERED_KEY] = true
  }

  nextTick(() => {
    if (froalaContainer.value) {
      editor = new FroalaEditor(`#${props.editorId}`, defaultConfig)
    }
  })
})

onBeforeUnmount(() => {
  if (editor) {
    if (props.autoSave) {
      saveToStorage(editor.html.get())
    }
    editor.destroy()
    editor = null
  }
})

watch(
  () => props.modelValue,
  (newValue) => {
    if (editor && editor.html.get() !== newValue) {
      editor.html.set(newValue || "")
    }
  }
)

defineExpose({
  saveToStorage: () => {
    if (editor) {
      saveToStorage(editor.html.get())
    }
  },
  clearStorage,
  loadFromStorage: () => {
    const content = loadFromStorage()
    if (content && editor) {
      editor.html.set(content)
    }
    return content
  },
})
</script>

<style>
.fr-element.fr-view {
  width: 100% !important;
}

.fr-toolbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: white;
  border-bottom: 1px solid #ddd;
}

.fr-toolbar .fr-btn-grp:not(:last-child)::after {
  content: "";
  display: inline-block;
  width: 1px;
  height: 24px;
  background-color: #bdbdbd;
  vertical-align: middle;
  margin-left: 2px;
}

.fr-toolbar .fr-btn-grp:has(#insertComponentsDropdown-1)::after {
  display: none !important;
  content: none !important;
}

.fr-toolbar .fr-btn-grp .fr-btn:last-child {
  margin-right: 10px;
}

.fr-toolbar .fr-separator:after {
  content: "|";
  color: #e0e0e0;
  font-weight: normal;
}

.fr-wrapper {
  padding: 2rem auto !important;
  height: auto !important;
}

.fr-element {
  max-width: 1000px;
}

.fr-toolbar {
  display: flex !important;
  flex-direction: row !important;
  justify-content: flex-start !important;
  align-items: center !important;
  flex-wrap: wrap !important;
  gap: 0px !important;
}

.fr-toolbar .fr-btn-grp {
  display: flex !important;
  flex-direction: row !important;
  flex-wrap: wrap !important;
  justify-content: center !important;
  align-items: center !important;
  margin-left: 0px !important;
  margin-right: 14px !important;
}

.fr-toolbar .fr-btn-grp .fr-dropdown {
  margin-right: 17px !important;
}

#insertComponentsDropdown-9 {
  padding-top: 5px !important;
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

.fr-view ol {
  list-style-type: decimal;
  list-style-position: outside;
  margin-left: 1.5em;
  padding-left: 0.5em;
}

.fr-view ul {
  list-style-type: disc;
  list-style-position: outside;
  margin-left: 1.5em;
  padding-left: 0.5em;
}
</style>