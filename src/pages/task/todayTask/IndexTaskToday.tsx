import {
  DownOutlined,
  EditOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Badge,
  Button,
  Card,
  Checkbox,
  Dropdown,
  Grid,
  Input,
  Menu,
  Pagination,
  Row,
  Select,
  Table,
} from "antd";
import Search from "antd/lib/input/Search";
import moment from "moment";
import React, { useEffect, useState } from "react";
import ActionButton from "../../../components/button/ActionButton";
import { CardContainer } from "../../../components/card/CardContainer";
import { CardHeader } from "../../../components/header/CardHearder";
import Layouts from "../../../components/layout/Layout";
import ModalMapPlot from "../../../components/modal/task/finishTask/ModalMapPlot";
import { LocationDatasource } from "../../../datasource/LocationDatasource";
import { TaskInprogressDatasource } from "../../../datasource/TaskInprogressDatasource";
import { STATUS_COLOR } from "../../../definitions/DronerStatus";
import {
  STATUS_COLOR_TASK_TODAY,
  TASK_TODAY_STATUS,
} from "../../../definitions/Status";
import {
  DistrictEntity,
  ProviceEntity,
  SubdistrictEntity,
} from "../../../entities/LocationEntities";
import { TaskTodayListEntity } from "../../../entities/TaskInprogressEntities";
import color from "../../../resource/color";
import { formatDate } from "../../../utilities/TextFormatter";

export default function IndexTodayTask() {
  const row = 10;
  const [current, setCurrent] = useState(1);
  const [data, setData] = useState<TaskTodayListEntity>();
  const [searchText, setSearchText] = useState<string>();
  const [searchProvince, setSearchProvince] = useState<any>();
  const [searchDistrict, setSearchDistrict] = useState<any>();
  const [searchSubdistrict, setSearchSubdistrict] = useState<any>();
  const [searchStatus, setSearchStatus] = useState<any>();
  const [isProblem, setIsProblem] = useState<boolean>();
  const [isDelay, setIsDelay] = useState<boolean>();
  const [statusDelay, setStatusDelay] = useState<any>();
  const [province, setProvince] = useState<ProviceEntity[]>();
  const [district, setDistrict] = useState<DistrictEntity[]>();
  const [subdistrict, setSubdistrict] = useState<SubdistrictEntity[]>();
  const [visibleRating, setVisibleRating] = useState(false);
  const [showModalMap, setShowModalMap] = useState<boolean>(false);
  const [plotId, setPlotId] = useState<string>("");
  const dateFormat = "DD/MM/YYYY";
  const timeFormat = "HH:mm";
  useEffect(() => {
    fetchAllTaskToday();
    fetchProvince();
  }, [current, row]);

  const fetchAllTaskToday = async (
    proId?: number,
    disId?: number,
    subDisId?: number,
    text?: string
  ) => {
    await TaskInprogressDatasource.getAllTaskToday(
      current,
      row,
      searchStatus,
      proId,
      disId,
      subDisId,
      isProblem,
      isDelay,
      statusDelay,
      text
    ).then((res: TaskTodayListEntity) => {
      console.log(res);
      setData(res);
    });
  };

  const fetchProvince = async () => {
    await LocationDatasource.getProvince().then((res) => {
      setProvince(res);
    });
  };
  const fetchDistrict = async (provinceId: number) => {
    await LocationDatasource.getDistrict(provinceId).then((res) => {
      setDistrict(res);
    });
  };
  const fetchSubdistrict = async (districtId: number) => {
    await LocationDatasource.getSubdistrict(districtId).then((res) => {
      setSubdistrict(res);
    });
  };
  const changeTextSearch = (searchText: any) => {
    setSearchText(searchText.target.value);
    setCurrent(1);
  };
  const onChangePage = (page: any) => {
    setCurrent(page);
  };
  const handleProvince = (provinceId: number) => {
    setSearchProvince(provinceId);
    fetchDistrict(provinceId);
    setCurrent(1);
  };
  const handleDistrict = (districtId: number) => {
    fetchSubdistrict(districtId);
    setSearchDistrict(districtId);
    setCurrent(1);
  };
  const handleSubDistrict = (subdistrictId: any) => {
    setSearchSubdistrict(subdistrictId);
    setCurrent(1);
  };
  const handleStatus = (searchStatus: any) => {
    setSearchStatus(searchStatus);
    setCurrent(1);
  };

  const sorter = (a: any, b: any) => {
    if (a === b) return 0;
    else if (a === null) return 1;
    else if (b === null) return -1;
    else return a.localeCompare(b);
  };
  const formatCurrency = (e: any) => {
    e = parseFloat(e);
    return e.toFixed(2).replace(/./g, function (c: any, i: any, a: any) {
      return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
    });
  };
  const handleModalMap = (plotId: string) => {
    setShowModalMap((prev) => !prev);
    setPlotId(plotId);
  };

  const handleVisibleRating = (newVisible: any) => {
    setVisibleRating(newVisible);
  };
  const status = (
    <Menu
      items={[
        {
          label: "รอเริ่มงาน",
          key: "1",
          icon: (
            <Checkbox
              value={"WAIT_START"}
              onClick={(e) => handleStatus(e)}
            ></Checkbox>
          ),
        },
        {
          label: "กำลังดำเนินงาน",
          key: "2",
          icon: (
            <Checkbox
              value={"IN_PROGRESS"}
              onClick={(e) => handleStatus(e)}
            ></Checkbox>
          ),
        },
      ]}
    />
  );
  const PageTitle = (
    <>
      <div
        className="container d-flex justify-content-between"
        style={{ padding: "8px" }}
      >
        <div className="col-lg-4 p-1" style={{ maxWidth: "1200px" }}>
          <Input
            prefix={<SearchOutlined style={{color: color.Disable}}/>}
            placeholder="ค้นหาชื่อนักบินโดรน หรือเบอร์โทร"
            className="col-lg-12 p-1"
            onChange={changeTextSearch}
          />
        </div>
        <div className="col-lg">
          <Select
            allowClear
            className="col-lg-12 p-1"
            placeholder="เลือกจังหวัด"
            onChange={handleProvince}
            showSearch
            optionFilterProp="children"
            filterOption={(input: any, option: any) =>
              option.children.includes(input)
            }
            filterSort={(optionA, optionB) =>
              optionA.children
                .toLowerCase()
                .localeCompare(optionB.children.toLowerCase())
            }
          >
            {province?.map((item) => (
              <option value={item.provinceId.toString()}>
                {item.provinceName}
              </option>
            ))}
          </Select>
        </div>
        <div className="col-lg">
          <Select
            allowClear
            className="col-lg-12 p-1"
            placeholder="เลือกอำเภอ"
            onChange={handleDistrict}
            showSearch
            optionFilterProp="children"
            filterOption={(input: any, option: any) =>
              option.children.includes(input)
            }
            filterSort={(optionA, optionB) =>
              optionA.children
                .toLowerCase()
                .localeCompare(optionB.children.toLowerCase())
            }
            disabled={searchProvince == undefined}
          >
            {district?.map((item) => (
              <option value={item.districtId.toString()}>
                {item.districtName}
              </option>
            ))}
          </Select>
        </div>
        <div className="col-lg">
          <Select
            allowClear
            className="col-lg-12 p-1"
            placeholder="เลือกตำบล"
            onChange={handleSubDistrict}
            showSearch
            optionFilterProp="children"
            filterOption={(input: any, option: any) =>
              option.children.includes(input)
            }
            filterSort={(optionA, optionB) =>
              optionA.children
                .toLowerCase()
                .localeCompare(optionB.children.toLowerCase())
            }
            disabled={searchDistrict == undefined}
          >
            {subdistrict?.map((item) => (
              <option value={item.subdistrictId.toString()}>
                {item.subdistrictName}
              </option>
            ))}
          </Select>
        </div>
        <div className="col-lg-2 p-1">
          <Dropdown
            overlay={status}
            trigger={["click"]}
            className="col-lg-12"
            onVisibleChange={handleVisibleRating}
            visible={visibleRating}
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
            onClick={() =>
              fetchAllTaskToday(
                searchSubdistrict,
                searchDistrict,
                searchProvince,
                searchText
              )
            }
          >
            ค้นหาข้อมูล
          </Button>
        </div>
      </div>
    </>
  );
  const columns = [
    {
      title: "วัน/เวลา นัดหมาย",
      dataIndex: "dateAppointment",
      key: "dateAppointment",
      sorter: (a: any, b: any) => sorter(a.dateAppointment, b.dateAppointment),
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span>
                {moment(new Date(row.dateAppointment)).format(dateFormat)},{" "}
                {moment(new Date(row.dateAppointment)).format(timeFormat)}
              </span>
              <br />
              <span style={{ color: color.Disable, fontSize: "12px" }}>
                {row.taskNo}
              </span>
            </>
          ),
        };
      },
    },
    {
      title: "ชื่อนักบินโดรน",
      dataIndex: "droner",
      key: "droner",
      sorter: (a: any, b: any) =>
        sorter(a.droner.firstname, b.droner.firstname),
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span>{row.droner.firstname + " " + row.droner.lastname}</span>
              <br />
              <span style={{ color: color.Disable, fontSize: "12px" }}>
                {row.droner.telephoneNo}
              </span>
            </>
          ),
        };
      },
    },
    {
      title: "ชื่อเกษตรกร",
      dataIndex: "farmer",
      key: "farmer",
      sorter: (a: any, b: any) =>
        sorter(a.farmer.firstname, b.farmer.firstname),
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span>{row.farmer.firstname + " " + row.farmer.lastname}</span>
              <br />
              <span style={{ color: color.Disable, fontSize: "12px" }}>
                {row.farmer.telephoneNo}
              </span>
            </>
          ),
        };
      },
    },
    {
      title: "พื้นที่แปลงเกษตร",
      dataIndex: "plotArea",
      key: "plotArea",
      render: (value: any, row: any, index: number) => {
        const subdistrict = row.farmerPlot.plotArea;
        const district = row.farmerPlot.plotArea;
        const province = row.farmerPlot.plotArea;
        return {
          children: (
            <>
              <span className="text-dark-75  d-block font-size-lg">
                {subdistrict != null ? subdistrict.subdistrictName + "/" : null}
                {district != null ? district.districtName + "/" : null}
                {province != null ? province.provinceName + "/" : null}
              </span>
              <a
                onClick={() => handleModalMap(row.farmerPlotId)}
                style={{ color: color.primary1 }}
              >
                ดูแผนที่แปลง
              </a>
            </>
          ),
        };
      },
    },

    {
      title: "ค่าบริการ",
      dataIndex: "totalPrice",
      key: "totalPrice",
      sorter: (a: any, b: any) => sorter(a.totalPrice, b.totalPrice),
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span>
                {row.totalPrice != null
                  ? formatCurrency(row.totalPrice) + " " + "บาท"
                  : "0.00" + " " + "บาท"}
              </span>
              <br />
              <span style={{ color: color.Disable, fontSize: "12px" }}>
                {"จำนวน" + " " + row.farmAreaAmount + " " + "ไร่"}
              </span>
            </>
          ),
        };
      },
    },
    {
      title: "สถานะ ",
      dataIndex: "status",
      key: "status",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span style={{ color: STATUS_COLOR_TASK_TODAY[row.status] }}>
                <Badge color={STATUS_COLOR_TASK_TODAY[row.status]} />
                {TASK_TODAY_STATUS[row.status]}
                <br />
              </span>
              <span style={{ color: color.Disable, fontSize: "12px" }}>
                <UserOutlined style={{ padding: "0 4px 0 0" }} />
                {row.createBy}
              </span>
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
            <div className="d-flex flex-row justify-content-between">
              <ActionButton
                icon={<EditOutlined />}
                color={color.primary1}
                onClick={() =>
                  (window.location.href = "/WaitStartNormal?=" + row.id)
                }
              />
            </div>
          ),
        };
      },
    },
  ];

  return (
    <Layouts>
      <span
        className="container"
        style={{ fontSize: 22, fontWeight: "bold", padding: "8px" }}
      >
        <strong>งานในวันนี้</strong>{" "}
        {"(" + moment(new Date()).format(dateFormat) + ")"}
      </span>
      <div
        className="d-flex justify-content-between"
        style={{ marginTop: "20px" }}
      >
        <CardContainer
          style={{
            width: "35%",
            padding: "20px",
            marginRight: "20px",
            borderRadius: "5px",
          }}
        >
          <p>รอเริ่มงาน</p>
          <div className="d-flex justify-content-between">
            <CardContainer
              style={{
                backgroundColor: "#A9CB62",
                borderRadius: "5px",
                padding: "20px",
                width: "47%",
              }}
            >
              <div
                className="d-flex justify-content-between"
                style={{ color: color.White }}
              >
                <strong>ปกติ</strong>
                <strong>
                  {data?.summary != undefined
                    ? data?.summary.waitstartnormal
                    : null}
                </strong>
              </div>
            </CardContainer>
            <CardContainer
              style={{
                backgroundColor: "#EB5757",
                borderRadius: "5px",
                padding: "20px",
                width: "47%",
              }}
            >
              <div
                className="d-flex justify-content-between"
                style={{ color: color.White }}
              >
                <strong>งานมีปัญหา</strong>
                <strong>
                  {data?.summary != undefined
                    ? data?.summary.waitstartproblem
                    : null}
                </strong>
              </div>
            </CardContainer>
          </div>
        </CardContainer>
        <CardContainer
          style={{ width: "80%", padding: "20px", borderRadius: "5px" }}
        >
          <p>กำลังดำเนินงาน</p>
          <div className="d-flex justify-content-between">
            <CardContainer
              style={{
                backgroundColor: "#219653",
                borderRadius: "5px",
                padding: "20px",
                width: "23%",
              }}
            >
              <div
                className="d-flex justify-content-between"
                style={{ color: color.White }}
              >
                <strong>ปกติ</strong>
                <strong>
                  {data?.summary != undefined
                    ? data?.summary.inprogressnormal
                    : null}
                </strong>
              </div>
            </CardContainer>
            <CardContainer
              style={{
                backgroundColor: "#2F80ED",
                borderRadius: "5px",
                padding: "20px",
                width: "23%",
              }}
            >
              <div
                className="d-flex justify-content-between"
                style={{ color: color.White }}
              >
                <strong>รออนุมัติขยายเวลา</strong>
                <strong>
                  {data?.summary != undefined
                    ? data?.summary.waitapprovedelay
                    : null}
                </strong>
              </div>
            </CardContainer>
            <CardContainer
              style={{
                backgroundColor: "#56CCF2",
                borderRadius: "5px",
                padding: "20px",
                width: "23%",
              }}
            >
              <div
                className="d-flex justify-content-between"
                style={{ color: color.White }}
              >
                <strong>อนุมัติขยายเวลา</strong>
                <strong>
                  {data?.summary != undefined ? data?.summary.extended : null}
                </strong>
              </div>
            </CardContainer>
            <CardContainer
              style={{
                backgroundColor: "#EB5757",
                borderRadius: "5px",
                padding: "20px",
                width: "23%",
              }}
            >
              <div
                className="d-flex justify-content-between"
                style={{ color: color.White }}
              >
                <strong>งานมีปัญหา</strong>
                <strong>
                  {data?.summary != undefined
                    ? data?.summary.inprogressproblem
                    : null}
                </strong>
              </div>
            </CardContainer>
          </div>
        </CardContainer>
      </div>
      <br />
      {PageTitle}
      <br />
      <Table columns={columns} dataSource={data?.data} pagination={false} />
      <div className="d-flex justify-content-between pt-5">
        <p>รายการทั้งหมด {data?.count} รายการ</p>
        <Pagination
          current={current}
          total={data?.count}
          onChange={onChangePage}
          pageSize={row}
          showSizeChanger={false}
        />
      </div>
      {showModalMap && (
        <ModalMapPlot
          show={showModalMap}
          backButton={() => setShowModalMap((prev) => !prev)}
          title="แผนที่แปลงเกษตร"
          plotId={plotId}
        />
      )}
    </Layouts>
  );
}
