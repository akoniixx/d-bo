import { FileTextOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Col, Input, Pagination, Row, Table, Image } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ActionButton from "../../../components/button/ActionButton";
import { CardContainer } from "../../../components/card/CardContainer";
import { color, icon } from "../../../resource";

const IndexDronerSummaryPoint = () => {
  const navigate = useNavigate();
  const row = 10;
  const [current, setCurrent] = useState(1);

  const onChangePage = (page: number) => {
    setCurrent(page);
  };
  const dataMock = [
    {
      dateTime: Date(),
      dronerName: "สวัสดี นะจ๊ะ",
      telephone: "0938355808",
      totalPoint: 200,
    },
    {
      dateTime: Date(),
      dronerName: "สวัสดี วันศุกร์",
      telephone: "0938355809",
      totalPoint: 100,
    },
  ];
  const columns = [
    {
      title: "ชื่อนักบินโดรน",
      dataIndex: "dronerName",
      key: "dronerName",
      width: "30%",
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{row.dronerName}</span>,
        };
      },
    },
    {
      title: "เบอร์โทร",
      dataIndex: "telephone",
      width: "50%",
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{row.telephone}</span>,
        };
      },
    },
    {
      title: "แต้มคงเหลือ",
      dataIndex: "totalPoint",
      key: "totalPoint",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <Image
                src={icon.coin}
                style={{
                  width: "26px",
                  height: "26px",
                  alignContent: "center",
                }}
              />{" "}
              <span>{value + ` แต้ม`}</span>
            </>
          ),
        };
      },
    },
    {
      title: "",
      dataIndex: "Action",
      key: "Action",
      width: "8%",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div className="d-flex flex-row justify-content-center">
              <div className="col-lg-6">
                <ActionButton
                  icon={<FileTextOutlined />}
                  color={color.primary1}
                  onClick={() =>
                    navigate("/DetailDronerHistorySum/id=" + (index + 1))
                  }
                />
              </div>
            </div>
          ),
        };
      },
    },
  ];
  const pageTitle = (
    <Row gutter={8} className="p-3">
      <Col span={16}>
        <span
          className="card-label font-weight-bolder text-dark"
          style={{
            fontSize: 22,
          }}
        >
          <strong>แต้มรายบุคคล (นักบินโดรน)</strong>
        </span>
      </Col>
      <Col style={{ color: color.Error }} span={6}>
        <Input
          allowClear
          prefix={<SearchOutlined style={{ color: color.Disable }} />}
          placeholder="ค้นหาชื่อเกษตรกร/เบอร์โทร"
        />
      </Col>
      <Col span={2}>
        <Button
          style={{
            borderColor: color.Success,
            borderRadius: "5px",
            color: color.secondary2,
            backgroundColor: color.Success,
          }}
        >
          ค้นหาข้อมูล
        </Button>
      </Col>
    </Row>
  );
  return (
    <>
      {pageTitle}
      <CardContainer>
        <Table
          dataSource={dataMock}
          columns={columns}
          pagination={false}
          size="large"
          tableLayout="fixed"
        />
      </CardContainer>
      <div className="d-flex justify-content-between pt-3 pb-3">
        <p>รายการทั้งหมด {dataMock?.length} รายการ</p>
        <Pagination
          current={current}
          total={dataMock.length}
          onChange={onChangePage}
          pageSize={row}
          showSizeChanger={false}
        />
      </div>
    </>
  );
};

export default IndexDronerSummaryPoint;
