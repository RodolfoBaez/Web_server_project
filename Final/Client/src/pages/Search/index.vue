<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="search-page">
      <h1>Search Users</h1>
      <input
        v-model="searchQuery"
        class="search-input"
        type="text"
        placeholder="Search for a user..."
      />
  
      <div v-if="filteredUsers.length > 0" class="user-list">
        <div v-for="user in filteredUsers" :key="user.id" class="user-card">
          <h2>{{ user.name }}</h2>
          <img :src="user.profileImage" alt="Profile Image" class="profile-image" />
  
          <div class="stats">
            <p><strong>Workout Days:</strong> {{ getWorkoutDays(user.id) }}</p>
            <p><strong>Total Posts:</strong> {{ getPostCount(user.id) }}</p>
            <p><strong>Likes:</strong> {{ getLikes(user.id) }}</p>
            <p><strong>Dislikes:</strong> {{ getDislikes(user.id) }}</p>
          </div>
        </div>
      </div>
  
      <div v-else>
        <p>No users found.</p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue';
  import { getAll as getAllUsers, type User } from '@/models/users';
  import { getAll as getAllPosts, type Post } from '@/models/posts';
  
  // Fetch users and posts data
  const allUsers = getAllUsers().data;
  const allPosts = getAllPosts().data;
  
  // Search query for filtering users
  const searchQuery = ref<string>('');
  
  // Filter users based on search input
  const filteredUsers = computed(() => {
    if (!searchQuery.value) {
      return allUsers;
    }
    return allUsers.filter(user => user.name.toLowerCase().includes(searchQuery.value.toLowerCase()));
  });
  
  // Helper function to get workout days for a user
  const getWorkoutDays = (userId: number) => {
    const userPosts = allPosts.filter(post => post.userId === userId);
    const uniqueDays = new Set(userPosts.map(post => post.timestamp.split('T')[0]));
    return uniqueDays.size;
  };
  
  // Helper function to get the total post count for a user
  const getPostCount = (userId: number) => {
    return allPosts.filter(post => post.userId === userId).length;
  };
  
  // Helper function to get total likes for a user
  const getLikes = (userId: number) => {
    return allPosts
      .filter(post => post.userId === userId)
      .reduce((total, post) => total + post.reactions.likes, 0);
  };
  
  // Helper function to get total dislikes for a user
  const getDislikes = (userId: number) => {
    return allPosts
      .filter(post => post.userId === userId)
      .reduce((total, post) => total + post.reactions.dislikes, 0);
  };
  </script>
  
  <style scoped>
  .search-page {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .search-input {
    width: 100%;
    padding: 12px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .user-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .user-card {
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
  
  .profile-image {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
  }
  
  .stats {
    margin-top: 10px;
  }
  
  .stats p {
    margin: 5px 0;
  }
  </style>
  