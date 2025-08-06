<template>
  <div>
    <div ref="froalaContainer" :id="editorId"></div>
  </div>
</template>

<script setup>
import FroalaEditor from 'froala-editor'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  config: {
    type: Object,
    default: () => ({})
  },
  editorId: {
    type: String,
    default: () => `froala-${Math.random().toString(36).substr(2, 9)}`
  }
})

const emit = defineEmits(['update:modelValue'])

const froalaContainer = ref(null)
let editor = null

const defaultConfig = {
  // Document ready mode configuration
  documentReady: true,
  height: 430,
  
  // Toolbar configuration
  toolbarButtons: {
    'moreText': {
      'buttons': ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'fontSize', 'textColor', 'backgroundColor', 'inlineClass', 'inlineStyle', 'clearFormatting']
    },
    'moreParagraph': {
      'buttons': ['alignLeft', 'alignCenter', 'formatOLSimple', 'alignRight', 'alignJustify', 'formatOL', 'formatUL', 'paragraphFormat', 'paragraphStyle', 'lineHeight', 'outdent', 'indent', 'quote']
    },
    'moreRich': {
      'buttons': ['insertLink', 'insertImage', 'insertVideo', 'insertTable', 'emoticons', 'fontAwesome', 'specialCharacters', 'embedly', 'insertFile', 'insertHR']
    },
    'moreMisc': {
      'buttons': ['undo', 'redo', 'fullscreen', 'print', 'getPDF', 'spellChecker', 'selectAll', 'html', 'help']
    }
  },
  
  // Events
  events: {
    'contentChanged': function() {
      emit('update:modelValue', this.html.get())
      console.log("html", this.html.get());
    }
  }
}

onMounted(() => {
  nextTick(() => {
    if (froalaContainer.value) {
      // Merge default config with user config
      const editorConfig = defaultConfig
      
      // Initialize Froala editor
      editor = new FroalaEditor(`#${props.editorId}`, editorConfig)
      
      // Set initial content
      if (props.modelValue) {
        editor.html.set(props.modelValue)
      }
    }
  })
})

onBeforeUnmount(() => {
  if (editor) {
    editor.destroy()
    editor = null
  }
})

// Watch for external content changes
watch(() => props.modelValue, (newValue) => {
  if (editor && editor.html.get() !== newValue) {
    editor.html.set(newValue || '')
  }
})
</script>