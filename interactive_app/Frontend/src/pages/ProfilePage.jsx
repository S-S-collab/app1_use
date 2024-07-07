import React from "react";
import "../Styles/ProfilePage.css";
import { ProfilePosts } from "../components/profile/ProfilePosts";
import { ProfileHeader } from "../components/profile/ProfileHeader";


export const ProfilePage = ({ username }) => {
  const [user, setUser] = React.useState(null);
  const [posts, setPosts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch(`/api/users/${username}`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data.user);
        setPosts(data.posts);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [username]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-page">
      <header>
        <div className="profile-picture">
          <img src={user.profile_picture} alt={user.username} />
        </div>
        <div className="username">
          <span>{user.username}</span>
        </div>
        <div className="bio">
          <p>{user.bio}</p>
        </div>
        <div className="profile-stats">
          <p>{user.postsCount}</p>
        </div>
        </header>
      <div className="posts">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

