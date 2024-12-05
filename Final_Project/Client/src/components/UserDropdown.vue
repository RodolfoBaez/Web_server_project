<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, defineEmits } from 'vue';
import { getAll as getAllUsers, type User } from '@/models/users';

const isDropdownOpen = ref(false);
const users = ref<User[]>([]); // Initialize with an empty array
const emit = defineEmits(['user-logged-in']);

// Load users when the component is mounted
onMounted(async () => {
  try {
    const response = await getAllUsers(); // Await the promise
    users.value = response.data; // Assign the resolved data to the ref
  } catch (error) {
    console.error('Failed to fetch users:', error);
  }
});

const userList = computed(() => {
  return users.value.map(user => ({
    id: user.id,
    name: user.name,
    profileImage: user.profile_image || 'path/to/default/image.png'
  }));
});

const closeDropdown = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (!target.closest('.dropdown')) {
    isDropdownOpen.value = false;
  }
};

const selectUser = (user: { id: number, name: string, profileImage: string }) => {
  emit('user-logged-in', user);
  isDropdownOpen.value = false;
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
