import React, { useEffect, useState } from "react";
import { Row, Form, Input, Pagination, Table, Tag, Spin } from "antd";
import { Image as ImageEmpty } from "antd";
import { CardContainer } from "../../components/card/CardContainer";
import color from "../../resource/color";
import { CardHeader } from "../../components/header/CardHearder";
import { BackIconButton } from "../../components/button/BackButton";
import ActionButton from "../../components/button/ActionButton";
import { UploadImageDatasouce } from "../../datasource/UploadImageDatasource";
import { DronerRankDatasource } from "../../datasource/DronerRankDatasource";
import {
  DronerRankDetailEntity,
  DronerRankDetailEntity_INIT,
} from "../../entities/DronerRankEntities";

import {
  StarFilled,
  FileTextOutlined,
  CaretUpOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import moment from "moment";
import image from "../../resource/image";
import { useNavigate } from "react-router-dom";
import { formatNumberWithCommas } from "../../utilities/TextFormatter";
import styled from "styled-components";
import ShowNickName from "../../components/popover/ShowNickName";
const _ = require("lodash");
const dateFormat = "DD/MM/YYYY";
const timeFormat = "HH:mm";

const NewTableStyle = styled(Table)`
  .ant-table-container table thead tr th {
    background-color: rgba(232, 236, 243, 1) !important;
    font-weight: 600 !important;
    color: #2b2b2b !important;
  }
  .ant-table-tbody > tr > td {
    border-bottom: 1px solid #fff;
  }
  .ant-table-thead
    > tr
    > th:not(:last-child):not(.ant-table-selection-column):not(
      .ant-table-row-expand-icon-cell
    ):not([colspan])::before {
    position: fixed;
  }
`;

function DetailRankDroner() {
  let queryString = _.split(window.location.search, "=");
  const navigate = useNavigate();
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
  let imgList: (string | boolean)[] = [];
  const [imgProfile, setImgProfile] = useState<any>();
  const row = 7;
  const [current, setCurrent] = useState(1);
  const [sortDirection, setSortDirection] = useState<string | undefined>();
  const [sortField, setSortField] = useState<string | undefined>();
  const [sortDirection1, setSortDirection1] = useState<string | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDronerById();
  }, [current, sortDirection]);

  const fetchDronerById = async () => {
    setLoading(true);
    await DronerRankDatasource.getDronerRankById(
      dronerId,
      current,
      row,
      sortField,
      sortDirection
    )
      .then((res) => {
        setData(res);
        let getPathPro = res.file.filter((x) => x.category == "PROFILE_IMAGE");
        imgList.push(getPathPro.length >= 1 ? getPathPro[0].path : "");
        var i = 0;
        for (i; imgList.length > i; i++) {
          i == 0 &&
            UploadImageDatasouce.getImage(imgList[i].toString()).then(
              (resImg) => {
                setImgProfile(resImg.url);
              }
            );
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };
  const previewImg = async () => {
    let src = imgProfile;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(imgProfile);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  const onChangePage = (page: number) => {
    setCurrent(page);
  };

  const renderDroner = (
    <CardContainer key={data.id}>
      <CardHeader textHeader="ข้อมูลนักบินโดรน" />
      <div
        className="form-group col-lg-12 text-start container"
        style={{ padding: "20px" }}
      >
        <div className="row">
          <div className="form-group text-center pb-4">
            <div
              onClick={previewImg}
              className="hiddenFileInput zoom"
              style={{
                cursor: "pointer",
                backgroundImage: `url(${
                  imgProfile == undefined ? image.empty_img : imgProfile
                })`,
              }}
            />
          </div>
        </div>
        <div className="row text-center pb-2">
          <CardContainer style={style}>
            <span>จำนวนบริการ</span>
            <br />
            <span style={{ color: color.Success }}>
              {data.totalTaskCount
                ? formatNumberWithCommas(parseFloat(data.totalTaskCount))
                : 0}{" "}
              งาน
            </span>
          </CardContainer>
          <CardContainer style={style}>
            <span>จำนวนไร่</span>
            <br />
            <span style={{ color: color.Success }}>
              {data.totalRaiCount
                ? formatNumberWithCommas(parseFloat(data.totalRaiCount))
                : 0}{" "}
              ไร่
            </span>
          </CardContainer>
          <CardContainer style={style}>
            <span>คะแนน Rating</span>
            <div className="pt-1">
              {data.avgrating > "0" ? (
                <span style={{ color: color.Success, padding: "7px" }}>
                  <StarFilled
                    style={{
                      color: "#FFCA37",
                      fontSize: "20px",
                      marginRight: "7px",
                      verticalAlign: 0.5,
                    }}
                  />
                  {parseFloat(data.avgrating).toFixed(1)}
                </span>
              ) : (
                "-"
              )}
            </div>
          </CardContainer>
        </div>
        <div className="row">
          <label>Droner ID</label>
          <div className="row">
            <Form.Item name="droneId">
              <Input
                disabled
                defaultValue={data.dronerCode !== null ? data.dronerCode : "-"}
              />
            </Form.Item>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <label>ชื่อ</label>
              <Form.Item name="firstname">
                <Input
                  disabled
                  defaultValue={data.firstname  ? data.firstname : "-"}
                />
              </Form.Item>
            </div>
            <div className="col-lg-6">
              <label>นามสกุล</label>
              <Form.Item name="lastname">
                <Input
                  disabled
                  defaultValue={data.lastname  ? data.lastname : "-"}
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
                    data.telephoneNo  ? data.telephoneNo : "-"
                  }
                />
              </Form.Item>
            </div>
            <div className="col-lg-6">
              <label>ชื่อเล่น</label>
              <Form.Item name="nickname">
                <Input
                  disabled
                  defaultValue={data.nickname !== null ? data.nickname : "-"}
                />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <label>ตำบล</label>
              <Form.Item name="subdistrictName">
                <Input
                  disabled
                  defaultValue={
                    data.address !== null
                      ? data.address.subdistrict.subdistrictName
                      : "-"
                  }
                />
              </Form.Item>
            </div>
            <div className="col-lg-6">
              <label>อำเภอ</label>
              <Form.Item name="districtName">
                <Input
                  disabled
                  defaultValue={
                    data.address !== null
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
                    data.address != null
                      ? data.address.province.provinceName
                      : "-"
                  }
                />
              </Form.Item>
            </div>
          </div>
        </div>
      </div>
    </CardContainer>
  );
  const columns = [
    {
      title: () => {
        return (
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            วันเวลานัดหมาย{" "}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
              }}
              onClick={() => {
                setSortField("dateAppointment");
                setSortDirection((prev) => {
                  if (prev === "ASC") {
                    return "DESC";
                  } else if (prev === undefined) {
                    return "ASC";
                  } else {
                    return undefined;
                  }
                });
                setSortDirection1((prev) => {
                  if (prev === "ASC") {
                    return "DESC";
                  } else if (prev === undefined) {
                    return "ASC";
                  } else {
                    return undefined;
                  }
                });
              }}
            >
              <CaretUpOutlined
                style={{
                  position: "relative",
                  top: 2,
                  color: sortDirection1 === "ASC" ? "#ffca37" : "grey",
                }}
              />
              <CaretDownOutlined
                style={{
                  position: "relative",
                  bottom: 2,
                  color: sortDirection1 === "DESC" ? "#ffca37" : "grey",
                }}
              />
            </div>
          </div>
        );
      },
      dataIndex: "dateAppointment",
      key: "dateAppointment",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span>
                {moment(new Date(row.dateAppointment)).format(dateFormat)},{" "}
                {moment(new Date(row.dateAppointment)).format(timeFormat)}
              </span>
              <br />
              <span style={{ color: color.Grey, fontSize: "12px" }}>
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
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span>{row.farmer.firstname + " " + row.farmer.lastname}</span>
              <br />
              <span style={{ color: color.Grey, fontSize: 12 }}>
                <span>{row.farmer.farmerCode}</span>
                {row.farmer.nickname && (
                  <ShowNickName
                    data={row.farmer.nickname}
                    menu="detailRank"
                    status={row.farmer.status}
                  />
                )}
              </span>
            </>
          ),
        };
      },
    },
    {
      title: "จำนวนไร่",
      dataIndex: "farmAreaAmount",
      key: "farmAreaAmount",
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
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span>
                {row.farmer.address.provinceId
                  ? row.farmer.address.province.provinceName
                  : "-"}
              </span>
            </>
          ),
        };
      },
    },
    {
      title: "คะแนนรีวิว",
      dataIndex: "reviewDronerAvg",
      key: "reviewDronerAvg",
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
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <ActionButton
                icon={<FileTextOutlined />}
                color={color.primary1}
                onClick={() => navigate("/DetailWorkDroner?=" + row.id)}
              />
            </>
          ),
        };
      },
    },
  ];
  let emptyState = {
    emptyText: (
      <div style={{ textAlign: "center", padding: "25%" }}>
        <ImageEmpty
          src={image.empty_table_drone}
          preview={false}
          style={{ width: 90, height: 90 }}
        />
        <p>ยังไม่มีข้อมูลงาน</p>
      </div>
    ),
  };
  return (
    <>
      <Spin tip="กำลังโหลดข้อมูล..." size="large" spinning={loading}>
        <Row>
          <BackIconButton onClick={() => navigate("/IndexRankDroner")} />
          <span className="pt-3">
            <strong style={{ fontSize: "20px" }}>
              รายละเอียดการให้บริการนักบินโดรน
            </strong>
          </span>
        </Row>
        <div className="row ">
          <div className="col-lg-4"> {renderDroner}</div>
          <div className="col-lg-8">
            <CardContainer style={{ height: 670 }}>
              <CardHeader textHeader="รายละเอียดการบริการ" />
              <NewTableStyle
                locale={emptyState}
                columns={columns}
                dataSource={data.task}
                pagination={false}
                scroll={{ x: "max-content" }}
              />
            </CardContainer>
            <div
              className="d-flex justify-content-between col-lg"
              style={{ margin: "10px" }}
            >
              <p>รายการทั้งหมด {data.totalTaskCount} รายการ</p>
              <Pagination
                current={current}
                total={parseFloat(data.totalTaskCount)}
                onChange={onChangePage}
                pageSize={row}
                showSizeChanger={false}
              />
            </div>
          </div>
        </div>
      </Spin>
    </>
  );
}
export default DetailRankDroner;
