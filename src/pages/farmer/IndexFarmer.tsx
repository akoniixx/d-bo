import { Button, Col, Empty, Row, Select, Switch, Table } from "antd";
import React, { useState } from "react";
import Search from "antd/lib/input/Search";
import { Option } from "antd/lib/mentions";
import color from "../../resource/color";
import Layouts from "../../components/layout/Layout";
import EditButton from "../../components/button/EditButton";

function IndexFarmer() {
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
                ข้อมูลเกษตรกร (Farmer)
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
              <Option value="1">1</Option>
              <Option value="2">2</Option>
              <Option value="3">3</Option>
              <Option value="4">4</Option>
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
              <Option value="1">1</Option>
              <Option value="2">2</Option>
              <Option value="3">3</Option>
              <Option value="4">4</Option>
            </Select>
          </Col>
          <Col className="gutter-row" span={4} style={{ marginTop: "8px" }}>
            <Button
              style={{
                width: "130px",
                padding: "8 0",
                backgroundColor: color.primary1,
                color: color.secondary2,
              }}
              onClick={() => (window.location.href = "/AddFarmer")}
              type="primary"
            >
              + เพิ่มเกษตรกร
            </Button>
          </Col>
        </Row>
      </div>
    );
  };
  const columns = [
    {
      title: "ชื่อเกษตรกร",
      dataIndex: "name",
      key: "name",
      width: "12%",
    },
    {
      title: "เบอร์โทร",
      dataIndex: "age",
      key: "age",
      width: "12%",
    },
    {
      title: "จังหวัด",
      dataIndex: "address",
      key: "address",
      width: "12%",
    },
    {
      title: "อำเภอ",
      dataIndex: "date",
      key: "date",
      width: "12%",
    },
    {
      title: "ตำบล",
      dataIndex: "date",
      key: "date",
      width: "12%",
    },
    {
      title: "จำนวนแปลง",
      dataIndex: "date",
      key: "date",
      width: "12%",
    },
    {
      title: "จำนวนไร่",
      dataIndex: "date",
      key: "date",
      width: "12%",
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
            <>
              <div className="d-flex flex-row justify-content-between">
                <div
                  className="btn btn-icon btn-sm"
                  onClick={() => (window.location.href = "")}
                >
                  <EditButton />
                </div>
              </div>
            </>
          ),
        };
      },
    },
  ];
  //MockData
  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "Bangkok",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "Saraburi",
    },
  ];
  return (
    <Layouts>
      <PageTitle />
      <br />
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{ position: ["bottomRight"] }}
        size="large"
        tableLayout="fixed"
      />
    </Layouts>
  );
}

export default IndexFarmer;
