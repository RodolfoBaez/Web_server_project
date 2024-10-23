<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { RouterLink } from 'vue-router';
import { getAll as getAllUsers, type User } from '@/models/users';  

const isDropdownOpen = ref(false);

// Fetch user data
const users = ref<User[]>(getAllUsers().data);

// Computed property to handle user display in dropdown
const userList = computed(() => {
  return users.value.map(user => ({
    id: user.id,
    name: user.username,
    profileImage: user.profileImageUrl || 'path/to/default/image.png' // Use a default image if none is available
  }));
});

// Close dropdown if clicked outside
const closeDropdown = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (!target.closest('.dropdown')) {
    isDropdownOpen.value = false;
  }
};

// Listen for clicks outside of dropdown
onMounted(() => {
  window.addEventListener('click', closeDropdown);
});

onBeforeUnmount(() => {
  window.removeEventListener('click', closeDropdown);
});
</script>

<template>
  <div class="dropdown is-hoverable">
    <div class="dropdown-trigger">
      <div class="button is-light" @click="isDropdownOpen = !isDropdownOpen">
        Log in
      </div>
    </div>
    <div class="dropdown-menu" :class="{ 'is-active': isDropdownOpen }">
      <div class="dropdown-content">
        <RouterLink
          v-for="user in userList"
          :key="user.id"
          :to="`/UserProfile/${user.id}`"  
          class="dropdown-item"
        >
          <img :src="user.profileImage" alt="User profile" class="profile-image" />
          <span>{{ user.name }}</span>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dropdown {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  right: 0;
  top: -10px;
  background-color: white;
  border: 1px solid #ccc;
  z-index: 1000;
  margin-top: 3rem;
}

.dropdown-content {
  max-height: 200px;
  overflow-y: auto;
}

.dropdown-item {
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
}

.dropdown-item img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
}

.dropdown-item:hover {
  background-color: #f0f0f0;
}
</style>
