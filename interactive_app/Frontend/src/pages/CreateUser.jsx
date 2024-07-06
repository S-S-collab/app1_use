import { useState } from "react";
import "../../Styles/CreateUser.css";

const CreateUser = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [bio, setBio] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("profile_picture", profilePicture);
    formData.append("bio", bio);

    fetch("/api/users", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("User created:", data);
      })
      .catch((error) => {
        console.error("Error creating user:", error);
      });
  };

  return (
    <div className="create-user">
      <h1>Create Account</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Profile Picture:
          <input
            type="file"
            onChange={(event) => setProfilePicture(event.target.files[0])}
          />
        </label>
        <br />
        <label>
          Bio:
          <textarea
            value={bio}
            onChange={(event) => setBio(event.target.value)}
          />
        </label>
        <br />
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default CreateUser;
