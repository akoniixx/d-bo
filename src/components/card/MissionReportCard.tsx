import { SearchOutlined } from "@ant-design/icons";
import { Button, Col, Image, Input, Modal, Row, Select, Table } from "antd";
import React, { useEffect, useState } from "react";
import { LocationPriceDatasource } from "../../datasource/LocationPriceDatasource";
import { AllLocatePriceEntity } from "../../entities/LocationPrice";
import { color } from "../../resource";
import { CardContainer } from "./CardContainer";
import icon from "../../resource/icon";

interface MissionReportProps {
  title: string;
  raiAmount: string;
  successPoint: string;
  unsuccessPoint: string;
  img: string;
  missionName: string;
}
const MissionReportCard: React.FC<MissionReportProps> = ({
  title,
  raiAmount,
  successPoint,
  unsuccessPoint,
  img,
  missionName,
}) => {
  return (
    <>
      <div
      style={{
        width: "440px",
        backgroundColor: color.White,
        padding: 5,
        borderRadius: 5,
        borderWidth: 1,
      }}
    >
      <div className="row p-2">
        <div className="col-lg">
          <span style={{ fontWeight: "bold" }}>{title}</span>
          <p>{`จำนวนไร่สะสม : ${raiAmount} ไร่`}</p>
        </div>
        <div className="col">
          <div className="row">
            <div
              style={{
                width: "95px",
                padding: 6,
                backgroundColor: "rgba(235, 87, 87, 0.1)",
                borderBottomLeftRadius: 3,
                borderTopLeftRadius: 3,
                color: color.Error,
                textAlign: "center",
              }}
            >
              {unsuccessPoint}
              <br />
              <span style={{ color: color.BK }}>ยังไม่สำเร็จ</span>
            </div>
            <div
              style={{
                width: "95px",
                textAlign: "center",
                borderBottomRightRadius: 3,
                borderTopRightRadius: 3,
                padding: 6,
                backgroundColor: "rgba(33, 150, 83, 0.1)",
                color: color.Success,
              }}
            >
              {successPoint}
              <br />
              <span style={{ color: color.BK }}>สำเร็จ</span>
            </div>
          </div>
        </div>
      </div>
    </div>
     <div style={{ backgroundColor: "rgba(33, 150, 83, 0.1)" }}>
     <div className="row p-2">
       <div className="col-lg-2">
         <Image
           src={img}
           style={{ width: 45, height: 45 }}
           preview={false}
         />
       </div>
       <div className="col">
         <span style={{ fontSize: "12px" }}>{missionName}</span>
       </div>
     </div>
   </div>
    </>
  
  );
};

export default MissionReportCard;
