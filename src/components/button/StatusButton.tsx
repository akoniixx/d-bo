import { Button, Radio } from "antd";
import React, { useEffect, useState } from "react";
import { color } from "../../resource";

interface statusProps {
  label1: string;
  label2: string;
  onClick?: (e: any) => void;
}
const StatusButton: React.FC<statusProps> = ({ label1, label2, onClick }) => {
  return (
    <>
      <Radio.Group buttonStyle="outline">
        <Radio.Button
          value="PENDING"
          style={
            label1 === "PENDING"
              ? {
                  width: "130px",
                  backgroundColor: color.bgWarning,
                  color: color.Warning,
                  borderColor: color.Warning,
                  borderTopLeftRadius: "5px",
                  borderBottomLeftRadius: "5px",
                  fontWeight: "bold",
                }
              : {
                  width: "130px",
                  padding: "8 0",
                  borderTopLeftRadius: "5px",
                  borderBottomLeftRadius: "5px",
                }
          }
          onClick={onClick}
        >
          <div style={{ textAlign: "center" }}>รอตรวจสอบ</div>
        </Radio.Button>
        <Radio.Button
          value="ACTIVE"
          style={
            label1 === "ACTIVE"
              ? {
                  width: "130px",
                  backgroundColor: color.bgSuccess,
                  color: color.Success,
                  borderColor: color.Success,
                  borderTopRightRadius: "5px",
                  borderBottomRightRadius: "5px",
                  fontWeight: "bold",
                }
              : {
                  width: "130px",
                  padding: "8 0",
                  borderTopRightRadius: "5px",
                  borderBottomRightRadius: "5px",
                }
          }
          onClick={onClick}
        >
          <div style={{ textAlign: "center" }}>ใช้งาน</div>
        </Radio.Button>
      </Radio.Group>
    </>
  );
};

export default StatusButton;
