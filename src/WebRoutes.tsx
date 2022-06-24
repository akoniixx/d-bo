import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import IndexDroner from "./pages/droner/IndexDroner";
import IndexFarmer from "./pages/farmer/IndexFarmer";
import OverviwePage from "./pages/overview/OverviewPage";
import PromotionPage from "./pages/promotion/PromotionPage";
import TotalIncomePage from "./pages/totalincome/TotalIncomePage";
import { useEffect, useState } from "react";
import AddFarmer from "./pages/farmer/AddFarmer";

const WebRoutes: React.FC<any> = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Navigate to="/OverviwePage" />} />
        <Route path="/OverviwePage" element={<OverviwePage />} />
        <Route path="/IndexDroner" element={<IndexDroner />} />
        <Route path="/IndexFarmer" element={<IndexFarmer />} />
        <Route path="/TotalIncomePage" element={<TotalIncomePage />} />
        <Route path="/PromotionPage" element={<PromotionPage />} />        
        <Route path="/TotalIncomePage" element={<TotalIncomePage />} />
        <Route path="/AddFarmer" element={<AddFarmer />} />
      </Routes>
    </BrowserRouter>
  );
};

export default WebRoutes;
