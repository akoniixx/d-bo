import { FileTextOutlined, SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Image,
  Input,
  Pagination,
  Row,
  Table,
} from "antd";
import React, { useEffect, useState } from "react";
import ActionButton from "../../../components/button/ActionButton";
import { CardContainer } from "../../../components/card/CardContainer";
import { color, icon } from "../../../resource";
import { useNavigate } from "react-router-dom";
import { FarmerSummaryPointEntity } from "../../../entities/PointReceiveEntities";
import { PointReceiveDatasource } from "../../../datasource/PointReceiveDatasource";
import { numberWithCommas } from "../../../utilities/TextFormatter";

function IndexFarmerSummary() {
  const navigate = useNavigate();
  const row = 10;
  const [current, setCurrent] = useState(1);
  const [data, setData] = useState<FarmerSummaryPointEntity[]>();
  const [searchKeyword, setSearchKeyword] = useState("");

  const fetchFarmerSum = () => {
    PointReceiveDatasource.getFarmerSumPoint(row, current, searchKeyword).then(
      (res) => {
        setData(res);
      }
    );
  };

  useEffect(() => {
    fetchFarmerSum();
  }, [current]);

  const onChangePage = (page: number) => {
    setCurrent(page);
  };
  const onSearch = () => {
    setCurrent(1);
    fetchFarmerSum();
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
          children: (
            <>
              <span>{row.firstname + " " + row.lastname}</span>
            </>
          ),
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
                  onClick={() => navigate("/IndexFarmerHistorySum")}
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
      <>
        {pageTitle}
        <CardContainer>
          <Table
            dataSource={data}
            columns={columns}
            pagination={false}
            size="large"
            tableLayout="fixed"
          />
        </CardContainer>
        <div className="d-flex justify-content-between pt-4">
          <p>รายการทั้งหมด {data?.length} รายการ</p>
          <Pagination
            current={current}
            total={data?.length}
            onChange={onChangePage}
            pageSize={row}
            showSizeChanger={false}
          />
        </div>
      </>
    </>
  );
}

export default IndexFarmerSummary;
