import React, { useState, useEffect } from 'react';
import ProfileHeader from './ProfileHeader';
import ProfilePosts from './ProfilePosts';
import './Styles/ProfilePage.css';
const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await fetch('/api/user').then(res => res.json());
      setUser(userData);
    };

    const fetchPosts = async () => {
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
