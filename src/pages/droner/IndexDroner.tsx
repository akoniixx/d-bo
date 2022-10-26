import { Avatar, Badge, Pagination, Select, Table } from "antd";
import React, { useEffect, useState } from "react";
import Search from "antd/lib/input/Search";
import { Option } from "antd/lib/mentions";
import color from "../../resource/color";
import { EditOutlined, UserOutlined } from "@ant-design/icons";
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
import Layouts from "../../components/layout/Layout";

function IndexDroner() {
  const row = 10;
  const [current, setCurrent] = useState(1);
  const [data, setData] = useState<DronerListEntity>();
  const [searchStatus, setSearchStatus] = useState<string>();
  const [searchText, setSearchText] = useState<string>();
  const [searchProvince, setSearchProvince] = useState<any>();
  const [searchDistrict, setSearchDistrict] = useState<any>();
  const [searchSubdistrict, setSearchSubdistrict] = useState<any>();
  const [searchDroneBrand, setSearchDroneBrand] = useState<any>();
  const [province, setProvince] = useState<ProviceEntity[]>([]);
  const [district, setDistrict] = useState<DistrictEntity[]>([]);
  const [subdistrict, setSubdistrict] = useState<SubdistrictEntity[]>(
    []
  );

  const [droneBrandId, setDroneBrandId] = useState<any>();

  useEffect(() => {
    fetchDronerList();
    fetchProvince();
    if (searchProvince) {
      fetchDistrict();
    }
    if (searchDistrict) {
      fetchSubdistrict();
    }
    fetchDroneBrand();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    current,
    searchText,
    searchStatus,
    searchProvince,
    searchDistrict,
    searchDroneBrand,
    searchSubdistrict,
  ]);
  const fetchDronerList = async () => {
    await DronerDatasource.getDronerList(
      current,
      row,
      searchSubdistrict,
      searchDistrict,
      searchProvince,
      searchDroneBrand,
      searchStatus,
      searchText
    ).then((res: DronerListEntity) => {
      setData(res);
    });
  };
  const fetchProvince = async () => {
    await LocationDatasource.getProvince().then((res) => {
      setProvince(res);
    });
  };
  const fetchDistrict = async () => {
    await LocationDatasource.getDistrict(searchProvince).then(
      (res) => {
        setDistrict(res);
      }
    );
  };
  const fetchSubdistrict = async () => {
    await LocationDatasource.getSubdistrict(searchDistrict).then(
      (res) => {
        setSubdistrict(res);
      }
    );
  };
  const fetchDroneBrand = async () => {
    await DroneDatasource.getDroneBrandList().then((res) => {
      setDroneBrandId(res.data);
    });
  };
  const onChangePage = (page: number) => {
    setCurrent(page);
  };
  const handleProvince = (provinceId: number) => {
    setSearchProvince(provinceId);
    setCurrent(1);
  };
  const handleDistrict = (districtId: number) => {
    setSearchDistrict(districtId);
    setCurrent(1);
  };
  const handleSubDistrict = (subdistrictId: any) => {
    setSearchSubdistrict(subdistrictId);
    setCurrent(1);
  };
  const handleDroneBrand = (droneBrandId: string) => {
    setSearchDroneBrand(droneBrandId);
    setCurrent(1);
  };
  const changeTextSearch = (value: string) => {
    setSearchText(value);
    setCurrent(1);
  };
  const handleStatus = (status: any) => {
    setSearchStatus(status);
    setCurrent(1);
  };
  const PageTitle = (
    <>
      <div
        className="container d-flex justify-content-between"
        style={{ padding: "10px" }}>
        <div>
          <span
            className="card-label font-weight-bolder text-dark"
            style={{
              fontSize: 22,
              fontWeight: "bold",
              padding: "8px",
            }}>
            <strong>รายชื่อนักบินโดรน (Droner)</strong>
          </span>
        </div>
        <div>
          <AddButtton
            text="เพิ่มนักบินโดรน"
            onClick={() => (window.location.href = "/AddDroner")}
          />
        </div>
      </div>
      <div
        className="container d-flex justify-content-between"
        style={{ padding: "8px" }}>
        <div className="col-lg-3">
          <Search
            placeholder="ค้นหาชื่อนักบินโดรน หรือเบอร์โทร"
            className="col-lg-12 p-1"
            onSearch={changeTextSearch}
          />
        </div>
        <div className="col">
          <Select
            className="col-lg-12 p-1"
            placeholder="เลือกจังหวัด"
            onChange={handleProvince}
            showSearch
            allowClear
            optionFilterProp="children"
            filterOption={(input: any, option: any) =>
              option.children.includes(input)
            }
            filterSort={(optionA, optionB) =>
              optionA.children
                .toLowerCase()
                .localeCompare(optionB.children.toLowerCase())
            }>
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
            placeholder="เลือกอำเภอ"
            onChange={handleDistrict}
            showSearch
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
            disabled={searchProvince == undefined}>
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
            showSearch
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
            disabled={searchDistrict == undefined}>
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
            onChange={handleDroneBrand}>
            {droneBrandId?.map((item: any) => (
              <Option value={item.id.toString()}>{item.name}</Option>
            ))}
          </Select>
        </div>
        <div className="col">
          <Select
            className="col-lg-12 p-1"
            placeholder="เลือกสถานะ"
            onChange={handleStatus}>
            {DRONER_STATUS.map((item) => (
              <option value={item.value}>{item.name}</option>
            ))}
          </Select>
        </div>
      </div>
    </>
  );
  const columns = [
    {
      title: "อัพเดทล่าสุด",
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
                    style={{ color: color.Grey }}>
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
              {subdistrict !== undefined
                ? subdistrict.subdistrictName
                : null}
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
                {district !== undefined
                  ? district.districtName
                  : null}
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
                {province !== undefined
                  ? province.provinceName
                  : null}
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
                    }}>
                    {/* {droneLatest.charAt(0)} */}
                  </Avatar>
                )}
                {droneLatest !== undefined
                  ? droneLatest.drone.droneBrand.name
                  : null}
              </span>
              <span style={{ color: color.Grey, fontSize: "12px" }}>
                {row.dronerDrone.length > 1
                  ? "(มากกว่า 1 ยี่ห้อ)"
                  : null}
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
                <Badge color={STATUS_COLOR[row.status]} />
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
            <div className="d-flex flex-row justify-content-between">
              <ActionButton
                icon={<EditOutlined />}
                color={color.primary1}
                onClick={() =>
                  (window.location.href = "/EditDroner?=" + row.id)
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
      {PageTitle}
      <br />
      <Table
        columns={columns}
        dataSource={data?.data}
        pagination={false}
        scroll={{ x: "max-content" }}
        rowClassName={(a) =>
          a.status == "PENDING" &&
          moment(Date.now()).diff(
            moment(new Date(a.createdAt)),
            "day"
          ) >= 3
            ? "PENDING" &&
              moment(Date.now()).diff(
                moment(new Date(a.createdAt)),
                "day"
              ) >= 7
              ? "table-row-older"
              : "table-row-old"
            : "table-row-lasted"
        }
      />
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
export default IndexDroner;
