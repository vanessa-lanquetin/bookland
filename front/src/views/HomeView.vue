 <template>
<div class="book-page">
<div class="header">
<h1>Recherche de livres</h1>
<button class="buttonAdd" @click="addBook"><i class="fas fa-plus"></i></button>
</div>

<div class="search-container">
<label for="book-search">Rechercher un livre</label>
<div class="search-input">
<input
type="text"
id="book-search"
placeholder="Entrez le titre ou l'auteur du livre"
v-model="userSearchBook"
/>
<div class="search-results" v-show="searchResults.length > 0">
<div class="book-card" v-for="(book, index) in searchResults" :key="index" @click="goToBookPage(book.id)">
<img :src="book.image" alt="" />
<div class="book-details">
<h2>{{ book.title }}</h2>
<p>{{ book.author }}</p>
</div>
</div>
</div>
</div>
</div>

<div class="book-list">
<div class="book-card" v-for="(book, index) in books" :key="index">
<img :src="book.image" alt="" />
<h2>{{ book.title }}</h2>
<p>{{ book.author }}</p>
<button @click="deleteBook(index)">Supprimer</button>
<button @click="goToBookPage(book.id)">Détails</button>
</div>
</div>

<modal ref="addBookModal" width="90%">
<template #header="">
Ajout d'un nouveau livre
</template>
<template #body="">
<div>
<form id="book-form" @submit.prevent="submitBook">
<label for="book-title">Titre du livre</label>
<input type="text" id="book-title" required v-model="newBook.title" />

<label for="book-author">Auteur du livre</label>
<input type="text" id="book-author" required v-model="newBook.author" />

<label for="book-rating">Note</label>
<input type="number" id="book-rating" min="1" max="5" v-model="newBook.rating" />

<label for="book-summary">Résumé</label>
<textarea id="book-summary" v-model="newBook.summary"></textarea>

<label for="book-review">Avis</label>
<textarea id="book-review" v-model="newBook.review"></textarea>

<label for="book-category">Catégorie</label>
<input type="text" id="book-category" v-model="newBook.category" />

<label for="book-image">Image du livre</label>
<input type="file" id="book-image" @change="handleImageUpload" />

</form>
</div>
</template>
</modal>
</div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { v4 as uuid } from 'uuid';
import Book from '../models/Book';
import Modal from '../components/Modal.vue';
import { useRouter } from 'vue-router';

const newBook = ref(new Book({}));
const books = ref([]);
const addBookModal = ref();
const router = useRouter();

onMounted(() => {
const lsBooks = localStorage.getItem('books');
books.value = lsBooks && lsBooks !== 'undefined' ? JSON.parse(lsBooks) : [];
});

const addBook = async () => {
addBookModal.value.open().subscribe((res) => {
if (!res) {
newBook.value = new Book({});
return;
}
newBook.value.id = uuid();
books.value.push(newBook.value);
newBook.value = new Book({});
localStorage.setItem('books', JSON.stringify(books.value));
});
};

let userSearchBook = ref('');
let searchResults = ref([]);

watch(userSearchBook, (new_value) => {
searchResults.value = books.value
  .filter((book) =>
    (book.title && book.title.toLowerCase().includes(new_value.toLowerCase())) ||
    (book.author && book.author.toLowerCase().includes(new_value.toLowerCase()))
  )
  .slice(0, 5);

});

const handleImageUpload = (event) => {
const file = event.target.files[0];
if (file) {
const reader = new FileReader();
reader.onloadend = () => {
newBook.value.image = reader.result;
};
reader.readAsDataURL(file);
}
};

const submitBook = () => {
books.value.push(newBook.value);
newBook.value = new Book({});
localStorage.setItem('books', JSON.stringify(books.value));
addBookModal.value.close();
};

const goToBookPage = (bookId) => {
router.push(`/books/${bookId}`);
};
const deleteBook = (index) => {
// Supprimer le livre du tableau
books.value.splice(index, 1);

// Mettre à jour la sauvegarde locale
localStorage.setItem('books', JSON.stringify(books.value));
};
</script>

<style scoped lang="scss">
.book-page {
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
max-width: 800px;
margin: 80px auto;
padding: 30px;
}

.header {
display: flex;
align-items: center;
width: 100%;
justify-content: space-between;
margin-bottom: 20px;

h1 {
font-size: 24px;
margin: 0;
}

.buttonAdd {
background-color: #4caf50;
color: white;
border: none;
padding: 10px 20px;
font-size: 16px;
cursor: pointer;
border-radius: 5px;
}
}

.search-container {
width: 100%;
margin-bottom: 20px;

label {
display: block;
margin-bottom: 10px;
font-size: 18px;
}

.search-input {
position: relative;
width: 100%;

input {
width: 100%;
padding: 10px;
margin-bottom: 10px;
font-size: 16px;
border: 1px solid #ccc;
border-radius: 5px;

&:focus + .search-results {
display: block;
}
}

.search-results {
display: none;
position: absolute;
top: 100%;
left: 0;
width: 100%;
background-color: #fff;
border: 1px solid #ccc;
border-radius: 5px;
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
z-index: 1;

.book-card {
display: flex;
align-items: center;
padding: 10px;
border-bottom: 1px solid #ccc;

img {
width: 40px;
height: 60px;
margin-right: 10px;
}

.book-details {
h2 {
margin: 0;
font-size: 16px;
}

p {
margin: 0;
color: #666;
}
}
}
}
}
}

.book-list {
display: flex;
flex-wrap: wrap;
gap: 20px;

.book-card {
border: 1px solid #ccc;
padding: 10px;
border-radius: 5px;
width: calc(33.33% - 20px);
margin-bottom: 20px;

img {
width: 100%;
height: auto;
border-radius: 5px;
}

h2 {
margin-top: 10px;
font-size: 18px;
}

p {
color: #666;
}
}
}

</style>