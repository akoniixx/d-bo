import React, { useEffect, useState } from "react";
import { BackIconButton } from "../../components/button/BackButton";
import { useNavigate } from "react-router-dom";
import { color, icon, image } from "../../resource";
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
import styled from "styled-components";
import MissionReportCard from "../../components/card/MissionReportCard";
import { SearchOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/lib/table";
import { FarmerDatasource } from "../../datasource/FarmerDatasource";
import { FarmerPageEntity } from "../../entities/FarmerEntities";
import moment from "moment";
import { DronerDatasource } from "../../datasource/DronerDatasource";
import { DronerListEntity } from "../../entities/DronerEntities";
import { RewardDatasource } from "../../datasource/RewardDatasource";
import { GetAllRewardEntities } from "../../entities/RewardEntites";

function MissionReport() {
  const [type, setType] = useState("unsuccess");
  const row = 10;
  const rowCard = 4;
  const [cardId, setCardId] = useState<any>();
  const [current, setCurrent] = useState(1);
  const [currentTable, setCurrentTable] = useState(1);
  const { RangePicker } = DatePicker;
  const dateFormat = "DD/MM/YYYY";
  const dateSearchFormat = "YYYY-MM-DD";

  const navigate = useNavigate();
  const [data, setData] = useState<FarmerPageEntity>();
  const [dataDroner, setDataDroner] = useState<DronerListEntity>();
  const [dataCard, setDataCard] = useState<GetAllRewardEntities>();
  const [startDate, setStartDate] = useState<any>(null);
  const [endDate, setEndDate] = useState<any>(null);
  const [checkCard, setCheckCard] = useState<string | undefined>();

  useEffect(() => {
    FarmerDatasource.getFarmerList(currentTable, row).then(
      (res: FarmerPageEntity) => {
        setData(res);
      }
    );
  }, [currentTable]);
  useEffect(() => {
    DronerDatasource.getDronerList(currentTable, row).then(
      (res: DronerListEntity) => {
        setDataDroner(res);
      }
    );
  }, [currentTable]);
  useEffect(() => {
    RewardDatasource.getAllReward(rowCard, current).then(
      (res: GetAllRewardEntities) => {
        setDataCard(res);
      }
    );
  }, [current]);
  const handleType = (e: any) => {
    setType(e.target.value);
  };
  const onChangePage = (page: number) => {
    setCurrent(page);
  };
  const onChangePageTable = (page: number) => {
    setCurrentTable(page);
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

  const columns: ColumnsType<any> = [
    {
      title: "วันที่อัพเดต",
      dataIndex: "updatedAt",
      key: "updatedAt",
      sorter: (a: any, b: any) => sorter(a.updatedAt, b.updatedAt),
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <span>{moment(row.updatedAt).format("DD/MM/YYYY HH:mm")}</span>
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
            <span
              style={{
                cursor: "pointer",
                color: color.Success,
                textDecorationLine: "underline",
                fontWeight: "700",
              }}
            >
              {row.firstname + " " + row.lastname}
            </span>
          ),
        };
      },
    },
    {
      title: "เบอร์โทร",
      dataIndex: "telephoneNo",
      key: "telephoneNo",
      // render: (value: any, row: any, index: number) => {
      //   return {
      //     children: <></>,
      //   };
      // },
    },
    type === "unsuccess"
      ? {
          title: "จำนวนไร่สะสม",
          dataIndex: "raiAmount",
          key: "raiAmount",
          sorter: (a: any, b: any) => sorter(a.totalRaiCount, b.totalRaiCount),
          render: (value: any, row: any, index: number) => {
            return {
              children: (
                <div>
                  <>
                    <span>{row.totalRaiCount ? row.totalRaiCount : 0} ไร่</span>
                    <span style={{ color: color.Disable, fontSize: "12px" }}>
                      {" "}
                      {`(ขาดอีก ${50} ไร่)`}
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
                      cursor: "pointer",
                      color: color.Success,
                      textDecorationLine: "underline",
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
  return (
    <>
      <Row>
        <BackIconButton onClick={() => navigate(-1)} />
        <span className="pt-3">
          <strong style={{ fontSize: "20px" }}>
            รายงานภารกิจ MS0000001 | ยิ่งบินยิ่งได้รับโชคชั้นที่ 2
          </strong>
        </span>
      </Row>
      <div className="row d-flex justify-content-between">
        <div className="col-lg-5">
          <div
            className="pt-2"
            style={{
              height: "40px",
              backgroundColor: color.Success,
              borderRadius: 5,
              textAlign: "center",
            }}
          >
            <strong style={{ color: "white", alignSelf: "center" }}>
              ผู้เข้าร่วมภารกิจ : 1,000 คน
            </strong>
          </div>
          <div style={{ textAlign: "start", cursor: "pointer" }}>
            {dataCard?.data.map((item, index) => (
              <div
                className="pt-3"
                key={index}
                onClick={() => {
                  console.log(item);
                  setCardId(item.id);
                }}
              >
                <MissionReportCard
                  id={item.id}
                  title={item.rewardName}
                  raiAmount={"1,000"}
                  successPoint={"500"}
                  unsuccessPoint={"500"}
                  img={item.imagePath}
                  missionName={item.rewardName}
                  checkCard={checkCard}
                  setCheckCard={setCheckCard}
                />
              </div>
            ))}

            <div className="d-flex justify-content-between pt-5">
              <p>รายการทั้งหมด {dataCard?.count} รายการ</p>
              {/* <Pagination
                style={{ paddingRight: "10%" }}
                current={current}
                total={dataCard?.count}
                onChange={onChangePage}
                pageSize={rowCard}
                showSizeChanger={false}
              /> */}
              <Pagination
                simple
                pageSize={rowCard}
                onChange={onChangePage}
                current={current}
                total={dataCard?.count}
              />
            </div>
          </div>
        </div>
        <div className="col-lg-7 ">
          <Radio.Group
            onChange={handleType}
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
              ผู้เข้าร่วมที่ยังไม่สำเร็จ (500)
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
              ผู้เข้าร่วมที่สำเร็จ (500)
            </Radio.Button>
          </Radio.Group>
          <div className="row justify-content-center pt-2">
            <Input
              style={{
                width: type === "unsuccess" ? "81%" : "45%",
                right: type === "unsuccess" ? "1%" : "2%",
              }}
              allowClear
              prefix={<SearchOutlined style={{ color: color.Disable }} />}
              placeholder="ค้นหาชื่อนักบินโดรน / เบอร์โทร"
              // onChange={changeTextSearch}
            />
            {type === "success" && (
              <RangePicker
                style={{ right: "1%" }}
                className="col-lg-4"
                allowClear
                onCalendarChange={(val) => handleSearchDate(val)}
                format={dateFormat}
              />
            )}

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

          <Table
            className="pt-3"
            columns={columns}
            dataSource={type === "unsuccess" ? data?.data : dataDroner?.data}
            pagination={false}
          />
          <div className="d-flex justify-content-between pt-5">
            <p>
              รายการทั้งหมด
              {type === "unsuccess" ? data?.count : dataDroner?.count} รายการ
            </p>
            <Pagination
              simple
              pageSize={row}
              onChange={onChangePageTable}
              current={currentTable}
              total={type === "unsuccess" ? data?.count : dataDroner?.count}
            />

            {/* <Pagination
              current={currentTable}
              total={type === "unsuccess" ? data?.count : dataDroner?.count}
              onChange={onChangePageTable}
              pageSize={row}
              showSizeChanger={false}
            /> */}
          </div>
        </div>
        <Row />
      </div>
    </>
  );
}

export default MissionReport;
