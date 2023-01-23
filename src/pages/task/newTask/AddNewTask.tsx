import {
  DownOutlined,
  SearchOutlined,
  StarFilled,
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
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  BackButton,
  BackIconButton,
} from "../../../components/button/BackButton";
import SaveButton from "../../../components/button/SaveButton";
import { CardContainer } from "../../../components/card/CardContainer";
import { CardHeader } from "../../../components/header/CardHearder";
import Layouts from "../../../components/layout/Layout";
import color from "../../../resource/color";
import { TaskDatasource } from "../../../datasource/TaskDatasource";
import { FarmerEntity } from "../../../entities/FarmerEntities";
import {
  FarmerPlotEntity,
  FarmerPlotEntity_INIT,
} from "../../../entities/FarmerPlotEntities";
import GooleMap from "../../../components/map/GoogleMap";
import { LAT_LNG_BANGKOK } from "../../../definitions/Location";
import { RowSelectionType } from "antd/lib/table/interface";
import {
  CreateNewTaskEntity,
  CreateNewTaskEntity_INIT,
} from "../../../entities/NewTaskEntities";
import { CropPurposeSprayEntity } from "../../../entities/CropEntities";
import { CropDatasource } from "../../../datasource/CropDatasource";
import {
  PURPOSE_SPRAY,
  PURPOSE_SPRAY_CHECKBOX,
} from "../../../definitions/PurposeSpray";
import {
  TaskSearchDroner,
  TaskSearchDroner_INIT,
} from "../../../entities/TaskSearchDroner";
import { TaskSearchDronerDatasource } from "../../../datasource/TaskSearchDronerDatasource";
import ModalSelectedDroner from "../../../components/modal/task/newTask/ModalSelectedDroner";
import { CreateDronerTempEntity } from "../../../entities/TaskDronerTemp";
import TextArea from "antd/lib/input/TextArea";
import Swal from "sweetalert2";
import { numberWithCommas } from "../../../utilities/TextFormatter";
import icon from "../../../resource/icon";
import { LocationPriceDatasource } from "../../../datasource/LocationPriceDatasource";
const { Step } = Steps;
const { Option } = Select;
const dateFormat = "DD/MM/YYYY";
const dateCreateFormat = "YYYY-MM-DD";
const timeFormat = "HH:mm";
const timeCreateFormat = "HH:mm:ss";

const _ = require("lodash");
const { Map } = require("immutable");

let queryString = _.split(window.location.pathname, "=");

const AddNewTask = () => {
  const profile = JSON.parse(
    localStorage.getItem("profile") || "{  }"
  );
  const [current, setCurrent] = useState(0);
  const [createNewTask, setCreateNewTask] =
    useState<CreateNewTaskEntity>(CreateNewTaskEntity_INIT);

  const [dataFarmer, setDataFarmer] = useState<FarmerEntity>();
  const [farmerList, setFarmerList] = useState<FarmerEntity[]>();
  const [farmerSelected, setFarmerSelected] =
    useState<FarmerEntity>();
  const [farmerPlotSeleced, setFarmerPlotSelected] =
    useState<FarmerPlotEntity>(FarmerPlotEntity_INIT);
  const [selectionType] = useState<RowSelectionType>(queryString[1]);
  const [searchFarmer, setSearchFarmer] = useState<string>();
  const [checkSelectPlot, setCheckSelectPlot] =
    useState<any>("error");

  let [otherSpray, setOtherSpray] = useState<any>();
  const [cropSelected, setCropSelected] = useState<any>("");
  const [periodSpray, setPeriodSpray] =
    useState<CropPurposeSprayEntity>();
  const [checkCrop, setCheckCrop] = useState<boolean>(true);
  const [validateComma, setValidateComma] = useState<{
    status: any;
    message: string;
  }>({
    status: "",
    message: "",
  });

  const [dateAppointment, setDateAppointment] = useState<any>(
    moment(new Date()).format("YYYY-MM-DD")
  );
  const [timeAppointment, setTimeAppointment] = useState<any>(
    moment(new Date().getTime())
  );
  const [disableBtn, setDisableBtn] = useState<boolean>(true);
  const [searchTextDroner, setSearchTextDroner] =
    useState<string>("");
  const [priceMethod, setPriceMethod] = useState<string>("อัตโนมัติ");

  const fetchFarmerList = async (text?: string) => {
    await TaskDatasource.getFarmerList(text).then((res) => {
      setFarmerList(res);
    });
  };
  const fetchPurposeSpray = async () => {
    await CropDatasource.getPurposeByCroupName(cropSelected).then(
      (res) => {
        setPeriodSpray(res);
      }
    );
  };

  const [dataDronerList, setDataDronerList] = useState<
    TaskSearchDroner[]
  >([TaskSearchDroner_INIT]);
  const [dronerSelected, setDronerSelected] = useState<
    TaskSearchDroner[]
  >([TaskSearchDroner_INIT]);
  const [showModalSelectedDroner, setShowModalSelectedDroner] =
    useState<boolean>(false);

  useEffect(() => {
    fetchFarmerList(searchFarmer);
    fetchPurposeSpray();
  }, [searchFarmer, cropSelected]);

  //#region Step1 & Step3
  const handleSearchFarmer = (value: any, id: any) => {
    if (value != undefined) {
      setFarmerSelected(farmerList?.filter((x) => x.id == id.id)[0]);
    } else {
      setFarmerSelected(undefined);
    }
  };
  const fetchLocationPrice = async (
    proId?: number,
    plant?: string,
    rai?: string,
    plot?: string
  ) => {
    await LocationPriceDatasource.getLocationPrice(proId, plant).then(
      (res) => {
        let calUnitPrice =
          rai && parseFloat(res.price) * parseFloat(rai);
        const d = Map(createNewTask).set(
          "priceStandard",
          calUnitPrice
        );
        const e = Map(d.toJS()).set("farmAreaAmount", rai);
        const pushCal = Map(e.toJS()).set(
          "unitPriceStandard",
          parseFloat(res.price)
        );
        const f = Map(pushCal.toJS()).set("price", calUnitPrice);
        const pushCale = Map(f.toJS()).set(
          "unitPrice",
          parseFloat(res.price)
        );
        const g = Map(pushCale.toJS()).set("farmerPlotId", plot);
        setCreateNewTask(g.toJS());
        checkValidateStep(g.toJS(), current);
      }
    );
  };
  const handleSelectFarmer = () => {
    const f = Map(createNewTask).set("farmerId", farmerSelected?.id);
    setCheckSelectPlot("error");
    setDronerSelected([]);
    setCreateNewTask(f.toJS());
    setDataFarmer(farmerSelected);
    checkValidateStep(f.toJS(), current);
  };
  const handleSelectFarmerPlot = (value: any) => {
    let plotSelected = farmerSelected?.farmerPlot.filter(
      (x) => x.id == value
    )[0];
    setPriceMethod("อัตโนมัติ");
    setCropSelected(plotSelected?.plantName);
    setCheckSelectPlot("");
    plotSelected && setFarmerPlotSelected(plotSelected);
    fetchLocationPrice(
      (!farmerPlotSeleced?.plotArea)?0:farmerPlotSeleced?.plotArea.provinceId,
      plotSelected?.plantName,
      plotSelected?.raiAmount,
      plotSelected?.id
    );
  };
  const onSelectFarmer = (e: any, id: any) => {
    setFarmerSelected(undefined);
    const findFarmer = farmerList?.filter((x) => x.id == id.id)[0];
    setFarmerSelected(findFarmer);
  };
  const handleAmountRai = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const payload = {
      ...createNewTask,
    };
    payload.priceStandard =
      createNewTask.unitPriceStandard * parseFloat(e.target.value);
    payload.price =
      createNewTask.unitPriceStandard * parseFloat(e.target.value);
    payload.unitPriceStandard = createNewTask.unitPrice;
    payload.farmAreaAmount = e.target.value;
    setCreateNewTask(payload);
    checkValidateStep(payload, current);
  };
  const handlePeriodSpray = (e: any) => {
    const d = Map(createNewTask).set("purposeSprayId", e);
    setCreateNewTask(d.toJS());
    checkValidateStep(d.toJS(), current);
  };
  const handlePurposeSpray = (e: any) => {
    let checked = e.target.checked;
    let value = e.target.value;
    setCheckCrop(
      value == "อื่นๆ" ? !checked : otherSpray != null ? false : true
    );
    PURPOSE_SPRAY_CHECKBOX.map((item) =>
      _.set(
        item,
        "isChecked",
        item.crop == value ? checked : item.isChecked
      )
    );
    let p: any = "";

    if (checked) {
      p = Map(createNewTask).set(
        "targetSpray",
        [...createNewTask?.targetSpray, value].filter((x) => x != "")
      );
    } else {
      let removePlant = createNewTask?.targetSpray.filter(
        (x) => x != value
      );
      p = Map(createNewTask).set("targetSpray", removePlant);
    }
    setCreateNewTask(p.toJS());
    checkValidateStep(p.toJS(), current);
  };
  const handleOtherSpray = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
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
    const d = Map(createNewTask).set("preparationBy", e.target.value);
    setCreateNewTask(d.toJS());
    checkValidateStep(d.toJS(), current);
  };
  const handleCalServiceCharge = (e: any) => {
    if (e.target.id == "unitPrice") {
      let calUnitPrice =
        parseFloat(createNewTask.farmAreaAmount) * e.target.value;
      const d = Map(createNewTask).set("unitPrice", e.target.value);
      const pushCal = Map(d.toJS()).set("price", calUnitPrice);
      setCreateNewTask(pushCal.toJS());
      checkValidateStep(pushCal.toJS(), current);
    } else {
      let calUnitPrice =
        e.target.value / parseFloat(createNewTask.farmAreaAmount);
      const d = Map(createNewTask).set("price", e.target.value);
      const pushCal = Map(d.toJS()).set("unitPrice", calUnitPrice);
      setCreateNewTask(pushCal.toJS());
      checkValidateStep(pushCal.toJS(), current);
    }
  };
  const handleComment = (e: any) => {
    const d = Map(createNewTask).set("comment", e.target.value);
    setCreateNewTask(d.toJS());
  };
  const handleDateAppointment = (e: any) => {
    setDateAppointment(moment(new Date(e)).format(dateCreateFormat));
  };
  const handleTimeAppiontment = (e: any) => {
    setTimeAppointment(moment(new Date(e).getTime()));
  };
  const checkValidateComma = (data: string) => {
    const checkSyntax =
      data.includes("*") ||
      data.includes("/") ||
      data.includes(" ") ||
      data.includes("-") ||
      data.includes("+");
    return data.trim().length != 0
      ? checkSyntax
        ? true
        : false
      : true;
  };
  const selectPrice = (e: any) => {
    setPriceMethod(e.target.outerText);
    if (e.target.outerText == "กรอกข้อมูลเอง") {
      const d = Map(createNewTask).set("price", 0);
      const pushCal = Map(d.toJS()).set("unitPrice", 0);
      setCreateNewTask(pushCal.toJS());
      setDisableBtn(true);
    } else {
      fetchLocationPrice(
        (!farmerPlotSeleced?.plotArea)?0:farmerPlotSeleced?.plotArea.provinceId,
        farmerPlotSeleced?.plantName,
        createNewTask.farmAreaAmount,
        farmerPlotSeleced?.id
      );
    }
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
                      onChange={handleSearchFarmer}>
                      {farmerList?.map((item) => (
                        <Option
                          value={item.firstname + " " + item.lastname}
                          id={item.id}>
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
                  onClick={handleSelectFarmer}>
                  เลือกเกษตรกร
                </Button>
              </div>
            </div>
          )}
          {dataFarmer && (
            <div className="col-lg-12">
              <div className="row">
                <div className="form-group col-lg-4">
                  <Form.Item>
                    <label>ชื่อ-นามสกุล</label>
                    <Input
                      value={
                        dataFarmer?.firstname +
                        " " +
                        dataFarmer.lastname
                      }
                      disabled
                    />
                  </Form.Item>
                </div>
                <div className="form-group col-lg-4">
                  <label>เบอร์โทร</label>
                  <Form.Item>
                    <Input value={dataFarmer?.telephoneNo} disabled />
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
                      onChange={handleSelectFarmerPlot}
                      disabled={current == 2}
                      defaultValue={createNewTask.farmerPlotId}>
                      {dataFarmer.farmerPlot.map((item) => (
                        <option value={item.id}>
                          {item.plotName}
                        </option>
                      ))}
                    </Select>
                    {checkSelectPlot == "error" && (
                      <span style={{ color: color.Error }}>
                        กรุณาเลือกแปลง
                      </span>
                    )}
                  </Form.Item>
                </div>
                <div className="form-group col-lg-4">
                  <label>พืชที่ปลูก</label>
                  <Form.Item>
                    <Input
                      value={farmerPlotSeleced?.plantName}
                      disabled
                    />
                  </Form.Item>
                </div>
                <div className="form-group col-lg-4">
                  <label>จำนวนไร่</label>
                  <Form.Item>
                    <Input
                      status={
                        parseFloat(createNewTask?.farmAreaAmount) >
                        (farmerPlotSeleced.raiAmount == undefined
                          ? 0
                          : parseFloat(farmerPlotSeleced.raiAmount))
                          ? "error"
                          : ""
                      }
                      value={createNewTask?.farmAreaAmount}
                      onChange={handleAmountRai}
                      disabled={
                        current == 2 || checkSelectPlot == "error"
                      }
                    />
                    {parseFloat(createNewTask?.farmAreaAmount) >
                      (farmerPlotSeleced.raiAmount == undefined
                        ? 0
                        : parseFloat(
                            farmerPlotSeleced.raiAmount
                          )) && (
                      <p
                        style={{
                          color: color.Error,
                        }}>
                        ไม่สามารถกรอกเกินจำนวน{" "}
                        {farmerPlotSeleced.raiAmount} ไร่
                      </p>
                    )}
                  </Form.Item>
                </div>
              </div>
              <div className="row">
                <div className="form-group">
                  <label>พื้นที่แปลงเกษตร</label>
                  <Form.Item>
                    <Input
                      value={
                        (!(farmerPlotSeleced?.plotArea
                          )
                          ? ""
                          : farmerPlotSeleced?.plotArea
                              .subdistrictName + "/"
                          ) +
                        (!(farmerPlotSeleced?.plotArea)
                          ? 
                          "":
                          farmerPlotSeleced?.plotArea.districtName +
                            "/"
                            ) +
                        (!(farmerPlotSeleced?.plotArea)
                          ? 
                          "":
                          farmerPlotSeleced?.plotArea.provinceName + "/"
                          )
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
                        <Input
                          value={farmerPlotSeleced?.landmark}
                          disabled
                        />
                      </Form.Item>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {dataFarmer && (
            <CardContainer
              style={{ backgroundColor: "rgba(33, 150, 83, 0.1)" }}>
              <Form style={{ padding: "20px" }}>
                <label>ยอดรวมค่าบริการ</label>
                <br />
                {current !== 2 && (
                  <>
                    <Button
                      size="middle"
                      style={{
                        backgroundColor:
                          priceMethod == "กรอกข้อมูลเอง"
                            ? color.White
                            : color.Success,
                        color:
                          priceMethod == "กรอกข้อมูลเอง"
                            ? color.Grey
                            : color.White,
                        borderColor:
                          priceMethod == "กรอกข้อมูลเอง"
                            ? color.White
                            : color.Success,
                      }}
                      disabled={
                        current == 2 || checkSelectPlot == "error"
                      }
                      onClick={(e) => selectPrice(e)}>
                      อัตโนมัติ
                    </Button>
                    <Button
                      size="middle"
                      style={{
                        backgroundColor:
                          priceMethod == "อัตโนมัติ"
                            ? color.White
                            : color.Success,
                        color:
                          priceMethod == "อัตโนมัติ"
                            ? color.Grey
                            : color.White,
                        borderColor:
                          priceMethod == "อัตโนมัติ"
                            ? color.White
                            : color.Success,
                      }}
                      disabled={
                        current == 2 || checkSelectPlot == "error"
                      }
                      onClick={(e) => selectPrice(e)}>
                      กรอกข้อมูลเอง
                    </Button>
                  </>
                )}
                {priceMethod === "อัตโนมัติ" && (
                  <div className="row pt-3">
                    <div className="form-group col-lg-4">
                      <Form.Item>
                        <label>ค่าบริการ/ไร่</label>{" "}
                        <span style={{ color: "red" }}>*</span>
                        <Input
                          suffix="บาท/ไร่"
                          value={createNewTask.unitPriceStandard.toFixed(
                            2
                          )}
                          disabled
                          autoComplete="off"
                          step="0.01"
                        />
                      </Form.Item>
                    </div>
                    <div className="form-group col-lg-4">
                      <label>คำนวณยอดรวม</label>{" "}
                      <span style={{ color: "red" }}>*</span>
                      <Form.Item>
                        <Input
                          suffix="บาท"
                          value={createNewTask.priceStandard.toFixed(
                            2
                          )}
                          disabled
                          autoComplete="off"
                          step="0.01"
                        />
                      </Form.Item>
                    </div>
                  </div>
                )}
                {priceMethod === "กรอกข้อมูลเอง" && (
                  <div className="row pt-3">
                    <div className="form-group col-lg-4">
                      <Form.Item>
                        <label>ค่าบริการ/ไร่</label>{" "}
                        <span style={{ color: "red" }}>*</span>
                        <Input
                          suffix="บาท/ไร่"
                          id="unitPrice"
                          value={createNewTask.unitPrice}
                          onChange={handleCalServiceCharge}
                          disabled={
                            current == 2 || checkSelectPlot == "error"
                          }
                          autoComplete="off"
                          step="0.01"
                        />
                      </Form.Item>
                    </div>
                    <div className="form-group col-lg-4">
                      <label>คำนวณยอดรวม</label>{" "}
                      <span style={{ color: "red" }}>*</span>
                      <Form.Item>
                        <Input
                          suffix="บาท"
                          value={createNewTask.price}
                          onChange={handleCalServiceCharge}
                          disabled={
                            current == 2 || checkSelectPlot == "error"
                          }
                          autoComplete="off"
                          step="0.01"
                        />
                      </Form.Item>
                    </div>
                  </div>
                )}
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
          <div className="row form-group col-lg-6">
            <div className="col-lg">
              วันนัดหมาย <span style={{ color: "red" }}>*</span>
              <div>
                <DatePicker
                  format={dateFormat}
                  className="col-lg-12"
                  disabled={
                    current == 2 || checkSelectPlot == "error"
                  }
                  onChange={handleDateAppointment}
                  defaultValue={moment(dateAppointment)}
                />
              </div>
            </div>
            <div className="col-lg">
              เวลานัดหมาย <span style={{ color: "red" }}>*</span>
              <div>
                <TimePicker
                  className="col-lg-12"
                  disabled={
                    current == 2 || checkSelectPlot == "error"
                  }
                  format={timeFormat}
                  onSelect={(v) => {
                    setTimeAppointment(v);
                  }}
                  value={moment(timeAppointment)}
                />
              </div>
            </div>
          </div>
          <div className="row form-group col-lg-6">
            <label>
              ช่วงเวลาการพ่น <span style={{ color: "red" }}>*</span>
            </label>
            <Form.Item name="searchAddress">
              <Select
                placeholder="-"
                disabled={current == 2 || checkSelectPlot == "error"}
                onChange={handlePeriodSpray}
                defaultValue={createNewTask.purposeSprayId}>
                {periodSpray?.purposeSpray?.length ? (
                  periodSpray?.purposeSpray?.map((item) => (
                    <Option value={item.id}>
                      {item.purposeSprayName}
                    </Option>
                  ))
                ) : (
                  <Option>-</Option>
                )}
              </Select>
            </Form.Item>
          </div>
          <div className="row form-group col-lg-6 p-2">
            <label>
              เป้าหมายการฉีดพ่น{" "}
              <span style={{ color: "red" }}>*</span>
            </label>
            {PURPOSE_SPRAY_CHECKBOX.map((item) =>
              _.set(
                item,
                "isChecked",
                createNewTask?.targetSpray
                  .map((x) => x)
                  .find((y) => y === item.crop)
                  ? true
                  : item.isChecked
              )
            ).map((x, index) => (
              <div className="form-group">
                <input
                  type="checkbox"
                  value={x.crop}
                  disabled={
                    current == 2 || checkSelectPlot == "error"
                  }
                  onChange={handlePurposeSpray}
                  checked={x.isChecked}
                />{" "}
                <label style={{ padding: "0 8px 0 0" }}>
                  {x.crop}
                </label>
                {index == 4 && (
                  <>
                    <Input
                      status={validateComma.status}
                      className="col-lg-5"
                      disabled={current == 2 || checkCrop}
                      placeholder="โปรดระบุ เช่น เพลี้ย,หอย"
                      onChange={handleOtherSpray}
                      defaultValue={Array.from(
                        new Set(
                          createNewTask.targetSpray.filter(
                            (a) => !PURPOSE_SPRAY.some((x) => x === a)
                          )
                        )
                      )}
                    />
                    {validateComma.status == "error" && (
                      <p
                        style={{
                          color: color.Error,
                          padding: "0 0 0 55px",
                        }}>
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
              defaultValue={createNewTask.preparationBy}>
              <Space
                direction="vertical"
                onChange={handlePreparation}>
                <Radio value="เกษตรกรเตรียมยาเอง">
                  เกษตรกรเตรียมยาเอง
                </Radio>
                <Radio value="นักบินโดรนเตรียมให้">
                  นักบินโดรนเตรียมให้
                </Radio>
              </Space>
            </Radio.Group>
          </div>
          <div className="form-group">
            <label>หมายเหตุ</label>
            <TextArea
              placeholder="ระบุหมายเหตุเพื่อแจ้งนักบินโดรน เช่น เกษตรกรจะเตรียมยาให้, ฝากนักบินเลือกยาราคาไม่แพงมาให้หน่อย เป็นต้น"
              disabled={current == 2 || checkSelectPlot == "error"}
              onChange={handleComment}
              defaultValue={createNewTask.comment}
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
          dronerSelected
            ?.map((x) => x)
            .find((y) => y.droner_id === item.droner_id)
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
          icon: (
            <Checkbox value={5} onClick={(e) => onChangeRating(e)} />
          ),
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
          icon: (
            <Checkbox value={4} onClick={(e) => onChangeRating(e)} />
          ),
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
          icon: (
            <Checkbox value={3} onClick={(e) => onChangeRating(e)} />
          ),
        },
        {
          label: (
            <div style={{ color: "#FFCA37", fontSize: "16px" }}>
              <StarFilled />
              <StarFilled />
            </div>
          ),
          key: "4",
          icon: (
            <Checkbox value={2} onClick={(e) => onChangeRating(e)} />
          ),
        },
        {
          label: (
            <div style={{ color: "#FFCA37", fontSize: "16px" }}>
              <StarFilled />
            </div>
          ),
          key: "5",
          icon: (
            <Checkbox value={1} onClick={(e) => onChangeRating(e)} />
          ),
        },
      ]}
    />
  );
  const [visibleSlider, setVisibleSlider] = useState(false);
  const [visibleRating, setVisibleRating] = useState(false);
  const [distrance, setDistrance] = useState<{
    min: number;
    max: number;
  }>({
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
  const handleSelectDroner = async (e: any, data: any) => {
    let inputType = e.target.type;
    let checked = e.target.checked;
    let d: TaskSearchDroner[] = [];
    let checkDup = [];
    if (inputType == "checkbox") {
      d = dataDronerList.map((item) =>
        _.set(
          item,
          "isChecked",
          item.droner_id == data.droner_id ? checked : item.isChecked
        )
      );
    } else {
      d = dataDronerList.map((item) =>
        _.set(
          item,
          "isChecked",
          item.droner_id == data.droner_id ? checked : false
        )
      );
    }
    setDataDronerList(d);
    let checkSingleDroner = Array.from(
      new Set(
        d
          .filter((x) => x.isChecked == true)
          .map((y) => y)
          .filter(
            (z) =>
              !dronerSelected
                .map((a) => a.droner_id)
                .includes(z.droner_id)
          )
      )
    );
    checkDup =
      inputType == "checkbox"
        ? (checkDup = [
            ...dronerSelected.filter((x) => x.droner_id != ""),
            ...checkSingleDroner.filter((x) => x.droner_id != ""),
          ])
        : [...checkSingleDroner.filter((x) => x.droner_id != "")];
    setDronerSelected(
      Array.from(new Set(checkDup.filter((y) => y.isChecked))).filter(
        (x) => x.droner_id != ""
      )
    );
    checkValidateStep(
      createNewTask,
      current,
      d.filter((x) => x.isChecked == true)
    );
  };
  const handleAllSelectDroner = (e: any) => {
    let checked = e.target.checked;
    let d = dataDronerList.map((item) =>
      _.set(
        item,
        "isChecked",
        item.droner_status == "ไม่สะดวก" ||
          item.is_open_receive_task == false
          ? false
          : checked
      )
    );
    setDataDronerList(d);
    setDronerSelected(d.filter((x) => x.isChecked == true));
    checkValidateStep(
      createNewTask,
      current,
      d.filter((x) => x.isChecked == true)
    );
  };
  const callBackDronerSelected = (data: TaskSearchDroner[]) => {
    let d = dataDronerList.map((item) =>
      _.set(
        item,
        "isChecked",
        data
          ?.map((x) => x)
          .find((y) => y.droner_id === item.droner_id)
          ? true
          : false
      )
    );
    setDataDronerList(d);
    setDronerSelected(d.filter((x) => x.isChecked == true));
    setShowModalSelectedDroner((prev) => !prev);
    checkValidateStep(
      createNewTask,
      current,
      d.filter((x) => x.isChecked == true)
    );
  };
  const handleVisibleRating = (newVisible: any) => {
    setVisibleRating(newVisible);
  };

  const searchSection = (
    <div
      className="d-flex justify-content-between"
      style={{ padding: "10px" }}>
      <div className="col-lg-3 p-1">
        <Input
          prefix={<SearchOutlined style={{ color: color.Disable }} />}
          placeholder="ค้นหาชื่อเกษตรกร หรือเบอร์โทร"
          className="col-lg-12"
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
          placement="bottom">
          <Button className="col-lg-12">เลือกระยะทาง</Button>
        </Popover>
      </div>
      <div className="col-lg-2 p-1">
        <Dropdown
          overlay={ratingStar}
          trigger={["click"]}
          className="col-lg-12"
          onVisibleChange={handleVisibleRating}
          visible={visibleRating}>
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
          onChange={onChangeStatusDroner}>
          <option value="สะดวก">สะดวก</option>
          <option value="ไม่สะดวก">ไม่สะดวก</option>
        </Select>
      </div>
      <div className="col-lg-1 p-1">
        <Button
          style={{
            borderColor: color.Success,
            borderRadius: "5px",
            color: color.secondary2,
            backgroundColor: color.Success,
          }}
          onClick={() =>
            fetchDronerList(
              createNewTask.farmerId,
              createNewTask.farmerPlotId,
              dateAppointment,
              searchTextDroner,
              statusDroner,
              rating?.ratingMin,
              rating?.ratingMax
            )
          }>
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
          onClick={() => setShowModalSelectedDroner((prev) => !prev)}>
          ดูรายชื่อนักบินโดรนที่เลือก (
          {dronerSelected.filter((x) => x.isChecked != false).length})
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
                x.droner_status != "ไม่สะดวก" &&
                x.is_open_receive_task != false
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
      render: (value: any, row: any, index: number) => {
        let tooltipTitle = (
          <>
            {"เคยให้บริการเกษตรกรท่านนี้,"}
            <br />
            {"คะแนนรีวิวล่าสุด "}
            <StarFilled
              style={{ color: "#FFCA37", fontSize: "16px" }}
            />{" "}
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
              <span style={{ color: color.Grey }}>
                {row.droner_code}
              </span>
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
              <span>
                {row.total_task == null ? 0 : row.total_task} งาน
              </span>
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
                    {parseFloat(row.rating_avg).toFixed(1)} (
                    {row.count_rating})
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
                }}>
                <Badge
                  color={
                    row.is_open_receive_task == false
                      ? color.Disable
                      : row.droner_status == "สะดวก"
                      ? color.Success
                      : color.Error
                  }
                />
                {row.is_open_receive_task == false
                  ? "ปิดการใช้งาน"
                  : row.droner_status}
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
          {createNewTask.taskDronerTemp?.map((item) => (
            <div className="row pt-3">
              {item.dronerDetail[0] != "" &&
                item.dronerDetail.map((x) => (
                  <>
                    <div className="col-lg-3">
                      {JSON.parse(x).firstname}{" "}
                      {JSON.parse(x).lastname}
                      <br />
                      <p
                        style={{
                          fontSize: "12px",
                          color: color.Grey,
                        }}>
                        {JSON.parse(x).droner_code}
                      </p>
                    </div>
                    <div className="col-lg-2">
                      {JSON.parse(x).telephone_no}
                    </div>
                    <div className="col-lg-4">
                      {JSON.parse(x).subdistrict_name}/
                      {JSON.parse(x).district_name}/
                      {JSON.parse(x).province_name}
                    </div>
                    <div className="col-lg-2">
                      <Avatar
                        size={25}
                        src={JSON.parse(x).logo_drone_brand}
                        style={{ marginRight: "5px" }}
                      />
                      {JSON.parse(x).drone_brand}
                      <br />
                      <p
                        style={{
                          fontSize: "12px",
                          color: color.Grey,
                        }}>
                        {JSON.parse(x).count_drone > 1 &&
                          "(มากกว่า 1 ยี่หัอ)"}
                      </p>
                    </div>
                    <div className="col-lg-1">
                      <span
                        style={{
                          color:
                            JSON.parse(x).droner_status == "สะดวก"
                              ? color.Success
                              : color.Error,
                        }}>
                        <Badge
                          color={
                            JSON.parse(x).droner_status == "สะดวก"
                              ? color.Success
                              : color.Error
                          }
                        />
                        {JSON.parse(x).droner_status}
                        <br />
                      </span>
                    </div>
                  </>
                ))}
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
        <CardContainer
          style={{ backgroundColor: "rgba(33, 150, 83, 0.1)" }}>
          <Form style={{ padding: "20px" }}>
            <label>ยอดรวมค่าบริการ (หลังรวมค่าธรรมเนียม)</label>
            <h5 style={{ color: color.primary1 }} className="p-2">
              {numberWithCommas(createNewTask.price)} บาท
            </h5>
            <div className="row">
              <div className="form-group col-lg-4">
                <label>ค่าบริการ (ก่อนคิดค่าธรรมเนียม)</label>
                <Form.Item>
                  <Input
                    suffix="บาท"
                    value={createNewTask.price}
                    disabled={
                      current == 2 || checkSelectPlot == "error"
                    }
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
                    value={createNewTask.fee}
                    disabled={
                      current == 2 || checkSelectPlot == "error"
                    }
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
                    value={createNewTask.discountFee}
                    disabled={
                      current == 2 || checkSelectPlot == "error"
                    }
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

  const checkValidateStep = (
    data: CreateNewTaskEntity,
    currentStep?: number,
    dataDroner?: TaskSearchDroner[]
  ) => {
    if (currentStep == 0) {
      let checkEmptySting = ![
        data?.farmerId,
        data?.farmerPlotId,
        data?.purposeSprayId,
        data?.preparationBy,
        data.farmAreaAmount,
      ].includes("");
      let checkEmptyNumber = ![
        data.price,
        data.unitPrice,
        data.farmAreaAmount,
      ].includes(0);
      let checkEmptyArray = false;
      if (data?.targetSpray !== undefined) {
        checkEmptyArray =
          ![data?.targetSpray][0]?.includes("") &&
          data?.targetSpray.length !== 0 &&
          data?.targetSpray !== undefined;
      }
      let checkDateTime = ![
        dateAppointment,
        timeAppointment,
      ].includes("");
      if (
        checkEmptySting &&
        checkEmptyArray &&
        checkDateTime &&
        checkEmptyNumber
      ) {
        setDisableBtn(false);
      } else {
        setDisableBtn(true);
      }
    } else {
      let checkDroner = dataDroner?.length != 0;
      checkDroner ? setDisableBtn(false) : setDisableBtn(true);
    }
  };
  const previousStep = async () => {
    let checkCurrent = current - 1;
    if (checkCurrent == 0) {
      await checkValidateStep(createNewTask, checkCurrent);
    } else {
      fetchDronerList(
        createNewTask.farmerId,
        createNewTask.farmerPlotId,
        dateAppointment
      );
      await checkValidateStep(
        createNewTask,
        checkCurrent,
        dronerSelected
      );
    }
    setCurrent(checkCurrent);
  };
  const nextStep = () => {
    if (current == 0) {
      let changeDateFormat =
        moment(dateAppointment).format(dateCreateFormat);
      let changeTimeFormat =
        moment(timeAppointment).format(timeCreateFormat);
      let otherSprayList = [];
      if (otherSpray != undefined) {
        let m = otherSpray.split(",");
        for (let i = 0; m.length > i; i++) {
          otherSprayList.push(m[i]);
        }
      }
      createNewTask.targetSpray.push.apply(
        createNewTask.targetSpray,
        otherSprayList.filter((x) => x != "")
      );
      const payload = {
        ...createNewTask,
      };
      payload.dateAppointment = moment(
        changeDateFormat + " " + changeTimeFormat
      ).toISOString();
      payload.createBy = profile.firstname + " " + profile.lastname;
      if (priceMethod == "กรอกข้อมูลเอง") {
        payload.priceStandard = 0;
        payload.unitPriceStandard = 0;
      }
      setCreateNewTask(payload);
      checkValidateStep(
        createNewTask,
        current,
        dronerSelected.filter((x) => x.droner_id != "")
      );
    } else {
      let pushDronerList: CreateDronerTempEntity[] = [];
      for (let i: number = 0; dronerSelected.length > i; i++) {
        pushDronerList.push({
          dronerId: dronerSelected[i].droner_id,
          status: "WAIT_RECEIVE",
          dronerDetail: [JSON.stringify(dronerSelected[i])],
        });
      }
      const payload = { ...createNewTask };
      payload.taskDronerTemp = pushDronerList;
      if (selectionType == "checkbox") {
        payload.status = "WAIT_RECEIVE";
        payload.fee = payload.price * 0.05;
        payload.discountFee = payload.price * 0.05;
        setCreateNewTask(payload);
      } else {
        payload.status = "WAIT_START";
        payload.dronerId = dronerSelected[0].droner_id;
        payload.fee = payload.price * 0.05;
        payload.discountFee = payload.price * 0.05;
        setCreateNewTask(payload);
        checkValidateStep(
          payload,
          current,
          dronerSelected.filter((x) => x.droner_id != "")
        );
      }
    }
    fetchDronerList(
      createNewTask.farmerId,
      createNewTask.farmerPlotId,
      dateAppointment
    );
    checkValidateStep(
      createNewTask,
      current + 1,
      dronerSelected.filter((x) => x.droner_id != "")
    );
    setCurrent(current + 1);
  };

  const insertNewTask = async () => {
    Swal.fire({
      title: "ยืนยันการสร้างงาน",
      text: "โปรดตรวจสอบรายละเอียดที่คุณต้องการแก้ไขข้อมูลก่อนเสมอ เพราะอาจส่งผลต่อการจ้างงานในระบบ",
      cancelButtonText: "ยกเลิก",
      confirmButtonText: "ยืนยัน",
      confirmButtonColor: color.Success,
      showCancelButton: true,
      showCloseButton: true,
    }).then(async (result) => {
      console.log(result)
      if (result.isConfirmed) {
        if (selectionType == "checkbox") {
          delete createNewTask["dronerId"];
        } else {
          delete createNewTask["taskDronerTemp"];
        }
        let checkDupSpray = Array.from(
          new Set(createNewTask.targetSpray)
        );
        const d = Map(createNewTask).set(
          "targetSpray",
          checkDupSpray
        );
        setCreateNewTask(d.toJS());
        await TaskDatasource.insertNewTask(d.toJS()).then((res) => {
          console.log(d.toJS())
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
      <div className="steps-content">
        {titleStep[current].content}
      </div>
      <Row className="d-flex justify-content-between pt-2">
        {current == 0 && (
          <BackButton
            onClick={() => (window.location.href = "/IndexNewTask")}
          />
        )}
        {current > 0 && <BackButton onClick={() => previousStep()} />}
        {current < titleStep.length - 1 && (
          <Button
            style={{
              backgroundColor: disableBtn
                ? color.Grey
                : color.Success,
              borderColor: disableBtn ? color.Grey : color.Success,
              borderRadius: "5px",
              color: color.BG,
            }}
            disabled={disableBtn}
            onClick={nextStep}>
            ถัดไป
          </Button>
        )}
        {current === titleStep.length - 1 && (
          <SaveButton onClick={() => insertNewTask} />
        )}
      </Row>
    </>
  );

  return (
    <>
      <Layouts>
        <Row>
          <BackIconButton
            onClick={() => (window.location.href = "/IndexNewTask")}
          />
          <span className="pt-3">
            <strong style={{ fontSize: "20px" }}>
              เพิ่มงานบินใหม่
            </strong>
          </span>
        </Row>
        {renderStep}
      </Layouts>
      {showModalSelectedDroner && (
        <ModalSelectedDroner
          show={showModalSelectedDroner}
          dataDroner={dronerSelected}
          title="รายชื่อนักบินโดรน"
          backButton={() =>
            setShowModalSelectedDroner((prev) => !prev)
          }
          callBack={callBackDronerSelected}
        />
      )}
    </>
  );
};

export default AddNewTask;
