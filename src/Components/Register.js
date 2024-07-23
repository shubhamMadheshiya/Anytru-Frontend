import React, { useState } from "react";
import axios from "axios";

const Register = ({ setToken }) => {
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/auth/register", {
        userId,
        email,
        firstName,
        lastName,
        password,
        isSubscribed: false,
      });
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", user.id);
      setToken(token);
    } catch (error) {
      console.error("Error registering:", error.response.data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="UserID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
