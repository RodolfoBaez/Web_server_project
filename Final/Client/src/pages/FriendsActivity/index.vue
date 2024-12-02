<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/no-side-effects-in-computed-properties -->
<script setup lang="ts">
import { ref, computed } from 'vue';
import { getAll as getAllPosts, type Post } from '@/models/posts'; 
import { getAll as getAllUsers, type User } from '@/models/users'; 
import PostCard from '@/components/PostCard.vue'; 
import { usePostsStore } from '@/store/posts'; 

const postsStore = usePostsStore(); 
const allPosts = postsStore.getPosts(); 
const allUsers = getAllUsers().data;

// Current user prop 
const props = defineProps<{
  currentUser: User;
}>();

// Initialize displayed posts
const displayedPosts = ref<Post[]>([]);
const postsPerLoad = 4;

// Filter posts that have valid user data (non-empty name and profile image)
const filteredPosts = computed(() => {
  return allPosts.filter(post => {
    const user = allUsers.find(user => user.id === post.userId);
    return user && user.name && user.profileImage; // Only return posts with valid user info
  });
});

const sortedPosts = computed(() => {
  return filteredPosts.value.sort((a: Post, b: Post) => Date.parse(b.timestamp) - Date.parse(a.timestamp));
});

// This computed property returns all posts, including the current user's posts
const allUserPosts = computed(() => {
  return sortedPosts.value; 
});

// Function to load initial posts
const loadInitialPosts = () => {
  const initialPosts = allUserPosts.value.slice(0, postsPerLoad);
  displayedPosts.value = initialPosts;
};

// Function to load more posts
const loadMore = () => {
  const currentLength = displayedPosts.value.length;
  const nextPosts = allUserPosts.value.slice(currentLength, currentLength + postsPerLoad);
  displayedPosts.value = [...displayedPosts.value, ...nextPosts];
};

// Handle post deletion
const deletePost = (postId: number) => {
  postsStore.deletePost(postId); 
  displayedPosts.value = displayedPosts.value.filter(post => post.id !== postId);
};

loadInitialPosts();
</script>

<template>
  <div class="activity-shelf">
    <PostCard
      v-for="(post, index) in displayedPosts"
      :key="index"
      :post="post"
      :user="allUsers.find(user => user.id === post.userId) || { id: -1, name: 'Unknown', profileImage: '' }" 
      :currentUser="props.currentUser" 
      @delete="deletePost(post.id)"
    />
  </div>
  <div class="load-more-container" v-if="displayedPosts.length < allUserPosts.length">
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
