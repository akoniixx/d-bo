import {
  ClockCircleFilled,
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
  Form,
  Grid,
  Input,
  Menu,
  Pagination,
  Radio,
  Row,
  Select,
  Table,
  Tooltip,
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
  STATUS_IS_PROBLEM,
  TASKTODAY_STATUS,
  TASK_TODAY_STATUS,
} from "../../../definitions/Status";
import {
  DistrictEntity,
  ProviceEntity,
  SubdistrictEntity,
} from "../../../entities/LocationEntities";
import {
  summaryEntity,
  TaskTodayListEntity,
} from "../../../entities/TaskInprogressEntities";
import color from "../../../resource/color";
import icon from "../../../resource/icon";
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
  const [statusArr, setStatusArr] = useState<string[]>([]);
  const dateFormat = "DD/MM/YYYY";
  const timeFormat = "HH:mm";
  const [problems, setProblems] = useState<any>([]);
  useEffect(() => {
    fetchAllTaskToday();
    fetchProvince();
  }, [current]);
  const fetchAllTaskToday = async () => {
    await TaskInprogressDatasource.getAllTaskToday(
      searchStatus,
      current,
      row,
      searchText,
      statusDelay,
      searchSubdistrict,
      searchDistrict,
      searchProvince,
      isProblem,
      isDelay
    ).then((res: TaskTodayListEntity) => {
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
  const handleStatus = (e: any) => {
    let value = e.target.value;
    let checked = e.target.checked;
    let arr: any = 0;
    if (checked) {
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
    setSearchStatus(arr);
    setCurrent(1);
  };
  const handleIsProblem = (e: any) => {
    let value = e.target.value;
    let checked = e.target.checked;
    let statusProblem = ["waitstartproblem", "inprogressproblem"];
    let statusNormal = ["waitstartnormal", "inprogressnormal"];
    let m: any = [];
    if (checked) {
      m = [...problems, value];
      setProblems(m);
      if (m.length == 2) {
        setIsProblem(undefined);
      } else {
        if (statusProblem.includes(m[0])) {
          setIsProblem(true);
        } else if (statusNormal.includes(m[0])) {
          setIsProblem(false);
        }
      }
    } else {
      m = problems.filter((x: any) => x != value);
      setProblems(m);
      if (m.length == 0) {
        setIsProblem(undefined);
      } else {
        if (m == "waitstartproblem" || m == "inprogressproblem") {
          setIsProblem(true);
        } else {
          setIsProblem(false);
        }
      }
    }
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
              value="WAIT_START"
              onClick={(e) => handleStatus(e)}
            ></Checkbox>
          ),
        },
        {
          label: "งานปกติ",
          key: "2",
          icon: (
            <Checkbox
              style={{ marginLeft: "20px" }}
              value="waitstartnormal"
              onClick={(e) => handleIsProblem(e)}
            ></Checkbox>
          ),
        },
        {
          label: "งานมีปัญหา",
          key: "3",
          icon: (
            <Checkbox
              style={{ marginLeft: "20px" }}
              value="waitstartproblem"
              onClick={(e) => handleIsProblem(e)}
            ></Checkbox>
          ),
        },
        {
          label: "กำลังดำเนินงาน",
          key: "4",
          icon: (
            <Checkbox
              value="IN_PROGRESS"
              onClick={(e) => handleStatus(e)}
            ></Checkbox>
          ),
        },
        {
          label: "ปกติ",
          key: "5",
          icon: (
            <Checkbox
              style={{ marginLeft: "20px" }}
              value="inprogressnormal"
              onClick={(e) => handleIsProblem(e)}
            ></Checkbox>
          ),
        },
        {
          label: "รออนุมัติขยายเวลา",
          key: "6",
          icon: (
            <Checkbox
              disabled
              style={{ marginLeft: "20px" }}
              value="waitapprovedelay"
              onClick={(e) => handleIsProblem(e)}
            ></Checkbox>
          ),
        },
        {
          label: "ขยายเวลา",
          key: "7",
          icon: (
            <Checkbox
              disabled
              style={{ marginLeft: "20px" }}
              value="extended"
              onClick={(e) => handleIsProblem(e)}
            ></Checkbox>
          ),
        },
        {
          label: "งานมีปัญหา",
          key: "8",
          icon: (
            <Checkbox
              style={{ marginLeft: "20px" }}
              value="inprogressproblem"
              onClick={(e) => handleIsProblem(e)}
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
            allowClear
            prefix={<SearchOutlined style={{ color: color.Disable }} />}
            placeholder="ค้นหาชื่อเกษตรกร, คนบินโดรน หรือเบอร์โทร"
            className="col-lg-12 p-1"
            onChange={changeTextSearch}
          />
        </div>
        <div className="col-lg">
          <Select
            allowClear
            className="col-lg-12 p-1"
            placeholder="เลือกจังหวัด"
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
            onChange={handleProvince}
          >
            {province?.map((item) => (
              <option value={item.provinceId}>{item.provinceName}</option>
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
            onClick={fetchAllTaskToday}
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
      dataIndex: "task_date_appointment",
      key: "task_date_appointment",
      sorter: (a: any, b: any) =>
        sorter(a.task_date_appointment, b.task_date_appointment),
      render: (value: any, row: any, index: number) => {
        const changeTime = row.count_change_appointment;
        return {
          children: (
            <>
              <span>
                {moment(new Date(row.task_date_appointment)).format(dateFormat)}
                ,{" "}
                {moment(new Date(row.task_date_appointment)).format(timeFormat)}
              </span>
              {changeTime != null ? (
                <Tooltip
                  title="มีการเปลี่ยนแปลงวันและเวลานัดหมาย"
                  className="p-2"
                >
                  <img src={icon.iconChangeTime} />
                </Tooltip>
              ) : null}
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
        sorter(a.droner_firstname, b.droner_firstname),
      render: (value: any, row: any, index: number) => {
        const changeDroner = row.count_change_droner;
        return {
          children: (
            <>
              <span>{row.droner_firstname + " " + row.droner_lastname}</span>
              {changeDroner != null ? (
                <Tooltip
                  style={{ fontSize: "18px" }}
                  title="มีการเปลี่ยนแปลงนักบินโดรนคนใหม่"
                  className="p-2"
                >
                  <img src={icon.iconChangeDroner} />
                </Tooltip>
              ) : null}
              <br />
              <span style={{ color: color.Disable, fontSize: "12px" }}>
                {row.droner_telephone_no}
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
        sorter(a.farmer_firstname, b.farmer_firstname),
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span>{row.farmer_firstname + " " + row.farmer_lastname}</span>
              <br />
              <span style={{ color: color.Disable, fontSize: "12px" }}>
                {row.farmer_telephone_no}
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
        const subdistrict = row.plotArea_subdistrict_name;
        const district = row.plotArea_district_name;
        const province = row.plotArea_province_name;

        return {
          children: (
            <>
              <span className="text-dark-75  d-block font-size-lg">
                {subdistrict != null ? subdistrict + "/" : null}
                {district != null ? district + "/" : null}
                {province != null ? province + "/" : null}
              </span>
              <a
                onClick={() => handleModalMap(row.task_farmer_plot_id)}
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
      dataIndex: "task_total_price",
      key: "task_total_price",
      sorter: (a: any, b: any) =>
        sorter(a.task_total_price, b.task_total_price),
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span>
                {row.task_total_price != null
                  ? formatCurrency(row.task_total_price) + " " + "บาท"
                  : "0.00" + " " + "บาท"}
              </span>
              <br />
              <span style={{ color: color.Disable, fontSize: "12px" }}>
                {"จำนวน" + " " + row.farmerPlot_rai_amount + " " + "ไร่"}
              </span>
            </>
          ),
        };
      },
    },
    {
      title: "สถานะ ",
      dataIndex: "task_status",
      key: "task_status",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span style={{ color: STATUS_COLOR_TASK_TODAY[row.task_status] }}>
                <Badge color={STATUS_COLOR_TASK_TODAY[row.task_status]} />
                {TASK_TODAY_STATUS[row.task_status]}
                <span style={{ color: color.Error }}>
                  {row.task_is_problem == true
                    ? " " + "(" + "งานมีปัญหา" + ")"
                    : null}
                </span>
                <br />
              </span>

              <span style={{ color: color.Disable, fontSize: "12px" }}>
                <UserOutlined style={{ padding: "0 4px 0 0" }} />
                {row.task_update_by}
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
              {row.task_status == "IN_PROGRESS" ? (
                <ActionButton
                  icon={<EditOutlined />}
                  color={color.primary1}
                  onClick={() =>
                    (window.location.href = "/EditInProgress?=" + row.task_id)
                  }
                />
              ) : row.task_status == "WAIT_START" ? (
                <ActionButton
                  icon={<EditOutlined />}
                  color={color.primary1}
                  onClick={() =>
                    (window.location.href = "/EditWaitStart?=" + row.task_id)
                  }
                />
              ) : null}
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
