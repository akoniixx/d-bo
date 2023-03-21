import {
  DownOutlined,
  EditOutlined,
  InfoCircleFilled,
  SearchOutlined,
  StarFilled,
  UserOutlined,
} from "@ant-design/icons";
import {
  Badge,
  Button,
  Dropdown,
  Input,
  Menu,
  Select,
  Table,
  Tooltip,
} from "antd";
import DatePicker from "antd/lib/date-picker";
import { ColumnsType } from "antd/lib/table";
import moment from "moment";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ActionButton from "../../components/button/ActionButton";
import { CardContainer } from "../../components/card/CardContainer";
import Layouts from "../../components/layout/Layout";
import ModalMapPlot from "../../components/modal/task/finishTask/ModalMapPlot";
import { LocationDatasource } from "../../datasource/LocationDatasource";
import {
  DistrictEntity,
  ProviceEntity,
  SubdistrictEntity,
} from "../../entities/LocationEntities";
import { color } from "../../resource";

interface DataType {
  key: React.Key;
  date: string;
  farmer: string;
  droner: string;
  plotArea: string;
  plotCount: string;
  rating: string;
  sumPrice: string;
  status: string;
}
function IndexReport() {
  const row = 5;
  const [current, setCurrent] = useState(1);
  // const [data, setData] = useState<TaskFinishListEntity>();
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
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const { RangePicker } = DatePicker;
  const dateFormat = "DD/MM/YYYY";
  const timeFormat = "HH:mm";
  const dateSearchFormat = "YYYY-MM-DD";
  useEffect(() => {
    fetchProvince();
  }, [current, row, startDate, endDate]);

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
  const isNumber = (n: any) => {
    return !isNaN(parseFloat(n)) && isFinite(n);
  };
  const sorter = (a: any, b: any) => {
    if (a === null) {
      return 1;
    }
    if (b === null) {
      return -1;
    }
    if (isNumber(a) && isNumber(b)) {
      if (parseInt(a, 10) === parseInt(b, 10)) {
        return 0;
      }
      return parseInt(a, 10) > parseInt(b, 10) ? 1 : -1;
    }
    if (isNumber(a)) {
      return -1;
    }
    if (isNumber(b)) {
      return 1;
    }
    if (a === b) {
      return 0;
    }
    return a > b ? 1 : -1;
  };
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const paid = (data: any) => {
    Swal.fire({
      title: "ยืนยันการเปลี่ยนสถานะ",
      text: "โปรดตรวจสอบงานที่คุณต้องการเปลี่ยนสถานะ ก่อนที่จะกดยืนยัน เพราะอาจส่งผลต่อการจ่ายเงินของนักบินโดรนในระบบ",
      cancelButtonText: "ยกเลิก",
      confirmButtonText: "ยืนยัน",
      confirmButtonColor: color.Success,
      showCancelButton: true,
      showCloseButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        // call api
      }
    });
  };
  const menu = (
    <Menu
      items={[
        {
          label: "ดาวน์โหลดไฟล์ PDF",
          key: "1",
          // onClick: () => (window.location.href = "/"),
        },
        {
          label: "ดาวน์โหลดไฟล์ Excel",
          key: "2",
          // onClick: () => (window.location.href = "/"),
        },
      ]}
    />
  );
  const data: DataType[] = [
    {
      key: "1",
      date: "12/03/2023",
      farmer: "สมชาย",
      droner: "สมศักดิ์",
      plotArea: "สวนพริกไทย/เมืองปทุมธานี/ปทุมธานี",
      plotCount: "20 ไร่",
      rating: "4.0",
      sumPrice: "1,000 บาท",
      status: "รอจ่ายเงิน",
    },
    {
      key: "2",
      date: "12/03/2023",
      farmer: "สมหญิง",
      droner: "สมหมาย",
      plotArea: "ปากเพรียว/เมืองสระบุรี/สระบุรี",
      plotCount: "50 ไร่",
      rating: "5.0",
      sumPrice: "2,500 บาท",
      status: "รอจ่ายเงิน",
    },
    {
      key: "3",
      date: "12/03/2023",
      farmer: "สมหญิง",
      droner: "สมหมาย",
      plotArea: "ปากเพรียว/เมืองสระบุรี/สระบุรี",
      plotCount: "50 ไร่",
      rating: "5.0",
      sumPrice: "2,500 บาท",
      status: "จ่ายเงินแล้ว",
    },
  ];
  const columns: ColumnsType<DataType> = [
    {
      title: "วัน/เวลา นัดหมาย",
      dataIndex: "date",
      sorter: (a: any, b: any) => sorter(a.date, b.date),
      render: (text: string) => (
        <>
          <span className="text-dark-75  d-block font-size-lg">
            {moment(new Date()).format(dateFormat)},{" "}
            {moment(new Date()).format(timeFormat)}
          </span>
          <span style={{ color: color.Disable, fontSize: "12px" }}>
            {"TK00000010"}
          </span>
        </>
      ),
    },
    {
      title: "",
      dataIndex: "farmer",
      render: (text: string) => (
        <a>
          {text}
          <br />
          <span style={{ color: color.Grey, fontSize: "12px" }}>
            {"0805233635"}
          </span>
        </a>
      ),
    },
    {
      title: "",
      dataIndex: "droner",
      render: (text: string) => (
        <a>
          {text}
          <br />
          <span style={{ color: color.Grey, fontSize: "12px" }}>
            {"0989284761"}
          </span>
        </a>
      ),
    },
    {
      title: "พื้นที่แปลงเกษตร",
      dataIndex: "plotArea",
      render: (text: string) => (
        <>
          <span className="text-dark-75  d-block font-size-lg">{text}</span>
          <a
            // onClick={() => handleModalMap(row.farmerPlotId)}
            style={{ color: color.primary1 }}
          >
            ดูแผนที่แปลง
          </a>
        </>
      ),
    },
    {
      title: "จำนวนไร่",
      dataIndex: "plotCount",
      sorter: (a: any, b: any) => sorter(a.name, b.name),
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "Rating",
      dataIndex: "rating",
      sorter: (a: any, b: any) => sorter(a.name, b.name),
      render: (text: string) => (
        <>
          <span>
            <StarFilled
              style={{
                color: "#FFCA37",
                fontSize: "20px",
                marginRight: "7px",
              }}
            />
            {parseFloat(`${text}`).toFixed(1)}
          </span>
        </>
      ),
    },
    {
      title: "ยอดรวมค่าบริการ",
      dataIndex: "sumPrice",
      sorter: (a: any, b: any) => sorter(a.name, b.name),
      render: (text: string) => (
        <>
          <span className="text-dark-75  d-block font-size-lg">
            {text}
            <Tooltip title={"?"} className="p-2">
              <InfoCircleFilled
                style={{
                  fontSize: "18px",
                  marginLeft: "3px",
                  color: color.primary1,
                }}
              />
            </Tooltip>
          </span>
        </>
      ),
    },
    {
      title: "สถานะ",
      dataIndex: "status",
      render: (text: string) => (
        <>
          {text === "จ่ายเงินแล้ว" ? (
            <>
              <span style={{ color: "#A9CB62" }}>
                <Badge color={"#A9CB62"} /> {text}
                <br />
              </span>
              <span style={{ color: color.Grey, fontSize: "12px" }}>
                <UserOutlined style={{ padding: "0 4px 0 0" }} />
                {"SaiMhai"}
              </span>
            </>
          ) : (
            <>
              <span style={{ color: color.primary1 }}>
                <Badge color={color.primary1} /> {text}
                <br />
              </span>
              <span style={{ color: color.Grey, fontSize: "12px" }}>
                <UserOutlined style={{ padding: "0 4px 0 0" }} />
                {"SaiMhai"}
              </span>
            </>
          )}
        </>
      ),
    },
    {
      title: "",
      dataIndex: "action",
      width: "5%",
      fixed: "right",
      render: (text: string) => (
        <div className="d-flex flex-row justify-content-between">
          <ActionButton
            icon={<EditOutlined />}
            color={color.primary1}
            onClick={() => (window.location.href = "/EditReport?=")}
          />
        </div>
      ),
    },
  ];
  const PageTitle = (
    <>
      <div
        className="container d-flex justify-content-between"
        style={{ padding: "10px" }}
      >
        {selectedRowKeys.length != 0 ? (
          <>
            <div className="col-lg-6">
              <span
                className="card-label font-weight-bolder text-dark"
                style={{
                  fontSize: 22,
                  fontWeight: "bold",
                }}
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
            <div>
              <div>
                <Dropdown overlay={menu}>
                  <Button
                    style={{
                      padding: "8 0",
                      backgroundColor: color.primary1,
                      color: color.secondary2,
                      borderColor: color.Success,
                      borderRadius: "5px",
                    }}
                  >
                    ดาวน์โหลดเอกสาร
                    <DownOutlined />
                  </Button>
                </Dropdown>
              </div>
            </div>
            <div>
              <Button
                style={{
                  borderColor: color.Success,
                  borderRadius: "5px",
                  color: color.secondary2,
                  backgroundColor: color.Success,
                }}
                onClick={()=> paid(selectedRowKeys)}
              >
                จ่ายเงินแล้ว
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="col-lg-7">
              <span
                className="card-label font-weight-bolder text-dark"
                style={{
                  fontSize: 22,
                  fontWeight: "bold",
                }}
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
            <div>
              <div>
                <Button
                  disabled
                  style={{
                    padding: "8 0",
                    borderRadius: "5px",
                  }}
                >
                  ดาวน์โหลดเอกสาร
                  <DownOutlined />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="container d-flex justify-content-between pt-3">
        <CardContainer
          style={{
            width: "20%",
            padding: "15px",
            marginRight: "20px",
            borderRadius: "5px",
          }}
        >
          <p>รอรีวิว</p>
          <div className="d-flex justify-content-between">
            <CardContainer
              style={{
                backgroundColor: color.blue,
                borderRadius: "5px",
                padding: "10px",
                width: "100%",
                marginRight: "10px",
              }}
            >
              <div
                className="d-flex justify-content-between"
                style={{ color: color.White, fontWeight: "bold" }}
              >
                <p>รอรีวิว</p>
              </div>
            </CardContainer>
          </div>
        </CardContainer>
        <CardContainer
          style={{
            width: "55%",
            padding: "15px",
            marginRight: "20px",
            borderRadius: "5px",
          }}
        >
          <p>เสร็จสิน</p>
          <div className="d-flex justify-content-between">
            <CardContainer
              style={{
                backgroundColor: color.primary1,
                borderRadius: "5px",
                padding: "10px",
                width: "100%",
                marginRight: "10px",
              }}
            >
              <div
                className="d-flex justify-content-between"
                style={{ color: color.White, fontWeight: "bold" }}
              >
                <p>รอจ่ายเงิน</p>
              </div>
            </CardContainer>
            <CardContainer
              style={{
                backgroundColor: "#A9CB62",
                borderRadius: "5px",
                padding: "10px",
                width: "100%",
                marginRight: "10px",
              }}
            >
              <div
                className="d-flex justify-content-between"
                style={{ color: color.White, fontWeight: "bold" }}
              >
                <p>จ่ายเงินแล้ว (บริษัท)</p>
              </div>
            </CardContainer>
            <CardContainer
              style={{
                backgroundColor: color.Warning,
                borderRadius: "5px",
                padding: "10px",
                width: "100%",
                marginRight: "10px",
              }}
            >
              <div
                className="d-flex justify-content-between"
                style={{ color: color.White, fontWeight: "bold" }}
              >
                <p>เสร็จสิ้น</p>
              </div>
            </CardContainer>
          </div>
        </CardContainer>
        <CardContainer
          style={{
            width: "20%",
            padding: "15px",
            marginRight: "20px",
            borderRadius: "5px",
          }}
        >
          <p>ยกเลิก</p>
          <div className="d-flex justify-content-between">
            <CardContainer
              style={{
                backgroundColor: color.Error,
                borderRadius: "5px",
                padding: "10px",
                width: "100%",
              }}
            >
              <div
                className="d-flex justify-content-between"
                style={{ color: color.White, fontWeight: "bold" }}
              >
                <p>ยกเลิก</p>
              </div>
            </CardContainer>
          </div>
        </CardContainer>
      </div>
      <div className="container d-flex justify-content-between pt-3">
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
            disabled={searchProvince === undefined}
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
            options={[
              { value: "รอจ่ายเงิน", label: "รอจ่ายเงิน" },
              { value: "จ่ายเงินแล้ว", label: "จ่ายเงินแล้ว" },
            ]}
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
            // onClick={}
          >
            ค้นหาข้อมูล
          </Button>
        </div>
      </div>
    </>
  );

  return (
    <Layouts>
      {PageTitle}
      <br />
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        scroll={{ x: 1350 }}
      />
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
export default IndexReport;
