export const pathLists = ({ isAccounting }: { isAccounting: boolean }) => [
  {
    path: "task",
    name: "task",
    title: "ติดตามงาน",
    permission: null,
    subMenu: [
      {
        path: "/IndexNewTask",
        name: "IndexNewTask",
        title: "งานใหม่ (รอนักบิน)",
        subMenu: [],
      },
      {
        path: "/IndexInprogressTask",
        name: "IndexInprogressTask",
        title: "งานรอดำเนินการ",
        subMenu: [],
      },
      {
        path: "/IndexTodayTask",
        name: "IndexTodayTask",
        title: "งานในวันนี้",
        subMenu: [],
      },
      {
        path: isAccounting ? "/IndexReport" : "/IndexFinishTask",
        name: isAccounting ? "IndexReport" : "IndexFinishTask",
        title: "งานที่เสร็จสิ้น",
        subMenu: [],
      },
    ],
  },
  {
    path: "/IndexFarmer",
    name: "IndexFarmer",
    title: "ข้อมูลเกษตรกร",
    permission: null,
    subMenu: [],
  },
  {
    path: "droner",
    name: "droner",
    title: "ข้อมูลนักบินโดรน",
    permission: null,
    subMenu: [
      {
        path: "/IndexDroner",
        name: "IndexDroner",
        title: "รายชื่อนักบินโดรน",
        permission: null,
        subMenu: [],
      },
      {
        path: "/DroneList",
        name: "DroneList",
        title: "รายการโดรนเกษตร",
        permission: null,
        subMenu: [],
      },
      {
        path: "/IndexRankDroner",
        name: "IndexRankDroner",
        title: "อันดับนักบินโดรน",
        permission: null,
        subMenu: [],
      },
    ],
  },
  {
    path: "news",
    name: "news",
    title: "ข่าวสารและโปรโมชั่น",
    subMenu: [
      {
        path: "/NewsPage",
        name: "NewsPage",
        title: "ข่าวสาร",
        subMenu: [],
      },
      {
        path: "/PromotionPage",
        name: "/PromotionPage",
        title: "คูปอง",
        subMenu: [],
      },
    ],
  },
  {
    path: "campaign",
    name: "campaign",
    title: "แต้มสะสม",
    subMenu: [
      {
        path: "listPoint",
        name: "listPoint",
        title: "รายการแต้ม",
        subMenu: [
          {
            path: "/IndexPlanningPoint",
            name: "IndexPlanningPoint",
            title: "รอรับแต้ม",
            subMenu: [],
          },
          {
            path: "/IndexReceivePoint",
            name: "IndexReceivePoint",
            title: "ได้รับแต้ม",
            subMenu: [],
          },
          {
            path: "/IndexRedeem/Farmer",
            name: "IndexRedeem/Farmer",
            title: "รายงานการแลก",
          },
        ],
      },
      {
        path: "summaryPoint",
        name: "summaryPoint",
        title: "แต้มรายบุคคล",
        permission: null,
        subMenu: [
          {
            path: "/IndexDronerSummaryPoint",
            name: "IndexDronerSummaryPoint",
            title: "นักบินโดรน",
            permission: null,
            subMenu: [],
          },
          {
            path: "/IndexFarmerSummary",
            name: "IndexDronerSummary",
            title: "เกษตรกร",
            permission: null,
            subMenu: [],
          },
        ],
      },
      {
        path: "rewards",
        name: "rewards",
        title: "ของรางวัล",
        permission: null,
        subMenu: [
          {
            path: "/IndexReward",
            name: "IndexReward",
            title: "นักบินโดรน",
            permission: null,
            subMenu: [],
          },
          // {
          //   path: "/IndexReward",
          //   name: "IndexReward",
          //   title: "เกษตรกร",
          //   permission: null,
          // }
        ],
      },
      {
        path: "/IndexCampaignPoint",
        name: "IndexCampaignPoint",
        title: "แคมเปญแต้ม",
        subMenu: [],
      },
    ],
  },

  {
    path: "admin",
    name: "admin",
    title: "ผู้ดูแลระบบ",
    subMenu: [
      {
        path: "/IndexAdmin",
        name: "IndexAdmin",
        title: "รายชื่อผู้ดูแลระบบ",
        subMenu: [],
      },
    ],
  },
  {
    path: "setting",
    name: "setting",
    title: "ตั้งค่า",
    subMenu: [
      {
        path: "/IndexDroneBrand",
        name: "IndexDroneBrand",
        title: "ยี่ห้อโดรน",
        subMenu: [],
      },
      {
        path: "/PricePage",
        name: "PricePage",
        title: "ราคาฉีดพ่น",
        subMenu: [],
      },
      {
        path: "/reward",
        name: "reward",
        title: "แต้ม",
        subMenu: [
          {
            path: "/ConditionFarmer",
            name: "ConditionFarmer",
            title: "เงื่อนไขเกษตรกร",
            subMenu: [],
          },
        ],
      },
    ],
  },
];
