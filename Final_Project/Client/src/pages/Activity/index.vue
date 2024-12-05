<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { getAll, remove } from '@/models/posts'; // Importing from posts.ts
import PostCard from '@/components/PostCard.vue';
import PostForm from '@/components/PostForm.vue';
import type { Posts } from '@/models/posts'; 

const props = defineProps(['currentUser']);

const userPosts = ref<Posts[]>([]);
const showForm = ref(false);
const createdPost = ref<Posts | null>(null); 

// Fetch user posts based on logged-in user's ID
const fetchUserPosts = async () => {
  if (props.currentUser) {
    try {
      const response = await getAll(); // Fetch all posts
      const posts = response.data;
      userPosts.value = posts.filter((post: Posts) => post.userId === props.currentUser.id)
                              .sort((a: Posts, b: Posts) => Date.parse(b.timestamp) - Date.parse(a.timestamp));
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }
};

// Call fetchUserPosts on component mount
onMounted(() => {
  fetchUserPosts();
});

const handlePostSubmission = (postData: Posts) => {
  createdPost.value = postData;
  userPosts.value.unshift(postData); 
  showForm.value = false;
};

// Updated deletePost method to call the remove function from posts.ts
const deletePost = async (postId: number) => {
  try {
    await remove(postId); // Delete post via API
    userPosts.value = userPosts.value.filter(post => post.id !== postId); // Remove from local state
  } catch (error) {
    console.error('Error deleting post:', error); // Handle error if needed
  }
};
</script>

<template>
  <div class="activity">
    <div v-if="currentUser" class="user-info">
      <img :src="currentUser.profileImage" alt="User profile" class="profile-image" />
      <h2>{{ currentUser.name }}</h2>
    </div>

    <button v-if="currentUser" @click="showForm = true" class="create-post-btn">Create Post</button>

    <PostForm
      v-if="showForm"
      :currentUser="currentUser"
      :isVisible="showForm"
      @close="showForm = false"
      @submit="handlePostSubmission"
    />

    <div class="activity-shelf">
      <template v-if="userPosts.length">
        <PostCard
          v-for="(post, index) in userPosts"
          :key="index"
          :post="post"
          :user="currentUser"  
          :currentUser="currentUser" 
          @delete="deletePost(post.id)"
        />
      </template>
      <template v-else>
        <p>No posts found for this user.</p>
      </template>
    </div>

    <div v-if="!currentUser">
      <p>Please select a user to see their activity.</p>
    </div>
  </div>
</template>

<style scoped>
.user-info {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1.5rem 0;
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

.create-post-btn {
  padding: 0.5rem 1rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-bottom: 1.5rem;
}

.create-post-btn:hover {
  background-color: #45a049;
}
</style>
