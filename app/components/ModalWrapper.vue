<template>
  <div 
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4"
    @click.self="handleCancel"
  >
    <div
      class="bg-white rounded-xl w-full max-h-[90vh] flex flex-col shadow-2xl"
      :class="maxWidth"
    >
      <slot />
    </div>
  </div>
  
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  maxWidth?: string
}>(), {
  maxWidth: 'max-w-4xl'
})

const emit = defineEmits<{ cancel: [] }>()

function handleCancel() {
  emit('cancel')
}
</script>


