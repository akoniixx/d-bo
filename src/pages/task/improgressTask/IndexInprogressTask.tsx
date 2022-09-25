import { EditOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, DatePicker, Input, Pagination, Select, Table } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import ActionButton from "../../../components/button/ActionButton";
import { CardContainer } from "../../../components/card/CardContainer";
import Layouts from "../../../components/layout/Layout";
import ModalMapPlot from "../../../components/modal/task/newTask/ModalMapPlot";
import { LocationDatasource } from "../../../datasource/LocationDatasource";
import { TaskDatasource } from "../../../datasource/TaskDatasource";
import {
  DistrictEntity,
  ProviceEntity,
  SubdistrictEntity,
} from "../../../entities/LocationEntities";
import { TaskInprogressPageEntity } from "../../../entities/TaskInprogress";
import { color } from "../../../resource";
import { numberWithCommas } from "../../../utilities/TextFormatter";

const { RangePicker } = DatePicker;
const dateFormat = "DD/MM/YYYY";
const timeFormat = "HH:mm";
const dateSearchFormat = "YYYY-MM-DD";

const IndexInprogressTask = () => {
  const row = 10;
  const [current, setCurrent] = useState(1);
  const [data, setData] = useState<TaskInprogressPageEntity>();
  const [showModalMap, setShowModalMap] = useState<boolean>(false);
  const [plotId, setPlotId] = useState<string>("");
  const [searchText, setSearchText] = useState<string>();
  const [searchProvince, setSearchProvince] = useState<any>();
  const [searchDistrict, setSearchDistrict] = useState<any>();
  const [searchSubdistrict, setSearchSubdistrict] = useState<any>();
  const [province, setProvince] = useState<ProviceEntity[]>();
  const [district, setDistrict] = useState<DistrictEntity[]>();
  const [subdistrict, setSubdistrict] = useState<SubdistrictEntity[]>();

  const [startDate, setStartDate] = useState<any>(null);
  const [endDate, setEndDate] = useState<any>(null);

  const fetchInprogressTask = async (
    proId?: number,
    disId?: number,
    subDisId?: number,
    text?: string
  ) => {
    await TaskDatasource.getInprogressTaskList(
      row,
      current,
      proId,
      disId,
      subDisId,
      text,
      startDate,
      endDate
    ).then((res) => {
      console.log(res);
      setData(res);
    });
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
    fetchInprogressTask();
    fetchProvince();
  }, [current, startDate, endDate]);

  const SearchDate = (e: any) => {
    if (e != null) {
      setStartDate(moment(new Date(e[0])).format(dateSearchFormat));
      setEndDate(moment(new Date(e[1])).format(dateSearchFormat));
    } else {
      setStartDate(e);
      setEndDate(e);
    }
    setCurrent(1);
  };
  const onChangePage = (page: number) => {
    setCurrent(page);
  };
  const changeTextSearch = (searchText: any) => {
    setSearchText(searchText.target.value);
    setCurrent(1);
  };
  const handleModalMap = (plotId: string) => {
    setShowModalMap((prev) => !prev);
    setPlotId(plotId);
  };
  const handleProvince = (provinceId: number) => {
    setSearchProvince(provinceId);
    fetchDistrict(provinceId);
    setCurrent(1);
  };
  const handleDistrict = (districtId: number) => {
    fetchSubdistrict(districtId);
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
            <strong>งานรอดำเนินการ</strong>
          </span>
        </div>
        <div style={{ color: color.Error }}>
          <RangePicker
            allowClear
            onCalendarChange={SearchDate}
            format={dateFormat}
          />
        </div>
      </div>
      <div
        className="container d-flex justify-content-between"
        style={{ padding: "8px" }}
      >
        <div className="col-lg-4 p-1">
          <Input
            allowClear
            prefix={<SearchOutlined style={{ color: color.Disable }} />}
            placeholder="ค้นหาชื่อเกษตรกร, คนบินโดรน หรือเบอร์โทร"
            className="col-lg-12 p-1"
            onChange={changeTextSearch}
          />
        </div>
        <div className="col-lg">
          <Select
            allowClear
            className="col-lg-12 p-1"
            placeholder="เลือกจังหวัด"
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
            onChange={handleProvince}
          >
            {province?.map((item) => (
              <option value={item.provinceId}>{item.provinceName}</option>
            ))}
          </Select>
        </div>
        <div className="col-lg">
          <Select
            allowClear
            className="col-lg-12 p-1"
            placeholder="เลือกอำเภอ"
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
            onChange={handleDistrict}
            disabled={searchProvince == undefined}
          >
            {district?.map((item) => (
              <option value={item.districtId}>{item.districtName}</option>
            ))}
          </Select>
        </div>
        <div className="col-lg">
          <Select
            allowClear
            className="col-lg-12 p-1"
            placeholder="เลือกตำบล"
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
            onChange={handleSubDistrict}
            disabled={searchDistrict == undefined}
          >
            {subdistrict?.map((item) => (
              <option value={item.subdistrictId}>{item.subdistrictName}</option>
            ))}
          </Select>
        </div>
        <div className="col-lg">
          <Select
            className="col-lg-12 p-1"
            placeholder="เลือกสถานะ"
            allowClear
          ></Select>
        </div>
        <div className="pt-1">
          <Button
            style={{
              borderColor: color.Success,
              borderRadius: "5px",
              color: color.secondary2,
              backgroundColor: color.Success,
            }}
            onClick={() =>
              fetchInprogressTask(
                searchProvince,
                searchDistrict,
                searchSubdistrict,
                searchText
              )
            }
          >
            ค้นหาข้อมูล
          </Button>
        </div>
      </div>
    </>
  );
  const columns = [
    {
      title: "วัน/เวลา นัดหมาย",
      dataIndex: "dateAppointment",
      key: "dateAppointment",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span className="text-dark-75  d-block font-size-lg">
                {moment(new Date(row.dateAppointment)).format(dateFormat)},{" "}
                {moment(new Date(row.dateAppointment)).format(timeFormat)}
              </span>
              <span style={{ color: color.Disable, fontSize: "12px" }}>
                {row.taskNo}
              </span>
            </>
          ),
        };
      },
    },
    {
      title: "ชื่อนักบินโดรน",
      dataIndex: "droner",
      key: "droner",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span className="text-dark-75  d-block font-size-lg">
                {row.droner !== null
                  ? row.droner.firstname + " " + row.droner.lastname
                  : null}
              </span>
              <span style={{ color: color.Disable, fontSize: "12px" }}>
                {row.droner !== null ? row.droner.telephoneNo : null}
              </span>
            </>
          ),
        };
      },
    },
    {
      title: "ชื่อเกษตรกร",
      dataIndex: "farmer",
      key: "farmer",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span className="text-dark-75  d-block font-size-lg">
                {row.farmer.firstname + " " + row.farmer.lastname}
              </span>
              <span style={{ color: color.Disable, fontSize: "12px" }}>
                {row.farmer.telephoneNo}
              </span>
            </>
          ),
        };
      },
    },
    {
      title: "พื้นที่แปลงเกษตร",
      dataIndex: "plotArea",
      key: "plotArea",
      render: (value: any, row: any, index: number) => {
        const findDataPlot = row.farmer.farmerPlot.filter(
          (x: any) => x.id == row.farmerPlotId
        )[0];
        return {
          children: (
            <>
              <span className="text-dark-75  d-block font-size-lg">
                {findDataPlot != undefined
                  ? findDataPlot.plotArea.subdistrictName + "/"
                  : null}
                {findDataPlot != undefined
                  ? findDataPlot.plotArea.districtName + "/"
                  : null}
                {findDataPlot != undefined
                  ? findDataPlot.plotArea.provinceName
                  : null}
              </span>
              <a
                onClick={() => handleModalMap(row.farmerPlotId)}
                style={{ color: color.primary1 }}
              >
                ดูแผนที่แปลง
              </a>
            </>
          ),
        };
      },
    },
    {
      title: "ค่าบริการ",
      dataIndex: "subdistrict_subdistrict_name",
      key: "subdistrict_subdistrict_name",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span className="text-dark-75  d-block font-size-lg">
                {row.totalPrice != null
                  ? numberWithCommas(parseFloat(row.totalPrice)) + " " + "บาท"
                  : "0 บาท"}
              </span>
              <span style={{ color: color.Disable, fontSize: "12px" }}>
                {"จำนวน" + " " + row.farmAreaAmount + " " + "ไร่"}
              </span>
            </>
          ),
        };
      },
    },
    {
      title: "สถานะ",
      dataIndex: "district_district_name",
      key: "district_district_name",
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
                icon={<EditOutlined />}
                color={color.primary1}
                onClick={() =>
                  (window.location.href = "/EditInprogressTask/id=" + row.id)
                }
              />
            </div>
          ),
        };
      },
    },
  ];

  return (
    <>
      <Layouts>
        {PageTitle}
        <CardContainer>
          <Table columns={columns} dataSource={data?.data} pagination={false} />
        </CardContainer>
        <div className="d-flex justify-content-between pt-4">
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
      {showModalMap && (
        <ModalMapPlot
          show={showModalMap}
          backButton={() => setShowModalMap((prev) => !prev)}
          title="แผนที่แปลงเกษตร"
          plotId={plotId}
        />
      )}
    </>
  );
};
export default IndexInprogressTask;
