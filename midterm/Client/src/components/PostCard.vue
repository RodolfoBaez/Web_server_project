<script setup lang="ts">
import type { Post } from '@/models/posts';
import type { User } from '@/models/users';

defineProps<{
  post: Post;
  user: User;
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
        <img :src="user.profileImage" alt="User profile image" class="profile-image" />
        <div>
          <p class="post-username">{{ user.name }}</p>
          <p class="post-views">👁 Views: {{ post.views }}</p>
          <p class="post-date">{{ formatDate(post.timestamp) }}</p>
        </div>
      </div>
      <button v-if="user.id === post.userId" @click="$emit('delete')" class="delete-btn">🗑️</button>

    </div>

    <h3>{{ post.title }}</h3>
    <div class="post-body">
      <p>{{ post.body }}</p>
      <img v-if="post.imageUrl" :src="post.imageUrl" alt="Post image" class="post-image" />
    </div>

    <div class="post-exercise-info">
      <p class="exercise-type">🏋️‍♂️ Exercise Type: {{ post.exerciseType }}</p>
      <p class="duration">⏳ Duration: {{ post.duration }} Minutes</p>
    </div>

    <div class="post-tags">
      <span v-for="(tag, index) in post.tags" :key="index" class="tag">{{ tag }}</span>
    </div>

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

.delete-btn {
  background: none;
  border: none;
  color: #d9534f;
  cursor: pointer;
  font-size: 1.5rem; 
  margin-right: 12px; 
}

.user-info {
  display: flex;
  align-items: center;
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

.post-date {
  font-size: 0.875rem;
  color: #6b7280;
  margin-top: 4px;
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

.exercise-type,
.duration {
  font-size: 0.875rem; 
  color: #6b7280; 
  margin-bottom: 4px;
}

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
