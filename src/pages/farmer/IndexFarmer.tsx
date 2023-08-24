import {
  Badge,
  Button,
  Checkbox,
  ConfigProvider,
  Dropdown,
  Image,
  Input,
  Menu,
  MenuProps,
  Pagination,
  PaginationProps,
  Popover,
  Row,
  Select,
  Spin,
  Table,
} from "antd";
import React, { useEffect, useState } from "react";
import { Option } from "antd/lib/mentions";
import color from "../../resource/color";
import ActionButton from "../../components/button/ActionButton";
import {
  CaretDownOutlined,
  CaretUpOutlined,
  DownOutlined,
  EditOutlined,
  FolderViewOutlined,
  InfoCircleFilled,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import AddButtton from "../../components/button/AddButton";
import { CardContainer } from "../../components/card/CardContainer";
import { FarmerPageEntity } from "../../entities/FarmerEntities";
import { FarmerDatasource } from "../../datasource/FarmerDatasource";
import {
  FARMER_STATUS_SEARCH,
  STATUS_COLOR_MAPPING,
  STATUS_FARMER_MAPPING,
} from "../../definitions/Status";
import moment from "moment";
import { LocationDatasource } from "../../datasource/LocationDatasource";
import {
  DistrictEntity,
  ProviceEntity,
  SubdistrictEntity,
} from "../../entities/LocationEntities";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffectOnce } from "../../hook/useEffectOnce";
import SearchDebounce from "../../components/searchDebounce/SearchDebounce";
import StatusPlots from "../../components/card/StatusPlots";
import StatusButton from "../../components/button/StatusButton";
import icon from "../../resource/icon";
import { numberWithCommas } from "../../utilities/TextFormatter";
import { image } from "../../resource";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import { STATUS_NORMAL_MAPPING } from "../../definitions/Status";
import { ListCheck } from "../../components/dropdownCheck/ListStatusAppType";
import { DropdownStatus } from "../../components/dropdownCheck/DropDownStatus";

interface SearchSelectType {
  label: any;
  value: any;
}
function IndexFarmer() {
  const [current, setCurrent] = useState(1);
  const navigate = useNavigate();
  const [data, setData] = useState<FarmerPageEntity>();
  const [searchStatus, setSearchStatus] = useState<any>();
  const [searchText, setSearchText] = useState<string>("");
  const [searchProvince, setSearchProvince] = useState<any>();
  const [searchDistrict, setSearchDistrict] = useState<any>();
  const [searchSubdistrict, setSearchSubdistrict] = useState<any>();
  const [province, setProvince] = useState<ProviceEntity[]>();
  const [district, setDistrict] = useState<DistrictEntity[]>();
  const [subdistrict, setSubdistrict] = useState<SubdistrictEntity[]>();
  const [sortDirection, setSortDirection] = useState<string | undefined>();
  const [sortField, setSortField] = useState<string | undefined>();
  const statusListPend = ["FIRST", "SECOND", "THIRD"];
  const [appTypeArr, setAppTypeArr] = useState<string[]>([]);
  const [row, setRow] = useState(10);
  const [loading, setLoading] = useState(false);
  const [searchQuery] = useSearchParams();
  const [sumPlotCard, setSumPlotCard] = useState<any>({
    card1: "รอตรวจสอบ",
    card2: "ไม่อนุมัติ",
    card3: "ข้อมูลไม่ครบถ้วน",
  });
  const [mainStatus, setMainStatus] = useState<any>("PENDING");
  const [waitPendingDate, setWaitPendingDate] = useState<any>();
  const [appType, setAppType] = useState<any>();
  const [summary, setSummary] = useState<any>();
  const [statusArr, setStatusArr] = useState<string[]>([]);
  const [statusArrMain, setStatusArrMain] = useState<string[]>([]);
  const [sortDirection1, setSortDirection1] = useState<string | undefined>(
    undefined
  );
  const [sortDirection2, setSortDirection2] = useState<string | undefined>(
    undefined
  );
  const [sortDirection3, setSortDirection3] = useState<string | undefined>(
    undefined
  );
  const [fetchData, setFetchData] = useState<boolean>(false);

  const fetchFarmer = async () => {
    setLoading(true);
    await FarmerDatasource.getFarmerList(
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
    LocationDatasource.getDistrict(searchProvince).then((res) => {
      setDistrict(res);
      setSearchDistrict(null);
    });
  }, [searchProvince]);
  useEffect(() => {
    LocationDatasource.getSubdistrict(searchDistrict).then((res) => {
      setSubdistrict(res);
      setSearchSubdistrict(null);
    });
  }, [searchDistrict]);
  useEffect(() => {
    fetchFarmer();
    fetchProvince();
  }, [sortDirection, mainStatus, current, fetchData]);

  const onChangePage = (page: number) => {
    setCurrent(page);
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

  const handleSearchText = (e: any) => {
    setSearchText(e.target.value);
  };
  const handleSearchProvince = (provinceId: any) => {
    const filterId = district?.map((x) => x.provinceId)[0];
    if (!provinceId || parseFloat(provinceId) !== filterId) {
      setSearchDistrict(undefined);
      setSearchSubdistrict(undefined);
      setSearchProvince(undefined);
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

  const onSearchCreateBy = (value: string, checked: boolean) => {
    let arr: any = 0;
    if (checked === true) {
      arr = [...appTypeArr, value];
      setAppTypeArr([...appTypeArr, value]);
      setAppType(value);
    } else {
      let d: string[] = appTypeArr.filter((x) => x !== value);
      arr = [...d];
      setAppTypeArr(d);
      if (d.length === 0) {
        arr = undefined;
      }
    }
    setAppType(arr);
  };
  const onShowSizeChange: PaginationProps["onShowSizeChange"] = (
    current,
    pageSize
  ) => {
    setCurrent(current);
    setRow(pageSize);
  };
  const pageTitle = (
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
            <strong>ข้อมูลเกษตรกร (Farmer)</strong>
          </span>
        </div>
        <StatusButton
          label1={mainStatus}
          label2={mainStatus}
          onClick={(e: any) => CheckStatus(e)}
        />
        <div>
          <AddButtton
            text="เพิ่มเกษตรกร"
            onClick={() => navigate("/AddFarmer")}
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
        <div className="col-lg-3 pt-1">
          <Input
            allowClear
            prefix={<SearchOutlined style={{ color: color.Disable }} />}
            placeholder="ค้นหาชื่อเกษตรกร/เบอร์โทร/ID เกษตรกร"
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
            value={searchDistrict}
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
            disabled={!searchDistrict}
            value={searchSubdistrict}
          >
            {subdistrict?.map((item) => (
              <option value={item.subdistrictId.toString()}>
                {item.subdistrictName}
              </option>
            ))}
          </Select>
        </div>
        <div className="col-lg-2">
          <ListCheck
            onSearchType={(value: any, checked: any) =>
              onSearchCreateBy(value, checked)
            }
            list={appType}
            title="เลือกรูปแบบการสร้าง"
            menu="FARMER"
          />
        </div>
        <div className="col-lg">
          <DropdownStatus
            title="เลือกสถานะ"
            mainStatus={mainStatus}
            onSearchType={(value: any, checked: any) =>
              onSearchStatus(value, checked)
            }
            list={searchStatus}
            menu="DRONER"
          />
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
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span>{moment(row.updatedAt).format("DD/MM/YYYY HH:mm")}</span>
              <br />
              <span style={{ color: color.Grey }}>
                <UserOutlined
                  style={{ padding: "4px 4px 0 0", verticalAlign: 1 }}
                />
                {row.updateBy ? row.updateBy : "-"}
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
      dataIndex: "fullname",
      key: "name",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span>{row.firstname + " " + row.lastname}</span>
              <br />
              <span style={{ color: color.Grey, fontSize: 12 }}>
                {row.farmerCode}
              </span>
            </>
          ),
        };
      },
    },
    {
      title: "เบอร์โทร",
      dataIndex: "telephoneNo",
      key: "telephoneNo",
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
      title: () => {
        return (
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            จำนวนไร่ (แปลง)
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
              }}
              onClick={() => {
                setSortField("totalRaiCount");
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
      dataIndex: "totalRaiCount",
      key: "totalRaiCount",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span>
                {row.totalRaiCount ? numberWithCommas(row.totalRaiCount) : 0}{" "}
                ไร่
              </span>
              <span>
                {" "}
                ({row.totalPlotCount
                  ? numberWithCommas(row.totalPlotCount)
                  : 0}{" "}
                แปลง)
              </span>
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
              {row.applicationType === "FARMER" && (
                <>
                  <Image
                    src={icon.farmerApp}
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
          row.birthDate,
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
                        ตรวจสอบข้อมูลเกษตรกร
                      </span>
                    }
                    content={
                      <>
                        <div>
                          <Image
                            src={
                              checkProfile === true ? icon.check : icon.cancel
                            }
                            preview={false}
                            style={{ width: 20, height: 20 }}
                          />
                          <span> ข้อมูลส่วนตัว</span>
                        </div>
                        <div>
                          <Image
                            src={
                              row.totalPlotCount != 0 ? icon.check : icon.cancel
                            }
                            preview={false}
                            style={{ width: 20, height: 20 }}
                          />
                          <span> แปลงเกษตร</span>
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
            <Row justify={"space-between"}>
              <ActionButton
                icon={
                  <Image
                    src={icon.folder_icon}
                    preview={false}
                    style={{ width: 22, height: 22 }}
                  />
                }
                color={color.primary1}
                onClick={() => navigate("/IndexFarmerHistorySum/id=" + row.id)}
              />
              <ActionButton
                icon={<EditOutlined />}
                color={color.primary1}
                onClick={() => navigate("/EditFarmer/id=" + row.id)}
              />
            </Row>
          ),
        };
      },
    },
  ];
  const customizeRenderEmpty = () => (
    <div style={{ textAlign: "center", padding: "10%" }}>
      <Image
        src={image.empty_table_farmer}
        preview={false}
        style={{ width: 70, height: 70 }}
      />
      <p>ไม่มีข้อมูลรายชื่อเกษตร</p>
    </div>
  );
  return (
    <>
      {pageTitle}
      <CardContainer>
        <Spin tip="กำลังโหลดข้อมูล..." size="large" spinning={loading}>
          <ConfigProvider renderEmpty={customizeRenderEmpty}>
            <Table
              dataSource={data?.data}
              columns={columns}
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
          </ConfigProvider>
        </Spin>
      </CardContainer>
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

export default IndexFarmer;
