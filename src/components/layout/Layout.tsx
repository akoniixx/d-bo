import { MenuProps, Menu, Breadcrumb, Row, Col, Button, Space } from "antd";
import Layout, { Content, Header } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import React, { Children, useState } from "react";
import {
  HomeOutlined,
  ShoppingCartOutlined,
  GiftOutlined,
  TagOutlined,
  UserOutlined,
  FundOutlined,
  ContainerOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import icon from "../../resource/icon";
import  HeaderLogo  from "../../resource/media/logos/HeaderLogo.png";

const Layouts: React.FC<any> = ({ children }) => { 

  return (
    <Layout style={{ height: "100vh" }}>
      <Header
        style={{
          backgroundColor: "#FFFFFF",
          borderBottom: "0.1px",
          borderBottomColor: "#E0E0E0",
          borderBottomStyle: "solid",
          padding: "0 20px"
        }}
      >
        <div className="">
            <div>
              <img src={HeaderLogo} width={140} />
            </div>
            <div>
            <Button
                //onClick={() => logout()}
                icon={<LogoutOutlined />}
                size="middle"
              />
            </div>
        </div>
        
       

      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultOpenKeys={["order"]}
            style={{ height: "100%", borderRight: 0, paddingTop: 30 }}
          >
            <Menu.Item key={"order"} icon={<ShoppingCartOutlined />}>
              <Link to="/OverviewPage">
                <span>ภาพรวม</span>
              </Link>
            </Menu.Item>
            <Menu.SubMenu
              icon={<ContainerOutlined />}
              title={<span>ติดตามงาน</span>}
              key={"sub1"}
            >
            </Menu.SubMenu>
            <Menu.Item key={"order"} icon={<ShoppingCartOutlined />}>
              <Link to="/TotalIncomePage">
                <span>ยอดรวมรายได้</span>
              </Link>
            </Menu.Item>
            <Menu.Item key={"order"} icon={<ShoppingCartOutlined />}>
              <Link to="/IndexFarmer">
                <span>ข้อมูลเกษตรกร</span>
              </Link>
            </Menu.Item>
            <Menu.Item key={"order"} icon={<ShoppingCartOutlined />}>
              <Link to="/IndexDroner">
                <span>ข้อมูลนักบินโดรน</span>
              </Link>
            </Menu.Item>
            <Menu.Item key={"order"} icon={<ShoppingCartOutlined />}>
              <Link to="/PromotionPage">
                <span>โปรโมชั่น</span>
              </Link>
            </Menu.Item>
            <Menu.SubMenu
              icon={<ContainerOutlined />}
              title={<span>ผู้ดูแลระบบ</span>}
              key={"sub2"}
            >
            </Menu.SubMenu>
            
          </Menu>
        </Sider>
        <Layout>
          <Content
            className="site-layout-background"
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
