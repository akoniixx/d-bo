import { Badge, Col, Form, Row, Table } from "antd";
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BackIconButton } from "../../components/button/BackButton";
import { CardContainer } from "../../components/card/CardContainer";
import { CardHeader } from "../../components/header/CardHearder";
import Layouts from "../../components/layout/Layout";
import { color } from "../../resource";
import { DateTimeUtil } from "../../utilities/DateTimeUtil";
const _ = require("lodash");
let queryString = _.split(window.location.pathname, "=");

const NewTable = styled(Table)`
  .ant-table-container table thead tr th {
    background-color: rgba(169, 203, 98, 0.1) !important;
    font-family: "Prompt" !important;
    font-weight: 500 !important;
    color: #2b2b2b !important;
    font-weight: bold !important;
  }
`;

const DetailFarmerRedeem = () => {
  const navigate = useNavigate();

  const dataMock = {
    dateTime: Date(),
    farmerName: "รชยา ช่างภักดี",
    telephone: "0938355808",
    address: "3888/197  ต.สำโรงเหนือ อ.เมืองสมุทรปราการ จ.สมุทรปราการ 10270",
    campaignName: "แจกคะแนนขึ้นต่ำ 2 ไร่",
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
  const dataHisMock = [
    {
      dateTime: Date(),
      remark: "-",
      updateBy: "รชยา ช่างภักดี",
      status: "แลกสำเร็จ",
    },
  ];
  const columeHis = [
    {
      title: "วันที่อัพเดท",
      dataIndex: "dateTime",
      key: "dateTime",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <span>
              {row.dateTime && DateTimeUtil.formatDateTime(row.dateTime)}
            </span>
          ),
        };
      },
    },
    {
      title: "รายละเอียดหรือหมายเหตุ",
      dataIndex: "remark",
      key: "remark",
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{row.remark}</span>,
        };
      },
    },
    {
      title: "สถานะ",
      dataIndex: "status",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span
                style={{
                  color: row.status === "ยกเลิก" ? color.Error : color.Success,
                }}
              >
                <Badge
                  color={row.status === "ยกเลิก" ? color.Error : color.Success}
                />{" "}
                {row.status}
              </span>
            </>
          ),
        };
      },
    },
    {
      title: "ผู้ใช้ที่อัพเดต",
      dataIndex: "updateBy",
      key: "updateBy",
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{row.updateBy} (เกษตรกร)</span>,
        };
      },
    },
  ];

  const renderTaskDetail = (
    <CardContainer>
      <CardHeader textHeader="ข้อมูลที่เกี่ยวข้อง" bgColor="#2B2B2B" />
      <Form style={{ padding: "32px" }}>
        <Container
          style={{
            backgroundColor: "rgba(43, 43, 43, 0.1)",
          }}
          className="p-3"
        >
          <b
            style={{
              color: "#2B2B2B",
            }}
          >
            งานจ้างที่เกี่ยวข้อง
          </b>
          <Row>
            <Col span={3}>
              <div>รหัสงาน</div>
              <div style={{ color: "#2B2B2B" }}>
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
              </Row>
            </Col>
          </Row>
        </Container>
      </Form>
    </CardContainer>
  );
  const renderFarmerDetail = (
    <CardContainer>
      <CardHeader textHeader="ข้อมูลเกษตรกร" />
      <Container className="p-3">
        <Row>
          <Col span={4}>
            <div>ชื่อเกษตรกร</div>
            <div style={{ color: color.Success }}>
              <u>{dataMock.farmerName}</u>
            </div>
          </Col>
          <Col span={4}>
            <div>เบอร์โทร</div>
            <div>{dataMock.telephone}</div>
          </Col>
          <Col span={12}>
            <div>ที่อยู่</div>
            <div>{dataMock.address}</div>
          </Col>
          <Col span={4}>
            <div>แต้มที่แลก</div>
            <div style={{ color: color.Error }}>- {dataMock.totalPoint}</div>
          </Col>
        </Row>
      </Container>
      <NewTable
        columns={columeHis}
        dataSource={dataHisMock}
        pagination={false}
      />
    </CardContainer>
  );

  return (
    <Layouts>
      <Row>
        <BackIconButton
          onClick={() => (window.location.href = "/IndexRedeem/Farmer")}
        />
        <span className="pt-3">
          <strong style={{ fontSize: "20px" }}>
            รายละเอียดการแลกแต้ม | RD0000001
          </strong>
        </span>
      </Row>
      {renderTaskDetail}
      <br />
      {renderFarmerDetail}
    </Layouts>
  );
};

export default DetailFarmerRedeem;
