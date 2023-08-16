import { Image } from "antd";
import React, { useEffect, useState } from "react";
import { color } from "../../resource";
import { CardContainer } from "./CardContainer";
import { numberWithCommas } from "./../../utilities/TextFormatter";

interface StatusPlotProps {
  title1: string;
  title2: string;
  title3?: string;
  bgColor1: string;
  bgColor2: string;
  bgColor3?: string;
  countPlot1: any;
  countPlot2: any;
  countPlot3?: any;
  checkPage?: any;
  status?: any;
}
const StatusPlots: React.FC<StatusPlotProps> = ({
  title1,
  title2,
  title3,
  bgColor1,
  bgColor2,
  bgColor3,
  countPlot1,
  countPlot2,
  countPlot3,
  checkPage,
  status,
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
        {checkPage === "DronerPage" && status === "PENDING" ? (
          <div className="row d-flex justify-content-between">
            <div className="col-lg-4">
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
                    {numberWithCommas(countPlot1)}
                  </div>
                </div>
              </CardContainer>
            </div>
            <div className="col-lg-4">
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
                    {numberWithCommas(countPlot2)}
                  </div>
                </div>
              </CardContainer>
            </div>
            <div className="col-lg-4">
              <CardContainer
                style={{
                  backgroundColor: bgColor3,
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
                      <span>{title3}</span>
                    </div>
                  </div>
                  <div style={{ fontSize: "16px" }}>
                    {numberWithCommas(countPlot3)}
                  </div>
                </div>
              </CardContainer>
            </div>
          </div>
        ) : (
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
                    {numberWithCommas(countPlot1)}
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
                    {numberWithCommas(countPlot2)}
                  </div>
                </div>
              </CardContainer>
            </div>
          </div>
        )}
      </CardContainer>
    </>
  );
};

export default StatusPlots;
