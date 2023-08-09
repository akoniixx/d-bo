import { DownOutlined } from "@ant-design/icons";
import { Button, Checkbox, Dropdown, Image, MenuProps } from "antd";
import React, { useState } from "react";
import { color, icon } from "../../resource";

interface listProps {
  onSearchType: (e: any) => void;
  list: any;
  title: string;
}
const ListCheck: React.FC<listProps> = ({ onSearchType, list, title }) => {
  const [visibleCreateBy, setVisibleCreateBy] = useState(false);

  const handleVisibleCreateBy = (newVisible: any) => {
    setVisibleCreateBy(newVisible);
  };

  const listApp = [
    { title: " Back Office Website", icon: icon.bo, value: "BO" },
    { title: " Farmer Application", icon: icon.farmerApp, value: "FARMER" },
  ];
  const items: MenuProps["items"] = listApp.map((v, i) => {
    return {
      key: i,
      label: (
        <>
          <Checkbox onClick={onSearchType} value={v.value}>
            <div>
              <Image
                src={v.icon}
                preview={false}
                style={{ width: 20, height: 20 }}
              />
              <span>{v.title}</span>
            </div>
          </Checkbox>
        </>
      ),
    };
  });
  return (
    <>
      <div className="col-lg pt-1">
        <Dropdown
          menu={{ items }}
          trigger={["click"]}
          className="col-lg-12 p-1"
          onVisibleChange={handleVisibleCreateBy}
          visible={visibleCreateBy}
        >
          <Button
            style={{
              color: color.Disable,
              width: "165px",
              textAlign: "start",
              backgroundColor: color.White,
              height: 32,
              cursor: "pointer",
            }}
          >
            {title}
            <DownOutlined
              style={{
                paddingLeft: list != undefined ? "75%" : 0,
                verticalAlign: 2,
              }}
            />
          </Button>
        </Dropdown>
      </div>
    </>
  );
};

export default ListCheck;
