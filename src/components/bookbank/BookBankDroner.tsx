import { Checkbox, Col, Form, Input, Row, Select } from "antd";
import React, { useEffect, useState } from "react";
import { color, image } from "../../resource";
import { validateNumber } from "../../utilities/TextFormatter";
import { CardContainer } from "../card/CardContainer";
import icon from "../../resource/icon";
import { resizeFileImg } from "../../utilities/ResizeImage";
import { DeleteOutlined } from "@ant-design/icons";
import { BookBankDatasource } from "../../datasource/BookBankDatasource";
import { DronerEntity, DronerEntity_INIT } from "../../entities/DronerEntities";
import { DronerDatasource } from "../../datasource/DronerDatasource";
import { UploadImageDatasouce } from "../../datasource/UploadImageDatasource";
import {
  ImageEntity_INTI,
  UploadImageEntity,
  UploadImageEntity_INTI,
} from "../../entities/UploadImageEntities";

const _ = require("lodash");
const { Map } = require("immutable");

interface BookBankDronerProps {
  callBack: (data: DronerEntity) => void;
  data: DronerEntity;
  dronerId: string;
}
const BookBankDroner: React.FC<BookBankDronerProps> = ({
  callBack,
  data,
  dronerId,
}) => {
  const [form] = Form.useForm();
  const [formTable] = Form.useForm();
  const [bankImg, setBankImg] = useState<any>();
  const [bank, setBank] = useState<any>();
  // const [defaultData, setDefaultData] =
  //   useState<DronerEntity>(data);
  const [bankImgCreate, setBankImgCreate] =
    useState<UploadImageEntity>(ImageEntity_INTI);
  const [dataBookBank, setDataBookBank] = useState<DronerEntity>(data);
  const [imgName, setImagName] = useState<any>();
  const [accountNum, setAccountNum] = useState<any>();

  useEffect(() => {
    const getBank = async () => {
      await BookBankDatasource.getBankData().then((res) => {
        setBank(res);
      });
    };
    getBank();
  }, []);
  useEffect(() => {
    const getDronerById = async () => {
      await DronerDatasource.getDronerByID(dronerId).then((res) => {
        setImagName(res.file.find((x) => x.category === "BOOK_BANK")?.fileName);
        const getPathPro = res.file.find((x) => x.category === "BOOK_BANK");
        getPathPro &&
          UploadImageDatasouce.getImage(getPathPro?.path).then((resImg) => {
            resImg?.url && setBankImg(resImg.url);
          });
      });
    };
    getDronerById();
  }, []);

  const onChangeImage = async (file: any) => {
    let src = file.target.files[0];
    src = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(src);
      reader.onload = () => resolve(reader.result);
    });
    setBankImg(src);
    const d = Map(bankImgCreate).set("file", file.target.files[0]);
    const e = Map(d.toJS()).set("resource", "DRONER");
    const f = Map(e.toJS()).set("category", "BOOK_BANK");
    const g = Map(f.toJS()).set("path", "");
    setBankImgCreate(g.toJS());
    const pushImg = Map(dataBookBank).set("file", [
      ...dataBookBank.file.filter((x) => x.file != ""),
      g.toJS(),
    ]);
    setDataBookBank(pushImg.toJS());
    checkValidate(pushImg.toJS());
  };
  const onPreviewImg = async () => {
    let src = bankImg;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(bankImg);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  const removeImg = () => {
    const getImg =
      data.file && data.file.filter((x) => x.category === "BOOK_BANK")[0];
    if (getImg !== undefined) {
      UploadImageDatasouce.deleteImage(getImg.id, getImg.path).then(
        (res) => {}
      );
    }
    setBankImgCreate(ImageEntity_INTI);
    setBankImg(undefined);
    setImagName(undefined);
  };
  const onChangeBankName = (e: any) => {
    const value = Map(dataBookBank).set("bankName", e);
    setDataBookBank(value.toJS());
    checkValidate(value.toJS());
  };
  const onChangeBankAccountName = (e: any) => {
    const value = Map(dataBookBank).set("bankAccountName", e.target.value);
    setDataBookBank(value.toJS());
    checkValidate(value.toJS());
  };

  const confirmData = (e: any) => {
    const value = Map(dataBookBank).set("isConsentBookBank", e.target.checked);
    setDataBookBank(value.toJS());
    checkValidate(value.toJS());
  };

  const checkNumber = (e: React.ChangeEvent<HTMLInputElement>, name: any) => {
    const { value: inputValue } = e.target;
    const convertedNumber = validateNumber(inputValue);
    form.setFieldsValue({ [name]: convertedNumber });
    const value = Map(dataBookBank).set("accountNumber", convertedNumber);
    setDataBookBank(value.toJS());
    checkValidate(value.toJS());
  };
  const checkValidate = async (data: DronerEntity) => {
    let payload: any = {};
    payload.id = data.id;
    payload.accountNumber = dataBookBank.accountNumber;
    callBack(data);
  };

  return (
    <div className="col-lg">
      <CardContainer>
        <div
          style={{
            backgroundColor: color.Success,
            borderRadius: "12px 12px 0px 0px",
            padding: "10px 10px 10px 10px",
          }}
          className="d-flex justify-content-between"
        >
          <h4 className="pt-2 ps-3" style={{ color: "white" }}>
            ข้อมูลธนาคาร
          </h4>
          <div className="pt-2">
            <img
              src={icon.arrowDownWhite}
              style={{ width: "16px", height: "9px" }}
            />
          </div>
        </div>
        <Form form={form} key={data.id} className="p-4">
          <div className="form-group">
            <label>
              ธนาคาร
              <span style={{ color: "red" }}>*</span>
            </label>
            <Form.Item
              name="bankName"
              rules={[
                {
                  required: true,
                  message: "กรุณาเลือกบัญชีธนาคาร!",
                },
              ]}
            >
              <Select
                placeholder="เลือกบัญชีธนาคาร"
                allowClear
                onChange={onChangeBankName}
                defaultValue={
                  !data?.bankName ? (
                    <p style={{ color: color.Disable }}>เลือกบัญชีธนาคาร</p>
                  ) : (
                    data?.bankName
                  )
                }
              >
                {bank?.map((item: any, index: any) => (
                  <option key={index} value={item.bankName}>
                    {item.bankName}
                  </option>
                ))}
              </Select>
            </Form.Item>
          </div>
          <div className="form-group ">
            <label>
              ชื่อบัญชี
              <span style={{ color: "red" }}>*</span>
            </label>
            <Form.Item
              name="bankAccountName"
              rules={[
                {
                  required: true,
                  message: "กรุณากรอกชื่อบัญชี!",
                },
              ]}
            >
              <Input
                defaultValue={data?.bankAccountName}
                placeholder="กรอกชื่อบัญชี"
                autoComplete="off"
                onChange={onChangeBankAccountName}
              />
            </Form.Item>
          </div>
          <div className="form-group ">
            <label>
              เลขบัญชีธนาคาร
              <span style={{ color: "red" }}>*</span>
            </label>
            <Form.Item
              name="accountNumber"
              rules={[
                {
                  required: true,
                  message: "กรุณากรอกเลขบัญชีธนาคาร!",
                },

                {
                  pattern: new RegExp(/^[0-9\b]+$/),
                  message: "กรุณากรอกเลขบัญชีธนาคารให้ถูกต้อง!",
                },
              ]}
            >
              <Input
                placeholder="กรอกกรอกเลขบัญชีธนาคาร"
                autoComplete="off"
                defaultValue={data?.accountNumber}
                onChange={(e) => checkNumber(e, "accountNumber")}
              />
            </Form.Item>
          </div>
          <div className="form-group pb-3">
            <label className="pb-2">รูปถ่ายหน้าสมุดบัญชีธนาคาร</label>
            <div>
              <Row
                style={{
                  border: bankImg && "dotted",
                  borderWidth: bankImg && 0.5,
                  borderRadius: bankImg && "8px",
                  width: bankImg && "100%",
                  height: bankImg && 90,
                  paddingLeft: bankImg && 5,
                }}
                gutter={8}
              >
                <Col
                  span={6}
                  className="align-self-center"
                  onClick={onPreviewImg}
                >
                  <span
                    style={{
                      backgroundImage: `url(${bankImg})`,
                      display: bankImg != undefined ? "block" : "none",
                      width: "65px",
                      height: "65px",
                      overflow: "hidden",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      backgroundSize: "100%",
                      cursor: "pointer",
                    }}
                  />
                </Col>
                <Col span={14} className="align-self-center">
                  <span>{(bankImg && bankImgCreate.file.name) || imgName}</span>
                </Col>
                <Col span={2} className="align-self-center">
                  <span>
                    {bankImg && (
                      <DeleteOutlined
                        style={{ fontSize: 18, color: color.Error }}
                        onClick={removeImg}
                      />
                    )}
                  </span>
                </Col>
              </Row>
            </div>
            <div
              className="hiddenFileBtn"
              style={{
                backgroundImage: `url(${image.upload_Img_btn})`,
                display: bankImg == undefined ? "block" : "none",
              }}
            >
              <input
                key={bankImg}
                type="file"
                onChange={onChangeImage}
                title="เลือกรูป"
              />
            </div>
          </div>
          <div className="form-group ">
            <label>เงื่อนไขพิเศษ</label>
            <Form.Item name="isConsentBookBank">
              <Checkbox
                onChange={confirmData}
                defaultChecked={data?.isConsentBookBank}
              >
                <span style={{ fontWeight: "lighter" }}>
                  ยินยอมให้โอนเงินเข้าชื่อบัญชีบุคคล ที่ไม่ใช่ชื่อบัญชีของคุณเอง
                </span>
              </Checkbox>
            </Form.Item>
          </div>
        </Form>
      </CardContainer>
    </div>
  );
};

export default BookBankDroner;
