<template>
  <div class="book-details-page">
    <div class="header">
      <h1>Détails du livre</h1>
      <router-link to="/" class="back-link">Retour à la liste</router-link>
    </div>

    <div v-if="selectedBook">
      <div class="book-info" v-if="selectedBook.title">
        <img :src="selectedBook.image" alt="" />
        <div class="details">
          <h2>{{ selectedBook.title }}</h2>
          <p>Auteur: {{ selectedBook.author }}</p>
          <p>Note: {{ selectedBook.rating }}/5</p>
          <p>Résumé: {{ selectedBook.summary }}</p>
          <p>Avis: {{ selectedBook.review }}</p>
          <p>Catégorie: {{ selectedBook.category }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter,useRoute } from 'vue-router';
import axios from 'axios';
const router = useRouter();
const route = useRoute();
const selectedBook = ref(null);

onMounted(async () => {
  console.log('selectedBook:', selectedBook.value);

  try {
    const bookId = route.params.id;
    console.log('ID du livre:', bookId);

    const response = await axios.get(`/api/books/${bookId}`);
    console.log('Réponse de l\'API:', response.data);
    
    selectedBook.value = response.data;
    console.log('selectedBook:', selectedBook.value);

  } catch (error) {
    console.error('Erreur lors de la récupération des détails du livre', error);
  }
});
</script>

<style scoped lang="scss">
/* ... styles ... */
</style>
