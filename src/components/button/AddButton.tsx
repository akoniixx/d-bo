import React from "react";
import { Button, Empty } from "antd";
import { color } from "../../resource";

interface AddButtonProps {
  onClick?: () => void;
  text: string;
}
export const AddButtton: React.FC<AddButtonProps> = ({ onClick, text }) => (
  <Button
    style={{
      width: "130px",
      padding: "8 0",
      backgroundColor: color.primary1,
      color: color.secondary2,
      borderColor: color.Success,
      borderRadius: "5px",
    }}
    onClick={onClick}
  >
    + {text}
  </Button>
);

export default AddButtton;
