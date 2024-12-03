import { ref, onMounted } from 'vue';
import { getAll as getAllPosts, type Posts } from '@/models/posts';

export const usePostsStore = () => {
  const allPosts = ref<Posts[]>([]);

  // Function to fetch posts and assign them to the state
  const fetchPosts = async () => {
    try {
      const response = await getAllPosts(); // Ensure this is an async call
      allPosts.value = response.data; // Access data from the resolved promise
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  };

  // Call the fetchPosts method when the component is mounted
  onMounted(() => {
    fetchPosts();
  });

  const getPosts = () => allPosts.value;

  const addPost = (post: Posts) => {
    allPosts.value.push(post);
  };

  const deletePost = (postId: number) => {
    allPosts.value = allPosts.value.filter((post) => post.id !== postId);
  };

  const deletePostsByUserId = (userId: number) => {
    const userPosts = allPosts.value.filter(post => post.userId === userId);
    userPosts.forEach(post => deletePost(post.id));
  };

  return {
    getPosts,
    addPost,
    deletePost,
    deletePostsByUserId,
  };
};
