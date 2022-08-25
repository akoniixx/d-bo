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

export default function IndexRankDroner() {
  const [searchText, setSearchText] = useState<string>();
  const [searchProvince, setSearchProvince] = useState<any>();
  const [searchDistrict, setSearchDistrict] = useState<any>();
  const [searchSubdistrict, setSearchSubdistrict] = useState<any>();
  const [province, setProvince] = useState<ProviceEntity[]>();
  const [district, setDistrict] = useState<DistrictEntity[]>();
  const [subdistrict, setSubdistrict] = useState<SubdistrictEntity[]>();
  const { RangePicker } = DatePicker;
  const dateFormat = "DD/MM/YYYY";

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
  useEffect(() => {
    fecthProvince();
    fetchDistrict();
    fetchSubdistrict();
  }, [searchText, searchProvince, searchDistrict, searchSubdistrict]);

  const handleSearchText = (e: string) => {
    setSearchText(e);
  };
  const handleSearchProvince = (provinceId: number) => {
    setSearchProvince(provinceId);
  };
  const handleSearchDistrict = (districtId: number) => {
    setSearchDistrict(districtId);
  };
  const handleSearchSubdistrict = (subdistrictId: number) => {
    setSearchSubdistrict(subdistrictId);
  };

  //mockData
  const dataSource = [
    {
      key: "1",
      name: "Mike",
    },
  ];
  const pageTitle = (
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
            onSearch={handleSearchText}
          />
        </div>
        <div className="col-lg-2">
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
        <div className="col-lg-2">
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
      dataIndex: "name",
      key: "name",
      render: (value: any, row: any, index: number) => {
        return {
          children: <></>,
        };
      },
    },
    {
      title: "เบอร์โทร",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "จำนวนให้บริการ",
      dataIndex: "",
      key: "",
      render: (value: any, row: any, index: number) => {
        return {};
      },
    },
    {
      title: "จำนวนไร่",
      dataIndex: "",
      key: "",
      render: (value: any, row: any, index: number) => {
        return {};
      },
    },
    {
      title: "คะแนน Rating",
      dataIndex: "",
      key: "",
      render: (value: any, row: any, index: number) => {
        return {};
      },
    },
    {
      title: "ตำบล",
      dataIndex: "",
      key: "",
      render: (value: any, row: any, index: number) => {
        return {};
      },
    },
    {
      title: "อำเภอ",
      dataIndex: "",
      key: "",
      render: (value: any, row: any, index: number) => {
        return {};
      },
    },
    {
      title: "จังหวัด",
      dataIndex: "",
      key: "",
      render: (value: any, row: any, index: number) => {
        return {
          children: <></>,
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
                onClick={() => (window.location.href = "/DetailRankDroner")}
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
      <br />
      <Table columns={columns} dataSource={dataSource} pagination={false} />
    </Layouts>
  );
}
