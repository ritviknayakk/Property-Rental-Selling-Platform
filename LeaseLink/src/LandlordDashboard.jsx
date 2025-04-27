import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './dashboard.css';

const LandlordDashboard = () => {
  const [formData, setFormData] = useState({
    address: '',
    cost: '',
    amenities: [],           // Now an array for multiple selections
    fullyFurnished: 'no',     // "yes" or "no"
    image: '',
  });
  const navigate = useNavigate();

  // List of all amenities options
  const amenityOptions = [
    "pool",
    "wifi",
    "ac",
    "laundry",
    "home theatre",
    "coffee maker",
    "microwave"
  ];

  // Handle changes for text and number fields, and the file input
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files[0]) {
      // Simulate storing an image by creating a local URL.
      setFormData(prev => ({ ...prev, image: URL.createObjectURL(files[0]) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Handle checkbox changes for amenities
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => {
      const prevAmenities = prev.amenities || [];
      if (checked) {
        // Add amenity if checked
        return { ...prev, amenities: [...prevAmenities, value] };
      } else {
        // Remove amenity if unchecked
        return { ...prev, amenities: prevAmenities.filter(item => item !== value) };
      }
    });
  };
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
  
    try {
      const res = await axios.post("http://localhost:5000/api/property/upload-image", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
  
      // Save the returned image URL in your state
      setFormData((prev) => ({
        ...prev,
        image: res.data.imageUrl
      }));
  
    } catch (error) {
      console.error("Image upload error:", error);
      alert("Failed to upload image.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // In a real app, retrieve the logged-in landlord's _id from context or token.
      const landlordId = "60e8c6e3d2a4f913e8d8ef33";  // Dummy valid ObjectId string

      await axios.post("http://localhost:5000/api/property/list", {
        landlordId,
        address: formData.address,
        cost: parseFloat(formData.cost),
        amenities: formData.amenities,         // send the array of selected amenities
        fullyFurnished: formData.fullyFurnished,  // "yes" or "no"
        image: formData.image,
      });
      alert("Property listed successfully!");
      navigate("/landlord-dashboard");
    } catch (err) {
      alert("Failed to list property: " + (err.response?.data?.message || "Unknown error"));
    }
  };
  

  return (
    <div className="dashboard-container">
      <h1>List Your Property</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-field">
          <label>Address:</label>
          <input 
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-field">
          <label>Cost:</label>
          <input 
            type="number"
            name="cost"
            value={formData.cost}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-field">
          <label>Amenities:</label>
          <div className="checkbox-group">
            {amenityOptions.map((option) => (
              <label key={option}>
                <input 
                  type="checkbox"
                  name="amenities"
                  value={option}
                  checked={formData.amenities.includes(option)}
                  onChange={handleCheckboxChange}
                />
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </label>
            ))}
          </div>
        </div>
        <div className="input-field">
          <label>Fully Furnished:</label>
          <div className="radio-group">
            <label>
              <input 
                type="radio"
                name="fullyFurnished"
                value="yes"
                checked={formData.fullyFurnished === "yes"}
                onChange={handleChange}
              />
              Yes
            </label>
            <label>
              <input 
                type="radio"
                name="fullyFurnished"
                value="no"
                checked={formData.fullyFurnished === "no"}
                onChange={handleChange}
              />
              No
            </label>
          </div>
        </div>
        <div className="input-field">
          <label>Property Image:</label>
          <input
            type="file"
            name="image"
            onChange={handleImageUpload}
            accept="image/*"
            />
        </div>
        <button type="submit">List Property</button>
      </form>
    </div>
  );
};

export default LandlordDashboard;
