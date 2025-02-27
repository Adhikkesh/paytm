import { useState } from "react";
import BottomWarning from "../components/bottomwarning";
import Button from "../components/button";
import Heading from "../components/heading";
import InputBox from "../components/Inputbox";
import Logo from "../components/logo";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const URL = "https://skar-pay-backend.onrender.com";

export default function Signup() {
  const [formData, setformData] = useState({
    username: "",
    firstname: "",
    lastname: "",
    password: "",
    confirmpassword: "",
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

    if (formData.password !== formData.confirmpassword) {
      setError("Password and Confirm Password is not same");
      setSuccess("");
      return;
    }

    try {
      localStorage.clear();
      const response = await axios.post(
        URL + "/api/v1/user/signup",
        {
          username: formData.username,
          firstname: formData.firstname,
          lastname: formData.lastname,
          password: formData.password,
        }
      );
      console.log(response);
      localStorage.setItem("token",response.data.token);

      setSuccess("Successfully Created");
      setError("");
      setformData({
        username: "",
        firstname: "",
        lastname: "",
        password: "",
        confirmpassword: "",
      });
      navigate("/dashboard");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        const error = err.response.data.error;
        const messages = error.map((error) => error.message);
        setError(messages.join(' '))
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
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
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
                type="text"
                name="firstname"
                placeholder="firstname"
                content="Firstname"
                onChange={handleChange}
                value={formData.firstname}
              />
              <InputBox
                type="text"
                name="lastname"
                placeholder="lastname"
                content="Lastname"
                onChange={handleChange}
                value={formData.lastname}
              />
              <InputBox
                type="password"
                name="password"
                placeholder="●●●●●●●"
                content="Password"
                onChange={handleChange}
                value={formData.password}
              />
              <InputBox
                type="password"
                name="confirmpassword"
                placeholder="●●●●●●●"
                content="Confirm Password"
                onChange={handleChange}
                value={formData.confirmpassword}
              />
              <Button content="Create an account" />
              <BottomWarning
                content="Already have an account"
                type="Login Here"
                to="/signin"
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
