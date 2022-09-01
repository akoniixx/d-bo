import { DownOutlined, StarFilled } from "@ant-design/icons";
import {
  AutoComplete,
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
import { FarmerPlotEntity } from "../../../entities/FarmerPlotEntities";
import GooleMap from "../../../components/map/GoogleMap";
import { LAT_LNG_BANGKOK } from "../../../definitions/Location";
import { RowSelectionType } from "antd/lib/table/interface";
import Search from "antd/lib/input/Search";
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
const { Step } = Steps;
const { Option } = Select;
const dateFormat = "DD-MM-YYYY";
const dateCreateFormat = "YYYY-MM-DD";
const timeFormat = "HH:mm";
const timeCreateFormat = "HH:mm:ss";

const _ = require("lodash");
const { Map } = require("immutable");

let queryString = _.split(window.location.pathname, "=");

const AddNewTask = () => {
  const profile = JSON.parse(localStorage.getItem("profile") || "{  }");
  const [current, setCurrent] = useState(0);
  const [createNewTask, setCreateNewTask] = useState<CreateNewTaskEntity>(
    CreateNewTaskEntity_INIT
  );

  const [dataFarmer, setDataFarmer] = useState<FarmerEntity>();
  const [farmerList, setFarmerList] = useState<FarmerEntity[]>();
  const [farmerSelected, setFarmerSelected] = useState<FarmerEntity>();
  const [farmerPlotSeleced, setFarmerPlotSelected] =
    useState<FarmerPlotEntity>();
  const [selectionType] = useState<RowSelectionType>(queryString[1]);
  const [searchFarmer, setSearchFarmer] = useState<string>();
  const [checkSelectPlot, setCheckSelectPlot] = useState<any>("error");

  let [otherSpray, setOtherSpray] = useState<any>();
  const [cropSelected, setCropSelected] = useState<any>("");
  const [periodSpray, setPeriodSpray] = useState<CropPurposeSprayEntity>();
  const [checkCrop, setCheckCrop] = useState<boolean>(true);
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
  const [disableBtn, setDisableBtn] = useState<boolean>(true);

  const fetchFarmerList = async (text?: string) => {
    await TaskDatasource.getFarmerList(text).then((res) => {
      setFarmerList(res);
    });
  };
  const fetchPurposeSpray = async () => {
    await CropDatasource.getPurposeByCroupName(cropSelected).then((res) => {
      setPeriodSpray(res);
    });
  };

  const [dataDronerList, setDataDronerList] = useState<TaskSearchDroner[]>([
    TaskSearchDroner_INIT,
  ]);
  const [dronerSelected, setDronerSelected] = useState<TaskSearchDroner[]>([
    TaskSearchDroner_INIT,
  ]);
  const [showModalSelectedDroner, setShowModalSelectedDroner] =
    useState<boolean>(false);

  useEffect(() => {
    fetchFarmerList(searchFarmer);
    fetchPurposeSpray();
  }, [searchFarmer, cropSelected]);

  //#region Step1 & Step3
  const handleSearchFarmer = (value: any) => {
    if (value != undefined) {
      setFarmerSelected(farmerList?.filter((x) => x.id == value)[0]);
    } else {
      setFarmerSelected(undefined);
    }
  };
  const handleSelectFarmer = () => {
    const f = Map(createNewTask).set("farmerId", farmerSelected?.id);
    setCheckSelectPlot("error");
    setCreateNewTask(f.toJS());
    setDataFarmer(farmerSelected);
    checkValidateStep1(f.toJS());
  };
  const handleSelectFarmerPlot = (value: any) => {
    let plotSelected = farmerSelected?.farmerPlot.filter(
      (x) => x.id == value
    )[0];
    const f = Map(createNewTask).set("farmerPlotId", plotSelected?.id);
    const g = Map(f.toJS()).set("farmAreaAmount", plotSelected?.raiAmount);
    setCropSelected(plotSelected?.plantName);
    setCheckSelectPlot("");
    setCreateNewTask(g.toJS());
    setFarmerPlotSelected(plotSelected);
    checkValidateStep1(g.toJS());
  };
  const onSelectFarmer = (e: any) => {
    setFarmerSelected(undefined);
    const findFarmer = farmerList?.filter((x) => x.id == e)[0];
    setFarmerSelected(findFarmer);
  };
  const handlePeriodSpray = (e: any) => {
    const d = Map(createNewTask).set("purposeSprayId", e);
    setCreateNewTask(d.toJS());
    checkValidateStep1(d.toJS());
  };
  const handlePurposeSpray = (e: any) => {
    let checked = e.target.checked;
    let value = e.target.value;
    setCheckCrop(value == "อื่นๆ" ? !checked : true);
    PURPOSE_SPRAY_CHECKBOX.map((item) =>
      _.set(item, "isChecked", item.crop == value ? checked : item.isChecked)
    );
    let p: any = "";

    if (checked) {
      p = Map(createNewTask).set(
        "targetSpray",
        [...createNewTask?.targetSpray, value].filter((x) => x != "")
      );
    } else {
      let removePlant = createNewTask?.targetSpray.filter((x) => x != value);
      p = Map(createNewTask).set("targetSpray", removePlant);
    }
    setCreateNewTask(p.toJS());
    checkValidateStep1(p.toJS());
  };
  const handleOtherSpray = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim().length != 0) {
      setOtherSpray(e.target.value);
      let checkComma = checkValidateComma(e.target.value);
      if (!checkComma) {
        setValidateComma({ status: "", message: "" });
      } else {
        setValidateComma({
          status: "error",
          message: "กรุณาใช้ (,) ให้กับการเพิ่มมากกว่า 1 อย่าง",
        });
      }
    } else {
      setValidateComma({
        status: "error",
        message: "โปรดระบุ",
      });
    }
  };
  const handlePreparation = (e: any) => {
    const d = Map(createNewTask).set("preparationBy", e.target.value);
    setCreateNewTask(d.toJS());
    checkValidateStep1(d.toJS());
  };
  const handleCalServiceCharge = (e: any) => {
    if (e.target.id == "unitPrice") {
      let calUnitPrice =
        parseFloat(createNewTask.farmAreaAmount) * e.target.value;
      const d = Map(createNewTask).set("unitPrice", e.target.value);
      const pushCal = Map(d.toJS()).set("price", calUnitPrice);
      setCreateNewTask(pushCal.toJS());
    } else {
      let calUnitPrice =
        e.target.value / parseFloat(createNewTask.farmAreaAmount);
      const d = Map(createNewTask).set("price", e.target.value);
      const pushCal = Map(d.toJS()).set("unitPrice", calUnitPrice);
      setCreateNewTask(pushCal.toJS());
    }
  };
  const handleComment = (e: any) => {
    const d = Map(createNewTask).set("comment", e.target.value);
    setCreateNewTask(d.toJS());
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
  const checkValidateStep1 = (data: CreateNewTaskEntity) => {
    let checkEmptySting = ![
      data?.farmerId,
      data?.farmerPlotId,
      data?.purposeSprayId,
      data?.preparationBy,
    ].includes("");
    let checkEmptyArray = false;
    if (data?.targetSpray !== undefined) {
      checkEmptyArray =
        ![data?.targetSpray][0]?.includes("") &&
        data?.targetSpray.length !== 0 &&
        data?.targetSpray !== undefined;
    }
    let checkDateTime = ![dateAppointment, timeAppointment].includes("");
    if (checkEmptySting && checkEmptyArray && checkDateTime) {
      setDisableBtn(false);
    } else {
      setDisableBtn(true);
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
                      placeholder="ค้นหาชื่อเกษตรกร/เบอร์โทร/เลขบัตรปชช"
                      onSearch={(e: any) => setSearchFarmer(e)}
                      onSelect={onSelectFarmer}
                      onChange={handleSearchFarmer}
                      // defaultValue={farmerSelected?.firstname + ' ' + farmerSelected?.lastname}
                    >
                      {farmerList?.map((item) => (
                        <Option value={item.id}>
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
            <div className="col-lg-12">
              <div className="row">
                <div className="form-group col-lg-4">
                  <Form.Item>
                    <label>ชื่อ-นามสกุล</label>
                    <Input
                      value={dataFarmer?.firstname + " " + dataFarmer.lastname}
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
                      defaultValue={createNewTask.farmerPlotId}
                    >
                      {dataFarmer.farmerPlot.map((item) => (
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
                    <Input value={farmerPlotSeleced?.landmark} disabled />
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
                  <label>Longitude</label>
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
                        value={createNewTask.unitPrice}
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
                        value={createNewTask.price}
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
                name="dateAppointment"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกวันที่นัดหมาย!",
                  },
                ]}
              >
                <DatePicker
                  format={dateFormat}
                  className="col-lg-12"
                  disabled={current == 2 || checkSelectPlot == "error"}
                  onChange={(e: any) =>
                    setDateAppointment(
                      moment(new Date(e)).format(dateCreateFormat)
                    )
                  }
                  defaultValue={moment(dateAppointment)}
                />
              </Form.Item>
            </div>
            <div className="form-group col-lg-6">
              <label>
                เวลานัดหมาย <span style={{ color: "red" }}>*</span>
              </label>
              <Form.Item
                name="lastname"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกเวลานัดหมาย!",
                  },
                ]}
              >
                <TimePicker
                  format={timeFormat}
                  disabled={current == 2 || checkSelectPlot == "error"}
                  onChange={(e: any) =>
                    setTimeAppointment(
                      moment(new Date(e)).format(timeCreateFormat)
                    )
                  }
                  defaultValue={moment(timeAppointment, timeFormat)}
                />
              </Form.Item>
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
                defaultValue={createNewTask.purposeSprayId}
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
                  disabled={current == 2 || checkSelectPlot == "error"}
                  onChange={handlePurposeSpray}
                  checked={x.isChecked}
                />{" "}
                <label style={{ padding: "0 8px 0 0" }}>{x.crop}</label>
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
              defaultValue={createNewTask.preparationBy}
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
    farmerId: string,
    plotId: string,
    date: string
  ) => {
    await TaskSearchDronerDatasource.getTaskDronerList(
      farmerId,
      plotId,
      date
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
          icon: <Checkbox></Checkbox>,
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
          icon: <Checkbox></Checkbox>,
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
          icon: <Checkbox></Checkbox>,
        },
        {
          label: (
            <div style={{ color: "#FFCA37", fontSize: "16px" }}>
              <StarFilled />
              <StarFilled />
            </div>
          ),
          key: "4",
          icon: <Checkbox></Checkbox>,
        },
        {
          label: (
            <div style={{ color: "#FFCA37", fontSize: "16px" }}>
              <StarFilled />
            </div>
          ),
          key: "5",
          icon: <Checkbox></Checkbox>,
        },
      ]}
    />
  );
  const [visible, setVisible] = useState(false);
  const handleVisibleChange = (newVisible: any) => {
    setVisible(newVisible);
  };
  const [inputValue, setInputValue] = useState(0);
  const onChange = (newValue: any) => {
    setInputValue(newValue);
  };
  const handleSelectDroner = (e: any, data: any) => {
    let checked = e.target.checked;
    let d = dataDronerList.map((item) =>
      _.set(
        item,
        "isChecked",
        item.droner_id == data.droner_id ? checked : item.isChecked
      )
    );
    setDataDronerList(d);
    setDronerSelected(d.filter((x) => x.isChecked == true));
  };
  const handleAllSelectDroner = (e: any) => {
    let checked = e.target.checked;
    let d = dataDronerList.map((item) =>
      _.set(
        item,
        "isChecked",
        item.droner_status == "ไม่สะดวก" ? false : checked
      )
    );
    setDataDronerList(d);
    setDronerSelected(d.filter((x) => x.isChecked == true));
  };
  const callBackDronerSelected = (data: TaskSearchDroner[]) => {
    let d = dataDronerList.map((item) =>
      _.set(
        item,
        "isChecked",
        data?.map((x) => x).find((y) => y.droner_id === item.droner_id)
          ? true
          : false
      )
    );
    setDataDronerList(d);
    setDronerSelected(d.filter((x) => x.isChecked == true));
    setShowModalSelectedDroner((prev) => !prev);
  };
  const searchSection = (
    <div className="d-flex justify-content-between" style={{ padding: "10px" }}>
      <div className="col-lg-3"></div>
      <div className="col-lg-3">
        <Search
          placeholder="ค้นหาชื่อเกษตรกร หรือเบอร์โทร"
          className="col-lg-12 p-1"
        />
      </div>
      <div className="col-lg-2 pt-1">
        <Popover
          content={
            <>
              <Slider
                min={0}
                max={200}
                onChange={onChange}
                value={typeof inputValue === "number" ? inputValue : 0}
              />
              <InputNumber
                min={0}
                max={200}
                style={{
                  margin: "0 16px",
                }}
                value={inputValue}
                onChange={onChange}
              />
            </>
          }
          title="ระยะทาง (กิโลเมตร)"
          trigger="click"
          visible={visible}
          onVisibleChange={handleVisibleChange}
          placement="bottom"
        >
          <Button className="col-lg-12">เลือกระยะทาง</Button>
        </Popover>
      </div>
      <div className="col-lg-2 p-1">
        <Dropdown overlay={ratingStar} className="col-lg-12">
          <Button>
            เลือก Rating
            <DownOutlined />
          </Button>
        </Dropdown>
      </div>
      <div className="col-lg-2">
        <Select allowClear className="col-lg-12 p-1" placeholder="เลือกสถานะ">
          <option value="true">สะดวก</option>
          <option value="false">ไม่สะดวก</option>
        </Select>
      </div>
    </div>
  );
  const dronerSelectedList = (
    <div className="d-flex justify-content-end">
      <div className="p-1">
        <p>
          จำนวนนักบินโดรนที่เลือก{" "}
          {dronerSelected.filter((x) => x.isChecked != false).length} คน
        </p>
      </div>
      <div>
        <Button
          style={{
            borderColor: color.Success,
            borderRadius: "5px",
            color: color.Success,
          }}
          onClick={() => setShowModalSelectedDroner((prev) => !prev)}
        >
          ดูรายชื่อนักบินโดรนที่เลือก
        </Button>
      </div>
    </div>
  );
  const columns = [
    {
      title: (
        <input
          type={selectionType}
          onChange={handleAllSelectDroner}
          checked={dataDronerList
            .filter((x) => x.droner_status != "ไม่สะดวก")
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
                disabled={row.droner_status != "ไม่สะดวก" ? false : true}
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
        return {
          children: (
            <>
              <span>{row.firstname + " " + row.lastname}</span>
              <br />
              <span style={{ color: color.Grey }}></span>
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
              <span>{row.total_task} งาน</span>
              <br />
              <span style={{ color: color.Grey }}>
                รวม {row.total_area} ไร่
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
              {checkRating() && (
                <Row>
                  <div style={{ color: "#FFCA37", fontSize: "16px" }}>
                    <StarFilled />
                  </div>
                  <span className="pt-2 ps-1">
                    {parseFloat(row.rating_avg).toFixed(2)} ({row.count_rating})
                  </span>
                </Row>
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
      dataIndex: "role",
      key: "role",
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
                    row.droner_status == "สะดวก" ? color.Success : color.Error,
                }}
              >
                <Badge
                  color={
                    row.droner_status == "สะดวก" ? color.Success : color.Error
                  }
                />
                {row.droner_status}
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
      {dronerSelectedList}
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
                      {JSON.parse(x).firstname} {JSON.parse(x).lastname}
                      <br />
                      <p style={{ fontSize: "12px", color: color.Grey }}>
                        {JSON.parse(x).droner_code}
                      </p>
                    </div>
                    <div className="col-lg-2">{JSON.parse(x).telephone_no}</div>
                    <div className="col-lg-3">
                      {JSON.parse(x).district_name}/
                      {JSON.parse(x).subdistrict_name}/
                      {JSON.parse(x).province_name}
                    </div>
                    <div className="col-lg-2">
                      {JSON.parse(x).drone_brand}
                      <br />
                      <p style={{ fontSize: "12px", color: color.Grey }}>
                        {/* (มากกว่า 1 ยี่ห้อ) */}
                      </p>
                    </div>
                    <div className="col-lg-2">
                      <span
                        style={{
                          color:
                            JSON.parse(x).droner_status == "สะดวก"
                              ? color.Success
                              : color.Error,
                        }}
                      >
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
  //#endregion

  const nextStep = () => {
    if (current == 0) {
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
      const d = Map(createNewTask).set(
        "dateAppointment",
        moment(dateAppointment + " " + timeAppointment).toISOString()
      );
      const p = Map(d.toJS()).set(
        "createBy",
        profile.firstname + " " + profile.lastname
      );
      setCreateNewTask(p.toJS());
      fetchDronerList(
        p.toJS().farmerId,
        p.toJS().farmerPlotId,
        dateAppointment
      );
      setDisableBtn(true);
    } else {
      if (selectionType == "checkbox") {
        let pushDronerList: CreateDronerTempEntity[] = [];
        for (let i: number = 0; dronerSelected.length > i; i++) {
          pushDronerList.push({
            dronerId: dronerSelected[i].droner_id,
            status: "WAIT_RECEIVE",
            dronerDetail: [JSON.stringify(dronerSelected[i])],
          });
        }
        const s = Map(createNewTask).set("status", "WAIT_RECEIVE");
        const d = Map(s.toJS()).set("taskDronerTemp", pushDronerList);
        setCreateNewTask(d.toJS());
      }
      console.log(2);
    }
    setCurrent(current + 1);
  };

  const insertNewTask = async () => {
    console.log(createNewTask);
    if (selectionType == "checkbox") {
      delete createNewTask["dronerId"];
    } else {
      delete createNewTask["taskDronerTemp"];
    }
    await TaskDatasource.insertNewTask(createNewTask).then((res) => {
      console.log(res);
      // Swal.fire({
      //   title: "บันทึกสำเร็จ",
      //   icon: "success",
      //   timer: 1500,
      //   showConfirmButton: false,
      // }).then((time) => {
      //   window.location.href = "/IndexNewTask";
      // });
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
        {current > 0 && <BackButton onClick={() => setCurrent(current - 1)} />}
        {current < titleStep.length - 1 && (
          <Button
            style={{
              backgroundColor: disableBtn ? color.Grey : color.Success,
              borderColor: disableBtn ? color.Grey : color.Success,
              borderRadius: "5px",
              color: color.BG,
            }}
            disabled={false}
            onClick={nextStep}
          >
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
            <strong style={{ fontSize: "20px" }}>เพิ่มงานบินใหม่</strong>
          </span>
        </Row>
        {renderStep}
      </Layouts>
      {showModalSelectedDroner && (
        <ModalSelectedDroner
          show={showModalSelectedDroner}
          dataDroner={dronerSelected}
          title="รายชื่อนักบินโดรน"
          backButton={() => setShowModalSelectedDroner((prev) => !prev)}
          callBack={callBackDronerSelected}
        />
      )}
    </>
  );
};

export default AddNewTask;
