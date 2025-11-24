<template>
  <div>
    <section class="flex align-middle my-4 gap-6 p-4s">
      <h1 class="text-3xl ml-36">My Document Editor</h1>

      <div class="actions ml-auto">
        <button
          class="btn btn-primary"
          @click="openPreviewModal"
          :disabled="!content.trim()"
        >
          Preview Document
        </button>
        <button class="btn btn-secondary ml-3" @click="saveDocument">
          Save Document
        </button>
      </div>
    </section>
    <ClientOnly>
      <template #default>
        <div class="docs-layout">
          <div class="header">
            <ul class="breadcrumbs">
            <li> Survey Course </li>
              <li>
                <span class="separator">❯</span>
              ELA</li>
              <li>
                <span class="separator">❯</span>
                Othello's Renaissance
              </li>
            </ul>

            <h1 class="step-name" style="margin: 0">
              Segment : Quotable Connections
            </h1>
          </div>
        
          <FroalaEditor
            v-model="content"
            :config="froalaConfig"
            editor-id="my-document-editor"
            storage-key="my-document-1"
            :auto-save="true"
          />
        </div>
      </template>

      <template #fallback>
        <div class="loading-placeholder">Loading editor...</div>
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
import PrevIcon from "@/assets/icons/chevron-right.svg?component";
const content = ref("<p>Start writing your document...</p>");
const isPreviewModalOpen = ref(false);
console.log("content", content)
const froalaConfig = {
  documentReady: true,
  height: 500,
  placeholderText: "Start writing your document...",
};

const openPreviewModal = () => {
  if (content.value && content.value.trim()) {
    isPreviewModalOpen.value = true;
  }
};

const closePreviewModal = () => {
  isPreviewModalOpen.value = false;
};

const saveDocument = () => {
  // Implement your save logic here
  console.log("Saving document:", content.value);
  // You could save to localStorage, send to API, etc.
  localStorage.setItem("froala-document", content.value);
  alert("Document saved!");
};

// Load saved content on mount
onMounted(() => {
  const saved = localStorage.getItem("froala-document");
  if (saved) {
    content.value = saved;
  }
});
</script>

<style scoped>
.docs-layout {
  height: 100vh;
  overflow-y: auto;
  padding: 0;
  margin: 0;
}

.fr-box,
.fr-wrapper,
.fr-element {
  width: 100% !important;
  max-width: 100% !important;
  margin: 0 auto !important;
  padding: auto 0;
  margin-top: 50px !important;
}
.fr-toolbar {
  position: sticky !important;
  top: 70px !important; /* equal to header height */
  z-index: 999 !important;
  background: white !important;
  border-bottom: 1px solid #ddd;
}

.fr-wrapper {
 margin-top: 50px; /* equal to toolbar height */
}

.fr-toolbar {
  background-color: white;
  border-bottom: 1px solid #ddd;
}

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

.unit-name {
  display: flex;
  align-items: center; /* Aligns items vertically center */
  gap: 10px; /* Space between icon and text */
  font-size: 20px;
  color: #757575;
  font-family: "Inter", sans-serif;
  margin: 0;
  margin-bottom: 8px !important;
}

/* Ensure the SVG icon has a proper size */
.unit-name svg {
  width: 20px;
  height: 20px;
  flex-shrink: 0; /* Prevents the icon from shrinking */
}
.step-name {
  font-size: 32px;
  font-family: "Inter", sans-serif;
  margin: 0;
  margin-bottom: 0px !important;
}
.lesson-name {
  font-size: 24px;
  font-family: "Inter", sans-serif;
  margin: 0;
  margin-bottom: 8px !important;
}
.header {
position: sticky !important;
top: 0 !important;
z-index: 100 !important;
  padding:32px;
 
  padding-left: 24px !important;
 padding-bottom: 16px !important;
  background-color: white;
}
.unit-name svg {
  fill: #757575; /* Same as your text color */
}
.unit-name-text {
  padding-left: 4px !important;
}
.breadcrumbs {
  display: flex;
  align-items: center;
  padding: 0;
  margin: 0;
  list-style: none;
  font-family: Arial, sans-serif;
}

.breadcrumbs li {
  display: flex;
  align-items: center;
  font-size: 18px;
  color: #757575;
}

.breadcrumbs .separator {
  margin: 0 8px;
  color: #757575;
  font-size: 14px;
}
</style>
