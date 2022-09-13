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
import image from "../../resource/image";
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
  const row = 10;
  const [current, setCurrent] = useState(1);

  const sorter = (a: any, b: any) => {
    if (a === b) return 0;
    else if (a === null) return 1;
    else if (b === null) return -1;
    else return a.localeCompare(b);
  };
  useEffect(() => {
    fetchDronerById();
  }, []);

  const fetchDronerById = async () => {
    await DronerRankDatasource.getDronerRankById(dronerId).then((res) => {
      setData(res);
      setListDetail(res.task);
    });
  };
  const onChangePage = (page: number) => {
    setCurrent(page);
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
                    imgProfile == undefined ? image.empty_img : imgProfile
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
              {data.avgrating > "0" ? (
                <span style={{ color: color.Success, padding: "7px" }}>
                  <StarFilled
                    style={{
                      color: "#FFCA37",
                      fontSize: "20px",
                      marginRight: "7px",
                    }}
                  />
                  {parseFloat(data.avgrating).toFixed(1)}
                </span>
              ) : (
                "-"
              )}
            </CardContainer>
          </div>
          <div className="row">
            <label>Droner ID</label>
            <div className="row">
              <Form.Item name="droneId">
                <Input
                  disabled
                  defaultValue={data.dronerCode != null ? data.dronerCode : "-"}
                />
              </Form.Item>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <label>ชื่อ</label>
                <Form.Item name="firstname">
                  <Input
                    disabled
                    defaultValue={data.firstname != null ? data.firstname : "-"}
                  />
                </Form.Item>
              </div>
              <div className="col-lg-6">
                <label>นามสกุล</label>
                <Form.Item name="lastname">
                  <Input
                    disabled
                    defaultValue={data.lastname != null ? data.lastname : "-"}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <label>เบอร์โทร</label>
                <Form.Item name="telephoneNo">
                  <Input
                    disabled
                    defaultValue={
                      data.telephoneNo != null ? data.telephoneNo : "-"
                    }
                  />
                </Form.Item>
              </div>
              <div className="col-lg-6">
                <label>ตำบล</label>
                <Form.Item name="subdistrictName">
                  <Input
                    disabled
                    defaultValue={
                      data.address != null
                        ? data.address.subdistrict.subdistrictName
                        : "-"
                    }
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
                    defaultValue={
                      data.address != null
                        ? data.address.district.districtName
                        : "-"
                    }
                  />
                </Form.Item>
              </div>
              <div className="col-lg-6">
                <label>จังหวัด</label>
                <Form.Item name="provinceName">
                  <Input
                    disabled
                    defaultValue={
                      data.address != null ? data.address.province.region : "-"
                    }
                  />
                </Form.Item>
              </div>
            </div>
          </div>
        </div>
      </CardContainer>
    </div>
  );
  const columns = [
    {
      title: "วันเวลานัดหมาย",
      dataIndex: "dateAppointment",
      key: "dateAppointment",
      width: "180px",
      sorter: (a: any, b: any) => sorter(a.dateAppointment, b.dateAppointment),
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span>
                {moment(new Date(row.dateAppointment)).format(dateFormat)},{" "}
                {moment(new Date(row.dateAppointment)).format(timeFormat)}
              </span>
              <br />
              <span style={{ color: color.Disable, fontSize: "12px" }}>
                {row.taskNo}
              </span>
            </>
          ),
        };
      },
    },
    {
      title: "ชื่อเกษตรกร",
      dataIndex: "farmer",
      key: "farmer",
      width: "160px",
      render: (value: any, row: any, index: number) => {
        return {
          children: <>{row.farmer.firstname + " " + row.farmer.lastname}</>,
        };
      },
    },
    {
      title: "จำนวนไร่",
      dataIndex: "farmAreaAmount",
      key: "farmAreaAmount",
      width: "100px",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span>
                {parseFloat(row.farmAreaAmount).toFixed(1) + " " + "ไร่"}
              </span>
            </>
          ),
        };
      },
    },
    {
      title: "จังหวัด",
      dataIndex: "province",
      key: "province",
     width: "90px",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span>{row.farmer.address.province.region}</span>
            </>
          ),
        };
      },
    },
    {
      title: "คะแนนรีวิว",
      dataIndex: "reviewDronerAvg",
      key: "reviewDronerAvg",
      width: "100px",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span>
                {row.reviewDronerAvg > "0" ? (
                  <Row>
                    <div style={{ color: "#FFCA37", fontSize: "16px" }}>
                      <StarFilled />
                    </div>
                    <span className="pt-1 ps-1">
                      {parseFloat(row.reviewDronerAvg).toFixed(1)}
                    </span>
                  </Row>
                ) : (
                  "-"
                )}
              </span>
            </>
          ),
        };
      },
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      width: "70px",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <ActionButton
                icon={<FileTextOutlined />}
                color={color.primary1}
                onClick={() =>
                  (window.location.href = "/DetailWorkDroner?=" + row.id)
                }
              />
            </>
          ),
        };
      },
    },
  ];
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
        <CardContainer>
          <CardHeader textHeader="รายละเอียดการบริการ" />
          <Table columns={columns} dataSource={data.task} pagination={false} />
        </CardContainer>
      </Row>
      <Row justify="end">
        <div
          className="d-flex justify-content-between col-lg-7"
          style={{ margin: "10px" }}
        >
          <p>รายการทั้งหมด {data.task.length} รายการ</p>
          <Pagination
            current={current}
            total={data.task.length}
            onChange={onChangePage}
            pageSize={row}
            showSizeChanger={false}
          />
        </div>
      </Row>
    </Layout>
  );
}
export default DetailRankDroner;
