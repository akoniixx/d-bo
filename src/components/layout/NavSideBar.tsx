import { Menu, Button } from "antd";
import Layout, { Content, Footer, Header } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import React, { Children, useEffect, useState } from "react";
import { LogoutOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import color from "../../resource/color";
import icon from "../../resource/icon";
import { useLocalStorage } from "../../hook/useLocalStorage";
import { MenuSide } from "./MenuSide";
import { pathLists } from "./SideBar";

const logout = () => {
  localStorage.clear();
  sessionStorage.clear();
  var url = window.location.origin + "/AuthPage";
  window.location.href = url;
};
const NavSidebar: React.FC<any> = ({ children }) => {
  const [persistedProfile, setPersistedProfile] = useLocalStorage(
    "profile",
    []
  );
  const listReportAcc = [
    "ick_accounting",
    "minkact",
    "arisa.m@iconkaset",
    "nathapon",
    "issariya",
  ];
  const listAdminTask = [
    "Khanittha.w",
    "oatchara.s@iconkaset",
    "nathapon.h@iconkaset.com",
    "sawatdee.k",
  ];
  const checkReportAcc = listReportAcc.includes(persistedProfile.username);
  const checkAdminTask = listAdminTask.includes(persistedProfile.username);
  const isReportAccount = checkReportAcc;
  const isAdminTask = checkAdminTask;
  const navigate = useNavigate();

  return (
    <Layout>
      <Header
        style={{
          position: "fixed",
          zIndex: 1200,
          width: "100%",
          backgroundColor: "#FFFFFF",
          borderBottom: "0.1px",
          borderBottomColor: "#C6C6C6",
          borderBottomStyle: "solid",
          height: "64px",
        }}
      >
        <div className="d-flex justify-content-between">
          <div>
            <img
              style={{ cursor: "pointer" }}
              src={icon.logoHeader}
              width={140}
              onClick={() => navigate("/HomePage")}
            />
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
          style={{
            overflowX: "auto",
            height: "90%",
            position: "fixed",
            marginTop: 65,
            backgroundColor: color.White,
            cursor: "pointer",
          }}
        >
          <MenuSide lists={pathLists(isReportAccount, isAdminTask)} />
        </Sider>
      </Layout>
    </Layout>
  );
};

export default NavSidebar;
