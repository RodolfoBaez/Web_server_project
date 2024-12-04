<template>
  <div class="posts-container">
    <!-- Display loading state while fetching posts -->
    <div v-if="loading" class="loading-message">
      Loading posts...
    </div>

    <!-- Display posts when fetched -->
    <div v-else>
      <div v-for="post in posts" :key="post.id" class="post-card">
        <h3>{{ post.title }}</h3>
        <p>{{ post.body }}</p>
        <p><strong>Tags:</strong> {{ post.tags.join(', ') }}</p>
        <p><strong>Reactions:</strong> Likes: {{ post.reactions.likes }} | Dislikes: {{ post.reactions.dislikes }}</p>
        <p><strong>Views:</strong> {{ post.views }} | <strong>Duration:</strong> {{ post.duration }} minutes</p>
        <img :src="post.imageUrl" alt="Post Image" class="post-image" />
        <p><small>{{ post.timestamp }}</small></p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getAll } from '@/models/posts'; // Import the getAll function to fetch posts
import type { Posts } from '@/models/posts'; // Import the Posts interface for typing
 // Import the Posts interface for typing

// Ref to store posts data
const posts = ref<Posts[]>([]);
// Ref to handle loading state
const loading = ref(true);

// Fetch posts when the component is mounted
onMounted(async () => {
  try {
    const response = await getAll();
    posts.value = response.data; // Assuming the API response has a 'data' field that contains posts
  } catch (error) {
    console.error("Error fetching posts:", error);
  } finally {
    loading.value = false; // Stop loading after the request completes
  }
});
</script>

<style scoped>
.posts-container {
  padding: 20px;
  max-width: 900px;
  margin: 0 auto;
}

.post-card {
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.post-card h3 {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.post-card p {
  font-size: 1rem;
  margin: 5px 0;
}

.post-card .post-image {
  max-width: 100%;
  height: auto;
  margin-top: 10px;
}

.loading-message {
  text-align: center;
  font-size: 1.2rem;
  color: #007bff;
}
</style>
