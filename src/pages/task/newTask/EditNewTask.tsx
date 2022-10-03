import {
  CheckCircleFilled,
  DownOutlined,
  EditFilled,
  SearchOutlined,
  StarFilled,
  TeamOutlined,
} from "@ant-design/icons";
import {
  AutoComplete,
  Avatar,
  Badge,
  Button,
  Checkbox,
  DatePicker,
  Dropdown,
  Form,
  Input,
  InputNumber,
  Menu,
  Popover,
  Radio,
  Row,
  Select,
  Slider,
  Space,
  Steps,
  Table,
  TimePicker,
  Tooltip,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import { RowSelectionType } from "antd/lib/table/interface";
import moment, { utc } from "moment";
import React, { useEffect, useState } from "react";
import Search from "antd/lib/input/Search";
import {
  BackButton,
  BackIconButton,
} from "../../../components/button/BackButton";
import SaveButton from "../../../components/button/SaveButton";
import { CardContainer } from "../../../components/card/CardContainer";
import { CardHeader } from "../../../components/header/CardHearder";
import Layouts from "../../../components/layout/Layout";
import GooleMap from "../../../components/map/GoogleMap";
import { CropDatasource } from "../../../datasource/CropDatasource";
import { TaskDatasource } from "../../../datasource/TaskDatasource";
import { TaskSearchDronerDatasource } from "../../../datasource/TaskSearchDronerDatasource";
import { LAT_LNG_BANGKOK } from "../../../definitions/Location";
import {
  PURPOSE_SPRAY,
  PURPOSE_SPRAY_CHECKBOX,
} from "../../../definitions/PurposeSpray";
import {
  CropPurposeSprayEntity,
  CropPurposeSprayEntity_INT,
} from "../../../entities/CropEntities";
import {
  FarmerEntity,
  FarmerEntity_INIT,
  GetFarmerEntity,
  GetFarmerEntity_INIT,
} from "../../../entities/FarmerEntities";
import {
  FarmerPlotEntity,
  FarmerPlotEntity_INIT,
} from "../../../entities/FarmerPlotEntities";
import {
  GetNewTaskEntity,
  GetNewTaskEntity_INIT,
  UpdateNewTask,
  UpdateNewTask_INIT,
} from "../../../entities/NewTaskEntities";
import {
  TaskSearchDroner,
  TaskSearchDroner_INIT,
} from "../../../entities/TaskSearchDroner";
import { color } from "../../../resource";
import {
  CreateDronerTempEntity,
  CreateDronerTempEntity_INIT,
  DeletedDronerTemp,
  DeletedDronerTemp_INIT,
  TaskDronerTempEntity,
  TaskDronerTempEntity_INIT,
} from "../../../entities/TaskDronerTemp";
import ModalSelectedEditDroner from "../../../components/modal/task/newTask/ModalSelectedEditDroner";
import { numberWithCommas } from "../../../utilities/TextFormatter";
import { TaskDronerTempDataSource } from "../../../datasource/TaskDronerTempDatasource";
import Swal from "sweetalert2";
import icon from "../../../resource/icon";
const dateFormat = "DD/MM/YYYY";
const dateCreateFormat = "YYYY-MM-DD";
const timeFormat = "HH:mm";
const timeCreateFormat = "HH:mm:ss";

const { Option } = Select;
const { Step } = Steps;

const _ = require("lodash");
const { Map } = require("immutable");
let queryString = _.split(window.location.pathname, "=");

const EditNewTask = () => {
  const profile = JSON.parse(localStorage.getItem("profile") || "{  }");
  const [current, setCurrent] = useState(0);
  const [data, setData] = useState<GetNewTaskEntity>(GetNewTaskEntity_INIT);
  const [dataFarmer, setDataFarmer] = useState<FarmerEntity>(FarmerEntity_INIT);
  const [farmerList, setFarmerList] = useState<FarmerEntity[]>([
    FarmerEntity_INIT,
  ]);
  const [farmerSelected, setFarmerSelected] =
    useState<FarmerEntity>(FarmerEntity_INIT);
  const [farmerPlotSeleced, setFarmerPlotSelected] =
    useState<FarmerPlotEntity>();
  const [searchFarmer, setSearchFarmer] = useState<string>();
  const [checkSelectPlot, setCheckSelectPlot] = useState<any>("");
  const [dronerSelected, setDronerSelected] = useState<TaskSearchDroner[]>([
    TaskSearchDroner_INIT,
  ]);
  const [checkCrop, setCheckCrop] = useState<boolean>(true);
  let [otherSpray, setOtherSpray] = useState<any>();
  const [validateComma, setValidateComma] = useState<{
    status: any;
    message: string;
  }>({
    status: "",
    message: "",
  });

  const [dateAppointment, setDateAppointment] = useState<any>(
    moment(undefined)
  );
  const [timeAppointment, setTimeAppointment] = useState<any>(
    moment(undefined)
  );
  const [searchTextDroner, setSearchTextDroner] = useState<string>("");

  const [periodSpray, setPeriodSpray] = useState<CropPurposeSprayEntity>();
  const [selectionType] = useState<RowSelectionType>("checkbox");

  const [dataDronerList, setDataDronerList] = useState<TaskSearchDroner[]>([
    TaskSearchDroner_INIT,
  ]);
  const [dronerSelectedList, setDronerSelectedList] = useState<
    TaskDronerTempEntity[]
  >([TaskDronerTempEntity_INIT]);

  const [showModalSelectedDroner, setShowModalSelectedDroner] =
    useState<boolean>(false);
  const [disableBtn, setDisableBtn] = useState<boolean>(false);

  const fetchNewTask = async () => {
    await TaskDatasource.getNewTaskById(queryString[1]).then((res) => {
      delete res["updatedAt"];
      res.farmer.farmerPlot = [res.farmerPlot];
      res?.taskDronerTemp?.map((item) => _.set(item, "isChecked", true));
      res.taskDronerTemp && setDronerSelectedList(res?.taskDronerTemp);
      setDateAppointment(new Date(res.dateAppointment).toUTCString());
      setTimeAppointment(new Date(res.dateAppointment).getTime());
      setDataFarmer(res.farmer);
      setFarmerSelected(res.farmer);
      setFarmerPlotSelected(res.farmerPlot);
      fetchPurposeSpray(res.farmerPlot.plantName);
      setData(res);
    });
  };
  const fetchFarmerList = async (text?: string) => {
    await TaskDatasource.getFarmerList(text).then((res) => {
      setFarmerList(res);
    });
  };
  const fetchPurposeSpray = async (crop: string) => {
    await CropDatasource.getPurposeByCroupName(crop).then((res) => {
      setPeriodSpray(res);
    });
  };
  useEffect(() => {
    fetchNewTask();
    fetchFarmerList(searchFarmer);
  }, [searchFarmer]);

  //#region step 1
  const handleSearchFarmer = (value: any, id: any) => {
    if (value != undefined) {
      setFarmerSelected(farmerList?.filter((x) => x.id == id.id)[0]);
    } else {
      setFarmerSelected(FarmerEntity_INIT);
    }
  };
  const onSelectFarmer = (e: any, id: any) => {
    setFarmerSelected(FarmerEntity_INIT);
    const findFarmer = farmerList?.filter((x) => x.id == id.id)[0];
    setFarmerSelected(findFarmer);
  };
  const handleSelectFarmer = () => {
    let newData: GetNewTaskEntity = GetNewTaskEntity_INIT;
    newData.id = data.id;
    newData.taskNo = data.taskNo;
    newData.farmerId = farmerSelected?.id;
    newData.farmerPlotId = "";
    newData.farmAreaAmount = "";
    newData.dronerId = "";
    newData.purposeSprayId = "";
    newData.dateAppointment = moment(new Date()).format(dateFormat);
    newData.targetSpray = [];
    newData.taskDronerTemp = [];
    newData.preparationBy = "";
    newData.createdAt = data.createdAt;
    newData.distance = data.distance;
    newData.status = data.status;
    newData.statusRemark = data.statusRemark;
    newData.reviewDronerAvg = "";
    newData.reviewDronerDetail = "";
    newData.unitPriceStandard = "";
    newData.priceStandard = "";
    newData.unitPrice = "0";
    newData.price = "0";
    newData.totalPrice = "";
    newData.fee = "";
    newData.discountFee = "";
    newData.reviewFarmerScore = "";
    newData.reviewFarmerComment = "";
    newData.imagePathFinishTask = "";
    newData.comment = "";
    newData.farmer = farmerSelected;
    newData.isProblem = false;
    newData.problemRemark = "";
    newData.dateRemark = "";
    newData.dateDelay = "";
    newData.statusDelay = "";
    newData.delayRejectRemark = "";
    newData.purposeSpray = CropPurposeSprayEntity_INT;
    newData.droner = "";
    newData.farmerPlot = FarmerPlotEntity_INIT;
    setData(newData);
    setCheckSelectPlot("error");
    setDronerSelected([]);
    setDataFarmer(farmerSelected);
    setDateAppointment(moment(undefined));
    setTimeAppointment(moment(undefined));
  };
  const handleSelectFarmerPlot = (value: any) => {
    PURPOSE_SPRAY_CHECKBOX.map((item) => _.set(item, "isChecked", false));
    let plotSelected = farmerSelected?.farmerPlot.filter(
      (x) => x.id == value
    )[0];
    const f = Map(data).set("farmerPlotId", plotSelected?.id);
    const g = Map(f.toJS()).set("farmAreaAmount", plotSelected?.raiAmount);
    setCheckSelectPlot("");
    setData(g.toJS());
    setFarmerPlotSelected(plotSelected);
    fetchPurposeSpray(plotSelected.plantName);
  };
  const handlePeriodSpray = (e: any) => {
    const d = Map(data).set("purposeSprayId", e);
    setData(d.toJS());
  };
  const handleCalServiceCharge = (e: any) => {
    if (e.target.id == "unitPrice") {
      let calUnitPrice = parseFloat(data.farmAreaAmount) * e.target.value;
      const d = Map(data).set("unitPrice", e.target.value);
      const pushCal = Map(d.toJS()).set("price", calUnitPrice.toFixed(2));
      setData(pushCal.toJS());
    } else {
      let calUnitPrice = e.target.value / parseFloat(data.farmAreaAmount);
      const d = Map(data).set("price", e.target.value);
      const pushCal = Map(d.toJS()).set("unitPrice", calUnitPrice);
      setData(pushCal.toJS());
    }
  };
  const handlePurposeSpray = (e: any) => {
    let checked = e.target.checked;
    let value = e.target.value;
    setCheckCrop(
      value == "อื่นๆ" ? !checked : otherSpray != null ? false : true
    );
    PURPOSE_SPRAY_CHECKBOX.map((item) =>
      _.set(item, "isChecked", item.crop == value ? checked : item.isChecked)
    );
    let p: any = "";

    if (checked) {
      p = Map(data).set(
        "targetSpray",
        [...data?.targetSpray, value].filter((x) => x != "")
      );
    } else {
      let removePlant = data?.targetSpray.filter((x) => x != value);
      p = Map(data).set("targetSpray", removePlant);
    }
    setData(p.toJS());
  };
  const handleOtherSpray = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim().length != 0) {
      setOtherSpray(e.target.value);
      let checkComma = checkValidateComma(e.target.value);
      if (!checkComma) {
        setValidateComma({ status: "", message: "" });
        setDisableBtn(false);
      } else {
        setValidateComma({
          status: "error",
          message: "กรุณาใช้ (,) ให้กับการเพิ่มมากกว่า 1 อย่าง",
        });
        setDisableBtn(true);
      }
    } else {
      setValidateComma({
        status: "error",
        message: "โปรดระบุ",
      });
      setDisableBtn(true);
    }
  };
  const handlePreparation = (e: any) => {
    const d = Map(data).set("preparationBy", e.target.value);
    setData(d.toJS());
  };
  const handleComment = (e: any) => {
    const d = Map(data).set("comment", e.target.value);
    setData(d.toJS());
  };
  const checkValidateComma = (data: string) => {
    const checkSyntax =
      data.includes("*") ||
      data.includes("/") ||
      data.includes(" ") ||
      data.includes("-") ||
      data.includes("+");
    return data.trim().length != 0 ? (checkSyntax ? true : false) : true;
  };
  const handleDate = (e: any) => {
    let dateSelect = new Date(e);
    setDateAppointment(
      dateSelect.getFullYear() +
        "/" +
        (dateSelect.getMonth() + 1) +
        "/" +
        dateSelect.getDate()
    );
  };
  const handleTime = (e: any) => {
    setTimeAppointment(new Date(e).getTime());
  };

  const renderFormSearchFarmer = (
    <CardContainer>
      <CardHeader textHeader="ข้อมูลเกษตรกรและแปลง" />
      <div className="flex-column">
        <Form style={{ padding: "20px" }}>
          {current == 0 && (
            <div className="row">
              <div className="form-group col-lg-6">
                <Form.Item name="searchAddress">
                  <Input.Group>
                    <AutoComplete
                      style={{
                        width: "100%",
                      }}
                      allowClear
                      placeholder="ค้นหาชื่อเกษตรกร/เบอร์โทร/เลขบัตรปชช."
                      onSearch={(e: any) => setSearchFarmer(e)}
                      onSelect={onSelectFarmer}
                      onChange={handleSearchFarmer}
                    >
                      {farmerList?.map((item) => (
                        <Option
                          value={item.firstname + " " + item.lastname}
                          id={item.id}
                        >
                          {item.firstname + " " + item.lastname}
                        </Option>
                      ))}
                    </AutoComplete>
                  </Input.Group>
                </Form.Item>
              </div>
              <div className="form-group col-lg-6">
                <Button
                  style={{
                    border: "1px dashed #219653",
                    borderRadius: "5px",
                    backgroundColor: "rgba(33, 150, 83, 0.1)",
                    color: color.Success,
                  }}
                  onClick={handleSelectFarmer}
                >
                  เลือกเกษตรกร
                </Button>
              </div>
            </div>
          )}
          {dataFarmer && (
            <div className="col-lg-12" key={dataFarmer.id}>
              <div className="row">
                <div className="form-group col-lg-4">
                  <Form.Item>
                    <label>ชื่อ-นามสกุล</label>
                    <Input
                      value={dataFarmer.firstname + " " + dataFarmer.lastname}
                      disabled
                    />
                  </Form.Item>
                </div>
                <div className="form-group col-lg-4">
                  <label>เบอร์โทร</label>
                  <Form.Item>
                    <Input value={dataFarmer.telephoneNo} disabled />
                  </Form.Item>
                </div>
              </div>
              <div className="row">
                <div className="form-group col-lg-4">
                  <label>แปลง</label>
                  <Form.Item>
                    <Select
                      status={checkSelectPlot}
                      placeholder="เลือกแปลง"
                      disabled={current == 2}
                      onChange={handleSelectFarmerPlot}
                      defaultValue={data?.farmerPlotId}
                    >
                      {dataFarmer?.farmerPlot.map((item) => (
                        <option value={item.id}>{item.plotName}</option>
                      ))}
                    </Select>
                    {checkSelectPlot == "error" && (
                      <span style={{ color: color.Error }}>กรุณาเลือกแปลง</span>
                    )}
                  </Form.Item>
                </div>
                <div className="form-group col-lg-4">
                  <label>พืชที่ปลูก</label>
                  <Form.Item>
                    <Input value={farmerPlotSeleced?.plantName} disabled />
                  </Form.Item>
                </div>
                <div className="form-group col-lg-4">
                  <label>จำนวนไร่</label>
                  <Form.Item>
                    <Input value={farmerPlotSeleced?.raiAmount} disabled />
                  </Form.Item>
                </div>
              </div>
              <div className="row">
                <div className="form-group">
                  <label>พื้นที่แปลงเกษตร</label>
                  <Form.Item>
                    <Input
                      value={
                        farmerPlotSeleced?.plotArea.subdistrictName +
                        "/" +
                        farmerPlotSeleced?.plotArea.districtName +
                        "/" +
                        farmerPlotSeleced?.plotArea.provinceName
                      }
                      disabled
                    />
                  </Form.Item>
                </div>
              </div>
              <div className="row">
                <div className="form-group col-lg-6">
                  <Form.Item>
                    <label>Latitude (ละติจูด)</label>
                    <Input value={farmerPlotSeleced?.lat} disabled />
                  </Form.Item>
                </div>
                <div className="form-group col-lg-6">
                  <label>Longitude (ลองติจูด)</label>
                  <Form.Item>
                    <Input value={farmerPlotSeleced?.long} disabled />
                  </Form.Item>
                </div>
              </div>
              <div className="row">
                <div className="form-group col-lg-12">
                  <GooleMap
                    width="100%"
                    height="350px"
                    zoom={17}
                    lat={
                      farmerPlotSeleced?.lat != undefined
                        ? parseFloat(farmerPlotSeleced.lat)
                        : LAT_LNG_BANGKOK.lat
                    }
                    lng={
                      farmerPlotSeleced?.long != undefined
                        ? parseFloat(farmerPlotSeleced.long)
                        : LAT_LNG_BANGKOK.lng
                    }
                  />
                  <div className="row">
                    <div className="form-group">
                      <label>จุดสังเกต</label>
                      <Form.Item>
                        <Input value={farmerPlotSeleced?.landmark} disabled />
                      </Form.Item>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {dataFarmer && (
            <CardContainer
              style={{ backgroundColor: "rgba(33, 150, 83, 0.1)" }}
            >
              <Form style={{ padding: "20px" }}>
                <label>ยอดรวมค่าบริการ</label>
                <div className="row">
                  <div className="form-group col-lg-4">
                    <Form.Item>
                      <label>ค่าบริการ/ไร่</label>{" "}
                      <span style={{ color: "red" }}>*</span>
                      <Input
                        suffix="บาท/ไร่"
                        id="unitPrice"
                        autoComplete="off"
                        step="0.01"
                        value={data?.unitPrice}
                        onChange={handleCalServiceCharge}
                        disabled={current == 2 || checkSelectPlot == "error"}
                      />
                    </Form.Item>
                  </div>
                  <div className="form-group col-lg-4">
                    <label>คำนวณยอดรวม</label>{" "}
                    <span style={{ color: "red" }}>*</span>
                    <Form.Item>
                      <Input
                        suffix="บาท"
                        autoComplete="off"
                        step="0.01"
                        value={data?.price}
                        onChange={handleCalServiceCharge}
                        disabled={current == 2 || checkSelectPlot == "error"}
                      />
                    </Form.Item>
                  </div>
                </div>
              </Form>
            </CardContainer>
          )}
        </Form>
      </div>
    </CardContainer>
  );
  const renderFormAppointment = (
    <CardContainer>
      <CardHeader textHeader="นัดหมายบริการ" />
      <div className="flex-column">
        <Form style={{ padding: "20px" }}>
          <div className="row col-lg-6">
            <div className="form-group col-lg-6">
              <label>
                วันที่นัดหมาย <span style={{ color: "red" }}>*</span>
              </label>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกวันที่นัดหมาย!",
                  },
                ]}
                key={dateAppointment}
              >
                <DatePicker
                  format={dateFormat}
                  className="col-lg-12"
                  disabled={current == 2 || checkSelectPlot == "error"}
                  onChange={(e: any) => handleDate(e)}
                  defaultValue={moment(dateAppointment)}
                />
              </Form.Item>
            </div>
            <div className="form-group col-lg-6">
              <label>
                เวลานัดหมาย <span style={{ color: "red" }}>*</span>
              </label>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกเวลานัดหมาย!",
                  },
                ]}
                key={timeAppointment}
              >
                <TimePicker
                  format={timeFormat}
                  disabled={current == 2 || checkSelectPlot == "error"}
                  onChange={(e: any) => handleTime(e)}
                  defaultValue={moment(timeAppointment)}
                />
              </Form.Item>
            </div>
          </div>
          <div className="row form-group col-lg-6">
            <label>
              ช่วงเวลาการพ่น <span style={{ color: "red" }}>*</span>
            </label>
            <Form.Item>
              <Select
                key={data?.purposeSprayId}
                placeholder="-"
                disabled={current == 2 || checkSelectPlot == "error"}
                defaultValue={data?.purposeSprayId}
                onChange={handlePeriodSpray}
              >
                {periodSpray?.purposeSpray?.length ? (
                  periodSpray?.purposeSpray?.map((item) => (
                    <Option value={item.id}>{item.purposeSprayName}</Option>
                  ))
                ) : (
                  <Option>-</Option>
                )}
              </Select>
            </Form.Item>
          </div>
          <div className="row form-group col-lg-6 p-2">
            <label>
              เป้าหมายการฉีดพ่น <span style={{ color: "red" }}>*</span>
            </label>
            {PURPOSE_SPRAY_CHECKBOX.map((item) =>
              _.set(
                item,
                "isChecked",
                data?.targetSpray.map((x) => x).find((y) => y === item.crop)
                  ? true
                  : item.isChecked
              )
            ).map((x, index) => (
              <div className="form-group">
                <input
                  key={data.targetSpray[0]}
                  type="checkbox"
                  value={x.crop}
                  disabled={current == 2 || checkSelectPlot == "error"}
                  checked={x.isChecked}
                  onChange={handlePurposeSpray}
                />{" "}
                <label style={{ padding: "0 8px 0 0" }}>{x.crop}</label>
                {index == 4 && (
                  <>
                    <Input
                      status={validateComma.status}
                      key={data.targetSpray[0]}
                      className="col-lg-5"
                      disabled={current == 2 || checkCrop}
                      placeholder="โปรดระบุ เช่น เพลี้ย,หอย"
                      defaultValue={Array.from(
                        new Set(
                          data?.targetSpray.filter(
                            (a) => !PURPOSE_SPRAY.some((x) => x === a)
                          )
                        )
                      ).join(",")}
                      onChange={handleOtherSpray}
                    />
                    {validateComma.status == "error" && (
                      <p style={{ color: color.Error, padding: "0 0 0 55px" }}>
                        {validateComma.message}
                      </p>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
          <div className="row form-group col-lg-6 p-2">
            <label>
              การเตรียมยา <span style={{ color: "red" }}>*</span>
            </label>
            <Radio.Group
              disabled={current == 2 || checkSelectPlot == "error"}
              defaultValue={data?.preparationBy}
              key={data.preparationBy}
            >
              <Space direction="vertical" onChange={handlePreparation}>
                <Radio value="เกษตรกรเตรียมยาเอง">เกษตรกรเตรียมยาเอง</Radio>
                <Radio value="นักบินโดรนเตรียมให้">นักบินโดรนเตรียมให้</Radio>
              </Space>
            </Radio.Group>
          </div>
          <div className="form-group">
            <label>หมายเหตุ</label>
            <TextArea
              placeholder="ระบุหมายเหตุเพื่อแจ้งนักบินโดรน เช่น เกษตรกรจะเตรียมยาให้, ฝากนักบินเลือกยาราคาไม่แพงมาให้หน่อย เป็นต้น"
              disabled={current == 2 || checkSelectPlot == "error"}
              defaultValue={data?.comment}
              onChange={handleComment}
            />
          </div>
        </Form>
      </div>
    </CardContainer>
  );
  //#endregion

  //#region Step2
  const fetchDronerList = async (
    farmerId?: string,
    plotId?: string,
    date?: string,
    search?: string,
    status?: string,
    ratingMin?: number,
    ratingMax?: number
  ) => {
    await TaskSearchDronerDatasource.getTaskDronerList(
      farmerId,
      plotId,
      date,
      search,
      distrance.min,
      distrance.max,
      status,
      ratingMin,
      ratingMax
    ).then((res) => {
      res.map((item) =>
        _.set(
          item,
          "isChecked",
          dronerSelectedList
            .map((x) => x)
            .find((y) => y.dronerId === item.droner_id)
            ? true
            : false
        )
      );
      setDataDronerList(res);
    });
  };
  const ratingStar = (
    <Menu
      items={[
        {
          label: (
            <div style={{ color: "#FFCA37", fontSize: "16px" }}>
              <StarFilled />
              <StarFilled />
              <StarFilled />
              <StarFilled />
              <StarFilled />
            </div>
          ),
          key: "1",
          icon: <Checkbox value={5} onClick={(e) => onChangeRating(e)} />,
        },
        {
          label: (
            <div style={{ color: "#FFCA37", fontSize: "16px" }}>
              <StarFilled />
              <StarFilled />
              <StarFilled />
              <StarFilled />
            </div>
          ),
          key: "2",
          icon: <Checkbox value={4} onClick={(e) => onChangeRating(e)} />,
        },
        {
          label: (
            <div style={{ color: "#FFCA37", fontSize: "16px" }}>
              <StarFilled />
              <StarFilled />
              <StarFilled />
            </div>
          ),
          key: "3",
          icon: <Checkbox value={3} onClick={(e) => onChangeRating(e)} />,
        },
        {
          label: (
            <div style={{ color: "#FFCA37", fontSize: "16px" }}>
              <StarFilled />
              <StarFilled />
            </div>
          ),
          key: "4",
          icon: <Checkbox value={2} onClick={(e) => onChangeRating(e)} />,
        },
        {
          label: (
            <div style={{ color: "#FFCA37", fontSize: "16px" }}>
              <StarFilled />
            </div>
          ),
          key: "5",
          icon: <Checkbox value={1} onClick={(e) => onChangeRating(e)} />,
        },
      ]}
    />
  );
  const [visibleSlider, setVisibleSlider] = useState(false);
  const [visibleRating, setVisibleRating] = useState(false);
  const [distrance, setDistrance] = useState<{ min: number; max: number }>({
    min: 0,
    max: 0,
  });
  const [accuNumber, setAccuNumber] = useState<number[]>([]);
  const [rating, setRating] = useState<{
    ratingMin: number;
    ratingMax: number;
  }>();
  const [statusDroner, setStatusDroner] = useState<string>();

  const handleVisibleSlider = (newVisible: any) => {
    setVisibleSlider(newVisible);
  };
  const onChangeSlider = (newValue: any) => {
    setDistrance({ min: newValue[0], max: newValue[1] });
  };
  const onChangeDistranceMin = (e: any) => {
    setDistrance({ min: e, max: distrance.max });
  };
  const onChangeDistranceMax = (e: any) => {
    setDistrance({ min: distrance.min, max: e });
  };
  const onChangeStatusDroner = (e: any) => {
    setStatusDroner(e);
  };
  const onChangeRating = (e: any) => {
    let value = e.target.value;
    let checked = e.target.checked;
    let min = 0;
    let max = 0;
    if (checked) {
      min = Math.min(...accuNumber, value);
      max = Math.max(...accuNumber, value);
      setAccuNumber([...accuNumber, value]);
    } else {
      let d: number[] = accuNumber.filter((x) => x != value);
      min = Math.min(...d);
      max = Math.max(...d);
      setAccuNumber(d);
    }
    setRating({ ratingMin: min, ratingMax: max });
  };
  const handleSelectDroner = async (e: any, droner: any) => {
    let dronerSelected: CreateDronerTempEntity = CreateDronerTempEntity_INIT;
    let checked = e.target.checked;
    if (checked) {
      dronerSelected.taskId = queryString[1];
      dronerSelected.dronerId = droner.droner_id;
      dronerSelected.status = "WAIT_RECEIVE";
      dronerSelected.dronerDetail = [JSON.stringify(droner)];
      await TaskDronerTempDataSource.createDronerTemp(dronerSelected).then(
        (res) => {
          let droner = dataDronerList.map((item) =>
            _.set(
              item,
              "isChecked",
              res.responseData
                .map((x: any) => x)
                .find((y: any) => y.dronerId === item.droner_id)
                ? true
                : false
            )
          );
          setDataDronerList(droner);
          setDronerSelectedList(res.responseData);
        }
      );
    } else {
      let deleteDroner: DeletedDronerTemp = DeletedDronerTemp_INIT;
      deleteDroner.taskId = queryString[1];
      deleteDroner.dronerId = droner.droner_id;
      await TaskDronerTempDataSource.deleteDronerTemp(deleteDroner).then(
        (res) => {
          let droner = dataDronerList.map((item) =>
            _.set(
              item,
              "isChecked",
              res.responseData
                .map((x: any) => x)
                .find((y: any) => y.dronerId === item.droner_id)
                ? true
                : false
            )
          );
          setDataDronerList(droner);
          setDronerSelectedList(res.responseData);
        }
      );
    }
  };
  const handleAllSelectDroner = async (e: any) => {
    let dronerSelected: CreateDronerTempEntity = CreateDronerTempEntity_INIT;
    let deleteDroner: DeletedDronerTemp = DeletedDronerTemp_INIT;
    let checked = e.target.checked;
    if (checked) {
      let compareData = dataDronerList.filter(
        (x) => !dronerSelectedList.map((y) => y.dronerId).includes(x.droner_id)
      );
      for (let i: number = 0; compareData.length > i; i++) {
        dronerSelected.taskId = queryString[1];
        dronerSelected.dronerId = compareData[i].droner_id;
        dronerSelected.status = "WAIT_RECEIVE";
        dronerSelected.dronerDetail = [JSON.stringify(compareData[i])];
        await TaskDronerTempDataSource.createDronerTemp(dronerSelected).then(
          (res) => {
            let droner = dataDronerList.map((item) =>
              _.set(
                item,
                "isChecked",
                res.responseData
                  .map((x: any) => x)
                  .find((y: any) => y.dronerId === item.droner_id)
                  ? true
                  : false
              )
            );
            setDataDronerList(droner);
            setDronerSelectedList(res.responseData);
          }
        );
      }
    } else {
      for (let i: number = 0; dataDronerList.length > i; i++) {
        deleteDroner.taskId = queryString[1];
        deleteDroner.dronerId = dataDronerList[i].droner_id;
        await TaskDronerTempDataSource.deleteDronerTemp(deleteDroner).then(
          (res) => {
            let droner = dataDronerList.map((item) =>
              _.set(
                item,
                "isChecked",
                res.responseData
                  .map((x: any) => x)
                  .find((y: any) => y.dronerId === item.droner_id)
                  ? true
                  : false
              )
            );
            setDataDronerList(droner);
            setDronerSelectedList(res.responseData);
          }
        );
      }
    }
  };
  const callBackDronerSelected = async (data: TaskDronerTempEntity[]) => {
    let compareData = dronerSelectedList.filter(
      (x) => !data.map((y) => y.id).includes(x.id)
    );
    for (let i: number = 0; compareData.length > i; i++) {
      let deleteDroner: DeletedDronerTemp = DeletedDronerTemp_INIT;
      deleteDroner.taskId = queryString[1];
      deleteDroner.dronerId = compareData[i].dronerId;
      await TaskDronerTempDataSource.deleteDronerTemp(deleteDroner).then(
        (res) => {
          let droner = dataDronerList.map((item) =>
            _.set(
              item,
              "isChecked",
              res.responseData
                .map((x: any) => x)
                .find((y: any) => y.dronerId === item.droner_id)
                ? true
                : false
            )
          );
          setDataDronerList(droner);
          setDronerSelectedList(res.responseData);
        }
      );
    }
    setShowModalSelectedDroner((prev) => !prev);
  };
  const handleVisibleRating = (newVisible: any) => {
    setVisibleRating(newVisible);
  };

  const searchSection = (
    <div className="d-flex justify-content-between" style={{ padding: "10px" }}>
      <div className="col-lg-3 p-1">
        <Input
          prefix={<SearchOutlined style={{ color: color.Disable }} />}
          placeholder="ค้นหาชื่อเกษตรกร หรือเบอร์โทร"
          className="col-lg-12 p-1"
          onChange={(e: any) => setSearchTextDroner(e.target.value)}
        />
      </div>
      <div className="col-lg-2 p-1">
        <Popover
          content={
            <>
              <Slider
                range={{
                  draggableTrack: true,
                }}
                value={[distrance.min, distrance.max]}
                onChange={onChangeSlider}
                max={200}
              />
              <InputNumber
                min={0}
                max={200}
                style={{
                  margin: "0 16px",
                }}
                value={distrance.min}
                onChange={onChangeDistranceMin}
              />
              <InputNumber
                min={0}
                max={200}
                style={{
                  margin: "0 16px",
                }}
                id="max"
                value={distrance.max}
                onChange={onChangeDistranceMax}
              />
            </>
          }
          title="ระยะทาง (กิโลเมตร)"
          trigger="click"
          visible={visibleSlider}
          onVisibleChange={handleVisibleSlider}
          placement="bottom"
        >
          <Button className="col-lg-12">เลือกระยะทาง</Button>
        </Popover>
      </div>
      <div className="col-lg-2 p-1">
        <Dropdown
          overlay={ratingStar}
          trigger={["click"]}
          className="col-lg-12"
          onVisibleChange={handleVisibleRating}
          visible={visibleRating}
        >
          <Button>
            เลือก Rating
            <DownOutlined />
          </Button>
        </Dropdown>
      </div>
      <div className="col-lg-2">
        <Select
          allowClear
          className="col-lg-12 p-1"
          placeholder="เลือกสถานะ"
          onChange={onChangeStatusDroner}
        >
          <option value="สะดวก">สะดวก</option>
          <option value="ไม่สะดวก">ไม่สะดวก</option>
        </Select>
      </div>
      <div className="col-lg-1 pt-1">
        <Button
          style={{
            borderColor: color.Success,
            borderRadius: "5px",
            color: color.secondary2,
            backgroundColor: color.Success,
          }}
          onClick={() =>
            fetchDronerList(
              data.farmerId,
              data.farmerPlotId,
              dateAppointment,
              searchTextDroner,
              statusDroner,
              rating?.ratingMin,
              rating?.ratingMax
            )
          }
        >
          ค้นหาข้อมูล
        </Button>
      </div>
      <div className="col-lg-2 pt-1">
        <Button
          style={{
            borderColor: color.Success,
            borderRadius: "5px",
            color: color.Success,
          }}
          onClick={() => setShowModalSelectedDroner((prev) => !prev)}
        >
          ดูรายชื่อนักบินโดรนที่เลือก (
          {dronerSelectedList.filter((x) => x.isChecked != false).length})
        </Button>
      </div>
    </div>
  );
  const columns = [
    {
      title: selectionType == "checkbox" && (
        <input
          type={selectionType}
          onChange={handleAllSelectDroner}
          checked={dataDronerList
            .filter(
              (x) =>
                x.droner_status != "ไม่สะดวก" && x.is_open_receive_task != false
            )
            .every((x) => x.isChecked)}
          style={{ width: "18px", height: "18px" }}
        />
      ),
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <input
                type={selectionType}
                onChange={(e) => handleSelectDroner(e, row)}
                checked={row.isChecked}
                disabled={
                  selectionType == "checkbox"
                    ? row.droner_status != "ไม่สะดวก" &&
                      row.is_open_receive_task != false
                      ? false
                      : true
                    : false
                }
                style={{ width: "18px", height: "18px" }}
              />
            </>
          ),
        };
      },
    },
    {
      title: "ชื่อนักบินโดรน",
      dataIndex: "fullname",
      key: "fullname",
      width: "18%",
      render: (value: any, row: any, index: number) => {
        let tooltipTitle = (
          <>
            {"เคยให้บริการเกษตรกรท่านนี้,"}
            <br />
            {"คะแนนรีวิวล่าสุด "}
            <StarFilled style={{ color: "#FFCA37", fontSize: "16px" }} />{" "}
            {parseFloat(row.rating_avg).toFixed(1)}
          </>
        );
        return {
          children: (
            <>
              <span>{row.firstname + " " + row.lastname}</span>
              {row.rating_avg != null && (
                <Tooltip title={tooltipTitle} className="p-2">
                  <img src={icon.iconReviewDroner} />
                </Tooltip>
              )}

              <br />
              <span style={{ color: color.Grey }}>{row.droner_code}</span>
            </>
          ),
        };
      },
    },
    {
      title: "เบอร์โทร",
      dataIndex: "telephone_no",
      key: "telephone_no",
    },
    {
      title: "จำนวนให้บริการ",
      dataIndex: "total_task",
      key: "total_task",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span>{row.total_task == null ? 0 : row.total_task} งาน</span>
              <br />
              <span style={{ color: color.Grey }}>
                รวม {row.total_area == null ? 0 : row.total_area} ไร่
              </span>
            </>
          ),
        };
      },
    },
    {
      title: "Rating",
      dataIndex: "rating_avg",
      key: "rating_avg",
      render: (value: any, row: any, index: number) => {
        const checkRating = () => {
          return row.rating_avg > 0 ? true : false;
        };
        return {
          children: (
            <>
              {checkRating() ? (
                <Row>
                  <div style={{ color: "#FFCA37", fontSize: "16px" }}>
                    <StarFilled />
                  </div>
                  <span className="pt-2 ps-1">
                    {parseFloat(row.rating_avg).toFixed(1)} ({row.count_rating})
                  </span>
                </Row>
              ) : (
                <p>-</p>
              )}
            </>
          ),
        };
      },
    },
    {
      title: "ตำบล",
      dataIndex: "subdistrict_name",
      key: "subdistrict_name",
    },
    {
      title: "อำเภอ",
      dataIndex: "district_name",
      key: "district_name",
    },
    {
      title: "จังหวัด",
      dataIndex: "province_name",
      key: "province_name",
    },
    {
      title: "ยี่หัอ",
      dataIndex: "brand",
      key: "brand",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <Avatar
                size={25}
                src={row.logo_drone_brand}
                style={{ marginRight: "5px" }}
              />
              <span>{row.drone_brand}</span>
              <br />
              {row.count_drone > 1 && (
                <p style={{ fontSize: "12px", color: color.Grey }}>
                  (มากกว่า 1 ยี่ห้อ)
                </p>
              )}
            </>
          ),
        };
      },
    },
    {
      title: "สะดวก/ไม่สะดวก",
      dataIndex: "droner_status",
      key: "droner_status",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span
                style={{
                  color:
                    row.is_open_receive_task == false
                      ? color.Disable
                      : row.droner_status == "สะดวก"
                      ? color.Success
                      : color.Error,
                }}
              >
                <Badge
                  color={
                    row.is_open_receive_task == false
                      ? color.Disable
                      : row.droner_status == "สะดวก"
                      ? color.Success
                      : color.Error
                  }
                />
                {row.is_open_receive_task ? "ปิดการใช้งาน" : row.droner_status}
                <br />
              </span>
            </>
          ),
        };
      },
    },
  ];
  const renderDronerList = (
    <>
      {searchSection}
      <CardContainer>
        <Table
          columns={columns}
          dataSource={dataDronerList}
          pagination={false}
        />
      </CardContainer>
    </>
  );
  //#endregion

  //#region Step3
  const renderDronerSelectedList = (
    <CardContainer>
      <CardHeader textHeader="รายชื่อนักบินโดรน" />
      <Form>
        <div className="container">
          {current == 2 &&
            dronerSelectedList?.map((item) => (
              <div className="row pt-3">
                {item?.dronerDetail[0] != "" && (
                  <>
                    <>
                      <div className="col-lg-3">
                        {JSON.parse(item?.dronerDetail).firstname}{" "}
                        {JSON.parse(item?.dronerDetail).lastname}
                        <br />
                        <p style={{ fontSize: "12px", color: color.Grey }}>
                          {JSON.parse(item?.dronerDetail).droner_code}
                        </p>
                      </div>
                      <div className="col-lg-2">
                        {JSON.parse(item?.dronerDetail).telephone_no}
                      </div>
                      <div className="col-lg-4">
                        {JSON.parse(item?.dronerDetail).subdistrict_name}/
                        {JSON.parse(item?.dronerDetail).district_name}/
                        {JSON.parse(item?.dronerDetail).province_name}
                      </div>
                      <div className="col-lg-2">
                        <Avatar
                          size={25}
                          src={JSON.parse(item.dronerDetail).logo_drone_brand}
                          style={{ marginRight: "5px" }}
                        />
                        {JSON.parse(item?.dronerDetail).drone_brand}
                        <br />
                        <p style={{ fontSize: "12px", color: color.Grey }}>
                          {JSON.parse(item.dronerDetail).count_drone > 1 &&
                            "(มากกว่า 1 ยี่หัอ)"}
                        </p>
                      </div>
                      <div className="col-lg-1">
                        <span
                          style={{
                            color:
                              JSON.parse(item?.dronerDetail).droner_status ==
                              "สะดวก"
                                ? color.Success
                                : color.Error,
                          }}
                        >
                          <Badge
                            color={
                              JSON.parse(item?.dronerDetail).droner_status ==
                              "สะดวก"
                                ? color.Success
                                : color.Error
                            }
                          />
                          {JSON.parse(item?.dronerDetail).droner_status}
                          <br />
                        </span>
                      </div>
                    </>
                  </>
                )}
              </div>
            ))}
        </div>
      </Form>
    </CardContainer>
  );
  const renderServiceCharge = (
    <CardContainer>
      <CardHeader textHeader="ยอดรวมค่าบริการ" />
      <Form style={{ padding: "20px" }}>
        <CardContainer style={{ backgroundColor: "rgba(33, 150, 83, 0.1)" }}>
          <Form style={{ padding: "20px" }}>
            <label>ยอดรวมค่าบริการ (หลังรวมค่าธรรมเนียม)</label>
            <h5 style={{ color: color.primary1 }} className="p-2">
              {numberWithCommas(parseFloat(data?.price)).toString()} บาท
            </h5>
            <div className="row">
              <div className="form-group col-lg-4">
                <label>ค่าบริการ (ก่อนคิดค่าธรรมเนียม)</label>
                <Form.Item>
                  <Input
                    suffix="บาท"
                    value={parseFloat(data?.price).toFixed(2)}
                    disabled={current == 2}
                    autoComplete="off"
                    step="0.01"
                  />
                </Form.Item>
              </div>
              <div className="form-group col-lg-4">
                <label>ค่าธรรมเนียม (คิด 5% ของราคารวม)</label>
                <Form.Item>
                  <Input
                    suffix="บาท"
                    value={parseFloat(data?.fee).toFixed(2)}
                    disabled={current == 2}
                    autoComplete="off"
                    step="0.01"
                  />
                </Form.Item>
              </div>
              <div className="form-group col-lg-4">
                <label>ส่วนลดค่าธรรมเนียม</label>
                <Form.Item>
                  <Input
                    suffix="บาท"
                    value={parseFloat(data?.discountFee).toFixed(2)}
                    disabled={current == 2}
                    autoComplete="off"
                    step="0.01"
                  />
                </Form.Item>
              </div>
            </div>
          </Form>
        </CardContainer>
      </Form>
    </CardContainer>
  );
  //#endregion

  const nextStep = () => {
    if (current == 0) {
      let changeTimeFormat = moment(timeAppointment).format(timeCreateFormat);
      let changeDateFormat = moment(dateAppointment).format(dateCreateFormat);
      let otherSprayList = [];
      if (otherSpray != undefined) {
        let m = otherSpray.split(",");
        for (let i = 0; m.length > i; i++) {
          otherSprayList.push(m[i]);
        }
      }
      data.targetSpray.push.apply(
        data.targetSpray,
        otherSprayList.filter((x) => x != "")
      );
      const d = Map(data).set(
        "dateAppointment",
        moment(changeDateFormat + " " + changeTimeFormat).toISOString()
      );
      const p = Map(d.toJS()).set(
        "createBy",
        profile.firstname + " " + profile.lastname
      );
      const q = Map(p.toJS()).set(
        "updateBy",
        profile.firstname + " " + profile.lastname
      );
      setData(q.toJS());
    } else {
      const s = Map(data).set("status", "WAIT_RECEIVE");
      const d = Map(s.toJS()).set("dronerId", data.dronerId);
      const f = Map(d.toJS()).set("fee", parseFloat(data.price) * 0.05);
      const df = Map(f.toJS()).set(
        "discountFee",
        parseFloat(data.price) * 0.05
      );
      setData(df.toJS());
    }
    fetchDronerList(data.farmerId, data.farmerPlotId, dateAppointment);
    setCurrent(current + 1);
  };
  const updateNewTask = async () => {
    let updateTask: UpdateNewTask = UpdateNewTask_INIT;
    updateTask.id = data.id;
    updateTask.farmerId = data.farmerId;
    updateTask.farmerPlotId = data.farmerPlotId;
    updateTask.farmAreaAmount = data.farmAreaAmount;
    updateTask.dateAppointment = data.dateAppointment;
    updateTask.targetSpray = data.targetSpray;
    updateTask.preparationBy = data.preparationBy;
    updateTask.purposeSprayId = data.purposeSprayId;
    updateTask.status = data.status;
    updateTask.statusRemark = data.statusRemark;
    updateTask.updateBy = profile.firstname + " " + profile.lastname;
    // updateTask.unitPriceStandard = parseFloat(data.unitPriceStandard);
    // updateTask.priceStandard = parseFloat(data.priceStandard);
    updateTask.unitPrice = parseFloat(data.unitPrice);
    updateTask.price = parseFloat(data.price);
    updateTask.comment = data.comment;
    updateTask.fee = parseFloat(data.fee);
    updateTask.discountFee = parseFloat(data.discountFee);
    Swal.fire({
      title: "ยืนยันการแก้ไข",
      text: "โปรดตรวจสอบรายละเอียดที่คุณต้องการแก้ไขข้อมูลก่อนเสมอ เพราะอาจส่งผลต่อการจ้างงานในระบบ",
      cancelButtonText: "ยกเลิก",
      confirmButtonText: "ยืนยัน",
      confirmButtonColor: color.Success,
      showCancelButton: true,
      showCloseButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await TaskDatasource.updateNewTask(updateTask).then((res) => {
          if (res.userMessage == "success") {
            window.location.href = "/IndexNewTask";
          }
        });
      }
    });
  };

  const titleStep = [
    {
      title: "เลือกเกษตรกร และนัดหมาย",
      content: (
        <>
          {renderFormSearchFarmer} <br />
          {renderFormAppointment}
        </>
      ),
    },
    { title: "เลือกนักบินโดรน", content: <>{renderDronerList}</> },
    {
      title: "ยืนยันข้อมูล",
      content: (
        <>
          {renderFormSearchFarmer} <br />
          {renderFormAppointment}
          <br />
          {renderDronerSelectedList}
          <br />
          {renderServiceCharge}
        </>
      ),
    },
  ];

  const renderStep = (
    <>
      <div className="custom-steps">
        <Steps current={current} className="p-3">
          {titleStep.map((item) => (
            <Step title={item.title} className="m--font-success" />
          ))}
        </Steps>
      </div>
      <div className="steps-content">{titleStep[current].content}</div>
      <Row className="d-flex justify-content-between pt-2">
        {current == 0 && (
          <BackButton
            onClick={() => (window.location.href = "/IndexNewTask")}
          />
        )}
        {current > 0 && (
          <BackButton onClick={() => setCurrent((prev) => prev - 1)} />
        )}
        {current < titleStep.length - 1 && (
          <Button
            style={{
              backgroundColor: disableBtn == false ? color.Success : color.Grey,
              borderColor: disableBtn == false ? color.Success : color.Grey,
              borderRadius: "5px",
              color: color.BG,
            }}
            onClick={nextStep}
          >
            ถัดไป
          </Button>
        )}
        {current === titleStep.length - 1 && (
          <SaveButton onClick={() => updateNewTask} />
        )}
      </Row>
    </>
  );

  return (
    <>
      <Layouts key={data?.id}>
        <Row>
          <BackIconButton
            onClick={() => (window.location.href = "/IndexNewTask")}
          />
          <span className="pt-3">
            <strong style={{ fontSize: "20px" }}>
              แก้ไขงานบินใหม่ {data.taskNo}
            </strong>
          </span>
        </Row>
        {renderStep}
      </Layouts>
      {showModalSelectedDroner && (
        <ModalSelectedEditDroner
          show={showModalSelectedDroner}
          dataDroner={dronerSelectedList}
          title="รายชื่อนักบินโดรน"
          backButton={() => setShowModalSelectedDroner((prev) => !prev)}
          callBack={callBackDronerSelected}
        />
      )}
    </>
  );
};
export default EditNewTask;
