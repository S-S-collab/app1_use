import React from 'react';
import './ProfilePosts.css'; // Add some basic styling

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
