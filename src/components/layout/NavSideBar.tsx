import { useLocation } from "react-router-dom";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";
import { Header } from "antd/lib/layout/layout";
import icon from "../../resource/icon";
import { useLocalStorage } from "../../hook/useLocalStorage";
import { Button, Col, Dropdown, Image } from "antd";
import { color } from "../../resource";
import { Navigation } from "react-minimal-side-navigation";
import {
  ContactsFilled,
  GiftFilled,
  LogoutOutlined,
  MacCommandFilled,
  ProfileFilled,
  SettingFilled,
  StarFilled,
  UserOutlined,
} from "@ant-design/icons";

export const NavSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [persistedProfile, setPersistedProfile] = useLocalStorage(
    "profile",
    []
  );
  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    var url = window.location.href;
    var arr = url.split("/");
    var resultUrlHost = arr[0] + "//" + arr[2];
    window.location.href = "AuthPage";
  };
  return (
    <>
      <div />
      <Header
        style={{
          position: "fixed",
          zIndex: 1200,
          width: "100%",
          backgroundColor: "#FFFFFF",
          borderBottom: "0.1px",
          borderBottomColor: "#C6C6C6",
          borderBottomStyle: "solid",
        }}
      >
        <div className="d-flex justify-content-between">
          <div>
            <img src={icon.logoHeader} width={140} />
          </div>
          <div className="d-flex align-items-center">
            <div className="me-4">
              <span>
                <b>
                  {persistedProfile.firstname +
                    " " +
                    persistedProfile.lastname +
                    " " +
                    "(" +
                    persistedProfile.role +
                    ")"}
                </b>
              </span>
            </div>
            <Button
              style={{
                backgroundColor: color.primary1,
                color: color.BG,
                borderRadius: "5px",
              }}
              onClick={() => logout()}
              icon={<LogoutOutlined />}
              size="middle"
            />
          </div>
        </div>
      </Header>
      <div
        style={{
          position: "fixed",
          height: "100%",
          marginTop: 65,
          fontSize: "16px",
          backgroundColor: color.White,
        }}
      >
        <Navigation
          activeItemId={location.pathname}
          onSelect={({ itemId }: any) => {
            console.log(itemId)
            if (
              itemId === "/task" ||
              itemId === "/droner" ||
              itemId === "/news" ||
              itemId === "/point" ||
              itemId === "/admin" ||
              itemId === "/setting" ||
              itemId === "/pointCon"
            ) {
              return isSidebarOpen ? "block" : "hidden";
            } else;
            navigate(itemId);
          }}
          items={[
            {
              title: "ติดตามงาน",
              itemId: "/task",
              elemBefore: () => <ProfileFilled />,
              subNav: [
                {
                  title: "งานใหม่ (รอนักบิน)",
                  itemId: "/IndexNewTask",
                },
                {
                  title: "งานรอดำเนินงาน",
                  itemId: "/IndexInprogressTask",
                },
                {
                  title: "งานในวันนี้",
                  itemId: "/IndexTodayTask",
                },
                {
                  title: "งานที่เสร็จแล้ว",

                  itemId: "/IndexFinishTask",
                },
              ],
            },
            {
              title: "ข้อมูลเกษตรกร",
              itemId: "/IndexFarmer",
              elemBefore: () => <ContactsFilled />,
            },
            {
              title: " ข้อมูลนักบินโดรน",
              itemId: "/droner",
              elemBefore: () => <MacCommandFilled />,
              subNav: [
                {
                  title: "รายชื่อนักบินโดรน",
                  itemId: "/IndexDroner",
                },
                {
                  title: "รายการโดรนเกษตร",
                  itemId: "/DroneList",
                },
                {
                  title: "อันดับนักบินโดรน",
                  itemId: "/IndexRankDroner",
                },
              ],
            },
            {
              title: " ข่าวสารและโปรโมชั่น",
              itemId: "/news",
              elemBefore: () => <GiftFilled />,
              subNav: [
                {
                  title: "ข่าวสาร",
                  itemId: "/NewsPage",
                },
                {
                  title: "คูปอง",
                  itemId: "/PromotionPage",
                },
              ],
            },
            {
              title: " คะแนนสะสม",
              itemId: "/point",
              elemBefore: () => <StarFilled />,
              subNav: [
                {
                  title: "แคมเปญคะแนน",
                  itemId: "/IndexCampaignPoint",
                },
              ],
            },
            {
              title: " ผู้ดูแลระบบ",
              itemId: "/admin",
              elemBefore: () => <UserOutlined />,
              subNav: [
                {
                  title: "รายชื่อผู้ดูแลระบบ",
                  itemId: "/IndexAdmin",
                },
              ],
            },
            {
              title: " ตั้งค่า",
              itemId: "/setting",
              elemBefore: () => <SettingFilled />,
              subNav: [
                {
                  title: "ยี่ห้อโดรน",
                  itemId: "/IndexDroneBrand",
                },
                {
                  title: "ราคาฉีดพ่น",
                  itemId: "/PricePage",
                },
                {
                  title: "คะแนน",
                  itemId: "/pointCon",
                  subNav: [
                    {
                      title: "เงื่อนไขเกษตรกร",
                      itemId: "/ConditionFarmer",
                    },
                  ],
                },
              ],
            },
          ]}
        />
      </div>
    </>
  );
};
