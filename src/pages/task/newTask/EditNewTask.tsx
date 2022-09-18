import { DownOutlined, StarFilled } from "@ant-design/icons";
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
import { CropPurposeSprayEntity } from "../../../entities/CropEntities";
import {
  FarmerEntity,
  GetFarmerEntity,
} from "../../../entities/FarmerEntities";
import { FarmerPlotEntity } from "../../../entities/FarmerPlotEntities";
import {
  GetNewTaskEntity,
  GetNewTaskEntity_INIT,
} from "../../../entities/NewTaskEntities";
import {
  TaskSearchDroner,
  TaskSearchDroner_INIT,
} from "../../../entities/TaskSearchDroner";
import { color } from "../../../resource";
import {
  TaskDronerTempEntity,
  TaskDronerTempEntity_INIT,
} from "../../../entities/TaskDronerTemp";
import ModalSelectedEditDroner from "../../../components/modal/task/newTask/ModalSelectedEditDroner";
import { numberWithCommas } from "../../../utilities/TextFormatter";
const dateFormat = "DD-MM-YYYY";
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
  const [dataFarmer, setDataFarmer] = useState<GetFarmerEntity>();
  const [farmerList, setFarmerList] = useState<FarmerEntity[]>();
  const [farmerSelected, setFarmerSelected] = useState<FarmerEntity>();
  const [farmerPlotSeleced, setFarmerPlotSelected] =
    useState<FarmerPlotEntity>();
  const [searchFarmer, setSearchFarmer] = useState<string>();
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
  const [dronerSelected, setDronerSelected] = useState<TaskDronerTempEntity[]>([
    TaskDronerTempEntity_INIT,
  ]);
  const [showModalSelectedDroner, setShowModalSelectedDroner] =
    useState<boolean>(false);

  const fetchNewTask = async () => {
    await TaskDatasource.getNewTaskById(queryString[1]).then((res) => {
      console.log(res);
      res.data.taskDronerTemp.map((item) => _.set(item, "isChecked", true));
      setDronerSelected(res.data.taskDronerTemp);
      setDateAppointment(res.data.dateAppointment);
      setTimeAppointment(res.data.dateAppointment);
      setFarmerPlotSelected(res.data.farmerPlot);
      setData(res);
    });
  };
  const fetchFarmerList = async (text?: string) => {
    await TaskDatasource.getFarmerList(text).then((res) => {
      setFarmerList(res);
    });
  };
  const fetchPurposeSpray = async () => {
    await CropDatasource.getPurposeByCroupName(
      data.data.farmerPlot.plantName
    ).then((res) => {
      setPeriodSpray(res);
    });
  };
  useEffect(() => {
    fetchNewTask();
    fetchFarmerList(searchFarmer);
    fetchPurposeSpray();
  }, [searchFarmer]);

  //#region step 1
  const handleSearchFarmer = (value: any, id: any) => {
    if (value != undefined) {
      setFarmerSelected(farmerList?.filter((x) => x.id == id.id)[0]);
    } else {
      setFarmerSelected(undefined);
    }
  };
  const onSelectFarmer = (e: any, id: any) => {
    setFarmerSelected(undefined);
    const findFarmer = farmerList?.filter((x) => x.id == id.id)[0];
    setFarmerSelected(findFarmer);
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
                      value={
                        data.data.farmer.firstname +
                        " " +
                        data.data.farmer.lastname
                      }
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
                >
                  เลือกเกษตรกร
                </Button>
              </div>
            </div>
          )}

          <div className="col-lg-12" key={data.data.farmer?.id}>
            <div className="row">
              <div className="form-group col-lg-4">
                <Form.Item>
                  <label>ชื่อ-นามสกุล</label>
                  <Input
                    value={
                      data.data.farmer?.firstname +
                      " " +
                      data.data.farmer?.lastname
                    }
                    disabled
                  />
                </Form.Item>
              </div>
              <div className="form-group col-lg-4">
                <label>เบอร์โทร</label>
                <Form.Item>
                  <Input value={data.data.farmer?.telephoneNo} disabled />
                </Form.Item>
              </div>
            </div>
            <div className="row">
              <div className="form-group col-lg-4">
                <label>แปลง</label>
                <Form.Item>
                  <Select placeholder="เลือกแปลง" disabled={current == 2}>
                    {dataFarmer?.farmerPlot.map((item) => (
                      <option value={item.id}>{item.plotName}</option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
              <div className="form-group col-lg-4">
                <label>พืชที่ปลูก</label>
                <Form.Item>
                  <Input value={data.data.farmerPlot?.plantName} disabled />
                </Form.Item>
              </div>
              <div className="form-group col-lg-4">
                <label>จำนวนไร่</label>
                <Form.Item>
                  <Input value={data.data.farmerPlot?.raiAmount} disabled />
                </Form.Item>
              </div>
            </div>
            <div className="row">
              <div className="form-group">
                <label>พื้นที่แปลงเกษตร</label>
                <Form.Item>
                  <Input value={data.data.farmerPlot?.landmark} disabled />
                </Form.Item>
              </div>
            </div>
            <div className="row">
              <div className="form-group col-lg-6">
                <Form.Item>
                  <label>Latitude (ละติจูด)</label>
                  <Input value={data.data.farmerPlot?.lat} disabled />
                </Form.Item>
              </div>
              <div className="form-group col-lg-6">
                <label>Longitude</label>
                <Form.Item>
                  <Input value={data.data.farmerPlot?.long} disabled />
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
                    data.data.farmerPlot?.lat != undefined
                      ? parseFloat(data.data.farmerPlot.lat)
                      : LAT_LNG_BANGKOK.lat
                  }
                  lng={
                    data.data.farmerPlot?.long != undefined
                      ? parseFloat(data.data.farmerPlot.long)
                      : LAT_LNG_BANGKOK.lng
                  }
                />
                <div className="row">
                  <div className="form-group">
                    <label>จุดสังเกต</label>
                    <Form.Item>
                      <Input value={data.data.farmerPlot?.landmark} disabled />
                    </Form.Item>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <CardContainer style={{ backgroundColor: "rgba(33, 150, 83, 0.1)" }}>
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
                      value={data.data.unitPrice}
                      disabled
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
                      value={data.data.price}
                      disabled
                    />
                  </Form.Item>
                </div>
              </div>
            </Form>
          </CardContainer>
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
                  disabled={current == 2}
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
                  disabled={current == 2}
                  onChange={(e: any) =>
                    setTimeAppointment(
                      moment(new Date(e)).format(timeCreateFormat)
                    )
                  }
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
                key={data.data.purposeSprayId}
                placeholder="-"
                disabled={current == 2}
                defaultValue={data.data.purposeSprayId}
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
                data.data?.targetSpray
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
                  disabled={current == 2}
                  checked={x.isChecked}
                />{" "}
                <label style={{ padding: "0 8px 0 0" }}>{x.crop}</label>
                {index == 4 && (
                  <>
                    <Input
                      className="col-lg-5"
                      disabled={current == 2}
                      placeholder="โปรดระบุ เช่น เพลี้ย,หอย"
                      defaultValue={Array.from(
                        new Set(
                          data.data.targetSpray.filter(
                            (a) => !PURPOSE_SPRAY.some((x) => x === a)
                          )
                        )
                      ).join(",")}
                    />
                    {/* {validateComma.status == "error" && (
                      <p style={{ color: color.Error, padding: "0 0 0 55px" }}>
                        {validateComma.message}
                      </p>
                    )} */}
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
              disabled={current == 2}
              value={data.data.preparationBy}
            >
              <Space direction="vertical">
                <Radio value="เกษตรกรเตรียมยาเอง">เกษตรกรเตรียมยาเอง</Radio>
                <Radio value="นักบินโดรนเตรียมให้">นักบินโดรนเตรียมให้</Radio>
              </Space>
            </Radio.Group>
          </div>
          <div className="form-group">
            <label>หมายเหตุ</label>
            <TextArea
              placeholder="ระบุหมายเหตุเพื่อแจ้งนักบินโดรน เช่น เกษตรกรจะเตรียมยาให้, ฝากนักบินเลือกยาราคาไม่แพงมาให้หน่อย เป็นต้น"
              disabled={current == 2}
              value={data.data.comment}
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
  const handleSelectDroner = async (e: any, data: any) => {
    let inputType = e.target.type;
    let checked = e.target.checked;
    let d: TaskSearchDroner[] = [];
    console.log(data);
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
          .filter((z) => dronerSelected.map((a) => a.dronerId != z.droner_id))
      )
    );
    let checkDup = [...dronerSelected.filter((x) => x.dronerId != "")];
    let checkDupNew = [
      Array.from(new Set(checkSingleDroner)).filter((x) => x.droner_id != ""),
    ];
    console.log(checkDup);
    console.log(checkDupNew[0]);

    // setDronerSelected(
    //   Array.from(new Set(checkDup)).filter((x) => x.id != "")
    // );
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
  const callBackDronerSelected = (data: TaskDronerTempEntity[]) => {
    let d = dataDronerList.map((item) =>
      _.set(
        item,
        "isChecked",
        data?.map((x) => x).find((y) => y.dronerId === item.droner_id)
          ? true
          : false
      )
    );
    setDataDronerList(d);
    setDronerSelected(d.filter((x) => x.isChecked == true));
  };
  const handleVisibleRating = (newVisible: any) => {
    setVisibleRating(newVisible);
  };

  const searchSection = (
    <div className="d-flex justify-content-between" style={{ padding: "10px" }}>
      <div className="col-lg-3">
        <Search
          placeholder="ค้นหาชื่อเกษตรกร หรือเบอร์โทร"
          className="col-lg-12 p-1"
          onChange={(e: any) => setSearchTextDroner(e.target.value)}
        />
      </div>
      <div className="col-lg-2 pt-1">
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
              data.data.farmerId,
              data.data.farmerPlotId,
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
                disabled={
                  selectionType == "checkbox"
                    ? row.droner_status != "ไม่สะดวก"
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
                    {parseFloat(row.rating_avg).toFixed(2)} ({row.count_rating})
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
          {data.data.taskDronerTemp?.map((item) => (
            <div className="row pt-3">
              {item?.dronerDetail[0] != "" && (
                <>
                  {/* <>
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
                  </> */}
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
              {numberWithCommas(parseFloat(data.data.price))} บาท
            </h5>
            <div className="row">
              <div className="form-group col-lg-4">
                <label>ค่าบริการ (ก่อนคิดค่าธรรมเนียม)</label>
                <Form.Item>
                  <Input
                    suffix="บาท"
                    value={data.data.price}
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
                    value={data.data.fee}
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
                    value={data.data.discountFee}
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
    console.log(current);
    if (current == 0) {
    } else {
    }
    fetchDronerList(
      data.data.farmerId,
      data.data.farmerPlotId,
      dateAppointment
    );
    setCurrent(current + 1);
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
              backgroundColor: color.Success,
              borderColor: color.Success,
              borderRadius: "5px",
              color: color.BG,
            }}
            onClick={nextStep}
          >
            ถัดไป
          </Button>
        )}
        {current === titleStep.length - 1 && (
          <SaveButton
            onClick={() => (nextStep)}
          />
        )}
      </Row>
    </>
  );

  return (
    <>
      <Layouts key={data.data.id}>
        <Row>
          <BackIconButton
            onClick={() => (window.location.href = "/IndexNewTask")}
          />
          <span className="pt-3">
            <strong style={{ fontSize: "20px" }}>แก้ไขงานบินใหม่</strong>
          </span>
        </Row>
        {renderStep}
      </Layouts>
      {showModalSelectedDroner && (
        <ModalSelectedEditDroner
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
export default EditNewTask;
