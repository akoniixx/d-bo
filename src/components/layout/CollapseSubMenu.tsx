import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { color, icon } from "../../resource";
import { Image } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { useEffectOnce } from "../../hook/useEffectOnce";

interface CollapseSubMenuProps {
  subLists: {
    path: string;
    name: string;
    title: string;
  }[];
  name: string;
  title: string;
  path: string;
  setCurrentSub: React.Dispatch<
    React.SetStateAction<{
      path: string;
    }>
  >;
  currentSub: {
    path: string;
  };
  checkPathSubList: string | undefined;
  setCheckPathSubList: React.Dispatch<React.SetStateAction<string | undefined>>;
  checkPathSub: string | undefined;
  setCheckPathSub: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const ListStyled = styled.div<{ isFocus?: boolean }>`
  padding: 16px;
  padding-left: 54px;
  cursor: pointer;
  background-color: #ceeed5;
  color: ${color.Success};
  width: 100%;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  justify-content: space-between;
`;
const SubListItem = styled.div<{ isFocus?: boolean }>`
  padding: 16px;
  padding-left: 64px;
  cursor: pointer;
  color: ${(props) => (props.isFocus ? color.Success : "#231F20")};
  width: 100%;
  font-size: 14px;
  height: 50px;
  justify-content: space-between;
`;
export const CollapseSubMenu: React.FC<CollapseSubMenuProps> = ({
  title,
  subLists,
  name,
  setCurrentSub,
  currentSub,
  path,
  checkPathSub,
  setCheckPathSub,
  setCheckPathSubList,
  checkPathSubList,
}) => {
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
          fontSize: "14px",
        }}
        onClick={() => {
          setCurrentSub({ path });
          if (path === checkPathSub && path === checkPathSubList) {
            setCheckPathSub(undefined);
            setCheckPathSubList(undefined);
          } else {
            setCheckPathSub(path);
            setCheckPathSubList(path);
          }
        }}
      >
        {checkPathSub !== path || checkPathSubList !== path ? (
          <>
            <div
              style={{
                padding: "16px",
                color: "#231F20",
                display: "flex",
                gap: 18,
                cursor: "pointer",
                width: "100%",
                alignItems: "center",
                height: "50px",
                paddingLeft: "52px",
              }}
            >
              {title}
            </div>
            <div style={{ paddingRight: "8px" }}>
              {checkPathSub !== path || checkPathSubList !== path ? (
                <Image
                  src={icon.arrowDownMenu}
                  preview={false}
                  style={{ width: 14, height: 8 }}
                />
              ) : (
                <Image
                  src={icon.arrowUpMenu}
                  preview={false}
                  style={{ width: 14, height: 8 }}
                />
              )}
            </div>
          </>
        ) : (
          <>
            <ListStyled
              style={{ color: color.Success, display: "flex", gap: 18 }}
            >
              {title}
            </ListStyled>
            <div
              style={{
                paddingRight: "8px",
                backgroundColor: "#ceeed5",
                height: "50px",
                alignItems: "center",
                display: "flex",
              }}
            >
              {checkPathSub === path && checkPathSubList !== path ? (
                <Image
                  src={icon.arrowDownMenu}
                  preview={false}
                  style={{ width: 14, height: 8 }}
                />
              ) : (
                <Image
                  src={icon.arrowUpMenu}
                  preview={false}
                  style={{ width: 14, height: 8 }}
                />
              )}
            </div>
          </>
        )}
      </div>
      {checkPathSub === path && checkPathSubList === path && (
        <div
          style={{
            width: "100%",
          }}
        >
          {subLists.map((subList, idx) => {
            return (
              <SubListItem
                isFocus={currentSub.path === subList.path}
                key={idx}
                onClick={() => {
                  setCurrentSub({ path: subList.path });
                  navigate(subList.path);
                }}
              >
                <span>{subList.title}</span>
              </SubListItem>
            );
          })}
        </div>
      )}
    </>
  );
};
