// import React, { useState } from "react";
// import { Content, Footer, Header } from "antd/lib/layout/layout";
// import icon from "../../resource/icon";
// import { useLocalStorage } from "../../hook/useLocalStorage";
// import { Button, Layout, Menu } from "antd";
// import { color } from "../../resource";
// import { LogoutOutlined } from "@ant-design/icons";
// import { pathLists } from "./SideBar";
// import { MenuSide } from "./MenuSide";
// import Sider from "antd/lib/layout/Sider";
// export const NavSidebar = () => {
//   const [isOpenSidebar, setIsOpenSidebar] = useState(true);
//   const [persistedProfile, setPersistedProfile] = useLocalStorage(
//     "profile",
//     []
//   );
//   const logout = () => {
//     localStorage.clear();
//     sessionStorage.clear();
//     var url = window.location.origin + "/AuthPage";
//     window.location.href = url;
//   };
//   const isAccount = persistedProfile.username === "ick_accounting";
//   return (
//     <Layout>
//       <Header
//         style={{
//           position: "fixed",
//           zIndex: 1200,
//           width: "100%",
//           backgroundColor: "#FFFFFF",
//           borderBottom: "0.1px",
//           borderBottomColor: "#C6C6C6",
//           borderBottomStyle: "solid",
//         }}
//       >
//         <div className="d-flex justify-content-between">
//           <div>
//             <img src={icon.logoHeader} width={140} />
//           </div>
//           <div className="d-flex align-items-center">
//             <div className="me-4">
//               <span>
//                 <b>
//                   {persistedProfile.firstname +
//                     " " +
//                     persistedProfile.lastname +
//                     " " +
//                     "(" +
//                     persistedProfile.role +
//                     ")"}
//                 </b>
//               </span>
//             </div>
//             <Button
//               style={{
//                 backgroundColor: color.primary1,
//                 color: color.BG,
//                 borderRadius: "5px",
//               }}
//               onClick={() => logout()}
//               icon={<LogoutOutlined />}
//               size="middle"
//             />
//           </div>
//         </div>
//       </Header>
//       <Layout>
//         <Sider
//           width={220}
//           style={{
//             overflow: "auto",
//             height: "100vh",
//             position: "fixed",
//             marginTop: 65,
//             fontSize: "15px",
//             backgroundColor: color.White,
//             cursor: "pointer",
//           }}
//         >
//           <MenuSide
//             lists={pathLists({ isAccounting: isAccount })}
//             isOpenSidebar={isOpenSidebar}
//           />
//         </Sider>
//       </Layout>
//     </Layout>
//   );
// };
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
import { MenuSide } from "./MenuSide";
import { pathLists } from "./SideBar";
const logout = () => {
  localStorage.clear();
  sessionStorage.clear();
  var url = window.location.href;
  var arr = url.split("/");
  var resultUrlHost = arr[0] + "//" + arr[2];
  window.location.href = "AuthPage";
};
const NavSidebar: React.FC<any> = ({ children }) => {
  const [persistedProfile, setPersistedProfile] = useLocalStorage(
    "profile",
    []
  );
  const isAccount = persistedProfile.username === "ick_accounting";
  const [isOpenSidebar, setIsOpenSidebar] = useState(true);

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
          height: '64px'
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
          style={{
            overflow: "auto",
            height: "100%",
            position: "fixed",
            marginTop: 65,
            // fontSize: "14px",
            backgroundColor: color.White,
            cursor: "pointer",
          }}
        >
          <MenuSide
            lists={pathLists({ isAccounting: isAccount })}
            isOpenSidebar={isOpenSidebar}
          />
        </Sider>
      </Layout>
    </Layout>
  );
};

export default NavSidebar;
