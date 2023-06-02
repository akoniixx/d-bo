import {
  DeleteOutlined,
  EditOutlined,
  FileTextOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Badge,
  Button,
  Col,
  DatePicker,
  Input,
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
import { CampaignDatasource } from "../../../datasource/CampaignDatasource";
import {
  STATUS_COLOR_MAPPING,
  STATUS_COUPON,
} from "../../../definitions/Status";
import { CampaignListEntity } from "../../../entities/CampaignPointEntites";
import { color } from "../../../resource";
import { DateTimeUtil } from "../../../utilities/DateTimeUtil";
const { RangePicker } = DatePicker;
const dateSearchFormat = "YYYY-MM-DD";

const IndexDronerMission = () => {
  const navigate = useNavigate();
  const dateFormat = "DD/MM/YYYY";
  const row = 5;
  const [current, setCurrent] = useState(1);
  const [data, setData] = useState<CampaignListEntity>();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchStartDate, setSearchStartDate] = useState<any>(null);
  const [searchEndDate, setSearchEndDate] = useState<any>(null);
  const [searchStatus, setSearchStatus] = useState("");

  const fetchMission = () => {
    CampaignDatasource.getCampaignList(
      "MISSION_REWARD",
      row,
      current,
      searchStartDate,
      searchEndDate,
      searchStatus,
      searchKeyword
    ).then((res) => {
      setData(res);
    });
  };

  useEffect(() => {
    fetchMission();
  }, [current, searchStartDate, searchEndDate]);

  const onChangePage = (page: number) => {
    setCurrent(page);
  };

  const onSearch = () => {
    setCurrent(1);
    fetchMission();
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

  const pageTitle = (
    <>
      <Row justify={"space-between"} style={{ padding: "10px" }}>
        <Col span={15}>
          <span
            className="card-label font-weight-bolder text-dark"
            style={{
              fontSize: 22,
              fontWeight: "bold",
              padding: "8px",
            }}
          >
            <strong>ภารกิจ</strong>
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
        <Col span={2}>
          <Button
            style={{
              borderColor: color.Success,
              borderRadius: "5px",
              color: color.secondary2,
              backgroundColor: color.Success,
            }}
            onClick={() => navigate("/AddDronerMission")}
          >
            + เพิ่มภารกิจ
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
            placeholder="ค้นหาชื่อภารกิจ / Mission No."
            className="col-lg-12 p-1"
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
        </div>
        <div className="col-lg">
          <Select
            className="col-lg-12 p-1"
            placeholder="สถานะทั้งหมด"
            allowClear
            onChange={(e) => setSearchStatus(e)}
          >
            <option value="ACTIVE">ใช้งาน</option>
            <option value="DRAFTING">รอเปิดการใช้งาน</option>
            <option value="INACTIVE">ปิดการใช้งาน</option>
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
            onClick={onSearch}
          >
            ค้นหาข้อมูล
          </Button>
        </div>
      </div>
    </>
  );

  const columns = [
    {
      title: "ชื่อภารกิจ",
      dataIndex: "campaignName",
      key: "campaignName",
      width: "35%",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span>{row.campaignName}</span>
              <br />
              <span style={{ color: color.Grey }}>{row.missionNo}</span>
            </>
          ),
        };
      },
    },
    {
      title: "วันที่เริ่ม-วันที่สิ้นสุด",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span>
                {row.startDate &&
                  DateTimeUtil.formatDateTime(row.startDate) +
                    " - " +
                    DateTimeUtil.formatDateTime(row.endDate)}
              </span>
            </>
          ),
        };
      },
    },
    {
      title: "ภารกิจย่อย",
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{row.condition.length} ภารกิจ</span>,
        };
      },
    },
    {
      title: "สถานะ",
      dataIndex: "status",
      width: "12%",
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
      width: "12%",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div className="d-flex flex-row justify-content-center">
              <div className="col-lg-4">
                <ActionButton
                  icon={<FileTextOutlined />}
                  color={color.primary1}
                  //onClick={() => navigate("/DetailFarmerRedeem/id=" + row.id)}
                />
              </div>
              <div className="col-lg-4">
                <ActionButton
                  icon={<EditOutlined />}
                  color={color.primary1}
                  onClick={() => navigate("/EditDronerMission/id=" + row.id)}
                />
              </div>
              <div className="col-lg-4">
                <ActionButton
                  icon={<DeleteOutlined />}
                  color={color.Error}
                  //onClick={() => navigate("/DetailFarmerRedeem/id=" + row.id)}
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
    </>
  );
};
export default IndexDronerMission;
