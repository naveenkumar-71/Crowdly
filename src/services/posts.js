const BASE_URL = "http://localhost:3001"; // JSON Server

// Fetch all posts
export const getAllPosts = async () => {
  const res = await fetch(`${BASE_URL}/posts`);
  
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  
  return res.json();
};

// Fetch posts by user ID
export const getPostsByUserId = async (userId) => {
  const res = await fetch(`${BASE_URL}/posts?userId=${userId}`);
  
  if (!res.ok) {
    throw new Error("Failed to fetch user posts");
  }
  
  return res.json();
};

// Fetch single post by ID
export const getPostById = async (postId) => {
  const res = await fetch(`${BASE_URL}/posts/${postId}`);
  
  if (!res.ok) {
    throw new Error("Failed to fetch post");
  }
  
  return res.json();
};
