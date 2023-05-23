import {
  FileTextOutlined,
  InfoCircleFilled,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Input,
  Pagination,
  Row,
  Table,
  Tooltip,
} from "antd";
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { CardContainer } from "../../components/card/CardContainer";
import Layouts from "../../components/layout/Layout";
import { color } from "../../resource";
import { DateTimeUtil } from "../../utilities/DateTimeUtil";
const { RangePicker } = DatePicker;

const IndexReceivePoint = () => {
  const dateFormat = "DD/MM/YYYY";
  const row = 10;
  const [current, setCurrent] = useState(1);

  const onChangePage = (page: number) => {
    setCurrent(page);
  };

  const dataMock = [
    {
      key: 1,
      dateTime: Date(),
      pointNo: "P00000001",
      taskId: "TK00000001",
      missionId: "-",
      type: "การจ้างงาน",
      description: [
        {
          source: "Farmer",
          farmerId: "f1",
          farmerName: "รชยา ช่างภักดี",
          telephone: "0938355808",
          point: 100,
          rai: 50,
          unitPoint: 2,
        },
        {
          source: "Droner",
          dronerId: "d1",
          dronerName: "รชยา ทำงานวันหยุด",
          telephone: "0938355808",
          point: 200,
          rai: 100,
          unitPoint: 4,
        },
      ],
    },
    {
      key: 2,
      dateTime: Date(),
      pointNo: "P00000001",
      taskId: "TK00000001",
      missionId: "MS00000001",
      type: "ภารกิจ",
      description: [
        {
          source: "Droner",
          farmerId: "f1",
          dronerName: "รชยา ช่างภักดี",
          telephone: "0938355808",
          point: 100,
          rai: 50,
          unitPoint: 2,
        },
      ],
    },
  ];

  const pageTitle = (
    <>
      <div
        className="container d-flex justify-content-between"
        style={{ padding: "10px" }}
      >
        <div>
          <span
            className="card-label font-weight-bolder text-dark"
            style={{
              fontSize: 22,
              fontWeight: "bold",
              padding: "8px",
            }}
          >
            <strong>รายการคะแนน (ได้รับคะแนน)</strong>
          </span>
        </div>
        <div style={{ color: color.Error }}>
          <RangePicker
            allowClear
            format={dateFormat}
            placeholder={["เลือกวันที่เริ่ม", "เลือกวันที่สิ้นสุด"]}
          />
        </div>
      </div>
      <div
        className="container d-flex justify-content-between"
        style={{ padding: "8px" }}
      >
        <div className="col-lg p-1">
          <Input
            allowClear
            prefix={<SearchOutlined style={{ color: color.Disable }} />}
            placeholder="ค้นหานักบินโดรน/เกษตรกร/เบอร์โทร"
            className="col-lg-12 p-1"
          />
        </div>
        <div className="col-lg p-1">
          <Input
            allowClear
            prefix={<SearchOutlined style={{ color: color.Disable }} />}
            placeholder="ค้นหารหัส Task No."
            className="col-lg-12 p-1"
          />
        </div>
        <div className="pt-1">
          <Button
            style={{
              borderColor: color.Success,
              borderRadius: "5px",
              color: color.secondary2,
              backgroundColor: color.Success,
            }}
          >
            ค้นหาข้อมูล
          </Button>
        </div>
      </div>
    </>
  );

  const expandData = (record: any) => {
    let checkFarmer = record.description.filter(
      (x: any) => x.source === "Farmer"
    );
    let checkDroner = record.description.filter(
      (x: any) => x.source === "Droner"
    );
    return (
      <Row justify={"space-between"} gutter={16}>
        {checkFarmer.length > 0 && (
          <Col span={checkDroner.length > 0 ? 12 : 24}>
            <Container
              style={{
                backgroundColor: "rgba(86, 167, 104, 0.1)",
                borderRadius: "5px",
              }}
              className="p-3"
            >
              <Row>
                <Col span={11}>
                  <label>ชื่อเกษตรกร : </label>{" "}
                  <span>{checkFarmer[0].farmerName}</span>
                </Col>
                <Col span={8}>
                  <label>เบอร์โทร : </label>{" "}
                  <span>{checkFarmer[0].telephone}</span>
                </Col>
                <Col span={5}>
                  <label>คะแนน :</label> <span>+ {checkFarmer[0].point}</span>
                  <Tooltip
                    placement="top"
                    title={
                      "คะแนนที่จะได้รับ : " +
                      checkFarmer[0].rai +
                      " ไร่ x" +
                      checkFarmer[0].unitPoint +
                      " คะแนน"
                    }
                    key={1}
                  >
                    <InfoCircleFilled
                      style={{
                        position: "relative",
                        bottom: 3,
                        left: 4,
                        color: color.Success,
                      }}
                    />
                  </Tooltip>
                </Col>
              </Row>
            </Container>
          </Col>
        )}
        {checkDroner.length > 0 && (
          <Col span={checkFarmer.length > 0 ? 12 : 24}>
            <Container
              style={{
                backgroundColor: "rgba(235, 87, 87, 0.1)",
                borderRadius: "5px",
              }}
              className="p-3"
            >
              <Row>
                <Col span={11}>
                  <label>ชื่อนักบินโดรน :</label>{" "}
                  <span>{checkDroner[0].dronerName}</span>
                </Col>
                <Col span={8}>
                  <label>เบอร์โทร :</label>{" "}
                  <span>{checkDroner[0].telephone}</span>
                </Col>
                <Col span={5}>
                  <label>คะแนน :</label> <span>+ {checkDroner[0].point}</span>
                  <Tooltip
                    placement="top"
                    title={
                      "คะแนนที่จะได้รับ : " +
                      checkDroner[0].rai +
                      " ไร่ x" +
                      checkDroner[0].unitPoint +
                      " คะแนน"
                    }
                    key={1}
                  >
                    <InfoCircleFilled
                      style={{
                        position: "relative",
                        bottom: 3,
                        left: 4,
                        color: color.Warning,
                      }}
                    />
                  </Tooltip>
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
      title: "Task No",
      dataIndex: "taskId",
      width: "20%",
      render: (value: any, row: any, index: number) => {
        return {
          children: <u style={{ color: color.Success }}>{row.taskId}</u>,
        };
      },
    },
    {
      title: "Mission No",
      dataIndex: "missionId",
      width: "20%",
      render: (value: any, row: any, index: number) => {
        return {
          children: row.missionId !== "-" && (
            <u style={{ color: color.Success }}>{row.missionId}</u>
          ),
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
  ];

  return (
    <Layouts>
      {pageTitle}
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
      <div className="d-flex justify-content-between pt-4">
        <p>รายการทั้งหมด {dataMock?.length} รายการ</p>
        <Pagination
          current={current}
          total={dataMock.length}
          onChange={onChangePage}
          pageSize={row}
          showSizeChanger={false}
        />
      </div>
    </Layouts>
  );
};
export default IndexReceivePoint;
