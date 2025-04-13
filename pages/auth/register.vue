<template>
    <div class="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="p-6 shadow-md rounded-lg w-full max-w-md">
        <form class="space-y-6" @submit.prevent="handleSubmit">
          <!-- Переключатель физ / юр лицо -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Тип пользователя</label>
            <select v-model="userType" @change="updateFields"
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <option value="PHYSICAL">Физическое лицо</option>
              <option value="LEGAL">Юридическое лицо</option>
            </select>
          </div>
  
          <!-- Динамические поля -->
          <BaseInput
                v-for="field in fields"
                :id="field.id"
                :key="field.id"
                :label="field.label"
                :type="field.type || 'text'"
                :placeholder="field.placeholder"
                :required="field.required"
                :minlength="field.minlength"
                :modelValue="field.model.value"
                @update:model-value="val => field.model.value = val"
            />

  
          <button 
            type="submit" 
            :disabled="loading"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <span v-if="loading" class="animate-spin mr-2">⏳</span>
            Зарегистрироваться
          </button>
  
          <p v-if="error" class="text-red-500 text-sm text-center">{{ error }}</p>
        </form>
      </div>
  
      <div class="text-center mt-4">
        <nuxt-link to="/auth/login" class="text-indigo-600 hover:underline text-sm">
          Уже есть аккаунт?
        </nuxt-link>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, onMounted } from 'vue'
  import BaseInput from '~/components/BaseInput.vue'
  
  const email = ref('')
  const firstName = ref('')
  const secondName = ref('')
  const lastName = ref('')
  const password1 = ref('')
  const password2 = ref('')
  const companyName = ref('')
  const bin = ref('')
  const legalAddress = ref('')
  const userType = ref('PHYSICAL') 
  
  const fields = ref<unknown[]>([])
  const loading = ref(false)
  const error = ref('')
  
  const updateFields = () => {
    const baseFields = [
      { id: 'email', label: 'Email', type: 'email', required: true, model: email },
      { id: 'firstName', label: 'Имя', model: firstName },
      { id: 'secondName', label: 'Отчество', model: secondName },
      { id: 'lastName', label: 'Фамилия', model: lastName },
      { id: 'password1', label: 'Пароль', type: 'password', required: true, minlength: 8, model: password1 },
      { id: 'password2', label: 'Повторите пароль', type: 'password', required: true, minlength: 8, model: password2 }
    ]
  
    if (userType.value === 'LEGAL') {
      baseFields.push(
        { id: 'companyName', label: 'Название компании', model: companyName },
        { id: 'bin', label: 'БИН', model: bin },
        { id: 'legalAddress', label: 'Юридический адрес', model: legalAddress }
      )
    }
  
    fields.value = baseFields
  }
  
  // 🔄 Вызываем при старте
  onMounted(updateFields)
  
  // 📤 Отправка формы
  const handleSubmit = async () => {
    loading.value = true
    error.value = ''
  
    try {
      await $fetch('/api/auth/register', {
        method: 'POST',
        body: {
          email: email.value,
          firstName: firstName.value,
          secondName: secondName.value,
          lastName: lastName.value,
          password1: password1.value,
          password2: password2.value,
          userType: userType.value,
          companyName: userType.value === 'LEGAL' ? companyName.value : null,
          bin: userType.value === 'LEGAL' ? bin.value : null,
          legalAddress: userType.value === 'LEGAL' ? legalAddress.value : null
        }
      })
      await navigateTo('/dashboard')
    } catch (err: any) {
      error.value = err.data?.message || 'Ошибка регистрации. Попробуйте снова.'
    } finally {
      loading.value = false
    }
  }
  </script>
  