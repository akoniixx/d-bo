import React from "react";
import { LeftOutlined } from "@ant-design/icons";
import { Button, Empty } from "antd";
import { color } from "../../resource";

interface SavePagebtnProps {
  onClick?: Function;
}
export const SavePagebtn: React.FC<SavePagebtnProps> = ({ onClick }) => (
    <Button
    style={{
      backgroundColor: color.Success,
      borderColor: color.Success,
      borderRadius: "5px",
      color: color.BG,
    }}
  >
    บันทึก
  </Button>
);

export default SavePagebtn;
