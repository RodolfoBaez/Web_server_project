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
  if (user.id === 1) {
    alert("You cannot delete the admin user.");
    return;
  }
  removeUser(user.id);
  userList.value = userList.value.filter(u => u.id !== user.id);
};
</script>

<template>
  <div v-if="isAdmin" class="admin-page">
    <h1>User Management</h1>
    <table class="modern-table">
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
            <button class="delete-btn" @click="handleDelete(user)" :disabled="user.id === 1">
              Delete
            </button>
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
  padding: 1.5rem;
  max-width: 900px;
  margin: 0 auto;
  background-color: #f9fafb;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
  font-size: 2rem;
  font-weight: bold;
}

.modern-table {
  width: 100%;
  border-collapse: collapse;
}

.modern-table th, .modern-table td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.modern-table th {
  background-color: #007bff;
  color: white;
  font-weight: bold;
}

.modern-table tr:hover {
  background-color: #f1f1f1;
}

.profile-image {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.delete-btn {
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s;
}

.delete-btn:hover {
  background-color: #e60000;
}

.delete-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .admin-page {
    padding: 1rem;
  }

  .modern-table th, .modern-table td {
    padding: 10px;
  }
}
</style>
