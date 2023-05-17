import {
    DeleteOutlined,
    DownOutlined,
    EditOutlined,
    FileSearchOutlined,
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
  import { CheckboxValueType } from "antd/lib/checkbox/Group";
import { color } from "../../../resource";
import { numberWithCommas } from "../../../utilities/TextFormatter";
import ActionButton from "../../../components/button/ActionButton";
import Layouts from "../../../components/layout/Layout";
  
  function IndexReward() {
    const { RangePicker } = DatePicker;
    const dateFormat = "DD/MM/YYYY";
    const timeFormat = "HH:mm";
  
    const [visible, setVisible] = useState(false);
    const [visibleStatus, setVisibleStatus] = useState(false);
    const handleVisible = (newVisible: any) => {
      setVisible(newVisible);
    };
    const handleVisibleStatus = (newVisible: any) => {
      setVisibleStatus(newVisible);
    };
  
    const [checkedList, setCheckedList] = useState<CheckboxValueType[]>();
    const [checkedListDone, setCheckedListDone] = useState<CheckboxValueType[]>();
  
    const [indeterminate, setIndeterminate] = useState(false);
    const [indeterminateDone, setIndeterminateDone] = useState(false);
  
    const [checkAll, setCheckAll] = useState(false);
    const [checkAllType, setCheckAllType] = useState(false);
    const [statusArr, setStatusArr] = useState<string[]>([]);
    const statusOptions = ["WAIT_START", "IN_PROGRESS", "WAIT_RECEIVE"];
    const statusDoneOptions = ["WAIT_PAYMENT", "DONE_PAYMENT", "SUCCESS"];
  
    const onCheckAllChange = (e: any) => {
      let value = e.target.value;
      let checked = e.target.checked;
      let arr: any = 0;
      if (checked === true) {
        arr = [...statusArr, value];
        setStatusArr([...statusArr, value]);
      } else {
        let d: string[] = statusArr.filter((x) => x != value);
        arr = [...d];
        setStatusArr(d);
        if (d.length == 0) {
          arr = undefined;
        }
      }
      setCheckedList(e.target.checked ? statusOptions : []);
      setIndeterminate(false);
      setCheckAll(e.target.checked);
    };
    const onChange = (list: CheckboxValueType[]) => {
      let arr: any = 0;
      arr = [...list];
      setCheckedList(list);
      setIndeterminate(!!list.length && list.length < statusOptions.length);
      setCheckAll(list.length === statusOptions.length);
    };
    const onCheckAllTypeChange = (e: any) => {
      let value = e.target.value;
      let checked = e.target.checked;
      let arr: any = 0;
      if (checked === true) {
        arr = [...statusArr, value];
        setStatusArr([...statusArr, value]);
      } else {
        let d: string[] = statusArr.filter((x) => x != value);
        arr = [...d];
        setStatusArr(d);
        if (d.length == 0) {
          arr = undefined;
        }
      }
      setCheckedListDone(e.target.checked ? statusDoneOptions : []);
      setIndeterminateDone(false);
      setCheckAllType(e.target.checked);
    };
    const onChangeType = (list: CheckboxValueType[]) => {
      let arr: any = 0;
      arr = [...list];
      setCheckedListDone(list);
      setIndeterminateDone(
        !!list.length && list.length < statusDoneOptions.length
      );
      setCheckAllType(list.length === statusOptions.length);
    };
  
    const onChangeStatus = (checkedValues: CheckboxValueType[]) => {
      console.log("checked = ", checkedValues);
    };
    const SubStatusType = (
      <Menu
        items={[
          {
            label: (
              <>
                <Checkbox
                  indeterminate={indeterminateDone}
                  onChange={onCheckAllTypeChange}
                  checked={checkAllType}
                  value="DONE"
                >
                  Physical
                </Checkbox>
                <br />
                <Checkbox.Group
                  value={checkedListDone}
                  style={{ width: "100%" }}
                  onChange={onChangeType}
                >
                  <Row>
                    <Checkbox
                      style={{
                        marginLeft: "20px",
                        paddingTop: 3,
                        paddingBottom: 3,
                      }}
                      value="WAIT_PAYMENT"
                    >
                      ใช้คะแนน
                    </Checkbox>
                  </Row>
                  <Row>
                    <Checkbox
                      style={{
                        marginLeft: "20px",
                        paddingTop: 3,
                        paddingBottom: 3,
                      }}
                      value="DONE_PAYMENT"
                    >
                      ภารกิจ
                    </Checkbox>
                  </Row>
                </Checkbox.Group>
              </>
            ),
            key: "1",
          },
          {
            label: (
              <>
                <Checkbox
                  indeterminate={indeterminate}
                  onChange={onCheckAllChange}
                  checked={checkAll}
                  value="CANCELED"
                >
                  Digital
                </Checkbox>
                <br />
                <Checkbox.Group
                  value={checkedList}
                  style={{ width: "100%" }}
                  onChange={onChange}
                >
                  <Row>
                    <Checkbox
                      style={{
                        marginLeft: "20px",
                        paddingTop: 3,
                        paddingBottom: 3,
                      }}
                      value="WAIT_START"
                    >
                      ใช้คะแนน
                    </Checkbox>
                  </Row>
                  <Row>
                    <Checkbox
                      style={{
                        marginLeft: "20px",
                        paddingTop: 3,
                        paddingBottom: 3,
                      }}
                      value="IN_PROGRESS"
                    >
                      ภารกิจ
                    </Checkbox>
                  </Row>
                </Checkbox.Group>
              </>
            ),
            key: "2",
          },
        ]}
      />
    );
    const SubStatus = (
      <Menu
        items={[
          {
            label: (
              <>
                <Checkbox.Group onChange={onChangeStatus}>
                  <Checkbox value="ALL">ทั้งหมด</Checkbox>
                  <br />
                  <Checkbox value="ACTIVE">ใช้งาน</Checkbox>
                  <br />
                  <Checkbox value="INAVTIVE">ปิดการใช้งาน</Checkbox>
                </Checkbox.Group>
              </>
            ),
            key: "status",
          },
        ]}
      />
    );
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
    const PageTitle = (
      <>
        <div
          className="container d-flex justify-content-between"
          style={{ padding: "8px" }}
        >
          <div className="col-lg-7 p-1">
            <span
              className="card-label font-weight-bolder text-dark"
              style={{
                fontSize: 22,
                fontWeight: "bold",
                padding: "8px",
              }}
            >
              <strong>ของรางวัลนักบินโดรน</strong>
            </span>
          </div>
          <div className="col-lg">
            <RangePicker
              allowClear
              // onCalendarChange={SearchDate}
              format={dateFormat}
            />
          </div>
          <div>
            <Button
              style={{
                width: 170,
                borderColor: color.Success,
                borderRadius: "5px",
                color: color.secondary2,
                backgroundColor: color.Success,
              }}
              onClick={() => (window.location.href = "/AddReward")}
            >
              + เพิ่มของรางวัล
            </Button>
          </div>
        </div>
        <div
          className="container d-flex justify-content-between"
          style={{ padding: "8px" }}
        >
          <div className="col-lg-6 p-1">
            <Input
              allowClear
              prefix={<SearchOutlined style={{ color: color.Disable }} />}
              placeholder="ค้นหาชื่อของรางวัล/รหัสของรางวัล"
              className="col-lg-12 p-1"
              // onChange={changeTextSearch}
            />
          </div>
          <div className="col-lg p-1">
            <Dropdown
              overlay={SubStatusType}
              trigger={["click"]}
              className="col-lg-12 "
              onVisibleChange={handleVisible}
              visible={visible}
            >
              <Button style={{ color: color.Disable }}>
                เลือกประเภท
                <DownOutlined />
              </Button>
            </Dropdown>
          </div>
          <div className="col-lg p-1">
            <Dropdown
              overlay={SubStatus}
              trigger={["click"]}
              className="col-lg-12 "
              onVisibleChange={handleVisibleStatus}
              visible={visibleStatus}
            >
              <Button style={{ color: color.Disable }}>
                เลือกสะถานะ
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
        date: "18/05/2565, 10:00",
        name: "บัตรเติมน้ำมัน 500 บาท",
        type: "Physical",
        points: "5000 คะแนน",
        totalCount: "100",
        remaining: "20",
        status: "ใช้งาน",
      },
      {
        key: "2",
        date: "18/05/2565, 10:00",
        name: "บัตรเติมน้ำมัน 250 บาท",
        type: "Digital",
        points: "5000 คะแนน",
        totalCount: "100",
        remaining: "20",
        status: "ไม่ใช้งาน",
      },
    ];
    const columns = [
      {
        title: "วันที่อัพเดต",
        dataIndex: "date",
        key: "date",
        render: (value: any, row: any, index: number) => {
          return {
            children: (
              <>
                <span className="text-dark-75  d-block font-size-lg">
                  {moment(new Date()).format(dateFormat)},{" "}
                  {moment(new Date()).format(timeFormat)}
                </span>
                <span style={{ color: color.Grey, fontSize: "12px" }}>
                  <UserOutlined
                    style={{ padding: "0 4px 0 0", verticalAlign: 2 }}
                  />
                  {`ICONKASET (ADMIN)`}
                </span>
              </>
            ),
          };
        },
      },
      {
        title: "ชื่อของรางวัล",
        dataIndex: "name",
        key: "name",
        render: (value: any, row: any, index: number) => {
          return {
            children: (
              <>
                <Row>
                  <Col>
                    <Image
                      src="https://filebroker-cdn.lazada.co.th/kf/S06372da13adc45c1b23a475d44d8a49bD.jpg"
                      preview={false}
                      style={{ width: 50, height: 50 }}
                    />
                  </Col>
                  <Col style={{ padding: 10 }}>
                    <span className="text-dark-75  d-block font-size-lg">
                      {row.name !== null ? row.name : null}
                    </span>
                    <span style={{ color: color.Grey, fontSize: "12px" }}>
                      {"RW0000001"}
                    </span>
                  </Col>
                </Row>
              </>
            ),
          };
        },
      },
      {
        title: "ประเภทของรางวัล",
        dataIndex: "type",
        key: "type",
        render: (value: any, row: any, index: number) => {
          return {
            children: (
              <>
                <span className="text-dark-75  d-block font-size-lg">
                  {row.type}
                  {row.type === "Digital" ? (
                    <span style={{ color: color.secondary1, fontSize: "12px" }}>
                      {` (ใช้คะแนน)`}
                    </span>
                  ) : (
                    <span style={{ color: color.Success, fontSize: "12px" }}>
                      {` (ภารกิจ)`}
                    </span>
                  )}
                </span>
              </>
            ),
          };
        },
      },
      {
        title: "คะแนนที่ใช้แลก",
        dataIndex: "points",
        key: "points",
        render: (value: any, row: any, index: number) => {
          return {
            children: (
              <>
                <span className="text-dark-75  d-block font-size-lg">
                  {numberWithCommas(row.points)}
                </span>
              </>
            ),
          };
        },
      },
      {
        title: "จำนวนทั้งหมด",
        dataIndex: "totalCount",
        key: "totalCount",
        render: (value: any, row: any, index: number) => {
          return {
            children: (
              <>
                <span className="text-dark-75  d-block font-size-lg">
                  {row.totalCount}
                </span>
              </>
            ),
          };
        },
      },
  
      {
        title: "จำนวนที่เหลือ",
        dataIndex: "remaining",
        key: "remaining",
        render: (value: any, row: any, index: number) => {
          return {
            children: (
              <>
                <span className="text-dark-75  d-block font-size-lg">
                  {row.remaining}
                </span>
              </>
            ),
          };
        },
      },
      {
        title: "สถานะ",
        dataIndex: "status",
        key: "status",
        render: (value: any, row: any, index: number) => {
          return {
            children: (
              <>
                {row.status === "ใช้งาน" ? (
                  <span style={{ color: color.Success }}>
                    <Badge color={color.Success} style={{ right: 5 }} />
                    {row.status}
                  </span>
                ) : (
                  <span style={{ color: color.Error }}>
                    <Badge color={color.Error} style={{ right: 5 }} />
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
                <div className="col-lg-4">
                  <ActionButton
                    icon={<FileSearchOutlined />}
                    color={color.primary1}
                    onClick={() => (window.location.href = "/RedeemHistory")}
                  />
                </div>
                <div className="col-lg-4">
                  <ActionButton
                    icon={<EditOutlined />}
                    color={color.primary1}
                    onClick={() => (window.location.href = "/EditReward")}
                  />
                </div>
  
                <div>
                  <ActionButton
                    icon={<DeleteOutlined />}
                    color={color.Error}
                    onClick={() => removeReward()}
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
  export default IndexReward;
  