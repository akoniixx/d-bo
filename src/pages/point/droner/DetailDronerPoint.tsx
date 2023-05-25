import { InfoCircleFilled } from "@ant-design/icons";
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  Popover,
  Radio,
  Row,
  Space,
} from "antd";
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BackIconButton } from "../../../components/button/BackButton";
import { CardContainer } from "../../../components/card/CardContainer";
import { CardHeader } from "../../../components/header/CardHearder";
import color from "../../../resource/color";
import { DateTimeUtil } from "../../../utilities/DateTimeUtil";
import { numberWithCommasToFixed } from "../../../utilities/TextFormatter";
import { DashboardLayout } from "../../../components/layout/Layout";

const _ = require("lodash");

const DetailDronerPoint = () => {
  const navigate = useNavigate();
  let queryString = _.split(window.location.pathname, "=");
  const dataMock = {
    dateTime: Date(),
    farmerName: "รชยา ช่างภักดี",
    campaignName: "แจกคะแนนขั้นต่ำ 2 ไร่",
    pointType: queryString[1] === "1" ? "ได้รับคะแนน" : "แลกคะแนน",
    totalPoint: queryString[1] === "1" ? 100 : 200,
    status: "รอดำเนินการ",
  };
  const dataTaskMock = {
    taskId: "TK20230501TH-0000002",
    dateTime: Date(),
    farmerName: "รชยา ช่างภักดี",
    plot: "สำโรงเหนือ/เมืองสมุทรปราการ/สมุทรปราการ",
    raiAmount: 20,
    unitPrice: 60,
    totalPrice: 1200,
  };
  const dataDronerMock = {
    dateTime: Date(),
    dronerId: "789011",
    dronerFirstName: "สวัสดี",
    dronerLastName: "นะจ๊ะ",
    telephone: "0938355808",
    plot: "สำโรงเหนือ/เมืองสมุทรปราการ/สมุทรปราการ",
    raiAmount: 20,
    unitPrice: 60,
    totalPrice: 1200,
    oldPoint: 200,
    newPoint: 300,
  };

  const renderPointDetail = (
    <CardContainer>
      <CardHeader textHeader="ข้อมูลคะแนน" />
      <Form style={{ padding: "32px" }}>
        <Row gutter={16}>
          <Col span={24}>
            <div className="pb-3">
              <div>วันที่ดำเนินงาน</div>
              <div>{DateTimeUtil.formatDateTime(dataMock.dateTime)}</div>
            </div>
            <div className="pb-3">
              <div>ที่มาของคะแนน</div>
              <div>{dataMock.campaignName}</div>
            </div>
            <div className="pb-3">
              <div>ได้รับ/แลกคะแนน</div>
              <div>
                <Input
                  size="middle"
                  value={dataMock.pointType}
                  className="col-lg-2"
                  style={{
                    backgroundColor:
                      dataMock.pointType === "ได้รับคะแนน"
                        ? "#A9CB62"
                        : color.Error,
                    color: "white",
                    textAlign: "center",
                  }}
                  bordered={false}
                  disabled
                />
                <Input
                  size="middle"
                  className="col-lg-2"
                  value={"+" + dataMock.totalPoint}
                  style={{
                    textAlign: "center",
                    color: color.BK,
                    backgroundColor: color.Disable,
                  }}
                  bordered={false}
                  disabled
                />
              </div>
            </div>
          </Col>
        </Row>
        <br />
        <Container
          style={{
            backgroundColor:
              dataMock.pointType === "ได้รับคะแนน"
                ? "rgba(86, 167, 104, 0.1)"
                : "rgba(235, 87, 87, 0.1)",
          }}
          className="p-3"
        >
          <div>
            <b
              style={{
                color:
                  dataMock.pointType === "ได้รับคะแนน"
                    ? "#219653"
                    : color.Error,
              }}
            >
              งานจ้างที่เกี่ยวข้อง
            </b>
          </div>
          <Row>
            <Col span={3}>
              <div>รหัสงาน</div>
              <div style={{ color: "#219653" }}>
                <u>{dataTaskMock.taskId}</u>
              </div>
            </Col>
            <Col span={4}>
              <div>วัน/เวลานัดหมาย</div>
              <div>{DateTimeUtil.formatDateTime(dataTaskMock.dateTime)}</div>
            </Col>
            <Col span={4}>
              <div>ชื่อเกษตรกร</div>
              <div>{dataTaskMock.farmerName}</div>
            </Col>
            <Col span={5}>
              <div>พื้นที่แปลงเกษตร</div>
              <div>{dataTaskMock.plot}</div>
            </Col>
            <Col span={2}>
              <div>จำนวนไร่</div>
              <div>{dataTaskMock.raiAmount} ไร่</div>
            </Col>
            <Col span={3}>
              <div>ค่าบริการ/ไร่</div>
              <div>{dataTaskMock.unitPrice} บาท</div>
            </Col>
            <Col span={3}>
              <div>ยอดรวมค่าบริการ</div>
              <Row>
                <div>{dataTaskMock.totalPrice} บาท</div>
                <span>
                  <Popover
                    title={
                      <span
                        style={{
                          color: color.White,
                        }}
                      >
                        รายละเอียดค่าบริการ
                      </span>
                    }
                    content={
                      <table style={{ width: "300px" }}>
                        <tr>
                          <td>
                            ค่าบริการ
                            <br />
                            <div style={{ fontSize: "12px" }}>
                              จำนวนไร่{" "}
                              <span style={{ color: color.Success }}>
                                {dataTaskMock.raiAmount} ไร่
                              </span>{" "}
                              x ค่าบริการ{" "}
                              <span style={{ color: color.Success }}>
                                {dataTaskMock.unitPrice} ไร่
                              </span>
                            </div>
                          </td>
                          <td style={{ textAlign: "right" }}>
                            {numberWithCommasToFixed(parseFloat("50"))}
                          </td>
                        </tr>
                        <tr>
                          <td>ค่าธรรมเนียม (5%)</td>
                          <td style={{ textAlign: "right" }}>
                            {numberWithCommasToFixed(parseFloat("50"))}
                          </td>
                        </tr>
                        <tr>
                          <td>ส่วนลดค่าธรรมเนียม</td>
                          <td
                            style={{ color: color.Error, textAlign: "right" }}
                          >
                            {"- " + numberWithCommasToFixed(parseFloat("0"))}
                          </td>
                        </tr>
                        <tr>
                          <td>ส่วนลดจากคูปอง</td>
                          <td
                            style={{ color: color.Error, textAlign: "right" }}
                          >
                            {"- " + numberWithCommasToFixed(parseFloat("0"))}
                          </td>
                        </tr>
                        <tr>
                          <td>ส่วนลดจากโปรโมชั่น</td>
                          <td
                            style={{ color: color.Error, textAlign: "right" }}
                          >
                            {"- " + numberWithCommasToFixed(parseFloat("0"))}
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={2}>
                            <Divider />
                          </td>
                        </tr>
                        <tr>
                          <td>ยอดรวมค่าบริการ</td>
                          <td
                            style={{
                              textAlign: "right",
                              color: color.Success,
                              fontWeight: "bold",
                            }}
                          >
                            {numberWithCommasToFixed(
                              parseFloat(dataTaskMock.totalPrice.toString())
                            )}
                          </td>
                        </tr>
                      </table>
                    }
                  >
                    <InfoCircleFilled
                      style={{
                        color: color.primary1,
                        fontSize: "15px",
                        marginLeft: "7px",
                        verticalAlign: 0.5,
                      }}
                    />
                  </Popover>
                </span>
              </Row>
            </Col>
          </Row>
        </Container>
      </Form>
    </CardContainer>
  );
  const renderDetailFarmer = (
    <CardContainer>
      <CardHeader
        textHeader="ข้อมูลนักบินโดรน"
        showButton={true}
        buttonName="เช็คประวัติคะแนน"
        onClickButoon={() => navigate("/IndexDetailDronerPoint/id=" + 1)}
      />
      <Form style={{ padding: "32px" }}>
        <Row gutter={8} justify={"space-between"} className="pb-3">
          <Col span={8}>
            <label>Droner ID</label>
            <Input value={dataDronerMock.dronerId} disabled />
          </Col>
          <Col span={8}>
            <label>ชื่อ</label>
            <Input value={dataDronerMock.dronerFirstName} disabled />
          </Col>
          <Col span={8}>
            <label>นามสกุล</label>
            <Input value={dataDronerMock.dronerLastName} disabled />
          </Col>
        </Row>
        <Row gutter={8} justify={"space-between"}>
          <Col span={8}>
            <label>เบอร์โทร</label>
            <Input value={dataDronerMock.telephone} disabled />
          </Col>
          <Col span={8}>
            <label>คะแนนก่อนเปลี่ยนแปลง</label>
            <Input value={dataDronerMock.oldPoint} disabled suffix="คะแนน" />
          </Col>
          <Col span={8}>
            <label>คะแนนหลังเปลี่ยนแปลง</label>
            <Input value={dataDronerMock.newPoint} disabled suffix="คะแนน" />
          </Col>
        </Row>
      </Form>
    </CardContainer>
  );

  return (
    <>
      <>
        <Row>
          <BackIconButton onClick={() => navigate(-1)} />
          <span className="pt-3">
            <strong style={{ fontSize: "20px" }}>รายละเอียดคะแนน</strong>
          </span>
        </Row>
        {renderPointDetail}
        <br />
        {renderDetailFarmer}
      </>
    </>
  );
};
export default DetailDronerPoint;
