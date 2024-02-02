export const mappingRoles = {
  admin: 'admin',
  challenge: 'challenge',
  droner: 'dronerInfo',
  farmer: 'farmerInfo',
  task: 'followJob',
  news: 'guru',
  mission: 'mission',
  campaign: 'pointResult',
  promotion: 'promotion',
  rewards: 'reward',
  setting: 'settings',
  infinity: 'finity',
}

const mappingTask = {
  IndexNewTask: 'งานใหม่ (รอนักบิน)',
  IndexInprogressTask: 'งานรอดำเนินงาน',
  IndexTodayTask: 'งานในวันนี้',
  IndexFinishTask: 'งานที่เสร็จแล้ว',
}
const mappingAdmin = {
  IndexAdmin: 'รายชื่อผู้ดูแล',
  IndexPermission: 'บทบาทผู้ดูแล',
}
const mappingFarmer = {
  IndexFarmer: 'รายชื่อเกษตรกร',
  IndexPlotList: 'รายการแปลงเกษตร',
}
const mappingDroner = {
  IndexDroner: 'รายชื่อนักบินโดรน',
  DroneList: 'รายการโดรนเกษตร',
  IndexRankDroner: 'อันดับนักบินโดรน',
}
export const mappingSpecialKey = {
  news: 'ข่าวสาร',
  GuruPage: 'กูรูเกษตร',
  credit: 'เครดิต',
}
const mappingPromotion = {
  PromotionPage: 'คูปอง',
}
const mappingCampaign = {
  listPoint: 'รายงานแต้ม',
  IndexPointManual: 'รายการแต้มพิเศษ',
  summaryPoint: 'แต้มรายบุคคล',
  IndexCampaignPoint: 'แต้มรายบุคคล',
}
const mappingRewards = {
  listReward: 'รายการของรางวัล',
  historyRedeem: 'ประวัติการแลก',
}

const mappingMission = {
  IndexDronerMission: 'นักบินโดรน',
}
const mappingChallenge = {
  IndexQuota: 'นักบินโดรน',
}
const mappingSetting = {
  IndexDroneBrand: 'ยี่ห้อโดรน',
  IndexCrop: 'รายชื่อพืช',
  Target: 'เป้าหมาย',
  PricePage: 'ราคา',
  reward: 'แต้ม',
  credit: 'เครดิต',
}

export const mappingNoPermissionSubMenu = {
  campaign: mappingCampaign,
}

const mappingListReward = {
  IndexRewardDroner: 'นักบินโดรน',
  IndexRewardFarmer: 'เกษตรกร',
}
export const mappingNestedSubMenu = {
  GuruPage: {
    IndexGuru: 'รายการกูรูเกษตร',
    IndexGroupGuru: 'หมวดหมู่',
  },
  listReward: mappingListReward,
  Target: {
    IndexTargetSpray: 'เป้าหมาย',
  },
}

export const mappingSubAllMenu = {
  task: mappingTask,
  admin: mappingAdmin,
  farmer: mappingFarmer,
  droner: mappingDroner,
  news: mappingSpecialKey,
  promotion: mappingPromotion,
  campaign: mappingCampaign,
  rewards: mappingRewards,
  mission: mappingMission,
  challenge: mappingChallenge,
  setting: mappingSetting,
  infinity: {
    DronerInfinity: 'รายชื่อนักบินโดรน',
    IndexListStore: 'รายชื่อร้านค้า',
  },
}
