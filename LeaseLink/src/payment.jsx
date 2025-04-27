import React, { useEffect, useState } from "react";

const Payment = () => {
  const [property, setProperty] = useState(null);
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("pendingPayment"));
    if (data) setProperty(data);
    const storedUser = localStorage.getItem("username");
    if (storedUser) setCurrentUser(storedUser);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const container = document.getElementById('payment-container');
      if (!container) return;

      if (window.innerWidth <= 768) {
        container.style.flexDirection = 'column';
      } else {
        container.style.flexDirection = 'row';
      }
    };

    window.addEventListener('resize', handleResize);

    setTimeout(() => {
      const pageElement = document.querySelector('div[style*="display: flex"]');
      if (pageElement) {
        pageElement.id = 'payment-container';
        handleResize();
      }
    }, 100);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      if (!property || !property._id) {
        alert("No property selected.");
        return;
      }

      // Delete property from backend
      const response = await fetch(`http://localhost:5000/api/property/${property._id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete property');
      }

      alert(`Payment Successful for ${currentUser}! Property removed.`);
      localStorage.removeItem("pendingPayment");
      window.location.href = "/";
    } catch (err) {
      alert("Payment succeeded, but failed to remove property.");
      console.error(err);
    }
  };

  // All styles defined inline to prevent inheritance from other stylesheets
  const styles = {
    page: {
      display: 'flex',
      minHeight: '100vh',
      width: '100%',
      backgroundColor: 'rgb(245, 245, 245)',
      fontFamily: 'Arial, sans-serif',
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
      position: 'relative',
      zIndex: 1, // Add higher z-index to ensure it's above other elements
    },
    imageSection: {
      flex: '1 1 0%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f0f0f0',
      padding: '20px',
    },
    propertyImage: {
      maxWidth: '100%',
      maxHeight: '80vh',
      objectFit: 'cover',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    },
    infoSection: {
      flex: '1 1 0%',
      padding: '40px',
      backgroundColor: 'white',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    heading: {
      marginBottom: '24px',
      color: '#333',
      fontSize: '24px',
      fontWeight: '600',
      lineHeight: '1.2',
      // Reset potentially inherited properties
      textTransform: 'none',
      letterSpacing: 'normal',
    },
    paragraph: {
      marginBottom: '16px',
      color: '#444',
      fontSize: '16px',
      lineHeight: '1.5',
      // Reset potentially inherited properties
      textAlign: 'left',
      fontWeight: 'normal',
    },
    propertySummary: {
      marginBottom: '24px',
      padding: '16px',
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
      border: '1px solid #eee',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      marginTop: '20px',
      width: '100%',
      // Reset potentially inherited properties
      padding: 0,
      margin: '20px 0 0 0',
    },
    label: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
      fontWeight: '500',
      color: '#555',
      width: '100%',
      // Reset potentially inherited properties
      margin: 0,
      padding: 0,
    },
    input: {
      padding: '12px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '16px',
      width: '100%',
      backgroundColor: 'white',
      color: '#333',
      boxSizing: 'border-box',
      outline: 'none',
      // Reset potentially inherited properties
      margin: 0,
    },
    button: {
      marginTop: '12px',
      padding: '14px',
      backgroundColor: '#4caf50',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      width: '100%',
      textAlign: 'center',
      // Reset potentially inherited properties
      textTransform: 'none',
      boxShadow: 'none',
      outline: 'none',
    },
    strong: {
      fontWeight: '600',
      color: '#333',
    }
  };

  return (
    <div style={styles.page} id="payment-container">
      <div style={styles.imageSection}>
        {property && property.image ? (
          <img src={property.image} alt="Property" style={styles.propertyImage} />
        ) : (
          <img
            src="/api/placeholder/600/400"
            alt="Property"
            style={styles.propertyImage}
          />
        )}
      </div>

      <div style={styles.infoSection}>
        <h2 style={styles.heading}>Confirm Purchase</h2>

        {currentUser && (
          <p style={styles.paragraph}>
            <span style={styles.strong}>Current User:</span> {currentUser}
          </p>
        )}

        {property ? (
          <div style={styles.propertySummary}>
            <p style={styles.paragraph}>
              <span style={styles.strong}>Property:</span> {property.name}
            </p>
            <p style={styles.paragraph}>
              <span style={styles.strong}>Location:</span> {property.address}
            </p>
            <p style={styles.paragraph}>
              <span style={styles.strong}>Price:</span> ₹{property.cost ? property.cost.toLocaleString() : "N/A"}
            </p>
          </div>
        ) : (
          <p style={styles.paragraph}>
            <span style={styles.strong}>Price:</span> ₹75,00,000
          </p>
        )}

        <form style={styles.form} onSubmit={handlePayment}>
          <label style={styles.label}>
            Cardholder Name:
            <input type="text" placeholder="John Doe" required style={styles.input} />
          </label>
          <label style={styles.label}>
            Card Number:
            <input type="text" placeholder="1234 5678 9012 3456" maxLength="16" required style={styles.input} />
          </label>
          <label style={styles.label}>
            Expiry Date:
            <input type="text" placeholder="MM/YY" required style={styles.input} />
          </label>
          <label style={styles.label}>
            CVV:
            <input type="password" placeholder="***" maxLength="3" required style={styles.input} />
          </label>

          <button type="submit" style={styles.button}>
            Confirm Purchase
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;