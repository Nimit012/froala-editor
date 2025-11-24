<template>
  <div class="page-builder-container">
    <div class="toolbar">
      <h1>Page Builder</h1>
      <div class="actions">
        <button @click="saveContent" class="btn-save">Save</button>
        <button @click="loadContent" class="btn-load">Load</button>
        <button @click="exportHTML" class="btn-export">Export HTML</button>
        <button @click="clearContent" class="btn-clear">Clear</button>
      </div>
    </div>

    <ClientOnly>
      <FroalaPages
        v-model="pageContent"
        editor-id="main-page-builder"
        ref="pageBuilderRef"
      />
      <template #fallback>
        <div class="loading">Loading page builder...</div>
      </template>
    </ClientOnly>

    <!-- Preview Modal -->
    <div v-if="showPreview" class="preview-modal" @click="showPreview = false">
      <div class="preview-content" @click.stop>
        <div class="preview-header">
          <h2>HTML Output</h2>
          <button @click="showPreview = false" class="close-btn">×</button>
        </div>
        <pre class="preview-code">{{ previewHTML }}</pre>
        <button @click="copyToClipboard" class="btn-copy">Copy to Clipboard</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const pageContent = ref('')
const pageBuilderRef = ref(null)
const showPreview = ref(false)
const previewHTML = ref('')

// Save content to localStorage
const saveContent = () => {
  if (pageBuilderRef.value) {
    const html = pageBuilderRef.value.getHTML()
    const json = pageBuilderRef.value.getJSON()
    
    localStorage.setItem('froala-pages-html', html)
    localStorage.setItem('froala-pages-json', JSON.stringify(json))
    
    alert('Content saved!')
  }
}

// Load content from localStorage
const loadContent = () => {
  const savedHTML = localStorage.getItem('froala-pages-html')
  const savedJSON = localStorage.getItem('froala-pages-json')
  
  if (savedJSON) {
    try {
      const json = JSON.parse(savedJSON)
      pageBuilderRef.value.setJSON(json)
      alert('Content loaded!')
    } catch (e) {
      console.error('Error loading JSON:', e)
      if (savedHTML) {
        pageBuilderRef.value.setHTML(savedHTML)
      }
    }
  } else if (savedHTML) {
    pageBuilderRef.value.setHTML(savedHTML)
    alert('Content loaded!')
  } else {
    alert('No saved content found!')
  }
}

// Export HTML
const exportHTML = () => {
  if (pageBuilderRef.value) {
    previewHTML.value = pageBuilderRef.value.getHTML()
    showPreview.value = true
  }
}

// Clear content
const clearContent = () => {
  if (confirm('Are you sure you want to clear all content?')) {
    if (pageBuilderRef.value) {
      pageBuilderRef.value.setHTML('')
    }
    pageContent.value = ''
  }
}

// Copy to clipboard
const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(previewHTML.value)
    alert('HTML copied to clipboard!')
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}
</script>

<style scoped>
.page-builder-container {
  width: 100%;
  min-height: 100vh;
  background: #f5f5f5;
}

.toolbar {
  background: white;
  padding: 20px;
  border-bottom: 2px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.toolbar h1 {
  margin: 0;
  font-size: 24px;
  color: #333;
}

.actions {
  display: flex;
  gap: 10px;
}

.actions button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-save {
  background: #667eea;
  color: white;
}

.btn-save:hover {
  background: #5568d3;
}

.btn-load {
  background: #48bb78;
  color: white;
}

.btn-load:hover {
  background: #38a169;
}

.btn-export {
  background: #ed8936;
  color: white;
}

.btn-export:hover {
  background: #dd6b20;
}

.btn-clear {
  background: #f56565;
  color: white;
}

.btn-clear:hover {
  background: #e53e3e;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  font-size: 18px;
  color: #666;
}

/* Preview Modal */
.preview-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  padding: 20px;
}

.preview-content {
  background: white;
  border-radius: 8px;
  max-width: 900px;
  width: 100%;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 2px solid #e0e0e0;
}

.preview-header h2 {
  margin: 0;
  font-size: 20px;
}

.close-btn {
  background: none;
  border: none;
  font-size: 32px;
  cursor: pointer;
  color: #666;
  line-height: 1;
  padding: 0;
  width: 32px;
  height: 32px;
}

.close-btn:hover {
  color: #333;
}

.preview-code {
  flex: 1;
  overflow: auto;
  padding: 20px;
  background: #f5f5f5;
  margin: 0;
  font-family: 'Courier New', monospace;
  font-size: 12px;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.btn-copy {
  margin: 20px;
  padding: 12px 24px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
}

.btn-copy:hover {
  background: #5568d3;
}
</style>