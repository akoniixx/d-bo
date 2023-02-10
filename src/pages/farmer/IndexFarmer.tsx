import { Badge, Pagination, Select, Table } from "antd";
import React, { useEffect, useState } from "react";
import Search from "antd/lib/input/Search";
import { Option } from "antd/lib/mentions";
import color from "../../resource/color";
import Layouts from "../../components/layout/Layout";
import ActionButton from "../../components/button/ActionButton";
import {
  CaretDownOutlined,
  CaretUpOutlined,
  EditOutlined,
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

interface SearchSelectType {
  label: any;
  value: any;
}
function IndexFarmer() {
  const row = 10;
  const [current, setCurrent] = useState(1);
  const navigate = useNavigate();
  const [data, setData] = useState<FarmerPageEntity>();
  const [searchStatus, setSearchStatus] = useState<
    SearchSelectType | undefined
  >();
  const [searchText, setSearchText] = useState<string>();
  const [searchProvince, setSearchProvince] = useState<
    SearchSelectType | undefined
  >();
  const [searchDistrict, setSearchDistrict] = useState<
    SearchSelectType | undefined
  >();
  const [searchSubdistrict, setSearchSubdistrict] = useState<
    SearchSelectType | undefined
  >();
  const [province, setProvince] = useState<ProviceEntity[]>();
  const [district, setDistrict] = useState<DistrictEntity[]>();
  const [subdistrict, setSubdistrict] = useState<SubdistrictEntity[]>();
  const [sortStatus, setSortStatus] = useState<string | undefined>(undefined);
  const [searchQuery] = useSearchParams();

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

  const fecthAdmin = async ({
    sortDirection,
    sortField,
  }: {
    sortDirection?: string;
    sortField?: string;
  }) => {
    await FarmerDatasource.getFarmerList(
      current,
      row,
      searchStatus?.value,
      searchText,
      searchProvince?.value,
      searchDistrict?.value,
      searchSubdistrict?.value,
      sortDirection,
      sortField
    ).then((res: FarmerPageEntity) => {
      setData(res);
    });
  };

  const fetchProvince = async () => {
    return await LocationDatasource.getProvince().then((res) => {
      setProvince(res);
      return res;
    });
  };
  const fetchDistrict = async () => {
    return await LocationDatasource.getDistrict(searchProvince?.value).then(
      (res) => {
        setDistrict(res);
        return res;
      }
    );
  };
  const fetchSubdistrict = async () => {
    return await LocationDatasource.getSubdistrict(searchDistrict?.value).then(
      (res) => {
        setSubdistrict(res);
        return res;
      }
    );
  };

  useEffect(() => {
    fecthAdmin({
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
    searchStatus,
    searchText,
    searchProvince,
    searchDistrict,
    searchSubdistrict,
  ]);

  const onChangePage = (page: number) => {
    setCurrent(page);
  };

  const handleSearchStatus = (status: any, data: any) => {
    setSearchStatus({
      value: status,
      label: data.children,
    });
    navigate(
      `/IndexFarmer${genQuery({
        searchProvince: searchProvince?.label,
        searchDistrict: searchDistrict?.label,
        searchSubdistrict: searchSubdistrict?.label,
        searchStatus: data.children,
        searchText,
      })}`
    );
    setCurrent(1);
  };
  const handleSearchText = (e: string) => {
    setSearchText(e);
    navigate(
      `/IndexFarmer${genQuery({
        searchProvince: searchProvince?.label,
        searchDistrict: searchDistrict?.label,
        searchSubdistrict: searchSubdistrict?.label,
        searchStatus: searchStatus?.label,
        searchText: e,
      })}`
    );
    setCurrent(1);
  };
  const handleSearchProvince = (provinceId: number, data: any) => {
    setSearchProvince({
      value: provinceId,
      label: data.children,
    });
    navigate(
      `/IndexFarmer${genQuery({
        searchProvince: data.children,
        searchDistrict: searchDistrict?.label,
        searchSubdistrict: searchSubdistrict?.label,
        searchStatus: searchStatus?.label,
        searchText,
      })}`
    );
    setCurrent(1);
  };
  const handleSearchDistrict = (districtId: number, data: any) => {
    setSearchDistrict({
      value: districtId,
      label: data.children,
    });
    navigate(
      `/IndexFarmer${genQuery({
        searchProvince: searchProvince?.label,
        searchDistrict: data.children,
        searchSubdistrict: searchSubdistrict?.label,
        searchStatus: searchStatus?.label,
        searchText,
      })}`
    );
    setCurrent(1);
  };
  const handleSearchSubdistrict = (subdistrictId: number, data: any) => {
    setSearchSubdistrict({
      value: subdistrictId,
      label: data.children,
    });
    navigate(
      `/IndexFarmer${genQuery({
        searchProvince: searchProvince?.label,
        searchDistrict: searchDistrict?.label,
        searchSubdistrict: data.children,
        searchStatus: searchStatus?.label,
        searchText,
      })}`
    );
    setCurrent(1);
  };

  useEffectOnce(() => {
    const getInitialSearch = async () => {
      const provinceData = await fetchProvince();
      let findProvince: any;
      let findDistrict: any;
      if (searchQuery) {
        const status = searchQuery.get("status");
        const searchText = searchQuery.get("searchText");
        const provinceQuery = searchQuery.get("province");
        const districtQuery = searchQuery.get("district");
        const subdistrictQuery = searchQuery.get("subdistrict");
        if (status) {
          const statusData = FARMER_STATUS_SEARCH.find((el: any) => {
            return el.name === status;
          });
          setSearchStatus({
            label: statusData?.name || "",
            value: statusData?.value || "",
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
  const pageTitle = (
    <>
      <div
        className="container d-flex justify-content-between"
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
        <div>
          <AddButtton
            text="เพิ่มเกษตรกร"
            onClick={() => (window.location.href = "/AddFarmer")}
          />
        </div>
      </div>
      <div
        className="container d-flex justify-content-between"
        style={{ padding: "8px" }}
      >
        <div className="col-lg-3">
          <SearchDebounce
            searchDefault={searchText}
            placeholder="ค้นหาชื่อเกษตรกร หรือเบอร์โทร"
            className="col-lg-12 p-1"
            onSearch={handleSearchText}
          />
        </div>
        <div className="col-lg-3">
          <Select
            allowClear
            className="col-lg-12 p-1"
            placeholder="เลือกจังหวัด"
            onChange={handleSearchProvince}
            showSearch
            onClear={() => {
              setSearchProvince(undefined);
              navigate(
                `/IndexFarmer${genQuery({
                  searchProvince: undefined,
                  searchDistrict: searchDistrict?.label,
                  searchSubdistrict: searchSubdistrict?.label,
                  searchStatus: searchStatus?.label,
                  searchText,
                })}`
              );
            }}
            value={searchProvince?.label}
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
                {item.provinceName ?? []}
              </Option>
            ))}
          </Select>
        </div>
        <div className="col-lg-2">
          <Select
            allowClear
            className="col-lg-12 p-1"
            placeholder="เลือกอำเภอ"
            value={searchDistrict?.label}
            onChange={handleSearchDistrict}
            showSearch
            onClear={() => {
              setSearchDistrict(undefined);
              navigate(
                `/IndexFarmer${genQuery({
                  searchProvince: searchProvince?.label,
                  searchDistrict: undefined,
                  searchSubdistrict: searchSubdistrict?.label,
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
            disabled={searchProvince === undefined}
          >
            {district?.map((item) => (
              <Option value={item.districtId.toString()}>
                {item.districtName}
              </Option>
            ))}
          </Select>
        </div>
        <div className="col-lg-2">
          <Select
            allowClear
            className="col-lg-12 p-1"
            value={searchSubdistrict?.label}
            placeholder="เลือกตำบล"
            onClear={() => {
              setSearchSubdistrict(undefined);
              navigate(
                `/IndexFarmer${genQuery({
                  searchProvince: searchProvince?.label,
                  searchDistrict: searchDistrict?.label,
                  searchSubdistrict: undefined,
                  searchStatus: searchStatus?.label,
                  searchText,
                })}`
              );
            }}
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
            disabled={searchDistrict === undefined}
          >
            {subdistrict?.map((item) => (
              <Option value={item.subdistrictId.toString()}>
                {item.subdistrictName}
              </Option>
            ))}
          </Select>
        </div>
        <div className="col-lg-2">
          <Select
            onClear={() => {
              setSearchStatus(undefined);
              navigate(
                `/IndexFarmer${genQuery({
                  searchProvince: searchProvince?.label,
                  searchDistrict: searchDistrict?.label,
                  searchSubdistrict: searchSubdistrict?.label,
                  searchStatus: undefined,
                  searchText,
                })}`
              );
            }}
            allowClear
            className="col-lg-12 p-1"
            placeholder="เลือกสถานะ"
            value={searchStatus?.label}
            onChange={handleSearchStatus}
          >
            {FARMER_STATUS_SEARCH.map((item) => (
              <option value={item.value}>{item.name}</option>
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
      title: "ชื่อเกษตรกร",
      dataIndex: "fullname",
      key: "name",
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{row.firstname + " " + row.lastname}</span>,
        };
      },
    },
    {
      title: "เบอร์โทร",
      dataIndex: "telephoneNo",
      key: "telephoneNo",
    },
    {
      title: "จังหวัด",
      dataIndex: "province",
      key: "province",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <span>
              {row?.address?.province !== null
                ? row.address.province.provinceName !== null
                  ? row.address.province.provinceName
                  : "-"
                : "-"}
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
        return {
          children: (
            <span>
              {row?.address?.district !== null
                ? row.address.district.districtName !== null
                  ? row.address.district.districtName
                  : "-"
                : "-"}
            </span>
          ),
        };
      },
    },
    {
      title: "ตำบล",
      dataIndex: "date",
      key: "date",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <span>
              {row?.address?.subdistrict !== null
                ? row.address.subdistrict.subdistrictName !== null
                  ? row.address.subdistrict.subdistrictName
                  : "-"
                : "-"}
            </span>
          ),
        };
      },
    },
    {
      title: "จำนวนแปลง",
      dataIndex: "totalPlotCount",
      key: "totalPlotCount",
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{row.totalPlotCount} แปลง</span>,
        };
      },
    },
    {
      title: "จำนวนไร่",
      dataIndex: "totalRaiCount",
      key: "totalRaiCount",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <span>{row.totalRaiCount ? row.totalRaiCount : 0} ไร่</span>
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
            dateDiff === 0 ? null : "(รอไปแล้ว " + dateDiff + " วัน)";
          return textDateDiff;
        };
        return {
          children: (
            <>
              <span style={{ color: STATUS_COLOR_MAPPING[row.status] }}>
                <Badge color={STATUS_COLOR_MAPPING[row.status]} />{" "}
                {STATUS_FARMER_MAPPING[row.status]}
                <br />
              </span>
              <span style={{ color: color.Grey }}>
                {row.status === "PENDING" ? countDay() : null}
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
                  (window.location.href = "/EditFarmer/id=" + row.id)
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
      {pageTitle}
      <CardContainer>
        <Table
          dataSource={data?.data}
          columns={columns}
          pagination={false}
          scroll={{
            x: 300,
          }}
          rowClassName={(a) =>
            a.status === "PENDING" &&
            moment(Date.now()).diff(moment(new Date(a.createdAt)), "day") >= 3
              ? "PENDING" &&
                moment(Date.now()).diff(moment(new Date(a.createdAt)), "day") >=
                  7
                ? "table-row-older"
                : "table-row-old"
              : "table-row-lasted"
          }
        />
      </CardContainer>
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
    </Layouts>
  );
}

export default IndexFarmer;
