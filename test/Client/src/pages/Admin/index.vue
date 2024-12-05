<template>
  <div v-if="isAdmin">
    <h1>Admin - Manage Users</h1>

    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.role }}</td>
          <td>
            <!-- Delete button with confirmation dialog -->
            <button @click="confirmDelete(user.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Display a message if the user is not an admin -->
  <div v-else>
    <h2>You do not have permission to access this page.</h2>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';
import { getAll, remove, type User } from '@/models/users'; 
import { getUserRoleById } from '@/models/users'; 
import { deleteAllByUserId } from '@/models/posts'; 

export default {
  name: 'AdminPage',
  setup() {
    const users = ref<User[]>([]);
    const currentUser = ref<{ id: number; name: string; role: string } | null>(null);
    const isAdmin = ref(false);

    // Fetch current user from localStorage and determine if the user is an admin
    onMounted(async () => {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        currentUser.value = JSON.parse(storedUser); // Retrieve user from localStorage

        // Fetch the current user's role by their ID
        try {
          if (currentUser.value) {
            const role = await getUserRoleById(currentUser.value.id);
            isAdmin.value = role === 'admin'; // Set isAdmin based on the role fetched
          }
        } catch (error) {
          console.error('Error fetching user role:', error);
        }
      }

      // Fetch users after checking the role of the current user
      if (isAdmin.value) {
        try {
          const response = await getAll();
          users.value = response.data; // Assuming the response contains user data in 'data' field
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      }
    });

    // Function to confirm and delete the user
    const confirmDelete = (id: number) => {
      const confirmation = confirm('Are you sure you want to delete this user?');
      if (confirmation) {
        deleteUser(id);
      }
    };

    // Function to delete the user and their posts
    const deleteUser = async (id: number) => {
      try {
        // Delete all posts associated with the user first
        await deleteAllByUserId(id);

        // Now delete the user
        await remove(id); // Delete the user
        users.value = users.value.filter(user => user.id !== id); // Remove the deleted user from the list
        alert('User and their posts have been deleted successfully!');
      } catch (error) {
        console.error('Error deleting user and their posts:', error);
        alert('An error occurred while deleting the user and their posts.');
      }
    };

    return {
      users,
      currentUser,
      isAdmin,
      confirmDelete,
    };
  },
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 10px;
  text-align: left;
  border: 1px solid #ddd;
}

button {
  color: white;
  background-color: red;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

button:hover {
  background-color: darkred;
}
</style>
