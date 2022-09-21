import {
  Badge,
  Button,
  Checkbox,
  DatePicker,
  Dropdown,
  Input,
  Menu,
  Pagination,
  Rate,
  Select,
  Table,
} from "antd";
import Search from "antd/lib/input/Search";
import moment from "moment";
import React, { useEffect, useState } from "react";
import ActionButton from "../../../components/button/ActionButton";
import Layouts from "../../../components/layout/Layout";
import { LocationDatasource } from "../../../datasource/LocationDatasource";
import {
  DistrictEntity,
  ProviceEntity,
  SubdistrictEntity,
} from "../../../entities/LocationEntities";
import color from "../../../resource/color";
import {
  DownOutlined,
  EditOutlined,
  FileTextOutlined,
  SearchOutlined,
  StarFilled,
  UserOutlined,
} from "@ant-design/icons";
import { TaskFinishedDatasource } from "../../../datasource/TaskFinishDatasource";
import {
  TaskFinishListEntity,
  TaskFinish_INIT,
} from "../../../entities/TaskFinishEntities";
import { FarmerPlotEntity } from "../../../entities/FarmerPlotEntities";
import { Option } from "antd/lib/mentions";
import {
  FINISH_TASK,
  FINISH_TASK_SEARCH,
  STATUS_COLOR_TASK,
  TASK_HISTORY,
} from "../../../definitions/FinishTask";
import ModalMapPlot from "../../../components/modal/task/finishTask/ModalMapPlot";
export default function IndexFinishTask() {
  const row = 10;
  const [current, setCurrent] = useState(1);
  const [data, setData] = useState<TaskFinishListEntity>();
  const [searchText, setSearchText] = useState<string>();
  const [searchStatus, setSearchStatus] = useState<string>();
  const [startDate, setStartDate] = useState<any>(null);
  const [endDate, setEndDate] = useState<any>(null);
  const [searchProvince, setSearchProvince] = useState<any>();
  const [searchDistrict, setSearchDistrict] = useState<any>();
  const [searchSubdistrict, setSearchSubdistrict] = useState<any>();
  const [province, setProvince] = useState<ProviceEntity[]>();
  const [district, setDistrict] = useState<DistrictEntity[]>();
  const [subdistrict, setSubdistrict] = useState<SubdistrictEntity[]>();
  const [showModalMap, setShowModalMap] = useState<boolean>(false);
  const [plotId, setPlotId] = useState<string>("");
  const { RangePicker } = DatePicker;
  const dateFormat = "DD/MM/YYYY";
  const timeFormat = "HH:mm";
  const dateSearchFormat = "YYYY-MM-DD";
  useEffect(() => {
    fetchTaskFinish();
    fetchProvince();
  }, [current, row, startDate, endDate]);
  const fetchTaskFinish = async (
    proId?: number,
    disId?: number,
    subDisId?: number,
    text?: string
  ) => {
    await TaskFinishedDatasource.getTaskFinishList(
      current,
      row,
      proId,
      disId,
      subDisId,
      startDate,
      endDate,
      searchStatus,
      text
    ).then((res: TaskFinishListEntity) => {
      setData(res);
    });
  };
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
  const changeTextSearch = (searchText: any) => {
    setSearchText(searchText.target.value);
    setCurrent(1);
  };
  const onChangePage = (page: number) => {
    setCurrent(page);
  };
  const handleStatus = (status: any) => {
    setSearchStatus(status);
    setCurrent(1);
  };
  const formatNumber = (e: any) => {
    let formatNumber = Number(e)
      .toFixed(1)
      .replace(/\d(?=(\d{3})+\.)/g, "$&,");
    let splitArray = formatNumber.split(".");
    if (splitArray.length > 1) {
      formatNumber = splitArray[0];
    }
    return formatNumber;
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
  const handleModalMap = (plotId: string) => {
    setShowModalMap((prev) => !prev);
    setPlotId(plotId);
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
            <strong>งานที่เสร็จแล้ว</strong>
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
        <div className="col-lg">
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
        <div className="col-lg">
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
        <div className="col-lg">
          <Select
            className="col-lg-12 p-1"
            placeholder="เลือกสถานะ"
            onChange={handleStatus}
            allowClear
          >
            {FINISH_TASK_SEARCH.map((item) => (
              <option value={item.value}>{item.name}</option>
            ))}
          </Select>
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
              fetchTaskFinish(
                searchSubdistrict,
                searchDistrict,
                searchProvince,
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
        const subdistrict = row.farmerPlot.plotArea;
        const district = row.farmerPlot.plotArea;
        const province = row.farmerPlot.plotArea;
        return {
          children: (
            <>
              <span className="text-dark-75  d-block font-size-lg">
                {subdistrict != undefined
                  ? subdistrict.subdistrictName + "/"
                  : null}
                {district != undefined ? district.districtName + "/" : null}
                {province != undefined ? province.provinceName + "/" : null}
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
      title: "Rating",
      dataIndex: "avgrating",
      key: "avgrating",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span className="text-dark-75  d-block font-size-lg">
                {row.reviewDronerAvg > "0" ? (
                  <span>
                    <StarFilled
                      style={{
                        color: "#FFCA37",
                        fontSize: "20px",
                        marginRight: "7px",
                      }}
                    />
                    {parseFloat(row.reviewDronerAvg).toFixed(1)}
                  </span>
                ) : (
                  "-"
                )}
              </span>
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
                  ? formatNumber(row.totalPrice) + " " + "บาท"
                  : 0 + " " + "บาท"}
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
        const beforeValue = row.taskHistory[0];
        return {
          children: (
            <>
              <span style={{ color: STATUS_COLOR_TASK[row.status] }}>
                <Badge color={STATUS_COLOR_TASK[row.status]} />
                {FINISH_TASK[row.status]}
                {beforeValue != undefined
                  ? row.status == "CANCELED"
                    ? " " + "(" + TASK_HISTORY[beforeValue.beforeValue] + ")" 
                    : null
                  : null}
                <br />
              </span>
              <span style={{ color: color.Disable, fontSize: "12px" }}>
                <UserOutlined style={{ padding: "0 4px 0 0" }} />
                {row.createBy}
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
              {row.status == "WAIT_REVIEW" ? (
                <ActionButton
                  icon={<EditOutlined />}
                  color={color.primary1}
                  onClick={() =>
                    (window.location.href = "/ReviewTask?=" + row.id)
                  }
                />
              ) : row.status == "CANCELED" ? (
                <ActionButton
                  icon={<FileTextOutlined />}
                  color={color.primary1}
                  onClick={() =>
                    (window.location.href = "/CancelTask?=" + row.id)
                  }
                />
              ) : row.status == "DONE" ? (
                <ActionButton
                  icon={<FileTextOutlined />}
                  color={color.primary1}
                  onClick={() =>
                    (window.location.href = "/FinishTasks?=" + row.id)
                  }
                />
              ) : null}
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
        rowClassName={(a) =>
          a.status == "WAIT_REVIEW"
            ? "table-row-wait-review"
            : a.status === "CANCELED"
            ? "table-row-older"
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
      {showModalMap && (
        <ModalMapPlot
          show={showModalMap}
          backButton={() => setShowModalMap((prev) => !prev)}
          title="แผนที่แปลงเกษตร"
          plotId={plotId}
        />
      )}
    </Layouts>
  );
}
