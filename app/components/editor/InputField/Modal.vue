<template>
    <div 
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]"
      @click.self="handleCancel"
    >
      <div class="bg-white rounded-xl p-6 w-[90%] max-w-[500px] shadow-2xl">
        <h3 class="text-xl font-semibold text-slate-900 mb-5">
          Insert Input Field
        </h3>
  
        <div class="mb-4">
          <label class="block mb-2 font-medium text-slate-700">
            Field Label (Optional)
          </label>
          <input
            v-model="fieldLabel"
            type="text"
            placeholder="e.g., Full Name, Email Address..."
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            @keydown.enter="handleSubmit"
            ref="labelInput"
          />
        </div>
  
        <div class="mb-6">
          <label class="block mb-2 font-medium text-slate-700">
            Placeholder Text (Optional)
          </label>
          <input
            v-model="placeholder"
            type="text"
            placeholder="e.g., Enter your name..."
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            @keydown.enter="handleSubmit"
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
            Insert Field
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  
  const emit = defineEmits<{
    submit: [data: { placeholder: string; fieldLabel: string }]
    cancel: []
  }>()
  
  const placeholder = ref('')
  const fieldLabel = ref('')
  const labelInput = ref<HTMLInputElement | null>(null)
  
  onMounted(() => {
    labelInput.value?.focus()
  })
  
  const handleSubmit = () => {
    emit('submit', {
      placeholder: placeholder.value,
      fieldLabel: fieldLabel.value
    })
  }
  
  const handleCancel = () => {
    emit('cancel')
  }
  </script>