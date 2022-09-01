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
import { UploadImageDatasouce } from "../../datasource/UploadImageDatasource";
import { DronerRankDatasource } from "../../datasource/DronerRankDatasource";
import {
  DronerRankDetailEntity,
  DronerRankDetailEntity_INIT,
  taskByDronerEntity,
  taskByDronerEntity_INIT,
} from "../../entities/DronerRankEntities";
import uploadImg from "../../resource/media/empties/uploadImg.png";
import emptyData from "../../resource/media/empties/iconoir_farm.png";
import { StarFilled, FileTextOutlined } from "@ant-design/icons";
import moment from "moment";

const _ = require("lodash");
let queryString = _.split(window.location.search, "=");
const dateFormat = "DD/MM/YYYY";
const timeFormat = "HH:mm";

function DetailRankDroner() {
  const style: React.CSSProperties = {
    backgroundColor: "#2196531A",
    width: "30%",
    height: "70px",
    margin: "5px",
    padding: "10px",
  };
  const dronerId = queryString[1];
  const [data, setData] = useState<DronerRankDetailEntity>(
    DronerRankDetailEntity_INIT
  );
  const [listDetail, setListDetail] = useState<taskByDronerEntity[]>([
    taskByDronerEntity_INIT,
  ]);
  let imgList: (string | boolean)[] = [];
  const [imgProfile, setImgProfile] = useState<any>();

  useEffect(() => {
    fetchDronerById();
  }, []);

  const fetchDronerById = async () => {
    await DronerRankDatasource.getDronerRankById(dronerId).then((res) => {
      console.log(res);
      setData(res);
      setListDetail(res.task);
    });
  };

  const financial = (e: any) => {
    return Number.parseFloat(e).toFixed(1);
  };

  const renderDroner = (
    <div className="col-lg-4">
      <CardContainer key={data.id}>
        <CardHeader textHeader="ข้อมูลนักบินโดรน" />
        <div
          className="form-group col-lg-12 text-start container"
          style={{ padding: "20px" }}
        >
          <div className="row">
            <div className="form-group text-center pb-4">
              <div
                className="hiddenFileInput zoom"
                style={{
                  backgroundImage: `url(${
                    imgProfile == undefined ? uploadImg : imgProfile
                  })`,
                }}
              ></div>
            </div>
          </div>
          <div className="row text-center">
            <CardContainer style={style}>
              <span>จำนวนบริการ</span>
              <br />
              <span style={{ color: color.Success }}>
                {data.totalTaskCount + " " + "งาน"}
              </span>
            </CardContainer>
            <CardContainer style={style}>
              <span>จำนวนไร่</span>
              <br />
              <span style={{ color: color.Success }}>
                {data.totalRaiCount + " " + "ไร่"}
              </span>
            </CardContainer>
            <CardContainer style={style}>
              <span>คะแนน Rating</span>
              <br />
              <span style={{ color: color.Success }}>
                <StarFilled
                  style={{
                    color: "#FFCA37",
                    fontSize: "20px",
                    marginRight: "10px",
                  }}
                />
                {financial(data.avgrating)}
              </span>
            </CardContainer>
          </div>
          <div className="row">
            <label>Droner ID</label>
            <div className="row">
              <Form.Item name="droneId">
                <Input disabled defaultValue={data.id} />
              </Form.Item>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <label>ชื่อ</label>
                <Form.Item name="firstname">
                  <Input disabled defaultValue={data.firstname} />
                </Form.Item>
              </div>
              <div className="col-lg-6">
                <label>นามสกุล</label>
                <Form.Item name="lastname">
                  <Input disabled defaultValue={data.lastname} />
                </Form.Item>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <label>เบอร์โทร</label>
                <Form.Item name="telephoneNo">
                  <Input disabled defaultValue={data.telephoneNo} />
                </Form.Item>
              </div>
              <div className="col-lg-6">
                <label>ตำบล</label>
                <Form.Item name="subdistrictName">
                  <Input
                    disabled
                    defaultValue={data.address.subdistrict.subdistrictName}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <label>อำเภอ</label>
                <Form.Item name="districtName">
                  <Input
                    disabled
                    defaultValue={data.address.district.districtName}
                  />
                </Form.Item>
              </div>
              <div className="col-lg-6">
                <label>จังหวัด</label>
                <Form.Item name="provinceName">
                  <Input disabled defaultValue={data.address.province.region} />
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
          <div style={{ backgroundColor: color.BG, padding: "10px" }}>
            <div className="row">
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
        </Form>
        <Form>
          {listDetail.length != 0 ? (
            <div className="container">
              {listDetail.map((item, index) => (
                <div className="row pt-3 pb-3">
                  <div className="col-lg-3">
                    <span>
                      {moment(new Date(item.dateAppointment)).format(
                        dateFormat
                      )}
                      ,{" "}
                      {moment(new Date(item.dateAppointment)).format(
                        timeFormat
                      )}
                    </span>
                    <br />
                    <span style={{ color: color.Disable, fontSize: "12px" }}>
                      {item.taskNo}
                    </span>
                  </div>
                  <div className="col-lg-3">
                    <span>
                      {item.farmer.firstname + " " + item.farmer.lastname}
                    </span>
                    <br />
                    <span style={{ color: color.Disable, fontSize: "12px" }}>
                      {item.farmer.telephoneNo}
                    </span>
                  </div>
                  <div className="col-lg">
                    <span>10.0 ไร่</span>
                  </div>
                  <div className="col-lg">
                    <span>กรุงเทพมหานคร</span>
                  </div>
                  <div className="col-lg">
                    <span>
                      <StarFilled
                        style={{
                          color: "#FFCA37",
                          fontSize: "20px",
                          marginRight: "10px",
                        }}
                      />
                      {financial(item.reviewDronerAvg)}
                    </span>
                  </div>
                  <div className="col-lg">
                    <ActionButton
                      icon={<FileTextOutlined />}
                      color={color.primary1}
                      onClick={() =>
                        (window.location.href = "/DetailWorkDroner?=" + item.id)
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="container text-center" style={{ padding: "80px" }}>
              <img src={emptyData}></img>
              <p>ยังไม่มีการให้บริการ</p>
            </div>
          )}
        </Form>

        <div className="d-flex container justify-content-between pt-5 ">
          <p>รายการทั้งหมด {data.totalTaskCount} รายการ</p>
          {data.totalTaskCount.length < 10 ? null : (
            <Pagination defaultCurrent={1} total={1} />
          )}
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
