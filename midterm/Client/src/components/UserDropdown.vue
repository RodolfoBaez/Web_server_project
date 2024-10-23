<!-- src/components/UserDropdown.vue -->
<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, defineEmits } from 'vue';
import { RouterLink } from 'vue-router';
import { getAll as getAllUsers, type User } from '@/models/users';  

const isDropdownOpen = ref(false);
const users = ref<User[]>(getAllUsers().data);
const emit = defineEmits(['user-logged-in']); // Emit an event for the logged-in user

const userList = computed(() => {
  return users.value.map(user => ({
    id: user.id,
    name: user.username,
    profileImage: user.profileImageUrl || 'path/to/default/image.png'
  }));
});

const closeDropdown = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (!target.closest('.dropdown')) {
    isDropdownOpen.value = false;
  }
};

const selectUser = (user: { id: number, name: string, profileImage: string }) => {
  emit('user-logged-in', user); // Emit the selected user to the Navbar
  isDropdownOpen.value = false; // Close the dropdown after selecting a user
};

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
        <div
          v-for="user in userList"
          :key="user.id"
          class="dropdown-item"
          @click="selectUser(user)"  
        >
          <img :src="user.profileImage" alt="User profile" class="profile-image" />
          <span>{{ user.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
