import { SearchOutlined } from "@ant-design/icons";
import {
  Badge,
  Button,
  DatePicker,
  Divider,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Space,
  Tag,
  TimePicker,
} from "antd";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import {
  UploadImageEntity,
  UploadImageEntity_INTI,
} from "../../../entities/UploadImageEntities";
import { resizeFileImg } from "../../../utilities/ResizeImage";
import { CardContainer } from "../../../components/card/CardContainer";
import { CardHeader } from "../../../components/header/CardHearder";
import color from "../../../resource/color";
import { formats, modules } from "../../../components/editor/EditorToolbar";
import Layouts from "../../../components/layout/Layout";
import { BackIconButton } from "../../../components/button/BackButton";
import FooterPage from "../../../components/footer/FooterPage";
import { image } from "../../../resource";
import moment from "moment";

const { Map } = require("immutable");

function EditReward() {
  const points = 'POINTS';
  
  const dateFormat = "DD/MM/YYYY";
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [imgReward, setImgReward] = useState<any>();
  const [createImgReward, setCreateImgReward] = useState<UploadImageEntity>(
    UploadImageEntity_INTI
  );
  const onChangeImg = async (file: any) => {
    const source = file.target.files[0];
    let newSource: any;

    const isFileMoreThan2MB = source.size > 2 * 1024 * 1024;
    if (isFileMoreThan2MB) {
      newSource = await resizeFileImg({
        file: source,
        compressFormat: source?.type.split("/")[1],
        quality: 70,
        rotation: 0,
        responseUriFunc: (res: any) => {},
      });
    }
    const img_base64 = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(isFileMoreThan2MB ? newSource : source);
      reader.onload = () => resolve(reader.result);
    });

    setImgReward(img_base64);
    const d = Map(createImgReward).set(
      "file",
      isFileMoreThan2MB ? newSource : source
    );
    setCreateImgReward(d.toJS());
  };
  const onPreviewImg = async () => {
    let src = imgReward;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(imgReward);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  const onRemoveImg = () => {
    setImgReward(undefined);
    setCreateImgReward(UploadImageEntity_INTI);
  };
  //mock data
  const data = [
    { key: "1", title: "รหัส: 12345671", status: "แลกสำเร็จ" },
    { key: "2", title: "รหัส: 12345672", status: "แลกสำเร็จ" },
    { key: "3", title: "รหัส: 12345673", status: "แลกสำเร็จ" },
    { key: "4", title: "รหัส: 12345674", status: "แลกสำเร็จ" },
    { key: "5", title: "รหัส: 12345675", status: "แลกสำเร็จ" },
    { key: "6", title: "รหัส: 12345676", status: "แลกสำเร็จ" },
    { key: "7", title: "รหัส: 12345677", status: "แลกสำเร็จ" },
    { key: "8", title: "รหัส: 12345678", status: "แลกสำเร็จ" },
    { key: "9", title: "รหัส: 12345679", status: "รอแลก" },
    { key: "10", title: "รหัส: 12345680", status: "รอแลก" },
  ];
  const renderDataReward = (
    <div className="col-lg-7">
      <CardContainer>
        <CardHeader textHeader="ข้อมูลของรางวัล" />
        <Form>
          <div>
            <div className="form-group text-center" style={{ marginTop: "5%" }}>
              <div
                className="hiddenFileInput"
                style={{
                  backgroundImage: `url(${
                    imgReward == undefined ? image.drone : imgReward
                  })`,
                }}
              >
                <input type="file" onChange={onChangeImg} title="เลือกรูป" />
              </div>
              <div>
                {imgReward != undefined && (
                  <>
                    <Tag
                      color={color.Success}
                      onClick={onPreviewImg}
                      style={{
                        cursor: "pointer",
                        borderRadius: "5px",
                      }}
                    >
                      View
                    </Tag>
                    <Tag
                      color={color.Error}
                      onClick={onRemoveImg}
                      style={{
                        cursor: "pointer",
                        borderRadius: "5px",
                      }}
                    >
                      Remove
                    </Tag>
                  </>
                )}
              </div>
            </div>
          </div>
        </Form>
        <Form form={form} style={{ padding: 30 }}>
          <div className="form-group col-lg-12">
            <label>
              ชื่อของรางวัล <span style={{ color: "red" }}>*</span>
            </label>
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "กรุณากรอกชื่อของรางวัล!",
                },
              ]}
            >
              <Input placeholder="กรอกชื่อของรางวัล" autoComplete="off" />
            </Form.Item>
          </div>
          <div className="row">
            <div className="form-group col-lg-6">
              <label>
                ประเภทของรางวัล <span style={{ color: "red" }}>*</span>
              </label>
              <p>Digital</p>
            </div>
            <div className="form-group col-lg-6">
              <label>
                การแลกเปลี่ยน <span style={{ color: "red" }}>*</span>
              </label>
              <p>ใช้คะแนน</p>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-lg-6">
              <label>
                คะแนนที่ต้องใช้แลก <span style={{ color: "red" }}>*</span>
              </label>
              <p>5,000 คะแนน</p>
            </div>
            <div className="form-group col-lg-6">
              <label>
                จำนวน
                <span style={{ color: "red" }}>
                  {` (ต้องไม่น้อยกว่าที่แลกไป)`}
                </span>{" "}
                <span style={{ color: "red" }}>*</span>
              </label>

              <Form.Item
                name="type"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกจำนวน!",
                  },
                ]}
              >
                <Input
                  placeholder="กรอกจำนวน"
                  autoComplete="off"
                  defaultValue={100}
                />
              </Form.Item>
            </div>
            {points === "POINTS" && (
            <>
              <Divider />
              <p style={{ color: color.Error }}>ช่วงเวลาที่สามารถแลกได้</p>
              <div className="row">
                <div className="col-lg-6">
                  <label>
                    วันเริ่มต้น<span style={{ color: color.Error }}>*</span>
                  </label>
                  <div className="d-flex">
                    <Form.Item
                      name="startDate"
                      rules={[
                        {
                          required: true,
                          message: "กรุณากรอกวันที่!",
                        },
                      ]}
                    >
                      <DatePicker
                        placeholder="เลือกวันที่"
                        format={dateFormat}
                        // onChange={}
                      />
                    </Form.Item>
                    <Form.Item
                      name="startTime"
                      initialValue={moment("00:00", "HH:mm")}
                    >
                      <TimePicker
                        format={"HH:mm"}
                        className="ms-3"
                        placeholder="เลือกเวลา"
                        defaultValue={moment("00:00", "HH:mm")}
                        allowClear={false}
                      />
                    </Form.Item>
                  </div>
                </div>
                <div className="col-lg-6">
                  <label>
                    วันสิ้นสุด<span style={{ color: color.Error }}>*</span>
                  </label>
                  <div className="d-flex">
                    <Form.Item
                      name="endDate"
                      rules={[
                        {
                          required: true,
                          message: "กรุณากรอกวันที่!",
                        },
                      ]}
                    >
                      <DatePicker
                        placeholder="เลือกวันที่"
                        format={dateFormat}
                        // onChange={}
                      />
                    </Form.Item>
                    <Form.Item
                      name="endTime"
                      initialValue={moment("23:59", "HH:mm")}
                    >
                      <TimePicker
                        format={"HH:mm"}
                        className="ms-3"
                        placeholder="เลือกเวลา"
                        defaultValue={moment("00:00", "HH:mm")}
                        allowClear={false}
                      />
                    </Form.Item>
                  </div>
                </div>
              </div>
              <Divider />
            </>
           )}
          </div>
          <div className="row py-4">
            <div className="form-group col-lg-12">
              <label>
                รายละเอียด (จะแสดงใน Application){" "}
                <span style={{ color: "red" }}>*</span>
              </label>
              <Form.Item
                name="description"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกรายละเอียด",
                  },
                ]}
              >
                <ReactQuill
                  className="react-editor"
                  theme="snow"
                  // onChange={handleDescriptionEditor}
                  placeholder={"กรอกรายละเอียด"}
                  modules={modules}
                  formats={formats}
                />
              </Form.Item>
            </div>
          </div>
          <div className="row py-4">
            <div className="form-group col-lg-12">
              <label>
                เงื่อนไข (จะแสดงใน Application)
                <span style={{ color: "red" }}>*</span>
              </label>
              <Form.Item
                name="description"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกรายละเอียด",
                  },
                ]}
              >
                <ReactQuill
                  className="react-editor"
                  theme="snow"
                  // onChange={handleDescriptionEditor}
                  placeholder={"กรอกรายละเอียด"}
                  modules={modules}
                  formats={formats}
                />
              </Form.Item>
            </div>
          </div>
          <Divider />
          <div className="row">
            <div className="form-group col-lg-12 d-flex flex-column">
              <label>
                สถานะ<span style={{ color: "red" }}> *</span>
              </label>
              <Form.Item name="status">
                <Radio.Group className="d-flex flex-column">
                  <Radio value={"ACTIVE"}>ใช้งาน</Radio>
                  <Radio value={"INACTIVE"}>ปิดใช้งาน</Radio>
                </Radio.Group>
              </Form.Item>
            </div>
          </div>
        </Form>
      </CardContainer>
    </div>
  );
  const renderRedeem = (
    <div className="col-lg-4">
      <CardContainer>
        <div
          style={{
            backgroundColor: color.Success,
            borderRadius: "12px 12px 0px 0px",
            padding: "10px 10px 10px 10px",
          }}
        >
          <h4
            className="pt-2 ps-3"
            style={{ color: "white", textAlign: "center" }}
          >
            ตัวอย่างในแอปพลิเคชัน
          </h4>
        </div>
        <Form>
          <div
            className="container text-center"
            style={{ padding: "80px" }}
          ></div>
        </Form>
      </CardContainer>
    </div>
  );

  return (
    <Layouts>
      <div className="container d-flex justify-content-between pt-1">
        <div className="pt-1">
          <BackIconButton
            onClick={() => {
              navigate(-1);
            }}
          />
        </div>
        <div className="col-lg-12 pt-4">
          <strong style={{ fontSize: "20px" }}>แก้ไขของรางวัล</strong>
        </div>
      </div>

      <Row className="d-flex justify-content-around">
        {renderDataReward}
        {renderRedeem}
      </Row>
      <FooterPage
        onClickBack={() => navigate(-1)}
        // onClickSave={updateReward}
        // disableSaveBtn={saveBtnDisable}
      />
    </Layouts>
  );
}

export default EditReward;
