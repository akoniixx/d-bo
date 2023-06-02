import React, { useState } from "react";
import { BackIconButton } from "../../components/button/BackButton";
import { useNavigate } from "react-router-dom";
import { color, icon, image } from "../../resource";
import { Button, Col, Input, Radio, Row, Table } from "antd";
import styled from "styled-components";
import MissionReportCard from "../../components/card/MissionReportCard";
import { SearchOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/lib/table";

function MissionReport() {
  const navigate = useNavigate();
  const [type, setType] = useState();
  const handleType = (e: any) => {
    setType(e.target.value);
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
        <BackIconButton
          onClick={() => {
            navigate(-1);
          }}
        />
        <span className="pt-3">
          <strong style={{ fontSize: "20px" }}>
            รายงานภารกิจ MS0000001 | ยิ่งบินยิ่งได้รับโชคชั้นที่ 2
          </strong>
        </span>
      </Row>
      <Row className="justify-content-around">
        <div
          className="col-lg-4 pt-2"
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
          <div className="pt-4" style={{ textAlign: "start" }}>
            <MissionReportCard
              title={"ภารกิจ 1 : บินสะสมครบ 100 ไร่ "}
              raiAmount={"100"}
              successPoint={"500"}
              unsuccessPoint={"500"}
              img={image.reward}
              missionName={
                "เสื้อ Iconkaset 2 ตัว | RW00000001 | Physical (ภารกิจ) | คงเหลือ 200 ชิ้น"
              }
            />
          </div>
        </div>
        <div>
          <Radio.Group onChange={handleType}>
            <div className="row">
              <Radio.Button
                style={{
                  width: "350px",
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
                style={{
                  width: "350px",
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
              className="col-lg-2"
              style={{
                borderColor: color.Success,
                borderRadius: "5px",
                color: color.secondary2,
                backgroundColor: color.Success,
                width: "13%",
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
      </Row>
    </>
  );
}

export default MissionReport;
