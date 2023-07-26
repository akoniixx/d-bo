import { Avatar, Badge, Col, Pagination, Row, Select, Table } from "antd";
import React, { useEffect, useState } from "react";
import { Option } from "antd/lib/mentions";
import color from "../../resource/color";
import {
  CaretDownOutlined,
  CaretUpOutlined,
  EditOutlined,
  FolderViewOutlined,
  UserOutlined,
} from "@ant-design/icons";
import ActionButton from "../../components/button/ActionButton";
import { DronerListEntity } from "../../entities/DronerEntities";
import { DronerDatasource } from "../../datasource/DronerDatasource";
import {
  DRONER_STATUS,
  DRONER_STATUS_MAPPING,
  STATUS_COLOR,
} from "../../definitions/DronerStatus";
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
import { useEffectOnce } from "../../hook/useEffectOnce";
import SearchDebounce from "../../components/searchDebounce/SearchDebounce";
import { DashboardLayout } from "../../components/layout/Layout";

interface SearchSelectType {
  label: any;
  value: any;
}
function IndexDroner() {
  const row = 10;
  const [current, setCurrent] = useState(1);
  const [data, setData] = useState<DronerListEntity>();
  const [searchText, setSearchText] = useState<string>();
  const [searchStatus, setSearchStatus] = useState<SearchSelectType>({
    label: "ทั้งหมด",
    value: "ALL",
  });
  const [searchProvince, setSearchProvince] = useState<
    SearchSelectType | undefined
  >(undefined);
  const [searchDistrict, setSearchDistrict] = useState<
    SearchSelectType | undefined
  >(undefined);
  const [searchSubdistrict, setSearchSubdistrict] = useState<
    SearchSelectType | undefined
  >(undefined);
  const [searchDroneBrand, setSearchDroneBrand] = useState<
    SearchSelectType | undefined
  >(undefined);
  const [province, setProvince] = useState<ProviceEntity[]>([]);
  const [district, setDistrict] = useState<DistrictEntity[]>([]);
  const [subdistrict, setSubdistrict] = useState<SubdistrictEntity[]>([]);
  const genQuery = ({
    searchDistrict,
    searchDroneBrand,
    searchProvince,
    searchStatus,
    searchSubdistrict,
    searchText,
  }: {
    searchStatus?: string;
    searchText?: string;
    searchProvince?: string;
    searchDistrict?: string;
    searchSubdistrict?: string;
    searchDroneBrand?: string;
  }) => {
    const query: any = {};
    if (searchStatus) {
      query.status = searchStatus;
    }
    if (searchText) {
      query.searchText = searchText;
    }
    if (searchProvince) {
      query.province = searchProvince;
    }
    if (searchDistrict) {
      query.district = searchDistrict;
    }
    if (searchSubdistrict) {
      query.subdistrict = searchSubdistrict;
    }
    if (searchDroneBrand) {
      query.droneBrand = searchDroneBrand;
    }
    const queryString = Object.keys(query);
    if (queryString.length > 0) {
      return "?" + queryString.map((key) => key + "=" + query[key]).join("&");
    }
    return "";
  };

  const navigate = useNavigate();
  const [searchQuery] = useSearchParams();

  const [sortStatus, setSortStatus] = useState<string | undefined>(undefined);
  const [droneBrandId, setDroneBrandId] = useState<any>();
  useEffect(() => {
    fetchDronerList({
      sortField: sortStatus ? "updatedAt" : undefined,
      sortDirection: sortStatus,
    });
    if (searchProvince) {
      fetchDistrict();
    }
    if (searchDistrict) {
      fetchSubdistrict();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    current,
    sortStatus,

    searchText,
    searchStatus,
    searchProvince,
    searchDistrict,
    searchDroneBrand,
    searchSubdistrict,
  ]);

  const fetchDronerList = async ({
    sortField,
    sortDirection,
  }: {
    sortField?: string;
    sortDirection?: string;
  }) => {
    await DronerDatasource.getDronerList(
      current,
      row,
      searchSubdistrict?.value,
      searchDistrict?.value,
      searchProvince?.value,
      searchDroneBrand?.value,
      searchStatus?.value === "ALL" ? undefined : searchStatus?.value,
      searchText,
      sortField,
      sortDirection
    ).then((res: DronerListEntity) => {
      setData(res);
    });
  };
  useEffectOnce(() => {
    const getInitialSearch = async () => {
      const provinceData = await fetchProvince();
      const droneBrandData = await fetchDroneBrand();
      let findProvince: any;
      let findDistrict: any;
      if (searchQuery) {
        const status = searchQuery.get("status");
        const searchText = searchQuery.get("searchText");
        const provinceQuery = searchQuery.get("province");
        const districtQuery = searchQuery.get("district");
        const subdistrictQuery = searchQuery.get("subdistrict");
        const droneBrand = searchQuery.get("droneBrand");

        if (droneBrand) {
          const find = droneBrandData.find(
            (item: any) => item.name === droneBrand
          );
          setSearchDroneBrand({
            label: find?.name,
            value: find?.id,
          });
        }
        if (status) {
          const find = DRONER_STATUS.find((item) => item.name === status);
          setSearchStatus({
            label: find?.name || "ทั้งหมด",
            value: find?.value || "ALL",
          });
        }
        if (searchText) {
          setSearchText(searchText);
        }
        if (provinceQuery && provinceData) {
          findProvince = provinceData.find((el: any) => {
            return el.provinceName === provinceQuery;
          });
          setSearchProvince({
            label: findProvince?.provinceName || "",
            value: findProvince?.provinceId || "",
          });
        }

        if (districtQuery && findProvince) {
          const districtData = await LocationDatasource.getDistrict(
            findProvince?.provinceId
          );
          findDistrict = districtData.find((el: any) => {
            return el.districtName === districtQuery;
          });
          setSearchDistrict({
            label: findDistrict?.districtName || "",
            value: findDistrict?.districtId || "",
          });
        }
        if (subdistrictQuery && findDistrict) {
          const subdistrictData = await LocationDatasource.getSubdistrict(
            findDistrict?.districtId
          );
          const findSubdistrict = subdistrictData.find((el: any) => {
            return el.subdistrictName === subdistrictQuery;
          });
          setSearchSubdistrict({
            label: findSubdistrict?.subdistrictName || "",
            value: findSubdistrict?.subdistrictId || "",
          });
        }
      }
    };
    getInitialSearch();
  });
  const fetchProvince = async () => {
    return await LocationDatasource.getProvince().then((res) => {
      setProvince(res);
      return res;
    });
  };
  const fetchDistrict = async () => {
    await LocationDatasource.getDistrict(searchProvince?.value).then((res) => {
      setDistrict(res);
    });
  };
  const fetchSubdistrict = async () => {
    await LocationDatasource.getSubdistrict(searchDistrict?.value).then(
      (res) => {
        setSubdistrict(res);
      }
    );
  };
  const fetchDroneBrand = async () => {
    return await DroneDatasource.getDroneBrandList().then((res) => {
      setDroneBrandId(res.data);
      return res.data;
    });
  };
  const onChangePage = (page: number) => {
    setCurrent(page);
  };
  const handleProvince = (provinceId: number, data: any) => {
    setSearchProvince({ value: provinceId, label: data.children });
    navigate(
      `/IndexDroner${genQuery({
        searchProvince: data.children,
        searchDistrict: searchDistrict?.label,
        searchSubdistrict: searchSubdistrict?.label,
        searchDroneBrand: searchDroneBrand?.label,
        searchStatus: searchStatus?.label,
        searchText,
      })}`
    );

    setCurrent(1);
  };
  const handleDistrict = (districtId: number, data: any) => {
    setSearchDistrict({ value: districtId, label: data.children });
    navigate(
      `/IndexDroner${genQuery({
        searchProvince: searchProvince?.label,
        searchDistrict: data.children,
        searchSubdistrict: searchSubdistrict?.label,
        searchDroneBrand: searchDroneBrand?.label,
        searchStatus: searchStatus?.label,
        searchText,
      })}`
    );
    setCurrent(1);
  };
  const handleSubDistrict = (subdistrictId: any, data: any) => {
    setSearchSubdistrict({
      value: subdistrictId,
      label: data.children,
    });
    navigate(
      `/IndexDroner${genQuery({
        searchProvince: searchProvince?.label,
        searchDistrict: searchDistrict?.label,
        searchSubdistrict: data.children,
        searchDroneBrand: searchDroneBrand?.label,
        searchStatus: searchStatus?.label,
        searchText,
      })}`
    );
    setCurrent(1);
  };
  const handleDroneBrand = (droneBrandId: string, data: any) => {
    setSearchDroneBrand({
      value: droneBrandId,
      label: data.children,
    });
    navigate(
      `/IndexDroner${genQuery({
        searchProvince: searchProvince?.label,
        searchDistrict: searchDistrict?.label,
        searchSubdistrict: searchSubdistrict?.label,
        searchDroneBrand: data.children,
        searchStatus: searchStatus?.label,
        searchText,
      })}`
    );
    setCurrent(1);
  };
  const changeTextSearch = (value: string) => {
    setSearchText(value);
    navigate(
      `/IndexDroner${genQuery({
        searchProvince: searchProvince?.label,
        searchDistrict: searchDistrict?.label,
        searchSubdistrict: searchSubdistrict?.label,
        searchDroneBrand: searchDroneBrand?.label,
        searchStatus: searchStatus?.label,
        searchText: value,
      })}`
    );
    setCurrent(1);
  };
  const handleStatus = (status: any, data: any) => {
    setSearchStatus({
      value: status,
      label: data.children,
    });
    navigate(
      `/IndexDroner${genQuery({
        searchProvince: searchProvince?.label,
        searchDistrict: searchDistrict?.label,
        searchSubdistrict: searchSubdistrict?.label,
        searchDroneBrand: searchDroneBrand?.label,
        searchStatus: data.children,
        searchText,
      })}`
    );
    setCurrent(1);
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
        <div>
          <AddButtton
            text="เพิ่มนักบินโดรน"
            onClick={() => navigate("/AddDroner")}
          />
        </div>
      </div>
      <div
        className="container d-flex justify-content-between"
        style={{ padding: "8px" }}
      >
        <div className="col-lg-3">
          <SearchDebounce
            onSearch={changeTextSearch}
            placeholder="ค้นหาชื่อนักบินโดรน หรือเบอร์โทร"
            className="col-lg-12 p-1"
            searchDefault={searchText}
          />
        </div>
        <div className="col">
          <Select
            className="col-lg-12 p-1"
            placeholder="เลือกจังหวัด"
            onChange={handleProvince}
            showSearch
            value={searchProvince?.label}
            allowClear
            onClear={() => {
              setSearchProvince(undefined);
              navigate(
                `/IndexDroner${genQuery({
                  searchProvince: undefined,
                  searchDistrict: searchDistrict?.label,
                  searchSubdistrict: searchSubdistrict?.label,
                  searchDroneBrand: searchDroneBrand?.label,
                  searchStatus: searchStatus?.label,
                  searchText,
                })}`
              );
            }}
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
              <Option value={item.provinceId.toString()}>
                {item.provinceName}
              </Option>
            ))}
          </Select>
        </div>
        <div className="col">
          <Select
            className="col-lg-12 p-1"
            onClear={() => {
              setSearchDistrict(undefined);
              navigate(
                `/IndexDroner${genQuery({
                  searchProvince: searchProvince?.label,
                  searchDistrict: undefined,
                  searchSubdistrict: searchSubdistrict?.label,
                  searchDroneBrand: searchDroneBrand?.label,
                  searchStatus: searchStatus?.label,
                  searchText,
                })}`
              );
            }}
            placeholder="เลือกอำเภอ"
            onChange={handleDistrict}
            showSearch
            value={searchDistrict?.label}
            allowClear
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
              <Option value={item.districtId.toString()}>
                {item.districtName}
              </Option>
            ))}
          </Select>
        </div>
        <div className="col">
          <Select
            className="col-lg-12 p-1"
            placeholder="เลือกตำบล"
            onChange={handleSubDistrict}
            onClear={() => {
              setSearchSubdistrict(undefined);
              navigate(
                `/IndexDroner${genQuery({
                  searchProvince: searchProvince?.label,
                  searchDistrict: searchDistrict?.label,
                  searchSubdistrict: undefined,
                  searchDroneBrand: searchDroneBrand?.label,
                  searchStatus: searchStatus?.label,
                  searchText,
                })}`
              );
            }}
            showSearch
            allowClear
            value={searchSubdistrict?.label}
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
              <Option value={item.subdistrictId.toString()}>
                {item.subdistrictName}
              </Option>
            ))}
          </Select>
        </div>
        <div className="col">
          <Select
            showSearch
            value={searchDroneBrand?.label}
            onClear={() => {
              setSearchDroneBrand(undefined);
              navigate(
                `/IndexDroner${genQuery({
                  searchProvince: searchProvince?.label,
                  searchDistrict: searchDistrict?.label,
                  searchSubdistrict: searchSubdistrict?.label,
                  searchDroneBrand: undefined,
                  searchStatus: searchStatus?.label,
                  searchText,
                })}`
              );
            }}
            optionFilterProp="children"
            filterOption={(input: any, option: any) =>
              option.children.includes(input)
            }
            filterSort={(optionA, optionB) =>
              optionA.children
                .toLowerCase()
                .localeCompare(optionB.children.toLowerCase())
            }
            className="col-lg-12 p-1"
            placeholder="เลือกยี่ห้อ"
            allowClear
            onChange={handleDroneBrand}
          >
            {droneBrandId?.map((item: any) => (
              <Option value={item.id.toString()}>{item.name}</Option>
            ))}
          </Select>
        </div>

        <div className="col">
          <Select
            className="col-lg-12 p-1"
            placeholder="เลือกสถานะ"
            value={searchStatus?.label}
            onChange={handleStatus}
          >
            {DRONER_STATUS.map((item) => (
              <Option value={item.value}>{item.name}</Option>
            ))}
          </Select>
        </div>
      </div>
    </>
  );

  const columns = [
    {
      title: () => {
        return (
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            อัพเดทล่าสุด
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
              }}
              onClick={() => {
                setSortStatus((prev) => {
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
                  color: sortStatus === "ASC" ? "#ffca37" : "white",
                }}
              />
              <CaretDownOutlined
                style={{
                  position: "relative",
                  bottom: 2,
                  color: sortStatus === "DESC" ? "#ffca37" : "white",
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
              {value.updateBy && (
                <div>
                  <span
                    className=" d-block font-size-lg"
                    style={{ color: color.Grey }}
                  >
                    <UserOutlined style={{ padding: "0 4px 0 0" }} />

                    {value?.updateBy}
                  </span>
                </div>
              )}
            </div>
          ),
        };
      },
    },
    {
      title: "ชื่อนักบินโดรน",
      dataIndex: "firstname",
      key: "firstname",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div className="container">
              <span className="text-dark-75  d-block font-size-lg">
                {row.firstname + " " + row.lastname}
              </span>
              <span style={{ color: color.Disable }}>{row.pin}</span>
            </div>
          ),
        };
      },
    },
    {
      title: "ตำบล",
      dataIndex: "subdistrict",
      key: "subdistrict",
      render: (value: any, row: any, index: number) => {
        const subdistrict = row.address.subdistrict;
        return {
          children: (
            <span className="text-dark-75  d-block font-size-lg">
              {subdistrict !== undefined ? subdistrict.subdistrictName : null}
            </span>
          ),
        };
      },
    },
    {
      title: "อำเภอ",
      dataIndex: "district",
      key: "district",
      render: (value: any, row: any, index: number) => {
        const district = row.address.district;
        return {
          children: (
            <div className="container">
              <span className="text-dark-75  d-block font-size-lg">
                {district !== undefined ? district.districtName : null}
              </span>
            </div>
          ),
        };
      },
    },
    {
      title: "จังหวัด",
      dataIndex: "province",
      key: "province",
      render: (value: any, row: any, index: number) => {
        const province = row.address.province;
        return {
          children: (
            <div className="container">
              <span className="text-dark-75  d-block font-size-lg">
                {province !== undefined ? province.provinceName : null}
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
    },
    {
      title: "จำนวนโดรน",
      dataIndex: "totalDroneCount",
      key: "totalDroneCount",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div className="container">
              <span className="text-dark-75  d-block font-size-lg">
                {row.totalDroneCount + " " + "เครื่อง"}
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
                  <Avatar
                    size={25}
                    src={droneLatest.drone.droneBrand.logoImagePath}
                    style={{ marginRight: "5px" }}
                  />
                ) : (
                  <Avatar
                    size={25}
                    style={{
                      color: "#0068F4",
                      backgroundColor: "#EFF2F9",
                    }}
                  >
                    {/* {droneLatest.charAt(0)} */}
                  </Avatar>
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
                <Badge color={STATUS_COLOR[row.status]} />{" "}
                {DRONER_STATUS_MAPPING[row.status]}
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
            <Row justify={"space-between"} gutter={8}>
              <Col span={12}>
                <ActionButton
                  icon={<FolderViewOutlined />}
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

  return (
    <>
      {PageTitle}
      <Table
        columns={columns}
        dataSource={data?.data}
        pagination={false}
        scroll={{ x: "max-content" }}
        rowClassName={(a) =>
          a.status == "PENDING" &&
          moment(Date.now()).diff(moment(new Date(a.createdAt)), "day") >= 3
            ? "PENDING" &&
              moment(Date.now()).diff(moment(new Date(a.createdAt)), "day") >= 7
              ? "table-row-older"
              : "table-row-old"
            : "table-row-lasted"
        }
      />
      <div className="d-flex justify-content-between pt-3 pb-3">
        <p>รายการทั้งหมด {data?.count} รายการ</p>
        <Pagination
          current={current}
          total={data?.count}
          onChange={onChangePage}
          pageSize={row}
          showSizeChanger={false}
        />
      </div>
    </>
  );
}
export default IndexDroner;
