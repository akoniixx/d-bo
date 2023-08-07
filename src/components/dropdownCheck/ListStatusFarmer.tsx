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

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <>
          <Checkbox onClick={onSearchType} value="BO">
            <div>
              <Image
                src={icon.bo}
                preview={false}
                style={{ width: 20, height: 20 }}
              />
              <span> Back Office Website</span>
            </div>
          </Checkbox>
        </>
      ),
    },
    // {
    //   key: "2",
    //   label: (
    //     <>
    //       <Checkbox onClick={onSearchType} value="LINE">
    //         <div>
    //           <Image
    //             src={icon.lineApp}
    //             preview={false}
    //             style={{ width: 20, height: 20 }}
    //           />
    //           <span> Line Official Account</span>
    //         </div>
    //       </Checkbox>
    //     </>
    //   ),
    // },
    {
      key: "3",
      label: (
        <>
          <Checkbox onClick={onSearchType} value="DRONER">
            <div>
              <Image
                src={icon.dronerApp}
                preview={false}
                style={{ width: 20, height: 20 }}
              />
              <span> Droner Application</span>
            </div>
          </Checkbox>
        </>
      ),
    },
    {
      key: "4",
      label: (
        <>
          <Checkbox onClick={onSearchType} value="FARMER">
            <div>
              <Image
                src={icon.farmerApp}
                preview={false}
                style={{ width: 20, height: 20 }}
              />
              <span> Farmer Application</span>
            </div>
          </Checkbox>
        </>
      ),
    },
  ];
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
