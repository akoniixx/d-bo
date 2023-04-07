import React, { useState } from "react";
import {
  Badge,
  Button,
  Checkbox,
  DatePicker,
  Divider,
  Dropdown,
  Input,
  Menu,
  Pagination,
  PaginationProps,
  Popover,
  Row,
  Select,
  Table,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { ReportDocDatasource } from "../../datasource/ReportDocument";
import {
  TaskReportListEntity,
  updateStatusPays,
  updateStatusPays_INIT,
} from "../../entities/TaskFinishEntities";
import {
  DistrictEntity,
  ProviceEntity,
  SubdistrictEntity,
} from "../../entities/LocationEntities";
import { useEffect } from "react";
import Layouts from "../../components/layout/Layout";
import moment from "moment";
import color from "../../resource/color";
import { useLocalStorage } from "../../hook/useLocalStorage";
import { LocationDatasource } from "../../datasource/LocationDatasource";
import Swal from "sweetalert2";
import { UpdateStatusPaymentDatasource } from "../../datasource/UpdateStatusPaymentDatasource";
import {
  DownOutlined,
  EditOutlined,
  InfoCircleFilled,
  SearchOutlined,
  StarFilled,
  UserOutlined,
} from "@ant-design/icons";
import { CardContainer } from "../../components/card/CardContainer";
import {
  FINISH_TASK,
  STATUS_COLOR_TASK,
  TASK_HISTORY,
} from "../../definitions/FinishTask";
import {
  numberWithCommas,
  numberWithCommasToFixed,
} from "../../utilities/TextFormatter";
import ActionButton from "../../components/button/ActionButton";
import ModalMapPlot from "../../components/modal/task/finishTask/ModalMapPlot";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import { CheckboxChangeEvent } from "antd/lib/checkbox";

interface DataType {
  key: React.Key;
  date: string;
  droner: string;
  farmer: string;
  plotArea: any;
  plotId: string;
  farmAreaAmount: string;
  rating: string;
  totalPrice: string;
  statusPay: string;
  status: string;
  telDroner: string;
  telFarmer: string;
  taskNo: string;
  updateBy: string;
  action: string;
  discountFee: string;
  price: string;
  fee: string;
  discount: string;
  taskHistory: string;
}
function IndexReport() {
  const [getData, setGetData] = useState<TaskReportListEntity>();
  const [row, setRow] = useState(10);
  const [current, setCurrent] = useState(1);
  const [searchText, setSearchText] = useState<string>();
  const [searchStatus, setSearchStatus] = useState();
  const [searchStatusPayment, setSearchStatusPayment] = useState();
  const [searchStatusCancel, setSearchStatusCancel] = useState();
  const [startDate, setStartDate] = useState<any>(null);
  const [endDate, setEndDate] = useState<any>(null);
  const [searchProvince, setSearchProvince] = useState<any>();
  const [searchDistrict, setSearchDistrict] = useState<any>();
  const [searchSubdistrict, setSearchSubdistrict] = useState<any>();
  const [province, setProvince] = useState<ProviceEntity[]>();
  const [district, setDistrict] = useState<DistrictEntity[]>();
  const [subdistrict, setSubdistrict] = useState<SubdistrictEntity[]>();
  const profile = JSON.parse(localStorage.getItem("profile") || "{  }");
  const [showModalMap, setShowModalMap] = useState<boolean>(false);
  const [plotId, setPlotId] = useState<string>("");
  const [visibleRating, setVisibleRating] = useState(false);
  const [statusArr, setStatusArr] = useState<string[]>([]);
  const [CheckEnum, setCheckEnum] = useState<string[]>([]);
  const [clickPays, setClickPays] = useState<any[]>([]);
  const [statusPayment, setStatusPayment] = useState<updateStatusPays>(
    updateStatusPays_INIT
  );
  const { RangePicker } = DatePicker;
  const dateSearchFormat = "YYYY-MM-DD";
  const dateFormat = "DD/MM/YYYY";
  const timeFormat = "HH:mm";

  useEffect(() => {
    fetchAllReport();
    fetchProvince();
  }, [current, row, startDate, endDate]);
  const fetchAllReport = async () => {
    await ReportDocDatasource.getAllReportDroner(
      current,
      row,
      searchSubdistrict,
      searchDistrict,
      searchProvince,
      startDate,
      endDate,
      searchStatus,
      searchStatusPayment,
      searchStatusCancel,
      searchText
    ).then((res: TaskReportListEntity) => {
      setGetData(res);
    });
  };
  const [persistedProfile, setPersistedProfile] = useLocalStorage(
    "profile",
    []
  );

  const SearchDate = (e: any) => {
    if (e != null) {
      setStartDate(moment(new Date(e[0])).format(dateSearchFormat));
      setEndDate(moment(new Date(e[1])).format(dateSearchFormat));
    } else {
      setStartDate(e);
      setEndDate(e);
    }
    setCurrent(1);
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
  const onChangePage = (page: number) => {
    setCurrent(page);
  };
  const onShowSizeChange: PaginationProps["onShowSizeChange"] = (
    current,
    pageSize
  ) => {
    setCurrent(current);
    setRow(pageSize);
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
  const handleVisibleRating = (newVisible: any) => {
    setVisibleRating(newVisible);
  };

  const statusOptions = ["WAIT_START", "IN_PROGRESS", "WAIT_RECEIVE"];
  const statusDoneOptions = ["WAIT_PAYMENT", "DONE_PAYMENT", "SUCCESS"];

  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>();
  const [checkedListDone, setCheckedListDone] = useState<CheckboxValueType[]>();

  const [indeterminate, setIndeterminate] = useState(false);
  const [indeterminateDone, setIndeterminateDone] = useState(false);

  const [checkAll, setCheckAll] = useState(false);
  const [checkAllDone, setCheckAllDone] = useState(false);

  const onChange = (list: CheckboxValueType[]) => {
    setSearchStatus(undefined);
    let arr: any = 0;
    arr = [...list];
    setSearchStatusCancel(arr);
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < statusOptions.length);
    setCheckAll(list.length === statusOptions.length);
  };
  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    if (e.target.checked === true) {
      setSearchStatus(e.target.value);
    } else {
      setSearchStatus(undefined);
    }
    setCheckedList(e.target.checked ? statusOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };
  const onChangeDone = (list: CheckboxValueType[]) => {
    setSearchStatus(undefined);
    let arr: any = 0;
    arr = [...list];
    setSearchStatusPayment(arr);
    setCheckedListDone(list);
    setIndeterminateDone(
      !!list.length && list.length < statusDoneOptions.length
    );
    setCheckAllDone(list.length === statusDoneOptions.length);
  };
  const onCheckAllDoneChange = (e: CheckboxChangeEvent) => {
    if (e.target.checked === true) {
      setSearchStatus(e.target.value);
    } else {
      setSearchStatus(undefined);
    }
    setCheckedListDone(e.target.checked ? statusDoneOptions : []);
    setIndeterminateDone(false);
    setCheckAllDone(e.target.checked);
  };

  const SubStatus = (
    <Menu
      items={[
        {
          label: "รอรีวิว",
          key: "1",
          icon: (
            <Checkbox value="WAIT_REVIEW" onClick={(e) => handleStatus(e)} />
          ),
        },
        {
          label: (
            <>
              <Checkbox
                indeterminate={indeterminateDone}
                onChange={onCheckAllDoneChange}
                checked={checkAllDone}
                value="DONE"
              >
                เสร็จสิ้น
              </Checkbox>
              <br />
              <Checkbox.Group
                value={checkedListDone}
                style={{ width: "100%" }}
                onChange={onChangeDone}
              >
                <Row>
                  <Checkbox style={{ marginLeft: "20px" }} value="WAIT_PAYMENT">
                    รอจ่ายเงิน
                  </Checkbox>
                </Row>
                <Row>
                  <Checkbox style={{ marginLeft: "20px" }} value="DONE_PAYMENT">
                    จ่ายเงินแล้ว
                  </Checkbox>
                </Row>
                <Row>
                  <Checkbox style={{ marginLeft: "20px" }} value="SUCCESS">
                    เสร็จสิ้น
                  </Checkbox>
                </Row>
              </Checkbox.Group>
            </>
          ),
          key: "2",
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
                ยกเลิก
              </Checkbox>
              <br />
              <Checkbox.Group
                value={checkedList}
                style={{ width: "100%" }}
                onChange={onChange}
              >
                <Row>
                  <Checkbox style={{ marginLeft: "20px" }} value="WAIT_START">
                    รอเริ่มงาน
                  </Checkbox>
                </Row>
                <Row>
                  <Checkbox style={{ marginLeft: "20px" }} value="IN_PROGRESS">
                    กำลังดำเนินงาน
                  </Checkbox>
                </Row>
              </Checkbox.Group>
            </>
          ),
          key: "3",
        },
      ]}
    />
  );
  const DownloadPDF = async () => {
    if (clickPays.length > 1) {
      const filterId = clickPays.map((x: any) => x.action);
      const downloadBy = `${persistedProfile.firstname} ${persistedProfile.lastname}`;
      await ReportDocDatasource.getFileName("ZIP_PDF", downloadBy).then(
        (res) => {
          if (res.responseData) {
            const idFileName = res.responseData.id;
            const fileName = res.responseData.fileName;
            ReportDocDatasource.reportPDF(
              filterId,
              downloadBy,
              idFileName
            ).then((res) => {
              const blob = new Blob([res], { type: "application/zip" });
              const a = document.createElement("a");
              a.href = window.URL.createObjectURL(blob);
              a.download = fileName;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
            });
          }
        }
      );
    } else if (clickPays.length === 1) {
      const filterId = clickPays.map((x: any) => x.action);
      const downloadBy = `${persistedProfile.firstname} ${persistedProfile.lastname}`;
      await ReportDocDatasource.getFileName("PDF", downloadBy, filterId).then(
        (res) => {
          if (res.responseData) {
            const idFileName = res.responseData.id;
            const fileName = res.responseData.fileName;
            ReportDocDatasource.reportPDF(
              filterId,
              downloadBy,
              idFileName
            ).then((res) => {
              const blob = new Blob([res], { type: "application/pdf" });
              const a = document.createElement("a");
              a.href = window.URL.createObjectURL(blob);
              a.download = fileName;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
            });
          }
        }
      );
    }
  };
  const DownloadExcel = async () => {
    const filterId = clickPays.map((x: any) => x.action);
    const downloadBy = `${persistedProfile.firstname} ${persistedProfile.lastname}`;
    await ReportDocDatasource.getFileName("EXCEL", downloadBy, filterId).then(
      (res) => {
        if (res.responseData) {
          const idFileName = res.responseData.id;
          const fileName = res.responseData.fileName;
          ReportDocDatasource.reportExcel(
            filterId,
            downloadBy,
            idFileName
          ).then((res) => {
            const blob = new Blob([res], {
              type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });
            const a = document.createElement("a");
            a.href = window.URL.createObjectURL(blob);
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          });
        }
      }
    );
  };
  const downloadFile = (
    <Menu
      items={[
        {
          label: <span onClick={DownloadPDF}>ดาวน์โหลดไฟล์ PDF</span>,
          key: "pdf",
        },
        {
          label: <span onClick={DownloadExcel}>ดาวน์โหลดไฟล์ Excel</span>,
          key: "excel",
        },
      ]}
    />
  );
  const updateStatusPayment = async () => {
    Swal.fire({
      title: "ยืนยันการแก้ไข",
      text: "โปรดตรวจสอบงานที่คุณต้องการแก้ไข ก่อนที่จะกดยืนยันแก้ไข เพราะอาจส่งผลต่อการจ้างงานในแอปพลิเคชัน",
      cancelButtonText: "ยกเลิก",
      confirmButtonText: "บันทึก",
      confirmButtonColor: color.Success,
      showCancelButton: true,
      showCloseButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (clickPays.map((x) => x.statusPay)[0] === "DONE_PAYMENT") {
          const updateBy = profile.firstname + " " + profile.lastname;
          const updateInfo = { ...statusPayment };
          updateInfo.id = clickPays.map((x) => x.action);
          updateInfo.statusPayment = "WAIT_PAYMENT";
          updateInfo.updateBy = updateBy;
          await UpdateStatusPaymentDatasource.UpdateStatusPayment(
            updateInfo
          ).then((res) => {
            window.location.href = "/IndexReport";
          });
        } else if (clickPays.map((x) => x.statusPay)[0] === "WAIT_PAYMENT") {
          const updateBy = profile.firstname + " " + profile.lastname;
          const updateInfo = { ...statusPayment };
          updateInfo.id = clickPays.map((x) => x.action);
          updateInfo.statusPayment = "DONE_PAYMENT";
          updateInfo.updateBy = updateBy;
          await UpdateStatusPaymentDatasource.UpdateStatusPayment(
            updateInfo
          ).then((res) => {
            window.location.href = "/IndexReport";
          });
        }
        fetchAllReport();
      }
    });
  };
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      const filterEnum = selectedRows.map((x) => x.statusPay);
      const checkData = filterEnum.filter(
        (item, index) => filterEnum.indexOf(item) === index
      );
      setClickPays(selectedRows);
      setCheckEnum(checkData);
    },
    getCheckboxProps: (record: DataType) => ({
      disabled:
        record.statusPay != "DONE_PAYMENT" &&
        record.statusPay != "WAIT_PAYMENT",
      statusPay: record.statusPay,
    }),
  };
  const columns: ColumnsType<DataType> = [
    {
      title: "วัน/เวลา นัดหมาย",
      dataIndex: "date",
      sorter: (a: any, b: any) => sorter(a.date, b.date),
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span className="text-dark-75  d-block font-size-lg">
                {moment(new Date(value)).format(dateFormat)},{" "}
                {moment(new Date(value)).format(timeFormat)}
              </span>
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
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span className="text-dark-75  d-block font-size-lg">
                {value}
              </span>
              <span style={{ color: color.Grey, fontSize: "12px" }}>
                {row.telDroner}
              </span>
            </>
          ),
        };
      },
    },
    {
      title: "ชื่อเกษตรกร",
      dataIndex: "farmer",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span className="text-dark-75  d-block font-size-lg">
                {value}
              </span>
              <span style={{ color: color.Grey, fontSize: "12px" }}>
                {row.telFarmer}
              </span>
            </>
          ),
        };
      },
    },
    {
      title: "พื้นที่แปลงเกษตร",
      dataIndex: "plotArea",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span className="text-dark-75  d-block font-size-lg">
                {value}
              </span>
              <a
                onClick={() => handleModalMap(row.plotId)}
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
      title: "จำนวนไร่",
      dataIndex: "farmAreaAmount",
      width: "9%",
      sorter: (a: any, b: any) => sorter(a.farmAreaAmount, b.farmAreaAmount),
      render: (value: any, row: any, index: number) => {
        return {
          children: <>{`${value} ไร่`}</>,
        };
      },
    },
    {
      title: "Rating",
      dataIndex: "rating",
      width: "8%",
      sorter: (a: any, b: any) => sorter(a.rating, b.rating),
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span className="text-dark-75  d-block font-size-lg">
                <span>
                  <StarFilled
                    style={{
                      color: "#FFCA37",
                      fontSize: "20px",
                      marginRight: "7px",
                      verticalAlign: 0.5,
                    }}
                  />
                  {parseFloat(value).toFixed(1)}
                </span>
              </span>
            </>
          ),
        };
      },
    },
    {
      title: "ยอดรวมค่าบริการ",
      dataIndex: "totalPrice",
      fixed: "right",
      width: "12%",
      sorter: (a: any, b: any) => sorter(a.totalPrice, b.totalPrice),
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div>
              <span className="text-dark-75 d-block font-size-lg">
                {value != null
                  ? numberWithCommasToFixed(parseFloat(value)) + " บาท"
                  : "0 บาท"}
                <Popover
                  title={
                    <span
                      style={{
                        color: color.White,
                      }}
                    >
                      รายละเอียดค่าบริการ
                    </span>
                  }
                  content={
                    <table style={{ width: "300px" }}>
                      <tr>
                        <td>ค่าบริการ</td>
                        <td>{numberWithCommas(row.price) + " บาท"}</td>
                      </tr>
                      <tr>
                        <td>ค่าธรรมเนียม (5%)</td>
                        <td>{numberWithCommas(row.fee) + " บาท"}</td>
                      </tr>
                      <tr>
                        <td>ส่วนลดค่าธรรมเนียม</td>
                        <td>{numberWithCommas(row.discountFee) + " บาท"}</td>
                      </tr>
                      <tr>
                        <td>ส่วนลดจากคูปอง</td>
                        <td>{numberWithCommas(row.discount) + " บาท"}</td>
                      </tr>
                      <tr>
                        <td>
                          <Divider />
                        </td>
                        <td>
                          {" "}
                          <Divider />
                        </td>
                      </tr>
                      <tr>
                        <td>ยอดรวมค่าบริการ</td>
                        <td>{numberWithCommas(row.totalPrice) + " บาท"}</td>
                      </tr>
                    </table>
                  }
                >
                  <InfoCircleFilled
                    style={{
                      color: color.primary1,
                      fontSize: "15px",
                      marginLeft: "7px",
                      verticalAlign: 0.5,
                    }}
                  />
                </Popover>
              </span>
            </div>
          ),
        };
      },
    },
    {
      title: "สถานะ",
      dataIndex: "statusPay",
      fixed: "right",
      width: "15%",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              {value ? (
                <>
                  <span style={{ color: STATUS_COLOR_TASK[value] }}>
                    <Badge color={STATUS_COLOR_TASK[value]} />{" "}
                    {FINISH_TASK[value]}
                    <br />
                  </span>
                </>
              ) : (
                <>
                  <span style={{ color: STATUS_COLOR_TASK[row.status] }}>
                    <Badge color={STATUS_COLOR_TASK[row.status]} />{" "}
                    {FINISH_TASK[row.status]}
                    {row.taskHistory != undefined
                      ? row.status == "CANCELED"
                        ? " " + "(" + TASK_HISTORY[row.taskHistory] + ")"
                        : null
                      : null}
                  </span>
                  <br />
                </>
              )}

              <span style={{ color: color.Grey, fontSize: "12px" }}>
                <UserOutlined
                  style={{ padding: "0 4px 0 0", verticalAlign: 0.5 }}
                />
                {row.updateBy}
              </span>
            </>
          ),
        };
      },
    },
    {
      title: "",
      dataIndex: "action",
      fixed: "right",
      width: "5%",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div className="d-flex flex-row justify-content-between">
              <ActionButton
                icon={<EditOutlined />}
                color={color.primary1}
                onClick={() => (window.location.href = "/EditReport?=" + value)}
              />
            </div>
          ),
        };
      },
    },
  ];
  const PageTitle = (
    <>
      <div
        className="container d-flex justify-content-between"
        style={{ padding: "10px" }}
      >
        <div className="col-lg-6">
          <span
            className="card-label font-weight-bolder text-dark"
            style={{
              fontSize: 22,
              fontWeight: "bold",
            }}
          >
            <strong>งานที่เสร็จแล้ว</strong>
          </span>
        </div>
        <div style={{ color: color.Error }}>
          <RangePicker
            allowClear
            onCalendarChange={SearchDate}
            format={dateFormat}
          />
        </div>
        {CheckEnum[0] != undefined ? (
          <>
            {CheckEnum.length > 0 && CheckEnum.length != 2 ? (
              <>
                <div>
                  <div>
                    <Dropdown overlay={downloadFile}>
                      <Button
                        style={{
                          padding: "8 0",
                          backgroundColor: color.primary1,
                          color: color.secondary2,
                          borderColor: color.Success,
                          borderRadius: "5px",
                        }}
                      >
                        ดาวน์โหลดเอกสาร
                        <DownOutlined />
                      </Button>
                    </Dropdown>
                  </div>
                </div>
                <div>
                  <Button
                    style={{
                      borderColor: color.Success,
                      borderRadius: "5px",
                      color: color.secondary2,
                      backgroundColor: color.Success,
                    }}
                    onClick={() => updateStatusPayment()}
                  >
                    {clickPays.find((x) => x.statusPay === "WAIT_PAYMENT")
                      ? "จ่ายเงินแล้ว"
                      : "DONE_PAYMENT"
                      ? "รอจ่ายเงิน"
                      : null}
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div>
                  <div style={{ width: "240px" }}>
                    <Dropdown overlay={downloadFile}>
                      <Button
                        style={{
                          backgroundColor: color.primary1,
                          color: color.secondary2,
                          borderColor: color.Success,
                          borderRadius: "5px",
                        }}
                      >
                        ดาวน์โหลดเอกสาร
                        <DownOutlined />
                      </Button>
                    </Dropdown>
                  </div>
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <div style={{ width: "240px" }}>
              <Dropdown disabled>
                <Button
                  style={{
                    padding: "8 0",
                    backgroundColor: color.Disable,
                    color: color.Grey,
                    borderColor: color.Disable,
                    borderRadius: "5px",
                  }}
                >
                  ดาวน์โหลดเอกสาร
                  <DownOutlined />
                </Button>
              </Dropdown>
            </div>
          </>
        )}
      </div>
      <div className="container d-flex justify-content-between pt-3">
        <CardContainer
          style={{
            width: "20%",
            padding: "15px",
            marginRight: "20px",
            borderRadius: "5px",
          }}
        >
          <p>รอรีวิว</p>
          <div className="d-flex justify-content-between">
            <CardContainer
              style={{
                backgroundColor: color.blue,
                borderRadius: "5px",
                padding: "10px",
                width: "100%",
              }}
            >
              <div
                className="d-flex justify-content-between"
                style={{ color: color.White, fontWeight: "bold" }}
              >
                <span>รอรีวิว</span>
                <strong>
                  {getData?.summary != undefined
                    ? getData?.summary[0].waitreview
                    : "0"}
                </strong>
              </div>
            </CardContainer>
          </div>
        </CardContainer>
        <CardContainer
          style={{
            width: "55%",
            padding: "15px",
            marginRight: "20px",
            borderRadius: "5px",
          }}
        >
          <p>เสร็จสิ้น</p>
          <div className="d-flex justify-content-between">
            <CardContainer
              style={{
                backgroundColor: color.primary1,
                borderRadius: "5px",
                padding: "10px",
                width: "100%",
                marginRight: "10px",
              }}
            >
              <div
                className="d-flex justify-content-between"
                style={{ color: color.White, fontWeight: "bold" }}
              >
                <span>รอจ่ายเงิน</span>
                <strong>
                  {getData?.summary != undefined
                    ? getData?.summary[0].waitpayment
                    : "0"}
                </strong>
              </div>
            </CardContainer>
            <CardContainer
              style={{
                backgroundColor: color.secondary3,
                borderRadius: "5px",
                padding: "10px",
                width: "100%",
                marginRight: "10px",
              }}
            >
              <div
                className="d-flex justify-content-between"
                style={{ color: color.White, fontWeight: "bold" }}
              >
                <span>จ่ายเงินแล้ว (บริษัท)</span>
                <strong>
                  {getData?.summary != undefined
                    ? getData?.summary[0].donepayment
                    : "0"}
                </strong>
              </div>
            </CardContainer>
            <CardContainer
              style={{
                backgroundColor: color.Warning,
                borderRadius: "5px",
                padding: "10px",
                width: "100%",
                marginRight: "10px",
              }}
            >
              <div
                className="d-flex justify-content-between"
                style={{ color: color.White, fontWeight: "bold" }}
              >
                <span>เสร็จสิ้น</span>
                <strong>
                  {getData?.summary != undefined
                    ? getData?.summary[0].successpayment
                    : "0"}
                </strong>
              </div>
            </CardContainer>
          </div>
        </CardContainer>
        <CardContainer
          style={{
            width: "20%",
            padding: "15px",
            marginRight: "20px",
            borderRadius: "5px",
          }}
        >
          <p>ยกเลิก</p>
          <div className="d-flex justify-content-between">
            <CardContainer
              style={{
                backgroundColor: color.Error,
                borderRadius: "5px",
                padding: "10px",
                width: "100%",
              }}
            >
              <div
                className="d-flex justify-content-between"
                style={{ color: color.White, fontWeight: "bold" }}
              >
                <span>ยกเลิก</span>
                <strong>
                  {getData?.summary != undefined
                    ? getData?.summary[0].canceledtask
                    : "0"}
                </strong>
              </div>
            </CardContainer>
          </div>
        </CardContainer>
      </div>
      <div className="container d-flex justify-content-between pt-3">
        <div className="col-lg-4 p-1">
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
            disabled={searchProvince === undefined}
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
        <div className="col-lg p-1">
          <Dropdown
            overlay={SubStatus}
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
            onClick={fetchAllReport}
          >
            ค้นหาข้อมูล
          </Button>
        </div>
      </div>
    </>
  );

  const data: DataType[] = [];
  if (getData != undefined) {
    for (let i = 0; i < getData.data.length; i++) {
      data.push({
        key: i,
        date: `${getData?.data.map((x) => x.dateAppointment)[i]}`,
        droner: `${
          getData?.data.map((x) =>
            x.droner != null
              ? x.droner.firstname + " " + x.droner.lastname
              : "-"
          )[i]
        }`,
        farmer: `${
          getData?.data.map(
            (x) => x.farmer.firstname + " " + x.farmer.lastname
          )[i]
        }`,
        plotArea: `${
          getData?.data.map((x) =>
            x.farmerPlot.plotArea != null
              ? x.farmerPlot.plotArea.subdistrictName +
                "/" +
                x.farmerPlot.plotArea.districtName +
                "/" +
                x.farmerPlot.plotArea.provinceName
              : "-"
          )[i]
        }`,
        plotId: `${getData?.data.map((x) => x.farmerPlot.id)[i]}`,
        farmAreaAmount: `${getData?.data.map((x) => x.farmAreaAmount)[i]}`,
        rating: `${
          getData?.data.map((x) =>
            x.reviewDronerAvg != null ? x.reviewDronerAvg : "0"
          )[i]
        }`,
        totalPrice: `${
          getData?.data.map((x) => (x.totalPrice != null ? x.totalPrice : "0"))[
            i
          ]
        }`,
        statusPay: `${
          getData?.data.map((x) =>
            x.statusPayment != null ? x.statusPayment : ""
          )[i]
        }`,
        status: `${getData?.data.map((x) => x.status)[i]}`,
        telDroner: `${
          getData?.data.map((x) =>
            x.droner != null ? x.droner.telephoneNo : "-"
          )[i]
        }`,
        telFarmer: `${getData?.data.map((x) => x.farmer.telephoneNo)[i]}`,
        taskNo: `${getData?.data.map((x) => x.taskNo)[i]}`,
        updateBy: `${
          getData?.data.map((x) => (x.updateBy != null ? x.updateBy : "-"))[i]
        }`,
        discountFee: `${getData?.data.map((x) => x.discountFee)[i]}`,
        price: `${getData?.data.map((x) => x.price)[i]}`,
        fee: `${getData?.data.map((x) => x.fee)[i]}`,
        discount: `${getData?.data.map((x) => x.discount)[i]}`,
        action: `${getData?.data.map((x) => x.id)[i]}`,
        taskHistory: `${
          getData?.data.map((x) =>
            x.taskHistory.length > 0 ? x.taskHistory[0].beforeValue : []
          )[i]
        }`,
      });
    }
  }
  return (
    <Layouts>
      {PageTitle}
      <br />
      <Table
        rowSelection={{
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
        pagination={false}
        scroll={{ x: 1400 }}
      />
      <div className="d-flex justify-content-between pt-5">
        <p>รายการทั้งหมด {getData?.count} รายการ</p>
        <Pagination
          current={current}
          showSizeChanger
          onChange={onChangePage}
          onShowSizeChange={onShowSizeChange}
          total={getData?.count}
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

export default IndexReport;
