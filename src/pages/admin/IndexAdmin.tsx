import { EditOutlined } from "@ant-design/icons";
import { Badge, Button, Pagination, Table } from "antd";
import React, { useEffect, useState } from "react";
import ActionButton from "../../components/button/ActionButton";
import AddButtton from "../../components/button/AddButton";
import { CardContainer } from "../../components/card/CardContainer";
import Layout from "../../components/layout/Layout";
import { AdminDatasource } from "../../datasource/AdminDatasource";
import { STATUS_NORMAL_MAPPING } from "../../definitions/Status";
import {
  UserStaffCreate,
  UserStaffCreate_INIT,
} from "../../entities/UserStaffEntities";
import { color } from "../../resource";
import { DateTimeUtil } from "../../utilities/DateTimeUtil";

const IndexAdmin = () => {
  const [data, setData] = useState<UserStaffCreate[]>([UserStaffCreate_INIT]);

  const fecthAdmin = async () => {
    await AdminDatasource.getAdminList().then((res: UserStaffCreate[]) => {
      console.log(res);
      setData(res);
    });
  };

  useEffect(() => {
    fecthAdmin();
  }, []);

  const colorStatus = (status: string) => {
    var mapStatus = STATUS_NORMAL_MAPPING[status];
    var colorText = color.Success;
    colorText = mapStatus == "ใช้งาน" ? colorText : color.Error;
    return colorText;
  };

  const columns = [
    {
      title: "ชื่อ-นามสกุล",
      dataIndex: "firstname",
      key: "firstname",
      width: "10%",
    },
    {
      title: "",
      dataIndex: "lastname",
      key: "lastname",
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
      dataIndex: "isActive",
      key: "isActive",
      width: "12%",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <span style={{ color: colorStatus(value) }}>
              <Badge color={colorStatus(value)} />
              {STATUS_NORMAL_MAPPING[value]}
            </span>
          ),
        };
      },
    },
    {
      title: "อัพเดทล่าสุด",
      dataIndex: "updatedAt",
      key: "updatedAt",
      width: "15%",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <span>              
              {DateTimeUtil.formatDateTime(value)}
            </span>
          ),
        };
      },
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
      <CardContainer style={{ paddingBottom: "30%" }}>
        <Table
          dataSource={data}
          columns={columns}
          pagination={false}
          size="large"
          tableLayout="fixed"
        />
      </CardContainer>
      <div className="d-flex justify-content-between pt-5">
        <p>รายการทั้งหมด {data.length} รายการ</p>
        <Pagination defaultCurrent={1} total={1} />
      </div>
    </Layout>
  );
};
export default IndexAdmin;
