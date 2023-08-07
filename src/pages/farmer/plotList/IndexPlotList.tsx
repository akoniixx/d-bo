import React, { useEffect, useState } from "react";
import StatusButton from "../../../components/button/StatusButton";
import { color } from "../../../resource";
import StatusPlots from "../../../components/card/StatusPlots";
import {
  Badge,
  Button,
  Checkbox,
  Dropdown,
  Input,
  Menu,
  Pagination,
  PaginationProps,
  Row,
  Select,
  Spin,
  Table,
} from "antd";
import {
  CaretDownOutlined,
  CaretUpOutlined,
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { CardContainer } from "../../../components/card/CardContainer";
import { CropDatasource } from "../../../datasource/CropDatasource";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import { FarmerDatasource } from "../../../datasource/FarmerDatasource";
import moment from "moment";
import {
  STATUS_COLOR_MAPPING,
  STATUS_FARMER_MAPPING,
} from "../../../definitions/Status";
import ActionButton from "../../../components/button/ActionButton";
import { useNavigate } from "react-router-dom";
import ModalDelete from "../../../components/modal/ModalDelete";
import ModalMapPlot from "../../../components/modal/task/newTask/ModalMapPlot";
import ModalFarmerPlot from "../../../components/modal/ModalFarmerPlot";
import {
  FarmerPlotEntity,
  FarmerPlotEntity_INIT,
  SumPlotEntity,
} from "../../../entities/FarmerPlotEntities";
import { FarmerPlotDatasource } from "../../../datasource/FarmerPlotDatasource";
import { numberWithCommas } from "../../../utilities/TextFormatter";
import { Option } from "antd/lib/mentions";

const _ = require("lodash");
const { Map } = require("immutable");
function IndexPlotList() {
  const [mainStatus, setMainStatus] = useState<any>("PENDING");
  const [sumPlotCard, setSumPlotCard] = useState<any>({
    card1: "รอตรวจสอบ",
    card2: "ไม่อนุมัติ",
  });
  const [cropName, setCropName] = useState<any[]>([]);
  const [visibleStatus, setVisibleStatus] = useState(false);
  const [indeterminatePending, setIndeterminatePending] = useState(false);
  const [checkAllPending, setCheckAllPending] = useState(false);
  const [statusArr, setStatusArr] = useState<string[]>([]);
  const [statusArrMain, setStatusArrMain] = useState<string[]>([]);
  const [status, setStatus] = useState<any>();
  const [plotsData, setPlotsData] = useState<SumPlotEntity>();
  const statusListPend = ["FIRST", "SECOND", "THIRD"];
  const [modalDelete, setModalDelete] = useState<boolean>(false);
  const [modalEdit, setModalEdit] = useState<boolean>(false);
  const [plantName, setPlantName] = useState<any>();
  const [waitPendingDate, setWaitPendingDate] = useState<any>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortField, setSortField] = useState<any>();
  const [searchText, setSearchText] = useState<any>();
  const [row, setRow] = useState(10);
  const [plotDelete, setPlotsDelete] = useState<any>();
  const [showModalMap, setShowModalMap] = useState<boolean>(false);
  const [plotId, setPlotId] = useState<string>("");
  const [summary, setSummary] = useState<any>();
  const [editFarmerPlot, setEditFarmerPlot] = useState<FarmerPlotEntity>(
    FarmerPlotEntity_INIT
  );
  const [loading, setLoading] = useState(false);
  const [farmerId, setFarmerId] = useState<any>();
  const [farmerPlotId, setFarmerPlotId] = useState<string>("");
  const [editIndex, setEditIndex] = useState(0);
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
  useEffect(() => {
    getPlotsData();
  }, [currentPage, mainStatus, row, sortDirection]);
  const getPlotsData = async () => {
    setLoading(true);
    await FarmerPlotDatasource.getFarmerPlotAll(
      mainStatus,
      plantName,
      status,
      waitPendingDate,
      currentPage,
      row,
      sortField,
      sortDirection,
      searchText
    )
      .then((res) => {
        setPlotsData(res);
        setSummary(res.summary[0]);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const getCropJustName = () => {
      CropDatasource.getCropJustName().then((res) => {
        setCropName(res);
      });
    };
    getCropJustName();
  }, []);

  const onSearchText = (e: any) => {
    setSearchText(e.target.value);
    setCurrentPage(1);
  };

  const searchPlants = (e: any) => {
    setPlantName(e);
    setCurrentPage(1);
  };

  const CheckStatus = (e: any) => {
    if (e.target.value === "PENDING") {
      setStatus(undefined);
      setWaitPendingDate(undefined);
      setSumPlotCard({
        card1: "รอตรวจสอบ",
        card2: "ไม่อนุมัติ",
      });
    } else {
      setStatus(undefined);
      setWaitPendingDate(undefined);
      setSumPlotCard({
        card1: "ใช้งาน",
        card2: "ปิดการใช้งาน",
      });
    }
    setMainStatus(e.target.value);
  };

  const handleVisibleStatus = (newVisible: any) => {
    setVisibleStatus(newVisible);
  };
  const handleModalMap = (plotId: string) => {
    setShowModalMap((prev) => !prev);
    setPlotId(plotId);
  };
  const onShowSizeChange: PaginationProps["onShowSizeChange"] = (
    current,
    pageSize
  ) => {
    setCurrentPage(current);
    setRow(pageSize);
  };

  const onChangePage = (page: number) => {
    setCurrentPage(page);
  };
  const onCheckAllPending = (e: any) => {
    let value = e.target.value;
    let checked = e.target.checked;
    let arr: any = 0;
    if (checked === true) {
      arr = [...statusArr, value];
      setStatusArr([...statusArr, value]);
      setStatus(value);
    } else {
      let d: string[] = statusArr.filter((x) => x != value);
      arr = [...d];
      setStatusArr(d);
      if (d.length == 0) {
        arr = undefined;
      }
    }
    setStatus(arr);
    setWaitPendingDate(e.target.checked ? statusListPend : []);
    setIndeterminatePending(false);
    setCheckAllPending(e.target.checked);
  };
  const onChangeListPending = (list: CheckboxValueType[]) => {
    setStatus([]);
    let arr: any = 0;
    arr = [...list];
    setWaitPendingDate(list);
    setIndeterminatePending(
      !!list.length && list.length < statusListPend.length
    );
    setCheckAllPending(list.length === statusListPend.length);
  };
  const onSearchStatus = (e: any) => {
    let value = e.target.value;
    let checked = e.target.checked;
    let arr: any = 0;
    if (checked === true) {
      arr = [...statusArrMain, value];
      setStatusArrMain([...statusArrMain, value]);
      setStatus(value);
    } else {
      let d: string[] = statusArrMain.filter((x) => x != value);
      arr = [...d];
      setStatusArrMain(d);
      if (d.length == 0) {
        arr = undefined;
      }
    }
    setStatus(arr);
  };

  const SubStatus = (
    <Menu
      items={[
        mainStatus === "PENDING"
          ? {
              label: (
                <>
                  <Checkbox
                    indeterminate={indeterminatePending}
                    onChange={onCheckAllPending}
                    checked={checkAllPending}
                    value="PENDING"
                  >
                    รอตรวจสอบ
                  </Checkbox>
                  <br />
                  <Checkbox.Group
                    value={waitPendingDate}
                    style={{ width: "100%" }}
                    onChange={onChangeListPending}
                  >
                    <Checkbox style={{ marginLeft: "20px" }} value="FIRST">
                      0-2 วัน
                    </Checkbox>
                    <br />
                    <Checkbox style={{ marginLeft: "20px" }} value="SECOND">
                      3-6 วัน
                    </Checkbox>
                    <br />
                    <Checkbox style={{ marginLeft: "20px" }} value="THIRD">
                      7 วันขึ้นไป
                    </Checkbox>
                  </Checkbox.Group>
                </>
              ),
              key: "1",
            }
          : {
              label: (
                <>
                  <Checkbox onClick={onSearchStatus} value="ACTIVE">
                    ใช้งาน
                  </Checkbox>
                </>
              ),
              key: "2",
            },
        mainStatus === "PENDING"
          ? {
              label: (
                <>
                  <Checkbox onClick={onSearchStatus} value="REJECTED">
                    ไม่อนุมัติ
                  </Checkbox>
                </>
              ),
              key: "3",
            }
          : {
              label: (
                <>
                  <Checkbox onClick={onSearchStatus} value="INACTIVE">
                    ปิดการใช้งาน
                  </Checkbox>
                </>
              ),
              key: "4",
            },
      ]}
    />
  );
  const showEdit = (item: FarmerPlotEntity, index: any) => {
    setEditFarmerPlot(item);
    setEditIndex(index);
    setModalEdit(!modalEdit);
  };
  const showDelete = (id: string) => {
    setPlotsDelete(id);
    setModalDelete(!modalDelete);
  };

  const deletePlots = async (data: FarmerPlotEntity) => {
    setModalDelete(!modalDelete);
    await FarmerPlotDatasource.deleteFarmerPlot(data.id);
    getPlotsData();
  };

  const updateFarmerPlot = async (plot: FarmerPlotEntity) => {
    const setId = Map(plot).set("id", farmerPlotId);
    const payload = {
      ...setId.toJS(),
      farmerId,
    };
    if (payload.id) {
      await FarmerPlotDatasource.updateFarmerPlot(payload);
      setModalEdit((prev) => !prev);
    }
    getPlotsData();
  };

  const columns = [
    {
      title: () => {
        return (
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            วันที่อัพเดต
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
              }}
              onClick={() => {
                setSortField("updatedAt");
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
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <span>{moment(row.updatedAt).format("DD/MM/YYYY HH:mm")}</span>
          ),
        };
      },
    },
    {
      title: () => {
        return (
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            ชื่อแปลงเกษตร
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
              }}
              onClick={() => {
                setSortField("plotName");
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
      dataIndex: "plot",
      key: "plot",
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{row.plotName ? row.plotName : "-"}</span>,
        };
      },
    },
    {
      title: () => {
        return (
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            ชื่อเกษตรกร
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
              }}
              onClick={() => {
                setSortField("firstname");
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
      dataIndex: "farmer",
      key: "farmer",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span>{row.farmer.firstname + " " + row.farmer.lastname}</span>
              <br />
              <span style={{ color: color.Grey, fontSize: 12 }}>
                {row.farmer.farmerCode}
              </span>
            </>
          ),
        };
      },
    },
    {
      title: "เบอร์โทร",
      dataIndex: "tel",
      key: "tel",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <span>{row.farmer.telephoneNo ? row.farmer.telephoneNo : "-"}</span>
          ),
        };
      },
    },
    {
      title: () => {
        return (
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            พืชที่ปลูก
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
              }}
              onClick={() => {
                setSortField("plantName");
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
      dataIndex: "plantName",
      key: "plantName",
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{row.plantName ? row.plantName : "-"}</span>,
        };
      },
    },
    {
      title: () => {
        return (
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            จำนวนไร่
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
              }}
              onClick={() => {
                setSortField("raiAmount");
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
      dataIndex: "plotCount",
      key: "plotCount",
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{numberWithCommas(row.raiAmount) + " ไร่"}</span>,
        };
      },
    },
    {
      title: "แผนที่แปลงเกษตร",
      dataIndex: "plotArea",
      key: "plotArea",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span
                onClick={() => handleModalMap(row.id)}
                style={{
                  color: color.primary1,
                  cursor: "pointer",
                  textDecorationLine: "underline",
                }}
              >
                ดูแผนที่แปลง
              </span>
            </>
          ),
        };
      },
    },
    {
      title: "สถานะ",
      dataIndex: "status",
      key: "status",
      render: (value: any, row: any, index: number) => {
        const countDay = () => {
          if (row.dateWaitPending != null) {
            const nowDate = new Date(Date.now());
            const rowDate = new Date(row.dateWaitPending);
            const diffTime = nowDate.getTime() - rowDate.getTime();
            let diffDay = Math.floor(diffTime / (1000 * 3600 * 24));
            diffDay = diffDay == 0 ? 1 : diffDay;
            return diffDay;
          }
        };
        return {
          children: (
            <>
              <span style={{ color: STATUS_COLOR_MAPPING[row.status] }}>
                <Badge color={STATUS_COLOR_MAPPING[row.status]} />{" "}
                {STATUS_FARMER_MAPPING[row.status]}
                <br />
              </span>
              <span style={{ color: color.Grey }}>
                {row.status === "PENDING" && row.dateWaitPending != null
                  ? ` (รอไปแล้ว ${countDay()} วัน)`
                  : null}
              </span>
            </>
          ),
        };
      },
    },
    {
      title: "",
      dataIndex: "Action",
      key: "Action",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <Row justify={"space-between"}>
              <ActionButton
                icon={<EditOutlined />}
                color={color.primary1}
                onClick={() => {
                  showEdit(row, index);
                  setFarmerId(row.farmer.id);
                  setFarmerPlotId(row.id);
                }}
              />
              <ActionButton
                icon={<DeleteOutlined />}
                color={color.Error}
                onClick={() => showDelete(row)}
              />
            </Row>
          ),
        };
      },
    },
  ];
  return (
    <>
      <div className="row" style={{ padding: "10px" }}>
        <div className="col-lg-5">
          <span
            className="card-label font-weight-bolder text-dark"
            style={{
              fontSize: 22,
              fontWeight: "bold",
              padding: "8px",
            }}
          >
            <strong>รายการแปลงเกษตรกร (Farmer)</strong>
          </span>
        </div>
        <div className="col-lg pt-1">
          <StatusButton
            label1={mainStatus}
            label2={mainStatus}
            onClick={(e: any) => CheckStatus(e)}
          />
        </div>
      </div>
      <StatusPlots
        title1={sumPlotCard?.card1}
        title2={sumPlotCard?.card2}
        bgColor1={
          sumPlotCard?.card1 === "รอตรวจสอบ" ? color.Warning : color.Success
        }
        bgColor2={
          sumPlotCard?.card2 === "ไม่อนุมัติ" ? color.Grey : color.Error
        }
        countPlot1={
          mainStatus === "PENDING"
            ? numberWithCommas(summary?.count_pending) + " แปลง"
            : numberWithCommas(summary?.count_active) + " แปลง"
        }
        countPlot2={
          mainStatus === "ACTIVE"
            ? numberWithCommas(summary?.count_inactive) + " แปลง"
            : numberWithCommas(summary?.count_reject) + " แปลง"
        }
      />
      <div className="d-flex justify-content-between pt-3 pb-3">
        <div className="col-lg-6 p-1">
          <Input
            allowClear
            prefix={<SearchOutlined style={{ color: color.Disable }} />}
            placeholder="ค้นหาชื่อเกษตรกร/เบอร์โทร/ID เกษตรกร"
            className="col-lg-12"
            onChange={onSearchText}
          />
        </div>
        <div className="col-lg p-1">
          <Select
            className="col-lg-12"
            allowClear
            showSearch
            placeholder="เลือกพืชที่ปลูก"
            optionFilterProp="children"
            filterSort={(optionA, optionB) =>
              optionA.children
                .toLowerCase()
                .localeCompare(optionB.children.toLowerCase())
            }
            filterOption={(input: any, option: any) =>
              option.children.includes(input)
            }
            onChange={(e) => searchPlants(e)}
          >
            {cropName.map((item) => (
              <Option key={item.id} value={item.cropName}>
                {item.cropName}
              </Option>
            ))}
          </Select>
        </div>
        <div className="col-lg p-1">
          <Dropdown
            overlay={SubStatus}
            trigger={["click"]}
            className="col-lg-12"
            onVisibleChange={handleVisibleStatus}
            visible={visibleStatus}
          >
            <Button style={{ color: color.Disable }}>
              เลือกสถานะ
              <DownOutlined />
            </Button>
          </Dropdown>
        </div>
        <div className="col-lg-1 p-1" style={{ textAlign: "end" }}>
          <Button
            className="col-lg-12"
            style={{
              borderColor: color.Success,
              borderRadius: "5px",
              color: color.secondary2,
              backgroundColor: color.Success,
            }}
            onClick={getPlotsData}
          >
            ค้นหาข้อมูล
          </Button>
        </div>
      </div>
      <Spin tip="กำลังโหลดข้อมูล..." size="large" spinning={loading}>
        <CardContainer>
          <Table
            dataSource={plotsData?.data}
            columns={columns}
            pagination={false}
            scroll={{ x: "max-content" }}
            rowClassName={(a) =>
              a.status === "PENDING" &&
              a.dateWaitPending != null &&
              moment(Date.now()).diff(
                moment(new Date(a.dateWaitPending)),
                "day"
              ) >= 3
                ? "PENDING" &&
                  moment(Date.now()).diff(
                    moment(new Date(a.dateWaitPending)),
                    "day"
                  ) >= 7
                  ? "table-row-older"
                  : "table-row-old"
                : "table-row-lasted"
            }
          />
        </CardContainer>
      </Spin>

      <div className="d-flex justify-content-between pt-4 pb-3">
        <p>รายการทั้งหมด {plotsData?.count} รายการ</p>
        <Pagination
          current={currentPage}
          showSizeChanger
          onChange={onChangePage}
          onShowSizeChange={onShowSizeChange}
          total={plotsData?.count}
        />
      </div>

      <ModalFarmerPlot
        isEditModal
        show={modalEdit}
        backButton={() => setModalEdit((prev) => !prev)}
        callBack={updateFarmerPlot}
        data={editFarmerPlot}
        editIndex={editIndex}
        title="แก้ไขแปลงเกษตร"
        callBackModal={(val) => setModalEdit(!val)}
      />
      <ModalDelete
        show={modalDelete}
        title1="โปรดตรวจสอบแปลงเกษตรที่คุณต้องการลบ"
        title2="ก่อนที่จะกดยืนยันการลบ เพราะอาจส่งผลต่อการจ้างงานในแอปพลิเคชัน"
        backButton={() => setModalDelete(!modalDelete)}
        callBack={() => deletePlots(plotDelete)}
      />

      {showModalMap && (
        <ModalMapPlot
          show={showModalMap}
          backButton={() => setShowModalMap((prev) => !prev)}
          title="แผนที่แปลงเกษตร"
          plotId={plotId}
        />
      )}
    </>
  );
}

export default IndexPlotList;
