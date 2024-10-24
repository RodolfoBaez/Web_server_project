import { ref } from 'vue';
import { getAll as getAllPosts, type Post } from '@/models/posts';

const allPosts = ref<Post[]>(getAllPosts().data); 

// Function to get all posts
export const usePostsStore = () => {
  const getPosts = () => allPosts.value;

  const addPost = (post: Post) => {
    allPosts.value.push(post);
  };

  const deletePost = (postId: number) => {
    allPosts.value = allPosts.value.filter((post) => post.id !== postId);
  };

  // New function to delete all posts by a specific user
  const deletePostsByUserId = (userId: number) => {
    // Get all posts by userId
    const userPosts = allPosts.value.filter(post => post.userId === userId);

    // Delete each post by calling deletePost
    userPosts.forEach(post => {
      deletePost(post.id); // Delete using the deletePost method
    });
  };

  return {
    getPosts,
    addPost,
    deletePost,
    deletePostsByUserId, 
  };
};
