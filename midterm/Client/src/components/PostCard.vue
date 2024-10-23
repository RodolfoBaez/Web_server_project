<script setup lang="ts">
import type { Post } from '@/models/posts'
import type { User } from '@/models/users'

// Props to pass in post data and user data
defineProps<{
  post: Post,
  user: User
}>()
</script>

<template>
  <div class="post-card">
    <div class="post-header">
      <!-- Profile image and username -->
      <div class="user-info">
        <img :src="user.profileImageUrl" alt="User profile image" class="profile-image" />
        <div>
          <p class="post-username">{{ user.username }}</p>
          <p class="post-views">👁 Views: {{ post.views }}</p>
        </div>
      </div>
    </div>
    
    <!-- Post title and content -->
    <h3>{{ post.title }}</h3>
    <div class="post-body">
      <p>{{ post.body }}</p>
      <img v-if="post.imageUrl" :src="post.imageUrl" alt="Post image" class="post-image" />
    </div>

    <!-- Post tags -->
    <div class="post-tags">
      <span v-for="(tag, index) in post.tags" :key="index" class="tag">{{ tag }}</span>
    </div>

    <!-- Reactions -->
    <div class="post-reactions">
      <div class="reaction">
        <span class="reaction-icon">👍</span> {{ post.reactions.likes }}
      </div>
      <div class="reaction">
        <span class="reaction-icon">👎</span> {{ post.reactions.dislikes }}
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Container for the cards */
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between; 
}

/* Post card design */
.post-card {
  background-color: white;
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

/* User info - Profile image and username */
.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.profile-image {
  width: 48px; 
  height: 48px;
  border-radius: 50%; 
  object-fit: cover; 
  margin-right: 12px;
}

.post-username {
  font-weight: bold;
  color: #374151;
  font-size: 1rem;
}

.post-views {
  font-size: 0.875rem;
  color: #9ca3af;
}

/* Post header styling */
h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 12px;
}

/* Body content */
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

/* Post tags */
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

/* Reactions */
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

/* Media query for mobile responsiveness */
@media (max-width: 600px) {
  .post-card {
    width: 100%; 
    margin: 12px 0;
  }

  .profile-image {
    width: 40px; 
    height: 40px;
  }
}
</style>
