import { DatePicker, Pagination, Select, Table } from "antd";
import Search from "antd/lib/input/Search";
import moment from "moment";
import React, { useEffect, useState } from "react";
import ActionButton from "../../components/button/ActionButton";
import Layouts from "../../components/layout/Layout";
import { LocationDatasource } from "../../datasource/LocationDatasource";
import {
  DistrictEntity,
  ProviceEntity,
  SubdistrictEntity,
} from "../../entities/LocationEntities";
import color from "../../resource/color";
import { FileTextFilled } from "@ant-design/icons";
import { DronerRankDatasource } from "../../datasource/DronerRankDatasource";
import {
  DronerRankEntity,
  DronerRankListEntity,
} from "../../entities/DronerRankEntities";

export default function IndexRankDroner() {
  const row = 10;
  const [current, setCurrent] = useState(1);
  const [data, setData] = useState<DronerRankListEntity>();
  const [searchText, setSearchText] = useState<string>();
  const [ratingMing, setRatingMing] = useState<any>();
  const [ratingMax, setRatingMax] = useState<any>();
  const [startDate, setStartDate] = useState<any>();
  const [endDate, setEndDate] = useState<any>();
  const [searchProvince, setSearchProvince] = useState<any>();
  const [searchDistrict, setSearchDistrict] = useState<any>();
  const [searchSubdistrict, setSearchSubdistrict] = useState<any>();
  const [province, setProvince] = useState<ProviceEntity[]>();
  const [district, setDistrict] = useState<DistrictEntity[]>();
  const [subdistrict, setSubdistrict] = useState<SubdistrictEntity[]>();
  const { RangePicker } = DatePicker;
  const dateFormat = "DD/MM/YYYY";

  const fetchDronerRank = async () => {
    await DronerRankDatasource.getDronerRank(
      current,
      row,
      searchSubdistrict,
      searchDistrict,
      searchProvince,
      ratingMing,
      ratingMax,
      startDate,
      endDate,
      searchText
    ).then((res: DronerRankListEntity) => {
      console.log(res);
      setData(res);
    });
  };

  const fecthProvince = async () => {
    await LocationDatasource.getProvince().then((res) => {
      setProvince(res);
    });
  };
  const fetchDistrict = async () => {
    await LocationDatasource.getDistrict(searchProvince).then((res) => {
      setDistrict(res);
    });
  };
  const fetchSubdistrict = async () => {
    await LocationDatasource.getSubdistrict(searchDistrict).then((res) => {
      setSubdistrict(res);
    });
  };
  const changeTextSearch = (value: string) => {
    setSearchText(value);
    setCurrent(1);
  };
  const onChangePage = (page: number) => {
    setCurrent(page);
  };
  useEffect(() => {
    fetchDronerRank();
    fecthProvince();
    fetchDistrict();
    fetchSubdistrict();
  }, [current, searchText, searchProvince, searchDistrict, searchSubdistrict]);
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

  const PageTitle = (
    <>
      <div
        className="container d-flex justify-content-between"
        style={{ padding: "10px" }}
      >
        <div>
          <span
            className="card-label font-weight-bolder text-dark"
            style={{ fontSize: 22, fontWeight: "bold", padding: "8px" }}
          >
            <strong>อันดับนักบินโดรน (Ranking Droner)</strong>
          </span>
        </div>
        <div style={{ color: color.Error }}>
          <RangePicker
            defaultValue={[
              moment("01/01/2565", dateFormat),
              moment("01/01/2565", dateFormat),
            ]}
            format={dateFormat}
          />
        </div>
      </div>
      <div
        className="container d-flex justify-content-between"
        style={{ padding: "8px" }}
      >
        <div className="col-lg-4">
          <Search
            placeholder="ค้นหาชื่อนักบินโดรน/เบอร์โทร/ID นักบินโดรน"
            className="col-lg-12 p-1"
            onSearch={changeTextSearch}
          />
        </div>
        <div className="col-lg-2">
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
        <div className="col-lg-2">
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
            disabled={searchProvince == undefined}
          >
            {district?.map((item) => (
              <option value={item.districtId.toString()}>
                {item.districtName}
              </option>
            ))}
          </Select>
        </div>
        <div className="col-lg-2">
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
        <div className="col-lg-2">
          <Select
            allowClear
            className="col-lg-12 p-1"
            placeholder="เลือกคะแนน Rating"
            // onChange={}
          ></Select>
        </div>
      </div>
    </>
  );
  const columns = [
    {
      title: "ชื่อนักบินโดรน",
      dataIndex: "firstname",
      key: "firstname",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span className="text-dark-75  d-block font-size-lg">
                {row.firstname + " " + row.lastname}
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
      title: "จำนวนให้บริการ",
      dataIndex: "totalTaskCount",
      key: "totalTaskCount",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span className="text-dark-75  d-block font-size-lg">
                {row.totalTaskCount + " " + "งาน"}
              </span>
            </>
          ),
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
            <>
              <span className="text-dark-75  d-block font-size-lg">
                {row.totalRaiCount + " " + "ไร่"}
              </span>
            </>
          ),
        };
      },
    },
    {
      title: "คะแนน Rating",
      dataIndex: "avgrating",
      key: "avgrating",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span className="text-dark-75  d-block font-size-lg">
                {/* {row.avgrating} */}
              </span>
            </>
          ),
        };
      },
    },
    {
      title: "ตำบล",
      dataIndex: "subdistrict",
      key: "subdistrict",
      // width: "10%",
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
      // width: "10%",
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
      // width: "10%",
      render: (value: any, row: any, index: number) => {
        const province = row.address.province;
        return {
          children: (
            <div className="container">
              <span className="text-dark-75  d-block font-size-lg">
                {province !== undefined ? province.region : null}
              </span>
            </div>
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
                icon={<FileTextFilled />}
                color={color.primary1}
                onClick={() =>
                  (window.location.href = "/DetailRankDroner?=" + row.id)
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
      <Table columns={columns} dataSource={data?.data} pagination={false} />
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
