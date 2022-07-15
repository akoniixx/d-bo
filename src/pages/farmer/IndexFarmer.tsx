import { Button, Col, Pagination, Row, Select, Table } from "antd";
import React, { useEffect, useState } from "react";
import Search from "antd/lib/input/Search";
import { Option } from "antd/lib/mentions";
import color from "../../resource/color";
import Layouts from "../../components/layout/Layout";
import ActionButton from "../../components/button/ActionButton";
import { EditOutlined } from "@ant-design/icons";
import AddButtton from "../../components/button/AddButton";
import { CardContainer } from "../../components/card/CardContainer";
import {
  FarmerPageEntity,
  FarmerPageEntity_INIT,
} from "../../entities/FarmerEntities";
import { FarmerDatasource } from "../../datasource/FarmerDatasource";

function IndexFarmer() {
  const onSearch = (value: string) => console.log(value);
  const PageTitle = () => {
    return (
      <div className="container">
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" span={6}>
            <div className="pt-2 text-left">
              <span
                className="card-label font-weight-bolder text-dark"
                style={{ fontSize: 22, fontWeight: "bold", padding: "8px" }}
              >
                <strong>ข้อมูลเกษตรกร (Farmer)</strong>
              </span>
            </div>
          </Col>
          <Col className="gutter-row" span={6}>
            <Search
              style={{ width: "290px", marginRight: "5px", padding: "8px 0" }}
              placeholder="ค้นหาชื่อเกษตรกร หรือเบอร์โทร"
              onSearch={onSearch}
            />
          </Col>
          <Col className="gutter-row" span={4}>
            <Select
              style={{
                width: "190px",
                marginRight: "5px",
                padding: "8px 0",
                color: "#C6C6C6",
              }}
              defaultValue="เลือกจังหวัด/อำเภอ/ตำบล"
              // onChange={handleChange}>
            >
              <Option value="1">สระบุรี</Option>
              <Option value="2">อ่างทอง</Option>
              <Option value="3">เชียงใหม่</Option>
              <Option value="4">น่าน</Option>
            </Select>
          </Col>
          <Col className="gutter-row" span={4}>
            <Select
              style={{
                width: "190px",
                marginRight: "5px",
                padding: "8px 0",
                color: "#C6C6C6",
              }}
              defaultValue="เลือกสถานะการใช้งาน"
              // onChange={handleChange}>
            >
              <Option value="1">ใช้งาน</Option>
              <Option value="2">รอยืนยันตัวตน</Option>
              <Option value="3">อนุมัติ</Option>
              <Option value="4">ปิดการใช้งาน</Option>
            </Select>
          </Col>
          <Col className="gutter-row" span={4} style={{ marginTop: "8px" }}>
            <AddButtton
              text="เพิ่มเกษตร"
              onClick={() => (window.location.href = "/AddFarmer")}
            />
          </Col>
        </Row>
      </div>
    );
  };

  const pageTitle = (
    <>
      <div
        className="container d-flex justify-content-between"
        style={{ padding: "10px" }}
      >
        <div>
          <span
            className="card-label font-weight-bolder text-dark"
            style={{ fontSize: 22, fontWeight: "bold", padding: "8px" }}
          >
            <strong>ข้อมูลเกษตรกร (Farmer)</strong>
          </span>
        </div>
        <div>
          <AddButtton
            text="เพิ่มเกษตรกร"
            onClick={() => (window.location.href = "/AddFarmer")}
          />
        </div>
      </div>
      <div
        className="container d-flex justify-content-between"
        style={{ padding: "8px" }}
      >
        <div className="col-lg-3">
          <Search
            placeholder="ค้นหาชื่อเกษตรกร หรือเบอร์โทร"
            className="col-lg-12 p-1"
          />
        </div>
        <div className="col-lg-3">
          <Select className="col-lg-12 p-1" placeholder="เลือกจังหวัด"></Select>
        </div>
        <div className="col-lg-2">
          <Select
            className="col-lg-12 p-1"
            placeholder="เลือกอำเภอ"
            disabled
          ></Select>
        </div>
        <div className="col-lg-2">
          <Select
            className="col-lg-12 p-1"
            placeholder="เลือกตำบล"
            disabled
          ></Select>
        </div>
        <div className="col-lg-2">
          <Select className="col-lg-12 p-1" placeholder="เลือกสถานะ"></Select>
        </div>
      </div>
    </>
  );

  const columns = [
    {
      title: "ชื่อเกษตรกร",
      dataIndex: "fullname",
      key: "name",
      width: "12%",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <span>
              {row.firstname + " " + row.lastname}
            </span>
          ),
        };
      },
    },
    {
      title: "เบอร์โทร",
      dataIndex: "telephoneNo",
      key: "telephoneNo",
      width: "12%",
    },
    {
      title: "จังหวัด",
      dataIndex: "province",
      key: "province",
      width: "12%",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <span>
              {row.address.province.region}
            </span>
          ),
        };
      },
    },
    {
      title: "อำเภอ",
      dataIndex: "district",
      key: "district",
      width: "12%",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <span>
              {row.address.district.districtName}
            </span>
          ),
        };
      },
    },
    {
      title: "ตำบล",
      dataIndex: "date",
      key: "date",
      width: "12%",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <span>
              {row.address.subdistrict.subdistrictName}
            </span>
          ),
        };
      },
    },
    {
      title: "จำนวนแปลง",
      dataIndex: "totalPlotCount",
      key: "totalPlotCount",
      width: "12%",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <span>
              {row.totalPlotCount} แปลง
            </span>
          ),
        };
      },
    },
    {
      title: "จำนวนไร่",
      dataIndex: "totalRaiCount",
      key: "totalRaiCount",
      width: "12%",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <span>
              {row.totalRaiCount} ไร่
            </span>
          ),
        };
      },
    },
    {
      title: "สถานะ",
      dataIndex: "date",
      key: "date",
      width: "12%",
    },
    {
      title: "",
      dataIndex: "Action",
      key: "Action",
      width: "9%",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div className="d-flex flex-row justify-content-between">
              <ActionButton
                icon={<EditOutlined />}
                color={color.primary1}
                onClick={() => (window.location.href = "/EditFarmer")}
              />
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
          dataSource={data?.data}
          columns={columns}
          pagination={false}
          size="large"
          tableLayout="fixed"
        />
      </CardContainer>
      <div className="d-flex justify-content-between pt-5">
        <h5>รายการทั้งหมด {data?.count} รายการ</h5>
        <Pagination
          current={current}
          total={data?.count}
          onChange={onChangePage}
          pageSize={row}
        />
      </div>
    </Layouts>
  );
}

export default IndexFarmer;
