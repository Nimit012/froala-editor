<template>
  <div 
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]"
    @click.self="handleCancel"
  >
    <div class="bg-white rounded-xl p-6 w-[90%] max-w-[900px] shadow-2xl max-h-[90vh] overflow-y-auto">
      <h3 class="text-2xl font-semibold text-slate-900 mb-2">
        Insert Input Field
      </h3>
      <p class="text-slate-600 mb-6">Configure your input field with the options below</p>

      <!-- Field Type Selection -->
      <div class="mb-8 p-4 bg-slate-50 rounded-lg">
        <label class="block mb-3 font-semibold text-slate-900">
          Field Type
        </label>
        <div class="flex gap-4">
          <label class="flex items-center cursor-pointer px-4 py-3 bg-white rounded-lg border-2 transition-all" 
            :class="inputType === 'single' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'">
            <input
              type="radio"
              v-model="inputType"
              value="single"
              class="w-4 h-4 text-blue-500"
            />
            <span class="ml-3 font-medium text-slate-900">Single Line</span>
          </label>
          <label class="flex items-center cursor-pointer px-4 py-3 bg-white rounded-lg border-2 transition-all"
            :class="inputType === 'multi' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'">
            <input
              type="radio"
              v-model="inputType"
              value="multi"
              class="w-4 h-4 text-blue-500"
            />
            <span class="ml-3 font-medium text-slate-900">Multi Line</span>
          </label>
        </div>
      </div>

      <!-- Placeholder Text -->
      <div class="mb-8">
        <label class="block mb-2 font-semibold text-slate-900">
          Placeholder Text
        </label>
        <p class="text-sm text-slate-600 mb-3">Optional hint text shown inside the field when empty</p>
        <input
          v-model="placeholder"
          type="text"
          placeholder="e.g., Enter your name..."
          class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          @keydown.enter="handleSubmit"
          ref="placeholderInput"
        />
      </div>

      <!-- Single Line Options -->
      <div v-if="inputType === 'single'" class="space-y-6">
        <div class="p-4 bg-slate-50 rounded-lg">
          <label class="block mb-2 font-semibold text-slate-900">
            Input Type
          </label>
          <p class="text-sm text-slate-600 mb-3">Choose what kind of data this field will collect</p>
          <select 
            v-model="singleLineType"
            class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="text">Text</option>
            <option value="email">Email</option>
            <option value="number">Number</option>
            <option value="tel">Phone</option>
            <option value="url">URL</option>
          </select>
        </div>

        <!-- Spell Checker Toggle -->
        <div class="flex items-start justify-between p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
          <div class="flex-1 pr-4">
            <h4 class="font-semibold text-slate-900 mb-1">Spell Checker</h4>
            <p class="text-sm text-slate-600">Automatically checks spelling as users type</p>
          </div>
          <button
            @click="spellChecker = !spellChecker"
            :class="spellChecker ? 'bg-blue-500' : 'bg-gray-300'"
            class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex-shrink-0"
          >
            <span
              :class="spellChecker ? 'translate-x-6' : 'translate-x-1'"
              class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
            />
          </button>
        </div>
      </div>

      <!-- Multi Line Options -->
      <div v-if="inputType === 'multi'" class="space-y-6">
        <!-- Size Configuration -->
        <div class="p-4 bg-slate-50 rounded-lg space-y-4">
          <div>
            <h4 class="font-semibold text-slate-900 mb-1">Size Configuration</h4>
            <p class="text-sm text-slate-600 mb-4">Control the dimensions and capacity of the text area</p>
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block mb-2 font-medium text-slate-900">
                Min Rows
              </label>
              <input
                v-model.number="minRows"
                type="number"
                min="1"
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label class="block mb-2 font-medium text-slate-900">
                Max Rows
              </label>
              <input
                v-model.number="maxRows"
                type="number"
                min="1"
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label class="block mb-2 font-medium text-slate-900">
              Max Words
            </label>
            <input
              v-model.number="maxWords"
              type="number"
              min="1"
              class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <!-- Feature Toggles -->
        <div class="space-y-3">
          <!-- Enable Formatting -->
          <div class="flex items-start justify-between p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
            <div class="flex-1 pr-4">
              <h4 class="font-semibold text-slate-900 mb-1">Basic Formatting</h4>
              <p class="text-sm text-slate-600">Allow users to apply bold, italic, and basic text styling</p>
            </div>
            <button
              @click="enableFormatting = !enableFormatting"
              :class="enableFormatting ? 'bg-blue-500' : 'bg-gray-300'"
              class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex-shrink-0"
            >
              <span
                :class="enableFormatting ? 'translate-x-6' : 'translate-x-1'"
                class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
              />
            </button>
          </div>

          <!-- Image Upload -->
          <div class="flex items-start justify-between p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
            <div class="flex-1 pr-4">
              <h4 class="font-semibold text-slate-900 mb-1">Image Upload</h4>
              <p class="text-sm text-slate-600">Enable users to attach or paste images directly into the field</p>
            </div>
            <button
              @click="allowImageUpload = !allowImageUpload"
              :class="allowImageUpload ? 'bg-blue-500' : 'bg-gray-300'"
              class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex-shrink-0"
            >
              <span
                :class="allowImageUpload ? 'translate-x-6' : 'translate-x-1'"
                class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
              />
            </button>
          </div>

          <!-- Spell Checker -->
          <div class="flex items-start justify-between p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
            <div class="flex-1 pr-4">
              <h4 class="font-semibold text-slate-900 mb-1">Spell Checker</h4>
              <p class="text-sm text-slate-600">Automatically checks spelling as users type</p>
            </div>
            <button
              @click="spellChecker = !spellChecker"
              :class="spellChecker ? 'bg-blue-500' : 'bg-gray-300'"
              class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex-shrink-0"
            >
              <span
                :class="spellChecker ? 'translate-x-6' : 'translate-x-1'"
                class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
              />
            </button>
          </div>

          <!-- Disable Paste -->
          <div class="flex items-start justify-between p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
            <div class="flex-1 pr-4">
              <h4 class="font-semibold text-slate-900 mb-1">Disable Paste</h4>
              <p class="text-sm text-slate-600">Prevent users from pasting content, requiring manual input instead</p>
            </div>
            <button
              @click="disablePaste = !disablePaste"
              :class="disablePaste ? 'bg-blue-500' : 'bg-gray-300'"
              class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex-shrink-0"
            >
              <span
                :class="disablePaste ? 'translate-x-6' : 'translate-x-1'"
                class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
              />
            </button>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex gap-3 justify-end mt-8 pt-6 border-t border-gray-200">
        <button
          @click="handleCancel"
          class="px-5 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
        >
          Cancel
        </button>
        <button
          @click="handleSubmit"
          class="px-5 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium shadow-sm"
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