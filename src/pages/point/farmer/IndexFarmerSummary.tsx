import { FileTextOutlined, SearchOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Image,
  Input,
  Pagination,
  Select,
  Table,
} from "antd";
import React, { useState } from "react";
import ActionButton from "../../../components/button/ActionButton";
import { CardContainer } from "../../../components/card/CardContainer";
import { color, icon } from "../../../resource";
import { DateTimeUtil } from "../../../utilities/DateTimeUtil";
import { DashboardLayout } from "../../../components/layout/Layout";
import { useNavigate } from "react-router-dom";

const { RangePicker } = DatePicker;

function IndexFarmerSummary () {
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
      farmerName: "เกษตรกร ท่านหนึ่ง",
      phone: "0980006666",
      totalPoint: 100,
      status: "รอดำเนินการ",
    },
    {
      farmerName: "เกษตรกร ท่านสอง",
      phone: "0920007777",
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
        <div className="col-lg-5">
          <span
            className="card-label font-weight-bolder text-dark"
            style={{
              fontSize: 22,
              fontWeight: "bold",
              padding: "8px",
            }}
          >
            <strong>แต้มรายบุคคล (เกษตรกร) </strong>
          </span>
        </div>
        <div className="col-lg-3 p-1">
          <Input
            allowClear
            prefix={<SearchOutlined style={{ color: color.Disable }} />}
            placeholder="ค้นหาชื่อเกษตรกร / เบอร์โทร"
            className="col-lg-12 p-1"
          />
        </div>
        <div className="col-lg-3 p-1" style={{ color: color.Error }}>
          <RangePicker
            allowClear
            format={dateFormat}
            placeholder={["เลือกวันที่เริ่ม", "เลือกวันที่สิ้นสุด"]}
          />
        </div>
        <div className="col-lg pt-1">
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
      title: "ชื่อเกษตรกร",
      dataIndex: "farmerName",
      key: "farmerName",
      width: "15%",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span>{value}</span>
            </>
          ),
        };
      },
    },
    {
      title: "เบอร์โทร",
      dataIndex: "phone",
      key: "phone",
      width: "50%",
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{value}</span>,
        };
      },
    },
    {
      title: "แต้มคงเหลือ",
      dataIndex: "totalPoint",
      key: "totalPoint",
      width: "20%",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div className="row">
              <div className="col-lg-2">
                <Image
                  src={icon.coin}
                  style={{
                    width: "26px",
                    height: "26px",
                    alignContent: "center",
                  }}
                />
              </div>
              <div className="col">
                {" "}
                <span>{value + ` แต้ม`}</span>
              </div>
            </div>
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
                    navigate("/IndexFarmerHistorySum")
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
      </>
    </>
  );
};

export default IndexFarmerSummary;
