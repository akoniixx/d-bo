import React, { useEffect, useState } from 'react'
import Layouts from '../../components/layout/Layout'
import Search from 'antd/lib/input/Search'
import Select from 'antd/lib/select'
import { Option } from "antd/lib/mentions";
import { Badge, Button, Pagination, Table } from 'antd';
import { color } from '../../resource';
import ActionButton from '../../components/button/ActionButton';
import { CaretDownOutlined, CaretUpOutlined, DeleteOutlined, EditOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { NewsDatasource } from '../../datasource/NewsDatasource';
import { DateTimeUtil } from '../../utilities/DateTimeUtil';
import { STATUS_COUPON } from '../../definitions/Status';

function NewsPage() {
  const navigate = useNavigate();
  const row = 10;
  const [status,setStatus] = useState<string | undefined>(undefined)
  const [application,setApplication] = useState<string | undefined>(undefined)
  const [sortDirection,setSortDirection] = useState<string | undefined>(undefined)
  const [sortField,setSortField] = useState<string | undefined>(undefined)
  const [search,setSearch] = useState<string>("")
  const [current, setCurrent] = useState(1);
  const [data, setData] = useState<any>({
    count: 0,
    news: [],
  });
  const fetchNews = ()=>{
    NewsDatasource.getNews(
      row,
      current,
      application,
      status,
      sortField,
      sortDirection,
      search
    ).then(res => {
      setData({
        count : res.count,
        news : res.data
      })
    })
  }

  const onChangeSearch =(e : any)=>{
    setSearch(e.target.value)
    setCurrent(1)
  }

  const onChangeStatus = (status : string)=>{
    setStatus(status)
    setCurrent(1)
  }

  const onChangeApplication = (application : string)=>{
    setApplication(application)
    setCurrent(1)
  }

  const onChangePage = (page: number) => {
    setCurrent(page);
  };

  useEffect(()=>{
    fetchNews()
  },[current,sortDirection])
  const PageTitle = (
    <>
      <div
        className="container d-flex justify-content-between"
        style={{ padding: "10px" }}
      >
      <div>
          <span
            className="card-label font-weight-bolder text-dark"
            style={{
              fontSize: 22,
              fontWeight: "bold",
              padding: "8px",
            }}
          >
            <strong>ข่าวสาร (News)</strong>
          </span>
        </div>
        <div className="d-flex">
          <div className="col">
            <Search
              placeholder="ค้นหาชื่อข่าวสาร"
              className="col-lg-12 p-1"
              value={search}
              onChange={(e: any) => onChangeSearch(e)}
            />
          </div>
          <div className="col">
          <Select
            className="col-lg-12 p-1"
            placeholder="เลือกสถานะ"
            onChange={onChangeStatus}
            showSearch
            value={status}
            allowClear
            optionFilterProp="children"
            filterOption={(input: any, option: any) =>
              option.children.includes(input)
            }
            filterSort={(optionA, optionB) =>
              optionA.children
                .toLowerCase()
                .localeCompare(optionB.children.toLowerCase())
            }
          >
            <Option value={"ACTIVE"}>ใช้งาน</Option>
            <Option value={"DRAFTING"}>รอเปิดใช้งาน</Option>
            <Option value={"INACTIVE"}>ปิดการใช้งาน</Option>
          </Select>
        </div>
        <div className="col">
          <Select
            className="col-lg-12 p-1"
            placeholder="เลือกแอปพลิเคชั่น"
            onChange={onChangeApplication}
            showSearch
            value={application}
            allowClear
            optionFilterProp="children"
            filterOption={(input: any, option: any) =>
              option.children.includes(input)
            }
            filterSort={(optionA, optionB) =>
              optionA.children
                .toLowerCase()
                .localeCompare(optionB.children.toLowerCase())
            }
          >
            <Option value={"FARMER"}>Farmer App</Option>
            <Option value={"DRONER"}>Droner App</Option>
            <Option value={"ALL"}>All</Option>
          </Select>
          </div>
          <div className="pt-1 me-1">
          <Button
            style={{
              borderColor: color.Success,
              borderRadius: "5px",
              color: color.secondary2,
              backgroundColor: color.Success,
            }}
            onClick={fetchNews}
          >
            ค้นหาข้อมูล
          </Button>
        </div>
        <div className="pt-1 col">
          <Button
            onClick={()=>navigate("/AddNews")}
            style={{
              borderColor: color.Success,
              borderRadius: "5px",
              color: color.secondary2,
              backgroundColor: color.Success,
              paddingLeft : "50px",
              paddingRight : '50px'
            }}
          >
            + เพิ่มข่าวสาร
          </Button>
        </div>
        </div>
      </div>
    </>
  )

  const columns = [
    {
      title: () => {
        return (
          <div
            style={{ display: "flex", gap: 8, alignItems: "center" }}>
            วันที่เผยแพร่
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
              }}
              onClick={() => {
                setSortField("created_at")
                setSortDirection((prev) => {
                  if (prev === "ASC") {
                    return "DESC";
                  } else if (prev === undefined) {
                    return "ASC";
                  } else {
                    return undefined;
                  }
                });
              }}>
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
        );
      },
      dataIndex: "dateBroadcast",
      key: "dateBroadcast",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div className="container">
              <span className="text-dark-75  d-block font-size-lg">
                {DateTimeUtil.formatDateTime(row.created_at)}
              </span>
            </div>
          ),
        };
      },
    },
    {
      title: () => {
        return (
          <div
            style={{ display: "flex", gap: 8, alignItems: "center" }}>
            ชื่อข่าวสาร
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
              }}
              onClick={() => {
                setSortField("title")
                setSortDirection((prev) => {
                  if (prev === "ASC") {
                    return "DESC";
                  } else if (prev === undefined) {
                    return "ASC";
                  } else {
                    return undefined;
                  }
                });
              }}>
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
        );
      },
      dataIndex: "newsName",
      key: "newsName",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div className="container">
              <span className="text-dark-75  d-block font-size-lg">
                {row.title}
              </span>
            </div>
          ),
        };
      },
    },
    {
      title: () => {
        return (
          <div
            style={{ display: "flex", gap: 8, alignItems: "center" }}>
            อ่านแล้ว
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
              }}
              onClick={() => {
                setSortField("read")
                setSortDirection((prev) => {
                  if (prev === "ASC") {
                    return "DESC";
                  } else if (prev === undefined) {
                    return "ASC";
                  } else {
                    return undefined;
                  }
                });
              }}>
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
        );
      },
      dataIndex: "readCount",
      key: "readCount",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div className="container">
              <span className="text-dark-75  d-block font-size-lg">
                {row.read}
              </span>
            </div>
          ),
        };
      },
    },
    {
      title: "แอปพลิเคชั่น",
      dataIndex: "application",
      key: "application",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            row.application === "ALL"?
            <div className="container d-flex flex-column">
              <span
                style={{
                  color : '#000'
                }}
              >
                <Badge
                  color="#000"
                />{" "}
                {"Farmer App"}
              </span>
              <span
                style={{
                  color : '#000'
                }}
              >
                <Badge
                  color="#000"
                />{" "}
                {"Droner App"}
              </span>
            </div>:
            row.application === "FARMER"?
            <div className="container">
              <span
                style={{
                  color : '#000'
                }}
              >
                <Badge
                  color="#000"
                />{" "}
                {"Farmer App"}
              </span>
            </div>:
            <div className="container">
              <span
                style={{
                  color : '#000'
                }}
              >
                <Badge
                  color="#000"
                />{" "}
                {"Droner App"}
              </span>
            </div>
          ),
        };
      },
    },
    {
      title: "สถานะ",
      dataIndex: "newsStatus",
      key: "newsStatus",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div className="container">
              <span
                style={{
                  color:
                    row.status === "ACTIVE"
                      ? color.Success
                      : row.status === "INACTIVE"
                      ? color.Error
                      : color.Grey,
                }}
              >
                <Badge
                  color={
                    row.status === "ACTIVE"
                      ? color.Success
                      : row.status === "INACTIVE"
                      ? color.Error
                      : color.Grey
                  }
                />{" "}
                {STATUS_COUPON[row.status]}
              </span>
              <div className="d-flex">
                <span style={{ color: color.Grey }}>
                  <UserOutlined
                    style={{ padding: "0 4px 0 0", verticalAlign: 0.5 }}
                  />
                  {row.create_by ?? " - (Admin)"}
                </span>
              </div>
            </div>
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
            <div className="d-flex flex-row justify-content-between">
              <div className="pr-1">
                <ActionButton
                  icon={<EditOutlined />}
                  color={color.primary1}
                  onClick={() => {
                    window.location.href = "/EditNews/id=" + row.id;
                  }}
                />
              </div>
              <div className="pr-1">
                <ActionButton
                  icon={<DeleteOutlined />}
                  color={row.used > 0 ? color.Grey : color.Error}
                  onClick={() => {}}
                  actionDisable={row.used > 0 ? true : false}
                />
              </div>
            </div>
          ),
        };
      },
    },
  ]

  return (
    <Layouts>
      {PageTitle}
      <br />
      <Table
        columns={columns}
        dataSource={data.news}
        pagination={false}
        scroll={{ x: "max-content" }}
      />
      <div className="d-flex justify-content-between pt-5">
        <p>รายการทั้งหมด {data.count} รายการ</p>
        <Pagination
          current={current}
          total={data.count}
          onChange={onChangePage}
          pageSize={row}
          showSizeChanger={false}
        />
      </div>
    </Layouts>
  )
}

export default NewsPage