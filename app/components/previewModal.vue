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
          <div class="preview-content" v-html="content"></div>
        </div>
        
        <div class="modal-footer">
          <button class="btn btn-secondary" @click="closeModal">
            Close
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
    }
  })
  
  const emit = defineEmits(['close'])
  
  const closeModal = () => {
    emit('close')
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
    // You can integrate with libraries like jsPDF or html2pdf
    // For now, we'll trigger the print dialog which allows "Save as PDF"
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

  
  /* Style the preview content */
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
  
  .preview-content :deep(p) {
    margin-bottom: 0em;
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