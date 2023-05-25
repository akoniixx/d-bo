import React, { useState } from "react";
import { color } from "../../resource";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffectOnce } from "../../hook/useEffectOnce";
import { CollapseMenu } from "./CollapseMenu";
import { IconMenu, IconMenuInActive } from "./IconMenu";

interface SubMenu {
  path: string;
  name: string;
  title: string;
  permission?: null;
  subMenu?: SubMenu[];
}

interface PathList {
  path: string;
  name: string;
  title: string;
  permission?: null;
  subMenu?: SubMenu[];
}

interface MenuSideProps {
  lists: PathList[];
  isOpenSidebar?: boolean;
}

const ListStyled = styled.div<{ isFocus?: boolean }>`
  padding: 8px;
  cursor: pointer;
  width: 100%;
  display: flex;
  align-items: center;
  height: 50px;
  background-color: ${color.Success};
`;
export const MenuSide: React.FC<MenuSideProps> = ({ lists, isOpenSidebar }) => {
  const navigate = useNavigate();
  const [checkPath, setCheckPath] = useState<string | undefined>();
  const [current, setCurrent] = useState({
    path: "",
  });

  useEffectOnce(() => {
    const pathName = window.location.pathname;
    const pathNameSplit = pathName.split("/").filter((item) => item !== "");

    const currentPath = lists.find(
      (item) => item.path === `/${pathNameSplit[0]}`
    );
    if (currentPath) {
      const isHaveSubPath = currentPath.subMenu?.find(
        (el) => el.path === `/${pathNameSplit[1]}`
      );

      setCurrent({
        path: currentPath.name,
      });
    }
  });
  return (
    <div>
      <div
        style={{
          cursor: "pointer",
          width: "100%",
          height: "50px",
        }}
      >
        {lists.map((list: any, idx: any) => {
          if (list?.subMenu?.length < 1) {
            return (
              <div
                key={idx}
                onClick={() => {
                  setCheckPath(list.path);
                  setCurrent(list.path);
                  navigate(list.path);
                }}
              >
                {checkPath === list.path ? (
                  <ListStyled
                    style={{
                      display: "flex",
                      gap: 18,
                      color: "#FFCA37",
                      paddingLeft: "16px",
                    }}
                  >
                    {IconMenuInActive[list.name as keyof typeof IconMenu]}
                    {list.title}
                  </ListStyled>
                ) : (
                  <div
                    style={{
                      color: "#231F20",
                      display: "flex",
                      gap: 18,
                      padding: "8px",
                      cursor: "pointer",
                      width: "100%",
                      height: "50px",
                      alignItems: "center",
                      paddingLeft: "16px",
                    }}
                  >
                    {IconMenu[list.name as keyof typeof IconMenu]}
                    {list.title}
                  </div>
                )}
              </div>
            );
          } else {
            return (
              <CollapseMenu
                path={list.path}
                key={idx}
                subLists={list.subMenu}
                name={list.name}
                title={list.title}
                setCurrent={setCurrent}
                current={current}
                count={10}
                checkPath={checkPath}
                setCheckPath={setCheckPath}
              />
            );
          }
        })}
      </div>
    </div>
  );
};
