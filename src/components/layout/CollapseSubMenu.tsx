import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { color, icon } from "../../resource";
import { Image } from "antd";

interface CollapseSubMenuProps {
  subLists: {
    path: string;
    name: string;
    title: string;
  }[];
  name: string;
  title: string;
  path: string;
  setCurrent: React.Dispatch<
    React.SetStateAction<{
      path: string;
    }>
  >;
  current: {
    path: string;
  };
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
  color: ${(props) => (props.isFocus ? color.Success : "#7B7B7B")};
  width: 100%;
  font-size: 14px;
  height: 50px;
  justify-content: space-between;
`;
export const CollapseSubMenu: React.FC<CollapseSubMenuProps> = ({
  title,
  subLists,
  name,
  setCurrent,
  current,
  path,
}) => {
  const [isCollapseSub, setIsCollapseSub] = useState(true);
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
          setCurrent({ path });
          setIsCollapseSub(!isCollapseSub);
        }}
      >
        {isCollapseSub ? (
          <>
            <div
              style={{
                padding: "16px",
                color: "#7B7B7B",
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
              {isCollapseSub ? (
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
              {isCollapseSub ? (
                <Image
                  src={icon.arrowDown}
                  style={{ width: "16px", height: "9px" }}
                  preview={false}
                />
              ) : (
                <Image
                  src={icon.arrowGreen}
                  style={{ width: "16px", height: "9px" }}
                  preview={false}
                />
              )}
            </div>
          </>
        )}
        {/* {isCollapseSub ? (
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
        )} */}
      </div>
      {!isCollapseSub && (
        <div
          style={{
            width: "100%",
          }}
        >
          {subLists.map((subList, idx) => {
            return (
              <SubListItem
                isFocus={current.path === subList.path}
                key={idx}
                onClick={() => {
                  setCurrent({ path: subList.path });
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
