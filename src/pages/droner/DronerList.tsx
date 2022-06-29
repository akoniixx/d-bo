import { Button, Col, Input, Row, Select, Table } from "antd";
import React, { useState } from "react";
import { CardContainer } from "../../components/card/CardContainer";
import Layouts from "../../components/layout/Layout";
import Search from "antd/lib/input/Search";
import { Option } from "antd/lib/mentions";
import EditButton from "../../components/button/EditButton";
function DronerList() {
  const onSearch = (value: string) => console.log(value);
  const PageTitle = () => {
    return (
      <div className="container">
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" span={8}>
            <div>
              <span
                className="card-label font-weight-bolder text-dark"
                style={{ fontSize: 22, fontWeight: "bold", padding: "8px 0" }}
              >
                รายการโดรนเกษตร (Drone List)
              </span>
            </div>
          </Col>
          <Col className="gutter-row" span={6}>
            <Search
              style={{ width: "290px", padding: "8px 0" }}
              placeholder="ค้นหาเลขตัวถังหรือชื่อนักบินโดรน"
              onSearch={onSearch}
            />
          </Col>
          <Col className="gutter-row" span={3}>
            <Select
              style={{
                width: "140px",
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
              defaultValue="เลือกรุ่นโดรน"
              // onChange={handleChange}>
            >
              <Option value="1">1</Option>
              <Option value="2">2</Option>
              <Option value="3">3</Option>
              <Option value="4">4</Option>
            </Select>
          </Col>
          <Col className="gutter-row">
            <Select
              style={{
                width: "130px",
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
        </Row>
      </div>
    );
  };
  const columns = [
    {
      title: "วันที่ลงทะเบียน",
      dataIndex: "date",
      key: "date",
      width: "15%",
    },
    {
      title: "ยี่ห้อโดรน",
      dataIndex: "bran",
      key: "bran",
      width: "12%",
    },
    {
      title: "เลขตัวถัง",
      dataIndex: "numb",
      key: "numb",
      width: "18%",
    },
    {
      title: "ชื่อนักบินโดรน",
      dataIndex: "named",
      key: "named",
      width: "20%",
    },
    {
      title: "ใบอนุญาตนักบิน ",
      dataIndex: "paper",
      key: "paper",
      width: "18%",
    },
    {
      title: "ใบอนุญาตโดรน(กสทช.) ",
      dataIndex: "paperA",
      key: "paperA",
      width: "18%",
    },
    {
      title: "สถานะ",
      dataIndex: "active",
      key: "active",
      width: "10%",
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
                  onClick={() => (window.location.href = "/EditDroneList")}
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
  const dataMock = [
    {
      key: "1",
      name: "Mike",
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

export default DronerList;
