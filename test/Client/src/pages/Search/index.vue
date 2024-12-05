<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { getAll } from '@/models/users' // Adjust import path as needed
import type { User } from '@/models/users'

// Reactive state
const users = ref<User[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const searchQuery = ref('')

// Fetch users on component mount
onMounted(async () => {
  try {
    const response = await getAll()
    if (response.isSuccess) {
      users.value = response.data || []
    } else {
      error.value = response.message || 'Failed to load users'
    }
  } catch (err) {
    error.value = 'An unexpected error occurred'
    console.error(err)
  } finally {
    loading.value = false
  }
})

// Filter users based on search query
const filteredUsers = computed(() => {
  const query = searchQuery.value.toLowerCase()
  return users.value.filter(user => 
    user.name.toLowerCase().includes(query) ||
    user.email.toLowerCase().includes(query)
  )
})

// Format date for better readability (for future use if needed)
const formatDate = (dateString: string): string => {
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch {
    return 'Unknown date'
  }
}
</script>

<template>
  <div class="container mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6 text-center text-gray-800">User Directory</h1>

    <!-- Search Bar -->
    <div class="mb-4 text-center">
      <p>search</p>
      <input
        v-model="searchQuery"
        type="text"
        placeholder="user name or email"
        class="w-full md:w-1/2 lg:w-1/3 p-3 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center">
      <p class="text-gray-600">Loading users...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="bg-red-100 p-4 rounded mb-6">
      <p class="text-red-600">{{ error }}</p>
    </div>

    <!-- Users Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="user in filteredUsers" 
        :key="user.id" 
        class="bg-white shadow-md rounded-lg p-6 hover:bg-gray-100 transition-all duration-300 ease-in-out"
      >
        <!-- User Profile Image -->
        <div class="flex justify-center mb-4">
          <img 
            :src="user.profile_image || '/default-avatar.png'" 
            :alt="user.name" 
            class="w-24 h-24 rounded-full object-cover"
          />
        </div>

        <!-- User Information -->
        <div class="text-center">
          <h2 class="text-xl font-semibold mb-2 text-gray-800">
            {{ user.name }}
          </h2>
          <p class="text-gray-600 mb-2">{{ user.email }}</p>
          <div class="flex justify-between text-sm text-gray-500">
            <span>Role: {{ user.role }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  color: #333;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.text-center {
  text-align: center;
}

.bg-red-100 {
  background-color: #fef2f2;
}

.bg-white {
  background-color: #ffffff;
}

.shadow-md {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.rounded-lg {
  border-radius: 10px;
}

.p-6 {
  padding: 24px;
}

.hover\:bg-gray-100:hover {
  background-color: #f7fafc;
}

.transition-all {
  transition: all 0.3s ease-in-out;
}

.duration-300 {
  transition-duration: 300ms;
}

.ease-in-out {
  transition-timing-function: ease-in-out;
}

.grid-cols-1 {
  grid-template-columns: 1fr;
}

.md\:grid-cols-2 {
  grid-template-columns: repeat(2, 1fr);
}

.lg\:grid-cols-3 {
  grid-template-columns: repeat(3, 1fr);
}

.gap-6 {
  gap: 24px;
}

.mb-4 {
  margin-bottom: 16px;
}

.mb-2 {
  margin-bottom: 8px;
}

.text-xl {
  font-size: 1.25rem;
  font-weight: 600;
}

.text-2xl {
  font-size: 1.5rem;
  font-weight: 700;
}

.font-semibold {
  font-weight: 600;
}

.text-gray-600 {
  color: #4a5568;
}

.text-gray-500 {
  color: #6b7280;
}

.text-red-600 {
  color: #e53e3e;
}

.w-24 {
  width: 96px;
}

.h-24 {
  height: 96px;
}

.rounded-full {
  border-radius: 9999px;
}

.object-cover {
  object-fit: cover;
}

.flex {
  display: flex;
}

.justify-center {
  justify-content: center;
}

.justify-between {
  justify-content: space-between;
}

.uppercase {
  text-transform: uppercase;
}

.letter-spacing {
  letter-spacing: 2px;
}

/* Modern search bar styling */
input[type="text"] {
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  transition: border-color 0.3s ease;
}

input[type="text"]:focus {
  border-color: #3182ce;
  outline: none;
}
</style>
