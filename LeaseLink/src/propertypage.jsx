import React, { useState, useEffect } from "react";
import "./propert1.css";

const Property = () => {
  const [properties, setProperties] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedForPayment, setSelectedForPayment] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) setCurrentUser(storedUser);

    fetch("http://localhost:5000/api/property")
      .then((res) => res.json())
      .then((data) => setProperties(data))
      .catch((err) => console.error("Error fetching properties:", err));
  }, []);

  const extractPrice = (cost) =>
    typeof cost === "number" ? cost : parseInt(cost, 10);

  const filteredProperties = properties.filter((property) => {
    const cost = extractPrice(property.cost);
    if (priceFilter === "all") return true;
    if (priceFilter === "low") return cost <= 500000;
    if (priceFilter === "medium") return cost > 500000 && cost <= 1000000;
    if (priceFilter === "high") return cost > 1000000;
  });

  const handleViewDetails = (id) => {
    setSelectedProperty((prev) => (prev === id.toString() ? null : id.toString()));
  };

  const handleBuyNow = (property) => {
    setSelectedForPayment(property);
    setShowConfirm(true);
  };

  const confirmPurchase = () => {
    localStorage.setItem("pendingPayment", JSON.stringify(selectedForPayment));
    setShowConfirm(false);
    window.location.href = "/payment";
  };
  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) setCurrentUser(storedUser);
  }, []);
  

  return (
    <div className="property-container">
      <h2 className="property-title">Featured Properties</h2>
      {/* <p className="current-user">Current User: {currentUser}</p> */}

      <div className="price-filter">
        <select value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="low">Under $500,000</option>
          <option value="medium">$500,000 - $1,000,000</option>
          <option value="high">Over $1,000,000</option>
        </select>
      </div>

      <div className="property-grid">
        {filteredProperties.map((property) => {
          const location = property.address || "Unknown Location";
          const price = property.cost ? `$${property.cost.toLocaleString()}` : "$0";
          const imageSrc =
            property.image && property.image.trim() !== ""
              ? property.image
              : "https://via.placeholder.com/400x200?text=No+Image";

          const propertyId = property._id.toString();

          return (
            <div key={propertyId} className="property-card">
              <img
                src={imageSrc}
                alt={property.name || "Property"}
                className="property-image"
              />
              <h3 className="property-name">{property.name || "Property"}</h3>
              <p className="property-location">{location}</p>
              <p className="property-price">{price}</p>

              {property.description && (
                <p className="property-description">{property.description}</p>
              )}

              <div className="button-container">
                <button
                  className="view-details"
                  onClick={() => handleViewDetails(propertyId)}
                >
                  View Details
                </button>
                <button className="buy-button" onClick={() => handleBuyNow(property)}>
                  Buy Now
                </button>
              </div>

              {selectedProperty === propertyId && (
                <div className="amenities-details">
                  <strong>Amenities:</strong>{" "}
                  {property.amenities && property.amenities.length > 0
                    ? property.amenities.join(", ")
                    : "None"}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Buy Now Confirmation Modal */}
      {showConfirm && selectedForPayment && (
        <div className="confirmation-modal">
          <div className="confirmation-content">
            <h3 color="rgb(255, 253, 253)">Confirm Purchase</h3>
            <p color="rgb(255, 253, 253)">
              Are you sure you want to buy{" "}
              <strong>{selectedForPayment.name}</strong> for{" "}
              <strong>${selectedForPayment.cost.toLocaleString()}</strong>?
            </p>
            <div style={{ marginTop: "20px" }}>
              <button
                className="view-details"
                onClick={() => {
                  setShowConfirm(false);
                  setSelectedForPayment(null);
                }}
              >
                Cancel
              </button>
              <button
                className="buy-button"
                onClick={confirmPurchase}
                style={{ marginLeft: "15px" }}
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Property;
