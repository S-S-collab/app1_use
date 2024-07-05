import React from 'react';
import './Styles/ProfilePosts.css';

const ProfilePosts = ({ posts }) => {
  return (
    <div className="profile-posts">
      {posts.map(post => (
        <div className="post" key={post.id}>
          <img src={post.imageUrl} alt={post.caption} />
        </div>
      ))}
    </div>
  );
};

export default ProfilePosts;
