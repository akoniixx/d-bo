import { Button } from "antd";
import React from "react";
import color from "../../resource/color";

interface ActionButtonProps {
  onClick?: () => void;
  icon: any;
  color: any;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  onClick,
  icon,
  color,
}) => (
  <Button
    style={{
      borderRadius: "7px 7px 7px 7px",
      borderColor: color,
      color: color,
    }}
    icon={icon}
    onClick={onClick}
  />
);

export default ActionButton;
