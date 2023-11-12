<template>
  <div class="book-details-page">
    <div class="header">
      <h1>Détails du livre</h1>
      <router-link to="/" class="back-link">Retour à la liste</router-link>
    </div>

    <div v-if="book">
      <div class="book-info" v-if="book.title">
        <img :src="book.image" alt="" />
        <div class="details">
          <h2>{{ book.title }}</h2>
          <p>Auteur: {{ book.author }}</p>
          <p>Note: {{ book.rating }}/5</p>
          <p>Résumé: {{ book.summary }}</p>
          <p>Avis: {{ book.review }}</p>
          <p>Catégorie: {{ book.category }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import api from '../helpers/Api';
const route = useRoute();
const book = ref(null);

onMounted(async () => {
  console.log('book:', book.value);

  try {
    const bookId = route.params.id;
    const {data: _book} = await api.get(`/v1/books/${bookId}`);
    book.value = _book;
  } catch (error) {
    console.error('Erreur lors de la récupération des détails du livre', error);
  }
});
</script>

<style scoped lang="scss">
/* ... styles ... */
</style>
