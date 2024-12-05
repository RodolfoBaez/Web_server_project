<script setup lang="ts">
import type { Posts } from '@/models/posts';
import type { User } from '@/models/users';

defineProps<{
  post: Posts;
  user: User;
  currentUser: User;
}>();

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};
</script>

<template>
  <div class="post-card">
    <div class="post-header">
      <div class="user-info">
        <img :src="user.profile_image" alt="User Profile Image" class="profile-image" />
        <div>
          <p class="post-username">{{ user.name }}</p>
          <p class="post-date">{{ formatDate(post.timestamp) }}</p>
        </div>
      </div>
      <p class="post-views">{{ post.views }} Views</p>
    </div>
    
    <h3>{{ post.title }}</h3>
    
    <div class="post-body">
      <p>{{ post.body }}</p>
      <img v-if="post.imageUrl" :src="post.imageUrl" alt="Post Image" class="post-image" />
    </div>
    
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
</template>

<style scoped>
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

@media (max-width: 600px) {
  .post-card {
    width: 100%;
    margin: 12px 0;
  }
}
</style>