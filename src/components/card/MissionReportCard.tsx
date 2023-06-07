import { SearchOutlined } from "@ant-design/icons";
import { Image } from "antd";
import React, { useState } from "react";
import { color } from "../../resource";
import styled from "styled-components";

export const ListStyled = styled.div<{ isFocus?: boolean }>`
  border: solid ${color.Success};
  border-width: 1.5px;
  background-color: White;
  padding-left: 10px;
  padding-right: 10px;
`;

interface MissionReportProps {
  id: string;
  title: string;
  raiAmount: string;
  successPoint: string;
  unsuccessPoint: string;
  img: string;
  missionName: string;
  checkCard: string | undefined;
  setCheckCard: React.Dispatch<React.SetStateAction<string | undefined>>;
}
const MissionReportCard: React.FC<MissionReportProps> = ({
  id,
  title,
  raiAmount,
  successPoint,
  unsuccessPoint,
  img,
  missionName,
  checkCard,
  setCheckCard,
}) => {
  return (
    <div
      onClick={() => {
        if (id === checkCard) {
          setCheckCard(undefined);
        } else {
          setCheckCard(id);
        }
      }}
    >
      {checkCard === id ? (
        <ListStyled style={{ borderRadius: "10px" }}>
          <div className="row p-2">
            <div className="col-lg">
              <span style={{ fontWeight: "bold" }}>{title}</span>
              <p>{`จำนวนไร่สะสม : ${raiAmount} ไร่`}</p>
            </div>
            <div className="col-lg-5">
              <div className="row">
                <div
                  style={{
                    width: "90px",
                    padding: 12,
                    backgroundColor: "rgba(235, 87, 87, 0.1)",
                    borderBottomLeftRadius: 5,
                    borderTopLeftRadius: 5,
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
                    borderBottomRightRadius: 5,
                    borderTopRightRadius: 5,
                    padding: 12,
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
              }}
            >
              <div className="row">
                <div className="col-lg-2">
                  <Image
                    src={img}
                    style={{ width: 45, height: 45, padding: "6px" }}
                    preview={false}
                  />
                </div>
                <div className="col" style={{ alignSelf: "center" }}>
                  <span>{missionName}</span>
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
            backgroundColor: "White",
            paddingLeft: "10px",
            paddingRight: "10px",
            borderRadius: "10px",
            borderColor: color.Disable,
          }}
        >
          <div className="row p-2">
            <div className="col-lg-7">
              <span style={{ fontWeight: "bold" }}>{title}</span>
              <p>{`จำนวนไร่สะสม : ${raiAmount} ไร่`}</p>
            </div>
            <div className="col-lg">
              <div className="row">
                <div
                  style={{
                    width: "90px",
                    padding: 12,
                    backgroundColor: "rgba(235, 87, 87, 0.1)",
                    borderBottomLeftRadius: 5,
                    borderTopLeftRadius: 5,
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
                    borderBottomRightRadius: 5,
                    borderTopRightRadius: 5,
                    padding: 12,
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
              }}
            >
              <div className="row">
                <div className="col-lg-2">
                  <Image
                    src={img}
                    style={{ width: 45, height: 45, padding: "6px" }}
                    preview={false}
                  />
                </div>
                <div className="col" style={{ alignSelf: "center" }}>
                  <span>{missionName}</span>
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
