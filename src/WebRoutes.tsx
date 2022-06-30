import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import ErrorLoginPage from "./errorPage/ErrorLoginPage";
import PageNotFound from "./httpError/PageNotFound";
import { AuthPage } from "./pages/authPage/AuthPage";
import DronerList from "./pages/droner/DronerList";
import EditDroneList from "./pages/droner/EditDroneList";
import IndexDroner from "./pages/droner/IndexDroner";
import RateDroner from "./pages/droner/RateDroner";
import AddFarmer from "./pages/farmer/AddFarmer";
import EditFarmer from "./pages/farmer/EditFarmer";
import IndexFarmer from "./pages/farmer/IndexFarmer";
import { HomePage } from "./pages/home/HomePage";
import { OverviewPage } from "./pages/overview/OverviewPage";
import PromotionPage from "./pages/promotion/PromotionPage";
import TotalIncomePage from "./pages/totalincome/TotalIncomePage";
import ProtectRoute from "./ProtectRoute";
import PublicRoute from "./PublicRoute";

const WebRoutes: React.FC<any> = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectRoute />}>
          <Route path="*" element={<Navigate to="/HomePage" />} />
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/OverviewPage" element={<OverviewPage />} />
          <Route path="/IndexDroner" element={<IndexDroner />} />
          <Route path="/IndexFarmer" element={<IndexFarmer />} />
          <Route path="/TotalIncomePage" element={<TotalIncomePage />} />
          <Route path="/PromotionPage" element={<PromotionPage />} />
          <Route path="/TotalIncomePage" element={<TotalIncomePage />} />
          <Route path="/AddFarmer" element={<AddFarmer />} />
          <Route path="/DronerList" element={<DronerList />} />
          <Route path="/RateDroner" element={<RateDroner />} />
          <Route path="/EditDroneList" element={<EditDroneList />} />
          <Route path="/EditFarmer" element={<EditFarmer />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>

        <Route element={<PublicRoute />}>
          <Route index element={<AuthPage />} />
          <Route path="/ErrorLoginPage" element={<ErrorLoginPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default WebRoutes;