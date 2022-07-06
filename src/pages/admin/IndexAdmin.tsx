import { EditOutlined } from "@ant-design/icons";
import { Badge, Button, Pagination, Select, Table } from "antd";
import "antd/dist/antd.css";
import React, { useEffect, useState } from "react";
import { string } from "yup";
import ActionButton from "../../components/button/ActionButton";
import AddButtton from "../../components/button/AddButton";
import { CardContainer } from "../../components/card/CardContainer";
import Layout from "../../components/layout/Layout";
import { AdminDatasource } from "../../datasource/AdminDatasource";
import { ROLE_ADMIN } from "../../definitions/RoleAdmin";
import { STATUS_NORMAL_MAPPING } from "../../definitions/Status";
import {
  UserStaffPageEntity,
  UserStaffPageEntity_INIT,
} from "../../entities/UserStaffEntities";
import { color } from "../../resource";
import { DateTimeUtil } from "../../utilities/DateTimeUtil";

const IndexAdmin = () => {
  const row = 10;
  const [data, setData] = useState<UserStaffPageEntity>(
    UserStaffPageEntity_INIT
  );
  const [current, setCurrent] = useState(1);
  const [searchStatus, setSearchStatus] = useState<boolean>();
  const [searchRole, setSearchRole] = useState<string>();
  const [roleNull, setRoleNull] = useState<string>();

  const fecthAdmin = async () => {
    await AdminDatasource.getAdminList(
      current,
      row,
      searchStatus,
      searchRole
    ).then((res: UserStaffPageEntity) => {
      setData(res);
    });
  };

  useEffect(() => {
    fecthAdmin();
  }, [current, searchStatus, searchRole]);

  const colorStatus = (status: string) => {
    var mapStatus = STATUS_NORMAL_MAPPING[status];
    var colorText = color.Success;
    colorText = mapStatus == "ใช้งาน" ? colorText : color.Error;
    return colorText;
  };

  const onChangePage = (page: number) => {
    setCurrent(page);
  };

  const handleOnChangeRole = (value: any) => {
    if (value != "") {
      setSearchRole(value);
    } else {
      setSearchRole(roleNull);
    }
  };

  const handleOnChangeStatus = (value: any) => {
    setSearchStatus(value);
  };

  const columns = [
    {
      title: "ชื่อ-นามสกุล",
      dataIndex: "firstname",
      key: "firstname",
      width: "10%",
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
          children: <span>{DateTimeUtil.formatDateTime(value)}</span>,
        };
      },
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      width: "9%",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div className="d-flex flex-row justify-content-between">
              <ActionButton
                icon={<EditOutlined />}
                color={color.primary1}
                onClick={() =>
                  (window.location.href = "/EditAdmin/id=" + value)
                }
              />
            </div>
          ),
        };
      },
    },
  ];

  const pageTitle = (
    <div
      className="container d-flex justify-content-between"
      style={{ padding: "10px" }}
    >
      <div className="col-lg-5">
        <span
          className="card-label font-weight-bolder text-dark"
          style={{ fontSize: 22, fontWeight: "bold", padding: "8px" }}
        >
          <strong>รายชื่อผู้ดูแลระบบ (User Management)</strong>
        </span>
      </div>
      <div className="col-lg-2">
        <Select
          className="col-lg-12"
          defaultValue="ALL"
          onChange={handleOnChangeRole}
        >
          {ROLE_ADMIN.map((item) => (
            <option value={item.key}>{item.status}</option>
          ))}
        </Select>
      </div>
      <div className="col-lg-2">
        <Select
          className="col-lg-12"
          onChange={handleOnChangeStatus}
          defaultValue="สถานะทั้งหมด"
        >
          <option value="" selected={true}>
            สถานะทั้งหมด
          </option>
          <option value="true">ใช้งาน</option>
          <option value="false">ไม่ได้ใช้งาน</option>
        </Select>
      </div>
      <div className="col-lg-2">
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
      <CardContainer>
        <Table
          dataSource={data.results}
          columns={columns}
          pagination={false}
          size="large"
          tableLayout="fixed"
        />
      </CardContainer>
      <div className="d-flex justify-content-between pt-5">
        <h5>รายการทั้งหมด {data.total} รายการ</h5>
        <Pagination
          current={current}
          total={data.total}
          onChange={onChangePage}
          pageSize={row}
        />
      </div>
    </Layout>
  );
};
export default IndexAdmin;
