import React, { useState } from "react";
import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";
import { Header } from "antd/lib/layout/layout";
import icon from "../../resource/icon";
import { useLocalStorage } from "../../hook/useLocalStorage";
import { Button } from "antd";
import { color } from "../../resource";
import { LogoutOutlined } from "@ant-design/icons";
import { pathLists } from "./SideBar";
import { MenuSide } from "./MenuSide";
import Sider from "antd/lib/layout/Sider";
export const NavSidebar = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(true);
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
  const isAccount = persistedProfile.username === "ick_accounting";
  return (
    <>
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
      <Sider
        width={240}
        style={{
          width: '240px',
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          marginTop: 65,
          fontSize: "16px",
          backgroundColor: color.White,
          cursor: "pointer",
        }}
      >
        
        <MenuSide
          lists={pathLists({ isAccounting: isAccount })}
          isOpenSidebar={isOpenSidebar}
        />              
      </Sider>
      {/* <div
        style={{
          position: "fixed",
          height: "100%",
          marginTop: 65,
          fontSize: "16px",
          backgroundColor: color.White,
          width: "240px",
          cursor: "pointer",
        }}
      >
        <MenuSide
          lists={pathLists({ isAccounting: isAccount })}
          isOpenSidebar={isOpenSidebar}
        />
      </div> */}
    </>
  );
};
