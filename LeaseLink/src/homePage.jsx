import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage">
      <header>
        <a className="logo">LeaseLink</a>
        <div className="nav_items">
          <a onClick={() => navigate("/about")}>About us</a>
          <a onClick={() => navigate("/contact")}>Contact</a>
          <a onClick={() => navigate("/login")}>Login</a>
        </div>
      </header>

      <section className="hero">
        <div className="content">
          <h1>
            <i>SEEK. SIGN. SETTLE.</i>
          </h1>
          <p>
            Welcome to LeaseLink, your ultimate destination for hassle-free rental management! Say goodbye to paperwork nightmares and hello to seamless renting with 
            our intuitive platform. Landlords, effortlessly list your properties with 
            captivating descriptions and stunning visuals to attract the perfect tenants. 
            Tenants, apply with ease and sign leases online in a snap.
          </p>
          <div className="hero-buttons">
            <button id="a" onClick={() => navigate("/signup")}>Get started</button>
            <button id="b" onClick={() => navigate("/support")}>Customer Support</button>
          </div>
        </div>
        <img src="./mai3.png" className="mainimg" alt="Main Visual" />
      </section>

      <section className="container2">
        <div className="column1">
          <h1><i>SEEK</i></h1>
          <p>Explore a wide range of rental options tailored to your needs.</p>
        </div>
        <div className="column2">
          <h1><i>SIGN</i></h1>
          <p>Browse listings and compare amenities effortlessly.</p>
        </div>
        <div className="column3">
          <h1><i>SETTLE</i></h1>
          <p>Transparent and detailed property descriptions to help you settle in.</p>
        </div>
      </section>

      <footer>Made with ♥ by LeaseLink team</footer>
    </div>
  );
};

export default HomePage;
