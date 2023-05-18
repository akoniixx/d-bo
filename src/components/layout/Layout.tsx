import { Menu, Button } from "antd";
import Layout, { Content, Footer, Header } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import React, { Children, useEffect, useState } from "react";
import {
  GiftFilled,
  SettingFilled,
  ProfileFilled,
  SignalFilled,
  MacCommandFilled,
  LogoutOutlined,
  ContactsFilled,
  DollarCircleFilled,
  UserOutlined,
  StarFilled,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import color from "../../resource/color";
import icon from "../../resource/icon";
import { useLocalStorage } from "../../hook/useLocalStorage";
import { AdminDatasource } from "../../datasource/AdminDatasource";
import {
  UserStaffPageEntity,
  UserStaffPageEntity_INIT,
} from "../../entities/UserStaffEntities";
const logout = () => {
  localStorage.clear();
  sessionStorage.clear();
  var url = window.location.href;
  var arr = url.split("/");
  var resultUrlHost = arr[0] + "//" + arr[2];
  window.location.href = "AuthPage";
};

const Layouts: React.FC<any> = ({ children }) => {
  const [persistedProfile, setPersistedProfile] = useLocalStorage(
    "profile",
    []
  );

  const style: React.CSSProperties = {
    height: "100%",
    paddingTop: 30,
  };
  return (
    <Layout style={{ height: "100vh" }}>
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
      <Layout>
        <Sider
          width={205}
          style={{
            position: "fixed",
            height: "100%",
            marginTop: "50px",
          }}
        >
          <Menu mode="inline" defaultOpenKeys={["order"]} style={style}>
            {/* <Menu.Item icon={<SignalFilled />} key="overview">
              <Link to="/OverviewPage" style={{ textDecoration: "none" }}>
                <span>ภาพรวม</span>
              </Link>
            </Menu.Item> */}
            <Menu.SubMenu
              icon={<ProfileFilled />}
              title={<span>ติดตามงาน</span>}
              key={"sub1"}
            >
              <Menu.Item key="newTask">
                <Link to="/IndexNewTask" style={{ textDecoration: "none" }}>
                  <span>งานใหม่ (รอนักบิน)</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="inprogressTask">
                <Link
                  to="/IndexInprogressTask"
                  style={{ textDecoration: "none" }}
                >
                  <span>งานรอดำเนินงาน</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="todayTask">
                <Link to="/IndexTodayTask" style={{ textDecoration: "none" }}>
                  <span>งานในวันนี้</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="finishTask">
                {persistedProfile.username == "ick_accounting" ? (
                  <Link to="/IndexReport" style={{ textDecoration: "none" }}>
                    <span>งานที่เสร็จแล้ว</span>
                  </Link>
                ) : (
                  <Link
                    to="/IndexFinishTask"
                    style={{ textDecoration: "none" }}
                  >
                    <span>งานที่เสร็จแล้ว</span>
                  </Link>
                )}
              </Menu.Item>
            </Menu.SubMenu>
            {/* <Menu.Item key="totalIncome" icon={<DollarCircleFilled />}>
              <Link to="/TotalIncomePage" style={{ textDecoration: "none" }}>
                <span>ยอดรวมรายได้</span>
              </Link>
            </Menu.Item> */}
            <Menu.Item key="farmer" icon={<ContactsFilled />}>
              <Link to="/IndexFarmer" style={{ textDecoration: "none" }}>
                <span>ข้อมูลเกษตรกร</span>
              </Link>
            </Menu.Item>
            <Menu.SubMenu
              icon={<MacCommandFilled />}
              title={<span>ข้อมูลนักบินโดรน</span>}
              key={"sub3"}
            >
              <Menu.Item key="droner">
                <Link to="/IndexDroner" style={{ textDecoration: "none" }}>
                  <span>รายชื่อนักบินโดรน</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="dronerList">
                <Link to="/DroneList" style={{ textDecoration: "none" }}>
                  <span>รายการโดรนเกษตร</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="rankDroner">
                <Link to="/IndexRankDroner" style={{ textDecoration: "none" }}>
                  <span>อันดับนักบินโดรน</span>
                </Link>
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu
              icon={<GiftFilled />}
              title={<span>ข่าวสารและโปรโมชั่น</span>}
              key={"sub4"}
            >
              <Menu.Item key="news">
                <Link to="/NewsPage" style={{ textDecoration: "none" }}>
                  <span>ข่าวสาร</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="promotion">
                <Link to="/PromotionPage" style={{ textDecoration: "none" }}>
                  <span>คูปอง</span>
                </Link>
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu
              icon={<StarFilled />}
              title={<span>คะแนนสะสม</span>}
              key={"sub7"}
            >
              <Menu.SubMenu title={<span>รายการคะแนน</span>} key={"sub9"}>
                <Menu.Item key="planningpoint">
                  <Link
                    to="/IndexPlanningPoint"
                    style={{ textDecoration: "none" }}
                  >
                    <span>รอรับคะแนน</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="receivepoint">
                  <Link
                    to="/IndexReceivePoint"
                    style={{ textDecoration: "none" }}
                  >
                    <span>ได้รับคะแนน</span>
                  </Link>
                </Menu.Item>
              </Menu.SubMenu>

              <Menu.Item key="campaignpoint">
                <Link
                  to="/IndexCampaignPoint"
                  style={{ textDecoration: "none" }}
                >
                  <span>แคมเปญคะแนน</span>
                </Link>
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu
              icon={<UserOutlined />}
              title={<span>ผู้ดูแลระบบ</span>}
              key={"sub5"}
            >
              <Menu.Item key="admin">
                <Link to="/IndexAdmin" style={{ textDecoration: "none" }}>
                  <span>รายชื่อผู้ดูแลระบบ</span>
                </Link>
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu
              icon={<SettingFilled />}
              title={<span>ตั้งค่า</span>}
              key={"sub6"}
            >
              <Menu.Item key="IndexDroneBrand">
                <Link to="/IndexDroneBrand" style={{ textDecoration: "none" }}>
                  <span>ยี่ห้อโดรน</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="pricePage">
                <Link to="/PricePage" style={{ textDecoration: "none" }}>
                  <span>ราคาฉีดพ่น</span>
                </Link>
              </Menu.Item>
              <Menu.SubMenu title={<span>คะแนน</span>} key={"sub8"}>
                <Menu.Item key="conditionFarmer">
                  <Link
                    to="/ConditionFarmer"
                    style={{ textDecoration: "none" }}
                  >
                    <span>เงื่อนไขเกษตรกร</span>
                  </Link>
                </Menu.Item>
                {/* <Menu.Item key="conditionDroner">
                <Link to="/ConditionDroner" style={{ textDecoration: "none" }}>
                  <span>เงื่อนไขนักบินโดรน</span>
                </Link>
              </Menu.Item> */}
              </Menu.SubMenu>
            </Menu.SubMenu>
          </Menu>
        </Sider>
        <Layout
          style={{
            height: "max-content",
            marginLeft: 200,
            marginTop: 60,
            padding: 30,
          }}
        >
          <Content>{children}</Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Layouts;
