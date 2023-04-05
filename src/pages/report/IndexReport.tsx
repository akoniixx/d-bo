import {
  DownOutlined,
  EditOutlined,
  InfoCircleFilled,
  SearchOutlined,
  StarFilled,
  UserOutlined,
} from "@ant-design/icons";
import {
  Badge,
  Button,
  Checkbox,
  Divider,
  Dropdown,
  Input,
  Menu,
  Pagination,
  PaginationProps,
  Popover,
  Select,
  Table,
  Tooltip,
} from "antd";
import DatePicker from "antd/lib/date-picker";
import { ColumnsType } from "antd/lib/table";
import { RowSelectionType } from "antd/lib/table/interface";
import moment from "moment";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ActionButton from "../../components/button/ActionButton";
import { CardContainer } from "../../components/card/CardContainer";
import Layouts from "../../components/layout/Layout";
import ModalMapPlot from "../../components/modal/task/finishTask/ModalMapPlot";
import { LocationDatasource } from "../../datasource/LocationDatasource";
import { TaskFinishedDatasource } from "../../datasource/TaskFinishDatasource";
import { UpdateStatusPaymentDatasource } from "../../datasource/UpdateStatusPaymentDatasource";
import {
  FINISH_TASK,
  FINISH_TASK_SEARCH,
  STATUS_COLOR_TASK,
  TASK_HISTORY,
} from "../../definitions/FinishTask";
import {
  DistrictEntity,
  ProviceEntity,
  SubdistrictEntity,
} from "../../entities/LocationEntities";
import {
  TaskReportEntity,
  TaskReportEntity_INIT,
  TaskReportListEntity,
  updateStatusPays,
  updateStatusPays_INIT,
} from "../../entities/TaskFinishEntities";
import { useLocalStorage } from "../../hook/useLocalStorage";
import { color } from "../../resource";
import { numberWithCommas } from "../../utilities/TextFormatter";
import { ReportDocDatasource } from "../../datasource/ReportDocument";

function IndexReport() {
  const [persistedProfile, setPersistedProfile] = useLocalStorage(
    "profile",
    []
  );
  const profile = JSON.parse(localStorage.getItem("profile") || "{  }");
  const [row, setRow] = useState(10);
  const [current, setCurrent] = useState(1);
  const [data, setData] = useState<TaskReportListEntity>();
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
  const [showModalMap, setShowModalMap] = useState<boolean>(false);
  const [plotId, setPlotId] = useState<string>("");
  const [visibleRating, setVisibleRating] = useState(false);
  const [statusArr, setStatusArr] = useState<string[]>([]);
  const [statusPays, setStatusPays] = useState<string[]>([]);
  const [statusCan, setStatusCan] = useState<string[]>([]);
  const [download, setDownLoad] = useState<string[]>([]);
  const [clickPays, setClickPays] = useState<string[]>([]);
  const [paysEnum, setPaysEnum] = useState<string[]>([]);
  const [arrRowEnum, setArrRowEnum] = useState<string[]>([]);
  const [dataRow, setDataRow] = useState<string[]>([]);
  const [arrRow, setArrRow] = useState<string[]>([]);
  const [arrRowAll, setArrRowAll] = useState<string[]>([]);
  const [getFileName, setGetFileName] = useState<string>();

  const [checkAll, setCheckAll] = useState<any>();
  const [statusPayment, setStatusPayment] = useState<updateStatusPays>(
    updateStatusPays_INIT
  );
  const { RangePicker } = DatePicker;
  const dateFormat = "DD/MM/YYYY";
  const timeFormat = "HH:mm";
  const dateSearchFormat = "YYYY-MM-DD";
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
      setData(res);
    });
  };
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
  const handleStatusPayment = (e: any) => {
    let value = e.target.value;
    let checked = e.target.checked;
    let arr: any = 0;
    if (checked) {
      arr = [...statusPays, value];
      setStatusPays([...statusPays, value]);
      setSearchStatus(undefined);
    } else {
      let d: string[] = statusPays.filter((x) => x != value);
      arr = [...d];
      setStatusPays(d);
      if (d.length == 0) {
        arr = undefined;
        const a: any = "DONE";
        setSearchStatus(a);
      }
      setSearchStatus(undefined);
    }
    setSearchStatusPayment(arr);
    setCurrent(1);
  };
  const handleStatusCancel = (e: any) => {
    let value = e.target.value;
    let checked = e.target.checked;
    let arr: any = 0;
    if (checked) {
      arr = [...statusCan, value];
      setStatusCan([...statusCan, value]);
      setSearchStatus(undefined);
    } else {
      let d: string[] = statusCan.filter((x) => x != value);
      arr = [...d];
      setStatusCan(d);
      if (d.length == 0) {
        arr = undefined;
        const a: any = "CANCELED";
        setSearchStatus(a);
      }
      setSearchStatus(undefined);
    }
    setSearchStatusCancel(arr);
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
  const status = (
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
          label: "เสร็จสิ้น",
          key: "2",
          icon: <Checkbox value="DONE" onClick={(e) => handleStatus(e)} />,
        },
        {
          label: "รอจ่ายเงิน",
          key: "3",
          icon: (
            <Checkbox
              style={{ marginLeft: "20px" }}
              value="WAIT_PAYMENT"
              onClick={(e) => handleStatusPayment(e)}
            />
          ),
        },
        {
          label: "จ่ายเงินแล้ว",
          key: "4",
          icon: (
            <Checkbox
              style={{ marginLeft: "20px" }}
              value="DONE_PAYMENT"
              onClick={(e) => handleStatusPayment(e)}
            />
          ),
        },
        {
          label: "เสร็จสิ้น",
          key: "5",
          icon: (
            <Checkbox
              style={{ marginLeft: "20px" }}
              value="SUCCESS"
              onClick={(e) => handleStatusPayment(e)}
            />
          ),
        },
        {
          label: "ยกเลิก",
          key: "6",
          icon: <Checkbox value="CANCELED" onClick={(e) => handleStatus(e)} />,
        },
        {
          label: "รอเริ่มงาน",
          key: "7",
          icon: (
            <Checkbox
              style={{ marginLeft: "20px" }}
              value="WAIT_START"
              onClick={(e) => handleStatusCancel(e)}
            />
          ),
        },
        {
          label: "กำลังดำเนินงาน",
          key: "8",
          icon: (
            <Checkbox
              style={{ marginLeft: "20px" }}
              value="IN_PROGRESS"
              onClick={(e) => handleStatusCancel(e)}
            />
          ),
        },
      ]}
    />
  );

  const handleAllSelect = (e: any) => {
    let value = e.target.value;
    let checked = e.target.checked;
    if (checked) {
      console.log(value.statusPayment);
      console.log(value.id);

      setCheckAll(value.statusPayment);
      setDownLoad(value.id)
    } else {
      setCheckAll(undefined);
    }
  };

  const changeStatusPayment = (e: any) => {
    let value = e.target.value;
    let checked = e.target.checked;
    let arr: any = [];
    let eNum: any = [];
    let row: any = [];
    if (checked) {
      setGetFileName(value.id);

      eNum = [...arrRowEnum, value.statusPayment];
      setArrRowEnum([...arrRowEnum, value.statusPayment]);
      arr = [...arrRow, value.id];
      setArrRow([...arrRow, value.id]);
      row = [...dataRow, value];
      setDataRow([...dataRow, value]);
    } else {
      let d: string[] = arrRow.filter((x) => x != value.id);
      let s: string[] = arrRowEnum.filter((x) => x != value.statusPayment);
      let o: string[] = dataRow.filter((x) => x != value);
      arr = [...d];
      eNum = [...s];
      row = [...o];
      setArrRow(d);
      setArrRowEnum(s);
      setDataRow(o);
      if (d.length == 0) {
        arr = [];
      } else if (s.length == 0) {
        eNum = [];
      } else if (o.length == 0) {
        row = [];
      }
    }
    setPaysEnum(eNum);
    setClickPays(arr);
    setDownLoad(row);
  };
  const DownloadPDF = async () => {
    if (download.length > 1) {
      const filterId = download.map((x: any) => x.id);
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
    } else {
      const filterId = download.map((x: any) => x.id);
      const downloadBy = `${persistedProfile.firstname} ${persistedProfile.lastname}`;
      await ReportDocDatasource.getFileName(
        "PDF",
        downloadBy,
        getFileName
      ).then((res) => {
        if (res.responseData) {
          const idFileName = res.responseData.id;
          const fileName = res.responseData.fileName;
          ReportDocDatasource.reportPDF(filterId, downloadBy, idFileName).then(
            (res) => {
              const blob = new Blob([res], { type: "application/pdf" });
              const a = document.createElement("a");
              a.href = window.URL.createObjectURL(blob);
              a.download = fileName;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
            }
          );
        }
      });
    }
  };

  const downloadFile = (
    <Menu
      items={[
        {
          label: <span onClick={DownloadPDF}>ดาวน์โหลดไฟล์ PDF</span>,
          key: "pdf",
        },
        {
          label: "ดาวน์โหลดไฟล์ Excel",
          key: "excel",
          // icon: (
          //   <Checkbox value="WAIT_REVIEW" onClick={(e) => handleStatus(e)} />
          // ),
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
        if (paysEnum[0] === "WAIT_PAYMENT") {
          const updateBy = profile.firstname + " " + profile.lastname;
          const updateInfo = { ...statusPayment };
          updateInfo.id = clickPays;
          updateInfo.statusPayment = "DONE_PAYMENT";
          updateInfo.updateBy = updateBy;
          await UpdateStatusPaymentDatasource.UpdateStatusPayment(
            updateInfo
          ).then((res) => {
            window.location.href = "/IndexReport";
          });
        } else if (paysEnum[0] === "DONE_PAYMENT") {
          const updateBy = profile.firstname + " " + profile.lastname;
          const updateInfo = { ...statusPayment };
          updateInfo.id = clickPays;
          updateInfo.statusPayment = "WAIT_PAYMENT";
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

  const columns: ColumnsType<TaskReportEntity> = [
    {
      title: (
        <>
          <Checkbox
            value={data?.data}
            onChange={handleAllSelect}
          />
        </>
      ),
      width: "3%",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              {checkAll ? (
                <Checkbox
                  value={row}
                  onChange={changeStatusPayment}
                  checked={
                    row.statusPayment === "WAIT_PAYMENT" ||
                    row.statusPayment === "DONE_PAYMENT"
                  }
                  disabled={
                    row.statusPayment != "WAIT_PAYMENT" &&
                    row.statusPayment != "DONE_PAYMENT"
                  }
                />
              ) : (
                <Checkbox
                  value={row}
                  onChange={changeStatusPayment}
                  disabled={
                    row.statusPayment != "WAIT_PAYMENT" &&
                    row.statusPayment != "DONE_PAYMENT"
                  }
                  // checked={false}
                />
              )}
            </>
          ),
        };
      },
    },
    {
      title: "วัน/เวลา นัดหมาย",
      dataIndex: "dateAppointment",
      key: "dateAppointment",
      sorter: (a: any, b: any) => sorter(a.dateAppointment, b.dateAppointment),
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span className="text-dark-75  d-block font-size-lg">
                {moment(new Date(row.dateAppointment)).format(dateFormat)},{" "}
                {moment(new Date(row.dateAppointment)).format(timeFormat)}
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
      key: "droner",
      sorter: (a: any, b: any) => sorter(a.droner, b.droner),
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span className="text-dark-75  d-block font-size-lg">
                {row.droner !== null
                  ? row.droner.firstname + " " + row.droner.lastname
                  : "-"}
              </span>
              <span style={{ color: color.Grey, fontSize: "12px" }}>
                {row.droner !== null ? row.droner.telephoneNo : null}
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
      sorter: (a: any, b: any) => sorter(a.farmer, b.farmer),
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span className="text-dark-75  d-block font-size-lg">
                {row.farmer !== null
                  ? row.farmer.firstname + " " + row.farmer.lastname
                  : "-"}
              </span>
              <span style={{ color: color.Grey, fontSize: "12px" }}>
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
                {subdistrict !== null
                  ? subdistrict.subdistrictName + "/"
                  : null}
                {district !== null ? district.districtName + "/" : null}
                {province !== null ? province.provinceName + "" : null}
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
      title: "จำนวนไร่",
      dataIndex: "farmAreaAmount",
      key: "farmAreaAmount",
      sorter: (a: any, b: any) => sorter(a.farmAreaAmount, b.farmAreaAmount),
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span className="text-dark-75  d-block font-size-lg">
                {`${row.farmAreaAmount} ไร่`}
              </span>
            </>
          ),
        };
      },
    },

    {
      title: "Rating",
      dataIndex: "reviewDronerAvg",
      key: "reviewDronerAvg",
      width: "7%",
      sorter: (a: any, b: any) => sorter(a.reviewDronerAvg, b.reviewDronerAvg),
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span className="text-dark-75  d-block font-size-lg">
                {row.reviewDronerAvg > "0" ? (
                  <span>
                    <StarFilled
                      style={{
                        color: "#FFCA37",
                        fontSize: "20px",
                        marginRight: "7px",
                        verticalAlign: 0.5,
                      }}
                    />
                    {parseFloat(row.reviewDronerAvg).toFixed(1)}
                  </span>
                ) : (
                  "-"
                )}
              </span>
            </>
          ),
        };
      },
    },
    {
      title: "ยอดรวมค่าบริการ",
      dataIndex: "totalPrice",
      key: "totalPrice",
      fixed: "right",
      sorter: (a: any, b: any) => sorter(a.totalPrice, b.totalPrice),
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div>
              <span className="text-dark-75 d-block font-size-lg">
                {row.totalPrice != null
                  ? numberWithCommas(row.totalPrice) + " บาท"
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
      dataIndex: "status",
      key: "status",
      fixed: "right",
      render: (value: any, row: any, index: number) => {
        const beforeValue = row.taskHistory[0];

        return {
          children: (
            <>
              {row.statusPayment != null ? (
                <>
                  <span style={{ color: STATUS_COLOR_TASK[row.statusPayment] }}>
                    <Badge color={STATUS_COLOR_TASK[row.statusPayment]} />{" "}
                    {FINISH_TASK[row.statusPayment]}
                    <br />
                  </span>
                </>
              ) : (
                <>
                  <span style={{ color: STATUS_COLOR_TASK[row.status] }}>
                    <Badge color={STATUS_COLOR_TASK[row.status]} />{" "}
                    {FINISH_TASK[row.status]}
                    {beforeValue != undefined
                      ? row.status == "CANCELED"
                        ? " " +
                          "(" +
                          TASK_HISTORY[beforeValue.beforeValue] +
                          ")"
                        : null
                      : null}
                    <br />
                  </span>
                </>
              )}

              <span style={{ color: color.Grey, fontSize: "12px" }}>
                <UserOutlined
                  style={{ padding: "0 4px 0 0", verticalAlign: 0.5 }}
                />
                {row.updateBy != null ? row.updateBy : "-"}
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
      fixed: "right",
      width: "5%",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div className="d-flex flex-row justify-content-between">
              <ActionButton
                icon={<EditOutlined />}
                color={color.primary1}
                onClick={() =>
                  (window.location.href = "/EditReport?=" + row.id)
                }
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

        {clickPays.length > 0 ||
        checkAll ? (
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
                {paysEnum.find((x) => x === "WAIT_PAYMENT")
                  ? "จ่ายเงินแล้ว"
                  : "DONE_PAYMENT"
                  ? "รอจ่ายเงิน"
                  : null}
              </Button>
            </div>
          </>
        ) : (
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
                  {data?.summary != undefined
                    ? data?.summary[0].waitreview
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
                  {data?.summary != undefined
                    ? data?.summary[0].waitpayment
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
                  {data?.summary != undefined
                    ? data?.summary[0].donepayment
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
                  {data?.summary != undefined
                    ? data?.summary[0].successpayment
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
                  {data?.summary != undefined
                    ? data?.summary[0].canceledtask
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
            onClick={fetchAllReport}
          >
            ค้นหาข้อมูล
          </Button>
        </div>
      </div>
    </>
  );

  return (
    <Layouts>
      {PageTitle}
      <br />
      <Table
        columns={columns}
        dataSource={data?.data}
        scroll={{ x: 1400 }}
        pagination={false}
      />

      <div className="d-flex justify-content-between pt-5">
        <p>รายการทั้งหมด {data?.count} รายการ</p>
        <Pagination
          current={current}
          showSizeChanger
          onChange={onChangePage}
          onShowSizeChange={onShowSizeChange}
          total={data?.count}
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
