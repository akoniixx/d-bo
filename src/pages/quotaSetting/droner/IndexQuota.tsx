import {
  DeleteOutlined,
  EditOutlined,
  FolderViewOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Badge,
  Button,
  Checkbox,
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
import { color, icon } from "../../../resource";
import ActionButton from "../../../components/button/ActionButton";
import { ColumnsType } from "antd/lib/table";
import { DateTimeUtil } from "../../../utilities/DateTimeUtil";
import { useNavigate } from "react-router-dom";
import {
  REWARD_STATUS,
  STATUS_COLOR_MAPPING,
  STATUS_COUPON,
} from "../../../definitions/Status";
import { CampaignDatasource } from "../../../datasource/CampaignDatasource";
import { CampaignQuotaListEntity } from "../../../entities/CampaignPointEntites";
import { numberWithCommas } from "../../../utilities/TextFormatter";
import { CardContainer } from "../../../components/card/CardContainer";

function IndexQuota() {
  const navigate = useNavigate();
  const { RangePicker } = DatePicker;
  const dateFormat = "DD/MM/YYYY";
  const dateSearchFormat = "YYYY-MM-DD";
  const row = 10;
  const [current, setCurrent] = useState(1);
  const [data, setData] = useState<CampaignQuotaListEntity>();
  const [startDate, setStartDate] = useState<any>(null);
  const [endDate, setEndDate] = useState<any>(null);
  const [status, setStatus] = useState<any>();
  const [searchText, setSearchText] = useState<any>();
  const [showModal, setShowModal] = useState(false);
  const [quotaId, setQuotaId] = useState("");

  const getAllQuota = () => {
    CampaignDatasource.getCampaignQuota(
      "DRONER",
      row,
      current,
      startDate,
      endDate,
      status,
      searchText
    ).then((res) => {
      setData(res);
    });
  };

  useEffect(() => {
    getAllQuota();
  }, [current, startDate, endDate]);

  const onChangePage = (page: number) => {
    setCurrent(page);
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
  const showDelete = (id: string) => {
    setQuotaId(id);
    setShowModal(!showModal);
  };
  const removeQuotaList = () => {
    // CampaignDatasource.deleteCampaign(quotaId).then((res) => {
    //   setShowModal(!showModal);
    //   setQuotaId("");
    //   getAllQuota();
    // });
  };
  const pageTitle = (
    <>
      <Row justify={"space-between"} style={{ padding: "10px" }} gutter={16}>
        <Col span={14}>
          <span
            className="card-label font-weight-bolder text-dark"
            style={{
              fontSize: 22,
              fontWeight: "bold",
              padding: "8px",
            }}
          >
            <strong>ชาเลนจ์ (นักบินโดรน)</strong>
          </span>
        </Col>
        <Col span={6}>
          <RangePicker
            allowClear
            format={dateFormat}
            placeholder={["เลือกวันที่เริ่ม", "เลือกวันที่สิ้นสุด"]}
            onCalendarChange={(val) => handleSearchDate(val)}
          />
        </Col>
        <Col span={3}>
          <Button
            style={{
              borderColor: color.Success,
              borderRadius: "5px",
              color: color.secondary2,
              backgroundColor: color.Success,
            }}
            onClick={() => navigate("/AddQuota")}
          >
            + เพิ่มชาเลนจ์
          </Button>
        </Col>
      </Row>
      <div
        className="container d-flex justify-content-between"
        style={{ padding: "8px" }}
      >
        <div className="col-lg-8 p-1">
          <Input
            allowClear
            prefix={<SearchOutlined style={{ color: color.Disable }} />}
            placeholder="ค้นหาชื่อชาเลนจ์ / Challenge No."
            className="col-lg-12 p-1"
            onChange={(e) => {
              setCurrent(1);
              setSearchText(e.target.value);
            }}
          />
        </div>
        <div className="col-lg">
          <Select
            className="col-lg-12 p-1"
            placeholder="สถานะทั้งหมด"
            allowClear
            onChange={(e) => {
              setCurrent(1);
              setStatus(e);
            }}
          >
            {REWARD_STATUS.map((x) => (
              <Checkbox value={x.value}>{x.name}</Checkbox>
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
            onClick={() => {
              setCurrent(1);
              getAllQuota();
            }}
          >
            ค้นหาข้อมูล
          </Button>
        </div>
      </div>
    </>
  );

  const columns = [
    {
      title: "ชื่อชาเลนจ์",
      dataIndex: "campaignName",
      key: "campaignName",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span>{row.campaignName}</span>
              <br />
              <span style={{ color: color.Grey }}>
                {" "}
                {row.missionNo ? row.missionNo : "-"}
              </span>
            </>
          ),
        };
      },
    },
    {
      title: "เวลาเริ่ม - สิ้นสุด",
      dataIndex: "startDate",
      key: "startDate",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <div>
                {row.startDate
                  ? DateTimeUtil.formatDateTime(row.startDate) +
                    " - " +
                    DateTimeUtil.formatDateTime(row.endDate)
                  : "-"}
              </div>
            </>
          ),
        };
      },
    },
    {
      title: "จำนวนผู้ใช้ที่ได้สิทธิ",
      dataIndex: "quotaAmount",
      key: "quotaAmount",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span style={{ color: color.Success }}>
                {numberWithCommas(row.quotaAmount) + " " + "สิทธิ"}
              </span>
            </>
          ),
        };
      },
    },
    {
      title: "จำนวนผู้ใช้ที่ได้รับรางวัล",
      dataIndex: "amountReceive",
      key: "amountReceive",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span style={{ color: color.Success }}>
                {numberWithCommas(row.amountReceive) + " " + "คน"}
              </span>
            </>
          ),
        };
      },
    },
    {
      title: "สถานะ",
      dataIndex: "status",
      key: "status",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span
                style={{
                  color: STATUS_COLOR_MAPPING[row.status],
                }}
              >
                <Badge color={STATUS_COLOR_MAPPING[row.status]} />{" "}
                {STATUS_COUPON[row.status]}
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
      width: "10%",
      render: (value: any, row: any, index: number) => {
        const checkDelete = row.status === "INACTIVE" && row.used === 0;
        return {
          children: (
            <Row justify={"center"} gutter={16}>
              <div className="col-lg-4">
                <ActionButton
                  icon={<FolderViewOutlined />}
                  color={
                    row.status === "DRAFTING" ? color.Grey : color.primary1
                  }
                  actionDisable={row.status === "DRAFTING" ? true : false}
                  onClick={() => navigate("/QuotaReport/id=" + row.id)}
                />
              </div>
              <div className="col-lg-4">
                <ActionButton
                  icon={<EditOutlined />}
                  color={color.primary1}
                  onClick={() => navigate("/EditQuota/id=" + row.id)}
                />
              </div>
              <div className="col-lg-4">
                <ActionButton
                  icon={<DeleteOutlined />}
                  color={!row.isDeleteDroner ? color.Error : color.Grey}
                  onClick={() => showDelete(row.id)}
                  actionDisable={row.isDeleteDroner}
                />
              </div>
            </Row>
          ),
        };
      },
    },
  ];

  return (
    <>
      {pageTitle}
      <CardContainer>
        <Table columns={columns} dataSource={data?.data} pagination={false} />
      </CardContainer>
      <div className="d-flex justify-content-between pt-3 pb-3">
        <p>รายการทั้งหมด {data?.count} รายการ</p>
        <Pagination
          current={current}
          total={data?.count}
          onChange={onChangePage}
          pageSize={row}
          showSizeChanger={false}
        />
      </div>
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
          style={{ top: "25%" }}
        >
          <div className="px-4 pt-4">
            <span className="text-secondary">
              โปรดตรวจสอบชาเลนจ์ที่คุณต้องการลบ ก่อนที่จะกดยืนยันการลบ
            </span>
            <p className="text-secondary">
              เพราะอาจส่งผลต่อการทำงานของผู้ดูแลระบบ
            </p>
          </div>
          <Divider
            style={{
              marginBottom: "20px",
            }}
          />
          <div className="d-flex justify-content-between px-4 pt-3 pb-3">
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
              onClick={() => removeQuotaList()}
            >
              ยืนยัน
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
}
export default IndexQuota;
