import {
  MenuProps,
  Menu,
  Breadcrumb,
  Row,
  Col,
  Button,
  Space,
  AutoComplete,
} from "antd";
import Layout, { Content, Footer, Header } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import React, { Children, useState } from "react";
import {
  GiftFilled,
  SettingFilled,
  ProfileFilled,
  SignalFilled,
  MacCommandFilled,
  LogoutOutlined,
  ContactsFilled,
  DollarCircleFilled,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import HeaderLogo from "../../resource/media/logos/HeaderLogo.png";
import color from "../../resource/color";
import icon from "../../resource/icon";
import { useLocalStorage } from "../../hook/useLocalStorage";
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
          width={200}
          style={{ position: "fixed", height: "100%", marginTop: "50px" }}
        >
          <Menu mode="inline" defaultOpenKeys={["order"]} style={style}>
            <Menu.Item icon={<SignalFilled />}>
              <Link to="/OverviewPage" style={{ textDecoration: "none" }}>
                <span>ภาพรวม</span>
              </Link>
            </Menu.Item>
            <Menu.SubMenu
              icon={<ProfileFilled />}
              title={<span>ติดตามงาน</span>}
              key={"sub1"}
            ></Menu.SubMenu>
            <Menu.Item icon={<DollarCircleFilled />}>
              <Link to="/TotalIncomePage" style={{ textDecoration: "none" }}>
                <span>ยอดรวมรายได้</span>
              </Link>
            </Menu.Item>
            <Menu.Item icon={<ContactsFilled />}>
              <Link to="/IndexFarmer" style={{ textDecoration: "none" }}>
                <span>ข้อมูลเกษตรกร</span>
              </Link>
            </Menu.Item>
            <Menu.SubMenu
              icon={<MacCommandFilled />}
              title={<span>ข้อมูลนักบินโดรน</span>}
              key={"sub2"}
            >
              <Menu.Item>
                <Link to="/IndexDroner" style={{ textDecoration: "none" }}>
                  <span>รายชื่อนักบินโดรน</span>
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/DroneList" style={{ textDecoration: "none" }}>
                  <span>รายการโดรนเกษตร</span>
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/IndexRateDroner" style={{ textDecoration: "none" }}>
                  <span>อันดับนักบินโดรน</span>
                </Link>
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.Item icon={<GiftFilled />}>
              <Link to="/PromotionPage" style={{ textDecoration: "none" }}>
                <span>โปรโมชั่น</span>
              </Link>
            </Menu.Item>
            <Menu.SubMenu
              icon={<SettingFilled />}
              title={<span>ผู้ดูแลระบบ</span>}
              key={"sub3"}
            >
              <Menu.Item>
                <Link to="/IndexAdmin" style={{ textDecoration: "none" }}>
                  <span>รายชื่อผู้ดูแลระบบ</span>
                </Link>
              </Menu.Item>
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
