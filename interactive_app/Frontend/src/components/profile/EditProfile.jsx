import { useState } from "react";
import "../../Styles/EditProfile.css";

const EditProfile = () => {
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/users/edit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          bio,
          profilePicture,
          email,
          phoneNumber,
        }),
      });
      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="edit-profile">
      <form onSubmit={handleSubmit}>
        <div className="profile-picture">
          <img src={profilePicture} alt="Profile Picture" />
          <input
            type="file"
            onChange={(event) => setProfilePicture(event.target.value)}
          />
        </div>
        <div className="username">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="bio">
          <label>Bio:</label>
          <textarea
            value={bio}
            onChange={(event) => setBio(event.target.value)}
          />
        </div>
        <div className="email">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="phone-number">
          <label>Phone Number:</label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
          />
        </div>
        <button type="submit">Save Changes</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default EditProfile;
