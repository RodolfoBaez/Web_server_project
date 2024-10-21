<script setup lang="ts">
import type { Post } from '@/models/posts'
defineProps<{
  post: Post
}>()
</script>

<template>
  <div class="post-card">
    <div class="post-header">
      <h3>{{ post.title }}</h3>
      <p>By {{ post.username }}</p>
      <p>Views: {{ post.views }}</p>
    </div>
    <div class="post-body">
      <p>{{ post.body }}</p>
      <img v-if="post.imageUrl" :src="post.imageUrl" alt="Post image" class="post-image" />
    </div>
    <div class="post-tags">
      <span v-for="(tag, index) in post.tags" :key="index" class="tag">{{ tag }}</span>
    </div>
    <div class="post-reactions">
      <p>Likes: {{ post.reactions.likes }}</p>
      <p>Dislikes: {{ post.reactions.dislikes }}</p>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap; 
  justify-content: space-between; /* Space between cards */
}

.post-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin: 16px;
  background-color: #f9f9f9;
  width: calc(50% - 32px); /* Two cards per row with margins */
  display: flex;
  flex-direction: column; 
  justify-content: space-between; /* Distribute space evenly */
  overflow: hidden; /* Prevent overflow */
  box-sizing: border-box; /* Include padding and border in width and height */
}

.post-header {
  margin-bottom: 8px;
}

.post-body {
  flex-grow: 1; 
  margin: 8px 0;
  overflow: hidden; /* Prevent overflow from text */
}

.post-image {
  width: 100%; /* Make the image fit the card width */
  height: auto; /* Allow height to adjust based on content */
  max-height: 200px; /* Set a max height for images */
  object-fit: contain; /* Maintain aspect ratio and fit within the box */
  border-radius: 4px; /* Rounded corners for images */
  margin-top: 8px; /* Space between body text and image */
}

.post-tags {
  margin: 8px 0;
}

.tag {
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  padding: 4px 8px;
  margin-right: 4px;
}

.post-reactions {
  margin-top: 8px;
  font-weight: bold;
}

@media (max-width: 600px) {
  .post-card {
    width: 100%; /* Full width on smaller screens */
    height: auto; /* Allow height to adjust */
  }
}
</style>
