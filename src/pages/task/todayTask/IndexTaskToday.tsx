import {
  CaretDownOutlined,
  CaretUpOutlined,
  DownOutlined,
  EditOutlined,
  InfoCircleFilled,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Badge,
  Button,
  Checkbox,
  Divider,
  Dropdown,
  Image,
  Input,
  Menu,
  Pagination,
  PaginationProps,
  Popover,
  Select,
  Spin,
  Table,
  Tooltip,
} from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import ActionButton from "../../../components/button/ActionButton";
import { CardContainer } from "../../../components/card/CardContainer";
import { CardHeader } from "../../../components/header/CardHearder";
import ModalMapPlot from "../../../components/modal/task/finishTask/ModalMapPlot";
import InvoiceTask from "../../../components/popover/InvoiceTask";
import { LocationDatasource } from "../../../datasource/LocationDatasource";
import { TaskInprogressDatasource } from "../../../datasource/TaskInprogressDatasource";
import {
  STATUS_COLOR_TASK_TODAY,
  TASK_TODAY_STATUS,
} from "../../../definitions/Status";
import {
  DistrictEntity,
  ProviceEntity,
  SubdistrictEntity,
} from "../../../entities/LocationEntities";
import { InvoiceTaskEntity } from "../../../entities/NewTaskEntities";
import { TaskTodayListEntity } from "../../../entities/TaskInprogressEntities";
import color from "../../../resource/color";
import icon from "../../../resource/icon";
import {
  numberWithCommas,
  numberWithCommasToFixed,
} from "../../../utilities/TextFormatter";
import { DashboardLayout } from "../../../components/layout/Layout";
import { useNavigate } from "react-router-dom";
import { listAppType } from "../../../definitions/ApplicatoionTypes";
import { ListCheckHaveLine } from "../../../components/dropdownCheck/ListStatusAppType";
import { CheckboxValueType } from "antd/lib/checkbox/Group";

export default function IndexTodayTask() {
  const navigate = useNavigate();
  const [row, setRow] = useState(10);
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
  const [appTypeArr, setAppTypeArr] = useState<string[]>([]);
  const [applicationType, setApplicationType] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [problems, setProblems] = useState<any>([]);
  const [indeterminateWaitStart, setIndeterminateWaitStart] = useState(false);
  const [indeterminateInprogress, setIndeterminateInprogress] = useState(false);

  const [checkAllWaitStart, setCheckAllWaitStart] = useState(false);
  const [checkAllInprogress, setCheckAllInprogress] = useState(false);

  const [sortDirection, setSortDirection] = useState<string | undefined>();
  const [sortField, setSortField] = useState<string | undefined>();
  const [sortDirection1, setSortDirection1] = useState<string | undefined>(
    undefined
  );
  const [sortDirection2, setSortDirection2] = useState<string | undefined>(
    undefined
  );
  const [sortDirection3, setSortDirection3] = useState<string | undefined>(
    undefined
  );
  const [sortDirection4, setSortDirection4] = useState<string | undefined>(
    undefined
  );
  const [subWaitStart, setSubWaitStart] = useState<any>();
  const [subInprogress, setSubInprogress] = useState<any>();
  const statusListWaitStart = ["waitStart_normal", "waitStart_problem"];
  const statusListInprogress = [
    "inprogress_normal",
    "WAIT_APPROVE",
    "EXTENDED",
    "inprogress_problem",
  ];

  const [statusArrMain, setStatusArrMain] = useState<string[]>([]);

  const fetchAllTaskToday = async () => {
    setLoading(true);
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
      isDelay,
      applicationType,
      sortDirection,
      sortField
    )
      .then((res: TaskTodayListEntity) => {
        setData(res);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    fetchAllTaskToday();
    fetchProvince();
  }, [current, row, sortDirection]);

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

  const handleModalMap = (plotId: string) => {
    setShowModalMap((prev) => !prev);
    setPlotId(plotId);
  };

  const handleVisibleRating = (newVisible: any) => {
    setVisibleRating(newVisible);
  };
  const onSearchCreateBy = (e: any) => {
    let value = e.target.value;
    let checked = e.target.checked;
    let arr: any = 0;
    if (checked === true) {
      arr = [...appTypeArr, value];
      setAppTypeArr([...appTypeArr, value]);
      setApplicationType(value);
    } else {
      let d: string[] = appTypeArr.filter((x) => x != value);
      arr = [...d];
      setAppTypeArr(d);
      if (d.length == 0) {
        arr = undefined;
      }
    }
    setApplicationType(arr);
  };
  const onShowSizeChange: PaginationProps["onShowSizeChange"] = (
    current,
    pageSize
  ) => {
    setCurrent(current);
    setRow(pageSize);
  };
  const onChangeListWaitStart = (list: CheckboxValueType[]) => {
    let arr: any = [];
    arr = [...list];
    if (arr[0] === "waitStart_normal") {
      setIsProblem(false);
      setSearchStatus("WAIT_START");
    } else if (arr[0] === "waitStart_problem") {
      setIsProblem(true);
      setSearchStatus("WAIT_START");
    } else if (arr.length === 0) {
      setIsProblem(undefined);
      setIsDelay(undefined);
      setStatusDelay(undefined);
      setSearchStatus(undefined);
    }
    setSubWaitStart(list);
    setIndeterminateWaitStart(
      !!list.length && list.length < statusListWaitStart.length
    );
    setCheckAllWaitStart(list.length === statusListWaitStart.length);
  };
  const onChangeListInprogress = (list: CheckboxValueType[]) => {
    let arr: any = 0;
    arr = [...list];
    if (arr[0] === "inprogress_normal") {
      setIsProblem(false);
      setSearchStatus("IN_PROGRESS");
    } else if (arr[0] === "inprogress_problem") {
      setIsProblem(true);
      setSearchStatus("IN_PROGRESS");
    } else if (arr[0] === "EXTENDED") {
      setIsDelay(true);
      setStatusDelay("EXTENDED");
      setSearchStatus("IN_PROGRESS");
    } else if (arr[0] === "WAIT_APPROVE") {
      setIsDelay(false);
      setStatusDelay("WAIT_APPROVE");
      setSearchStatus("IN_PROGRESS");
    } else if (arr.length === 0) {
      setIsProblem(undefined);
      setIsDelay(undefined);
      setStatusDelay(undefined);
      setSearchStatus(undefined);
    }
    setSubInprogress(list);
    setIndeterminateInprogress(
      !!list.length && list.length < statusListInprogress.length
    );
    setCheckAllInprogress(list.length === statusListInprogress.length);
  };
  const onSearchStatus = (e: any) => {
    let value = e.target.value;
    let checked = e.target.checked;
    let arr: any = 0;
    if (checked === true) {
      arr = [...statusArrMain, value];
      setStatusArrMain([...statusArrMain, value]);
      setSearchStatus(value);
      if (value === "WAIT_START") {
        setSubWaitStart(e.target.checked ? statusListWaitStart : []);
        setIndeterminateWaitStart(false);
        setCheckAllWaitStart(e.target.checked);
      } else {
        setSubInprogress(e.target.checked ? statusListInprogress : []);
        setIndeterminateInprogress(false);
        setCheckAllInprogress(e.target.checked);
      }
    } else {
      let d: string[] = statusArrMain.filter((x) => x != value);
      arr = [...d];
      setStatusArrMain(d);
      if (d.length == 0) {
        arr = undefined;
      }
      if (value === "WAIT_START") {
        setSubWaitStart(e.target.checked ? statusListWaitStart : []);
        setIndeterminateWaitStart(false);
        setCheckAllWaitStart(e.target.checked);
      } else {
        setSubInprogress(e.target.checked ? statusListInprogress : []);
        setIndeterminateInprogress(false);
        setCheckAllInprogress(e.target.checked);
      }
    }
    setSearchStatus(arr);
  };
  const status = (
    <Menu
      items={[
        {
          label: (
            <>
              <Checkbox
                indeterminate={indeterminateWaitStart}
                onChange={onSearchStatus}
                checked={checkAllWaitStart}
                value="WAIT_START"
              >
                รอเริ่มงาน
              </Checkbox>
              <br />
              <Checkbox.Group
                value={subWaitStart}
                style={{ width: "100%" }}
                onChange={onChangeListWaitStart}
              >
                <Checkbox
                  style={{ marginLeft: "20px" }}
                  value="waitStart_normal"
                >
                  ปกติ
                </Checkbox>
                <br />
                <Checkbox
                  style={{ marginLeft: "20px" }}
                  value="waitStart_problem"
                >
                  งานมีปัญหา
                </Checkbox>
              </Checkbox.Group>
            </>
          ),
          key: "1",
        },
        {
          label: (
            <>
              <Checkbox
                indeterminate={indeterminateInprogress}
                onChange={onSearchStatus}
                checked={checkAllInprogress}
                value="IN_PROGRESS"
              >
                กำลังดำเนินงาน
              </Checkbox>
              <br />
              <Checkbox.Group
                value={subInprogress}
                style={{ width: "100%" }}
                onChange={onChangeListInprogress}
              >
                <Checkbox
                  style={{ marginLeft: "20px" }}
                  value="inprogress_normal"
                >
                  ปกติ
                </Checkbox>
                <br />
                <Checkbox style={{ marginLeft: "20px" }} value="WAIT_APPROVE">
                  รออนุมัติขยายเวลา
                </Checkbox>
                <br />
                <Checkbox style={{ marginLeft: "20px" }} value="EXTENDED">
                  ขยายเวลา
                </Checkbox>
                <br />
                <Checkbox
                  style={{ marginLeft: "20px" }}
                  value="inprogress_problem"
                >
                  งานมีปัญหา
                </Checkbox>
              </Checkbox.Group>
            </>
          ),
          key: "2",
        },
      ]}
    />
  );
  const PageTitle = (
    <>
      <div
        className="d-flex justify-content-between"
        style={{ padding: "0px" }}
      >
        <div className="col-lg-3 p-1" style={{ maxWidth: "1200px" }}>
          <Input
            allowClear
            prefix={<SearchOutlined style={{ color: color.Disable }} />}
            placeholder="ค้นหาชื่อเกษตรกร, คนบินโดรน หรือเบอร์โทร"
            className="col-lg-12"
            onChange={changeTextSearch}
          />
        </div>
        <div className="col-lg p-1">
          <Select
            allowClear
            className="col-lg-12"
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
        <div className="col-lg p-1">
          <Select
            allowClear
            className="col-lg-12"
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
        <div className="col-lg p-1">
          <Select
            allowClear
            className="col-lg-12"
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
            disabled={searchDistrict === undefined}
          >
            {subdistrict?.map((item) => (
              <option value={item.subdistrictId.toString()}>
                {item.subdistrictName}
              </option>
            ))}
          </Select>
        </div>
        <div className="col-lg p-1">
          <ListCheckHaveLine
            onSearchType={(e: any) => onSearchCreateBy(e)}
            list={applicationType}
            title="เลือกรูปแบบการสร้าง"
          />
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
      title: () => {
        return (
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            วัน/เวลานัดหมาย{" "}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
              }}
              onClick={() => {
                setSortField("task_date_appointment");
                setSortDirection((prev) => {
                  if (prev === "ASC") {
                    return "DESC";
                  } else if (prev === undefined) {
                    return "ASC";
                  } else {
                    return undefined;
                  }
                });
                setSortDirection1((prev) => {
                  if (prev === "ASC") {
                    return "DESC";
                  } else if (prev === undefined) {
                    return "ASC";
                  } else {
                    return undefined;
                  }
                });
              }}
            >
              <CaretUpOutlined
                style={{
                  position: "relative",
                  top: 2,
                  color: sortDirection1 === "ASC" ? "#ffca37" : "white",
                }}
              />
              <CaretDownOutlined
                style={{
                  position: "relative",
                  bottom: 2,
                  color: sortDirection1 === "DESC" ? "#ffca37" : "white",
                }}
              />
            </div>
          </div>
        );
      },
      dataIndex: "task_date_appointment",
      key: "task_date_appointment",
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
                  <img
                    src={icon.iconChangeTime}
                    alt="ic_change_time"
                    style={{ width: 30, height: 30 }}
                  />
                </Tooltip>
              ) : null}
              <br />
              <span style={{ color: color.Grey, fontSize: "12px" }}>
                {row.task_task_no}
              </span>
            </>
          ),
        };
      },
    },
    {
      title: () => {
        return (
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            ชื่อนักบินโดรน
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
              }}
              onClick={() => {
                setSortField("droner_firstname");
                setSortDirection((prev) => {
                  if (prev === "ASC") {
                    return "DESC";
                  } else if (prev === undefined) {
                    return "ASC";
                  } else {
                    return undefined;
                  }
                });
                setSortDirection2((prev) => {
                  if (prev === "ASC") {
                    return "DESC";
                  } else if (prev === undefined) {
                    return "ASC";
                  } else {
                    return undefined;
                  }
                });
              }}
            >
              <CaretUpOutlined
                style={{
                  position: "relative",
                  top: 2,
                  color: sortDirection2 === "ASC" ? "#ffca37" : "white",
                }}
              />
              <CaretDownOutlined
                style={{
                  position: "relative",
                  bottom: 2,
                  color: sortDirection2 === "DESC" ? "#ffca37" : "white",
                }}
              />
            </div>
          </div>
        );
      },
      dataIndex: "droner",
      key: "droner",
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
                  <img
                    src={icon.iconChangeDroner}
                    alt="ic_change_droner"
                    style={{ width: 30, height: 30 }}
                  />
                </Tooltip>
              ) : null}
              <br />
              <span style={{ color: color.Grey, fontSize: "12px" }}>
                {row.droner_telephone_no}
              </span>
            </>
          ),
        };
      },
    },

    {
      title: () => {
        return (
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            ชื่อเกษตรกร
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
              }}
              onClick={() => {
                setSortField("farmer_firstname");
                setSortDirection((prev) => {
                  if (prev === "ASC") {
                    return "DESC";
                  } else if (prev === undefined) {
                    return "ASC";
                  } else {
                    return undefined;
                  }
                });
                setSortDirection3((prev) => {
                  if (prev === "ASC") {
                    return "DESC";
                  } else if (prev === undefined) {
                    return "ASC";
                  } else {
                    return undefined;
                  }
                });
              }}
            >
              <CaretUpOutlined
                style={{
                  position: "relative",
                  top: 2,
                  color: sortDirection3 === "ASC" ? "#ffca37" : "white",
                }}
              />
              <CaretDownOutlined
                style={{
                  position: "relative",
                  bottom: 2,
                  color: sortDirection3 === "DESC" ? "#ffca37" : "white",
                }}
              />
            </div>
          </div>
        );
      },
      dataIndex: "farmer",
      key: "farmer",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span>{row.farmer_firstname + " " + row.farmer_lastname}</span>
              <br />
              <span style={{ color: color.Grey, fontSize: "12px" }}>
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
                {subdistrict !== null ? subdistrict + "/" : null}
                {district !== null ? district + "/" : null}
                {province !== null ? province + "" : null}
              </span>
              <div
                onClick={() => handleModalMap(row.task_farmer_plot_id)}
                style={{ color: color.primary1, cursor: "pointer" }}
              >
                ดูแผนที่แปลง
              </div>
            </>
          ),
        };
      },
    },
    {
      title: () => {
        return (
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            ค่าบริการ
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
              }}
              onClick={() => {
                setSortField("task_total_price");
                setSortDirection((prev) => {
                  if (prev === "ASC") {
                    return "DESC";
                  } else if (prev === undefined) {
                    return "ASC";
                  } else {
                    return undefined;
                  }
                });
                setSortDirection4((prev) => {
                  if (prev === "ASC") {
                    return "DESC";
                  } else if (prev === undefined) {
                    return "ASC";
                  } else {
                    return undefined;
                  }
                });
              }}
            >
              <CaretUpOutlined
                style={{
                  position: "relative",
                  top: 2,
                  color: sortDirection4 === "ASC" ? "#ffca37" : "white",
                }}
              />
              <CaretDownOutlined
                style={{
                  position: "relative",
                  bottom: 2,
                  color: sortDirection4 === "DESC" ? "#ffca37" : "white",
                }}
              />
            </div>
          </div>
        );
      },
      dataIndex: "task_total_price",
      key: "task_total_price",
      render: (value: any, row: any, index: number) => {
        const inv: InvoiceTaskEntity = {
          raiAmount: row.task_farm_area_amount,
          unitPrice: row.task_unit_price,
          price: row.task_price,
          fee: row.task_fee,
          discountFee: row.task_discount_fee,
          discountCoupon: row.task_discount_coupon,
          discountPromotion: row.task_discount_promotion,
          discountPoint: row.task_discount_campaign_point,
          totalPrice: row.task_total_price,
        };
        return {
          children: (
            <>
              <span>
                {row.task_total_price != null
                  ? numberWithCommas(row.task_total_price) + " บาท"
                  : "0 บาท"}
              </span>
              <InvoiceTask
                iconColor={color.Success}
                title="รายละเอียดค่าบริการ"
                data={inv}
              />
            </>
          ),
        };
      },
    },
    {
      title: "สร้างโดย",
      dataIndex: "createByWho",
      key: "createByWho",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              {listAppType.map(
                (item) =>
                  row.task_application_type === item.value && (
                    <>
                      <Image
                        src={item.icon}
                        preview={false}
                        style={{ width: 24, height: 24 }}
                      />
                      <span>
                        {" "}
                        {row.task_create_by
                          ? row.task_create_by + ` ${item.create}`
                          : "-"}
                      </span>
                    </>
                  )
              )}
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
        const extend = row.task_status_delay;
        return {
          children: (
            <>
              <span
                style={{
                  color: STATUS_COLOR_TASK_TODAY[row.task_status],
                }}
              >
                <Badge color={STATUS_COLOR_TASK_TODAY[row.task_status]} />{" "}
                {TASK_TODAY_STATUS[row.task_status]}
                <span style={{ color: color.Error }}>
                  {row.task_is_problem == true
                    ? " " + "(" + "งานมีปัญหา" + ")"
                    : null}
                </span>
                <span style={{ color: "#2F80ED" }}>
                  {row.task_status_delay == "WAIT_APPROVE"
                    ? " " + "(" + "รออนุมัติขยายเวลา" + ")"
                    : null}
                </span>
                <br />
                <span style={{ color: "#56CCF2" }}>
                  {row.task_status_delay == "EXTENDED" ||
                  row.task_status_delay == "APPROVED"
                    ? " " + "(" + "อนุมัติขยายเวลา" + ")"
                    : null}
                </span>
                {extend == "APPROVED" ? (
                  <Tooltip
                    style={{ fontSize: "18px" }}
                    title={
                      "ขยายเวลา:" +
                      " " +
                      moment(new Date(row.task_date_delay)).format(dateFormat) +
                      "," +
                      " " +
                      moment(new Date(row.task_date_delay)).format(timeFormat)
                    }
                    className="p-2"
                  >
                    <img src={icon.iconExtend} alt="ic_change_droner" />
                  </Tooltip>
                ) : null}
              </span>
              <div style={{ color: color.Grey, fontSize: "12px" }}>
                <UserOutlined
                  style={{ padding: "0 4px 0 0", verticalAlign: 0.5 }}
                />
                {row.task_update_by}
              </div>
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
                  onClick={() => navigate("/EditInProgress?=" + row.task_id)}
                />
              ) : row.task_status == "WAIT_START" ? (
                <ActionButton
                  icon={<EditOutlined />}
                  color={color.primary1}
                  onClick={() => navigate("/EditWaitStart?=" + row.task_id)}
                />
              ) : null}
            </div>
          ),
        };
      },
    },
  ];

  return (
    <>
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
          style={{
            width: "80%",
            padding: "20px",
            borderRadius: "5px",
          }}
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
      <Spin tip="กำลังโหลดข้อมูล..." size="large" spinning={loading}>
        <Table
          scroll={{ x: "max-content" }}
          columns={columns}
          dataSource={data?.data}
          pagination={false}
          rowClassName={(a) =>
            a.task_is_problem == true
              ? "table-row-older"
              : a.task_status_delay == "WAIT_APPROVE"
              ? "table-row-wait-approve"
              : a.task_status_delay == "APPROVED"
              ? "table-row-approve"
              : "table-row-lasted"
          }
        />
      </Spin>

      <div className="d-flex justify-content-between pt-3 pb-3">
        <p>รายการทั้งหมด {data?.count} รายการ</p>
        <Pagination
          current={current}
          total={data?.count}
          onChange={onChangePage}
          pageSize={row}
          showSizeChanger
          onShowSizeChange={onShowSizeChange}
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
    </>
  );
}
