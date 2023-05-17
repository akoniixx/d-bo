import {
  Button,
  Form,
  Input,
  Radio,
  RadioChangeEvent,
  Row,
  Select,
  Space,
  Tag,
} from "antd";
import { Option } from "antd/lib/mentions";
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
import { color, image } from "../../../resource";
import { formats, modules } from "../../../components/editor/EditorToolbar";
import Layouts from "../../../components/layout/Layout";
import { BackIconButton } from "../../../components/button/BackButton";
import { FooterPage } from "../../../components/footer/FooterPage";

const { Map } = require("immutable");

function AddReward() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [imgReward, setImgReward] = useState<any>();
  const [createImgReward, setCreateImgReward] = useState<UploadImageEntity>(
    UploadImageEntity_INTI
  );
  const [rewardType, setRewardType] = useState<string | null>(null);
  const [points, setPoints] = useState<string | null>(null);

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
  const handleRewardType = (type: string) => {
    setRewardType(type);
    setPoints(type);
  };

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
                    imgReward == undefined ? image.empty_img : imgReward
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
              <Form.Item
                name="type"
                rules={[
                  {
                    required: true,
                    message: "กรุณาเลือกประเภทของรางวัล!",
                  },
                ]}
              >
                <Select
                  className="col-lg-12 p-1"
                  placeholder="เลือกประเภทของรางวัล"
                  onChange={handleRewardType}
                  showSearch
                  value={rewardType}
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
                  <Option value={"PHYSICAL"}>Physical</Option>
                  <Option value={"DIGITAL"}>Digital</Option>
                </Select>
              </Form.Item>
            </div>
            <div className="form-group col-lg-6">
              <label>
                การแลกเปลี่ยน <span style={{ color: "red" }}>*</span>
              </label>
              <div className="row">
                <div className="col-12">
                  <Form.Item name="points">
                    {rewardType === "DIGITAL" ? (
                      <Radio.Group>
                        <Radio value={"POINTS"}>ใช้คะแนน</Radio>
                        <Radio value={"MISSION"}>ภารกิจ</Radio>
                      </Radio.Group>
                    ) : (
                      <Radio.Group>
                        <Radio value={"POINTS"}>ใช้คะแนน</Radio>
                        <Radio value={"MISSION"}>ภารกิจ</Radio>
                      </Radio.Group>
                    )}
                  </Form.Item>
                </div>
              </div>
            </div>
          </div>
          {rewardType === "DIGITAL" ? (
            <div className="row">
              <div className="form-group col-lg-6">
                <label>
                  จำนวน <span style={{ color: "red" }}>*</span>
                </label>
                <Form.Item
                  name="count"
                  rules={[
                    {
                      required: true,
                      message: "กรุณากรอกจำนวน!",
                    },
                  ]}
                >
                  <Input placeholder="กรอกจำนวน" autoComplete="off" />
                </Form.Item>
              </div>
            </div>
          ) : (
            <div className="row">
              <div className="form-group col-lg-6">
                <label>
                  คะแนนที่ต้องใช้แลก <span style={{ color: "red" }}>*</span>
                </label>
                <Form.Item
                  name="redeem"
                  rules={[
                    {
                      required: true,
                      message: "กรุณากรอกคะแนนที่ต้องการใช้แลก!",
                    },
                  ]}
                >
                  <Input
                    placeholder="กรอกคะแนนที่ต้องใช้แลก"
                    autoComplete="off"
                  />
                </Form.Item>
              </div>
              <div className="form-group col-lg-6">
                <label>
                  จำนวน <span style={{ color: "red" }}>*</span>
                </label>
                <Form.Item
                  name="count"
                  rules={[
                    {
                      required: true,
                      message: "กรุณากรอกจำนวน!",
                    },
                  ]}
                >
                  <Input placeholder="กรอกจำนวน" autoComplete="off" />
                </Form.Item>
              </div>
            </div>
          )}

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
      <Row>
        <BackIconButton
          onClick={() => {
            navigate(-1);
          }}
        />
        <span className="pt-3">
          <strong style={{ fontSize: "20px" }}>เพิ่มของรางวัล</strong>
        </span>
      </Row>
      <Row className="d-flex justify-content-around">
        {renderDataReward}
        {renderRedeem}
      </Row>
      <FooterPage onClickBack={() => navigate(-1)} />
    </Layouts>
  );
}

export default AddReward;
