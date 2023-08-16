import {
  Avatar,
  Badge,
  Button,
  Checkbox,
  Dropdown,
  Input,
  Menu,
  Pagination,
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
import { DroneEntity } from "../../entities/DroneEntities";
import { DronerDroneListEntity } from "../../entities/DronerDroneEntities";
import color from "../../resource/color";
import { formatDate, numberWithCommas } from "../../utilities/TextFormatter";
import {
  DownOutlined,
  EditOutlined,
  FileTextFilled,
  SearchOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import StatusButton from "../../components/button/StatusButton";
import StatusPlots from "../../components/card/StatusPlots";
import { CheckboxValueType } from "antd/lib/checkbox/Group";

function DroneList() {
  const navigate = useNavigate();
  const row = 10;
  const [current, setCurrent] = useState(1);
  const [droneList, setDroneList] = useState<DronerDroneListEntity>();
  const [droneBrand, setDroneBrand] = useState<DroneBrandEntity[]>();
  const [seriesDrone, setSeriesDrone] = useState<DroneEntity[]>();
  const [droneBrandId, setDroneBrandId] = useState<string>();
  const [searchSeriesDrone, setSearchSeriesDrone] = useState<any>();
  const [searchStatus, setSearchStatus] = useState<string>();
  const [searchText, setSearchText] = useState<string>();
  const [mainStatus, setMainStatus] = useState<any>("PENDING");
  const [waitPendingDate, setWaitPendingDate] = useState<any>();
  const [sumPlotCard, setSumPlotCard] = useState<any>({
    card1: "รอตรวจสอบ",
    card2: "ไม่อนุมัติ",
  });
  const [loading, setLoading] = useState(false);
  const [visibleStatus, setVisibleStatus] = useState(false);
  const [indeterminatePending, setIndeterminatePending] = useState(false);
  const [checkAllPending, setCheckAllPending] = useState(false);
  const [statusArr, setStatusArr] = useState<string[]>([]);
  const statusListPend = ["FIRST", "SECOND", "THIRD"];
  const [statusArrMain, setStatusArrMain] = useState<string[]>([]);

  const fetchDronerDroneList = async () => {
    setLoading(true);
    await DronerDroneDatasource.getDronerDrone(
      current,
      row,
      searchStatus,
      searchSeriesDrone,
      droneBrandId,
      searchText
    )
      .then((res) => {
        setDroneList(res);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };
  const fetchDroneList = async () => {
    await DroneDatasource.getDroneList(current, row, droneBrandId).then(
      (res) => {
        setSeriesDrone(res.data);
      }
    );
  };
  const fetchDroneBrand = async () => {
    await DroneDatasource.getDroneBrandList().then((res) => {
      setDroneBrand(res.data);
    });
  };
  useEffect(() => {
    fetchDronerDroneList();
    fetchDroneList();
    fetchDroneBrand();
  }, [current, row]);

  const onChangePage = (page: number) => {
    setCurrent(page);
  };
  const changeTextSearch = (value: any) => {
    setSearchText(value.target.value);
    setCurrent(1);
  };
  const handleDroneBrand = (droneBrand: string) => {
    setDroneBrandId(droneBrand);
    setCurrent(1);
  };
  const handleDroneSeries = (seriesDrone: string) => {
    setSearchSeriesDrone(seriesDrone);
    setCurrent(1);
  };
  const handleStatus = (status: any) => {
    setSearchStatus(status);
    setCurrent(1);
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
  const handleVisibleStatus = (newVisible: any) => {
    setVisibleStatus(newVisible);
  };
  const onCheckAllPending = (e: any) => {
    let value = e.target.value;
    let checked = e.target.checked;
    let arr: any = 0;
    if (checked === true) {
      arr = [...statusArr, value];
      setStatusArr([...statusArr, value]);
      setSearchStatus(value);
    } else {
      let d: string[] = statusArr.filter((x) => x != value);
      arr = [...d];
      setStatusArr(d);
      if (d.length == 0) {
        arr = undefined;
      }
    }
    setSearchStatus(arr);
    setWaitPendingDate(e.target.checked ? statusListPend : []);
    setIndeterminatePending(false);
    setCheckAllPending(e.target.checked);
  };
  const onChangeListPending = (list: CheckboxValueType[]) => {
    setSearchStatus(undefined);
    let arr: any = 0;
    arr = [...list];
    setWaitPendingDate(list);
    setIndeterminatePending(
      !!list.length && list.length < statusListPend.length
    );
    setCheckAllPending(list.length === statusListPend.length);
  };
  const onSearchStatus = (e: any) => {
    let value = e.target.value;
    let checked = e.target.checked;
    let arr: any = 0;
    if (checked === true) {
      arr = [...statusArrMain, value];
      setStatusArrMain([...statusArrMain, value]);
      setSearchStatus(value);
    } else {
      let d: string[] = statusArrMain.filter((x) => x != value);
      arr = [...d];
      setStatusArrMain(d);
      if (d.length == 0) {
        arr = undefined;
      }
    }
    setSearchStatus(arr);
  };
  const SubStatus = (
    <Menu
      items={[
        mainStatus === "PENDING"
          ? {
              label: (
                <>
                  <Checkbox
                    indeterminate={indeterminatePending}
                    onChange={onCheckAllPending}
                    checked={checkAllPending}
                    value="PENDING"
                  >
                    รอตรวจสอบ
                  </Checkbox>
                  <br />
                  <Checkbox.Group
                    value={waitPendingDate}
                    style={{ width: "100%" }}
                    onChange={onChangeListPending}
                  >
                    <Checkbox style={{ marginLeft: "20px" }} value="FIRST">
                      0-2 วัน
                    </Checkbox>
                    <br />
                    <Checkbox style={{ marginLeft: "20px" }} value="SECOND">
                      3-6 วัน
                    </Checkbox>
                    <br />
                    <Checkbox style={{ marginLeft: "20px" }} value="THIRD">
                      7 วันขึ้นไป
                    </Checkbox>
                  </Checkbox.Group>
                </>
              ),
              key: "1",
            }
          : {
              label: (
                <>
                  <Checkbox onClick={onSearchStatus} value="ACTIVE">
                    ใช้งาน
                  </Checkbox>
                </>
              ),
              key: "1",
            },
        mainStatus === "PENDING"
          ? {
              label: (
                <>
                  <Checkbox onClick={onSearchStatus} value="REJECTED">
                    ไม่อนุมัติ
                  </Checkbox>
                </>
              ),
              key: "2",
            }
          : {
              label: (
                <>
                  <Checkbox onClick={onSearchStatus} value="INACTIVE">
                    ปิดการใช้งาน
                  </Checkbox>
                </>
              ),
              key: "2",
            },
      ]}
    />
  );
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
            ? numberWithCommas(100) + " คัน"
            : numberWithCommas(100) + " คัน"
        }
        countPlot2={
          mainStatus === "ACTIVE"
            ? numberWithCommas(100) + " คัน"
            : numberWithCommas(100) + " คัน"
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
          >
            {seriesDrone?.map((item: any) => (
              <option value={item.id.toString()}>{item.series}</option>
            ))}
          </Select>
        </div>
        <div className="col-lg pt-1 p-1">
          <Dropdown
            overlay={SubStatus}
            trigger={["click"]}
            className="col-lg-12 p-1"
            onVisibleChange={handleVisibleStatus}
            visible={visibleStatus}
          >
            <Button style={{ color: color.Disable }}>
              เลือกสถานะ
              <DownOutlined style={{ verticalAlign: 2 }} />
            </Button>
          </Dropdown>
        </div>
        <div className="p-1">
          <Button
            style={{
              borderColor: color.Success,
              borderRadius: "5px",
              color: color.secondary2,
              backgroundColor: color.Success,
            }}
            onClick={fetchDronerDroneList}
          >
            ค้นหาข้อมูล
          </Button>
        </div>
      </div>
    </>
  );
  const columns = [
    {
      title: "วันที่ลงทะเบียน",
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
      title: "ยี่ห้อโดรน",
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
      title: "รุ่นโดรน",
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
      title: "เลขตัวถัง",
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
      title: "ชื่อนักบินโดรน",
      dataIndex: "named",
      key: "named",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <Row>
                <span className="text-dark-75  text-hover-primary mb-1 font-size-lg">
                  {row.droner.firstname + " " + row.droner.lastname}
                </span>
              </Row>
            </>
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
          let dateToday: any = moment(Date.now());
          let createDate: any = moment(new Date(row.createdAt));
          let dateDiff = dateToday.diff(createDate, "day");
          let textDateDiff =
            dateDiff == 0 ? null : "(รอไปแล้ว " + dateDiff + " วัน)";
          return textDateDiff;
        };
        return {
          children: (
            <>
              <span style={{ color: STATUS_COLOR[row.status] }}>
                <Badge color={STATUS_COLOR[row.status]} />
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

  return (
    <>
      {PageTitle}
      <br />
      <Spin tip="กำลังโหลดข้อมูล..." size="large" spinning={loading}>
        <Table
          columns={columns}
          dataSource={droneList?.data}
          pagination={false}
          scroll={{ x: "max-content" }}
          rowClassName={(a) =>
            a.status == "PENDING" &&
            moment(Date.now()).diff(moment(new Date(a.createdAt)), "day") >= 3
              ? "PENDING" &&
                moment(Date.now()).diff(moment(new Date(a.createdAt)), "day") >=
                  7
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
          showSizeChanger={false}
        />
      </div>
    </>
  );
}

export default DroneList;
