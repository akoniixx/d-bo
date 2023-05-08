import {
  ClockCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Badge,
  Button,
  Col,
  DatePicker,
  Input,
  Pagination,
  Row,
  Select,
  Table,
} from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ActionButton from "../../../components/button/ActionButton";
import { CardContainer } from "../../../components/card/CardContainer";
import Layouts from "../../../components/layout/Layout";
import { color } from "../../../resource";
import { DateTimeUtil } from "../../../utilities/DateTimeUtil";

const { RangePicker } = DatePicker;

const IndexCampaignPoint = () => {
  const navigate = useNavigate();
  const dateFormat = "DD/MM/YYYY";
  const dateSearchFormat = "YYYY-MM-DD";

  const profile = JSON.parse(localStorage.getItem("profile") || "{  }");
  const row = 10;
  const [current, setCurrent] = useState(1);

  const onChangePage = (page: number) => {
    setCurrent(page);
  };

  const dataMock = [
    {
      startDate: Date(),
      endDate: Date(),
      campaignName: "แจกคะแนนขึ้นต่ำ 2 ไร่",
      totalPoint: 100,
      status: "ใช้งาน",
      appType: "Droner App",
    },
  ];

  const pageTitle = (
    <>
      <Row
        className="container d-flex justify-content-between"
        style={{ padding: "10px" }}
      >
        <Col span={14}>
          <span
            className="card-label font-weight-bolder text-dark"
            style={{
              fontSize: 22,
              fontWeight: "bold",
              padding: "8px",
            }}
          >
            <strong>แคมเปญคะแนน</strong>
          </span>
        </Col>
        <Col style={{ borderRight: "solid" }} span={7}>
          <RangePicker
            allowClear
            format={dateFormat}
            placeholder={["เลือกวันที่เริ่ม", "เลือกวันที่สิ้นสุด"]}
          />
        </Col>
        <Col span={3} style={{ textAlign: "right" }}>
          <Button
            style={{
              borderColor: color.Success,
              borderRadius: "5px",
              color: color.secondary2,
              backgroundColor: color.Success,
            }}
            onClick={() => navigate("/AddCampaignPoint")}
          >
            เพิ่มแคมแปญ
          </Button>
        </Col>
      </Row>
      <div
        className="container d-flex justify-content-between"
        style={{ padding: "8px" }}
      >
        <div className="col-lg-5 p-1">
          <Input
            allowClear
            prefix={<SearchOutlined style={{ color: color.Disable }} />}
            placeholder="ค้นหาชื่อแคมเปญคะแนน"
            className="col-lg-12 p-1"
          />
        </div>
        <div className="col-lg">
          <Select
            allowClear
            className="col-lg-12 p-1"
            placeholder="แอปพลิเคชัน"
          >
            <option value="เกษตรกร">เกษตรกร</option>
            <option value="นักบินโดรน">นักบินโดรน</option>
          </Select>
        </div>
        <div className="col-lg">
          <Select allowClear className="col-lg-12 p-1" placeholder="สถานะ">
            <option value="ใช้งาน">ใช้งาน</option>
            <option value="รอเปิดใช้งาน">รอเปิดใช้งาน</option>
            <option value="ปิดใช้งาน">ปิดใช้งาน</option>
          </Select>
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
  const columns = [
    {
      title: "ชื่อแคมเปญ",
      dataIndex: "campaignName",
      key: "campaignName",
      width: "15%",
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{row.campaignName}</span>,
        };
      },
    },
    {
      title: "แอปพลิเคชัน",
      dataIndex: "appType",
      width: "20%",
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{row.campaignName}</span>,
        };
      },
    },
    {
      title: "การได้รับคะแนน",
      dataIndex: "totalPoint",
      key: "totalPoint",
      width: "15%",
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{"+" + row.totalPoint + " คะแนน / ไร่"}</span>,
        };
      },
    },
    {
      title: "ช่วงเวลาเริ่มต้น - สิ้นสุด",
      width: "30%",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <Row>
                <div style={{ paddingBottom: "2px" }}>
                  <ClockCircleOutlined
                    style={{ color: color.Success, fontSize: "20px" }}
                  />
                </div>
                <div style={{ paddingLeft: "3px" }}>
                  {DateTimeUtil.formatDateTime(row.startDate) +
                    " - " +
                    DateTimeUtil.formatDateTime(row.endDate)}
                </div>
              </Row>
            </>
          ),
        };
      },
    },
    {
      title: "สถานะ",
      dataIndex: "status",
      key: "status",
      width: "10%",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <span
              style={{
                color: color.Success,
              }}
            >
              <Badge color={color.Success} /> {row.status}
            </span>
          ),
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
                  icon={<EditOutlined />}
                  color={color.primary1}
                  //   onClick={() =>
                  //     (window.location.href =
                  //       "/DetailDronerPoint/id=" + (index + 1))
                  //   }
                />
              </div>
              <div className="col-lg-6">
                <ActionButton
                  icon={<DeleteOutlined />}
                  color={color.Error}
                  //   onClick={() =>
                  //     (window.location.href =
                  //       "/DetailDronerPoint/id=" + (index + 1))
                  //   }
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
      {pageTitle}
      <CardContainer>
        <Table
          dataSource={dataMock}
          columns={columns}
          pagination={false}
          size="large"
          tableLayout="fixed"
        />
      </CardContainer>
      <div className="d-flex justify-content-between pt-4">
        <p>รายการทั้งหมด {dataMock.length} รายการ</p>
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

export default IndexCampaignPoint;
