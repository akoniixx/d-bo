import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import IndexDroner from "./pages/droner/IndexDroner";
import IndexFarmer from "./pages/farmer/IndexFarmer";
import OverviwePage from "./pages/overview/OverviewPage";
import PromotionPage from "./pages/promotion/PromotionPage";
import TotalIncomePage from "./pages/totalincome/TotalIncomePage";

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
      </Routes>
    </BrowserRouter>
  );
};

export default WebRoutes;
