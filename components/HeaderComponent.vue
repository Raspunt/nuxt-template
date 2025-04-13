<template>
    <header class="relative w-full mx-auto flex flex-col items-center p-6 text-[#005F5B] bg-white">
      <!-- Аватар пользователя в правом верхнем углу -->
      <div v-if="isAuthenticated" class="absolute top-6 right-6" x-data="{ open: false }">
        <button @click="open = !open" class="flex items-center space-x-2 focus:outline-none">
          <img src="~/assets/images/user.png" alt="Avatar" class="w-9 h-9 rounded-full object-cover border border-gray-300">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
  
        <div v-if="open" @click="open = false" class="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-2 text-sm">
          <nuxt-link to="/profile" class="block px-4 py-2 hover:bg-gray-100">Мой профиль</nuxt-link>
          <nuxt-link to="/notifications" class="block px-4 py-2 hover:bg-gray-100">Уведомления</nuxt-link>
          <nuxt-link to="/chats" class="block px-4 py-2 hover:bg-gray-100">Чаты</nuxt-link>
          <a @click="logout" class="block w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer">Выйти</a>
        </div>
      </div>
  
      <!-- Название и описание -->
      <nuxt-link to="/" class="text-center mb-4">
        <h1 class="text-3xl font-bold">RenTas</h1>
        <p class="text-sm text-gray-600">RenTas — аренда без риска</p>
      </nuxt-link>
  
      <!-- Навигация -->
      <nav class="flex space-x-6 border border-gray-300 px-6 py-2 rounded-full shadow-sm backdrop-blur-md">
        <nuxt-link v-if="isAuthenticated" to="/create-rental" class="text-[#005F5B] hover:text-[#007580] transition">Создать объявление</nuxt-link>
        <nuxt-link to="/shop" class="text-[#005F5B] hover:text-[#007580] transition">Магазин объявлений</nuxt-link>
        <nuxt-link to="/contracts" class="text-[#005F5B] hover:text-[#007580] transition">Договора</nuxt-link>
        <nuxt-link to="/about" class="text-[#005F5B] hover:text-[#007580] transition">О нас</nuxt-link>
        <nuxt-link v-if="!isAuthenticated" to="/auth/login" class="text-[#005F5B] hover:text-[#007580] transition">Войти</nuxt-link>
      </nav>
    </header>
  </template>
  
  <script>
  export default {
    data() {
      return {
        open: false,
        isAuthenticated: false // Здесь должна быть логика проверки авторизации
      };
    },
    methods: {
      logout() {
        this.isAuthenticated = false;
        this.$router.push('/login');
      }
    },
  };
  </script>
  
  <style scoped>
  /* Дополнительные стили, если нужно */
  </style>