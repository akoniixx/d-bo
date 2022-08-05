import {
  DownOutlined,
  StarFilled,
} from "@ant-design/icons";
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
import { FarmerEntity, FarmerEntity_INIT } from "../../../entities/FarmerEntities";
import { FarmerPlotEntity } from "../../../entities/FarmerPlotEntities";
import GooleMap from "../../../components/map/GoogleMap";
import { LAT_LNG_BANGKOK } from "../../../definitions/Location";
import { RowSelectionType } from "antd/lib/table/interface";
import Search from "antd/lib/input/Search";
const { Step } = Steps;
const { Option } = Select;
const dateFormat = "YYYY-MM-DD";
const timeFormat = "HH:mm";

const _ = require("lodash");
const { Map } = require("immutable");

let queryString = _.split(window.location.pathname, "=");

const AddNewTask = () => {
  const [data, setData] = useState<FarmerEntity>();
  const [current, setCurrent] = useState(0);
  const [farmerList, setFarmerList] = useState<FarmerEntity[]>();

  const [farmerSelected, setFarmerSelected] = useState<FarmerEntity>();
  const [farmerPlotSeleced, setFarmerPlotSelected] =
    useState<FarmerPlotEntity>();
  const [selectionType] = useState<RowSelectionType>(queryString[1]);
  const [text, setText] = useState<string>();

  const sprayList = ["หญ้า", "ฮอร์โมน", "แมลง", "เชื้อรา"];

  const fetchFarmerList = async (text?: string) => {
    await TaskDatasource.getFarmerList(text).then((res) => {
      console.log(res);
      setFarmerList(res);
    });
  };

  useEffect(() => {
    fetchFarmerList(text);
  }, [text]);

  //#region Step1 & Step3
  const handleSearchFarmer = (value: any) => {
    console.log(value);
    if (value != undefined) {
      setFarmerSelected(farmerList?.filter((x) => x.id == value)[0]);
    } else {
      setFarmerSelected(undefined);
    }
  };
  const handleSelectFarmer = () => {
    console.log(farmerSelected);
    setData(farmerSelected);
  };
  const handleSelectFarmerPlot = (value: any) => {
    setFarmerPlotSelected(
      farmerSelected?.farmerPlot.filter((x) => x.id == value)[0]
    );
  };

  const onSelectFarmer = (e: any) => {
    console.log("need", e);
    //setText("");
    setFarmerSelected(undefined);
    const findFarmer = farmerList?.filter((x) => x.id == e)[0];
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
                      placeholder="ค้นหาชื่อเกษตรกร/เบอร์โทร/เลขบัตรปชช"
                      onSearch={(e: any) => setText(e)}
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
          {data && (
            <div className="col-lg-12">
              <div className="row">
                <div className="form-group col-lg-4">
                  <Form.Item>
                    <label>ชื่อ-นามสกุล</label>
                    <Input
                      value={data?.firstname + " " + data.lastname}
                      disabled
                    />
                  </Form.Item>
                </div>
                <div className="form-group col-lg-4">
                  <label>เบอร์โทร</label>
                  <Form.Item>
                    <Input value={data?.telephoneNo} disabled />
                  </Form.Item>
                </div>
              </div>
              <div className="row">
                <div className="form-group col-lg-4">
                  <label>แปลง</label>
                  <Form.Item>
                    <Select
                      placeholder="เลือกแปลง"
                      onChange={handleSelectFarmerPlot}
                      disabled={current == 2}
                    >
                      {data.farmerPlot.map((item) => (
                        <option value={item.id}>{item.plotName}</option>
                      ))}
                    </Select>
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
                  <label>พื่นที่แปลงเกษตร</label>
                  <Form.Item>
                    <Input value={farmerPlotSeleced?.landmark} disabled />
                  </Form.Item>
                </div>
              </div>
              <div className="row">
                <div className="form-group col-lg-12">
                  <GooleMap
                    width="100%"
                    height="350px"
                    zoom={17}
                    lat={farmerPlotSeleced?.lat != undefined ? parseFloat(farmerPlotSeleced.lat) : LAT_LNG_BANGKOK.lat}
                    lng={farmerPlotSeleced?.long != undefined ? parseFloat(farmerPlotSeleced.long) : LAT_LNG_BANGKOK.lng}
                  ></GooleMap>
                </div>
              </div>
            </div>
          )}
        </Form>
      </div>
    </CardContainer>
  );
  //#region Appointment

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
                name="firstname"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกวันที่นัดหมาย!",
                  },
                ]}
              >
                <DatePicker
                  defaultValue={moment("2015-06-06", dateFormat)}
                  className="col-lg-12"
                  disabled={current == 2}
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
                  defaultValue={moment("12:08", timeFormat)}
                  format={timeFormat}
                  disabled={current == 2}
                />
              </Form.Item>
            </div>
          </div>
          <div className="row form-group col-lg-6">
            <label>
              ช่วงเวลาการพ่น <span style={{ color: "red" }}>*</span>
            </label>
            <Form.Item name="searchAddress">
              <Select placeholder="-" disabled={current == 2}></Select>
            </Form.Item>
          </div>
          <div className="row form-group col-lg-6 p-2">
            <label>
              เป้าหมายการฉีดพ่น <span style={{ color: "red" }}>*</span>
            </label>
            <Checkbox.Group options={sprayList} disabled={current == 2} />
            <Checkbox.Group options={["อื่นๆ"]} disabled={current == 2} />
          </div>
          <div className="row form-group col-lg-6 p-2">
            <label>
              การเตรียมยา <span style={{ color: "red" }}>*</span>
            </label>
            <Radio.Group disabled={current == 2}>
              <Space direction="vertical">
                <Radio value="เกษตรกรเตรียมยาเอง">เกษตรกรเตรียมยาเอง</Radio>
                <Radio value="นักบินโดรนเตรียมให้">นักบินโดรนเตรียมให้</Radio>
              </Space>
            </Radio.Group>
          </div>
        </Form>
      </div>
    </CardContainer>
  );
  //#endregion

  //#endregion

  //#region Step2
  const mockData = [
    { firstname: "ไหม", telephone: "0938355808", amountService: 5 },
    { firstname: "สายไหม", telephone: "0938355808", amountService: 10 },
  ];
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
        <p>จำนวนนักบินโดรนที่เลือก {0} คน</p>
      </div>
      <div>
        <Button
          style={{
            borderColor: color.Success,
            borderRadius: "5px",
            color: color.Success,
          }}
        >
          ดูรายชื่อนักบินโดรนที่เลือก
        </Button>
      </div>
    </div>
  );
  const columns = [
    {
      title: "ชื่อนักบินโดรน",
      dataIndex: "firstname",
      key: "firstname",
    },
    {
      title: "เบอร์โทร",
      dataIndex: "telephone",
      key: "telephone",
    },
    {
      title: "จำนวนให้บริการ",
      dataIndex: "amountService",
      key: "amountService",
    },
    {
      title: "Rating",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "ตำบล",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "อำเภอ",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "จังหวัด",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "ยี่หัอ",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "สะดวก/ไม่สะดวก",
      dataIndex: "role",
      key: "role",
    },
  ];
  const renderDronerList = (
    <>
      {searchSection}
      {dronerSelectedList}
      <CardContainer>
        <Table
          rowSelection={{
            type: selectionType,
          }}
          columns={columns}
          dataSource={mockData}
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
          <div className="row pt-3">
            <div className="col-lg-3">
              บินไปให้สุด
              <br />
              <p style={{ fontSize: "12px", color: color.Grey }}>ID25648-96</p>
            </div>
            <div className="col-lg-2">0938355808</div>
            <div className="col-lg-3">คลองเตย/คลองตัน/กรุงเทพฯ</div>
            <div className="col-lg-2">
              DJI
              <br />
              <p style={{ fontSize: "12px", color: color.Grey }}>
                (มากกว่า 1 ยี่ห้อ)
              </p>
            </div>
            <div className="col-lg-2">
              <Badge color={color.Success} />
              สะดวก
            </div>
          </div>
        </div>
      </Form>
    </CardContainer>
  );
  //#endregion

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
              backgroundColor: color.Success,
              borderColor: color.Success,
              borderRadius: "5px",
              color: color.BG,
            }}
            onClick={() => setCurrent(current + 1)}
          >
            ถัดไป
          </Button>
        )}
        {current === titleStep.length - 1 && <SaveButton onClick={() => (window.location.href = "/IndexNewTask")}/>}
      </Row>
    </>
  );

  return (
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
  );
};

export default AddNewTask;
