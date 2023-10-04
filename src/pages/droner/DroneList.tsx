import {
  Avatar,
  Badge,
  Button,
  Checkbox,
  Dropdown,
  Input,
  Menu,
  Pagination,
  PaginationProps,
  Row,
  Select,
  Spin,
  Table,
} from "antd";
import Search from "antd/lib/input/Search";
import moment from "moment";
import { useEffect, useState } from "react";
import ActionButton from "../../components/button/ActionButton";
import { DroneDatasource } from "../../datasource/DroneDatasource";
import { DronerDroneDatasource } from "../../datasource/DronerDroneDatasource";
import { UploadImageDatasouce } from "../../datasource/UploadImageDatasource";
import {
  DRONER_DRONE_MAPPING,
  DRONE_STATUS,
  STATUS_COLOR,
} from "../../definitions/DronerStatus";
import { DroneBrandEntity } from "../../entities/DroneBrandEntities";
import { DroneEntity, DroneEntity_INIT } from "../../entities/DroneEntities";
import { DronerDroneListEntity } from "../../entities/DronerDroneEntities";
import color from "../../resource/color";
import { formatDate, numberWithCommas } from "../../utilities/TextFormatter";
import {
  CaretDownOutlined,
  CaretUpOutlined,
  DownOutlined,
  EditOutlined,
  FileTextFilled,
  SearchOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import StatusButton from "../../components/button/StatusButton";
import StatusPlots from "../../components/card/StatusPlots";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import { image } from "../../resource";
import { DropdownStatus } from "../../components/dropdownCheck/DropDownStatus";
import ShowNickName from "../../components/popover/ShowNickName";

function DroneList() {
  const navigate = useNavigate();
  const [row, setRow] = useState(10);
  const [current, setCurrent] = useState(1);
  const [droneList, setDroneList] = useState<DronerDroneListEntity>();
  const [droneBrand, setDroneBrand] = useState<DroneBrandEntity[]>();
  const [seriesDrone, setSeriesDrone] = useState<DroneEntity[]>();
  const [droneBrandId, setDroneBrandId] = useState<string>();
  const [searchSeriesDrone, setSearchSeriesDrone] = useState<any>();
  const [searchStatus, setSearchStatus] = useState<any>();
  const [searchText, setSearchText] = useState<string>();
  const [mainStatus, setMainStatus] = useState<any>("PENDING");
  const [waitPendingDate, setWaitPendingDate] = useState<any>();
  const [sumPlotCard, setSumPlotCard] = useState<any>({
    card1: "รอตรวจสอบ",
    card2: "ไม่อนุมัติ",
  });
  const [loading, setLoading] = useState(false);
  const [statusArr, setStatusArr] = useState<string[]>([]);
  const statusListPend = ["FIRST", "SECOND", "THIRD"];
  const [statusArrMain, setStatusArrMain] = useState<string[]>([]);
  const [sortDirection, setSortDirection] = useState<string | undefined>();
  const [sortField, setSortField] = useState<string | undefined>();
  const [summary, setSummary] = useState<any>();

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
  const [sortDirection5, setSortDirection5] = useState<string | undefined>(
    undefined
  );
  const [fetchData, setFetchData] = useState<boolean>(false);

  const fetchDronerDroneList = async () => {
    setLoading(true);
    await DronerDroneDatasource.getDronerDrone(
      mainStatus,
      waitPendingDate,
      current,
      row,
      searchStatus,
      searchText,
      sortDirection,
      sortField,
      searchSeriesDrone,
      droneBrandId
    )
      .then((res) => {
        setDroneList(res);
        setSummary(res.summary[0]);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };
  const fetchDroneBrand = async () => {
    await DroneDatasource.getDroneBrandList().then((res) => {
      setDroneBrand(res.data);
    });
  };

  useEffect(() => {
    DroneDatasource.getDroneList(1, row, droneBrandId).then((res) => {
      setSeriesDrone(res.data);
      setSearchSeriesDrone(null);
    });
  }, [droneBrandId]);

  useEffect(() => {
    fetchDronerDroneList();
    fetchDroneBrand();
  }, [current, row, mainStatus, sortDirection, fetchData]);

  const onChangePage = (page: number) => {
    setCurrent(page);
  };
  const changeTextSearch = (value: any) => {
    setSearchText(value.target.value);
  };
  const handleDroneBrand = async (droneBrand: string) => {
    if (droneBrand !== undefined) {
      await DroneDatasource.getDroneList(1, row, droneBrand).then((res) => {
        setSeriesDrone(res.data);
      });
    } else {
      setSeriesDrone(undefined);
      setSearchSeriesDrone(undefined);
    }
    setDroneBrandId(droneBrand);
  };
  const handleDroneSeries = (seriesDrone: string) => {
    setSearchSeriesDrone(seriesDrone);
  };

  const CheckStatus = (e: any) => {
    if (e.target.value === "PENDING") {
      setSearchStatus(undefined);
      setWaitPendingDate(undefined);
      setSumPlotCard({
        card1: "รอตรวจสอบ",
        card2: "ไม่อนุมัติ",
      });
    } else {
      setSearchStatus(undefined);
      setWaitPendingDate(undefined);
      setSumPlotCard({
        card1: "ใช้งาน",
        card2: "ปิดการใช้งาน",
      });
    }
    setMainStatus(e.target.value);
  };

  const onSearchStatus = (value: string, checked: boolean) => {
    if (statusListPend.map((x) => x).find((c) => c === value)) {
      let arr: any = 0;
      if (checked === true) {
        arr = [...statusArr, value];
        setStatusArr([...statusArr, value]);
        setWaitPendingDate(value);
      } else {
        let d: string[] = statusArr.filter((x) => x !== value);
        arr = [...d];
        setStatusArr(d);
        if (d.length === 0) {
          arr = undefined;
        }
      }
      setWaitPendingDate(arr);
    } else {
      let arr: any = 0;
      if (checked === true) {
        arr = [...statusArrMain, value];
        setStatusArrMain([...statusArrMain, value]);
        setSearchStatus(value);
      } else {
        let d: string[] = statusArrMain.filter((x) => x !== value);
        arr = [...d];
        setStatusArrMain(d);
        if (d.length === 0) {
          arr = undefined;
        }
      }
      setSearchStatus(arr);
    }
  };
  const onShowSizeChange: PaginationProps["onShowSizeChange"] = (
    current,
    pageSize
  ) => {
    setCurrent(current);
    setRow(pageSize);
  };

  const PageTitle = (
    <>
      <div className="d-flex" style={{ padding: "10px" }}>
        <div className="col-lg-5">
          <span style={{ fontSize: 20, fontWeight: "bold" }}>
            <span> รายการโดรนเกษตร (Drone List)</span>
          </span>
        </div>
        <StatusButton
          label1={mainStatus}
          label2={mainStatus}
          onClick={(e: any) => CheckStatus(e)}
        />
      </div>
      <StatusPlots
        title1={sumPlotCard?.card1}
        title2={sumPlotCard?.card2}
        bgColor1={
          sumPlotCard?.card1 === "รอตรวจสอบ" ? color.Warning : color.Success
        }
        bgColor2={
          sumPlotCard?.card2 === "ไม่อนุมัติ" ? color.Grey : color.Error
        }
        countPlot1={
          mainStatus === "PENDING"
            ? numberWithCommas(summary?.count_pending) + " คัน"
            : numberWithCommas(summary?.count_active) + " คัน"
        }
        countPlot2={
          mainStatus === "ACTIVE"
            ? numberWithCommas(summary?.count_inactive) + " คัน"
            : numberWithCommas(summary?.count_reject) + " คัน"
        }
      />
      <div className="d-flex justify-content-between pt-3">
        <div className="col-lg-3 pt-1">
          <Input
            allowClear
            prefix={<SearchOutlined style={{ color: color.Disable }} />}
            placeholder="ค้นหาเลขตัวถังหรือชื่อนักบินโดรน"
            className="col-lg-12 p-1"
            onChange={changeTextSearch}
          />
        </div>
        <div className="col p-1">
          <Select
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
            className="col-lg-12"
            placeholder="เลือกยี่ห้อ"
            allowClear
            onChange={handleDroneBrand}
          >
            {droneBrand?.map((item: any) => (
              <option value={item.id.toString()}>{item.name}</option>
            ))}
          </Select>
        </div>
        <div className="col p-1">
          <Select
            className="col-lg-12"
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
            placeholder="เลือกรุ่นโดรน"
            allowClear
            onChange={handleDroneSeries}
            disabled={!droneBrandId}
            value={searchSeriesDrone}
          >
            {seriesDrone?.map((item: any) => (
              <option value={item.id}>{item.series}</option>
            ))}
          </Select>
        </div>
        <div className="col-lg">
          <DropdownStatus
            title="เลือกสถานะ"
            mainStatus={mainStatus}
            onSearchType={(value: any, checked: any) =>
              onSearchStatus(value, checked)
            }
            list={searchStatus}
          />
        </div>
        <div className="p-1">
          <Button
            style={{
              borderColor: color.Success,
              borderRadius: "5px",
              color: color.secondary2,
              backgroundColor: color.Success,
            }}
            onClick={() => {
              setCurrent(1);
              setFetchData(!fetchData);
            }}
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
            วันที่ลงทะเบียน
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
              }}
              onClick={() => {
                setSortField("createdAt");
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
      dataIndex: "createdAt",
      key: "createdAt",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <Row>
                <span className="text-dark-75  text-hover-primary mb-1 font-size-lg">
                  {formatDate(row.createdAt)}
                </span>
              </Row>
            </>
          ),
        };
      },
    },
    {
      title: () => {
        return (
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            ยี่ห้อโดรน
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
              }}
              onClick={() => {
                setSortField("droneBrand");
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
      dataIndex: "droneBrand",
      key: "droneBrand",
      render: (value: any, row: any, index: number) => {
        const filterDrone = row.drone.droneBrandId;
        let nameDrone = droneBrand?.filter((x) => x.id == filterDrone)[0];
        return {
          children: (
            <div className="container">
              <span className="text-dark-75  d-block font-size-lg">
                {nameDrone?.logoImagePath ? (
                  <Avatar
                    size={25}
                    src={nameDrone.logoImagePath}
                    style={{ marginRight: "5px" }}
                  />
                ) : (
                  <Avatar
                    size={25}
                    style={{ color: "#0068F4", backgroundColor: "#EFF2F9" }}
                  >
                    {nameDrone?.name.charAt(0)}
                  </Avatar>
                )}
                {nameDrone?.name}
              </span>
            </div>
          ),
        };
      },
    },
    {
      title: () => {
        return (
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            รุ่นโดรน
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
              }}
              onClick={() => {
                setSortField("series");
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
      dataIndex: "series",
      key: "series",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <Row>
                <span className="text-dark-75  text-hover-primary mb-1 font-size-lg">
                  {row.drone.series}
                </span>
              </Row>
            </>
          ),
        };
      },
    },
    {
      title: () => {
        return (
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            เลขตัวถัง
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
              }}
              onClick={() => {
                setSortField("serialNo");
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
      dataIndex: "serialNo",
      key: "serialNo",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span className="text-dark-75  text-hover-primary mb-1 font-size-lg">
                {row.serialNo ? row.serialNo : "-"}
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
                setSortField("firstname");
                setSortDirection((prev) => {
                  if (prev === "ASC") {
                    return "DESC";
                  } else if (prev === undefined) {
                    return "ASC";
                  } else {
                    return undefined;
                  }
                });
                setSortDirection5((prev) => {
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
                  color: sortDirection5 === "ASC" ? "#ffca37" : "white",
                }}
              />
              <CaretDownOutlined
                style={{
                  position: "relative",
                  bottom: 2,
                  color: sortDirection5 === "DESC" ? "#ffca37" : "white",
                }}
              />
            </div>
          </div>
        );
      },
      dataIndex: "firstname",
      key: "firstname",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div className="container">
              <span className="text-dark-75  d-block font-size-lg">
                {row.droner.firstname + " " + row.droner.lastname}
              </span>

              <span style={{ color: color.Grey, fontSize: 12 }}>
                {row.droner.dronerCode}
                {row.droner.nickname && (
                  <ShowNickName
                    data={row.droner.nickname}
                    menu="drone"
                    status={row.droner.status}
                  />
                )}
              </span>
            </div>
          ),
        };
      },
    },
    {
      title: "ใบอนุญาตนักบิน ",
      dataIndex: "file",
      key: "file",
      render: (value: any, row: any, index: number) => {
        let getLicenseDroner = row.file?.filter(
          (x: { category: string }) => x.category == "DRONER_LICENSE"
        );
        const previewLicenseDroner = async () => {
          let src = getLicenseDroner[0].path;
          UploadImageDatasouce.getImage(src.toString()).then((resImg) => {
            const image = new Image();
            image.src = resImg.url;
            const imgWindow = window.open(src);
            imgWindow?.document.write(image.outerHTML);
          });
        };
        return {
          children: (
            <>
              <Row>
                {getLicenseDroner != false ? (
                  <div
                    className="text-left"
                    style={{
                      cursor: "pointer",
                      color: color.Success,
                      textDecorationLine: "underline",
                    }}
                  >
                    <FileTextFilled />
                    <text onClick={previewLicenseDroner}>ใบอนุญาตนักบิน</text>
                  </div>
                ) : (
                  "-"
                )}
              </Row>
            </>
          ),
        };
      },
    },
    {
      title: "ใบอนุญาตโดรน(กสทช.) ",
      dataIndex: "licenseDrone",
      key: "licenseDrone",
      render: (value: any, row: any, index: number) => {
        let getLicenseDrone = row.file?.filter(
          (x: { category: string }) => x.category == "DRONE_LICENSE"
        );
        const previewLicenseDrone = async () => {
          let src = getLicenseDrone[0].path;
          UploadImageDatasouce.getImage(src.toString()).then((resImg) => {
            const image = new Image();
            image.src = resImg.url;
            const imgWindow = window.open(src);
            imgWindow?.document.write(image.outerHTML);
          });
        };
        return {
          children: (
            <>
              <Row>
                {getLicenseDrone != false ? (
                  <div
                    className="text-left"
                    style={{
                      cursor: "pointer",
                      color: color.Success,
                      textDecorationLine: "underline",
                    }}
                  >
                    <FileTextFilled />
                    <text onClick={previewLicenseDrone}>
                      ใบอนุญาตโดรน(กสทช.)
                    </text>
                  </div>
                ) : (
                  "-"
                )}
              </Row>
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
        const countDay = () => {
          if (row.dateWaitPending != null) {
            const nowDate = new Date(Date.now());
            const rowDate = new Date(row.dateWaitPending);
            const diffTime = nowDate.getTime() - rowDate.getTime();
            let diffDay = Math.floor(diffTime / (1000 * 3600 * 24));
            diffDay = diffDay === 0 ? 1 : diffDay;
            return `(รอไปแล้ว ${diffDay} วัน)`;
          }
        };
        return {
          children: (
            <>
              <span style={{ color: STATUS_COLOR[row.status] }}>
                <Badge color={STATUS_COLOR[row.status]} />{" "}
                {DRONER_DRONE_MAPPING[row.status]}
                <br />
              </span>
              <span style={{ color: color.Grey }}>
                {row.status == "PENDING" ? countDay() : null}
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
                onClick={() => navigate("/EditDroneList?=" + row.id)}
              />
            </div>
          ),
        };
      },
    },
  ];
  let emptyState = {
    emptyText: (
      <div style={{ textAlign: "center", padding: "10%" }}>
        <img src={image.empty_table_drone} style={{ width: 90, height: 90 }} />
        <p>ยังไม่มีข้อมูลโดรน</p>
      </div>
    ),
  };
  return (
    <>
      {PageTitle}
      <br />
      <Spin tip="กำลังโหลดข้อมูล..." size="large" spinning={loading}>
        <Table
          locale={emptyState}
          columns={columns}
          dataSource={droneList?.data}
          pagination={false}
          scroll={{ x: "max-content" }}
          rowClassName={(a) =>
            a.status === "PENDING" &&
            a.dateWaitPending != null &&
            moment(Date.now()).diff(
              moment(new Date(a.dateWaitPending)),
              "day"
            ) >= 3
              ? "PENDING" &&
                moment(Date.now()).diff(
                  moment(new Date(a.dateWaitPending)),
                  "day"
                ) >= 7
                ? "table-row-older"
                : "table-row-old"
              : "table-row-lasted"
          }
        />
      </Spin>

      <div className="d-flex justify-content-between pt-3 pb-3">
        <p>รายการทั้งหมด {droneList?.count} รายการ</p>
        <Pagination
          current={current}
          total={droneList?.count}
          onChange={onChangePage}
          pageSize={row}
          showSizeChanger
          onShowSizeChange={onShowSizeChange}
        />
      </div>
    </>
  );
}

export default DroneList;
