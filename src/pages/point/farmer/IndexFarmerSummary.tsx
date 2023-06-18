import {
  CaretDownOutlined,
  CaretUpOutlined,
  FileTextOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Col, Image, Input, Pagination, Row, Table } from "antd";
import React, { useEffect, useState } from "react";
import ActionButton from "../../../components/button/ActionButton";
import { CardContainer } from "../../../components/card/CardContainer";
import { color, icon } from "../../../resource";
import { useNavigate } from "react-router-dom";
import { FarmerSummaryPointListEntity } from "../../../entities/PointReceiveEntities";
import { PointReceiveDatasource } from "../../../datasource/PointReceiveDatasource";
import { numberWithCommas } from "../../../utilities/TextFormatter";
import { sorter } from "../../../utilities/Sorting";

function IndexFarmerSummary() {
  const navigate = useNavigate();
  const row = 10;
  const [current, setCurrent] = useState(1);
  const [data, setData] = useState<FarmerSummaryPointListEntity>();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortDirection, setSortDirection] = useState<string | undefined>(
    undefined
  );

  const fetchFarmerSum = () => {
    PointReceiveDatasource.getFarmerSumPoint(
      row,
      current,
      searchKeyword,
      sortDirection
    ).then((res) => {
      setData(res);
    });
  };

  useEffect(() => {
    fetchFarmerSum();
  }, [current, sortDirection]);

  const onChangePage = (page: number) => {
    setCurrent(page);
  };
  const onSearch = () => {
    setCurrent(1);
    fetchFarmerSum();
  };

  const sortTitle = (title: string, field?: string) => {
    return (
      <>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {title}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              cursor: "pointer",
            }}
            onClick={() => {
              setSortDirection((prev: any) => {
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
                color: sortDirection === "ASC" ? "#ffca37" : "white",
              }}
            />
            <CaretDownOutlined
              style={{
                position: "relative",
                bottom: 2,
                color: sortDirection === "DESC" ? "#ffca37" : "white",
              }}
            />
          </div>
        </div>
      </>
    );
  };

  const pageTitle = (
    <Row gutter={8} className="p-3">
      <Col span={16}>
        <span
          className="card-label font-weight-bolder text-dark"
          style={{
            fontSize: 22,
          }}
        >
          <strong>แต้มรายบุคคล (เกษตรกร)</strong>
        </span>
      </Col>
      <Col style={{ color: color.Error }} span={6}>
        <Input
          allowClear
          prefix={<SearchOutlined style={{ color: color.Disable }} />}
          placeholder="ค้นหาชื่อเกษตรกร/เบอร์โทร"
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

  const columns = [
    {
      title: "ชื่อเกษตรกร",
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
      key: "telephoneNo",
      width: "45%",
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{row.telephoneNo}</span>,
        };
      },
    },
    {
      title: () => sortTitle("จำนวนแต้ม"),
      dataIndex: "balance",
      key: "balance",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <img
                src={icon.coinFarmer}
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
                    navigate("/IndexFarmerHistorySum/id=" + row.farmerId)
                  }
                />
              </div>
            </div>
          ),
        };
      },
    },
  ];

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
      <div className="d-flex justify-content-between pt-4">
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
}

export default IndexFarmerSummary;
