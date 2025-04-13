<template>
  <div class="flex flex-col min-h-screen">
    <HeaderComponent />

    <main class="flex-grow container mx-auto py-6 px-4">
      <NuxtPage />
    </main>

    <FooterComponent/>
  </div>
</template>

<script>
// Импорт компонента HeaderComponent
import HeaderComponent from '~/components/HeaderComponent.vue';
import FooterComponent from '~/components/FooterComponent.vue';


export default {
  components: {
    HeaderComponent,
    FooterComponent
  },
};
</script>