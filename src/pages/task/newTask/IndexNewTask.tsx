import { DeleteOutlined, DownOutlined, EditOutlined } from "@ant-design/icons";
import { Button, DatePicker, Dropdown, Menu, Select, Space, Table } from "antd";
import Search from "antd/lib/input/Search";
import moment from "moment";
import React, { useEffect, useState } from "react";
import ActionButton from "../../../components/button/ActionButton";
import { CardContainer } from "../../../components/card/CardContainer";
import Layouts from "../../../components/layout/Layout";
import { TaskDatasource } from "../../../datasource/TaskDatasource";
import { NewTaskPageEntity } from "../../../entities/NewTaskEntities";
import { color } from "../../../resource";
import { DateTimeUtil } from "../../../utilities/DateTimeUtil";
const { RangePicker } = DatePicker;
const dateFormat = "YYYY-MM-DD";

const IndexNewTask = () => {
  const row = 10;
  const [data, setData] = useState<NewTaskPageEntity>();

  const fetchNewTaskList = async () => {
    await TaskDatasource.getNewTaskList(row, 1).then((res) => {
      console.log(res.data);
      setData(res);
    });
  };

  useEffect(() => {
    fetchNewTaskList();
  }, []);

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
      dataIndex: "date_appointment",
      key: "date_appointment",
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{DateTimeUtil.formatDateTime(value)}</span>,
        };
      },
    },
    {
      title: "ชื่อเกษตรกร",
      dataIndex: "fullname",
      key: "fullname",
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{row.firstname + " " + row.lastname}</span>,
        };
      },
    },
    {
      title: "พื้นที่แปลงเกษตร",
      render: (value: any, row: any, index: number) => {
        const checkAddress = () => {
          let province =
            row.province_name == null ? "" : row.province_name + "/";
          let district =
            row.district_name == null ? "" : row.district_name + "/";
          let subdistrict =
            row.subdistrict_name == null ? "" : row.subdistrict_name + "/";
          return province + district + subdistrict;
        };
        return {
          children: <span>{checkAddress()}</span>,
        };
      },
    },
    {
      title: "ค่าบริการ",
      dataIndex: "total_price",
      key: "total_price",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <span>
              {row.total_price == null ? 0 + " บาท" : row.total_price + " บาท"}
            </span>
          ),
        };
      },
    },
    {
      title: "นักบินโดรน",
      dataIndex: "count_droner",
      key: "count_droner",
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>จำนวน {row.count_droner} ราย</span>,
        };
      },
    },
    {
      title: "สถานะ",
      dataIndex: "task_status",
      key: "task_status",
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
                <ActionButton icon={<EditOutlined />} color={color.primary1} />
              </div>
              <div className="col-lg-6">
                <ActionButton icon={<DeleteOutlined />} color={color.Error} />
              </div>
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
    </Layouts>
  );
};

export default IndexNewTask;
