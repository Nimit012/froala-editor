<template>
  <div v-if="isOpen" class="modal-overlay" @click="closeModal">
    <div class="modal-container" @click.stop>
      <div class="modal-header">
        <h3 class="modal-title">Document Preview</h3>
        <button class="close-button" @click="closeModal">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
      
      <div class="modal-body">
        <div class="preview-content" v-html="content" ref="previewContent"></div>
      </div>
      
      <div class="modal-footer">
        <button class="btn btn-secondary" @click="closeModal">
          Close
        </button>
        <button class="btn btn-warning" @click="clearFormData">
          Clear Form Data
        </button>
        <button class="btn btn-success" @click="collectFormData">
          Collect Form Data
        </button>
        <button class="btn btn-primary" @click="printPreview">
          Print
        </button>
        <button class="btn btn-primary" @click="exportAsPDF" v-if="showPdfExport">
          Export PDF
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  content: {
    type: String,
    default: ''
  },
  showPdfExport: {
    type: Boolean,
    default: true
  },
  documentId: {
    type: String,
    default: 'default-doc' // Unique ID for each document
  }
})

const emit = defineEmits(['close', 'formDataCollected'])

const previewContent = ref(null)

// Generate storage key based on document ID
const getStorageKey = () => {
  return `froala-form-data-${props.documentId}`
}

const closeModal = () => {
  emit('close')
}

// Enable inputs in preview after mount
onMounted(() => {
  watch(() => props.isOpen, (isOpen) => {
    if (isOpen) {
      nextTick(() => {
        enableInputsInPreview()
        restoreFormData()
      })
    }
  }, { immediate: true })
})

const enableInputsInPreview = () => {
  if (!previewContent.value) return
  
  // Enable all input fields in preview
  const inputFields = previewContent.value.querySelectorAll('.fr-input-field')
  inputFields.forEach(field => {
    field.style.backgroundColor = '#ffffff'
    field.style.border = '2px solid #3b82f6'
    
    const input = field.querySelector('.fr-input-control')
    if (input) {
      input.style.pointerEvents = 'auto'
      input.style.opacity = '1'
      input.disabled = false
      
      // Add blur event listener to save data
      input.addEventListener('blur', saveFormData)
    }
  })
}

const saveFormData = () => {
  if (!previewContent.value) return
  
  const formData = {}
  const inputFields = previewContent.value.querySelectorAll('.fr-input-field')
  
  inputFields.forEach(field => {
    const fieldName = field.getAttribute('data-field-name')
    const input = field.querySelector('.fr-input-control')
    
    if (input && fieldName) {
      formData[fieldName] = input.value
    }
  })
  
  // Save to localStorage
  try {
    localStorage.setItem(getStorageKey(), JSON.stringify(formData))
    console.log('Form data saved to localStorage:', formData)
  } catch (error) {
    console.error('Error saving to localStorage:', error)
  }
}

const restoreFormData = () => {
  if (!previewContent.value) return
  
  try {
    const savedData = localStorage.getItem(getStorageKey())
    if (!savedData) return
    
    const formData = JSON.parse(savedData)
    const inputFields = previewContent.value.querySelectorAll('.fr-input-field')
    
    inputFields.forEach(field => {
      const fieldName = field.getAttribute('data-field-name')
      const input = field.querySelector('.fr-input-control')
      
      if (input && fieldName && formData[fieldName] !== undefined) {
        input.value = formData[fieldName]
      }
    })
    
    console.log('Form data restored from localStorage:', formData)
  } catch (error) {
    console.error('Error restoring from localStorage:', error)
  }
}

const clearFormData = () => {
  if (!previewContent.value) return
  
  // Confirm before clearing
  if (!confirm('Are you sure you want to clear all form data?')) {
    return
  }
  
  // Clear all input values
  const inputFields = previewContent.value.querySelectorAll('.fr-input-field')
  inputFields.forEach(field => {
    const input = field.querySelector('.fr-input-control')
    if (input) {
      input.value = ''
    }
  })
  
  // Remove from localStorage
  try {
    localStorage.removeItem(getStorageKey())
    console.log('Form data cleared from localStorage')
    alert('Form data cleared successfully!')
  } catch (error) {
    console.error('Error clearing localStorage:', error)
  }
}

const collectFormData = () => {
  if (!previewContent.value) return
  
  const formData = {}
  const inputFields = previewContent.value.querySelectorAll('.fr-input-field')
  
  inputFields.forEach(field => {
    const fieldName = field.getAttribute('data-field-name')
    const fieldId = field.getAttribute('data-field-id')
    const input = field.querySelector('.fr-input-control')
    
    if (input && fieldName) {
      formData[fieldName] = {
        id: fieldId,
        name: fieldName,
        value: input.value,
        type: input.getAttribute('data-input-type') || input.type
      }
    }
  })
  
  console.log('Collected Form Data:', formData)
  
  // Save one final time before emitting
  saveFormData()
  
  // Emit the collected data to parent component
  emit('formDataCollected', formData)
}

const printPreview = () => {
  const printWindow = window.open('', '_blank')
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Document Preview</title>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            line-height: 1.6; 
            margin: 20px; 
            color: #333;
          }
          img { max-width: 100%; height: auto; }
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
          .fr-input-field {
            background-color: #f9fafb;
            border: 2px solid #3b82f6;
            border-radius: 8px;
            padding: 16px;
            margin: 12px 0;
          }
          .fr-input-control {
            width: 100%;
            padding: 8px 12px;
            border: 1px solid #d1d5db;
            border-radius: 6px;
          }
          @media print {
            body { margin: 0; }
          }
        </style>
      </head>
      <body>
        ${props.content}
      </body>
    </html>
  `)
  printWindow.document.close()
  printWindow.print()
}

const exportAsPDF = () => {
  printPreview()
}

// Close modal on Escape key
onMounted(() => {
  const handleEscape = (e) => {
    if (e.key === 'Escape' && props.isOpen) {
      closeModal()
    }
  }
  document.addEventListener('keydown', handleEscape)
  
  onUnmounted(() => {
    document.removeEventListener('keydown', handleEscape)
  })
})
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-container {
  background: white;
  border-radius: 8px;
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #e5e7eb;
}

.modal-title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
}

.close-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: #6b7280;
  border-radius: 4px;
  transition: all 0.2s;
}

.close-button:hover {
  background-color: #f3f4f6;
  color: #374151;
}

.modal-body {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
}

.preview-content {
  line-height: 1.6;
  color: #374151;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.preview-content :deep(h1) {
  font-size: 2em;
  font-weight: 700;
  margin: 0.67em 0;
}

.preview-content :deep(h2) {
  font-size: 1.5em;
  font-weight: 600;
  margin: 0.75em 0;
}

.preview-content :deep(h3) {
  font-size: 1.25em;
  font-weight: 600;
  margin: 0.83em 0;
}

.preview-content :deep(p) {
  margin: 0.5em 0;
}

.preview-content :deep(.fr-text-box) {
  background-color: #E9F5FF;
  border: 2px solid #5B9BD5;
  border-radius: 8px;
  padding: 12px;
  margin: 8px 0;
}

/* Input field styles for preview - interactive */
.preview-content :deep(.fr-input-field) {
  background-color: #ffffff;
  border: 2px solid #3b82f6;
  border-radius: 8px;
  padding: 16px;
  margin: 12px 0;
  display: block;
}

.preview-content :deep(.fr-input-control) {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  font-family: inherit;
  background-color: white;
  transition: border-color 0.2s;
}

.preview-content :deep(.fr-input-control:focus) {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.preview-content :deep(.fr-input-control[data-input-type="textarea"]) {
  min-height: 80px;
  resize: vertical;
}

/* Other preview styles */
.preview-content :deep(h1),
.preview-content :deep(h2),
.preview-content :deep(h3),
.preview-content :deep(h4),
.preview-content :deep(h5),
.preview-content :deep(h6) {
  margin-top: 1.5em;
  margin-bottom: 0.5em;
  font-weight: 600;
}

.preview-content :deep(ul),
.preview-content :deep(ol) {
  margin-bottom: 1em;
  padding-left: 2em;
}

.preview-content :deep(blockquote) {
  border-left: 4px solid #e5e7eb;
  padding-left: 1em;
  margin: 1em 0;
  font-style: italic;
  color: #6b7280;
}

.preview-content :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
}

.preview-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 1em 0;
}

.preview-content :deep(th),
.preview-content :deep(td) {
  border: 1px solid #e5e7eb;
  padding: 8px 12px;
  text-align: left;
}

.preview-content :deep(th) {
  background-color: #f9fafb;
  font-weight: 600;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 20px 24px;
  border-top: 1px solid #e5e7eb;
  background-color: #f9fafb;
  border-radius: 0 0 8px 8px;
  flex-wrap: wrap;
}

.btn {
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;
  font-size: 14px;
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

.btn-primary {
  background-color: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

.btn-primary:hover {
  background-color: #2563eb;
  border-color: #2563eb;
}

.btn-success {
  background-color: #10b981;
  color: white;
  border-color: #10b981;
}

.btn-success:hover {
  background-color: #059669;
  border-color: #059669;
}

.btn-warning {
  background-color: #f59e0b;
  color: white;
  border-color: #f59e0b;
}

.btn-warning:hover {
  background-color: #d97706;
  border-color: #d97706;
}

/* Responsive */
@media (max-width: 768px) {
  .modal-container {
    margin: 10px;
    max-width: none;
  }
  
  .modal-header,
  .modal-body,
  .modal-footer {
    padding: 16px;
  }
  
  .modal-footer {
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
  }
}
</style>