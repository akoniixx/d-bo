import React from "react";
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
import IndexInprogressTask from "./pages/task/inprogressTask/IndexInprogressTask";
import EditInprogressTask from "./pages/task/inprogressTask/EditInprogressTask";
import EditWaitStart from "./pages/task/todayTask/DetailEdit/EditWaitStart";
import EditInProgress from "./pages/task/todayTask/DetailEdit/EditInProgress";
import IndexTodayTask from "./pages/task/todayTask/IndexTaskToday";
import AddPromotion from "./pages/promotion/AddPromotionPage";
import EditPromotion from "./pages/promotion/EditPromotionPage";
import PricePage from "./pages/setting/PricePage";
import AddDroneBrand from "./pages/setting/masterDataDrone/AddDroneBrand";
import IndexDroneBrand from "./pages/setting/masterDataDrone/IndexDroneBrand";
import EditDroneBrand from "./pages/setting/masterDataDrone/EditDroneBrand";
import IndexReport from "./pages/report/IndexReport";
import EditReport from "./pages/report/EditReport";
import NewsPage from "./pages/news/NewsPage";
import EditNewsPage from "./pages/news/EditNewsPage";
import AddNewsPage from "./pages/news/AddNewsPage";
import IndexCampaignPoint from "./pages/campaign/point/IndexCampaignPoint";
import AddCampaignPoint from "./pages/campaign/point/AddCampaignPoint";
import IndexDetailFarmerPoint from "./pages/farmer/IndexDetailFarmerPoint";
import IndexDetailDronerPoint from "./pages/droner/IndexDetailDronerPoint";
import EditCampaignPoint from "./pages/campaign/point/EditCampaignPoint";
import ConditionDroner from "./pages/setting/pointSetting/ConditionDroner";
import ConditionFarmer from "./pages/setting/pointSetting/ConditionFarmer";
import IndexReward from "./pages/reward/droner/IndexReward";
import AddReward from "./pages/reward/droner/AddReward";
import EditReward from "./pages/reward/droner/EditReward";
import RedeemHistory from "./pages/reward/droner/RedeemHistory";
import IndexReceivePoint from "./pages/point/IndexReceivePoint";
import IndexPlanningPoint from "./pages/point/IndexPlanningPoint";
import DetailReceivePoint from "./pages/point/DetailReceivePoint";
import IndexRedeem from "./pages/redeem/IndexRedeem";
import DetailFarmerRedeem from "./pages/redeem/DetailFarmerRedeem";
import DetailDronerRedeem from "./pages/redeem/DetailDronerRedeem";
import IndexDronerSummaryPoint from "./pages/point/droner/IndexDronerSummaryPoint";
import IndexFarmerSummary from "./pages/point/farmer/IndexFarmerSummary";
import IndexFarmerHistorySum from "./pages/point/farmer/IndexFarmerHistorySum";
import DetailDronerHistorySum from "./pages/point/droner/DetailDronerHistorySum";
import IndexQuota from "./pages/quotaSetting/droner/IndexQuota";
import AddQuota from "./pages/quotaSetting/droner/AddQuota";
import EditQuota from "./pages/quotaSetting/droner/EditQuota";
import IndexDronerMission from "./pages/mission/droner/IndexDronerMission";
import AddDronerMission from "./pages/mission/droner/AddDronerMission";
import EditDronerMission from "./pages/mission/droner/EditDronerMission";
import MissionReport from "./pages/mission/droner/MissionReport";

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
          <Route path="/IndexDroner/*" element={<IndexDroner />} />
          <Route path="/EditDroner" element={<EditDroner />} />
          <Route path="/IndexFarmer/*" element={<IndexFarmer />} />
          <Route path="AddFarmer" element={<AddFarmer />} />
          <Route path="/EditFarmer/:id" element={<EditFarmer />} />
          <Route path="/TotalIncomePage" element={<TotalIncomePage />} />
          <Route path="/PromotionPage" element={<PromotionPage />} />
          <Route path="/NewsPage" element={<NewsPage />} />
          <Route path="/TotalIncomePage" element={<TotalIncomePage />} />
          <Route path="/AddDroner" element={<AddDroner />} />
          <Route path="/DroneList" element={<DroneList />} />
          <Route path="/PricePage" element={<PricePage />} />
          <Route path="/IndexDroneBrand" element={<IndexDroneBrand />} />
          <Route path="/AddDroneBrand" element={<AddDroneBrand />} />
          <Route path="/EditDroneBrand/:id" element={<EditDroneBrand />} />
          <Route path="/IndexRankDroner" element={<IndexRankDroner />} />
          <Route path="/DetailRankDroner" element={<DetailRankDroner />} />
          <Route path="/DetailWorkDroner" element={<DetailWorkDroner />} />
          <Route path="/EditDroneList" element={<EditDroneList />} />
          <Route path="/EditNews/:id" element={<EditNewsPage />} />
          <Route path="/IndexAdmin" element={<IndexAdmin />} />
          <Route path="/AddAdmin" element={<AddAdmin />} />
          <Route path="/EditAdmin/:id" element={<EditAdmin />} />
          <Route path="/IndexNewTask" element={<IndexNewTask />} />
          <Route path="/AddNewTask:type" element={<AddNewTask />} />
          <Route path="/EditNewTask/:id" element={<EditNewTask />} />
          <Route
            path="/IndexInprogressTask"
            element={<IndexInprogressTask />}
          />
          <Route
            path="/EditInprogressTask/:id"
            element={<EditInprogressTask />}
          />
          <Route path="/IndexTodayTask" element={<IndexTodayTask />} />
          <Route path="/EditWaitStart" element={<EditWaitStart />} />
          <Route path="/EditInProgress" element={<EditInProgress />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/EditPromotion/:id" element={<EditPromotion />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/AddPromotion" element={<AddPromotion />} />
          <Route path="/AddNews" element={<AddNewsPage />} />
          <Route path="/IndexReport" element={<IndexReport />} />
          <Route path="/EditReport" element={<EditReport />} />
          <Route path="/IndexCampaignPoint" element={<IndexCampaignPoint />} />
          <Route path="/AddCampaignPoint" element={<AddCampaignPoint />} />
          <Route
            path="/IndexDetailFarmerPoint/:id"
            element={<IndexDetailFarmerPoint />}
          />
          <Route
            path="/IndexDetailDronerPoint/:id"
            element={<IndexDetailDronerPoint />}
          />
          <Route
            path="/EditCampaignPoint/:id"
            element={<EditCampaignPoint />}
          />
          <Route path="/ConditionDroner" element={<ConditionDroner />} />
          <Route path="/ConditionFarmer" element={<ConditionFarmer />} />
          <Route path="/IndexReceivePoint" element={<IndexReceivePoint />} />
          <Route path="/IndexPlanningPoint" element={<IndexPlanningPoint />} />
          <Route
            path="/DetailReceivePoint/:id"
            element={<DetailReceivePoint />}
          />
          <Route path="/IndexRedeem/:type" element={<IndexRedeem />} />
          <Route
            path="/DetailFarmerRedeem/:id"
            element={<DetailFarmerRedeem />}
          />
          <Route
            path="/DetailDronerRedeem/:id"
            element={<DetailDronerRedeem />}
          />
          <Route
            path="/IndexDronerSummaryPoint"
            element={<IndexDronerSummaryPoint />}
          />
          <Route path="/IndexReward" element={<IndexReward />} />
          <Route path="/AddReward" element={<AddReward />} />
          <Route path="/EditReward/:id" element={<EditReward />} />
          <Route path="/RedeemHistory/:id" element={<RedeemHistory />} />
          <Route path="/IndexFarmerSummary" element={<IndexFarmerSummary />} />
          <Route
            path="/IndexFarmerHistorySum/:id"
            element={<IndexFarmerHistorySum />}
          />
          <Route
            path="/DetailDronerHistorySum/:id"
            element={<DetailDronerHistorySum />}
          />
          <Route path="/MissionReport/:id" element={<MissionReport/>} />

          <Route path="/IndexQuota" element={<IndexQuota />} />
          <Route path="/AddQuota" element={<AddQuota />} />
          <Route path="/EditQuota/:id" element={<EditQuota />} />
          <Route path="/IndexDronerMission" element={<IndexDronerMission />} />
          <Route path="/AddDronerMission" element={<AddDronerMission />} />
          <Route
            path="/EditDronerMission/:id"
            element={<EditDronerMission />}
          />
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
