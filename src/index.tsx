import React from "react";
import ReactDOM from "react-dom/client";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import App from "./App";
import "./styles/global.scss";
import VendorDetails from "./pages/VendorDetails";
import ErrorComponent from "./views/scenes/ErrorComponent";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/vendors/:vendorName" element={<VendorDetails />} />
      <Route path="/error" element={<ErrorComponent />} />
    </Routes>
  </Router>
);
