import React, { Suspense, lazy } from 'react'
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom'

import { Spin } from 'antd'
import ProtectRoute from './ProtectRoute'
import PublicRoute from './PublicRoute'
import DronerInfinityCreditList from './pages/infinity/droner/DronerInfinityCreditList'

const ErrorLoginPage = lazy(() => import('./errorPage/ErrorLoginPage'))
const PageNotFound = lazy(() => import('./httpError/PageNotFound'))
const AuthPage = lazy(() => import('./pages/authPage/AuthPage'))
const AddDroner = lazy(() => import('./pages/droner/AddDroner'))
const DroneList = lazy(() => import('./pages/droner/DroneList'))
const EditDroneList = lazy(() => import('./pages/droner/EditDroneList'))
const EditDroner = lazy(() => import('./pages/droner/EditDroner'))
const IndexDroner = lazy(() => import('./pages/droner/IndexDroner'))
const AddFarmer = lazy(() => import('./pages/farmer/AddFarmer'))
const EditFarmer = lazy(() => import('./pages/farmer/EditFarmer'))
const IndexFarmer = lazy(() => import('./pages/farmer/IndexFarmer'))
const HomePage = lazy(() => import('./pages/home/HomePage'))
const OverviewPage = lazy(() => import('./pages/overview/OverviewPage'))
const PromotionPage = lazy(() => import('./pages/promotion/PromotionPage'))
const IndexAdmin = lazy(() => import('./pages/admin/IndexAdmin'))
const AddAdmin = lazy(() => import('./pages/admin/AddAdmin'))
const EditAdmin = lazy(() => import('./pages/admin/EditAdmin'))
const IndexFinishTask = lazy(() => import('./pages/task/finishTask/IndexFinishTask'))
const FinishTasks = lazy(() => import('./pages/task/finishTask/DetailTaskPage.tsx/FinishTask'))
const ReviewTask = lazy(() => import('./pages/task/finishTask/DetailTaskPage.tsx/ReviewTask'))
const CancelTask = lazy(() => import('./pages/task/finishTask/DetailTaskPage.tsx/CancelTask'))
const DetailWorkDroner = lazy(() => import('./pages/droner/DetailWorkDroner'))
const DetailRankDroner = lazy(() => import('./pages/droner/DetailRankDroner'))
const IndexRankDroner = lazy(() => import('./pages/droner/IndexRankDroner'))
const IndexNewTask = lazy(() => import('./pages/task/newTask/IndexNewTask'))
const AddNewTask = lazy(() => import('./pages/task/newTask/AddNewTask'))
const EditNewTask = lazy(() => import('./pages/task/newTask/EditNewTask'))
const IndexInprogressTask = lazy(() => import('./pages/task/inprogressTask/IndexInprogressTask'))
const EditInprogressTask = lazy(() => import('./pages/task/inprogressTask/EditInprogressTask'))
const EditWaitStart = lazy(() => import('./pages/task/todayTask/DetailEdit/EditWaitStart'))
const EditInProgress = lazy(() => import('./pages/task/todayTask/DetailEdit/EditInProgress'))
const IndexTodayTask = lazy(() => import('./pages/task/todayTask/IndexTaskToday'))
const AddPromotion = lazy(() => import('./pages/promotion/AddPromotionPage'))
const EditPromotion = lazy(() => import('./pages/promotion/EditPromotionPage'))
const PricePage = lazy(() => import('./pages/setting/PricePage'))
const AddDroneBrand = lazy(() => import('./pages/setting/masterDataDrone/AddDroneBrand'))
const IndexDroneBrand = lazy(() => import('./pages/setting/masterDataDrone/IndexDroneBrand'))
const EditDroneBrand = lazy(() => import('./pages/setting/masterDataDrone/EditDroneBrand'))
const IndexReport = lazy(() => import('./pages/report/IndexReport'))
const EditReport = lazy(() => import('./pages/report/EditReport'))
const NewsPage = lazy(() => import('./pages/news/NewsPage'))
const EditNewsPage = lazy(() => import('./pages/news/EditNewsPage'))
const AddNewsPage = lazy(() => import('./pages/news/AddNewsPage'))
const IndexCampaignPoint = lazy(() => import('./pages/campaign/point/IndexCampaignPoint'))
const AddCampaignPoint = lazy(() => import('./pages/campaign/point/AddCampaignPoint'))
const IndexDetailFarmerPoint = lazy(() => import('./pages/farmer/IndexDetailFarmerPoint'))
const IndexDetailDronerPoint = lazy(() => import('./pages/droner/IndexDetailDronerPoint'))
const EditCampaignPoint = lazy(() => import('./pages/campaign/point/EditCampaignPoint'))
const ConditionDroner = lazy(() => import('./pages/setting/pointSetting/ConditionDroner'))
const ConditionFarmer = lazy(() => import('./pages/setting/pointSetting/ConditionFarmer'))
const IndexRewardDroner = lazy(() => import('./pages/reward/droner/IndexRewardDroner'))
const AddRewardDroner = lazy(() => import('./pages/reward/droner/AddRewardDroner'))
const EditRewardDroner = lazy(() => import('./pages/reward/droner/EditRewardDroner'))
const RedeemHistoryDroner = lazy(() => import('./pages/reward/droner/RedeemHistoryDroner'))
const IndexRewardFarmer = lazy(() => import('./pages/reward/farmer/IndexRewardFarmer'))
const AddRewardFarmer = lazy(() => import('./pages/reward/farmer/AddRewardFarmer'))
const EditRewardFarmer = lazy(() => import('./pages/reward/farmer/EditRewardFarmer'))
const RedeemHistoryFarmer = lazy(() => import('./pages/reward/farmer/RedeemHistoryFarmer'))
const IndexReceivePoint = lazy(() => import('./pages/point/IndexReceivePoint'))
const IndexPlanningPoint = lazy(() => import('./pages/point/IndexPlanningPoint'))
const DetailReceivePoint = lazy(() => import('./pages/point/DetailReceivePoint'))
const IndexRedeem = lazy(() => import('./pages/redeem/IndexRedeem'))
const DetailFarmerRedeem = lazy(() => import('./pages/redeem/DetailFarmerRedeem'))
const DetailDronerRedeem = lazy(() => import('./pages/redeem/DetailDronerRedeem'))
const IndexDronerSummaryPoint = lazy(() => import('./pages/point/droner/IndexDronerSummaryPoint'))
const IndexFarmerSummary = lazy(() => import('./pages/point/farmer/IndexFarmerSummary'))
const IndexFarmerHistorySum = lazy(() => import('./pages/point/farmer/IndexFarmerHistorySum'))
const DetailDronerHistorySum = lazy(() => import('./pages/point/droner/DetailDronerHistorySum'))
const IndexQuota = lazy(() => import('./pages/quotaSetting/droner/IndexQuota'))
const AddQuota = lazy(() => import('./pages/quotaSetting/droner/AddQuota'))
const EditQuota = lazy(() => import('./pages/quotaSetting/droner/EditQuota'))
const IndexDronerMission = lazy(() => import('./pages/mission/droner/IndexDronerMission'))
const AddDronerMission = lazy(() => import('./pages/mission/droner/AddDronerMission'))
const EditDronerMission = lazy(() => import('./pages/mission/droner/EditDronerMission'))
const MissionReport = lazy(() => import('./pages/mission/droner/MissionReport'))
const QuotaReport = lazy(() => import('./pages/quotaSetting/droner/QuotaReport'))
const RewardReceived = lazy(() => import('./pages/quotaSetting/droner/RewardReceived'))
const IndexAdminTask = lazy(() => import('./pages/task/AdminTask/IndexAdminTask'))
const AdminCancelTask = lazy(() => import('./pages/task/AdminTask/AdminCancelTask'))
const IndexPlotList = lazy(() => import('./pages/farmer/plotList/IndexPlotList'))
const IndexPermission = lazy(() => import('./pages/permission/IndexPermission'))
const EditPermission = lazy(() => import('./pages/permission/EditPermission'))
const AddPermission = lazy(() => import('./pages/permission/AddPermission'))
const PinNewsPage = lazy(() => import('./pages/news/PinNewsPage'))
const IndexPointManual = lazy(() => import('./pages/pointManual/IndexPointManual'))
const DetailPointManual = lazy(
  () => import('./pages/pointManual/DetailPointManual/DetailPointManual'),
)
const AddDetailPointManual = lazy(
  () => import('./pages/pointManual/DetailPointManual/AddDetailPointManual'),
)
const EditDetailPointManual = lazy(
  () => import('./pages/pointManual/DetailPointManual/EditDetailPointManual'),
)
const HighlightNewsPage = lazy(() => import('./pages/highlightNews/HighlightNewsPage'))
const AddHighlightPage = lazy(() => import('./pages/highlightNews/AddHighlightPage'))
const EditAddHighlightPage = lazy(() => import('./pages/highlightNews/EditAddHighlightPage'))
const IndexGuru = lazy(() => import('./pages/gurukaset/listGuru/IndexGuru'))
const AddArticleGuru = lazy(() => import('./pages/gurukaset/listGuru/addGuru/AddArticleGuru'))
const AddVideoGuru = lazy(() => import('./pages/gurukaset/listGuru/addGuru/AddVideoGuru'))
const EditArticleGuru = lazy(() => import('./pages/gurukaset/listGuru/editGuru/EditArticleGuru'))
const EditVideoGuru = lazy(() => import('./pages/gurukaset/listGuru/editGuru/EditVideoGuru'))
const IndexGroupGuru = lazy(() => import('./pages/gurukaset/groupGuru/IndexGroupGuru'))
const IndexListStore = lazy(() => import('./pages/infinity/listStore/IndexListStore'))
const DetailStore = lazy(() => import('./pages/infinity/listStore/DetailStore'))
const CreditDroner = lazy(() => import('./pages/setting/credit/CreditDroner'))
const DronerInfinity = lazy(() => import('./pages/infinity/droner/DronerInfinity'))
const IndexTargetSpray = lazy(() => import('./pages/setting/targetSpray/IndexTargetSpray'))
const InsertTargetSpray = lazy(() => import('./pages/setting/targetSpray/InsertTargetSpray'))

const FallBack = () => {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Spin size='large' spinning />
    </div>
  )
}

const WebRoutes: React.FC<any> = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<FallBack />}>
        <Routes>
          <Route element={<ProtectRoute />}>
            <Route path='*' element={<Navigate to='/HomePage' />} />
            <Route path='/HomePage' element={<HomePage />} />
            <Route path='/OverviewPage' element={<OverviewPage />} />
            <Route path='/IndexFinishTask' element={<IndexFinishTask />} />
            <Route path='/FinishTasks' element={<FinishTasks />} />
            <Route path='/ReviewTask' element={<ReviewTask />} />
            <Route path='/CancelTask' element={<CancelTask />} />
            <Route path='/IndexDroner/*' element={<IndexDroner />} />
            <Route path='/EditDroner' element={<EditDroner />} />
            <Route path='/IndexFarmer/*' element={<IndexFarmer />} />
            <Route path='AddFarmer' element={<AddFarmer />} />
            <Route path='/EditFarmer/:id' element={<EditFarmer />} />
            <Route path='/PromotionPage' element={<PromotionPage />} />
            <Route path='/NewsPage' element={<NewsPage />} />
            <Route path='/PinNewsPage' element={<PinNewsPage />} />
            <Route path='/AddDroner' element={<AddDroner />} />
            <Route path='/DroneList' element={<DroneList />} />
            <Route path='/PricePage' element={<PricePage />} />
            <Route path='/IndexDroneBrand' element={<IndexDroneBrand />} />
            <Route path='/AddDroneBrand' element={<AddDroneBrand />} />
            <Route path='/EditDroneBrand/:id' element={<EditDroneBrand />} />
            <Route path='/IndexRankDroner' element={<IndexRankDroner />} />
            <Route path='/DetailRankDroner' element={<DetailRankDroner />} />
            <Route path='/DetailWorkDroner' element={<DetailWorkDroner />} />
            <Route path='/EditDroneList' element={<EditDroneList />} />
            <Route path='/EditNews/:id' element={<EditNewsPage />} />
            <Route path='/IndexAdmin' element={<IndexAdmin />} />
            <Route path='/AddAdmin' element={<AddAdmin />} />
            <Route path='/EditAdmin/:id' element={<EditAdmin />} />
            <Route path='/IndexNewTask' element={<IndexNewTask />} />
            <Route path='/AddNewTask:type' element={<AddNewTask />} />
            <Route path='/EditNewTask/:id' element={<EditNewTask />} />
            <Route path='/IndexInprogressTask' element={<IndexInprogressTask />} />
            <Route path='/EditInprogressTask/:id' element={<EditInprogressTask />} />
            <Route path='/IndexTodayTask' element={<IndexTodayTask />} />
            <Route path='/EditWaitStart' element={<EditWaitStart />} />
            <Route path='/EditInProgress' element={<EditInProgress />} />
            <Route path='*' element={<PageNotFound />} />
            <Route path='/EditPromotion/:id' element={<EditPromotion />} />
            <Route path='*' element={<PageNotFound />} />
            <Route path='/AddPromotion' element={<AddPromotion />} />
            <Route path='/AddNews' element={<AddNewsPage />} />
            <Route path='/IndexReport' element={<IndexReport />} />
            <Route path='/EditReport' element={<EditReport />} />
            <Route path='/IndexCampaignPoint' element={<IndexCampaignPoint />} />
            <Route path='/AddCampaignPoint' element={<AddCampaignPoint />} />
            <Route path='/IndexDetailFarmerPoint/:id' element={<IndexDetailFarmerPoint />} />
            <Route path='/IndexDetailDronerPoint/:id' element={<IndexDetailDronerPoint />} />
            <Route path='/EditCampaignPoint/:id' element={<EditCampaignPoint />} />
            <Route path='/ConditionDroner' element={<ConditionDroner />} />
            <Route path='/ConditionFarmer' element={<ConditionFarmer />} />
            <Route path='/IndexReceivePoint' element={<IndexReceivePoint />} />
            <Route path='/IndexPlanningPoint' element={<IndexPlanningPoint />} />
            <Route path='/DetailReceivePoint/:id' element={<DetailReceivePoint />} />
            <Route path='/IndexRedeem/:type' element={<IndexRedeem />} />
            <Route path='/DetailFarmerRedeem/:id' element={<DetailFarmerRedeem />} />
            <Route path='/DetailDronerRedeem/:id' element={<DetailDronerRedeem />} />
            <Route path='/IndexDronerSummaryPoint' element={<IndexDronerSummaryPoint />} />
            <Route path='/IndexRewardDroner' element={<IndexRewardDroner />} />
            <Route path='/AddRewardDroner' element={<AddRewardDroner />} />
            <Route path='/EditRewardDroner/:id' element={<EditRewardDroner />} />
            <Route path='/RedeemHistoryDroner/:id' element={<RedeemHistoryDroner />} />
            <Route path='/IndexRewardFarmer' element={<IndexRewardFarmer />} />
            <Route path='/AddRewardFarmer' element={<AddRewardFarmer />} />
            <Route path='/EditRewardFarmer/:id' element={<EditRewardFarmer />} />
            <Route path='/RedeemHistoryFarmer/:id' element={<RedeemHistoryFarmer />} />
            <Route path='/IndexFarmerSummary' element={<IndexFarmerSummary />} />
            <Route path='/IndexFarmerHistorySum/:id' element={<IndexFarmerHistorySum />} />
            <Route path='/DetailDronerHistorySum/:id' element={<DetailDronerHistorySum />} />
            <Route path='/QuotaReport/:id' element={<QuotaReport />} />
            <Route path='/MissionReport/:id' element={<MissionReport />} />

            <Route path='/IndexQuota' element={<IndexQuota />} />
            <Route path='/AddQuota' element={<AddQuota />} />
            <Route path='/EditQuota/:id' element={<EditQuota />} />
            <Route path='/IndexDronerMission' element={<IndexDronerMission />} />
            <Route path='/AddDronerMission' element={<AddDronerMission />} />
            <Route path='/RewardReceived/:id' element={<RewardReceived />} />
            <Route path='/EditDronerMission/:id' element={<EditDronerMission />} />
            <Route path='/IndexAdminTask' element={<IndexAdminTask />} />
            <Route path='/IndexPlotList' element={<IndexPlotList />} />
            <Route path='/IndexPermission' element={<IndexPermission />} />
            <Route path='/EditPermission/:id' element={<EditPermission />} />
            <Route path='/AddPermission' element={<AddPermission />} />
            <Route path='/IndexPointManual' element={<IndexPointManual />} />
            <Route path='/DetailPointManual/:id' element={<DetailPointManual />} />
            <Route path='/AddDetailPointManual' element={<AddDetailPointManual />} />
            <Route path='/EditDetailPointManual/:id' element={<EditDetailPointManual />} />
            <Route path='/AdminCancelTask' element={<AdminCancelTask />} />
            <Route path='/HighlightNewsPage' element={<HighlightNewsPage />} />
            <Route path='/AddHighlightPage' element={<AddHighlightPage />} />
            <Route path='/EditAddHighlightPage/:id' element={<EditAddHighlightPage />} />
            <Route path='/IndexGuru' element={<IndexGuru />} />
            <Route path='/AddArticleGuru' element={<AddArticleGuru />} />
            <Route path='/AddVideoGuru' element={<AddVideoGuru />} />
            <Route path='/EditArticleGuru/:id' element={<EditArticleGuru />} />
            <Route path='/EditVideoGuru/:id' element={<EditVideoGuru />} />
            <Route path='/IndexGroupGuru' element={<IndexGroupGuru />} />
            <Route path='/IndexListStore' element={<IndexListStore />} />
            <Route path='/DetailStore/:id' element={<DetailStore />} />
            <Route path='/CreditDroner' element={<CreditDroner />} />
            <Route path='/DronerInfinity' element={<DronerInfinity />} />
            <Route path='/DronerInfinity/:id' element={<DronerInfinityCreditList />} />
            <Route path='/IndexTargetSpray' element={<IndexTargetSpray />} />
            <Route path='/InsertTargetSpray/:id' element={<InsertTargetSpray />} />
          </Route>
          <Route element={<PublicRoute />}>
            <Route index element={<AuthPage />} />
            <Route path='/ErrorLoginPage' element={<ErrorLoginPage />} />
            <Route path='*' element={<PageNotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default WebRoutes
