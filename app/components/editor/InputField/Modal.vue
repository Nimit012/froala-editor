<template>
  <div 
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]"
    @click.self="handleCancel"
  >
    <div class="bg-white rounded-xl p-6 w-[90%] max-w-[800px] shadow-2xl max-h-[90vh] overflow-y-auto">
      <h3 class="text-xl font-semibold text-slate-900 mb-5">
        Insert Input Field
      </h3>

      <!-- Radio Buttons for Input Type -->
      <div class="mb-6">
        <label class="block mb-3 font-medium text-slate-700">
          Field Type
        </label>
        <div class="flex gap-6">
          <label class="flex items-center cursor-pointer">
            <input
              type="radio"
              v-model="inputType"
              value="single"
              class="w-4 h-4 text-blue-500 focus:ring-2 focus:ring-blue-500"
            />
            <span class="ml-2 text-slate-700">Single Line</span>
          </label>
          <label class="flex items-center cursor-pointer">
            <input
              type="radio"
              v-model="inputType"
              value="multi"
              class="w-4 h-4 text-blue-500 focus:ring-2 focus:ring-blue-500"
            />
            <span class="ml-2 text-slate-700">Multi Line</span>
          </label>
        </div>
      </div>

      <!-- Placeholder Text -->
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
          ref="placeholderInput"
        />
      </div>

      <!-- Fixed height container to prevent shifting -->
      <div class="mb-6 min-h-[280px]">
        <!-- Multi Line Options -->
        <div v-if="inputType === 'multi'" class="space-y-6">
          <!-- Size Settings Section -->
          <div>
      
            <div class="space-y-4">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block mb-2 font-medium text-slate-700">
                    Min Rows
                  </label>
                  <input
                    v-model.number="minRows"
                    type="number"
                    min="1"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label class="block mb-2 font-medium text-slate-700">
                    Max Rows
                  </label>
                  <input
                    v-model.number="maxRows"
                    type="number"
                    min="1"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label class="block mb-2 font-medium text-slate-700">
                  Max Words
                </label>
                <input
                  v-model.number="maxWords"
                  type="number"
                  min="1"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <!-- Advanced Options Section -->
          <div>
    
            <div class="grid grid-cols-2 gap-x-6 gap-y-3">
              <label class="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  v-model="enableFormatting"
                  class="w-4 h-4 text-blue-500 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span class="ml-2 text-slate-700">Enable Basic Formatting</span>
              </label>

              <label class="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  v-model="allowImageUpload"
                  class="w-4 h-4 text-blue-500 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span class="ml-2 text-slate-700">Allow Image Upload</span>
              </label>

              <label class="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  v-model="spellChecker"
                  class="w-4 h-4 text-blue-500 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span class="ml-2 text-slate-700">Spell Checker</span>
              </label>

              <label class="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  v-model="disablePaste"
                  class="w-4 h-4 text-blue-500 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span class="ml-2 text-slate-700">Disable Paste</span>
              </label>
            </div>
          </div>
        </div>

        <!-- Single Line Options -->
        <div v-if="inputType === 'single'">
          <div class="grid grid-cols-2 gap-6">
            <div>
              <label class="block mb-2 font-medium text-slate-700">
                Input Type
              </label>
              <select 
                v-model="singleLineType"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="text">Text</option>
                <option value="email">Email</option>
                <option value="number">Number</option>
                <option value="tel">Phone</option>
                <option value="url">URL</option>
              </select>
            </div>

            <div class="flex items-end pb-2">
              <label class="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  v-model="spellChecker"
                  class="w-4 h-4 text-blue-500 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span class="ml-2 text-slate-700">Spell Checker</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
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

type InputType = 'single' | 'multi'

const emit = defineEmits<{
  submit: [data: { 
    placeholder: string
    inputType: InputType
    singleLineType?: string
    minRows?: number
    maxRows?: number
    maxWords?: number
    enableFormatting?: boolean
    allowImageUpload?: boolean
    spellChecker?: boolean
    disablePaste?: boolean
  }]
  cancel: []
}>()

const placeholder = ref('')
const inputType = ref<InputType>('single')
const placeholderInput = ref<HTMLInputElement | null>(null)

// Multi-line options
const minRows = ref(3)
const maxRows = ref(10)
const maxWords = ref(1000)
const enableFormatting = ref(false)
const allowImageUpload = ref(false)
const disablePaste = ref(false)

// Single-line options
const singleLineType = ref('text')

// Shared option
const spellChecker = ref(true)

onMounted(() => {
  placeholderInput.value?.focus()
})

const escapeHTML = (str: string) => {
  return str
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

const handleSubmit = () => {
  const baseData = {
    placeholder: escapeHTML(placeholder.value),
    inputType: inputType.value,
    spellChecker: spellChecker.value
  }

  if (inputType.value === 'multi') {
    emit('submit', {
      ...baseData,
      minRows: minRows.value,
      maxRows: maxRows.value,
      maxWords: maxWords.value,
      enableFormatting: enableFormatting.value,
      allowImageUpload: allowImageUpload.value,
      disablePaste: disablePaste.value
    })
  } else {
    emit('submit', {
      ...baseData,
      singleLineType: singleLineType.value
    })
  }
}

const handleCancel = () => {
  emit('cancel')
}
</script>