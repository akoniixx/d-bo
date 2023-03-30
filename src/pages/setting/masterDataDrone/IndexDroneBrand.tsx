import React, { useEffect, useState } from "react";
import { Badge, Button, Input, Pagination, Table } from "antd";
import Layouts from "../../../components/layout/Layout";
import {
  DroneBrandEntity,
  DroneBrandListEntity,
  DroneBrandListEntity_INIT,
} from "../../../entities/DroneBrandEntities";
import { DroneDatasource } from "../../../datasource/DroneDatasource";
import { color } from "../../../resource";
import moment from "moment";
import ActionButton from "../../../components/button/ActionButton";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Swal from "sweetalert2";

const IndexDroneBrand: React.FC = () => {
  const [data, setData] = useState<DroneBrandListEntity>(
    DroneBrandListEntity_INIT,
);
  const [searchText, setSearchText] = useState<string>();

  const fetchDrone = async () => {
    await DroneDatasource.getCountDroneBrandList(searchText).then((res) => {
      setData(res);
    });
  };
  useEffect(() => {
    fetchDrone();
  }, []);
  const changeTextSearch = (searchText: any) => {
    setSearchText(searchText.target.value);
  };
  const isNumber = (n: any) => {
    return !isNaN(parseFloat(n)) && isFinite(n);
  };
  const sorter = (a: any, b: any) => {
    if (a === null) {
      return 1;
    }
    if (b === null) {
      return -1;
    }
    if (isNumber(a) && isNumber(b)) {
      if (parseInt(a, 10) === parseInt(b, 10)) {
        return 0;
      }
      return parseInt(a, 10) > parseInt(b, 10) ? 1 : -1;
    }
    if (isNumber(a)) {
      return -1;
    }
    if (isNumber(b)) {
      return 1;
    }
    if (a === b) {
      return 0;
    }
    return a > b ? 1 : -1;
  };
  const removeDroneBrand = (data: DroneBrandEntity) => {
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
        await DroneDatasource.deleteDroneBrand(data.id);
      }
      fetchDrone();
    });
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
  const columns = [
    {
      title: "ชื่อยี่ห้อ/แบรนด์",
      dataIndex: "name",
      key: "name",
      width: "25%",
      sorter: (a: any, b: any) => sorter(a.name, b.name),
    },
    {
      title: "จำนวนรุ่นโดรน",
      dataIndex: "drone",
      key: "drone",
      sorter: (a: any, b: any) => sorter(a.drone, b.drone),
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
      title: "จำนวนเครื่องโดรน",
      dataIndex: "droneCount",
      key: "droneCount",
      sorter: (a: any, b: any) => sorter(a.droneCount, b.droneCount),
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <span>
              {row.droneCount !== 0
                ? `${row.droneCount + " " + "ลำ"}`
                : 0 + " " + "ลำ"}
            </span>
          ),
        };
      },
    },
    {
      title: "สถานะ",
      dataIndex: "isActive",
      key: "isActive",
      width: "10%",
      sorter: (a: any, b: any) => sorter(a.isActive, b.isActive),
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
      sorter: (a: any, b: any) => sorter(a.updatedAt, b.updatedAt),
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
      width: "13%",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div
              className="d-flex flex-row"
              style={{ justifyContent: "center" }}
            >
              <div className="col-lg-4">
                <ActionButton
                  icon={<EditOutlined />}
                  color={color.primary1}
                  onClick={() =>
                    (window.location.href = "/EditDroneBrand/id=" + row.id)
                  }
                />
              </div>
              {row.drone === 0 ? (
                <div>
                  <ActionButton
                    icon={<DeleteOutlined />}
                    color={color.Error}
                    onClick={() => removeDroneBrand(row)}
                  />
                </div>
              ) : (
                <div>
                  <Button
                    disabled
                    style={{ borderRadius: 5 }}
                    icon={<DeleteOutlined />}
                    color={color.Disable}
                  />
                </div>
              )}
            </div>
          ),
        };
      },
    },
  ];
  return (
    <Layouts>
      {pageTitle}
      <Table columns={columns} dataSource={data.data} />
      <p>รายการทั้งหมด {data.count} รายการ</p>
    </Layouts>
  );
};

export default IndexDroneBrand;
