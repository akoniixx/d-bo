import React, { useEffect, useState } from "react";
import Search from "antd/lib/input/Search";
import Select from "antd/lib/select";
import { Option } from "antd/lib/mentions";
import { Badge, Button, Pagination, Table, Tooltip } from "antd";
import { color } from "../../resource";
import ActionButton from "../../components/button/ActionButton";
import {
  CaretDownOutlined,
  CaretUpOutlined,
  DeleteOutlined,
  EditOutlined,
  InfoCircleFilled,
  UserOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { NewsDatasource } from "../../datasource/NewsDatasource";
import { DateTimeUtil } from "../../utilities/DateTimeUtil";
import { STATUS_COUPON } from "../../definitions/Status";
import ModalDeleteNews from "../../components/modal/ModalDeleteNews";
import { DashboardLayout } from "../../components/layout/Layout";

function NewsPage() {
  const navigate = useNavigate();
  const row = 10;
  const [newsDelete, setNewsDelete] = useState<any>({
    newsId: "",
    newsPath: "",
  });
  const [status, setStatus] = useState<string | undefined>(undefined);
  const [application, setApplication] = useState<string | undefined>(undefined);
  const [sortDirection, setSortDirection] = useState<string | undefined>(
    undefined
  );
  const [sortDirection1, setSortDirection1] = useState<string | undefined>(
    undefined
  );
  const [sortDirection2, setSortDirection2] = useState<string | undefined>(
    undefined
  );
  const [sortDirection3, setSortDirection3] = useState<string | undefined>(
    undefined
  );
  const [sortDirection4, setSortDirection4] = useState<string | undefined>(
    undefined
  );
  const [sortDirection5, setSortDirection5] = useState<string | undefined>(
    undefined
  );
  const [showModalHis, setShowModalHis] = useState<boolean>(false);

  const [sortField, setSortField] = useState<string | undefined>(undefined);
  const [modalDelete, setModalDelete] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [current, setCurrent] = useState(1);
  const [data, setData] = useState<any>({
    count: 0,
    news: [],
  });
  const fetchNews = () => {
    NewsDatasource.getNews(
      row,
      current,
      application,
      status,
      sortField,
      sortDirection,
      search
    ).then((res) => {
      setData({
        count: res.count,
        news: res.data,
      });
    });
  };
  const onChangeSearch = (e: any) => {
    setSearch(e.target.value);
  };

  const onChangeStatus = (status: string) => {
    setStatus(status);
  };

  const onChangeApplication = (application: string) => {
    setApplication(application);
  };

  const onChangePage = (page: number) => {
    setCurrent(page);
  };

  const deleteNews = (id: string, path: string) => {
    console.log(id, path);
    NewsDatasource.deleteNews(id, path)
      .then((res) => {
        setModalDelete(!modalDelete);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const showDelete = (id: string, path: string) => {
    setNewsDelete({
      newsId: id,
      newsPath: path,
    });
    setModalDelete(!modalDelete);
  };
  const handleModalHistory = (taskId: string) => {
    setShowModalHis((prev) => !prev);
  };
  useEffect(() => {
    fetchNews();
  }, [current, sortDirection]);
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
              onClick={() => {
                setCurrent(1);
                if (current === 1) {
                  fetchNews();
                }
              }}
            >
              ค้นหาข้อมูล
            </Button>
          </div>
          <div className="pt-1 col">
            <Button
              onClick={() => navigate("/AddNews")}
              style={{
                borderColor: color.Success,
                borderRadius: "5px",
                color: color.secondary2,
                backgroundColor: color.Success,
                paddingLeft: "50px",
                paddingRight: "50px",
              }}
            >
              + เพิ่มข่าวสาร
            </Button>
          </div>
        </div>
      </div>
    </>
  );

  const columns = [
    {
      title: () => {
        return (
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            วันที่เผยแพร่
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
              }}
              onClick={() => {
                setSortField("created_at");
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
                  color: sortDirection1 === "ASC" ? "#ffca37" : "white",
                }}
              />
              <CaretDownOutlined
                style={{
                  position: "relative",
                  bottom: 2,
                  color: sortDirection1 === "DESC" ? "#ffca37" : "white",
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
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            ชื่อข่าวสาร
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
              }}
              onClick={() => {
                setSortField("title");
                setSortDirection((prev) => {
                  if (prev === "ASC") {
                    return "DESC";
                  } else if (prev === undefined) {
                    return "ASC";
                  } else {
                    return undefined;
                  }
                });
                setSortDirection2((prev) => {
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
                  color: sortDirection2 === "ASC" ? "#ffca37" : "white",
                }}
              />
              <CaretDownOutlined
                style={{
                  position: "relative",
                  bottom: 2,
                  color: sortDirection2 === "DESC" ? "#ffca37" : "white",
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
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            อ่านแล้ว
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
              }}
              onClick={() => {
                setSortField("read");
                setSortDirection((prev) => {
                  if (prev === "ASC") {
                    return "DESC";
                  } else if (prev === undefined) {
                    return "ASC";
                  } else {
                    return undefined;
                  }
                });
                setSortDirection3((prev) => {
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
                  color: sortDirection3 === "ASC" ? "#ffca37" : "white",
                }}
              />
              <CaretDownOutlined
                style={{
                  position: "relative",
                  bottom: 2,
                  color: sortDirection3 === "DESC" ? "#ffca37" : "white",
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
          children:
            row.application === "ALL" ? (
              <div className="container d-flex flex-column">
                <span
                  style={{
                    color: "#000",
                  }}
                >
                  <Badge color="#000" /> {"Farmer App"}
                </span>
                <span
                  style={{
                    color: "#000",
                  }}
                >
                  <Badge color="#000" /> {"Droner App"}
                </span>
              </div>
            ) : row.application === "FARMER" ? (
              <div className="container">
                <span
                  style={{
                    color: "#000",
                  }}
                >
                  <Badge color="#000" /> {"Farmer App"}
                </span>
              </div>
            ) : (
              <div className="container">
                <span
                  style={{
                    color: "#000",
                  }}
                >
                  <Badge color="#000" /> {"Droner App"}
                </span>
              </div>
            ),
        };
      },
    },
    {
      title: () => {
        return (
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            หมวดหมู่
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
              }}
              onClick={() => {
                setSortField("category_news");
                setSortDirection((prev) => {
                  if (prev === "ASC") {
                    return "DESC";
                  } else if (prev === undefined) {
                    return "ASC";
                  } else {
                    return undefined;
                  }
                });
                setSortDirection5((prev) => {
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
                  color: sortDirection5 === "ASC" ? "#ffca37" : "white",
                }}
              />
              <CaretDownOutlined
                style={{
                  position: "relative",
                  bottom: 2,
                  color: sortDirection5 === "DESC" ? "#ffca37" : "white",
                }}
              />
            </div>
          </div>
        );
      },
      dataIndex: "category_news",
      key: "category_news",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div className="row">
              {row.category_news === "ALL" ? (
                <div className="container d-flex flex-column">
                  <span
                    style={{
                      color: "#000",
                    }}
                  >
                    {"ข่าวสาร, ชาเลนจ์"}
                    <Tooltip title={`ชื่อชาเลนจ์ : ${row.campaign_name}`}>
                      <InfoCircleFilled
                        style={{
                          color: color.Success,
                          fontSize: "15px",
                          marginLeft: "7px",
                          verticalAlign: 0.5,
                        }}
                      />
                    </Tooltip>
                  </span>
                </div>
              ) : row.category_news === "NEWS" ? (
                <div className="container">
                  <span
                    style={{
                      color: "#000",
                    }}
                  >
                    {"ข่าวสาร"}
                  </span>
                </div>
              ) : (
                <div className="container">
                  <span
                    style={{
                      color: "#000",
                    }}
                  >
                    {"ชาเลนจ์"}
                  </span>
                  <Tooltip title={`ชื่อชาเลนจ์ : ${row.campaign_name}`}>
                    <InfoCircleFilled
                      style={{
                        color: color.Success,
                        fontSize: "15px",
                        marginLeft: "7px",
                        verticalAlign: 0.5,
                      }}
                    />
                  </Tooltip>
                </div>
              )}
            </div>
          ),
        };
      },
    },
    {
      title: () => {
        return (
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            คิวที่รอแจ้งเตือน
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
              }}
              onClick={() => {
                setSortField("count_queue");
                setSortDirection((prev) => {
                  if (prev === "ASC") {
                    return "DESC";
                  } else if (prev === undefined) {
                    return "ASC";
                  } else {
                    return undefined;
                  }
                });
                setSortDirection4((prev) => {
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
                  color: sortDirection4 === "ASC" ? "#ffca37" : "white",
                }}
              />
              <CaretDownOutlined
                style={{
                  position: "relative",
                  bottom: 2,
                  color: sortDirection4 === "DESC" ? "#ffca37" : "white",
                }}
              />
            </div>
          </div>
        );
      },
      dataIndex: "count_queue",
      key: "count_queue",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div className="container">
              <span>จำนวน {row.count_queue} คิว</span>
              <br />
              <u
                style={{
                  color: color.Success,
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
                onClick={() => handleModalHistory(row)}
              >
                ดูประวัติแจ้งเตือน
              </u>
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
                    navigate("/EditNews/id=" + row.id);
                  }}
                />
              </div>
              <div className="pr-1">
                <ActionButton
                  icon={<DeleteOutlined />}
                  color={row.used > 0 ? color.Grey : color.Error}
                  onClick={() =>
                    showDelete(
                      row.id,
                      row.image_path
                        .split(
                          "https://storage.googleapis.com/dnds/news-image/"
                        )[1]
                        .split("?")[0]
                    )
                  }
                  actionDisable={row.used > 0 ? true : false}
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
      <ModalDeleteNews
        show={modalDelete}
        backButton={() => setModalDelete(!modalDelete)}
        callBack={() => deleteNews(newsDelete.newsId, newsDelete.newsPath)}
      />
      {PageTitle}
      <br />
      <Table
        columns={columns}
        dataSource={data.news}
        pagination={false}
        scroll={{ x: "max-content" }}
      />
      <div className="d-flex justify-content-between pt-3 pb-3">
        <p>รายการทั้งหมด {data.count} รายการ</p>
        <Pagination
          current={current}
          total={data.count}
          onChange={onChangePage}
          pageSize={row}
          showSizeChanger={false}
        />
      </div>
    </>
  );
}

export default NewsPage;
