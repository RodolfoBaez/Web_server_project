import { ref } from 'vue';
import { getAll as getAllPosts, type Post } from '@/models/posts';

const allPosts = ref<Post[]>(getAllPosts().data); // Store all posts here

// Function to get all posts
export const usePostsStore = () => {
  const getPosts = () => allPosts.value;

  const addPost = (post: Post) => {
    allPosts.value.push(post);
  };

  const deletePost = (postId: number) => {
    allPosts.value = allPosts.value.filter((post) => post.id !== postId);
  };

  return {
    getPosts,
    addPost,
    deletePost,
  };
};
