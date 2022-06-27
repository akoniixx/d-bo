import React from "react";
import { LeftOutlined } from "@ant-design/icons";
import { Button, Empty } from "antd";
import { color } from "../../resource";

interface BackbtnProps {
  onClick?: Function;
}
export const Backbtn: React.FC<BackbtnProps> = ({ onClick }) => (
  <div style={{ padding: "10px" }}>
    <Button
      style={{ border: "none", backgroundColor: "transparent" }}
      icon={<LeftOutlined style={{ fontSize: "25px", color: color.Success }}/>}
      size="large"
      shape="circle"
    />
  </div>
);

export default Backbtn;
