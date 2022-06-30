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
<<<<<<< HEAD
import IndexAdmin from "./pages/admin/IndexAdmin";
import AddAdmin from "./pages/admin/AddAdmin";
import EditAdmin from "./pages/admin/EditAdmin";
=======
import ProtectRoute from "./ProtectRoute";
import PublicRoute from "./PublicRoute";
>>>>>>> 4ddb02e9734a02e73404da55750e468fa736bdc8

const WebRoutes: React.FC<any> = () => {
  return (
    <BrowserRouter>
      <Routes>
<<<<<<< HEAD
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
        <Route path="/IndexAdmin" element={<IndexAdmin />} />
        <Route path="/AddAdmin" element={<AddAdmin />} />
        <Route path="/EditAdmin" element={<EditAdmin />} />
=======
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
>>>>>>> 4ddb02e9734a02e73404da55750e468fa736bdc8
      </Routes>
    </BrowserRouter>
  );
};

export default WebRoutes;
