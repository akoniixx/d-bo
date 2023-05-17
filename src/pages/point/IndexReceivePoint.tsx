import { FileTextOutlined } from "@ant-design/icons";
import { Col, Form, Input, Row, Table } from "antd";
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import ActionButton from "../../components/button/ActionButton";
import { CardContainer } from "../../components/card/CardContainer";
import Layouts from "../../components/layout/Layout";
import { color } from "../../resource";
import { DateTimeUtil } from "../../utilities/DateTimeUtil";

const IndexReceivePoint = () => {
  const dataMock = [
    {
      key: 1,
      dateTime: Date(),
      transectionId: "P00000001",
      taskId: "TK00000001",
      type: "การจ้างงาน",
      status: "รอดำเนินการ",
      description: [
        {
          source: "Farmer",
          farmerId: "f1",
          farmerName: "รชยา ช่างภักดี",
          telephone: "0938355808",
          point: 100,
        },
        {
          source: "Droner",
          dronerId: "d1",
          dronerName: "รชยา ทำงานวันหยุด",
          telephone: "0938355808",
          point: 200,
        },
      ],
    },
    {
      key: 2,
      dateTime: Date(),
      transectionId: "P00000002",
      taskId: "TK00000002",
      type: "การจ้างงาน",
      status: "รอดำเนินการ",
      description: [
        {
          source: "Farmer",
          farmerId: "f1",
          farmerName: "รชยา ช่างภักดี",
          telephone: "0938355808",
          point: 100,
        },
      ],
    },
  ];

  const expandData = (record: any) => {
    let checkFarmer = record.description.filter(
      (x: any) => x.source === "Farmer"
    );
    let checkDroner = record.description.filter(
      (x: any) => x.source === "Droner"
    );
    return (
      <Row>
        {checkFarmer.length !== 0 && (
          <Col span={checkDroner.length !== 0 ? 12 : 24}>
            <Container
              style={{
                backgroundColor: "rgba(86, 167, 104, 0.1)",
              }}
              className="p-3"
            >
              <div>
                <strong
                  style={{
                    color: "#219653",
                  }}
                >
                  ข้อมูลเกษตรกร
                </strong>
              </div>
              <Row>
                <Col span={9}>
                  <div>ชื่อเกษตรกร</div>
                  <div>{checkFarmer[0].farmerName}</div>
                </Col>
                <Col span={8}>
                  <div>เบอร์โทร</div>
                  <div>{checkFarmer[0].telephone}</div>
                </Col>
                <Col span={7}>
                  <div>คะแนนที่จะได้รับ</div>
                  <div>+ {checkFarmer[0].point}</div>
                </Col>
              </Row>
            </Container>
          </Col>
        )}
        {checkDroner.length !== 0 && (
          <Col span={checkFarmer.length !== 0 ? 12 : 24}>
            <Container
              style={{
                backgroundColor: "rgba(235, 87, 87, 0.1)",
              }}
              className="p-3"
            >
              <div>
                <strong
                  style={{
                    color: "#EA973E",
                  }}
                >
                  ข้อมูลนักบินโดรน
                </strong>
              </div>
              <Row>
                <Col span={9}>
                  <div>ชื่อนักบินโดรน</div>
                  <div>{checkDroner[0].dronerName}</div>
                </Col>
                <Col span={8}>
                  <div>เบอร์โทร</div>
                  <div>{checkDroner[0].telephone}</div>
                </Col>
                <Col span={7}>
                  <div>คะแนนที่จะได้รับ</div>
                  <div>+ {checkDroner[0].point}</div>
                </Col>
              </Row>
            </Container>
          </Col>
        )}
      </Row>
    );
  };

  const columns = [
    {
      title: "วันที่อัพเดท",
      dataIndex: "dateTime",
      key: "dateTime",
      width: "15%",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span>
                {row.dateTime && DateTimeUtil.formatDateTime(row.dateTime)}
              </span>
              <br />
              <span style={{ color: color.Grey }}>{row.task_no}</span>
            </>
          ),
        };
      },
    },
    {
      title: "Transection ID",
      dataIndex: "transectionId",
      key: "transectionId",
      width: "15%",
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{row.transectionId}</span>,
        };
      },
    },
    {
      title: "รหัสอ้างอิง",
      dataIndex: "taskId",
      width: "20%",
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{row.taskId}</span>,
        };
      },
    },
    {
      title: "ประเภทการได้รับคะแนน",
      dataIndex: "type",
      key: "type",
      width: "20%",
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{row.type}</span>,
        };
      },
    },
    {
      title: "สถานะ",
      dataIndex: "status",
      key: "status",
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{row.status}</span>,
        };
      },
    },
    {
      title: "",
      dataIndex: "Action",
      key: "Action",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div className="d-flex flex-row justify-content-center">
              <div className="col-lg-6">
                <ActionButton
                  icon={<FileTextOutlined />}
                  color={color.primary1}
                  onClick={() =>
                    (window.location.href =
                      "/DetailFarmerPoint/id=" + (index + 1))
                  }
                />
              </div>
            </div>
          ),
        };
      },
    },
  ];
  return (
    <Layouts>
      <CardContainer>
        <Table
          dataSource={dataMock}
          columns={columns}
          expandable={{
            expandedRowRender: (record) => expandData(record),
            defaultExpandAllRows: true,
            showExpandColumn: false,
          }}
          pagination={false}
          size="large"
          tableLayout="fixed"
        />
      </CardContainer>
    </Layouts>
  );
};
export default IndexReceivePoint;
