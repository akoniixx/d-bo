import React, { useEffect, useState } from "react";
import { BackIconButton } from "../../../components/button/BackButton";
import { useNavigate } from "react-router-dom";
import { color } from "../../../resource";
import {
  Button,
  Col,
  DatePicker,
  Input,
  Pagination,
  Radio,
  Row,
  Table,
} from "antd";
import MissionReportCard from "../../../components/card/MissionReportCard";
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";
import {
  ConditionMission,
  MissionDetailEntity,
} from "../../../entities/MissionEntities";
import { CampaignDatasource } from "../../../datasource/CampaignDatasource";
import { DateTimeUtil } from "../../../utilities/DateTimeUtil";
import { numberWithCommas } from "../../../utilities/TextFormatter";
import { RedeemDronerListEntity } from "../../../entities/RedeemEntities";
const _ = require("lodash");

function MissionReport() {
  let queryString = _.split(window.location.pathname, "=");
  const [type, setType] = useState("unsuccess");
  const row = 10;
  const rowCard = 5;
  const [num, setNum] = useState<number>(1);
  const [current, setCurrent] = useState(1);
  const [currentTable, setCurrentTable] = useState(1);
  const { RangePicker } = DatePicker;
  const dateFormat = "DD/MM/YYYY";
  const dateSearchFormat = "YYYY-MM-DD";

  const navigate = useNavigate();
  const [dataMission, setDataMission] = useState<MissionDetailEntity>();
  const [dataMisionSucc, setDataMissionSuc] =
    useState<RedeemDronerListEntity>();
  const [dataCondition, setDataCondition] = useState<ConditionMission[]>();
  const [startDate, setStartDate] = useState<any>(null);
  const [endDate, setEndDate] = useState<any>(null);

  const fetchMissionInprogress = () => {
    CampaignDatasource.detailMissionInprogress(
      queryString[1],
      num,
      rowCard,
      current
    ).then((res) => {
      setDataCondition(res.condition);
      setDataMission(res);
    });
  };

  const fetchMissionSuccess = () => {
    CampaignDatasource.detailMissionSuccess(
      "DONE",
      num,
      row,
      current,
      dataMission?.missionNo
    ).then((res) => {
      console.log(res);
      setDataMissionSuc(res);
    });
  };

  const checkSubmission = (i: number) => {
    return num === i ? true : false;
  };

  useEffect(() => {
    fetchMissionInprogress();
    fetchMissionSuccess();
  }, [current, num]);

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

  const columns = [
    {
      title: "วันที่อัพเดต",
      dataIndex: "updatedAt",
      key: "updatedAt",
      sorter: (a: any, b: any) => sorter(a.updatedAt, b.updatedAt),
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{DateTimeUtil.formatDateTime(row.updateAt)}</span>,
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
            <u
              style={{
                color: color.Success,
              }}
            >
              {row.firstname + " " + row.lastname}
            </u>
          ),
        };
      },
    },
    {
      title: "เบอร์โทร",
      dataIndex: "telephoneNo",
      key: "telephoneNo",
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{row.telephoneNo}</span>,
        };
      },
    },
    type === "unsuccess"
      ? {
          title: "จำนวนไร่สะสม",
          dataIndex: "allraiAmount",
          key: "allraiAmount",
          sorter: (a: any, b: any) => sorter(a.allraiAmount, b.allraiAmount),
          render: (value: any, row: any, index: number) => {
            const calRai = () => {
              return numberWithCommas(
                dataCondition?.find((x) => x.num === num)?.rai! -
                  row.allraiAmount
              );
            };

            return {
              children: (
                <div>
                  <>
                    <span>
                      {numberWithCommas(row.allraiAmount)
                        ? numberWithCommas(row.allraiAmount)
                        : 0}{" "}
                      ไร่
                    </span>
                    <br />
                    <span style={{ color: color.Disable, fontSize: "12px" }}>
                      {`(ขาดอีก ${calRai()} ไร่)`}
                    </span>
                  </>
                </div>
              ),
            };
          },
        }
      : {
          title: "Redeem No.",
          dataIndex: "raiAmount",
          key: "raiAmount",
          render: (value: any, row: any, index: number) => {
            return {
              children: (
                <div>
                  <span
                    style={{
                      color: color.Success,
                      fontWeight: "700",
                    }}
                  >
                    {"RD0000001"}
                  </span>
                </div>
              ),
            };
          },
        },
  ];

  const renderSubmission = (
    <Col span={12}>
      <div
        className="pt-2"
        style={{
          height: "40px",
          backgroundColor: color.Success,
          borderRadius: 5,
          textAlign: "center",
        }}
      >
        <h5 style={{ color: "white", alignSelf: "center" }}>
          ผู้เข้าร่วมภารกิจ : {dataMission?.amoutPeople} คน
        </h5>
      </div>
      {dataMission?.condition.map((item: any, index: any) => (
        <div
          className="pt-3"
          key={index}
          onClick={() => {
            setNum(item.num);
          }}
          style={{ cursor: "pointer" }}
        >
          <MissionReportCard
            checkCard={checkSubmission(index + 1)}
            title={`ภารกิจ ${item.num}  ${item.missionName}`}
            raiAmount={item.rai}
            successPoint={item.reward.amountSuccessCount}
            unsuccessPoint={item.reward.amountInprogressCount}
            img={item.reward.imagePath}
            missionName={`${item.reward.rewardName} | ${item.reward.rewardNo} | ${item.reward.rewardType}  (${item.reward.rewardExchange}) | คงเหลือ ${item.reward.remain} ชิ้น`}
          />
        </div>
      ))}
      <div className="d-flex justify-content-between pt-3 pb-3">
        <p>รายการทั้งหมด {dataMission?.condition.length} รายการ</p>
        <Pagination
          current={current}
          total={10}
          // onChange={onChangePage}
          pageSize={row}
          showSizeChanger={false}
        />
      </div>
    </Col>
  );

  const renderDetailSubmission = (
    <Col span={12}>
      <Radio.Group
        onChange={(v) => setType(v.target.value)}
        className="row "
        style={{ width: "100%", paddingLeft: "8px" }}
      >
        <Radio.Button
          className="col"
          style={{
            textAlign: "center",
            padding: 4,
            height: "40px",
            borderBottomLeftRadius: 5,
            borderTopLeftRadius: 5,
            backgroundColor:
              type === "unsuccess" ? "rgba(235, 87, 87, 0.1)" : color.White,
            color: type === "unsuccess" ? color.Error : color.BK,
            borderColor: type === "unsuccess" ? color.Error : color.BK,
            borderWidth: type === "unsuccess" ? 1 : 0,
          }}
          value="unsuccess"
        >
          ผู้เข้าร่วมที่ยังไม่สำเร็จ{" "}
          {`(${
            dataCondition?.find((x) => x.num === num)?.reward
              .amountInprogressCount
          })`}
        </Radio.Button>
        <Radio.Button
          className="col"
          style={{
            height: "40px",
            borderBottomRightRadius: 5,
            borderTopRightRadius: 5,
            textAlign: "center",
            padding: 4,
            backgroundColor:
              type === "success" ? "rgba(33, 150, 83, 0.1)" : color.White,
            color: type === "success" ? color.Success : color.BK,
            borderColor: type === "success" ? color.Success : color.BK,
            borderWidth: type === "success" ? 1 : 0,
          }}
          value="success"
        >
          ผู้เข้าร่วมที่สำเร็จ{" "}
          {`(${
            dataCondition?.find((x) => x.num === num)?.reward.amountSuccessCount
          })`}
        </Radio.Button>
      </Radio.Group>
      {type === "unsuccess" && (
        <div className="row justify-content-center pt-2">
          <Input
            style={{
              width: "81%",
              right: "1%",
            }}
            allowClear
            prefix={<SearchOutlined style={{ color: color.Disable }} />}
            placeholder="ค้นหาชื่อนักบินโดรน / เบอร์โทร"
            // onChange={changeTextSearch}
          />
          <Button
            style={{
              borderColor: color.Success,
              borderRadius: "5px",
              color: color.secondary2,
              backgroundColor: color.Success,
              width: "15%",
              justifyContent: "flex-start",
            }}
            // onClick={fetchSearch}
          >
            ค้นหาข้อมูล
          </Button>
        </div>
      )}
      {type === "success" && (
        <div className="row justify-content-center pt-2">
          <Input
            style={{
              width: "45%",
              right: "2%",
            }}
            allowClear
            prefix={<SearchOutlined style={{ color: color.Disable }} />}
            placeholder="ค้นหาชื่อนักบินโดรน / เบอร์โทร"
            // onChange={changeTextSearch}
          />
          <RangePicker
            style={{ right: "1%" }}
            className="col-lg-4"
            allowClear
            onCalendarChange={(val) => handleSearchDate(val)}
            format={dateFormat}
          />

          <Button
            style={{
              borderColor: color.Success,
              borderRadius: "5px",
              color: color.secondary2,
              backgroundColor: color.Success,
              width: "15%",
              justifyContent: "flex-start",
            }}
            // onClick={fetchSearch}
          >
            ค้นหาข้อมูล
          </Button>
        </div>
      )}
      <Table
        className="pt-3"
        columns={columns}
        dataSource={dataMission?.data}
        pagination={false}
      />
      <div className="d-flex justify-content-between pt-3 pb-3">
        <p>รายการทั้งหมด {dataMission?.data.length} รายการ</p>
        <Pagination
          current={current}
          total={10}
          //onChange={onChangePage}
          pageSize={row}
          showSizeChanger={false}
        />
      </div>
    </Col>
  );

  return (
    <>
      <Row>
        <BackIconButton onClick={() => navigate(-1)} />
        <span className="pt-3">
          <strong style={{ fontSize: "20px" }}>
            รายงานภารกิจ {dataMission?.missionNo} | {dataMission?.campaignName}
          </strong>
        </span>
      </Row>
      <Row justify={"space-between"} gutter={16}>
        {renderSubmission}
        {renderDetailSubmission}
        <Row />
      </Row>
    </>
  );
}

export default MissionReport;
