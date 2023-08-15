import { DownOutlined } from "@ant-design/icons";
import { Button, Checkbox, Dropdown, Image, MenuProps } from "antd";
import React, { useState } from "react";
import { color, icon } from "../../resource";

interface listProps {
  onSearchType: (e: any) => void;
  list: any;
  title: string;
}
const CheckDocument: React.FC<listProps> = ({ onSearchType, list, title }) => {
  const [visibleCreateBy, setVisibleCreateBy] = useState(false);

  const handleVisibleCreateBy = (newVisible: any) => {
    setVisibleCreateBy(newVisible);
  };

  const listDoc = [
    { title: " บัตรประชาชน", value: "ID_CARD" },
    { title: " สมุดบัญชีธนาคาร", value: "BOOKBANK" },
  ];
  const items: MenuProps["items"] = listDoc.map((v, i) => {
    return {
      key: i,
      label: (
        <>
          <Checkbox onClick={onSearchType} value={v.value}>
            <span>{v.title}</span>
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
              textAlign: "start",
              backgroundColor: color.White,
              height: 32,
              cursor: "pointer",
            }}
          >
            {title}
            <DownOutlined
              style={{
                verticalAlign: 2,
              }}
            />
          </Button>
        </Dropdown>
      </div>
    </>
  );
};

export default CheckDocument;
