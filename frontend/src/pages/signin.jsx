import BottomWarning from "../components/bottomwarning";
import Button from "../components/button";
import Heading from "../components/heading";
import InputBox from "../components/Inputbox";
import Logo from "../components/logo";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const URL = "https://skar-pay-backend.onrender.com";

export default function Signin() {
  const [formData, setformData] = useState({
    username: "",
    password: "",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setformData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setSuccess("");

    try {
      localStorage.clear();
      const response = await axios.post(
        URL + "/api/v1/user/signin",
        {
          username: formData.username,
          firstname: formData.firstname,
          lastname: formData.lastname,
          password: formData.password,
        }
      );
      console.log(response);
      localStorage.setItem("token", response.data.token);
      setSuccess("Successfully Logged in");
      setError("");
      setformData({
        username: "",
        password: "",
      });
      navigate("/dashboard");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        const error = err.response.data.error;
        if (Array.isArray(error)) {
          const messages = error.map((error) => error.message);
          setError(messages.join(" "));
        }
        else{
          setError(error);
        }
      } else {
        setError("An unexpected error occurred");
      }
    }
  }

  return (
    <section className="bg-gray-50 ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen">
        <div className="w-full bg-white rounded-lg shadow-lg md:mt-0 sm:max-w-md xl:p-0">
          <Logo />
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <Heading content="Create an account" />
            {error && (
              <p className="text-red-600 text-sm font-medium">{error}</p>
            )}
            {success && (
              <p className="text-green-600 text-sm font-medium">{success}</p>
            )}
            <form className="space-y-5 md:space-y-6" onSubmit={handleSubmit}>
              <InputBox
                type="text"
                name="username"
                placeholder="name@gmail.com"
                content="Your Email"
                onChange={handleChange}
                value={formData.username}
              />
              <InputBox
                type="password"
                name="password"
                placeholder="●●●●●●●"
                content="Password"
                onChange={handleChange}
                value={formData.password}
              />
              <Button content="Login" />
              <BottomWarning
                content="Don't have an account"
                type="Sign Up"
                to="/signup"
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
