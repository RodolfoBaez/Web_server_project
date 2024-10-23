<script setup lang="ts">
import { ref, computed } from 'vue'
import { getAll as getAllPosts, type Post } from '@/models/posts' 
import { getAll as getAllUsers, type User } from '@/models/users' 
import PostCard from '@/components/PostCard.vue'

// Retrieve all posts and users
const allPosts = getAllPosts().data
const allUsers = getAllUsers().data;

// State to manage displayed posts
const displayedPosts = ref<Post[]>([])

// Load the first 4 posts initially
displayedPosts.value = allPosts.slice(0, 4)

// Function to load more posts
function loadMore() {
  const currentLength = displayedPosts.value.length
  const nextPosts = allPosts.slice(currentLength, currentLength + 4)
  displayedPosts.value = [...displayedPosts.value, ...nextPosts]
}

// Create an array of posts with user details
const postsWithUserDetails = computed(() => {
  return displayedPosts.value.map((post: Post) => {
    const user = allUsers.find((user: User) => user.id === post.userId);
    return {
      post,
      user: user || { id: -1, name: 'Unknown', profileImage: '' } 
    };
  });
});
</script>

<template>
  <div class="activity-shelf">
    <PostCard
      v-for="(item, index) in postsWithUserDetails"
      :key="index"
      :post="item.post"
      :user="item.user"
    />
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
  gap: 1.5rem; 
  padding: 1rem; 
}

.activity-shelf .post-card {
  flex: 1 1 calc(50% - 2rem); 
  max-width: 500px; 
  height: auto; 
}

.load-more-container {
  display: flex;
  justify-content: center;
  margin: 16px 0;
}

.load-more {
  padding: 12px 24px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
  margin-bottom: 1rem;
}

.load-more:hover {
  background-color: #0056b3;
}

@media (max-width: 768px) {
  .activity-shelf .post-card {
    flex: 1 1 100%; 
  }
}
</style>
