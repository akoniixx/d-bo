import { Col, Image, Row } from "antd";
import React, { useState } from "react";
import { color } from "../../resource";

interface MissionReportProps {
  title?: string;
  raiAmount?: string;
  successPoint?: string;
  unsuccessPoint?: string;
  img?: string;
  missionName?: any;
  checkCard?: boolean;
}
const MissionReportCard: React.FC<MissionReportProps> = ({
  title,
  raiAmount,
  successPoint,
  unsuccessPoint,
  img,
  missionName,
  checkCard,
}) => {
  return (
    <div
      style={{
        border: "solid",
        borderColor: checkCard ? color.Success : "#C6C6C6",
        borderWidth: "1.5px",
        backgroundColor: "white",
        borderRadius: "10px",
      }}
    >
      <Row gutter={16} style={{ padding: 10 }}>
        <Col span={16}>
          <span style={{ fontWeight: "bold" }}>{title}</span>
          <p>{`จำนวนไร่สะสม : ${raiAmount} ไร่`}</p>
        </Col>
        <Col span={8}>
          <Row gutter={8}>
            <div
              style={{
                width: "90px",
                padding: 12,
                backgroundColor: "rgba(235, 87, 87, 0.1)",
                borderBottomLeftRadius: 5,
                borderTopLeftRadius: 5,
                textAlign: "center",
              }}
            >
              <span style={{ color: color.Error, fontWeight: "bold" }}>
                {unsuccessPoint}{" "}
              </span>
              <br />
              <span style={{ color: color.BK }}>ยังไม่สำเร็จ</span>
            </div>
            <div
              style={{
                width: "90px",
                padding: 12,
                backgroundColor: "rgba(33, 150, 83, 0.1)",
                borderBottomRightRadius: 5,
                borderTopRightRadius: 5,
                textAlign: "center",
              }}
            >
              <span style={{ color: color.Success, fontWeight: "bold" }}>
                {successPoint}{" "}
              </span>
              <br />
              <span style={{ color: color.BK }}>สำเร็จ</span>
            </div>
          </Row>
        </Col>
      </Row>
      <Row
        style={{
          backgroundColor: checkCard ? "rgba(33, 150, 83, 0.1)" : "#C6C6C6",
          padding: 10,
          borderBottomLeftRadius: "8px",
          borderBottomRightRadius: "8px",
        }}
      >
        <Col span={2}>
          <Image
            src={img}
            style={{ width: 48, height: 48, padding: "6px", borderRadius: 5 }}
            preview={false}
          />
        </Col>
        <Col span={20} style={{ padding: "5px" }}>
          <span>{missionName}</span>
        </Col>
      </Row>
    </div>
  );
};

export default MissionReportCard;
