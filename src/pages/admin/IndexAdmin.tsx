import { EditOutlined } from "@ant-design/icons";
import { Badge, Button, Pagination, Table } from "antd";
import React, { useState } from "react";
import ActionButton from "../../components/button/ActionButton";
import AddButtton from "../../components/button/AddButton";
import Layout from "../../components/layout/Layout";
import { color } from "../../resource";

const IndexAdmin = () => {
  const [data, setData] = useState();

  const colorStatus = (status: string) => {
    var colorText = color.Success;
    colorText = status == "ใช้งาน" ? colorText : color.Error;
    return colorText;
  };
  const datasource = [
    {
      key: 1,
      fullname: "รชยา ช่างภักดี",
      username: "rachaya",
      email: "rachaya.c@iconkaset.com",
      role: "Admin",
      updatedate: "2022-02-30",
      status: "ใช้งาน",
    },
  ];

  const columns = [
    {
      title: "ชื่อ-นามสกุล",
      dataIndex: "fullname",
      key: "fullname",
      width: "15%",
    },
    {
      title: "ชื่อผู้ใช้ (User Name)",
      dataIndex: "username",
      key: "username",
      width: "15%",
    },
    {
      title: "อีเมลล์",
      dataIndex: "email",
      key: "email",
      width: "20%",
    },
    {
      title: "บทบาท",
      dataIndex: "role",
      key: "role",
      width: "12%",
    },
    {
      title: "สถานะ",
      dataIndex: "status",
      key: "status",
      width: "12%",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <span style={{ color: colorStatus(value) }}>
              <Badge color={colorStatus(value)} />
              {value}
            </span>
          ),
        };
      },
    },
    {
      title: "อัพเดทล่าสุด",
      dataIndex: "ีupdatedate",
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
                onClick={() => (window.location.href = "/EditAdmin")}
              />
            </div>
          ),
        };
      },
    },
  ];

  const pageTitle = (
    <div className="container" style={{ padding: "10px" }}>
      <div className="d-flex justify-content-between">
        <div className="text-left">
          <span
            className="card-label font-weight-bolder text-dark"
            style={{ fontSize: 22, fontWeight: "bold", padding: "8px" }}
          >
            <strong>รายชื่อผู้ดูแลระบบ (User Management)</strong>
          </span>
        </div>
        <AddButtton
          text="เพิ่มผู้ดูแลระบบ"
          onClick={() => (window.location.href = "/AddAdmin")}
        />
      </div>
    </div>
  );

  return (
    <Layout>
      {pageTitle}
      <Table
        dataSource={datasource}
        columns={columns}
        pagination={false}
        size="large"
        tableLayout="fixed"
      />
      <div className="d-flex justify-content-between pt-5">
        <p>รายการทั้งหมด {datasource.length} รายการ</p>
        <Pagination defaultCurrent={1} total={1} />
      </div>
    </Layout>
  );
};
export default IndexAdmin;
