import { MenuProps, Menu, Breadcrumb, Row, Col, Button, Space } from "antd";
import Layout, { Content, Header } from "antd/lib/layout/layout";
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

const Layouts: React.FC<any> = ({ children }) => {
  const style: React.CSSProperties = {
    height: "100%",
    borderRight: 0,
    paddingTop: 30,
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Header
        style={{
          backgroundColor: "#FFFFFF",
          borderBottom: "0.1px",
          borderBottomColor: "#E0E0E0",
          borderBottomStyle: "solid",
        }}
      >
        <div className="d-flex justify-content-between">
          <div>
            <img src={HeaderLogo} width={140} />
          </div>
          <div className="d-flex align-items-center">
            <div className="me-4">
              <span>Make by Yeen</span>
            </div>
            <Button
              style={{ backgroundColor: color.primary1, color: color.BG }}
              //onClick={() => logout()}
              icon={<LogoutOutlined />}
              size="middle"
            />
          </div>
        </div>
      </Header>
      <Layout>
        <Sider width={200}>
          <Menu mode="inline" defaultOpenKeys={["order"]} style={style}>
            <Menu.Item icon={<SignalFilled />}>
              <Link to="/OverviewPage">
                <span>ภาพรวม</span>
              </Link>
            </Menu.Item>
            <Menu.SubMenu
              icon={<ProfileFilled />}
              title={<span>ติดตามงาน</span>}
              key={"sub1"}
            ></Menu.SubMenu>
            <Menu.Item icon={<DollarCircleFilled />}>
              <Link to="/TotalIncomePage">
                <span>ยอดรวมรายได้</span>
              </Link>
            </Menu.Item>
            <Menu.Item icon={<ContactsFilled />}>
              <Link to="/IndexFarmer">
                <span>ข้อมูลเกษตรกร</span>
              </Link>
            </Menu.Item>
            <Menu.SubMenu
              icon={<MacCommandFilled />}
              title={<span>ข้อมูลนักบินโดรน</span>}
              key={"sub2"}
            >
              <Menu.Item>
                <Link to="/IndexDroner">
                  <span>รายชื่อนักบินโดรน</span>
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/IndexDroner">
                  <span>รายการโดรนเกษตร</span>
                </Link>
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.Item icon={<GiftFilled />}>
              <Link to="/PromotionPage">
                <span>โปรโมชั่น</span>
              </Link>
            </Menu.Item>
            <Menu.SubMenu
              icon={<SettingFilled />}
              title={<span>ผู้ดูแลระบบ</span>}
              key={"sub3"}
            ></Menu.SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Layouts;
