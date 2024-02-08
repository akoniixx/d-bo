export const pathLists = (isAccounting: boolean, isAdminTask?: boolean) => {
  const menu = [
    {
      path: 'task',
      name: 'task',
      title: 'ติดตามงาน',
      permission: null,
      subMenu: [
        {
          path: '/IndexNewTask',
          name: 'IndexNewTask',
          title: 'งานใหม่ (รอนักบิน)',
          subMenu: [],
        },
        {
          path: '/IndexInprogressTask',
          name: 'IndexInprogressTask',
          title: 'งานรอดำเนินการ',
          subMenu: [],
        },
        {
          path: '/IndexTodayTask',
          name: 'IndexTodayTask',
          title: 'งานในวันนี้',
          subMenu: [],
        },
        {
          path: isAccounting ? '/IndexReport' : '/IndexFinishTask',
          name: isAccounting ? 'IndexReport' : 'IndexFinishTask',
          title: 'งานที่เสร็จสิ้น',
          subMenu: [],
        },
        {
          path: 'AdminTask',
          name: 'AdminTask',
          title: 'จัดการงานทั้งหมด',
          subMenu: [
            {
              path: '/IndexAdminTask',
              name: 'IndexAdminTask',
              title: 'แก้ไข/ประวัติงาน',
              subMenu: [],
            },
            {
              path: '/AdminCancelTask',
              name: 'AdminCancelTask',
              title: 'ยกเลิกงาน',
              subMenu: [],
            },
          ],
        },
      ],
    },
    {
      path: 'farmer',
      name: 'farmer',
      title: 'ข้อมูลเกษตรกร',
      permission: null,
      subMenu: [
        {
          path: '/IndexFarmer',
          name: 'IndexFarmer',
          title: 'รายชื่อเกษตรกร',
          permission: null,
          subMenu: [],
        },
        {
          path: '/IndexPlotList',
          name: 'IndexPlotList',
          title: 'รายการแปลงเกษตร',
          permission: null,
          subMenu: [],
        },
      ],
    },
    {
      path: 'droner',
      name: 'droner',
      title: 'ข้อมูลนักบินโดรน',
      permission: null,
      subMenu: [
        {
          path: '/IndexDroner',
          name: 'IndexDroner',
          title: 'รายชื่อนักบินโดรน',
          permission: null,
          subMenu: [],
        },
        {
          path: '/DroneList',
          name: 'DroneList',
          title: 'รายการโดรนเกษตร',
          permission: null,
          subMenu: [],
        },
        {
          path: '/IndexRankDroner',
          name: 'IndexRankDroner',
          title: 'อันดับนักบินโดรน',
          permission: null,
          subMenu: [],
        },
      ],
    },
    {
      path: 'news',
      name: 'news',
      title: 'ข่าวสาร/กูรูเกษตร',
      subMenu: [
        {
          path: 'newsIndex',
          name: 'news',
          title: 'ข่าวสาร',
          subMenu: [
            {
              path: '/NewsPage',
              name: 'NewsPage',
              title: 'รายการข่าวสาร',
              subMenu: [],
            },
            {
              path: '/PinNewsPage',
              name: 'PinNewsPage',
              title: 'ปักหมุดข่าวสาร',
              subMenu: [],
            },
            {
              path: '/HighlightNewsPage',
              name: 'HighlightNewsPage',
              title: 'ข่าวสารไฮไลท์',
              subMenu: [],
            },
          ],
        },
        {
          path: '/GuruPage',
          name: 'GuruPage',
          title: 'กูรูเกษตร',
          subMenu: [
            {
              path: '/IndexGuru',
              name: 'IndexGuru',
              title: 'รายการกูรูเกษตร',
              subMenu: [],
            },
            {
              path: '/IndexGroupGuru',
              name: 'IndexGroupGuru',
              title: 'หมวดหมู่',
              subMenu: [],
            },
          ],
        },
      ],
    },
    {
      path: 'promotion',
      name: 'promotion',
      title: 'โปรโมชั่น/คูปอง',
      subMenu: [
        {
          path: '/PromotionPage',
          name: 'PromotionPage',
          title: 'คูปอง',
          subMenu: [],
        },
      ],
    },
    {
      path: 'campaign',
      name: 'campaign',
      title: 'แต้มสะสม',
      subMenu: [
        {
          path: 'listPoint',
          name: 'listPoint',
          title: 'รายงานแต้ม',
          subMenu: [
            {
              path: '/IndexPlanningPoint',
              name: 'IndexPlanningPoint',
              title: 'รอรับแต้ม',
              subMenu: [],
            },
            {
              path: '/IndexReceivePoint',
              name: 'IndexReceivePoint',
              title: 'ได้รับแต้ม',
              subMenu: [],
            },
            {
              path: '/ViewHisRedeem/Farmer',
              name: 'ViewHisRedeem/Farmer',
              title: 'ประวัติการแลก',
              subMenu: [],
            },
          ],
        },
        {
          path: '/IndexPointManual',
          name: 'IndexPointManual',
          title: 'รายการแต้มพิเศษ',
          subMenu: [],
        },
        {
          path: 'summaryPoint',
          name: 'summaryPoint',
          title: 'แต้มรายบุคคล',
          permission: null,
          subMenu: [
            {
              path: '/IndexDronerSummaryPoint',
              name: 'IndexDronerSummaryPoint',
              title: 'นักบินโดรน',
              permission: null,
              subMenu: [],
            },
            {
              path: '/IndexFarmerSummary',
              name: 'IndexDronerSummary',
              title: 'เกษตรกร',
              permission: null,
              subMenu: [],
            },
          ],
        },
        {
          path: '/IndexCampaignPoint',
          name: 'IndexCampaignPoint',
          title: 'แคมเปญแต้ม',
          subMenu: [],
        },
      ],
    },
    {
      path: 'rewards',
      name: 'rewards',
      title: 'ของรางวัล',
      permission: null,
      subMenu: [
        {
          path: 'listReward',
          name: 'listReward',
          title: 'รายการของรางวัล',
          permission: null,
          subMenu: [
            {
              path: '/IndexRewardDroner',
              name: 'IndexRewardDroner',
              title: 'นักบินโดรน',
              permission: null,
              subMenu: [],
            },
            {
              path: '/IndexRewardFarmer',
              name: 'IndexRewardFarmer',
              title: 'เกษตรกร',
              permission: null,
              subMenu: [],
            },
          ],
        },
        {
          path: 'historyRedeem',
          name: 'historyRedeem',
          title: 'ประวัติการแลก',
          permission: null,
          subMenu: [
            {
              path: '/IndexRedeemDroner',
              name: 'IndexRedeemDroner',
              title: 'นักบินโดรน',
              permission: null,
              subMenu: [],
            },
            {
              path: '/IndexRedeemFarmer',
              name: 'IndexRedeemFarmer',
              title: 'เกษตรกร',
              permission: null,
              subMenu: [],
            },
          ],
        },
      ],
    },
    {
      path: 'mission',
      name: 'mission',
      title: 'ภารกิจ',
      subMenu: [
        {
          path: '/IndexDronerMission',
          name: 'IndexDronerMission',
          title: 'นักบินโดรน',
          subMenu: [],
        },
      ],
    },
    {
      path: 'challenge',
      name: 'challenge',
      title: 'ชาเลนจ์',
      subMenu: [
        {
          path: '/IndexQuota',
          name: 'IndexQuota',
          title: 'นักบินโดรน',
          subMenu: [],
        },
      ],
    },
    {
      path: 'admin',
      name: 'admin',
      title: 'ผู้ดูแลระบบ',
      subMenu: [
        {
          path: '/IndexAdmin',
          name: 'IndexAdmin',
          title: 'รายชื่อผู้ดูแลระบบ',
          subMenu: [],
        },
        {
          path: '/IndexPermission',
          name: 'IndexPermission',
          title: 'บทบาทผู้ดูแล',
          subMenu: [],
        },
      ],
    },
    {
      path: 'setting',
      name: 'setting',
      title: 'ตั้งค่า',
      subMenu: [
        {
          path: '/IndexDroneBrand',
          name: 'IndexDroneBrand',
          title: 'ยี่ห้อโดรน',
          subMenu: [],
        },
        {
          path: '/IndexCrop',
          name: 'IndexCrop',
          title: 'รายชื่อพืช',
          subMenu: [],
        },
        {
          path: '/Target',
          name: 'Target',
          title: 'เป้าหมาย',
          subMenu: [
            {
              path: '/IndexTargetSpray',
              name: 'IndexTargetSpray',
              title: 'ฉีดพ่น',
              subMenu: [],
            },
          ],
        },
        {
          path: '/PricePage',
          name: 'PricePage',
          title: 'ราคา',
          subMenu: [],
        },
        {
          path: '/reward',
          name: 'reward',
          title: 'แต้ม',
          subMenu: [
            {
              path: '/ConditionDroner',
              name: 'ConditionDroner',
              title: 'นักบินโดรน',
              subMenu: [],
            },
            {
              path: '/ConditionFarmer',
              name: 'ConditionFarmer',
              title: 'เกษตรกร',
              subMenu: [],
            },
          ],
        },
        {
          path: '/credit',
          name: 'credit',
          title: 'เครดิต',
          subMenu: [
            {
              path: '/CreditDroner',
              name: 'CreditDroner',
              title: 'นักบินโดรน',
              subMenu: [],
            },
          ],
        },
      ],
    },
    {
      path: 'infinity',
      name: 'infinity',
      title: 'ระบบ 1-finity',
      subMenu: [
        {
          path: '/DronerInfinity',
          name: 'DronerInfinity',
          title: 'รายชื่อนักบินโดรน',
          subMenu: [],
        },
        {
          path: '/IndexListStore',
          name: 'IndexListStore',
          title: 'รายชื่อร้านค้า',
          subMenu: [],
        },
      ],
    },
  ]

  // if (isAdminTask) {
  //   return menu.map((x) => {
  //     const find = menu.findIndex(() => x.name === 'task')
  //     if (find === 0) {
  //       const newMenu = menu[find]
  //       return {
  //         ...newMenu,
  //         subMenu: [
  //           ...newMenu.subMenu,
  //           {
  //             path: 'AdminTask',
  //             name: 'AdminTask',
  //             title: 'จัดการงานทั้งหมด',
  //             subMenu: [
  //               {
  //                 path: '/IndexAdminTask',
  //                 name: 'IndexAdminTask',
  //                 title: 'แก้ไข/ประวัติงาน',
  //                 subMenu: [],
  //               },
  //               {
  //                 path: '/AdminCancelTask',
  //                 name: 'AdminCancelTask',
  //                 title: 'ยกเลิกงาน',
  //                 subMenu: [],
  //               },
  //             ],
  //           },
  //         ],
  //       }
  //     } else {
  //       return { ...x }
  //     }
  //   })
  // }
  return menu
}
