import React from "react";
import { Button, Empty } from "antd";
import { color } from "../../resource";

interface BackPagebtnProps {
  onClick?: Function;
}
export const BackPagebtn: React.FC<BackPagebtnProps> = ({ onClick }) => (
  <Button
    style={{
      borderColor: color.Success,
      borderRadius: "5px",
      color: color.Success,
    }}
  >
    ย้อนกลับ
  </Button>
);

export default BackPagebtn;
