import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const UserProfile = () => {
  const [user, setUser] = useState({
    username: '',
    profilePicture: '',
    bio: '',
    followers: 0,
    following: 0,
    posts: [],
  });

  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    // Fetch user data from API
    const fetchData = async () => {
      const response = await fetch(`/api/users/${username}`);
      const data = await response.json();
      setUser(data);
    };
    fetchData();
  }, []);

  const handleFollow = () => {
    // Call API to follow/unfollow user
    setIsFollowing(!isFollowing);
  };

  return (
    <div className="user-profile">
      <header>
        <div className="profile-picture">
          <img src={user.profilePicture} alt={user.username} />
        </div>
        <div className="username">
          <h1>{user.username}</h1>
        </div>
        <div className="follow-button">
          {isFollowing? (
            <button onClick={handleFollow}>Unfollow</button>
          ) : (
            <button onClick={handleFollow}>Follow</button>
          )}
        </div>
      </header>
      <section className="bio">
        <p>{user.bio}</p>
      </section>
      <section className="stats">
        <div>
          <span>{user.followers} followers</span>
        </div>
        <div>
          <span>{user.following} following</span>
        </div>
        <div>
          <span>{user.posts.length} posts</span>
        </div>
      </section>
      <section className="posts">
        {user.posts.map((post) => (
          <div key={post.id} className="post">
            <img src={post.image} alt={post.caption} />
            <div className="post-info">
              <p>{post.caption}</p>
              <span>{post.likes} likes</span>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default UserProfile;
