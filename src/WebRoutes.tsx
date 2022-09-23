import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import ErrorLoginPage from "./errorPage/ErrorLoginPage";
import PageNotFound from "./httpError/PageNotFound";
import { AuthPage } from "./pages/authPage/AuthPage";
import AddDroner from "./pages/droner/AddDroner";
import DroneList from "./pages/droner/DroneList";
import EditDroneList from "./pages/droner/EditDroneList";
import EditDroner from "./pages/droner/EditDroner";
import IndexDroner from "./pages/droner/IndexDroner";
import AddFarmer from "./pages/farmer/AddFarmer";
import EditFarmer from "./pages/farmer/EditFarmer";
import IndexFarmer from "./pages/farmer/IndexFarmer";
import { HomePage } from "./pages/home/HomePage";
import { OverviewPage } from "./pages/overview/OverviewPage";
import PromotionPage from "./pages/promotion/PromotionPage";
import TotalIncomePage from "./pages/totalincome/TotalIncomePage";
import IndexAdmin from "./pages/admin/IndexAdmin";
import AddAdmin from "./pages/admin/AddAdmin";
import EditAdmin from "./pages/admin/EditAdmin";
import ProtectRoute from "./ProtectRoute";
import PublicRoute from "./PublicRoute";
import IndexFinishTask from "./pages/task/finishTask/IndexFinishTask";
import FinishTasks from "./pages/task/finishTask/DetailTaskPage.tsx/FinishTask";
import ReviewTask from "./pages/task/finishTask/DetailTaskPage.tsx/ReviewTask";
import CancelTask from "./pages/task/finishTask/DetailTaskPage.tsx/CancelTask";
import DetailWorkDroner from "./pages/droner/DetailWorkDroner";
import DetailRankDroner from "./pages/droner/DetailRankDroner";
import IndexRankDroner from "./pages/droner/IndexRankDroner";
import IndexNewTask from "./pages/task/newTask/IndexNewTask";
import AddNewTask from "./pages/task/newTask/AddNewTask";
import EditNewTask from "./pages/task/newTask/EditNewTask";
import EditCancel from "./pages/task/todayTask/DetailEdit/EditCancel";
import EditWaitStart from "./pages/task/todayTask/DetailEdit/EditWaitStart";
import EditInProgress from "./pages/task/todayTask/DetailEdit/EditInProgress";
import IndexTodayTask from "./pages/task/todayTask/IndexTaskToday";



const WebRoutes: React.FC<any> = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectRoute />}>
          <Route path="*" element={<Navigate to="/HomePage" />} />
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/OverviewPage" element={<OverviewPage />} />
          <Route path="/IndexFinishTask" element={<IndexFinishTask />} />
          <Route path="/FinishTasks" element={<FinishTasks />} />
          <Route path="/ReviewTask" element={<ReviewTask />} />
          <Route path="/CancelTask" element={<CancelTask />} />
          <Route path="/IndexDroner" element={<IndexDroner />} />
          <Route path="/IndexFarmer" element={<IndexFarmer />} />
          <Route path="/TotalIncomePage" element={<TotalIncomePage />} />
          <Route path="/PromotionPage" element={<PromotionPage />} />
          <Route path="/TotalIncomePage" element={<TotalIncomePage />} />
          <Route path="/AddFarmer" element={<AddFarmer />} />
          <Route path="/AddDroner" element={<AddDroner />} />
          <Route path="/DroneList" element={<DroneList />} />
          <Route path="/IndexRankDroner" element={<IndexRankDroner />} />
          <Route path="/DetailRankDroner" element={<DetailRankDroner/>} />
          <Route path="/DetailWorkDroner" element={<DetailWorkDroner/>} />
          <Route path="/EditDroneList" element={<EditDroneList />} />
          <Route path="/EditFarmer/:id" element={<EditFarmer />} />
          <Route path="/EditDroner" element={<EditDroner />} />
          <Route path="/IndexAdmin" element={<IndexAdmin />} />
          <Route path="/AddAdmin" element={<AddAdmin />} />
          <Route path="/EditAdmin/:id" element={<EditAdmin />} />
          <Route path="/IndexNewTask" element={<IndexNewTask />} />
          <Route path="/AddNewTask:type" element={<AddNewTask />} />
          <Route path="/EditNewTask/:id" element={<EditNewTask />} />
          <Route path="/IndexTodayTask" element={<IndexTodayTask />} />
          <Route path="/EditWaitStart" element={<EditWaitStart/>} />
          <Route path="/EditInProgress" element={<EditInProgress/>} />
          <Route path="/EditCancel" element={<EditCancel/>} />
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
