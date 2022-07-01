import React from "react";
import { LeftOutlined } from "@ant-design/icons";
import { Button, Empty } from "antd";
import { color } from "../../resource";

interface SaveButtonProps {
  onClick: Function;
}
export const SaveButtton: React.FC<SaveButtonProps> = ({ onClick }) => (
  <Button
    style={{
      backgroundColor: color.Success,
      borderColor: color.Success,
      borderRadius: "5px",
      color: color.BG,
    }}
   onClick={onClick()}
  >
    บันทึก
  </Button>
);

export default SaveButtton;
