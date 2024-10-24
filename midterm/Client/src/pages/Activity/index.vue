<script setup lang="ts">
import { ref, computed } from 'vue';
import { getAll as getAllPosts, type Post } from '@/models/posts';
import PostCard from '@/components/PostCard.vue';
import PostForm from '@/components/PostForm.vue';

const props = defineProps(['currentUser']);
const allPosts = ref(getAllPosts().data); 

const userPosts = computed(() => {
  if (props.currentUser) {
    return allPosts.value
      .filter((post: Post) => post.userId === props.currentUser.id)
      .sort((a: Post, b: Post) => Date.parse(b.timestamp) - Date.parse(a.timestamp));
  }
  return [];
});

const showForm = ref(false);
const createdPost = ref<Post | null>(null); 

const handlePostSubmission = (postData: Post) => {
  createdPost.value = postData;
  allPosts.value.push(postData);
  showForm.value = false;
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

    <div class="activity-shelf" v-if="currentUser && userPosts.length">
      <PostCard
        v-for="(post, index) in userPosts"
        :key="index"
        :post="post"
        :user="currentUser"
      />
    </div>

    <div v-else>
      <p v-if="!currentUser">Please select a user to see their activity.</p>
      <p v-else>No posts found for this user.</p>
    </div>
  </div>
</template>

<style scoped>
.user-info {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  margin-top: 1.5rem;
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
