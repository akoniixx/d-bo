import { DownOutlined } from "@ant-design/icons";
import { Button, DatePicker, Dropdown, Menu, Select, Space, Table } from "antd";
import Search from "antd/lib/input/Search";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { CardContainer } from "../../../components/card/CardContainer";
import Layouts from "../../../components/layout/Layout";
import { color } from "../../../resource";
const { RangePicker } = DatePicker;
const dateFormat = "YYYY-MM-DD";

const IndexNewTask = () => {
  const menu = (
    <Menu
      items={[
        {
          label: "เลือกนักบินหลายคน (แบบปกติ)",
          key: "1",
          onClick: () => (window.location.href = "/AddNewTask=checkbox"),
        },
        {
          label: "บังคับเลือกนักบิน (ติดต่อแล้ว)",
          key: "2",
          onClick: () => (window.location.href = "/AddNewTask=radio"),
        },
      ]}
    />
  );

  const pageTitle = (
    <div
      className="container d-flex justify-content-between"
      style={{ padding: "10px" }}
    >
      <div className="col-lg-2">
        <span
          className="card-label font-weight-bolder text-dark"
          style={{ fontSize: 22, fontWeight: "bold", padding: "8px" }}
        >
          <strong>งานใหม่ (รอนักบิน)</strong>
        </span>
      </div>
      <div className="col-lg-3">
        <Search
          placeholder="ค้นหาชื่อเกษตรกร หรือเบอร์โทร"
          className="col-lg-12 p-1"
        />
      </div>
      <div className="col-lg-2">
        <Select className="col-lg-12 p-1" defaultValue="สถานะทั้งหมด">
          <option value="" selected={true}>
            สถานะทั้งหมด
          </option>
          <option value="true">ใช้งาน</option>
          <option value="false">ไม่ได้ใช้งาน</option>
        </Select>
      </div>
      <div className="col-lg-3 p-1">
        <RangePicker
          defaultValue={[
            moment("2019-09-03", dateFormat),
            moment("2019-11-22", dateFormat),
          ]}
        />
      </div>
      <div className="col-lg-2 p-1">
        <Dropdown overlay={menu}>
          <Button
            style={{
              padding: "8 0",
              backgroundColor: color.primary1,
              color: color.secondary2,
              borderColor: color.Success,
              borderRadius: "5px",
            }}
          >
            เพิ่มงานบินโดรนใหม่
            <DownOutlined />
          </Button>
        </Dropdown>
      </div>
    </div>
  );

  const columns = [
    {
      title: "วัน/เวลานัดหมาย",
      dataIndex: "firstname",
      key: "firstname",
    },
    {
      title: "ชื่อเกษตรกร",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "พื้นที่แปลงเกษตร",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "ค่าบริการ",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "นักบินโดรน",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "สถานะ",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "",
      dataIndex: "role",
      key: "role",
    },
  ];

  return (
    <Layouts>
      {pageTitle}
      <CardContainer>
        <Table
          columns={columns}
          pagination={false}
          size="large"
          tableLayout="fixed"
        />
      </CardContainer>
    </Layouts>
  );
};

export default IndexNewTask;
