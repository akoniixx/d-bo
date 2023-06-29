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
import styled from "styled-components";
const _ = require("lodash");

const NewTable = styled(Table)<{
  colors: string;
}>`
  .ant-table-container table thead tr th {
    background-color: ${({ colors }) => colors} !important;
    font-family: "Prompt" !important;
    font-weight: 500 !important;
    color: white !important;
    font-weight: bold !important;
  }
`;

function MissionReport() {
  let queryString = _.split(window.location.pathname, "=");
  const [type, setType] = useState("unsuccessMission");
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
  const [dataCondition, setDataCondition] = useState<ConditionMission[]>();
  const [startDate, setStartDate] = useState<any>(null);
  const [endDate, setEndDate] = useState<any>(null);
  const [statusMission, setStatusMission] = useState("INPROGRESS");
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");

  interface DataTable {
    updateAt: string;
    name: string;
    telephone: string;
    allraiAmount: string;
    redeemNo: string;
  }
  const [dataInpro, setDataInpro] = useState<DataTable[]>();
  const [dataSuccess, setDataSuccess] = useState<DataTable[]>();
  const [countSuccess, setCountSuccess] = useState(0);
  const [countInpro, setCountInpro] = useState(0);

  const fetchMissionInprogress = () => {
    setIsLoading(true);
    CampaignDatasource.detailMissionInprogress(
      queryString[1],
      num,
      row,
      currentTable,
      statusMission,
      search
    ).then((res) => {
      setCountInpro(res.count);
      const tableList = [];
      for (let i = 0; res.data.length > i; i++) {
        const table: any = {
          updateAt: res.data[i].updateAt,
          name: res.data[i].firstname + " " + res.data[i].lastname,
          telephone: res.data[i].telephoneNo,
          allraiAmount: res.data[i].allraiAmount,
        };
        tableList.push(table);
      }
      const mapPage = res.condition.slice(
        rowCard * (current - 1),
        rowCard * current
      );
      setDataInpro(tableList);
      setDataCondition(mapPage);
      setDataMission(res);
      fetchMissionSuccess(res.missionNo);
      setIsLoading(false);
    });
  };

  const fetchMissionSuccess = (missionNo: string) => {
    CampaignDatasource.detailMissionSuccess(
      num,
      row,
      currentTable,
      missionNo,
      search,
      startDate,
      endDate
    ).then((res) => {
      setCountSuccess(res.count);
      const tableList = [];
      for (let i = 0; res.data.length > i; i++) {
        const table: any = {
          updateAt: res.data[i].updateAt,
          name:
            res.data[i].receiverDetail.firstname +
            " " +
            res.data[i].receiverDetail.lastname,
          telephone: res.data[i].receiverDetail.tel,
          redeemNo: res.data[i].redeemNo,
        };
        tableList.push(table);
      }
      setDataSuccess(tableList);
      setIsLoading(false);
    });
  };

  const checkSubmission = (i: number) => {
    return num === i ? true : false;
  };

  useEffect(() => {
    fetchMissionInprogress();
  }, [currentTable, num, statusMission, current]);

  const onChangePage = (page: number) => {
    setCurrentTable(page);
  };
  const onChangePageCard = (page: number) => {
    setNum(rowCard * (page - 1) + 1);
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

  const mapColor: any = {
    unsuccessMission: "rgba(235, 87, 87, 0.1)",
    unconfirmMission: "rgba(255, 250, 235, 1)",
    successMission: "rgba(33, 150, 83, 0.1)",
  };

  const mapTableColor: any = {
    unsuccessMission: "#EB5757",
    unconfirmMission: "#FFCA37",
    successMission: color.Success,
  };

  const columns: any = [
    {
      title: "วันที่อัพเดต",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{DateTimeUtil.formatDateTime(row.updateAt)}</span>,
        };
      },
    },
    {
      title: "ชื่อนักบินโดรน",
      dataIndex: "name",
      key: "name",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <u
              style={{
                color: color.Success,
              }}
            >
              {row.name}
            </u>
          ),
        };
      },
    },
    {
      title: "เบอร์โทร",
      dataIndex: "telephone",
      key: "telephone",
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{row.telephone}</span>,
        };
      },
    },
    {
      title: "จำนวนไร่สะสม",
      dataIndex: "allraiAmount",
      key: "allraiAmount",
      render: (value: any, row: any, index: number) => {
        const calRai = () => {
          let cal = (
            dataCondition?.find((x) => x.num === num)?.rai! - row.allraiAmount
          ).toFixed(2);
          return numberWithCommas(Number(cal));
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
    },
    {
      title: "Redeem No.",
      dataIndex: "redeemNo",
      key: "redeemNo",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div>
              <span
                style={{
                  color: color.Success,
                }}
              >
                {row.redeemNo}
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
          ผู้เข้าร่วมภารกิจ : {dataMission?.amountPeople} คน
        </h5>
      </div>
      {dataCondition?.map((item: any, index: any) => {
        const detailReward: any = {
          rewardId: item.reward.id,
          rewardName: item.reward.rewardName,
          rewardNo: item.reward.rewardNo,
          rewardExchange: item.reward.rewardExchange,
          remain: item.reward.remain,
          imagePath: item.reward.imagePath,
          rewardType: item.reward.rewardType,
        };
        return (
          <div
            className="pt-3"
            key={item.num}
            onClick={() => {
              setNum(item.num);
            }}
            style={{ cursor: "pointer" }}
          >
            <MissionReportCard
              checkCard={checkSubmission(item.num)}
              title={`ภารกิจ ${item.num}  ${item.missionName}`}
              raiAmount={item.rai}
              successMission={item.reward.amountSuccessCount}
              unsuccessMission={item.reward.amountInprogressCount}
              unconfirmMission={item.reward.amountRequestCount}
              detailReward={detailReward}
            />
          </div>
        );
      })}
      <div className="d-flex justify-content-between pt-3 pb-3">
        <p>รายการทั้งหมด {dataMission?.condition.length} รายการ</p>
        <Pagination
          current={current}
          total={dataMission?.condition?.length}
          onChange={onChangePageCard}
          pageSize={rowCard}
          showSizeChanger={false}
        />
      </div>
    </Col>
  );

  const renderDetailSubmission = (
    <Col span={12}>
      <Radio.Group
        onChange={(v) => {
          setStartDate(null);
          setEndDate(null);
          setSearch("");
          setType(v.target.value);
        }}
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
              type === "unsuccessMission" ? mapColor[type] : color.White,
            color: type === "unsuccessMission" ? color.Error : color.BK,
            borderColor: type === "unsuccessMission" ? color.Error : color.BK,
            borderWidth: type === "unsuccessMission" ? 1 : 0,
          }}
          value="unsuccessMission"
          onClick={() => setStatusMission("INPROGRESS")}
        >
          ผู้เข้าร่วมที่ยังไม่สำเร็จ{" "}
          {`(${
            dataCondition?.find((x) => x.num === num)?.reward
              .amountInprogressCount
          })` || 0}
        </Radio.Button>
        <Radio.Button
          className="col"
          style={{
            textAlign: "center",
            padding: 4,
            height: "40px",
            backgroundColor:
              type === "unconfirmMission" ? mapColor[type] : color.White,
            color: type === "unconfirmMission" ? "#FFCA37" : color.BK,
            borderColor: type === "unconfirmMission" ? "#FFCA37" : color.BK,
            borderWidth: type === "unconfirmMission" ? 1 : 0,
          }}
          value="unconfirmMission"
          onClick={() => setStatusMission("REQUEST")}
        >
          ผู้เข้าร่วมที่รอกดแลก{" "}
          {`(${
            dataCondition?.find((x) => x.num === num)?.reward.amountRequestCount
          })` || 0}
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
              type === "successMission" ? mapColor[type] : color.White,
            color: type === "successMission" ? color.Success : color.BK,
            borderColor: type === "successMission" ? color.Success : color.BK,
            borderWidth: type === "successMission" ? 1 : 0,
          }}
          value="successMission"
        >
          ผู้เข้าร่วมที่สำเร็จ{" "}
          {`(${
            dataCondition?.find((x) => x.num === num)?.reward.amountSuccessCount
          })` || 0}
        </Radio.Button>
      </Radio.Group>
      {(type === "unsuccessMission" || type === "unconfirmMission") && (
        <div className="row justify-content-center pt-2">
          <Input
            style={{
              width: "81%",
              right: "1%",
            }}
            value={search}
            allowClear
            prefix={<SearchOutlined style={{ color: color.Disable }} />}
            placeholder="ค้นหาชื่อนักบินโดรน / เบอร์โทร"
            onChange={(e) => setSearch(e.target.value)}
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
            onClick={fetchMissionInprogress}
          >
            ค้นหาข้อมูล
          </Button>
        </div>
      )}
      {type === "successMission" && (
        <div className="row justify-content-center pt-2">
          <Input
            style={{
              width: "45%",
              right: "2%",
            }}
            value={search}
            allowClear
            prefix={<SearchOutlined style={{ color: color.Disable }} />}
            placeholder="ค้นหาชื่อนักบินโดรน / เบอร์โทร"
            onChange={(e) => setSearch(e.target.value)}
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
            onClick={fetchMissionInprogress}
          >
            ค้นหาข้อมูล
          </Button>
        </div>
      )}
      <NewTable
        className="pt-3"
        columns={
          type === "successMission"
            ? columns.filter((x: any) => x.key !== "allraiAmount")
            : type === "unconfirmMission"
            ? columns.slice(0, -2)
            : columns.slice(0, -1)
        }
        dataSource={type === "successMission" ? dataSuccess : dataInpro}
        pagination={false}
        loading={isLoading}
        colors={mapTableColor[type]}
      />
      <div className="d-flex justify-content-between pt-3 pb-3">
        <p>
          รายการทั้งหมด {type === "successMission" ? countSuccess : countInpro}{" "}
          รายการ
        </p>
        <Pagination
          current={currentTable}
          total={type === "successMission" ? countSuccess : countInpro}
          onChange={onChangePage}
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
