<template>
    <div 
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]"
      @click.self="handleCancel"
    >
      <div class="bg-white rounded-xl p-6 w-[90%] max-w-[600px] shadow-2xl">
        <h3 class="text-xl font-semibold text-slate-900 mb-5">
          Create Flashcard
        </h3>
  
        <div class="mb-4">
          <label class="block mb-2 font-medium text-slate-700">
            Question
          </label>
          <textarea
            v-model="question"
            rows="3"
            placeholder="Enter the question or prompt..."
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
            ref="questionInput"
          />
        </div>
  
        <div class="mb-6">
          <label class="block mb-2 font-medium text-slate-700">
            Answer
          </label>
          <textarea
            v-model="answer"
            rows="4"
            placeholder="Enter the answer..."
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
          />
        </div>
  
        <div class="flex gap-3 justify-end">
          <button
            @click="handleCancel"
            class="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            @click="handleSubmit"
            class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors font-medium"
          >
            Insert Flashcard
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  
  const emit = defineEmits<{
    submit: [data: { question: string; answer: string }]
    cancel: []
  }>()
  
  const question = ref('')
  const answer = ref('')
  const questionInput = ref<HTMLTextAreaElement | null>(null)
  
  onMounted(() => {
    questionInput.value?.focus()
  })
  
  const handleSubmit = () => {
    if (!question.value.trim() || !answer.value.trim()) {
      alert('Both question and answer are required')
      return
    }
  
    emit('submit', {
      question: question.value,
      answer: answer.value
    })
  }
  
  const handleCancel = () => {
    emit('cancel')
  }
  </script>