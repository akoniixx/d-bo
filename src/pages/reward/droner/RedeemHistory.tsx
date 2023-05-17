import {
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  FileSearchOutlined,
  FileTextOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Badge,
  Button,
  Checkbox,
  Col,
  DatePicker,
  Dropdown,
  Image,
  Input,
  Menu,
  Pagination,
  Row,
  Select,
  Table,
} from "antd";
import moment from "moment";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import { BackIconButton } from "../../../components/button/BackButton";
import color from "../../../resource/color";
import ActionButton from "../../../components/button/ActionButton";
import Layouts from "../../../components/layout/Layout";

function RedeemHistory() {
  const { RangePicker } = DatePicker;
  const dateFormat = "DD/MM/YYYY";
  const timeFormat = "HH:mm";
  const dateSearchFormat = "YYYY-MM-DD";
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  const onChangeStatus = (checkedValues: CheckboxValueType[]) => {
    console.log("checked = ", checkedValues);
  };
  const removeReward = () => {
    Swal.fire({
      title: "ยืนยันการลบ",
      text: "โปรดตรวจสอบของรางวัลที่คุณต้องการลบ ก่อนที่จะกดยืนยันการลบ เพราะอาจส่งผลต่อการแลกของรางวัลในระบบ",
      cancelButtonText: "ยกเลิก",
      confirmButtonText: "ลบ",
      confirmButtonColor: "#d33",
      showCancelButton: true,
      showCloseButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        // await DroneDatasource.deleteDroneBrand(data.id);
      }
      // fetchDrone();
    });
  };
  const handleVisible = (newVisible: any) => {
    setVisible(newVisible);
  };
  const SubStatus = (
    <Menu
      items={[
        {
          label: (
            <>
              <Checkbox.Group onChange={onChangeStatus}>
                <Checkbox value="ยัง">ยังไม่ได้แลก</Checkbox>
                <br />
                <Checkbox value="กำลัง">กำลังดำเนินการแลก</Checkbox>
                <br />
                <Checkbox value="เสร็จ">แลกสำเร็จ</Checkbox>
              </Checkbox.Group>
            </>
          ),
          key: "status",
        },
      ]}
    />
  );
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
  const PageTitle = (
    <>
      <div className="container d-flex" style={{ padding: "8px" }}>
        <BackIconButton onClick={() => navigate(-1)} />
        <div className="col-lg-6 p-3">
          <span
            className="card-label font-weight-bolder text-dark"
            style={{ fontSize: 22, fontWeight: "bold" }}
          >
            <strong>
              {" "}
              ประวัติการแลก | RW00000001 | Physical
              <span style={{ color: color.secondary3 }}>{` (ใช้คะแนน)`}</span>
            </strong>
          </span>
        </div>
        <div className="col-lg-3 p-3">
          <RangePicker
            className="col-lg-12"
            style={{ alignSelf: "" }}
            allowClear
            // onCalendarChange={SearchDate}
            format={dateFormat}
          />
        </div>
        <div className="col-lg p-3">
          <Button
            style={{
              borderColor: color.Success,
              borderRadius: "5px",
              color: color.secondary2,
              backgroundColor: color.Success,
            }}
            className="col-lg-12"
            // onClick={fetchLocationPrice}
          >
            ดาวน์โหลดรหัสของรางวัล
          </Button>
        </div>
      </div>
      <div
        className="container d-flex justify-content-between"
        style={{ padding: "8px" }}
      >
        <div className="col-lg-9 p-1">
          <Input
            allowClear
            prefix={<SearchOutlined style={{ color: color.Disable }} />}
            placeholder="ค้นหาชื่อนักบินโดรน / เบอร์โทร / รหัสคะแนน / รหัสนักบินโดรน"
            className="col-lg-12 p-1"
            // onChange={changeTextSearch}
          />
        </div>
        <div className="col-lg-2 p-1">
          <Dropdown
            overlay={SubStatus}
            trigger={["click"]}
            className="col-lg-12 "
            onVisibleChange={handleVisible}
            visible={visible}
          >
            <Button style={{ color: color.Disable }}>
              เลือกสถานะ
              <DownOutlined />
            </Button>
          </Dropdown>
        </div>
        <div className="pt-1">
          <Button
            style={{
              borderColor: color.Success,
              borderRadius: "5px",
              color: color.secondary2,
              backgroundColor: color.Success,
            }}
            // onClick={fetchData}
          >
            ค้นหาข้อมูล
          </Button>
        </div>
      </div>
    </>
  );
  const data = [
    {
      key: "1",
      idReward: "RW000001",
      name: "มานี มีเยอะ",
      phone: "098-8887777",
      date: "18/05/2565, 10:00",
      points: "5000 คะแนน",
      remaining: "20 ชิ้น",
      status: "คำร้องขอแลก",
    },
    {
      key: "2",
      idReward: "RW000002",
      name: "มานี มีเยอะ",
      phone: "098-8887777",
      date: "18/05/2565, 10:00",
      points: "5000 คะแนน",
      remaining: "20 ชิ้น",
      status: "แลกสำเร็จ",
    },
    {
      key: "3",
      idReward: "RW000003",
      name: "มานี มีเยอะ",
      phone: "098-8887777",
      date: "18/05/2565, 10:00",
      points: "2000 คะแนน",
      remaining: "20 ชิ้น",
      status: "กำลังดำเนินการแลก",
    },
    {
      key: "4",
      idReward: "RW000004",
      name: "มานี มีเยอะ",
      phone: "098-8887777",
      date: "18/05/2565, 10:00",
      points: "2000 คะแนน",
      remaining: "20 ชิ้น",
      status: "ยกเลิก",
    },
  ];
  const columns = [
    {
      title: "วันที่อัพเดต",
      dataIndex: "date",
      key: "date",
      sorter: (a: any, b: any) => sorter(a.farmAreaAmount, b.farmAreaAmount),
      // render: (value: any, row: any, index: number) => {
      //   return {
      //     children: (
      //       <>

      //       </>
      //     ),
      //   };
      // },
    },
    {
      title: "ชื่อผู้ใช้งาน",
      dataIndex: "name",
      key: "name",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span
                style={{
                  cursor: "pointer",
                  color: color.Success,
                  textDecorationLine: "underline",
                  fontWeight: "700",
                }}
                // onClick={() => previewData(row)}
              >
                {row.name}
              </span>
            </>
          ),
        };
      },
    },
    {
      title: "เบอร์โทร",
      dataIndex: "phone",
      key: "phone",
      // render: (value: any, row: any, index: number) => {
      //   return {
      //     children: (
      //       <>
      //       </>
      //     ),
      //   };
      // },
    },
    {
      title: "Redeem Transection",
      dataIndex: "idReward",
      key: "idReward",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span
                style={{
                  cursor: "pointer",
                  color: color.Success,
                  textDecorationLine: "underline",
                  fontWeight: "700",
                }}
                // onClick={() => previewData(row)}
              >
                {row.idReward}
              </span>
            </>
          ),
        };
      },
    },
    {
      title: "จำนวน",
      dataIndex: "remaining",
      key: "remaining",
      // render: (value: any, row: any, index: number) => {
      //   return {
      //     children: (
      //       <>

      //       </>
      //     ),
      //   };
      // },
    },
    {
      title: "คะแนนที่ใช้แลก",
      dataIndex: "points",
      key: "points",
      // render: (value: any, row: any, index: number) => {
      //   return {
      //     children: (
      //       <>

      //       </>
      //     ),
      //   };
      // },
    },
    {
      title: "สถานะ",
      dataIndex: "status",
      key: "status",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              {row.status === "คำร้องขอแลก" && (
                <span style={{ color: color.secondary2 }}>
                  <Badge color={color.secondary2} style={{ right: 5 }} />
                  {row.status}
                </span>
              )}
              {row.status === "แลกสำเร็จ" && (
                <span style={{ color: color.Success }}>
                  <Badge color={color.Success} style={{ right: 5 }} />
                  {row.status}
                </span>
              )}
              {row.status === "กำลังดำเนินการแลก" && (
                <span style={{ color: color.Warning }}>
                  <Badge color={color.Warning} style={{ right: 5 }} />
                  {row.status}
                </span>
              )}
              {row.status === "ยกเลิก" && (
                <span style={{ color: color.Error }}>
                  <Badge color={color.Error} style={{ right: 5 }} />
                  {row.status}
                </span>
              )}
            </>
          ),
        };
      },
    }
  ];
  return (
    <Layouts>
      {PageTitle}
      <br />
      <Table columns={columns} dataSource={data} pagination={false} />

      <div className="d-flex justify-content-between pt-5 ">
        <p>รายการทั้งหมด {data.length} รายการ</p>
        <Pagination />
      </div>
    </Layouts>
  );
}
export default RedeemHistory;
