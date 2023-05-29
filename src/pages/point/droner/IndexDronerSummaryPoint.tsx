import { FileTextOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Col, Input, Pagination, Row, Table, Image } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ActionButton from "../../../components/button/ActionButton";
import { CardContainer } from "../../../components/card/CardContainer";
import { PointReceiveDatasource } from "../../../datasource/PointReceiveDatasource";
import { DronerSummaryPointListEntity } from "../../../entities/PointReceiveEntities";
import { color, icon } from "../../../resource";
import { numberWithCommas } from "../../../utilities/TextFormatter";

const IndexDronerSummaryPoint = () => {
  const navigate = useNavigate();
  const row = 10;
  const [current, setCurrent] = useState(1);
  const [data, setData] = useState<DronerSummaryPointListEntity>();
  const [searchKeyword, setSearchKeyword] = useState("");

  const fetchDronerSum = () => {
    PointReceiveDatasource.getDronerSumPoint(row, current, searchKeyword).then(
      (res) => {
        setData(res);
      }
    );
  };

  useEffect(() => {
    fetchDronerSum();
  }, []);

  const onSearch = () => {
    setCurrent(1);
    fetchDronerSum();
  };

  const onChangePage = (page: number) => {
    setCurrent(page);
  };

  const columns = [
    {
      title: "ชื่อนักบินโดรน",
      width: "30%",
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{row.firstname + " " + row.lastname}</span>,
        };
      },
    },
    {
      title: "เบอร์โทร",
      dataIndex: "telephoneNo",
      width: "45%",
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{row.telephoneNo}</span>,
        };
      },
    },
    {
      title: "แต้มคงเหลือ",
      dataIndex: "balance",
      key: "balance",
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
              <span>{numberWithCommas(row.balance) + ` แต้ม`}</span>
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
          placeholder="ค้นหาชื่อนักบินโดรน/เบอร์โทร"
          onChange={(e) => setSearchKeyword(e.target.value)}
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
          onClick={onSearch}
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
          dataSource={data?.data}
          columns={columns}
          pagination={false}
          size="large"
          tableLayout="fixed"
        />
      </CardContainer>
      <div className="d-flex justify-content-between pt-3 pb-3">
        <p>รายการทั้งหมด {data?.count} รายการ</p>
        <Pagination
          current={current}
          total={data?.count}
          onChange={onChangePage}
          pageSize={row}
          showSizeChanger={false}
        />
      </div>
    </>
  );
};

export default IndexDronerSummaryPoint;
