import { SearchOutlined } from "@ant-design/icons";
import { Image } from "antd";
import React, { useEffect, useState } from "react";
import { color } from "../../resource";
import { CardContainer } from "./CardContainer";
import { numberWithCommas } from "./../../utilities/TextFormatter";

interface statusPlotProps {
  title1: string;
  title2: string;
  bgColor1: string;
  bgColor2: string;
  countPlot1: number;
  countPlot2: number;
}
const StatusPlots: React.FC<statusPlotProps> = ({
  title1,
  title2,
  bgColor1,
  bgColor2,
  countPlot1,
  countPlot2,
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
        <div className="row d-flex justify-content-between">
          <div className="col-lg-6">
            <CardContainer
              style={{
                backgroundColor: bgColor1,
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
                    <span>{title1}</span>
                  </div>
                </div>
                <div style={{ fontSize: "16px" }}>
                  {numberWithCommas(countPlot1) + " แปลง"}
                </div>
              </div>
            </CardContainer>
          </div>
          <div className="col-lg-6">
            <CardContainer
              style={{
                backgroundColor: bgColor2,
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
                    <span>{title2}</span>
                  </div>
                </div>
                <div style={{ fontSize: "16px" }}>
                  {numberWithCommas(countPlot2) + " แปลง"}
                </div>
              </div>
            </CardContainer>
          </div>
        </div>
      </CardContainer>
    </>
  );
};

export default StatusPlots;
