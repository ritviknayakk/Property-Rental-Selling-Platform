import React, { useState } from "react";
import axios from "axios";
import "./signupstyle.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    aadharID: "",
    panNumber: "",
    email: "",
    phoneNumber: "",
    password: "",
    userType: "tenant", // Default selection
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
      await axios.post("http://localhost:5000/api/auth/signup", formData);
      alert("Signup successful");
      navigate("/login");
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <div className="body">
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h1>Sign Up</h1>

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
            <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
          </div>
          <div className="input">
            <input type="text" name="aadharID" placeholder="Aadhar ID" value={formData.aadharID} onChange={handleChange} required />
          </div>
          <div className="input">
            <input type="text" name="panNumber" placeholder="PAN Number" value={formData.panNumber} onChange={handleChange} required />
          </div>
          <div className="input">
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="input">
            <input type="text" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} required />
          </div>
          <div className="input">
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          </div>

          <button type="submit" className="btn">Sign Up</button>

          <div className="signup">
            <p>Already have an account? <a href="/login">Login</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
