import React, { useState, useEffect } from 'react';
import ProfileHeader from './ProfileHeader';
import ProfilePosts from './ProfilePosts';
import './ProfilePage.css'; // Add some basic styling

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch user data
    const fetchUser = async () => {
      // Replace with actual API call
      const userData = await fetch('/api/user').then(res => res.json());
      setUser(userData);
    };

    // Fetch user posts
    const fetchPosts = async () => {
      // Replace with actual API call
      const postsData = await fetch('/api/user/posts').then(res => res.json());
      setPosts(postsData);
    };

    fetchUser();
    fetchPosts();
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="profile-page">
      <ProfileHeader user={user} />
      <ProfilePosts posts={posts} />
    </div>
  );
};

export default ProfilePage;
