import { Badge, Col, Form, Row, Table } from "antd";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import styled from "styled-components";
import { BackIconButton } from "../../components/button/BackButton";
import { CardContainer } from "../../components/card/CardContainer";
import { CardHeader } from "../../components/header/CardHearder";
import InvoiceTask from "../../components/popover/InvoiceTask";
import { RedeemDatasource } from "../../datasource/RedeemDatasource";
import { InvoiceTaskEntity } from "../../entities/NewTaskEntities";
import { DetailRedeemFermerEntity } from "../../entities/RedeemEntities";
import { color } from "../../resource";
import { DateTimeUtil } from "../../utilities/DateTimeUtil";
import { numberWithCommas } from "../../utilities/TextFormatter";
import { useNavigate } from "react-router-dom";
import ShowNickName from "../../components/popover/ShowNickName";
const _ = require("lodash");

const NewTable = styled(Table)`
  .ant-table-container table thead tr th {
    background-color: rgba(169, 203, 98, 0.1) !important;
    font-family: "Prompt" !important;
    font-weight: 500 !important;
    color: #2b2b2b !important;
    font-weight: bold !important;
  }
`;

const DetailFarmerRedeem = () => {
  const navigate = useNavigate();
  let queryString = _.split(window.location.pathname, "=");
  const [data, setData] = useState<DetailRedeemFermerEntity>();
  const [dataHis, setDataHis] = useState<
    {
      dateTime: string;
      remark: string;
      createBy: string;
      updateBy: string;
      status: string;
    }[]
  >([]);
  const [dataInvoice, setDataInvoice] = useState<InvoiceTaskEntity>();

  const fetchDetailRedeem = () => {
    RedeemDatasource.getRedeemFarmerById(queryString[1]).then((res) => {
      console.log(res);
      setData(res);
      let his: any = [];
      if (res.status === "CANCELED") {
        his = [
          {
            dateTime: res.createdAt,
            remark: "-",
            createBy: res.createBy,
            updateBy: res.updateBy,
            status: "แลกสำเร็จ",
          },
          {
            dateTime: res.updatedAt,
            remark: res.statusRemark,
            createBy: res.createBy,
            updateBy: res.updateBy,
            status: "ยกเลิก",
          },
        ];
      } else {
        his = [
          {
            dateTime: res.createdAt,
            remark: "-",
            createBy: res.createBy,
            updateBy: res.createBy,
            status: "แลกสำเร็จ",
          },
        ];
      }
      let inv: InvoiceTaskEntity = {
        raiAmount: res.farmAreaAmount,
        unitPrice: res.unitPrice,
        price: res.price,
        fee: res.fee,
        discountFee: res.discountFee,
        discountCoupon: res.discountCoupon,
        discountPromotion: res.discountPromotion,
        discountPoint: res.discountCampaignPoint,
        totalPrice: res.totalPrice,
      };
      setDataInvoice(inv);
      setDataHis(his);
    });
  };

  useEffect(() => {
    fetchDetailRedeem();
  }, []);

  const columeHis = [
    {
      title: "วันที่อัพเดท",
      dataIndex: "dateTime",
      key: "dateTime",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <span>
              {row.dateTime && DateTimeUtil.formatDateTime(row.dateTime)}
            </span>
          ),
        };
      },
    },
    {
      title: "รายละเอียดหรือหมายเหตุ",
      dataIndex: "remark",
      key: "remark",
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{row.remark}</span>,
        };
      },
    },
    {
      title: "สถานะ",
      dataIndex: "status",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span
                style={{
                  color: row.status === "ยกเลิก" ? color.Error : color.Success,
                }}
              >
                <Badge
                  color={row.status === "ยกเลิก" ? color.Error : color.Success}
                />{" "}
                {row.status}
              </span>
            </>
          ),
        };
      },
    },
    {
      title: "ผู้ใช้ที่อัพเดต",
      dataIndex: "updateBy",
      key: "updateBy",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <span>
              {index === 0 ? row.createBy : row.updateBy}{" "}
              <span>
                {row.createBy === row.updateBy || index === 0
                  ? "(เกษตรกร)"
                  : row.updateBy === null
                  ? "-"
                  : "(ผู้ดูแลระบบ)"}
              </span>{" "}
            </span>
          ),
        };
      },
    },
  ];

  const renderTaskDetail = (
    <CardContainer>
      <CardHeader textHeader="ข้อมูลที่เกี่ยวข้อง" bgColor="#2B2B2B" />
      <Form style={{ padding: "20px" }}>
        <Container
          style={{
            backgroundColor: "rgba(43, 43, 43, 0.1)",
          }}
          className="p-3"
        >
          <b
            style={{
              color: "#2B2B2B",
            }}
          >
            งานจ้างที่เกี่ยวข้อง
          </b>
          <Row>
            <Col span={3}>
              <div>รหัสงาน</div>
              <div style={{ color: "#2B2B2B" }}>
                <u>{data?.taskNo}</u>
              </div>
            </Col>
            <Col span={3}>
              <div>วัน/เวลานัดหมาย</div>
              <div>
                {DateTimeUtil.formatDateTime(data?.dateAppointment || "")}
              </div>
            </Col>
            <Col span={3}>
              <div>ชื่อเกษตรกร</div>
              <div>{data?.farmer.firstname + " " + data?.farmer.lastname}</div>
            </Col>
            <Col span={3}>
              <div>ชื่อนักบินโดรน</div>
              {data?.dronerId ? (
                <div>
                  {data?.droner.firstname + " " + data?.droner.lastname}
                </div>
              ) : (
                <div>-</div>
              )}
            </Col>
            <Col span={5}>
              <div>พื้นที่แปลงเกษตร</div>
              <div>
                {data?.farmerPlot.plotArea.subdistrictName +
                  "/" +
                  data?.farmerPlot.plotArea.districtName +
                  "/" +
                  data?.farmerPlot.plotArea.provinceName}
              </div>
            </Col>
            <Col span={2}>
              <div>จำนวนไร่</div>
              <div>{data?.farmAreaAmount} ไร่</div>
            </Col>
            <Col span={2}>
              <div>ค่าบริการ/ไร่</div>
              <div>{data?.unitPrice} บาท</div>
            </Col>
            <Col span={3}>
              <div>ยอดรวมค่าบริการ</div>
              <Row>
                <div>
                  {numberWithCommas(parseFloat(data?.totalPrice || ""))} บาท
                </div>
                <div className="pt-0">
                  <InvoiceTask
                    data={dataInvoice}
                    iconColor={color.Success}
                    title="รายละเอียดค่าบริการ"
                  />
                </div>
              </Row>
            </Col>
          </Row>
        </Container>
      </Form>
    </CardContainer>
  );
  const renderFarmerDetail = (
    <CardContainer>
      <CardHeader textHeader="ข้อมูลเกษตรกร" />
      <Container className="p-3">
        {data?.farmer !== null && data?.farmer.isDelete !== true ?
         <Row>
         <Col span={4}>
           <div>ชื่อเกษตรกร</div>
           <div style={{ color: color.Success }}>
             <u>{data?.farmer.firstname + " " + data?.farmer.lastname}</u>
             {data?.farmer.nickname && (
                  <ShowNickName data={data?.farmer.nickname} menu="INFO" />
                )}
           </div>
         </Col>
         <Col span={4}>
           <div>เบอร์โทร</div>
           <div>{data?.farmer.telephoneNo}</div>
         </Col>
         <Col span={12}>
           <div>ที่อยู่</div>
           <div>
             {data?.farmer.address.address1 +
               " " +
               data?.farmer.address.address2 +
               " " +
               data?.farmer.address.subdistrict.subdistrictName +
               " " +
               data?.farmer.address.district.districtName +
               " " +
               data?.farmer.address.province.provinceName +
               " " +
               data?.farmer.address.postcode}
           </div>
         </Col>
         <Col span={4}>
           <div>แต้มที่แลก</div>
           <div style={{ color: color.Error }}>
             {"- " +
               numberWithCommas(parseFloat(data?.usePoint!) || 0) +
               " แต้ม"}
           </div>
         </Col>
       </Row> :
       <div style={{ textAlign: "center" }}>
       <strong style={{ color: color.Error, alignItems: "center" }}>
         ผู้ใช้งานนี้ถูกลบแล้ว
       </strong>
     </div>}
       
      </Container>
      <NewTable columns={columeHis} dataSource={dataHis} pagination={false} />
    </CardContainer>
  );

  return (
    <>
      <Row>
        <BackIconButton onClick={() => navigate("/IndexRedeem/Farmer")} />
        <span className="pt-3">
          <strong style={{ fontSize: "20px" }}>รายละเอียดการแลกแต้ม</strong>
        </span>
      </Row>
      {renderTaskDetail}
      <br />
      {renderFarmerDetail}
    </>
  );
};

export default DetailFarmerRedeem;
