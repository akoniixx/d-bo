import React from "react";
import { Button } from "antd";
import { color } from "../../resource";

interface CardHeaderProps {
  textHeader: string;
}
export const CardHeader: React.FC<CardHeaderProps> = ({
  textHeader
}) => (
  <div
    style={{
      backgroundColor: color.Success,
      borderRadius: "12px 12px 0px 0px",
      padding: "10px 10px 10px 10px",
    }}
    className="d-flex justify-content-between"
  >
    <h4 className="pt-2 ps-3" style={{ color: "white" }}>
      {textHeader}
    </h4>
  </div>
);

export default CardHeader;
