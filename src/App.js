import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PricingHistory from "./Pages/PricingHistory";
import MyPortfolio from "./Pages/MyPortfolio";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PricingHistory />} />
        <Route path="MyPortfolio" element={<MyPortfolio />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
