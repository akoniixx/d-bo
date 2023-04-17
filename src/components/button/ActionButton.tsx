import { Button } from "antd";
import React from "react";
import color from "../../resource/color";

interface ActionButtonProps {
  onClick?: () => void;
  icon: React.ReactNode;
  color: string;
  actionDisable?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  onClick,
  icon,
  color,
  actionDisable,
}) => (
  <Button
    style={{
      borderRadius: "7px 7px 7px 7px",
      borderColor: color,
      color: color,
    }}
    icon={icon}
    onClick={onClick}
    disabled={actionDisable}
  />
);

export default ActionButton;
