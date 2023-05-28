import { FileTextOutlined, SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Pagination,
  Radio,
  Row,
  Table,
} from "antd";
import React, { useState } from "react";
import { CardContainer } from "../../../components/card/CardContainer";
import { color, icon } from "../../../resource";
import { useNavigate } from "react-router-dom";
import { BackIconButton } from "../../../components/button/BackButton";
import { DateTimeUtil } from "../../../utilities/DateTimeUtil";
import SummaryPoint from "../../../components/card/SummaryPoint";

const { RangePicker } = DatePicker;

function IndexDronerHistorySum() {
  const navigate = useNavigate();
  const dateFormat = "DD/MM/YYYY";
  const dateSearchFormat = "YYYY-MM-DD";

  const profile = JSON.parse(localStorage.getItem("profile") || "{  }");
  const row = 10;
  const [current, setCurrent] = useState(1);
  const [type, setType] = useState("receive");

  const onChangePage = (page: number) => {
    setCurrent(page);
  };
  const dataMock = [
    {
      dateTime: Date(),
      pointNum: "P256605170001",
      totalPoint: 100,
      status: "รอดำเนินการ",
    },
    {
      dateTime: Date(),
      pointNum: "P256605170002",
      totalPoint: 200,
      status: "รอดำเนินการ",
    },
  ];
  const handleType = (e: any) => {
    setType(e.target.value);
  };
  const pageTitle = (
    <>
      <Row className="p-2">
        <BackIconButton
          onClick={() => {
            navigate(-1);
          }}
        />
        <Col span={10} className="pt-3">
          <span
            className="card-label font-weight-bolder text-dark"
            style={{
              fontSize: 22,
              fontWeight: "bold",
            }}
          >
            <strong>ประวัติแต้ม | นักบินโดรน ท่านหนึ่ง </strong>
          </span>
        </Col>
        <Col span={4} className="pt-3">
          <Radio.Group onChange={handleType}>
            <Radio.Button
              style={{
                width: "90px",
                borderBottomLeftRadius: 5,
                borderTopLeftRadius: 5,
                backgroundColor:
                  type === "receive" ? "rgba(33, 150, 83, 0.1)" : color.White,
                color: type === "receive" ? color.Success : color.BK,
                borderColor: type === "receive" ? color.Success : color.BK,
              }}
              value="receive"
            >
              ได้รับแต้ม
            </Radio.Button>
            <Radio.Button
              style={{
                width: "90px",
                borderBottomRightRadius: 5,
                borderTopRightRadius: 5,
                backgroundColor:
                  type === "redeem" ? "rgba(235, 87, 87, 0.1)" : color.White,
                color: type === "redeem" ? color.Error : color.BK,
                borderColor: type === "redeem" ? color.Error : color.BK,
              }}
              value="redeem"
            >
              แลกแต้ม
            </Radio.Button>
          </Radio.Group>
        </Col>
        <Col span={6} className="pt-3" style={{ color: color.Error }}>
          <RangePicker
            allowClear
            format={dateFormat}
            placeholder={["เลือกวันที่เริ่ม", "เลือกวันที่สิ้นสุด"]}
            style={{ width: "280px" }}
          />
        </Col>
        <Col span={2} className="pt-3">
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
        </Col>
      </Row>
      <Row justify={"space-between"} gutter={16}>
        <Col span={8}>
          <SummaryPoint
            title={"แต้มทั้งหมดที่ได้รับ"}
            bgColor={color.Success}
            point={"20,000"}
            label={"แต้มที่ได้"}
          />
        </Col>
        <Col span={8}>
          <SummaryPoint
            title={"แต้มใช้ไปแล้ว"}
            bgColor={color.Error}
            point={"10,000"}
            label={"แต้มที่ใช้"}
          />
        </Col>
        <Col span={8}>
          <SummaryPoint
            title={"แต้มคงเหลือ"}
            bgColor={color.secondary3}
            point={"10,000"}
            label={"แต้มคงเหลือ"}
          />
        </Col>
      </Row>
      <br/>
    </>
  );

  const columns = [
    {
      title: "วันที่อัพเดต",
      dataIndex: "dateTime",
      key: "dateTime",
      width: "15%",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span>{DateTimeUtil.formatDateTime(value)}</span>
            </>
          ),
        };
      },
    },
    {
      title: "Point No",
      dataIndex: "pointNum",
      key: "pointNum",
      width: "50%",
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{value}</span>,
        };
      },
    },
    {
      title: "จำนวนแต้ม",
      dataIndex: "totalPoint",
      key: "totalPoint",
      width: "20%",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              {type === "redeem" ? (
                <span style={{ color: color.Error }}>{value + ` แต้ม`}</span>
              ) : (
                <span>{value + ` แต้ม`}</span>
              )}
            </>
          ),
        };
      },
    },
  ];

  return (
    <>
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
      <div className="d-flex justify-content-between pt-3 pb-3">
        <p>รายการทั้งหมด {dataMock?.length} รายการ</p>
        <Pagination
          current={current}
          total={dataMock.length}
          onChange={onChangePage}
          pageSize={row}
          showSizeChanger={false}
        />
      </div>
    </>
  );
}

export default IndexDronerHistorySum;
