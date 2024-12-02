<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref, computed } from 'vue';
import { usePostsStore } from '@/store/posts'; // Import the posts store
import PostCard from '@/components/PostCard.vue';
import PostForm from '@/components/PostForm.vue';
import type { Post } from '@/models/posts';

const props = defineProps(['currentUser']);
const postsStore = usePostsStore(); // Get access to the posts store

const userPosts = computed(() => {
  if (props.currentUser) {
    return postsStore.getPosts()
      .filter((post: Post) => post.userId === props.currentUser.id)
      .sort((a: Post, b: Post) => Date.parse(b.timestamp) - Date.parse(a.timestamp));
  }
  return [];
});

const showForm = ref(false);
const createdPost = ref<Post | null>(null); 

const handlePostSubmission = (postData: Post) => {
  createdPost.value = postData;
  postsStore.addPost(postData); 
  showForm.value = false;
};

const deletePost = (postId: number) => {
  postsStore.deletePost(postId); 
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
