import {
  DownOutlined,
  EditOutlined,
  UserOutlined,
  ExceptionOutlined,
  InfoCircleFilled,
} from "@ant-design/icons";
import {
  Badge,
  Button,
  DatePicker,
  Divider,
  Dropdown,
  Menu,
  Pagination,
  Popover,
  Select,
  Table,
} from "antd";
import Search from "antd/lib/input/Search";
import moment from "moment";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ActionButton from "../../../components/button/ActionButton";
import { CardContainer } from "../../../components/card/CardContainer";
import ModalDronerList from "../../../components/modal/task/newTask/ModalDronerList";
import ModalMapPlot from "../../../components/modal/task/newTask/ModalMapPlot";
import InvoiceTask from "../../../components/popover/InvoiceTask";
import { TaskDatasource } from "../../../datasource/TaskDatasource";
import {
  NEWTASK_STATUS_SEARCH,
  STATUS_NEWTASK_COLOR_MAPPING,
} from "../../../definitions/Status";
import {
  InvoiceTaskEntity,
  NewTaskPageEntity,
  UpdateTaskStatus,
  UpdateTaskStatus_INIT,
} from "../../../entities/NewTaskEntities";
import { color } from "../../../resource";
import { DateTimeUtil } from "../../../utilities/DateTimeUtil";
import {
  numberWithCommas,
  numberWithCommasToFixed,
} from "../../../utilities/TextFormatter";
import { DashboardLayout } from "../../../components/layout/Layout";
import { useNavigate } from "react-router-dom";
const { RangePicker } = DatePicker;
const dateFormat = "DD-MM-YYYY";
const dateSearchFormat = "YYYY-MM-DD";

const IndexNewTask = () => {
  const profile = JSON.parse(localStorage.getItem("profile") || "{  }");
  const navigate = useNavigate();
  const row = 10;
  const [current, setCurrent] = useState(1);
  const [data, setData] = useState<NewTaskPageEntity>();
  const [searchStatus, setSearchStatus] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");
  const [searchStartDate, setSearchStartDate] = useState<any>(null);
  const [searchEndDate, setSearchEndDate] = useState<any>(null);
  const [showModalMap, setShowModalMap] = useState<boolean>(false);
  const [showModalDroner, setShowModalDroner] = useState<boolean>(false);

  const [plotId, setPlotId] = useState<string>("");
  const [taskId, setTaskId] = useState<string>("");

  const fetchNewTaskList = async () => {
    await TaskDatasource.getNewTaskList(
      row,
      current,
      searchStatus,
      searchText,
      searchStartDate,
      searchEndDate
    ).then((res) => {
      console.log(res.data);
      setData(res);
    });
  };

  useEffect(() => {
    fetchNewTaskList();
  }, [searchStatus, searchText, searchStartDate, searchEndDate, current]);

  const handleSearchStatus = (status: any) => {
    setSearchStatus(status);
    setCurrent(1);
  };
  const handleSearchText = (e: string) => {
    setSearchText(e);
    setCurrent(1);
  };
  const handleSearchDate = (e: any) => {
    if (e != null) {
      setSearchStartDate(moment(new Date(e[0])).format(dateSearchFormat));
      setSearchEndDate(moment(new Date(e[1])).format(dateSearchFormat));
    } else {
      setSearchStartDate(e);
      setSearchEndDate(e);
    }
    setCurrent(1);
  };
  const handleModalMap = (plotId: string) => {
    setShowModalMap((prev) => !prev);
    setPlotId(plotId);
  };
  const handleModalDronerList = (taskId: string) => {
    setShowModalDroner((prev) => !prev);
    setTaskId(taskId);
  };
  const removeNewTask = async (id: string) => {
    Swal.fire({
      title: "ยืนยันการยกเลิก",
      cancelButtonText: "ยกเลิก",
      confirmButtonText: "ยืนยัน",
      confirmButtonColor: "#d33",
      showCancelButton: true,
      showCloseButton: true,
      input: "textarea",
      inputPlaceholder: "กรอกเหตุผลการยกเลิก",
      inputAttributes: { input: "text", required: "true" },
      html:
        "<p class='text-left'>โปรดตรวจสอบงานใหม่ที่คุณต้องการลบ ก่อนที่จะกดยืนยันการลบ เพราะอาจส่งผลต่อการจ้างงานในระบบ</p>" +
        "<p class='text-left'>เหตุผล</p>",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const data: UpdateTaskStatus = UpdateTaskStatus_INIT;
        data.id = id;
        data.status = "CANCELED";
        data.statusRemark = result.value;
        data.updateBy = profile.firstname + " " + profile.lastname;
        await TaskDatasource.cancelNewTask(data).then((res) => {
          //navigate("/IndexNewTask");
        });
      }
      fetchNewTaskList();
    });
  };
  const onChangePage = (page: number) => {
    setCurrent(page);
  };

  const menu = (
    <Menu
      items={[
        {
          label: "เลือกนักบินหลายคน (แบบปกติ)",
          key: "1",
          onClick: () => navigate("/AddNewTask=checkbox"),
        },
        {
          label: "บังคับเลือกนักบิน (ติดต่อแล้ว)",
          key: "2",
          onClick: () => navigate("/AddNewTask=radio"),
        },
      ]}
    />
  );
  const pageTitle = (
    <div
      className="container d-flex justify-content-between"
      style={{ padding: "10px" }}
    >
      <div className="col-lg-2">
        <span
          className="card-label font-weight-bolder text-dark"
          style={{
            fontSize: 22,
            fontWeight: "bold",
            padding: "8px",
          }}
        >
          <strong>งานใหม่ (รอนักบิน)</strong>
        </span>
      </div>
      <div className="col-lg-3">
        <Search
          placeholder="ค้นหาชื่อเกษตรกร หรือเบอร์โทร"
          className="col-lg-12 p-1"
          onSearch={handleSearchText}
        />
      </div>
      <div className="col-lg-2">
        <Select
          className="col-lg-12 p-1"
          placeholder="สถานะทั้งหมด"
          onChange={handleSearchStatus}
          allowClear
        >
          {NEWTASK_STATUS_SEARCH.map((item) => (
            <option value={item.name}>{item.name}</option>
          ))}
        </Select>
      </div>
      <div className="col-lg-3 p-1">
        <RangePicker
          allowClear
          onCalendarChange={(val) => handleSearchDate(val)}
          format={dateFormat}
        />
      </div>
      <div className="col-lg-2 p-1">
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
            เพิ่มงานบินโดรนใหม่
            <DownOutlined />
          </Button>
        </Dropdown>
      </div>
    </div>
  );
  const columns = [
    {
      title: "วัน/เวลานัดหมาย",
      dataIndex: "date_appointment",
      key: "date_appointment",
      width: "20%",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span>{DateTimeUtil.formatDateTime(value)}</span>
              <br />
              <span style={{ color: color.Grey }}>{row.task_no}</span>
            </>
          ),
        };
      },
    },
    {
      title: "ชื่อเกษตรกร",
      dataIndex: "fullname",
      key: "fullname",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span>{row.firstname + " " + row.lastname}</span>
              <br />
              <span style={{ color: color.Grey }}>{row.telephone_no}</span>
            </>
          ),
        };
      },
    },
    {
      title: "พื้นที่แปลงเกษตร",
      render: (value: any, row: any, index: number) => {
        const checkAddress = () => {
          let province = row.province_name + "";
          let district =
            row.district_name == null ? "" : row.district_name + "/";
          let subdistrict =
            row.subdistrict_name == null ? "" : row.subdistrict_name + "/";
          return subdistrict + district + province;
        };
        return {
          children: (
            <>
              <span>{checkAddress()}</span>
              <br />
              <div
                onClick={() => handleModalMap(row.farmer_plot_id)}
                style={{ color: color.primary1, cursor: "pointer" }}
              >
                ดูแผนที่แปลง
              </div>
            </>
          ),
        };
      },
    },
    {
      title: "ค่าบริการ",
      dataIndex: "total_price",
      key: "total_price",
      render: (value: any, row: any, index: number) => {
        const inv: InvoiceTaskEntity = {
          raiAmount: row.farm_area_amount,
          unitPrice: row.unit_price,
          price: row.price,
          fee: row.fee,
          discountFee: row.discount_fee,
          discountCoupon: row.discount_coupon,
          discountPromotion: row.discount_promotion,
          discountPoint: row.discount_campaign_point,
          totalPrice: row.total_price,
        };
        return {
          children: (
            <>
              <span>
                {!row.total_price
                  ? 0.0 + " บาท"
                  : numberWithCommas(parseFloat(row.total_price)) + " บาท"}
              </span>
              <InvoiceTask
                iconColor={color.Success}
                title="รายละเอียดค่าบริการ"
                data={inv}
              />
            </>
          ),
        };
      },
    },
    {
      title: "นักบินโดรน",
      dataIndex: "count_droner",
      key: "count_droner",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span>จำนวน {row.count_droner} ราย</span>
              <br />
              <a
                onClick={() => handleModalDronerList(row.id)}
                style={{ color: color.primary1 }}
              >
                ดูรายชื่อนักบินโดรน
              </a>
            </>
          ),
        };
      },
    },
    {
      title: "สถานะ",
      dataIndex: "task_status",
      key: "task_status",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span
                style={{
                  color: STATUS_NEWTASK_COLOR_MAPPING[row.task_status],
                }}
              >
                <Badge color={STATUS_NEWTASK_COLOR_MAPPING[row.task_status]} />{" "}
                {row.task_status}
              </span>
              <br />
              <span style={{ color: color.Grey }}>
                <UserOutlined
                  style={{ padding: "0 4px 0 0", verticalAlign: 0.5 }}
                />
                {row.create_by}
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
      width: "9%",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div className="d-flex flex-row justify-content-center">
              <div className="col-lg-6">
                <ActionButton
                  icon={<EditOutlined />}
                  color={color.primary1}
                  onClick={() =>
                    navigate("/EditNewTask/id=" + row.id)
                  }
                />
              </div>
              <div className="col-lg-6">
                <ActionButton
                  icon={<ExceptionOutlined />}
                  color={color.Error}
                  onClick={() => removeNewTask(row.id)}
                />
              </div>
            </div>
          ),
        };
      },
    },
  ];

  return (
    <>
      <>
        {pageTitle}
        <CardContainer>
          <Table
            dataSource={data?.data}
            columns={columns}
            pagination={false}
            size="large"
            tableLayout="fixed"
            rowClassName={(a) =>
              a.task_status == "ไม่มีนักบินรับงาน"
                ? "table-row-older"
                : "table-row-lasted"
            }
          />
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
        {showModalMap && (
          <ModalMapPlot
            show={showModalMap}
            backButton={() => setShowModalMap((prev) => !prev)}
            title="แผนที่แปลงเกษตร"
            plotId={plotId}
          />
        )}
        {showModalDroner && (
          <ModalDronerList
            show={showModalDroner}
            backButton={() => setShowModalDroner((prev) => !prev)}
            title="รายชื่อนักโดรนบิน"
            taskId={taskId}
          />
        )}
      </>
    </>
  );
};

export default IndexNewTask;
