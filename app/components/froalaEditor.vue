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
  height: 480,
  width: 1200,
  
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

  toolbarButtons: [
    'fullscreen', 'print', 'getPDF', 'undo', 'redo', '|',
    'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '|',
    'fontFamily', 'fontSize', 'textColor', 'backgroundColor', '|',
    'inlineClass', 'inlineStyle', 'clearFormatting', '|',
    'alignLeft', 'alignCenter', 'alignRight', 'alignJustify', '|',
    'formatOL', 'formatUL', 'outdent', 'indent', '|',
    'paragraphFormat', 'paragraphStyle', 'lineHeight', 'quote', '|',
    'insertLink', 'insertImage', 'insertVideo', 'insertFile', '|',
    'insertTable', 'insertHR', 'emoticons', 'specialCharacters', '|',
    'selectAll', 'html', 'help'
  ],
  
  // Events
  events: {
    'contentChanged': function() {
      emit('update:modelValue', this.html.get())
      console.log("html", this.html.get());
    },

    'initialized': function() {
      // Additional styling for the content element after initialization
      const contentElement = this.el.querySelector('.fr-element.fr-view')
      if (contentElement) {
        contentElement.style.setProperty('width', '20rem', 'important')
        contentElement.style.setProperty('max-width', '10in', 'important')
        contentElement.style.setProperty('margin', '0 auto', 'important')
        contentElement.style.setProperty('padding', '1in', 'important')
        console.log('Content element width set to 10in')
      }
    },
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


<style>
/* Simple CSS to set the content element width */
.fr-element.fr-view {
  width: 100% !important;

}
</style>