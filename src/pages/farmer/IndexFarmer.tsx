import { Button, Col, Input, Row, Select, Table } from "antd";
import React, { useState } from "react";
import { CardContainer } from "../../components/card/CardContainer";
import Layouts from "../../components/layout/Layout";
import { SearchOutlined } from "@ant-design/icons";
import Search from "antd/lib/input/Search";
import { Option } from "antd/lib/mentions";
import color from "../../resource/color";
import { Container } from "react-bootstrap";
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
                style={{ fontSize: 20, fontWeight: "bold", padding: "8px 0" }}
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
      dataIndex: "date",
      key: "date",
      width: "12%",
    },
    {
      title: "เบอร์โทร",
      dataIndex: "date",
      key: "date",
      width: "12%",
    },
    {
      title: "จังหวัด",
      dataIndex: "date",
      key: "date",
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
  ];

  return (
    <Layouts>
      <PageTitle />
      <br />
      <Table
        columns={columns}
        pagination={{ position: ["bottomCenter"] }}
        size="large"
        tableLayout="fixed"
      />
      {/* <CardContainer>
      </CardContainer> */}
    </Layouts>
  );
}

export default IndexFarmer;
