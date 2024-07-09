import { useState } from "react";
import { Button } from "../components/Common/Button";
import { Heading } from "../components/Common/Heading";
import { InputBox } from "../components/Common/InputBox";
import { SubHeading } from "../components/Common/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const CreateUserProfile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [bio, setBio] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && !file.type.startsWith("image/")) {
      setErrorMessage("Only image files are allowed.");
      setProfilePicture(null);
    } else {
      setErrorMessage("");
      setProfilePicture(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("profile_picture", profilePicture);
    formData.append("bio", bio);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/userprofiles",
        formData
      );
      console.log("User created:", response.data);
      navigate("/Home");
    } catch (error) {
      setErrorMessage("Error creating user. Please try again.");
    }
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Create Profile"} />
          <SubHeading label={"Enter details to create your profile"} />
          <div className="text-left mt-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Profile Picture:
            </label>
            <div className="flex justify-center items-center mb-4">
              <div className="relative">
                <img
                  src={
                    profilePicture ||
                    "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=mail@ashallendesign.co.uk"
                  }
                  alt="Profile Preview"
                  className="w-24 h-24 rounded-full object-cover"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            </div>
          </div>
          <InputBox
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            label={"Username"}
          />
          <InputBox
            onChange={(e) => setBio(e.target.value)}
            placeholder="Bio"
            label={"Bio"}
            type="textarea"
          />
          <InputBox
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            label={"Email"}
            type="email"
          />
          {errorMessage && (
            <div className="text-red-500 text-sm mt-2 text-left">
              {errorMessage}
            </div>
          )}
          <div className="pt-4">
            <Button onClick={handleSubmit} label={"Create Profile"} />
          </div>
        </div>
      </div>
    </div>
  );
};
