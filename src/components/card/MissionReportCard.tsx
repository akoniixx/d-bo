import { SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Divider,
  Image,
  Input,
  Modal,
  Row,
  Select,
  Table,
} from "antd";
import React, { useEffect, useState } from "react";
import { LocationPriceDatasource } from "../../datasource/LocationPriceDatasource";
import { AllLocatePriceEntity } from "../../entities/LocationPrice";
import { color } from "../../resource";
import { CardContainer } from "./CardContainer";
import icon from "../../resource/icon";
import styled from "styled-components";

export const ListStyled = styled.div<{ isFocus?: boolean }>`
  border: solid ${color.Success};
  border-width: 1px;
  width: 440px;
  background-color: White;
  padding-left: 10px;
  padding-right: 10px;
`;

interface MissionReportProps {
  data: any[];
  index: any;
  title: string;
  raiAmount: string;
  successPoint: string;
  unsuccessPoint: string;
  img: string;
  missionName: string;
}
const MissionReportCard: React.FC<MissionReportProps> = ({
  data,
  index,
  title,
  raiAmount,
  successPoint,
  unsuccessPoint,
  img,
  missionName,
}) => {
  const [checked, setChecked] = useState(true);
  const [checkPathSub, setCheckPathSub] = useState<string | undefined>();


  return (
    <div
      onClick={() => {
        setChecked(!checked);
        setCheckPathSub(data[index])
        console.log(data[index], !checked)

      }}
    >
      {!checked && checkPathSub ? (
        <ListStyled style={{ borderRadius: 5 }}>
          <div className="row p-2">
            <div className="col-lg">
              <span style={{ fontWeight: "bold" }}>{title}</span>
              <p>{`จำนวนไร่สะสม : ${raiAmount} ไร่`}</p>
            </div>
            <div className="col-lg-5 p-1">
              <div className="row">
                <div
                  style={{
                    width: "90px",
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
                    width: "90px",
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
          <div className="row">
            <div
              style={{
                backgroundColor: "rgba(33, 150, 83, 0.1)",
                width: "440px",
              }}
            >
              <div className="row p-3">
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
          </div>
        </ListStyled>
      ) : (
        <div
          style={{
            border: "solid",
            borderWidth: "1px",
            width: "440px",
            backgroundColor: "White",
            paddingLeft: "10px",
            paddingRight: "10px",
            borderRadius: "5px",
            borderColor: color.Disable,
          }}
        >
          <div className="row p-2">
            <div className="col-lg">
              <span style={{ fontWeight: "bold" }}>{title}</span>
              <p>{`จำนวนไร่สะสม : ${raiAmount} ไร่`}</p>
            </div>
            <div className="col-lg-5 p-1">
              <div className="row">
                <div
                  style={{
                    width: "90px",
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
                    width: "90px",
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
          <div className="row">
            <div
              style={{
                backgroundColor: "rgba(226, 226, 226, 0.44)",
                width: "440px",
              }}
            >
              <div className="row p-3">
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
          </div>
        </div>
      )}
    </div>
  );
};

export default MissionReportCard;
