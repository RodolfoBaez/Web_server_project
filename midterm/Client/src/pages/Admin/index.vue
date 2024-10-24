<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { getAll, deleteUser as removeUser, type User } from '@/models/users'; // Adjust the import path as necessary
  import { useRoute } from 'vue-router';
  
  const props = defineProps<{
    currentUser: User; 
  }>();
  
  const route = useRoute();
const isAdmin = computed(() => props.currentUser && props.currentUser.id === 1); 
  
  const { data: initialUsers } = getAll();
  const userList = ref<User[]>(initialUsers);
  
  const handleDelete = (user: User) => {
    removeUser(user.id);
    userList.value = userList.value.filter(u => u.id !== user.id);
  };
  </script>
  
<template>
    <div v-if="isAdmin" class="admin-page">
      <h1>User Management</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Profile Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in userList" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>
              <img :src="user.profileImage" alt="User profile" class="profile-image" />
            </td>
            <td>
              <button @click="handleDelete(user)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <p>You do not have permission to access this page.</p>
    </div>
  </template>
  
  <style scoped>
  .admin-page {
    padding: 1rem;
  }
  
  .profile-image {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  </style>
  