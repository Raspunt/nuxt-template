<template>
  <div class="flex flex-col min-h-screen">
    <!-- Header -->
    <header class="bg-blue-600 text-white py-4">
      <div class="container mx-auto flex justify-between items-center px-4">
        <NuxtLink to="/" class="text-xl font-bold text-white">🚀 MyNuxtApp</NuxtLink>
        <nav>
          <NuxtLink to="/" class="text-white hover:text-gray-200 transition duration-200 mr-4">Главная</NuxtLink>
        </nav>
      </div>
    </header>

    <!-- Page content -->
    <main class="flex-grow container mx-auto py-6 px-4">
      <NuxtPage />
    </main>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-4 text-center mt-auto">
      <div class="container mx-auto px-4">
        &copy; {{ new Date().getFullYear() }} MyNuxtApp. Все права защищены.
      </div>
    </footer>
  </div>
</template>