<template>
    <div class="space-y-1">
      <label :for="id" class="block text-sm font-medium text-gray-700">{{ label }}</label>
      <input
        :id="id"
        v-model="modelValue"
        :type="type"
        :placeholder="placeholder"
        :required="required"
        :minlength="minlength"
        class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        @input="$emit('update:model-value', $event.target.value)"
      >
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    id: string
    label: string
    type?: string
    placeholder?: string
    required?: boolean
    minlength?: number
    modelValue: string | number
  }>();

  

  
  
  defineEmits(['update:model-value'])
  </script>
  