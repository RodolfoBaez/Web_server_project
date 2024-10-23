
<script setup lang="ts">
import { ref, computed, watch, defineProps } from 'vue';
import { getAll as getAllPosts, type Post } from '@/models/posts';
import PostCard from '@/components/PostCard.vue';

const props = defineProps(['currentUser']); // Receive currentUser as prop

// Retrieve all posts
const allPosts = getAllPosts().data;

// Filter posts by the current user
const userPosts = computed(() => {
  if (props.currentUser) {
    return allPosts.filter((post: Post) => post.userId === props.currentUser.id);
  }
  return [];
});
</script>

<template>
    <div class="activity">
      <h1 class="title">Current User Activity</h1>
      
      <div v-if="currentUser" class="user-info">
        <img :src="currentUser.profileImage" alt="User profile" class="profile-image" />
        <h2>{{ currentUser.name }}</h2>
      </div>
  
      <div class="activity-shelf" v-if="currentUser && userPosts.length">
        <PostCard
          v-for="(post, index) in userPosts"
          :key="index"
          :post="post"
          :user="currentUser"
        />
      </div>
  
      <div v-else>
        <p v-if="!currentUser">Please select a user to see their activity.</p>
        <p v-else>No posts found for this user.</p>
      </div>
    </div>
  </template>
  
  <style scoped>
  .activity {
    padding: 2rem;
    text-align: center;
  }
  
  .user-info {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
  }
  
  .profile-image {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 10px;
  }
  
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

  </style>
  