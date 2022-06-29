import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import AuthPage from "./pages/authPage/AuthPage";
import DronerList from "./pages/droner/DronerList";
import EditFarmer from "./pages/farmer/EditFarmer";
import IndexDroner from "./pages/droner/IndexDroner";
import RateDroner from "./pages/droner/RateDroner";
import AddFarmer from "./pages/farmer/AddFarmer";
import IndexFarmer from "./pages/farmer/IndexFarmer";
import OverviewPage from "./pages/overview/OverviewPage";
import PromotionPage from "./pages/promotion/PromotionPage";
import TotalIncomePage from "./pages/totalincome/TotalIncomePage";

const WebRoutes: React.FC<any> = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Navigate to="/AuthPage" />} />
        <Route path="/OverviewPage" element={<OverviewPage />} />
        <Route path="/AuthPage" element={<AuthPage />} />
        <Route path="/IndexDroner" element={<IndexDroner />} />
        <Route path="/IndexFarmer" element={<IndexFarmer />} />
        <Route path="/TotalIncomePage" element={<TotalIncomePage />} />
        <Route path="/PromotionPage" element={<PromotionPage />} />
        <Route path="/TotalIncomePage" element={<TotalIncomePage />} />
        <Route path="/AddFarmer" element={<AddFarmer />} />
        <Route path="/DronerList" element={<DronerList />} />
        <Route path="/RateDroner" element={<RateDroner />} />
        <Route path="/EditFarmer" element={<EditFarmer />} />
      </Routes>
    </BrowserRouter>
  );
};

export default WebRoutes;
