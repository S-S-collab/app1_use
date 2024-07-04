import React from 'react';
import './Styles/ProfileHeader.css';

const ProfileHeader = ({ user }) => {
  return (
    <div className="profile-header">
      <div className="profile-avatar">
        <img src={user.avatarUrl} alt="avatar" />
      </div>
      <div className="profile-info">
        <h2>{user.username}</h2>
        <p>{user.bio}</p>
        <div className="profile-stats">
          <span><strong>{user.postsCount}</strong> posts</span>
          <span><strong>{user.followersCount}</strong> followers</span>
          <span><strong>{user.followingCount}</strong> following</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
