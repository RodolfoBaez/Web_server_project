<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="posts-container">
    <!-- Display loading state while fetching posts -->
    <div v-if="loading" class="loading-message">
      Loading posts...
    </div>

    <!-- Display posts when fetched -->
    <div v-else class="posts-grid">
      <div v-for="post in enrichedPosts" :key="post.id" class="post-card">
        <div class="post-header">
          <div class="user-info">
            <img :src="post.user.profile_image || ''" alt="User Profile Image" class="profile-image" />
            <div>
              <p class="post-username">{{ post.user.name }}</p>
              <p class="post-date">{{ post.timestamp }}</p>
            </div>
          </div>
          <p class="post-views">{{ post.views }} Views</p>
        </div>
        
        <h3>{{ post.title }}</h3>
        <p class="post-body">{{ post.body }}</p>
        
        <img :src="post.imageUrl" alt="Post Image" class="post-image" />
        
        <div class="post-tags">
          <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
        
        <div class="post-reactions">
          <div class="reaction">
            <span class="reaction-icon">👍</span>
            {{ post.reactions.likes }} Likes
          </div>
          <div class="reaction">
            <span class="reaction-icon">👎</span>
            {{ post.reactions.dislikes }} Dislikes
          </div>
        </div>
        
        <div class="post-exercise-info">
          Duration: {{ post.duration }} minutes
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { getAll as getAllPosts } from '@/models/posts';
import { getAll as getAllUsers } from '@/models/users';
import type { Posts } from '@/models/posts';
import type { User } from '@/models/users';

// Ref to store posts data
const posts = ref<Posts[]>([]);
// Ref to store users data
const users = ref<User[]>([]);
// Ref to handle loading state
const loading = ref(true);

// Computed property to enrich posts with user data
const enrichedPosts = computed(() => {
  return posts.value.map((post) => {
    const user = users.value.find((user) => user.id === post.userId);
    return {
      ...post,
      user: user || { name: 'Unknown', profile_image: '' }, // Match 'profile_image'
    };
  });
});

// Fetch posts and users when the component is mounted
onMounted(async () => {
  try {
    const [postsResponse, usersResponse] = await Promise.all([getAllPosts(), getAllUsers()]);
    posts.value = postsResponse.data; // Assuming API response has 'data'
    users.value = usersResponse.data; // Assuming API response has 'data'
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    loading.value = false; // Stop loading after the request completes
  }
});
</script>

<style scoped>
.posts-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.posts-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.post-card {
  background-color: #f9fafb;
  border-radius: 12px;
  padding: 20px;
  margin: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: calc(50% - 32px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-sizing: border-box;
}

.post-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.post-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.user-info {
  display: flex;
  align-items: center;
}

.profile-image {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.post-username {
  font-weight: bold;
  color: #374151;
  font-size: 1rem;
  margin: 0;
}

.post-views {
  font-size: 0.875rem;
  color: #9ca3af;
}

.post-date {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 4px 0 0;
}

h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 12px;
  color: #1f2937;
}

.post-body {
  flex-grow: 1;
  margin: 16px 0;
  color: #374151;
}

.post-image {
  width: 100%;
  height: auto;
  max-height: 250px;
  object-fit: cover;
  border-radius: 8px;
  margin-top: 12px;
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  margin: 12px 0;
}

.tag {
  background-color: #3b82f6;
  color: white;
  border-radius: 20px;
  padding: 6px 12px;
  font-size: 0.875rem;
  margin-right: 8px;
  margin-bottom: 8px;
}

.post-reactions {
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
}

.reaction {
  display: flex;
  align-items: center;
  font-weight: 500;
  color: #6b7280;
}

.reaction-icon {
  margin-right: 4px;
}

.post-exercise-info {
  margin: 12px 0;
  color: #374151;
}

.loading-message {
  text-align: center;
  font-size: 1.2rem;
  color: #007bff;
}

@media (max-width: 600px) {
  .post-card {
    width: 100%;
    margin: 12px 0;
  }
}
</style>