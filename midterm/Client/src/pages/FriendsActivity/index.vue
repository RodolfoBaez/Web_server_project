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
  await new Promise(resolve => setTimeout(resolve, 500));
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
.activity-shelf {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}

.activity-shelf .post-card {
  flex: 0 0 calc(50% - 1rem); 
  height: 400px; 
}

.load-more-container {
  display: flex;
  justify-content: center;
  margin: 16px 0;
}

.load-more {
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-bottom:1rem;
}

.load-more:hover {
  background-color: #0056b3;
}
</style>
