import React, { useState } from "react";
import { BackIconButton } from "../../components/button/BackButton";
import { useNavigate } from "react-router-dom";
import { color, icon, image } from "../../resource";
import { Button, Col, Input, Pagination, Radio, Row, Table } from "antd";
import styled from "styled-components";
import MissionReportCard from "../../components/card/MissionReportCard";
import { SearchOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/lib/table";

function MissionReport() {
  const navigate = useNavigate();
  const [type, setType] = useState("unsuccess");
  const [current, setCurrent] = useState(1);
  const row = 4;
  const [cardId, setCardId] = useState<any>();
  const [isCollapseCard, setIsCollapseCard] = useState(true);

  const handleType = (e: any) => {
    setType(e.target.value);
  };
  const onChangePage = (page: number) => {
    setCurrent(page);
  };
  const data = [
    {
      key: 1,
      updateAt: "18/06/2023, 10:00",
      droner: "วิภาพร สมคิด",
      phoneNo: "0989284761",
      raiAmount: "50 ไร่",
    },
    {
      key: 2,
      updateAt: "18/06/2023, 10:00",
      droner: "วิภาพร สมคิด",
      phoneNo: "0989284761",
      raiAmount: "50 ไร่",
    },
  ];
  const dataCard = [
    {
      key: 1,
      id: "001",
      title: "ภารกิจ 1 : บินสะสมครบ 100 ไร่ ",
      raiAmount: "100",
      successPoint: "500",
      unsuccessPoint: "500",
      img: `${image.drone}`,
      missionName:
        "เสื้อ Iconkaset 2 ตัว | RW00000001 | Physical (ภารกิจ) | คงเหลือ 200 ชิ้น",
    },
    {
      key: 2,
      id: "002",
      title: "ภารกิจ 2 : บินสะสมครบ 1,000 ไร่ ",
      raiAmount: "1,000",
      successPoint: "1,000",
      unsuccessPoint: "0",
      img: `${image.reward}`,
      missionName:
        "เสื้อ Iconkaset 2 ตัว | RW00000001 | Physical (ภารกิจ) | คงเหลือ 200 ชิ้น",
    },
    {
      key: 3,
      id: "003",
      title: "ภารกิจ 3 : บินสะสมครบ 1,000 ไร่ ",
      raiAmount: "2,000",
      successPoint: "1,000",
      unsuccessPoint: "0",
      img: `${icon.coinDroner}`,
      missionName:
        "เสื้อ Iconkaset 2 ตัว | RW00000001 | Physical (ภารกิจ) | คงเหลือ 200 ชิ้น",
    },
    {
      key: 4,
      id: "004",
      title: "ภารกิจ 4 : บินสะสมครบ 1,000 ไร่ ",
      raiAmount: "3,000",
      successPoint: "1,000",
      unsuccessPoint: "0",
      img: `${image.reward}`,
      missionName:
        "เสื้อ Iconkaset 2 ตัว | RW00000001 | Physical (ภารกิจ) | คงเหลือ 200 ชิ้น",
    },
  ];

  const columns: ColumnsType<any> = [
    {
      title: "วันที่อัพเดต",
      dataIndex: "updateAt",
      key: "updateAt",
      width: "23%",
      // render: (value: any, row: any, index: number) => {
      //   return {
      //     children: <></>,
      //   };
      // },
    },
    {
      title: "ชื่อนักบินโดรน",
      dataIndex: "droner",
      key: "droner",
      // render: (value: any, row: any, index: number) => {
      //   return {
      //     children: <></>,
      //   };
      // },
    },
    {
      title: "เบอร์โทร",
      dataIndex: "phoneNo",
      key: "phoneNo",
      // render: (value: any, row: any, index: number) => {
      //   return {
      //     children: <></>,
      //   };
      // },
    },
    {
      title: "จำนวนไร่สะสม",
      dataIndex: "raiAmount",
      key: "raiAmount",
      width: "18%",
      // render: (value: any, row: any, index: number) => {
      //   return {
      //     children: <></>,
      //   };
      // },
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
      <Row className="d-flex justify-content-around">
        <div className="col-lg-5">
          <div
            className="pt-2"
            style={{
              width: "440px",
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
            {dataCard.map((item, index) => (
              <div
                className="pt-3"
                key={index}
                onClick={() => {
                  setCardId(item.id);
                  setIsCollapseCard(!isCollapseCard);
                }}
              >
                <MissionReportCard
                  key={index}
                  data={dataCard}
                  title={item.title}
                  raiAmount={item.raiAmount}
                  successPoint={item.raiAmount}
                  unsuccessPoint={item.successPoint}
                  img={item.img}
                  missionName={item.missionName}
                  index={index}
                />
              </div>
            ))}

            <div className="d-flex justify-content-between pt-3">
              <p>รายการทั้งหมด {dataCard.length} รายการ</p>
              <Pagination
                style={{ paddingRight: "10%" }}
                current={current}
                total={dataCard.length}
                onChange={onChangePage}
                pageSize={row}
                showSizeChanger={false}
              />
            </div>
          </div>
        </div>
        <div className="col-lg-7">
          <Radio.Group onChange={handleType}>
            <div className="row">
              <Radio.Button
                className="col"
                style={{
                  width: "380px",
                  textAlign: "center",
                  padding: 4,
                  height: "40px",
                  borderBottomLeftRadius: 5,
                  borderTopLeftRadius: 5,
                  backgroundColor:
                    type === "unsuccess"
                      ? "rgba(235, 87, 87, 0.1)"
                      : color.White,
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
                  width: "380px",
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
            </div>
          </Radio.Group>
          <div className="row justify-content-between pt-2">
            <Input
              style={{ width: "85%" }}
              allowClear
              prefix={<SearchOutlined style={{ color: color.Disable }} />}
              placeholder="ค้นหาชื่อของรางวัล/รหัสของรางวัล"
              // onChange={changeTextSearch}
            />
            <Button
              style={{
                borderColor: color.Success,
                borderRadius: "5px",
                color: color.secondary2,
                backgroundColor: color.Success,
                width: "14%",
              }}
              // onClick={fetchSearch}
            >
              ค้นหาข้อมูล
            </Button>
          </div>
          <Table
            className="pt-3"
            columns={columns}
            dataSource={data}
            pagination={false}
          />
        </div>
        <Row />
      </Row>
    </>
  );
}

export default MissionReport;
