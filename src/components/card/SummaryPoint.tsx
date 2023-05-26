import { SearchOutlined } from "@ant-design/icons";
import { Button, Col, Image, Input, Modal, Row, Select, Table } from "antd";
import React, { useEffect, useState } from "react";
import { LocationPriceDatasource } from "../../datasource/LocationPriceDatasource";
import { AllLocatePriceEntity } from "../../entities/LocationPrice";
import { color } from "../../resource";
import { CardContainer } from "./CardContainer";
import icon from "../../resource/icon";

interface SummaryProps {
  title: string;
  bgColor: string;
  label: string;
  point: string;
}
const SummaryPoint: React.FC<SummaryProps> = ({
  title,
  bgColor,
  label,
  point,
}) => {
  return (
    <>
      <CardContainer
        style={{
          padding: "12px",
          marginRight: "12px",
          borderRadius: "5px",
        }}
      >
        <p>{title}</p>
        <div className="d-flex justify-content-between">
          <CardContainer
            style={{
              backgroundColor: bgColor,
              borderRadius: "5px",
              padding: "10px",
              width: "100%",
            }}
          >
            <div
              className="d-flex justify-content-between"
              style={{ color: color.White, fontWeight: "bold" }}
            >
              <div className="d-flex justify-content-between">
                <div>
                  <Image
                  preview={false}
                    src={icon.coin}
                    style={{ width: "36px", height: "24px", paddingRight: 10 }}
                  />
                </div>
                <div>
                  <span>{label}</span>
                </div>
              </div>
              <div style={{ fontSize: "16px" }}>{`${point} แต้ม`}</div>
            </div>
          </CardContainer>
        </div>
      </CardContainer>
    </>
  );
};

export default SummaryPoint;
