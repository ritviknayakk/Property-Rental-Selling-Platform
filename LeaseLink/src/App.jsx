  import React, { useEffect } from "react";
  import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
  import HomePage from "./homePage";
  import Signup from "./signup";
  import Login from "./login";
  import Property from "./propertypage"
  import LandlordDashboard from "./LandlordDashboard";
  import PaymentPage from './payment';
  // import Contact from "./components/Contact";
  // import About from "./components/About";
  // import Support from "./components/Support";

  function App() {
    useEffect(() => {
      (async () => {
          const res = await fetch("http://localhost:5000");
          console.log(await res.json());
      })();
  }, []);

    return (
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/propertypage" element={<Property />} />
          <Route path="/landlord-dashboard" element={<LandlordDashboard />} />
          <Route path="/payment" element={<PaymentPage />} />
          {/* <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/support" element={<Support />} /> */}
        </Routes>
      </Router>
    );
  }

  export default App;
