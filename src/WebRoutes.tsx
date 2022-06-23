import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import IndexDroner from "./pages/droner/IndexDroner";
import OverviwePage from "./pages/overview/OverviewPage";

const WebRoutes: React.FC<any> = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="*" element={<Navigate to="/OverviwePage"  />} />
      <Route path="/OverviwePage" element={<OverviwePage />} />
      <Route path="/IndexDroner" element={<IndexDroner />} />
      <Route path="/" element={<OverviwePage />} />
      




</Routes>
    </BrowserRouter>
  );
};

export default WebRoutes;
