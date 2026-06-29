import React, { useState, useEffect } from 'react'
import Post from './PostComponents/Post'
import { getAllPosts } from '../services/posts'

function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const data = await getAllPosts();
        setPosts(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching posts:", err.message);
        setError("Failed to load posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="mt-8 flex justify-center">
        <p className="text-gray-500">Loading posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-8 flex justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="mt-8 flex flex-col gap-4">
      {posts.length === 0 ? (
        <div className="flex justify-center">
          <p className="text-gray-500">No posts yet</p>
        </div>
      ) : (
        posts.map((post) => (
          <Post key={post.id} post={post} />
        ))
      )}
    </div>
  )
}

export default Feed