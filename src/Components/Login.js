import React, { useState } from 'react'
import axios from "axios";
import "./login.css"

const Login = ({ setToken }) => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        identifier,
        password,
      });
      console.log(response)
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", user.id);
      setToken(token);
    } catch (error) {
      console.error("Error logging in:", error.response.data.error);
    }
  };
  const loginwithgoogle = () => {
    window.open("http://localhost:5000/auth/google/", "_self");
  };
  return (
    <>
      <div className="login-page">
        <h1 style={{ textAlign: "center" }}>Login</h1>
        <div className="form">
          <form className="login-form">
            <input
              type="text"
              placeholder="Email or UserID"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button>Login</button>
            <p className="message">
              Not Registerd? <a href="#">Create an account</a>
            </p>
          </form>
          <button className="login-with-google-btn" onClick={loginwithgoogle}>
            Sign In With Google
          </button>
        </div>
      </div>
    </>
  );
};

export default Login