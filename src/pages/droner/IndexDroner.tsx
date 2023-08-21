import {
  Avatar,
  Badge,
  Button,
  Checkbox,
  Col,
  Dropdown,
  Image,
  Input,
  Menu,
  Pagination,
  PaginationProps,
  Popover,
  Row,
  Select,
  Spin,
  Table,
} from "antd";
import React, { useEffect, useState } from "react";
import color from "../../resource/color";
import {
  CaretDownOutlined,
  CaretUpOutlined,
  DownOutlined,
  EditOutlined,
  InfoCircleFilled,
  SearchOutlined,
  StarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import ActionButton from "../../components/button/ActionButton";
import { DronerListEntity } from "../../entities/DronerEntities";
import { DronerDatasource } from "../../datasource/DronerDatasource";
import { LocationDatasource } from "../../datasource/LocationDatasource";
import {
  DistrictEntity,
  ProviceEntity,
  SubdistrictEntity,
} from "../../entities/LocationEntities";
import moment from "moment";
import AddButtton from "../../components/button/AddButton";
import { DroneDatasource } from "../../datasource/DroneDatasource";
import { useNavigate, useSearchParams } from "react-router-dom";
import StatusButton from "../../components/button/StatusButton";
import StatusPlots from "../../components/card/StatusPlots";
import { numberWithCommas } from "../../utilities/TextFormatter";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import { icon, image } from "../../resource";
import {
  STATUS_COLOR_MAPPING,
  STATUS_FARMER_MAPPING,
} from "../../definitions/Status";
import CheckDocument from "../../components/dropdownCheck/CheckDocument";
import { ListCheck } from "../../components/dropdownCheck/ListStatusAppType";

function IndexDroner() {
  const [row, setRow] = useState(10);
  const [current, setCurrent] = useState(1);
  const [data, setData] = useState<DronerListEntity>();
  const [searchText, setSearchText] = useState<string>();
  const [searchProvince, setSearchProvince] = useState<any>();
  const [searchDistrict, setSearchDistrict] = useState<any>();
  const [searchSubdistrict, setSearchSubdistrict] = useState<any>();
  const [province, setProvince] = useState<ProviceEntity[]>([]);
  const [district, setDistrict] = useState<DistrictEntity[]>([]);
  const [subdistrict, setSubdistrict] = useState<SubdistrictEntity[]>([]);
  const [mainStatus, setMainStatus] = useState<any>("PENDING");
  const [sumPlotCard, setSumPlotCard] = useState<any>({
    card1: "รอตรวจสอบ",
    card2: "ไม่อนุมัติ",
    card3: "ข้อมูลไม่ครบถ้วน",
  });
  const [loading, setLoading] = useState(false);
  const [appType, setAppType] = useState<any>();
  const [visibleStatus, setVisibleStatus] = useState(false);
  const [appTypeArr, setAppTypeArr] = useState<string[]>([]);
  const [checkDocArr, setCheckDocArr] = useState<string[]>([]);
  const [indeterminatePending, setIndeterminatePending] = useState(false);
  const [checkAllPending, setCheckAllPending] = useState(false);
  const [statusArr, setStatusArr] = useState<string[]>([]);
  const [statusArrMain, setStatusArrMain] = useState<string[]>([]);
  const [waitPendingDate, setWaitPendingDate] = useState<any>();
  const statusListPend = ["FIRST", "SECOND", "THIRD"];
  const [searchStatus, setSearchStatus] = useState<any>();
  const [documentPersons, setDocumentPersons] = useState<any>();
  const [summary, setSummary] = useState<any>();
  const [sortDirection, setSortDirection] = useState<string | undefined>();
  const [sortField, setSortField] = useState<string | undefined>();
  const navigate = useNavigate();
  const [sortDirection1, setSortDirection1] = useState<string | undefined>(
    undefined
  );
  const [sortDirection2, setSortDirection2] = useState<string | undefined>(
    undefined
  );
  const [sortDirection3, setSortDirection3] = useState<string | undefined>(
    undefined
  );
  const fetchDronerList = async () => {
    setLoading(true);
    await DronerDatasource.getDronerList(
      mainStatus,
      waitPendingDate,
      appType,
      current,
      row,
      searchStatus,
      searchText,
      searchProvince,
      searchDistrict,
      searchSubdistrict,
      documentPersons,
      sortDirection,
      sortField
    )
      .then((res) => {
        setData(res);
        setSummary(res.summary[0]);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
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
  useEffect(() => {
    fetchDronerList();
    fetchProvince();
  }, [sortDirection, current, mainStatus, row]);

  const handleSearchText = (e: any) => {
    setSearchText(e.target.value);
  };
  const handleSearchProvince = (provinceId: any) => {
    if (!provinceId) {
      setSearchDistrict(undefined);
      setSearchSubdistrict(undefined);
    }
    setSearchProvince(provinceId);
    fetchDistrict(provinceId);
  };
  const handleSearchDistrict = (districtId: any) => {
    if (!districtId) {
      setSearchSubdistrict(undefined);
    }
    fetchSubdistrict(districtId);
    setSearchDistrict(districtId);
  };
  const handleSearchSubdistrict = (subdistrictId: any) => {
    setSearchSubdistrict(subdistrictId);
  };
  const onChangePage = (page: number) => {
    setCurrent(page);
  };
  const CheckStatus = (e: any) => {
    if (e.target.value === "PENDING") {
      setSearchStatus(undefined);
      setWaitPendingDate(undefined);
      setSumPlotCard({
        card1: "รอตรวจสอบ",
        card2: "ไม่อนุมัติ",
        card3: "ข้อมูลไม่ครบถ้วน",
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
      if (d.length === 0) {
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
  const handleVisibleStatus = (newVisible: any) => {
    setVisibleStatus(newVisible);
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
                      1-2 วัน
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
              key: "2",
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
              key: "3",
            }
          : {
              label: (
                <>
                  <Checkbox onClick={onSearchStatus} value="INACTIVE">
                    ปิดการใช้งาน
                  </Checkbox>
                </>
              ),
              key: "4",
            },
        mainStatus === "PENDING"
          ? {
              label: (
                <>
                  <Checkbox onClick={onSearchStatus} value="OPEN">
                    ข้อมูลไม่ครบถ้วน
                  </Checkbox>
                </>
              ),
              key: "5",
            }
          : null,
      ]}
    />
  );
  const onSearchCreateBy = (e: any) => {
    let value = e.target.value;
    let checked = e.target.checked;
    let arr: any = 0;
    if (checked === true) {
      arr = [...appTypeArr, value];
      setAppTypeArr([...appTypeArr, value]);
      setAppType(value);
    } else {
      let d: string[] = appTypeArr.filter((x) => x != value);
      arr = [...d];
      setAppTypeArr(d);
      if (d.length === 0) {
        arr = undefined;
      }
    }
    setAppType(arr);
  };
  const onSearchCheckDocument = (e: any) => {
    let value = e.target.value;
    let checked = e.target.checked;
    let arr: any = 0;
    if (checked === true) {
      arr = [...checkDocArr, value];
      setCheckDocArr([...checkDocArr, value]);
      setDocumentPersons(value);
    } else {
      let d: string[] = checkDocArr.filter((x) => x != value);
      arr = [...d];
      setCheckDocArr(d);
      if (d.length === 0) {
        arr = undefined;
      }
    }
    setDocumentPersons(arr);
  };
  const PageTitle = (
    <>
      <div
        className="d-flex justify-content-between"
        style={{ padding: "10px" }}
      >
        <div>
          <span
            className="card-label font-weight-bolder text-dark"
            style={{
              fontSize: 22,
              fontWeight: "bold",
              padding: "8px",
            }}
          >
            <strong>รายชื่อนักบินโดรน (Droner)</strong>
          </span>
        </div>
        <StatusButton
          label1={mainStatus}
          label2={mainStatus}
          onClick={(e: any) => CheckStatus(e)}
        />
        <div>
          <AddButtton
            text="เพิ่มนักบินโดรน"
            onClick={() => navigate("/AddDroner")}
          />
        </div>
      </div>
      <StatusPlots
        checkPage="DronerPage"
        title1={sumPlotCard?.card1}
        title2={sumPlotCard?.card2}
        title3={sumPlotCard?.card3}
        status={mainStatus}
        bgColor1={
          sumPlotCard?.card1 === "รอตรวจสอบ" ? color.Warning : color.Success
        }
        bgColor2={
          sumPlotCard?.card2 === "ไม่อนุมัติ" ? color.Grey : color.Error
        }
        bgColor3={
          sumPlotCard?.card3 === "ข้อมูลไม่ครบถ้วน" ? color.Disable : "none"
        }
        countPlot1={
          mainStatus === "PENDING"
            ? numberWithCommas(summary?.count_pending) + " คน"
            : numberWithCommas(summary?.count_active) + " คน"
        }
        countPlot2={
          mainStatus === "ACTIVE"
            ? numberWithCommas(summary?.count_inactive) + " คน"
            : numberWithCommas(summary?.count_reject) + " คน"
        }
        countPlot3={
          mainStatus === "PENDING"
            ? numberWithCommas(summary?.count_open) + " คน"
            : null
        }
      />
      <div
        className="d-flex justify-content-between"
        style={{ padding: "8px", textAlign: "center" }}
      >
        <div className="col-lg-2 pt-1">
          <Input
            allowClear
            prefix={<SearchOutlined style={{ color: color.Disable }} />}
            placeholder="ค้นหาชื่อนักบิน/เบอร์โทร/ID นักบินโดรน"
            className="col-lg-12 p-1"
            onChange={handleSearchText}
          />
        </div>
        <div className="col-lg">
          <Select
            allowClear
            className="col-lg-12 p-1"
            placeholder="เลือกจังหวัด"
            onChange={handleSearchProvince}
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
            onChange={handleSearchDistrict}
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
            disabled={!searchProvince}
            value={!searchProvince ? "เลือกอำเภอ" : undefined}
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
            onChange={handleSearchSubdistrict}
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
            value={!searchDistrict ? "เลือกตำบล" : undefined}
          >
            {subdistrict?.map((item) => (
              <option value={item.subdistrictId.toString()}>
                {item.subdistrictName}
              </option>
            ))}
          </Select>
        </div>
        <div className="col-lg" style={{ paddingRight: 3 }}>
          <ListCheck
            onSearchType={(e) => onSearchCreateBy(e)}
            list={appType}
            title="เลือกรูปแบบการสร้าง"
            menu="DRONER"
          />
        </div>
        <div className="col-lg" style={{ paddingRight: 3 }}>
          <CheckDocument
            onSearchType={(e) => onSearchCheckDocument(e)}
            list={documentPersons}
            title="เลือกการตรวจเอกสาร"
          />
        </div>
        <div className="col-lg pt-1" style={{ paddingRight: 3 }}>
          <Dropdown
            overlay={SubStatus}
            trigger={["click"]}
            className="col-lg-12"
            onVisibleChange={handleVisibleStatus}
            visible={visibleStatus}
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
            onClick={() => {
              setCurrent(1);
              fetchDronerList();
            }}
          >
            ค้นหาข้อมูล
          </Button>
        </div>
      </div>
    </>
  );
  const onShowSizeChange: PaginationProps["onShowSizeChange"] = (
    current,
    pageSize
  ) => {
    setCurrent(current);
    setRow(pageSize);
  };
  const columns = [
    {
      title: () => {
        return (
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            อัพเดตล่าสุด
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
              }}
              onClick={() => {
                setSortField("updatedAt");
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
      key: "updatedAt",

      render: (value: { updatedAt: string; updateBy?: string }) => {
        return {
          children: (
            <div className="container">
              <span className="text-dark-75  d-block font-size-lg">
                {moment(value.updatedAt).format("DD/MM/YYYY HH:mm")}
              </span>
              <div>
                <span
                  className=" d-block font-size-lg"
                  style={{ color: color.Grey }}
                >
                  <UserOutlined
                    style={{ padding: "0 4px 0 0", verticalAlign: 0.5 }}
                  />
                  {value?.updateBy ? value?.updateBy : "-"}
                </span>
              </div>
            </div>
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
      dataIndex: "firstname",
      key: "firstname",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div className="container">
              <span className="text-dark-75  d-block font-size-lg">
                {row.firstname + " " + row.lastname}
              </span>
              <span style={{ color: color.Grey, fontSize: 12 }}>
                {row.dronerCode}
              </span>
            </div>
          ),
        };
      },
    },
    {
      title: "เบอร์โทร",
      dataIndex: "telephoneNo",
      key: "telephoneNo",
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{row.telephoneNo ? row.telephoneNo : "-"}</span>,
        };
      },
    },
    {
      title: "ที่อยู่",
      dataIndex: "address",
      key: "address",
      render: (value: any, row: any, index: number) => {
        const subdistrict =
          row.address !== null ? row.address.subdistrict : null;
        const district = row.address !== null ? row.address.district : null;
        const province = row.address !== null ? row.address.province : null;

        return {
          children: (
            <span className="text-dark-75  d-block font-size-lg">
              {subdistrict ? subdistrict.subdistrictName + "/" : "-/"}
              {district ? district.districtName + "/" : "-/"}
              {province ? province.provinceName : "-"}
            </span>
          ),
        };
      },
    },
    {
      title: "ตรวจเอกสาร",
      dataIndex: "",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <div>
                <Image
                  src={row.file.length > 0 ? icon.check : icon.cancel}
                  preview={false}
                  style={{ width: 18, height: 18, marginRight: 6 }}
                />
                บัตรประชาชน
              </div>
              <div>
                <Image
                  src={row.isBookBank === true ? icon.check : icon.cancel}
                  preview={false}
                  style={{ width: 18, height: 18, marginRight: 6 }}
                />
                สมุดบัญชี
              </div>
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
              {row.applicationType === "BO" && (
                <>
                  <Image
                    src={icon.bo}
                    preview={false}
                    style={{ width: 24, height: 24 }}
                  />
                  <span> {row.createBy ? row.createBy + ` (Admin)` : "-"}</span>
                </>
              )}
              {row.applicationType === "DRONER" && (
                <>
                  <Image
                    src={icon.dronerApp}
                    preview={false}
                    style={{ width: 24, height: 24 }}
                  />
                  <span> {row.firstname + " " + row.lastname}</span>
                </>
              )}
            </>
          ),
        };
      },
    },
    {
      title: () => {
        return (
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            จำนวนโดรน
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
              }}
              onClick={() => {
                setSortField("totalDroneCount");
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
      dataIndex: "totalDroneCount",
      key: "totalDroneCount",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div className="container">
              <span className="text-dark-75  d-block font-size-lg">
                {row.totalDroneCount + " เครื่อง"}
              </span>
            </div>
          ),
        };
      },
    },
    {
      title: "ยี่ห้อ",
      dataIndex: "brand",
      key: "brand",
      render: (value: any, row: any, index: number) => {
        const droneLatest = row.dronerDrone[0];
        return {
          children: (
            <div className="container">
              <span className="text-dark-75  d-block font-size-lg">
                {droneLatest ? (
                  <div style={{ borderColor: "yellow" }}>
                    <Avatar
                      size={25}
                      src={droneLatest.drone.droneBrand.logoImagePath}
                      style={{ marginRight: "5px" }}
                    />
                  </div>
                ) : (
                  "-"
                )}
                {droneLatest !== undefined
                  ? droneLatest.drone.droneBrand.name
                  : null}
              </span>
              <span style={{ color: color.Grey, fontSize: "12px" }}>
                {row.dronerDrone.length > 1 ? "(มากกว่า 1 ยี่ห้อ)" : null}
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
        let checkProfile = ![
          row.firstname,
          row.lastname,
          row.telephoneNo,
        ].includes("");
        return {
          children: (
            <>
              <span style={{ color: STATUS_COLOR_MAPPING[row.status] }}>
                <Badge color={STATUS_COLOR_MAPPING[row.status]} />{" "}
                {STATUS_FARMER_MAPPING[row.status]}
                {row.status === "PENDING" && (
                  <Popover
                    title={
                      <span
                        style={{
                          color: color.White,
                        }}
                      >
                        ตรวจสอบข้อมูลนักบินโดรน
                      </span>
                    }
                    content={
                      <>
                        <div>
                          <Image
                            src={
                              checkProfile === true && row.birthDate
                                ? icon.check
                                : icon.cancel
                            }
                            preview={false}
                            style={{ width: 20, height: 20 }}
                          />
                          <span> ข้อมูลส่วนตัว</span>
                        </div>
                        <div>
                          <Image
                            src={row.dronerArea?.id ? icon.check : icon.cancel}
                            preview={false}
                            style={{ width: 20, height: 20 }}
                          />
                          <span> พื้นที่ให้บริการ</span>
                        </div>
                        <div>
                          <Image
                            src={
                              row.dronerDrone.length > 0
                                ? icon.check
                                : icon.cancel
                            }
                            preview={false}
                            style={{ width: 20, height: 20 }}
                          />
                          <span> ข้อมูลโดรน</span>
                        </div>
                        <div>
                          <Image
                            src={row.expPlant ? icon.check : icon.cancel}
                            preview={false}
                            style={{ width: 20, height: 20 }}
                          />
                          <span> พืชที่ฉีดพ่น</span>
                        </div>
                      </>
                    }
                  >
                    <InfoCircleFilled
                      style={{
                        color: color.Warning,
                        fontSize: "15px",
                        marginLeft: "7px",
                        verticalAlign: 0.5,
                      }}
                    />
                  </Popover>
                )}
                <br />
              </span>
              <span style={{ color: color.Grey }}>
                {row.status === "PENDING" && row.dateWaitPending != null
                  ? countDay()
                  : null}
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
            <Row justify={"space-between"} gutter={8}>
              <Col span={12}>
                <ActionButton
                  icon={<StarOutlined />}
                  color={color.primary1}
                  onClick={() =>
                    navigate("/DetailDronerHistorySum/id=" + row.id)
                  }
                />
              </Col>
              <Col span={12}>
                <ActionButton
                  icon={<EditOutlined />}
                  color={color.primary1}
                  onClick={() => {
                    navigate("/EditDroner?=" + row.id);
                  }}
                />
              </Col>
            </Row>
          ),
        };
      },
    },
  ];

  let emptyState = {
    emptyText: (
      <div style={{ textAlign: "center", padding: "10%" }}>
        <Image
          src={image.empty_table_droner}
          preview={false}
          style={{ width: 90, height: 90 }}
        />
        <p>ยังไม่มีข้อมูลนักบินโดรน</p>
      </div>
    ),
  };
  return (
    <>
      {PageTitle}
      <Spin tip="กำลังโหลดข้อมูล..." size="large" spinning={loading}>
        <Table
          locale={emptyState}
          columns={columns}
          dataSource={data?.data}
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
        <p>รายการทั้งหมด {data?.count} รายการ</p>
        <Pagination
          current={current}
          showSizeChanger
          onChange={onChangePage}
          onShowSizeChange={onShowSizeChange}
          total={data?.count}
        />
      </div>
    </>
  );
}
export default IndexDroner;
