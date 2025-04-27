import React, { useState } from "react";
import axios from "axios";
import "./loginstyle.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    userType: "tenant",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        username: formData.username,
        password: formData.password,
        userType: formData.userType,
      });

      alert("Login successful");

      if (res.data.userType === "tenant") {
        navigate("/propertypage");
      } else if (res.data.userType === "landlord") {
        navigate("/landlord-dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      alert("Login failed: " + (err.response?.data?.message || "Unknown error"));
    }
  };

  return (
    <div className="body">
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>

          <div className="option">
            <div className="radio">
              <label>
                <input
                  type="radio"
                  name="userType"
                  value="tenant"
                  checked={formData.userType === "tenant"}
                  onChange={handleChange}
                />
                Tenant
              </label>
              <label>
                <input
                  type="radio"
                  name="userType"
                  value="landlord"
                  checked={formData.userType === "landlord"}
                  onChange={handleChange}
                />
                Landlord
              </label>
            </div>
          </div>

          <div className="input">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn">Login</button>

          <div className="signup">
            <p>Don't have an account? <a href="/signup">Sign Up</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
