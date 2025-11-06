<!-- pages/author/flashcard.vue -->
<template>
    <div class="container mx-auto py-8">
      
      <FlashcardForm 
        :upload-endpoint="'/api/upload-image'"
        @submit="handleSubmit" 
        @cancel="handleCancel"
      />
      
      <!-- Preview section -->
      <div v-if="flashcardHtml" class="mt-8">
        <h2 class="text-2xl font-semibold mb-4">Preview</h2>
        <div v-html="flashcardHtml"></div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import FlashcardForm from '~/components/editor/Flashcard/Form.vue'
  import { generateFlashcardHtml } from '~/components/editor/Flashcard/Template'
  
  const flashcardHtml = ref('')
  
  function handleSubmit(data: any) {
    flashcardHtml.value = generateFlashcardHtml(data)
    
    // TODO: Save to database
    console.log('Flashcard created:', data)
    
    // Optional: Show success message
    alert('Flashcard created successfully!')
  }
  
  function handleCancel() {
    navigateTo('/')
  }
  </script>