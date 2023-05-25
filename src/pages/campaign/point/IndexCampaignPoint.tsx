import {
  ClockCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Badge,
  Button,
  Col,
  DatePicker,
  Divider,
  Input,
  Modal,
  Pagination,
  Row,
  Select,
  Table,
} from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ActionButton from "../../../components/button/ActionButton";
import { CardContainer } from "../../../components/card/CardContainer";
import  { DashboardLayout } from "../../../components/layout/Layout";
import { CampaignDatasource } from "../../../datasource/CampaignDatasource";
import { STATUS_COLOR } from "../../../definitions/DronerStatus";
import { STATUS_COUPON } from "../../../definitions/Status";
import {
  CampaignListEntity,
  CampaignListEntity_INIT,
} from "../../../entities/CampaignPointEntites";
import { color } from "../../../resource";
import { DateTimeUtil } from "../../../utilities/DateTimeUtil";

const { RangePicker } = DatePicker;

const IndexCampaignPoint = () => {
  const navigate = useNavigate();
  const dateFormat = "DD/MM/YYYY";
  const dateSearchFormat = "YYYY-MM-DD";

  const row = 10;
  const [current, setCurrent] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState<CampaignListEntity>(CampaignListEntity_INIT);
  const [searchStartDate, setSearchStartDate] = useState<any>(null);
  const [searchEndDate, setSearchEndDate] = useState<any>(null);
  const [keyword, setKeyword] = useState<string>("");
  const [searchApp, setSearchApp] = useState<string>("");
  const [searchStatus, setSearchStatus] = useState<string>("");
  const [deleteId, setDeleteId] = useState<string>("");

  const fetchCampaignList = () => {
    CampaignDatasource.getCampaignList(
      "POINT",
      row,
      current,
      searchStartDate,
      searchEndDate,
      searchStatus,
      keyword,
      searchApp
    ).then((res) => {
      setData(res);
    });
  };

  useEffect(() => {
    fetchCampaignList();
  }, [searchStartDate, searchEndDate, current]);

  const onChangePage = (page: number) => {
    setCurrent(page);
  };
  const handleSearchDate = (e: any) => {
    if (!e) {
      setSearchStartDate(e);
      setSearchEndDate(e);
    } else {
      setSearchStartDate(moment(new Date(e[0])).format(dateSearchFormat));
      setSearchEndDate(moment(new Date(e[1])).format(dateSearchFormat));
    }
    setCurrent(1);
  };
  const setDeleteCampaign = (id: string) => {
    setShowModal(!showModal);
    setDeleteId(id);
  };
  const deleteCampaign = () => {
    CampaignDatasource.deleteCampaign(deleteId).then((res) => {
      setShowModal(!showModal);
      setDeleteId("");
      fetchCampaignList();
    });
  };

  const pageTitle = (
    <>
      <Row
        className="container d-flex justify-content-between"
        style={{ padding: "10px" }}
      >
        <Col span={14}>
          <span
            className="card-label font-weight-bolder text-dark"
            style={{
              fontSize: 22,
              fontWeight: "bold",
              padding: "8px",
            }}
          >
            <strong>แคมเปญแต้ม</strong>
          </span>
        </Col>
        <Col style={{ borderRight: "solid" }} span={7}>
          <RangePicker
            allowClear
            format={dateFormat}
            placeholder={["เลือกวันที่เริ่ม", "เลือกวันที่สิ้นสุด"]}
            onCalendarChange={(val) => handleSearchDate(val)}
          />
        </Col>
        <Col span={3} style={{ textAlign: "right" }}>
          <Button
            style={{
              borderColor: color.Success,
              borderRadius: "5px",
              color: color.secondary2,
              backgroundColor: color.Success,
            }}
            onClick={() => navigate("/AddCampaignPoint")}
          >
            เพิ่มแคมแปญ
          </Button>
        </Col>
      </Row>
      <div
        className="container d-flex justify-content-between"
        style={{ padding: "8px" }}
      >
        <div className="col-lg-5 p-1">
          <Input
            allowClear
            prefix={<SearchOutlined style={{ color: color.Disable }} />}
            placeholder="ค้นหาชื่อแคมเปญแต้ม"
            className="col-lg-12 p-1"
            defaultValue={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
        <div className="col-lg">
          <Select
            allowClear
            className="col-lg-12 p-1"
            placeholder="แอปพลิเคชัน"
            onChange={(e) => setSearchApp(e)}
          >
            <option value="FARMER">Farmer</option>
            <option value="DRONER">Droner</option>
          </Select>
        </div>
        <div className="col-lg">
          <Select
            allowClear
            className="col-lg-12 p-1"
            placeholder="สถานะ"
            onChange={(e) => setSearchStatus(e)}
          >
            <option value="ACTIVE">ใช้งาน</option>
            <option value="DRAFTING">รอเปิดใช้งาน</option>
            <option value="INACTIVE">ปิดใช้งาน</option>
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
            onClick={() => fetchCampaignList()}
          >
            ค้นหาข้อมูล
          </Button>
        </div>
      </div>
    </>
  );
  const columns = [
    {
      title: "ชื่อแคมเปญ",
      dataIndex: "campaignName",
      key: "campaignName",
      width: "15%",
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{row.campaignName}</span>,
        };
      },
    },
    {
      title: "ผู้ใช้งาน",
      dataIndex: "application",
      width: "15%",
      render: (value: any, row: any, index: number) => {
        const map: any = {
          FARMER: "Farmer",
          DRONER: "Droner",
        };
        return {
          children: <span>{map[row.application]}</span>,
        };
      },
    },
    {
      title: "การได้รับแต้ม",
      width: "15%",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <span>{"+" + row.condition[0].point + " แต้ม / ไร่"}</span>
          ),
        };
      },
    },
    {
      title: "ช่วงเวลาเริ่มต้น - สิ้นสุด",
      width: "30%",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <Row>
                <div style={{ paddingBottom: "2px" }}>
                  <ClockCircleOutlined
                    style={{ color: color.Success, fontSize: "20px" }}
                  />
                </div>
                <div style={{ paddingLeft: "3px" }}>
                  {DateTimeUtil.formatDateTime(row.startDate) +
                    " - " +
                    DateTimeUtil.formatDateTime(row.endDate)}
                </div>
              </Row>
            </>
          ),
        };
      },
    },
    {
      title: "สถานะ",
      dataIndex: "status",
      key: "status",
      width: "15%",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <span
              style={{
                color: STATUS_COLOR[row.status],
              }}
            >
              <Badge color={STATUS_COLOR[row.status]} />{" "}
              {STATUS_COUPON[row.status]}
            </span>
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
            <div className="d-flex flex-row justify-content-center">
              <div className="col-lg-6">
                <ActionButton
                  icon={<EditOutlined />}
                  color={color.primary1}
                  onClick={() =>
                    navigate("/EditCampaignPoint/id=" + row.id)
                  }
                />
              </div>
              <div className="col-lg-6">
                <ActionButton
                  icon={<DeleteOutlined />}
                  color={
                    row.isDeleteFarmer ||
                    row.isDeleteDroner ||
                    row.status === "ACTIVE"
                      ? color.Grey
                      : color.Error
                  }
                  onClick={() => setDeleteCampaign(row.id)}
                  actionDisable={
                    row.isDeleteFarmer ||
                    row.isDeleteDroner ||
                    row.status === "ACTIVE"
                      ? true
                      : false
                  }
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
          />
        </CardContainer>
        <div className="d-flex justify-content-between pt-4">
          <p>รายการทั้งหมด {data?.data.length} รายการ</p>
          <Pagination
            current={current}
            total={data?.count}
            onChange={onChangePage}
            pageSize={row}
            showSizeChanger={false}
          />
        </div>
      </>
      {showModal && (
        <Modal
          title="ยืนยันการลบ"
          onCancel={() => {
            setShowModal(!showModal);
          }}
          open={showModal}
          footer={null}
          bodyStyle={{
            padding: 0,
          }}
        >
          <div className="px-4 pt-4">
            <span className="text-secondary">
              โปรดตรวจสอบของแคมเปญที่คุณต้องการลบ ก่อนที่จะกดยืนยัน
            </span>
            <p className="text-secondary">
              เพราะอาจส่งผลต่อการแต้มในแอปพลิเคชัน
            </p>
          </div>
          <Divider
            style={{
              marginBottom: "20px",
            }}
          />
          <div className="d-flex justify-content-between px-4 pb-4">
            <Button
              style={{
                borderColor: color.Error,
                color: color.Error,
              }}
              onClick={() => {
                setShowModal(!showModal);
              }}
            >
              ยกเลิก
            </Button>
            <Button
              style={{
                borderColor: color.Error,
                backgroundColor: color.Error,
                color: color.White,
              }}
              onClick={() => deleteCampaign()}
            >
              ยืนยัน
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default IndexCampaignPoint;
