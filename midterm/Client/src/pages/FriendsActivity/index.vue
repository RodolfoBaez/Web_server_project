<script setup lang="ts">
import { ref } from 'vue'
import { getAll, type Post } from '@/models/posts' 
import PostCard from '@/components/PostCard.vue'

const posts = ref<Post[]>([])
const displayedPosts = ref<Post[]>([])
const allPosts = getAll().data

displayedPosts.value = allPosts.slice(0, 6)

async function loadMore() {
  const currentLength = displayedPosts.value.length
  const nextPosts = allPosts.slice(currentLength, currentLength + 6)
  await new Promise(resolve => setTimeout(resolve, 500))
  displayedPosts.value = [...displayedPosts.value, ...nextPosts]
}
</script>

<template>
  <div class="activity-shelf">
    <PostCard v-for="post in displayedPosts" :key="post.id" :post="post" />
  </div>
  <div class="load-more-container" v-if="displayedPosts.length < allPosts.length">
    <button class="load-more" @click="loadMore">
      Load More
    </button>
  </div>
</template>

<style scoped>
/* Container for the post cards */
.activity-shelf {
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* Center the cards */
  gap: 1.5rem; /* Add space between cards */
  padding: 1rem; /* Add padding around the shelf */
}

/* Post card layout: Two per row on larger screens */
.activity-shelf .post-card {
  flex: 1 1 calc(50% - 2rem); /* Two cards per row with a gap */
  max-width: 500px; /* Ensure cards don't get too wide */
  height: auto; /* Auto height to accommodate variable content */
}

/* Load more button container */
.load-more-container {
  display: flex;
  justify-content: center;
  margin: 16px 0;
}

/* Styling for the Load More button */
.load-more {
  padding: 12px 24px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.load-more:hover {
  background-color: #0056b3;
}

/* Responsive design: One card per row on small screens */
@media (max-width: 768px) {
  .activity-shelf .post-card {
    flex: 1 1 100%; /* One card per row on small screens */
  }
}
</style>
