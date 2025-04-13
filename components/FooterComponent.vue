<template>
    <footer class="bg-gray-900 text-white py-4 text-center mt-auto">
      <div class="container mx-auto px-4">
        © {{ currentYear }} MyNuxtApp. Все права защищены.
        <div class="mt-2 text-sm text-gray-400">
          <nuxt-link to="/terms" class="hover:text-gray-300">Условия использования</nuxt-link> | 
          <nuxt-link to="/privacy" class="hover:text-gray-300">Политика конфиденциальности</nuxt-link>
        </div>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    data() {
      return {
        currentYear: new Date().getFullYear(),
      };
    },
  };
  </script>
  
  <style scoped>
  /* Дополнительные стили, если нужны */
  </style>