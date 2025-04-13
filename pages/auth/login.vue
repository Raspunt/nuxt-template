<template>
    <div class="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="p-6 shadow-md rounded-lg w-full max-w-md " >
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Введите email</label>
            <input 
              type="email" 
              id="email" 
              v-model="email" 
              required
              placeholder="example@email.com"
              class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
          </div>
  
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Введите пароль</label>
            <input 
              type="password" 
              id="password" 
              v-model="password" 
              required
              minlength="8"
              class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
          </div>
  
          <button 
            type="submit" 
            :disabled="loading"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <span v-if="loading" class="animate-spin mr-2">⏳</span>
            Войти
          </button>
  
          <p v-if="error" class="text-red-500 text-sm text-center">{{ error }}</p>
        </form>
      </div>

      <div class="text-center">
      <nuxt-link to="/auth/register" class="text-indigo-600 hover:underline text-sm">
        Не зарегистрированы?
      </nuxt-link>
    </div>


    </div>
  </template>
  
  <script lang="ts">
  
  export default {
    name: 'LoginForm',
    setup() {
      const email = ref('')
      const password = ref('')
      const loading = ref(false)
      const error = ref('')
  
      const handleSubmit = async () => {
        loading.value = true
        error.value = ''
  
        try {
          const response = await $fetch('/api/auth/login', {
            method: 'POST',
            body: {
              email: email.value,
              password: password.value
            }
          })
  
          if (response.success) {
            await navigateTo('/dashboard') 
          }
        } catch (err: any) {
          error.value = err.data?.message || 'Ошибка входа. Попробуйте снова.'
        } finally {
          loading.value = false
        }
      }
  
      return {
        email,
        password,
        handleSubmit,
        loading,
        error
      }
    }
  }
  </script>