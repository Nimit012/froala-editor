<template>
    <div>
      <div ref="pagesContainer" :id="editorId"></div>
    </div>
  </template>
  
  <script setup>
  import { onMounted, onBeforeUnmount, ref } from 'vue'
  
  const props = defineProps({
    modelValue: {
      type: String,
      default: "",
    },
    editorId: {
      type: String,
      default: () => `froala-pages-${Math.random().toString(36).substr(2, 9)}`,
    },
  })
  
  const emit = defineEmits(["update:modelValue"])
  
  const pagesContainer = ref(null)
  let pagesInstance = null
  
  onMounted(async () => {
    // Dynamically import Froala Pages (client-side only)
    if (process.client) {
      // Import CSS
      await import('froala-pages/css/froala_pages.min.css')
      
      // Import JS
      const FroalaPages = (await import('froala-pages')).default
      
      // Import design blocks package
      await import('froala-pages/js/pages_design_blocks_pkgd.min.js')
      
      // Initialize Froala Pages
      pagesInstance = new FroalaPages(`#${props.editorId}`, {
        // Add your Froala Pages license key here if you have one
        // key: 'YOUR_LICENSE_KEY',
        
        // Event handlers
        events: {
          contentChanged: function() {
            const html = pagesInstance.html.get()
            emit('update:modelValue', html)
          },
          initialized: function() {
            if (props.modelValue) {
              pagesInstance.html.set(props.modelValue)
            }
          }
        }
      })
    }
  })
  
  onBeforeUnmount(() => {
    if (pagesInstance && pagesInstance.destroy) {
      pagesInstance.destroy()
      pagesInstance = null
    }
  })
  
  // Expose methods
  defineExpose({
    getHTML: () => {
      return pagesInstance ? pagesInstance.html.get() : ''
    },
    setHTML: (html) => {
      if (pagesInstance) {
        pagesInstance.html.set(html)
      }
    },
    getJSON: () => {
      return pagesInstance ? pagesInstance.json.get() : null
    },
    setJSON: (json) => {
      if (pagesInstance) {
        pagesInstance.json.set(json)
      }
    }
  })
  </script>
  
  <style>
  /* Add any custom styling for the page builder */
  #froala-pages-container {
    width: 100%;
    min-height: 600px;
  }
  </style>