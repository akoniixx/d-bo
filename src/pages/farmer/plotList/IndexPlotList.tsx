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
  Table,
} from "antd";
import {
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
import { FarmerPlotEntity_INIT } from "../../../entities/FarmerPlotEntities";

function IndexPlotList() {
  const navigate = useNavigate();
  const [source, setSource] = useState<any>("รอตรวจสอบ");
  const [sumPlotCard, setSumPlotCard] = useState<any>({
    card1: "รอตรวจสอบ",
    card2: "ไม่อนุมัติ",
  });
  const [plant, setPlant] = useState<any>();
  const [searchText, setSearchText] = useState<any>();
  const [visibleStatus, setVisibleStatus] = useState(false);
  const [indeterminatePending, setIndeterminatePending] = useState(false);
  const [checkAllPending, setCheckAllPending] = useState(false);
  const [checkedListPending, setCheckedListPending] =
    useState<CheckboxValueType[]>();
  const [statusArr, setStatusArr] = useState<string[]>([]);
  const [status, setStatus] = useState<any>();
  const [plotsData, setPlotsData] = useState<any>();
  const statusListPend = ["02DAYS", "36DAYS", "7DAYS"];
  const [modalDelete, setModalDelete] = useState<boolean>(false);
  const [modalEdit, setModalEdit] = useState<boolean>(false);

  const [plotDelete, setPlotsDelete] = useState<any>();
  const [plotEdit, setPlotsEdit] = useState<any>();
  const [showModalMap, setShowModalMap] = useState<boolean>(false);
  const [plotId, setPlotId] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [row, setRow] = useState<number>(10);

  useEffect(() => {
    getPlants();
    getPlotsData();
  }, [currentPage, row]);
  const getPlotsData = async () => {
    await FarmerDatasource.getFarmerList(currentPage, row).then((res) => {
      setPlotsData(res);
    });
  };
  const getPlants = async () => {
    await CropDatasource.getCropJustName().then((res) => {
      setPlant(res);
    });
  };
  const onSearchText = (e: any) => {
    setSearchText(e.target.value);
  };
  const CheckStatus = (e: any) => {
    if (e.target.value === "รอตรวจสอบ") {
      setSumPlotCard({
        card1: "รอตรวจสอบ",
        card2: "ไม่อนุมัติ",
      });
    } else {
      setSumPlotCard({
        card1: "ใช้งาน",
        card2: "ปิดการใช้งาน",
      });
    }
    setSource(e.target.value);
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
    setCheckedListPending(e.target.checked ? statusListPend : []);
    setIndeterminatePending(false);
    setCheckAllPending(e.target.checked);
  };
  const onChangeListPending = (list: CheckboxValueType[]) => {
    setStatus(undefined);
    let arr: any = 0;
    arr = [...list];
    setCheckedListPending(list);
    setIndeterminatePending(
      !!list.length && list.length < statusListPend.length
    );
    setCheckAllPending(list.length === statusListPend.length);
  };
  const onSearchStatus = (e: any) => {
    if (e.target.checked) {
      setStatus(e.target.value);
    } else {
      setStatus(undefined);
    }
  };

  const SubStatus = (
    <Menu
      items={[
        source === "รอตรวจสอบ"
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
                    value={checkedListPending}
                    style={{ width: "100%" }}
                    onChange={onChangeListPending}
                  >
                    <Checkbox style={{ marginLeft: "20px" }} value="02DAYS">
                      0-2 วัน
                    </Checkbox>
                    <br />
                    <Checkbox style={{ marginLeft: "20px" }} value="36DAYS">
                      3-6 วัน
                    </Checkbox>
                    <br />
                    <Checkbox style={{ marginLeft: "20px" }} value="7DAYS">
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
              key: "1",
            },
        source === "รอตรวจสอบ"
          ? {
              label: (
                <>
                  <Checkbox onClick={onSearchStatus} value="REJECTED">
                    ไม่อนุมัติ
                  </Checkbox>
                </>
              ),
              key: "2",
            }
          : {
              label: (
                <>
                  <Checkbox onClick={onSearchStatus} value="INACTIVE">
                    ปิดการใช้งาน
                  </Checkbox>
                </>
              ),
              key: "2",
            },
      ]}
    />
  );
  const showEdit = (id: string) => {
    setPlotsEdit(id);
    setModalEdit(!modalEdit);
  };
  const showDelete = (id: string) => {
    setPlotsDelete(id);
    setModalDelete(!modalDelete);
  };
  const editPlots = (id: string) => {
    setModalEdit(!modalEdit);
  };
  const deletePlots = (id: string) => {
    setModalDelete(!modalDelete);
    // FarmerPlotDatasource.deleteFarmerPlot(id)
    //   .then((res) => {
    //     setModalDelete(!modalDelete);
    //     window.location.reload();
    //   })
    //   .catch((err) => console.log(err));
  };

  const columns = [
    {
      title: "วันที่อัพเดท",
      dataIndex: "date",
      key: "date",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <span>{moment(row.updatedAt).format("DD/MM/YYYY HH:mm")}</span>
          ),
        };
      },
    },
    {
      title: "ชื่อแปลงเกษตร",
      dataIndex: "plot",
      key: "plot",
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>แปลง 1 นาข้าว</span>,
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
              <span>{row.firstname + " " + row.lastname}</span>
              <br />
              <span style={{ color: color.Grey, fontSize: 12 }}>
                {row.farmerCode}
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
          children: <span>{row.telephoneNo}</span>,
        };
      },
    },
    {
      title: "พืชที่ปลูก",
      dataIndex: "plant",
      key: "plant",
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>นาข้าว</span>,
        };
      },
    },
    {
      title: "จำนวนไร่",
      dataIndex: "plotCount",
      key: "plotCount",
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>40</span>,
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
              <div
                onClick={() => handleModalMap(row.farmer_plot_id)}
                style={{ color: color.primary1, cursor: "pointer" }}
              >
                ดูแผนที่แปลง
              </div>
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
        return {
          children: (
            <>
              <span style={{ color: STATUS_COLOR_MAPPING[row.status] }}>
                <Badge color={STATUS_COLOR_MAPPING[row.status]} />{" "}
                {STATUS_FARMER_MAPPING[row.status]}
                <br />
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
                onClick={() => showEdit(row.id)}
              />
              <ActionButton
                icon={<DeleteOutlined />}
                color={color.Error}
                onClick={() => showDelete(row.id)}
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
            label1={source}
            label2={source}
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
        countPlot1={100}
        countPlot2={100}
      />
      <div className="row pt-3 pb-3">
        <div className="col-lg-6">
          <Input
            allowClear
            prefix={<SearchOutlined style={{ color: color.Disable }} />}
            placeholder="ค้นหาชื่อเกษตรกร/เบอร์โทร/ID เกษตรกร"
            className="col-lg-12"
            onChange={onSearchText}
          />
        </div>
        <div className="col-lg">
          <Select
            className="col-lg-12"
            placeholder="เลือกพืชที่ปลูก"
            allowClear
          >
            {plant?.map((i: any) => (
              <option key={i.id} value={i.cropName}>
                {i.cropName}
              </option>
            ))}
          </Select>
        </div>
        <div className="col-lg">
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
        <div className="col-lg-1" style={{textAlign: 'end'}}>
          <Button
            style={{
              borderColor: color.Success,
              borderRadius: "5px",
              color: color.secondary2,
              backgroundColor: color.Success,
            }}
            // onClick={onSearch}
          >
            ค้นหาข้อมูล
          </Button>
        </div>
      </div>
    
      <CardContainer>
        <Table
          dataSource={plotsData?.data}
          columns={columns}
          pagination={false}
        />
      </CardContainer>
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
        show={modalEdit}
        backButton={() => setModalEdit((prev) => !prev)}
        callBack={(e)=> console.log(e)}
        data={FarmerPlotEntity_INIT}
        editIndex={0}
        title="เพิ่มแปลงเกษตร"    
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
