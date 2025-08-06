<template>
  <div>
    <div>

      <h1>My Document Editor</h1>
      
      <div class="actions mb-6">
        <button 
        class="btn btn-primary"
        @click="openPreviewModal"
        :disabled="!content.trim()"
        >
        Preview Document
      </button>
      <button 
      class="btn btn-secondary ml-3"
      @click="saveDocument"
      >
      Save Document
    </button>
  </div>
    </div>
    <ClientOnly>
      <FroalaEditor 
        v-model="content"
        :config="froalaConfig"
        editor-id="my-document-editor"
      />
      <template #fallback>
        <div class="loading-placeholder">
          Loading editor...
        </div>
      </template>
    </ClientOnly>
  
    
    <!-- Preview Modal -->
    <PreviewModal
      :is-open="isPreviewModalOpen"
      :content="content"
      @close="closePreviewModal"
    />
  </div>
</template>

<script setup>
const content = ref('<p>Start writing your document...</p>')
const isPreviewModalOpen = ref(false)

const froalaConfig = {
  documentReady: true,
  height: 500,
  placeholderText: 'Start writing your document...',
  
  toolbarButtons: [
    'fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', '|',
    'fontSize', 'textColor', 'backgroundColor', '|',
    'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', '|',
    'insertLink', 'insertImage', 'insertTable', '|',
    'undo', 'redo', 'clearFormatting', 'html'
  ]
}

const openPreviewModal = () => {
  if (content.value && content.value.trim()) {
    isPreviewModalOpen.value = true
  }
}

const closePreviewModal = () => {
  isPreviewModalOpen.value = false
}

const saveDocument = () => {
  // Implement your save logic here
  console.log('Saving document:', content.value)
  // You could save to localStorage, send to API, etc.
  localStorage.setItem('froala-document', content.value)
  alert('Document saved!')
}

// Load saved content on mount
onMounted(() => {
  const saved = localStorage.getItem('froala-document')
  if (saved) {
    content.value = saved
  }
})
</script>

<style scoped>
.loading-placeholder {
  height: 500px;
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9f9f9;
  color: #666;
  border-radius: 4px;
}

.actions {
  display: flex;
  align-items: center;
  margin-top: 1.5rem;
}

.btn {
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;
  font-size: 14px;
  text-decoration: none;
  display: inline-block;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-primary {
  background-color: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

.btn-primary:hover:not(:disabled) {
  background-color: #2563eb;
  border-color: #2563eb;
}

.btn-secondary {
  background-color: white;
  color: #374151;
  border-color: #d1d5db;
}

.btn-secondary:hover {
  background-color: #f9fafb;
  border-color: #9ca3af;
}

.mb-6 {
  margin-bottom: 1.5rem;
}

.ml-3 {
  margin-left: 0.75rem;
}
</style>