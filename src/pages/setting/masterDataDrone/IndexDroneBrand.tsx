import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Badge, Button, Input, Pagination, Table } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ActionButton from "../../../components/button/ActionButton";
import { CardContainer } from "../../../components/card/CardContainer";
import Layouts from "../../../components/layout/Layout";
import { DroneDatasource } from "../../../datasource/DroneDatasource";
import { DroneBrandEntity } from "../../../entities/DroneBrandEntities";
import { color } from "../../../resource";
import { DateTimeUtil } from "../../../utilities/DateTimeUtil";

function IndexDroneBrand() {
  const row = 10;
  const [current, setCurrent] = useState(1);
  const [data, setData] = useState<DroneBrandEntity[]>();
  const [searchText, setSearchText] = useState<string>();

  const onChangePage = (page: number) => {
    setCurrent(page);
  };
  const fetchDrone = async () => {
    await DroneDatasource.getDroneBrandList(searchText).then((res) => {
      setData(res.data);
    });
  };
  useEffect(() => {
    fetchDrone();
  }, []);

  const changeTextSearch = (searchText: any) => {
    setSearchText(searchText.target.value);
  };

  const pageTitle = (
    <div className="container d-flex pb-3" style={{ padding: "8px" }}>
      <div className="col-lg-6">
        <span
          className="card-label font-weight-bolder text-dark"
          style={{ fontSize: 22, fontWeight: "bold", padding: "8px" }}
        >
          <strong>ยี่ห้อโดรน (Drone Brand)</strong>
        </span>
      </div>
      <div className="col-lg-3 p-1">
        <Input
          style={{ height: 35 }}
          allowClear
          prefix={<SearchOutlined style={{ color: color.Disable }} />}
          placeholder="ค้นหาชื่อยี่ห้อโดรน"
          className="col-lg-12 p-1"
          onChange={changeTextSearch}
        />
      </div>
      <div className="col-lg p-1">
        <Button
          style={{
            height: 35,
            borderColor: color.Success,
            borderRadius: "5px",
            color: color.secondary2,
            backgroundColor: color.Success,
          }}
          className="col-lg-12"
          onClick={fetchDrone}
        >
          ค้นหาข้อมูล
        </Button>
      </div>
      <div className="col-lg p-1">
        <Button
          style={{
            height: 35,
            borderColor: color.Success,
            borderRadius: "5px",
            color: color.secondary2,
            backgroundColor: color.Success,
          }}
          onClick={() => (window.location.href = "/AddDroneBrand")}
        >
          + เพิ่มยี่ห้อโดรน
        </Button>
      </div>
    </div>
  );
  const removeDroneBrand = (data: DroneBrandEntity) => {
    console.log(data)
    Swal.fire({
      title: "ยืนยันการลบ",
      text: "โปรดตรวจสอบยี่ห้อโดรนที่คุณต้องการลบ ก่อนที่จะกดยืนยันการลบ เพราะอาจส่งผลต่อข้อมูลยี่ห้อโดรนและรุ่นโดรนในระบบ",
      cancelButtonText: "ยกเลิก",
      confirmButtonText: "ลบ",
      confirmButtonColor: "#d33",
      showCancelButton: true,
      showCloseButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await DroneDatasource.deleteDroneBrand(data);
      }
      fetchDrone();
    });
  };
  const columns = [
    {
      title: "ชื่อยี่ห้อ/แบรนด์",
      dataIndex: "name",
      key: "name",
      width: "30%",
    },
    {
      title: "จำนวนรุ่นโดรน",
      dataIndex: "drone",
      key: "drone",
      width: "20%",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <span>
              {row.drone !== 0
                ? `${row.drone + " " + "รุ่น"}`
                : 0 + " " + "รุ่น"}
            </span>
          ),
        };
      },
    },
    {
      title: "สถานะ",
      dataIndex: "isActive",
      key: "isActive",
      width: "20%",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <span style={{ color: value ? color.Success : color.Error }}>
              <Badge color={value ? color.Success : color.Error} />{" "}
              {value ? "ใช้งาน" : "ไม่ใช้งาน"}
            </span>
          ),
        };
      },
    },
    {
      title: "อัพเดตล่าสุด",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <span> {moment(row.updatedAt).format("DD/MM/YYYY, HH:mm")}</span>
          ),
        };
      },
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div
              className="d-flex flex-row"
              style={{ justifyContent: "center" }}
            >
              <div className="col-lg-4">
                <ActionButton icon={<EditOutlined />} color={color.primary1}    onClick={() =>
                  (window.location.href = "/EditDroneBrand/id=" + row.id)
                }/>
              </div>
              <div>
                <ActionButton
                  icon={<DeleteOutlined />}
                  color={color.Error}
                  onClick={() => removeDroneBrand(row.id)}
                />
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
          dataSource={data}
          columns={columns}
          pagination={false}
          size="large"
          tableLayout="fixed"
        />
      </CardContainer>
      <div className="d-flex justify-content-between pt-5">
        <p>รายการทั้งหมด {data?.length} รายการ</p>
        <Pagination
          current={current}
          total={data?.length}
          onChange={onChangePage}
          pageSize={row}
        />
      </div>
    </Layouts>
  );
}

export default IndexDroneBrand;
