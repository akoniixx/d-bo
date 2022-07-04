import { Button, Col, Empty, Row, Select, Switch, Table } from "antd";
import React, { useState } from "react";
import Search from "antd/lib/input/Search";
import { Option } from "antd/lib/mentions";
import color from "../../resource/color";
import Layouts from "../../components/layout/Layout";
import EditButton from "../../components/button/ActionButton";
import ActionButton from "../../components/button/ActionButton";
import { EditOutlined } from "@ant-design/icons";

function IndexDroner() {
  const onSearch = (value: string) => console.log(value);
  const PageTitle = () => {
    return (
      <div className="container">
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" span={6}>
            <div>
              <span
                className="card-label font-weight-bolder text-dark"
                style={{ fontSize: 22, fontWeight: "bold", padding: "8px 0" }}
              >
                รายชื่อนักบินโดรน (Droner)
              </span>
            </div>
          </Col>
          <Col className="gutter-row" span={5}>
            <Search
              style={{ width: "245px", padding: "8px 0" }}
              placeholder="ค้นหาชื่อนักบินโดรนหรือเบอร์โทร"
              onSearch={onSearch}
            />
          </Col>
          <Col className="gutter-row" span={3}>
            <Select
              style={{
                width: "145px",
                padding: "8px 0",
                color: "#C6C6C6",
              }}
              defaultValue="เลือกจังหวัด/อำเภอ/ตำบล"
              // onChange={handleChange}>
            >
              <Option value="1">1</Option>
              <Option value="2">2</Option>
              <Option value="3">3</Option>
              <Option value="4">4</Option>
            </Select>
          </Col>
          <Col className="gutter-row" span={3}>
            <Select
              style={{
                width: "140px",
                marginRight: "5px",
                padding: "8px 0",
                color: "#C6C6C6",
              }}
              defaultValue="เลือกยี่ห้อ"
              // onChange={handleChange}>
            >
              <Option value="1">1</Option>
              <Option value="2">2</Option>
              <Option value="3">3</Option>
              <Option value="4">4</Option>
            </Select>
          </Col>
          <Col className="gutter-row" span={3}>
            <Select
              style={{
                width: "140px",
                marginRight: "5px",
                padding: "8px 0",
                color: "#C6C6C6",
              }}
              defaultValue="เลือกสถานะ"
              // onChange={handleChange}>
            >
              <Option value="1">1</Option>
              <Option value="2">2</Option>
              <Option value="3">3</Option>
              <Option value="4">4</Option>
            </Select>
          </Col>
          <Col className="gutter-row" style={{ marginTop: "8px" }}>
            <Button
              style={{
                width: "130px",
                backgroundColor: color.primary1,
                color: color.secondary2,
              }}
              onClick={() => (window.location.href = "/AddDroner")}
              type="primary"
            >
              + เพิ่มนักบินโดรน
            </Button>
          </Col>
        </Row>
      </div>
    );
  };
  const columns = [
    {
      title: "ชื่อนักบินโดรน",
      dataIndex: "name",
      key: "name",
      width: "12%",
    },
    {
      title: "ตำบล",
      dataIndex: "age",
      key: "age",
      width: "12%",
    },
    {
      title: "อำเภอ",
      dataIndex: "address",
      key: "address",
      width: "12%",
    },
    {
      title: "จังหวัด",
      dataIndex: "province",
      key: "province",
      width: "12%",
    },
    {
      title: "เบอร์โทร",
      dataIndex: "tel",
      key: "tel",
      width: "12%",
    },
    {
      title: "จำนวนโดรน",
      dataIndex: "count",
      key: "count",
      width: "12%",
    },
    {
      title: "ยี่ห้อ",
      dataIndex: "brand",
      key: "brand",
      width: "12%",
    },
    {
      title: "สถานะ",
      dataIndex: "active",
      key: "active",
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
                onClick={() => (window.location.href = "")}
              />
            </div>
          ),
        };
      },
    },
  ];
  const dataMock = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "ABC",
      province: "Bangkok",
      tel: "098-1234567",
      count: "2",
      brand: "Cat",
      active: "รอตรวจสอบ",
    },
  ];
  return (
    <Layouts>
      <PageTitle />
      <br />
      <Table
        columns={columns}
        dataSource={dataMock}
        pagination={{ position: ["bottomRight"] }}
        size="large"
        tableLayout="fixed"
      />
    </Layouts>
  );
}

export default IndexDroner;
