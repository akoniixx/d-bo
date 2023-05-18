import {
  FileTextOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Input,
  Pagination,
  Select,
  Table,
} from "antd";
import React, { useState } from "react";
import ActionButton from "../../../components/button/ActionButton";
import { CardContainer } from "../../../components/card/CardContainer";
import { color } from "../../../resource";
import { DateTimeUtil } from "../../../utilities/DateTimeUtil";
import { DashboardLayout } from "../../../components/layout/Layout";

const { RangePicker } = DatePicker;

const IndexFarmerPoint = () => {
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
      dateTime: Date(),
      farmerName: "รชยา ช่างภักดี",
      campaignName: "แจกคะแนนขั้นต่ำ 2 ไร่",
      pointType: "ได้รับคะแนน",
      totalPoint: 100,
      status: "รอดำเนินการ",
    },
    {
      dateTime: Date(),
      farmerName: "รชยา ทำงานวันหยุด",
      campaignName: "แจกคะแนนขั้นต่ำ 5 ไร่",
      pointType: "แลกคะแนน",
      totalPoint: 200,
      status: "รอดำเนินการ",
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
            <strong>รายการคะแนนเกษตรกร</strong>
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
        <div className="col-lg-4 p-1">
          <Input
            allowClear
            prefix={<SearchOutlined style={{ color: color.Disable }} />}
            placeholder="ค้นหาชื่อเกษตรกร"
            className="col-lg-12 p-1"
          />
        </div>
        <div className="col-lg p-1">
          <Input
            allowClear
            prefix={<SearchOutlined style={{ color: color.Disable }} />}
            placeholder="ค้นหาชื่อแคมเปญ/ของรางวัล"
            className="col-lg-12 p-1"
          />
        </div>
        <div className="col-lg">
          <Select
            allowClear
            className="col-lg-12 p-1"
            placeholder="ได้รับ/แลกคะแนน"
          >
            <option value="ได้รับคะแนน">ได้รับคะแนน</option>
            <option value="แลกคะแนน">แลกคะแนน</option>
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
      title: "วันที่อัพเดท",
      dataIndex: "date_appointment",
      key: "date_appointment",
      width: "15%",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span>{DateTimeUtil.formatDateTime(value)}</span>
              <br />
              <span style={{ color: color.Grey }}>{row.task_no}</span>
            </>
          ),
        };
      },
    },
    {
      title: "ชื่อเกษตรกร",
      dataIndex: "farmerName",
      key: "farmerName",
      width: "15%",
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{row.farmerName}</span>,
        };
      },
    },
    {
      title: "แคมแปญ/ของขวัญ",
      dataIndex: "campaignName",
      width: "20%",
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{row.campaignName}</span>,
        };
      },
    },
    {
      title: "การได้รับ/แลกของขวัญ",
      dataIndex: "pointType",
      key: "pointType",
      width: "20%",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <span
              style={{
                color:
                  row.pointType === "ได้รับคะแนน" ? "#A9CB62" : color.Error,
              }}
            >
              {row.pointType}
            </span>
          ),
        };
      },
    },
    {
      title: "จำนวนคะแนน",
      dataIndex: "totalPoint",
      key: "totalPoint",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <span
              style={{
                color: row.pointType === "ได้รับคะแนน" ? color.BK : color.Error,
              }}
            >
              {(row.pointType === "ได้รับคะแนน" ? "+" : "-") + row.totalPoint}
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
    <>
      <DashboardLayout>
        {pageTitle}
        <CardContainer>
          <Table
            dataSource={dataMock}
            columns={columns}
            pagination={false}
            size="large"
            tableLayout="fixed"
            rowClassName={(a) =>
              a.pointType == "แลกคะแนน" ? "table-row-older" : "table-row-lasted"
            }
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
      </DashboardLayout>
    </>
  );
};

export default IndexFarmerPoint;
