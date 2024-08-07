import { useState } from "react";
import { BottomWarning } from "../components/Common/BottomWarning";
import { Button } from "../components/Common/Button";
import { Heading } from "../components/Common/Heading";
import { InputBox } from "../components/Common/InputBox";
import { SubHeading } from "../components/Common/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const emailSchema = z.string().max(50, "Email must be less than 50 characters").regex(/^[A-Za-z0-9._%+-]+@gmail\.com$/, "Email must be a valid address");

const validateEmail = (email) => {
  try {
    emailSchema.parse(email);
    return email
} catch (e) {
    setErrorMessage(e.errors[0].message);
      return false;
  }
};

export const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <InputBox
            onChange={(e) => { 
              setEmail(e.target.value);
              setErrorMessage("");
              }}
            placeholder="shubhdeep@gmail.com"
            label={"Email"}
          />
          <InputBox
            onChange={(e) => setPassword(e.target.value)}
            placeholder="123456"
            label={"Password"}
          />
          {errorMessage && (
            <div className="text-red-500 text-sm mt-2 text-left">
              {errorMessage}
            </div>
          )}
          <div className="pt-4">
            <Button
              onClick={async () => {
                if (!validateEmail(email)) return;
                try {
                  const response = await axios.post(
                    "http://localhost:5000/api/signin",
                    {
                      email,
                      password,
                    }
                  );
                  localStorage.setItem("token", response.data.token);
                  navigate("/Home");
                } catch (error) {
                  if (error.response && error.response.status === 400) {
                    setErrorMessage("Email not registered");
                  } else {
                    setErrorMessage(
                      "Invalid email or password. Please try again."
                    );
                  }
                }
              }}
              label={"Sign in"}
            />
          </div>
          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Sign up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
};
