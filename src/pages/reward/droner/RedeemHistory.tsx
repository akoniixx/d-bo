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
    const PageTitle = (
      <>
        <div className="container d-flex justify-content-between pt-1">
          <div className="pt-1">
            <BackIconButton
              onClick={() => {
                navigate(-1);
              }}
            />
          </div>
          <div className="col-lg-6">
            <strong style={{ fontSize: "20px" }}>
              ประวัติการแลกของรางวัล | RW00000001 | บัตรเติมน้ำมัน 500 บาท |
              Physical
            </strong>
          </div>
          <div className="col-lg-3">
            <RangePicker
              allowClear
              // onCalendarChange={SearchDate}
              format={dateFormat}
            />
          </div>
          <div className="col-lg-2">
            <Button
              style={{
                width: 180,
                borderColor: color.Success,
                borderRadius: "5px",
                color: color.secondary2,
                backgroundColor: color.Success,
              }}
              onClick={() => (window.location.href = "/")}
            >
              ดาวน์โหลดรหัสของรางวัล
            </Button>
          </div>
        </div>
        <div
          className="container d-flex justify-content-between"
          style={{ padding: "8px" }}
        >
          <div className="col-lg-5 p-1">
            <Input
              allowClear
              prefix={<SearchOutlined style={{ color: color.Disable }} />}
              placeholder="ค้นหาชื่อนักบิน"
              className="col-lg-12 p-1"
              // onChange={changeTextSearch}
            />
          </div>
          <div className="col-lg-4 p-1">
            <Input
              allowClear
              prefix={<SearchOutlined style={{ color: color.Disable }} />}
              placeholder="ค้นหารหัสรายการ"
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
        date: "18/05/2565, 10:00",
        points: "- 5000",
        totalCount: "100",
        remaining: "20",
        status: "แลกสำเร็จ",
      },
      {
        key: "2",
        idReward: "RW000002",
        name: "มานี มีเยอะ",
        date: "18/05/2565, 10:00",
        points: "- 5000",
        totalCount: "100",
        remaining: "20",
        status: "แลกสำเร็จ",
      },
      {
        key: "3",
        idReward: "RW000003",
        name: "มานี มีเยอะ",
        date: "18/05/2565, 10:00",
        points: "- 2000",
        totalCount: "100",
        remaining: "20",
        status: "กำลังดำเนินการแลก",
      },
      {
        key: "4",
        idReward: "RW000004",
        name: "มานี มีเยอะ",
        date: "18/05/2565, 10:00",
        points: "- 2000",
        totalCount: "100",
        remaining: "20",
        status: "ยังไม่ได้แลก",
      },
    ];
    const columns = [
      {
        title: "รหัสรายการ",
        dataIndex: "idReward",
        key: "idReward",
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
        title: "ชื่อนักบินโดรน",
        dataIndex: "name",
        key: "name",
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
        title: "วันที่อัพเดต",
        dataIndex: "date",
        key: "date",
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
                {row.status === "ยังไม่ได้แลก" && (
                  <span style={{ color: color.Disable }}>
                    <Badge color={color.Disable} style={{ right: 5 }} />
                    {row.status}
                  </span>
                )}
              </>
            ),
          };
        },
      },
      {
        title: "",
        dataIndex: "Action",
        key: "Action",
        render: (value: any, row: any, index: number) => {
          return {
            children: (
              <div
                className="d-flex flex-row"
                style={{ justifyContent: "center" }}
              >
                {row.status === "แลกสำเร็จ" && (
                  <div className="col-lg-4">
                    <ActionButton
                      icon={<FileTextOutlined />}
                      color={color.primary1}
                      onClick={() =>
                        (window.location.href = "/EditRedeemHistoryPage")
                      }
                    />
                  </div>
                )}
                {row.status === "กำลังดำเนินการแลก" && (
                  <div className="col-lg-4">
                    <ActionButton
                      icon={<EditOutlined />}
                      color={color.primary1}
                      onClick={() =>
                        (window.location.href = "/EditRedeemHistoryPage")
                      }
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
        {PageTitle}
        <br />
        <Table columns={columns} dataSource={data} pagination={false} />
  
        <div className="d-flex justify-content-between pt-5">
          <p>รายการทั้งหมด {data.length} รายการ</p>
          <Pagination />
        </div>
      </Layouts>
    );
  }
  export default RedeemHistory;
  