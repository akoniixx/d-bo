import { FileTextOutlined, StarFilled } from "@ant-design/icons";
import { Button, DatePicker, Pagination, Row, Select, Table } from "antd";
import Search from "antd/lib/input/Search";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ActionButton from "../../components/button/ActionButton";
import { BackIconButton } from "../../components/button/BackButton";
import { CardContainer } from "../../components/card/CardContainer";
import { DashboardLayout } from "../../components/layout/Layout";
import { color } from "../../resource";
import { DateTimeUtil } from "../../utilities/DateTimeUtil";
const { RangePicker } = DatePicker;

const IndexDetailDronerPoint = () => {
  const dateFormat = "DD/MM/YYYY";
  const navigate = useNavigate();
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
    <div
      className="container d-flex justify-content-between"
      style={{ padding: "10px" }}
    >
      <div className="col-lg-4">
        <Search
          placeholder="ค้นหาชื่อที่มาของคะแนน"
          className="col-lg-12 p-1"
        />
      </div>
      <div className="col-lg-3">
        <Select
          className="col-lg-12 p-1"
          placeholder="ได้รับ/แลกคะแนน"
          allowClear
        ></Select>
      </div>
      <div className="col-lg-4 p-1">
        <RangePicker className="col-lg-12" allowClear format={dateFormat} />
      </div>
      <div className="col-lg-1 p-1">
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
  );
  const columns = [
    {
      title: "วันที่อัพเดท",
      dataIndex: "date_appointment",
      key: "date_appointment",
      width: "20%",
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
      title: "ที่มาของคะแนน",
      dataIndex: "campaignName",
      key: "campaignName",
      width: "40%",
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
    <DashboardLayout>
      <Row>
        <BackIconButton onClick={() => navigate(-1)} />
        <span className="pt-3">
          <strong
            style={{
              fontSize: "20px",
              display: "flex",
              gap: 8,
              alignItems: "center",
            }}
          >
            ประวัติคะแนน
            <StarFilled style={{ color: "#FFD429" }} />
            1,000
          </strong>
        </span>
      </Row>
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
  );
};

export default IndexDetailDronerPoint;
