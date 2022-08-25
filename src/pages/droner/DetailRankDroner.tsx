import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { Row, Form, Input, Image, Pagination, Table } from "antd";
import { FileTextFilled } from "@ant-design/icons";
import { CardContainer } from "../../components/card/CardContainer";
import color from "../../resource/color";
import { CardHeader } from "../../components/header/CardHearder";
import { BackIconButton } from "../../components/button/BackButton";
import icon from "../../resource/icon";
import ActionButton from "../../components/button/ActionButton";

function DetailRankDroner() {
  const style: React.CSSProperties = {
    backgroundColor: "#2196531A",
    width: "30%",
    height: "70px",
    margin: "5px",
    padding: "10px",
  };
  const renderDroner = (
    <div className="col-lg-4">
      <CardContainer>
        <CardHeader textHeader="ข้อมูลนักบินโดรน" />
        <div
          className="form-group col-lg-12 text-start container"
          style={{ padding: "20px" }}
        >
          <div className="row">
            <div className="form-group text-center pb-4">
              <div
              // className="hiddenFileInput zoom"
              // style={{
              //   backgroundImage: `url(${
              //     imgProfile == undefined ? img_empty : imgProfile
              //   })`,
              // }}
              >
                <Image
                  width={200}
                  src="https://blog.masii.co.th/wp-content/uploads/2019/08/dr1-e1566030486441.jpg"
                />
              </div>
            </div>
          </div>
          <div className="row text-center">
            <CardContainer style={style}>
              <span>จำนวนบริการ</span>
              <br />
              <span style={{ color: color.Success }}>10 งาน</span>
            </CardContainer>
            <CardContainer style={style}>
              <span>จำนวนไร่</span>
              <br />
              <span style={{ color: color.Success }}>100 ไร่</span>
            </CardContainer>
            <CardContainer style={style}>
              <span>คะแนน Rating</span>
              <br />

              <span style={{ color: color.Success }}>
                <img alt="logo" src={icon.iconStar} width={"20%"} /> 4.0 (10)
              </span>
            </CardContainer>
          </div>
          <div className="row">
            <label>Droner ID</label>
            <div className="row">
              <Form.Item name="droneId">
                <Input disabled placeholder="DN000001" />
              </Form.Item>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <label>ชื่อ</label>
                <Form.Item name="firstname">
                  <Input disabled placeholder="วิภาพร" />
                </Form.Item>
              </div>
              <div className="col-lg-6">
                <label>นามสกุล</label>
                <Form.Item name="lastname">
                  <Input disabled placeholder="สมคิด" />
                </Form.Item>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <label>เบอร์โทร</label>
                <Form.Item name="firstname">
                  <Input disabled placeholder="0989284761" />
                </Form.Item>
              </div>
              <div className="col-lg-6">
                <label>ตำบล</label>
                <Form.Item name="lastname">
                  <Input disabled placeholder="ปากเพรียว" />
                </Form.Item>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <label>อำเภอ</label>
                <Form.Item name="firstname">
                  <Input disabled placeholder="เมืองสระบุรี" />
                </Form.Item>
              </div>
              <div className="col-lg-6">
                <label>จังหวัด</label>
                <Form.Item name="lastname">
                  <Input disabled placeholder="สระบุรี" />
                </Form.Item>
              </div>
            </div>
          </div>
        </div>
      </CardContainer>
    </div>
  );
  const renderFromData = (
    <div className="col-lg-7">
      <CardContainer>
        <CardHeader textHeader="รายละเอียดการบริการ" />
        <Form>
          <div className="container " style={{ backgroundColor: color.BG }}>
            <div className="row pt-3">
              <div className="col-lg-3">
                <span>วันเวลานัดหมาย</span>
              </div>
              <div className="col-lg-3">
                <span>ชื่อเกษตรกร</span>
              </div>
              <div className="col-lg">
                <span>จำนวนไร่</span>
              </div>
              <div className="col-lg">
                <span>จังหวัด</span>
              </div>
              <div className="col-lg">
                <span>คะแนนรีวิว</span>
              </div>
              <div className="col-lg"></div>
            </div>
          </div>
          <div className="container">
            <div className="row pt-3">
              <div className="col-lg-3">
                <span>23/08/2565, 13:00</span>
                <br />
                <p style={{ fontSize: "12px", color: color.Grey }}>
                  TK00000001
                </p>
              </div>
              <div className="col-lg-3">
                <span>เกษตรกรชาวนาดี 1</span>
                <br />
                <p style={{ fontSize: "12px", color: color.Grey }}>
                  0989284761
                </p>
              </div>
              <div className="col-lg">
                <span>10.0 ไร่</span>
              </div>
              <div className="col-lg">
                <span>กรุงเทพมหานคร</span>
              </div>
              <div className="col-lg">
                <span>
                  <img alt="logo" src={icon.iconStar} width={"30%"} /> 4.0
                </span>
              </div>
              <div className="col-lg">
                <ActionButton
                  icon={<FileTextFilled />}
                  color={color.primary1}
                  onClick={() => (window.location.href = "/DetailWorkDroner")}
                />
              </div>
            </div>
          </div>
        </Form>

        <div className="d-flex container justify-content-between pt-5 ">
          <p>รายการทั้งหมด 1 รายการ</p>
        </div>
      </CardContainer>
    </div>
  );
  return (
    <Layout>
      <Row>
        <BackIconButton
          onClick={() => (window.location.href = "/IndexRankDroner")}
        />
        <span className="pt-4">
          <strong style={{ fontSize: "20px" }}>
            รายละเอียดการให้บริการนักบินโดรน
          </strong>
        </span>
      </Row>
      <Row className="d-flex justify-content-around">
        {renderDroner}
        {renderFromData}
      </Row>
    </Layout>
  );
}
export default DetailRankDroner;
