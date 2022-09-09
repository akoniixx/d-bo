import {
  Button,
  Checkbox,
  DatePicker,
  Dropdown,
  Menu,
  Pagination,
  Rate,
  Row,
  Select,
  Table,
} from "antd";
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
import { DownOutlined, FileTextOutlined, StarFilled } from "@ant-design/icons";
import { DronerRankDatasource } from "../../datasource/DronerRankDatasource";
import { DronerRankListEntity } from "../../entities/DronerRankEntities";

export default function IndexRankDroner() {
  const row = 10;
  const [current, setCurrent] = useState(1);
  const [data, setData] = useState<DronerRankListEntity>();
  const [searchText, setSearchText] = useState<string>();
  const [startDate, setStartDate] = useState<any>(null);
  const [endDate, setEndDate] = useState<any>(null);
  const [searchProvince, setSearchProvince] = useState<any>();
  const [searchDistrict, setSearchDistrict] = useState<any>();
  const [searchSubdistrict, setSearchSubdistrict] = useState<any>();
  const [province, setProvince] = useState<ProviceEntity[]>();
  const [district, setDistrict] = useState<DistrictEntity[]>();
  const [subdistrict, setSubdistrict] = useState<SubdistrictEntity[]>();
  const [visibleRating, setVisibleRating] = useState(false);
  const [accuNumber, setAccuNumber] = useState<number[]>([]);
  const [rating, setRating] = useState<{
    ratingMin: number;
    ratingMax: number;
  }>();
  const { RangePicker } = DatePicker;
  const dateSearchFormat = "YYYY-MM-DD";
  useEffect(() => {
    fetchDronerRank();
    fetchProvince();
    fetchDistrict();
    fetchSubdistrict();
  }, [
    current,
    searchText,
    searchProvince,
    searchDistrict,
    searchSubdistrict,
    rating?.ratingMax,
    rating?.ratingMin,
    startDate,
    endDate,
  ]);
  const fetchDronerRank = async () => {
    await DronerRankDatasource.getDronerRank(
      current,
      row,
      searchSubdistrict,
      searchDistrict,
      searchProvince,
      rating?.ratingMax,
      rating?.ratingMin,
      startDate,
      endDate,
      searchText
    ).then((res: DronerRankListEntity) => {
      console.log(res);
      setData(res);
    });
  };
  const fetchProvince = async () => {
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
  const handleSearchDate = (e: any) => {
    if (e != null) {
      setStartDate(moment(new Date(e[0])).format(dateSearchFormat));
      setEndDate(moment(new Date(e[1])).format(dateSearchFormat));
    } else {
      setStartDate(e);
      setEndDate(e);
    }
    setCurrent(1);
  };

  const sorter = (a: any, b: any) => {
    if (a === b) return 0;
    else if (a === null) return 1;
    else if (b === null) return -1;
    else return a.localeCompare(b);
  };

  const handlerRating = (e: any) => {
    let value = e.target.value;
    console.log(value);
    let checked = e.target.checked;
    let min = 0;
    let max = 0;
    if (checked) {
      console.log(checked);
      min = Math.min(...accuNumber, value);
      console.log(min);
      max = Math.max(...accuNumber, value);
      console.log(max);
      console.log("max", max);
      setAccuNumber([...accuNumber, value]);
    } else {
      let d: number[] = accuNumber.filter((x) => x != value);
      min = Math.min(...d);
      max = Math.max(...d);
      setAccuNumber(d);
    }
    setRating({ ratingMin: min, ratingMax: max });
    console.log("rate", rating);
  };

  const handleVisibleRating = (newVisible: any) => {
    setVisibleRating(newVisible);
  };

  const ratingStar = (
    <Menu
      items={[
        {
          label: (
            <div
              style={{
                color: "#FFCA37",
                fontSize: "16px",
                marginBottom: "10px",
              }}
            >
              <StarFilled />
              <StarFilled />
              <StarFilled />
              <StarFilled />
              <StarFilled />
            </div>
          ),
          key: "1",
          icon: <Checkbox value={5} onChange={handlerRating}></Checkbox>,
        },
        {
          label: (
            <div
              style={{
                color: "#FFCA37",
                fontSize: "16px",
                marginBottom: "10px",
              }}
            >
              <StarFilled />
              <StarFilled />
              <StarFilled />
              <StarFilled />
            </div>
          ),
          key: "2",
          icon: <Checkbox value={4} onChange={handlerRating}></Checkbox>,
        },
        {
          label: (
            <div
              style={{
                color: "#FFCA37",
                fontSize: "16px",
                marginBottom: "10px",
              }}
            >
              <StarFilled />
              <StarFilled />
              <StarFilled />
            </div>
          ),
          key: "3",
          icon: <Checkbox value={3} onChange={handlerRating}></Checkbox>,
        },
        {
          label: (
            <div
              style={{
                color: "#FFCA37",
                fontSize: "16px",
                marginBottom: "10px",
              }}
            >
              <StarFilled />
              <StarFilled />
            </div>
          ),
          key: "4",
          icon: <Checkbox value={2} onChange={handlerRating}></Checkbox>,
        },
        {
          label: (
            <div
              style={{
                color: "#FFCA37",
                fontSize: "16px",
                marginBottom: "10px",
              }}
            >
              <StarFilled />
            </div>
          ),
          key: "5",
          icon: <Checkbox value={1} onChange={handlerRating}></Checkbox>,
        },
      ]}
    />
  );
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
            allowClear
            onCalendarChange={(val) => handleSearchDate(val)}
            format={dateSearchFormat}
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
        <div className="col-lg-2 p-1">
          <Dropdown
            overlay={ratingStar}
            trigger={["click"]}
            className="col-lg-12"
            onVisibleChange={handleVisibleRating}
            visible={visibleRating}
          >
            <Button style={{ color: color.Disable }}>
              เลือก Rating
              <DownOutlined />
            </Button>
          </Dropdown>
        </div>
        <div className="col-lg-1 pt-1"></div>
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
                {row.droner_firstname + " " + row.droner_lastname}
              </span>
              <span style={{ color: color.Grey, fontSize: "13px" }}>
                {row.droner_droner_code}
              </span>
            </>
          ),
        };
      },
    },
    {
      title: "เบอร์โทร",
      dataIndex: "droner_telephone_no",
      key: "droner_telephone_no",
    },
    {
      title: "จำนวนให้บริการ",
      dataIndex: "totalTaskCount",
      key: "totalTaskCount",
      sorter: (a: any, b: any) => sorter(a.totalTaskCount, b.totalTaskCount),
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
      sorter: (a: any, b: any) => sorter(a.totalRaiCount, b.totalRaiCount),
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
      sorter: (a: any, b: any) => sorter(a.avgrating, b.avgrating),
      render: (value: any, row: any, index: number) => {
        const checkAvgrating = () => {
          return row.avgrating > 0 ? true : false;
        };
        return {
          children: (
            <>
              <span className="text-dark-75  d-block font-size-lg">
                {checkAvgrating() && (
                  <Row>
                    <div style={{ color: "#FFCA37", fontSize: "16px" }}>
                      <StarFilled />
                    </div>
                    <span className="pt-2 ps-1">
                      {parseFloat(row.avgrating).toFixed(1)}
                    </span>
                  </Row>
                )}
              </span>
            </>
          ),
        };
      },
    },
    {
      title: "ตำบล",
      dataIndex: "subdistrict_subdistrict_name",
      key: "subdistrict_subdistrict_name",
      width: "10%",
      render: (value: any, row: any, index: number) => {
        const subdistrict = row.subdistrict_subdistrict_name;
        return {
          children: (
            <span className="text-dark-75  d-block font-size-lg">
              {subdistrict != null ? subdistrict : "-"}
            </span>
          ),
        };
      },
    },
    {
      title: "อำเภอ",
      dataIndex: "district_district_name",
      key: "district_district_name",
      width: "10%",
      render: (value: any, row: any, index: number) => {
        const district = row.district_district_name;
        return {
          children: (
            <div className="container">
              <span className="text-dark-75  d-block font-size-lg">
                {district !== null ? district : "-"}
              </span>
            </div>
          ),
        };
      },
    },
    {
      title: "จังหวัด",
      dataIndex: "province_region",
      key: "province_region",
      width: "10%",
      render: (value: any, row: any, index: number) => {
        const province = row.province_region;
        return {
          children: (
            <div className="container">
              <span className="text-dark-75  d-block font-size-lg">
                {province !== null ? province : "-"}
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
                icon={<FileTextOutlined />}
                color={color.primary1}
                onClick={() =>
                  (window.location.href = "/DetailRankDroner?=" + row.droner_id)
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
