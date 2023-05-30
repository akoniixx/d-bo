import { Badge, Col, Divider, Form, Input, Radio, Row, Table } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BackIconButton } from "../../components/button/BackButton";
import { CardContainer } from "../../components/card/CardContainer";
import FooterPage from "../../components/footer/FooterPage";
import { CardHeader } from "../../components/header/CardHearder";
import { RedeemDatasource } from "../../datasource/RedeemDatasource";
import { DetailRedeemDronerEntity } from "../../entities/RedeemEntities";
import { color } from "../../resource";
import { DateTimeUtil } from "../../utilities/DateTimeUtil";
const _ = require("lodash");

const NewTable = styled(Table)`
  .ant-table-container table thead tr th {
    background-color: rgba(234, 151, 62, 0.1) !important;
    font-family: "Prompt" !important;
    font-weight: 500 !important;
    color: #2b2b2b !important;
    font-weight: bold !important;
  }
`;

const DetailDronerRedeem = () => {
  let queryString = _.split(window.location.pathname, "=");
  const navigate = useNavigate();
  const [statusShip, setStatusShip] = useState("คำร้องขอแลก");
  const statusOptions = ["คำร้องขอแลก", "เตรียมจัดส่ง", "ส่งแล้ว", "ยกเลิก"];
  const [data, setData] = useState<DetailRedeemDronerEntity>();

  const fetchDetail = () => {
    RedeemDatasource.getRedeemDronerById(queryString[2]).then((res) => {
      console.log(res);                                                
      setData(res);
    });
  };

  useEffect(() => {
    fetchDetail();
  }, []);

  const dataRewardMock = {
    rewardId: "RD000001",
    dateTime: Date(),
    rewardName: "บัตรเติมน้ำมัน 500 บาท",
    rewardType: "Physical",
    point: 20,
    qty: 5,
    totalPoint: 100,
  };
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
      title: "บริษัทส่งของ",
      dataIndex: "remark",
      key: "remark",
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{row.remark}</span>,
        };
      },
    },
    {
      title: "Tracking ID",
      dataIndex: "remark",
      key: "remark",
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{row.remark}</span>,
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
          children: <span>{row.updateBy} (นักบินโดรน)</span>,
        };
      },
    },
  ];

  const onChangeStatusShip = (e: any) => {
    setStatusShip(e.target.value);
  };

  const renderRewardDetail = (
    <CardContainer>
      <CardHeader textHeader="รายละเอียดของรางวัล" bgColor="#2B2B2B" />
      <Form style={{ padding: "20px" }}>
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
            ของรางวัล
          </b>
          <Row>
            <Col span={4}>
              <div>รหัสของรางวัล</div>
              <div style={{ color: "#2B2B2B" }}>
                <u>{dataRewardMock.rewardId}</u>
              </div>
            </Col>
            <Col span={7}>
              <div>ชื่อของรางวัล</div>
              <div>{dataRewardMock.rewardName}</div>
            </Col>
            <Col span={5}>
              <div>ประเภทของรางวัล</div>
              <div>
                {dataRewardMock.rewardType}{" "}
                <span
                  style={{
                    color:
                      dataRewardMock.rewardType === "Physical"
                        ? "#EA973E"
                        : "#A9CB62",
                  }}
                >
                  {dataRewardMock.rewardType === "Physical"
                    ? "(ใช้แต้ม)"
                    : "(ภารกิจ)"}
                </span>
              </div>
            </Col>
            <Col span={3}>
              <div>แต้ม</div>
              <div>{dataRewardMock.point} แต้ม</div>
            </Col>
            <Col span={2}>
              <div>จำนวน</div>
              <div>{dataRewardMock.qty} ชิ้น</div>
            </Col>
            <Col span={3}>
              <div>รวมแต้มทั้งหมด</div>
              <div style={{ color: color.Error }}>
                {dataRewardMock.totalPoint} แต้ม
              </div>
            </Col>
          </Row>
        </Container>
      </Form>
    </CardContainer>
  );
  const renderDronerDetail = (
    <CardContainer>
      <CardHeader textHeader="ข้อมูลนักบินโดรน" bgColor="#EA973E" />
      <Container className="p-3">
        <Row>
          <Col span={5}>
            <div>ชื่อนักบินโดรน</div>
            <div style={{ color: "#EA973E" }}>
              <u>{dataMock.farmerName}</u>
            </div>
          </Col>
          <Col span={4}>
            <div>เบอร์โทร</div>
            <div>{dataMock.telephone}</div>
          </Col>
          <Col span={15}>
            <div>ที่อยู่</div>
            <div>{dataMock.address}</div>
          </Col>
        </Row>
        <Divider />
        <Col className="pb-4">
          <div>สถานะ</div>
          <Radio.Group
            options={statusOptions}
            value={statusShip}
            onChange={(e) => onChangeStatusShip(e)}
          />
        </Col>
        {statusShip === "ส่งแล้ว" && (
          <Form>
            <Row justify={"space-between"} gutter={16}>
              <Col span={12}>
                <label>
                  บริษัทส่งของ <span style={{ color: color.Error }}>*</span>
                </label>
                <Form.Item
                  name="shipCompany"
                  rules={[
                    {
                      required: true,
                      message: "กรุณากรอกบริษัทขนส่ง!",
                    },
                  ]}
                >
                  <Input placeholder="กรอกบริษัทขนส่ง" autoComplete="off" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <label>
                  Tracking ID <span style={{ color: color.Error }}>*</span>
                </label>
                <Form.Item
                  name="trackingId"
                  rules={[
                    {
                      required: true,
                      message: "กรุณากรอก Tracking ID!",
                    },
                  ]}
                >
                  <Input placeholder="กรอก Tracking ID" autoComplete="off" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        )}
        {statusShip !== "คำร้องขอแลก" && (
          <Col>
            <TextArea placeholder="กรอกรายละเอียดหรือหมายเหตุ" />
          </Col>
        )}
      </Container>
      <NewTable
        columns={columeHis}
        dataSource={dataHisMock}
        pagination={false}
      />
    </CardContainer>
  );
  return (
    <>
      <Row>
        <BackIconButton onClick={() => navigate("/IndexRedeem/Droner")} />
        <span className="pt-3">
          <strong style={{ fontSize: "20px" }}>
            รายละเอียดการแลกแต้ม | RD0000001
          </strong>
        </span>
      </Row>
      {renderRewardDetail}
      <br />
      {renderDronerDetail}
      <FooterPage
        onClickBack={() => navigate("/IndexRedeem/Droner")}
        styleFooter={{ padding: "6px" }}
        //onClickSave={() => submit()}
      />
    </>
  );
};

export default DetailDronerRedeem;
