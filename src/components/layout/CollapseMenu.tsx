import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { color, icon } from "../../resource";
import { CollapseSubMenu } from "./CollapseSubMenu";
import { IconMenu, IconMenuInActive } from "./IconMenu";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { Image } from "antd";
import { useLocalStorage } from "../../hook/useLocalStorage";

interface CollapseMenuProps {
  subLists: {
    path: string;
    name: string;
    title: string;
    subMenu: {
      path: string;
      name: string;
      title: string;
    }[];
  }[];
  name: string;
  path: string;
  title: string;
  setCurrent: React.Dispatch<
    React.SetStateAction<{
      path: string;
    }>
  >;
  current: {
    path: string;
  };
  count: number;
  checkPath: string | undefined;
  setCheckPath: React.Dispatch<React.SetStateAction<string | undefined>>
}

const ListStyled = styled.div<{}>`
  padding: 8px;
  cursor: pointer;
  border-radius: 0px;
  width: 100%;
  display: flex;
  align-items: center;
  height: 50px;
  background-color: ${color.Success};
`;
const SubListItem = styled.div<{ isFocus?: boolean }>`
  padding: 16px;
  cursor: pointer;
  background-color: ${(props) => (props.isFocus ? "#ceeed5" : color.White)};
  color: ${(props) => (props.isFocus ? color.Success : "#7B7B7B")};
  width: 100%;
  font-size: 14px;
  height: 50px;
  justify-content: space-between;
`;
export const CollapseMenu: React.FC<CollapseMenuProps> = ({
  title,
  subLists,
  name,
  setCurrent,
  current,
  path,
  count,
  checkPath,
  setCheckPath
}) => {
  const [isCollapse, setIsCollapse] = useState(true);
  console.log(checkPath , path);
  const navigate = useNavigate();
  return (
    <>
      <div
        style={{
          cursor: "pointer",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "50px",
        }}
        onClick={() => {
      
          setCurrent({ path });
          if(path === checkPath){
            setCheckPath(undefined)
          }else{
            setCheckPath(path)
          }
        }}
      >
        {checkPath !==  path ? (
          <>
            <div
              style={{
                color: "#7B7B7B",
                display: "flex",
                gap: 18,
                padding: "8px",
                cursor: "pointer",
                width: "100%",
                alignItems: "center",
                height: "50px",
              }}
            >
              {IconMenu[name as keyof typeof IconMenu]}
              {title}
              {path === "task" && (
                <div
                  className="col-lg-10"
                  style={{
                    alignSelf: "center",
                    padding: "5px",
                    width: "20px",
                    height: "20px",
                    backgroundColor: color.Error,
                    borderRadius: 15,
                    color: color.White,
                    fontSize: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {40}
                </div>
              )}
            </div>
            <div style={{ paddingRight: "8px" }}>
              {checkPath !==  current.path ? (
                <Image
                  src={icon.arrowDown}
                  style={{ width: "16px", height: "9px" }}
                  preview={false}
                />
              ) : (
                <Image
                  src={icon.arrowUp}
                  style={{ width: "16px", height: "9px" }}
                  preview={false}
                />
              )}
            </div>
          </>
        ) : (
          <>
            <ListStyled style={{ color: "#FFCA37", display: "flex", gap: 18 }}>
              {IconMenuInActive[name as keyof typeof IconMenu]}
              {title}
              {path === "task" && (
                <div
                  className="col-lg-10"
                  style={{
                    alignSelf: "center",
                    padding: "5px",
                    width: "20px",
                    height: "20px",
                    backgroundColor: color.Error,
                    borderRadius: 15,
                    color: color.White,
                    fontSize: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {40}
                </div>
              )}
            </ListStyled>
            <div
              style={{
                paddingRight: "8px",
                backgroundColor: color.Success,
                height: "50px",
                alignItems: "center",
                display: "flex",
              }}
            >
              {checkPath !== path ? (
                <Image
                  src={icon.arrowDown}
                  style={{ width: "16px", height: "9px" }}
                  preview={false}
                />
              ) : (
                <Image
                  src={icon.arrowUp}
                  style={{ width: "16px", height: "9px" }}
                  preview={false}
                />
              )}
            </div>
          </>
        )}
      </div>
      {checkPath === path && (
        <div
          style={{
            width: "100%",
          }}
        >
          {subLists.map((subList, idx) => {
            if (subList?.subMenu?.length > 0) {
              return (
                <CollapseSubMenu
                  subLists={subList.subMenu}
                  name={subList.name}
                  title={subList.title}
                  setCurrent={setCurrent}
                  current={current}
                  path=""
                />
              );
            }
            return (
              <SubListItem
                isFocus={current.path === subList.path}
                key={idx}
                onClick={() => {
                  setCurrent({ path: subList.path });
                  navigate(subList.path);
                }}
              >
                <div className="row">
                  <div className="col">{subList.title}</div>
                  {path === "task" && (
                    <div
                      className="col-lg-10"
                      style={{
                        alignSelf: "center",
                        padding: "5px",
                        width: "20px",
                        height: "20px",
                        backgroundColor: color.Error,
                        borderRadius: 15,
                        color: color.White,
                        fontSize: "10px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      {count}
                    </div>
                  )}
                </div>
              </SubListItem>
            );
          })}
        </div>
      )}
    </>
  );
};
