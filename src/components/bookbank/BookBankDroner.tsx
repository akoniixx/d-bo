import { Checkbox, Col, Form, Image, Input, Row, Select } from "antd";
import React, { useEffect, useState } from "react";
import { color, image } from "../../resource";
import { numberWithCommas } from "../../utilities/TextFormatter";
import { CardContainer } from "../card/CardContainer";
import icon from "../../resource/icon";
import { resizeFileImg } from "../../utilities/ResizeImage";
import { DeleteOutlined } from "@ant-design/icons";
import { BookBankDatasource } from "../../datasource/BookBankDatasource";
import {
  BookBankEntities,
  BookBankEntities_INIT,
  DronerEntity,
  DronerEntity_INIT,
} from "../../entities/DronerEntities";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
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
  const [bankImg, setBankImg] = useState<any>();
  const [bank, setBank] = useState<any>();
  const [defaultData, setDefaultData] =
    useState<DronerEntity>(DronerEntity_INIT);
  const [bankImgCreate, setBankImgCreate] =
    useState<UploadImageEntity>(ImageEntity_INTI);
  const [dataBookBank, setDataBookBank] =
    useState<DronerEntity>(DronerEntity_INIT);
  const [imgName, setImagName] = useState<any>();

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
        setDefaultData(res);
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
  const removeImg = () => {
    const getImg =
      defaultData.file &&
      defaultData.file.filter((x) => x.category === "BOOK_BANK")[0];
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
  const onChangeBankAccountNumber = (e: any) => {
    const value = Map(dataBookBank).set("accountNumber", e.target.value);
    setDataBookBank(value.toJS());
    checkValidate(value.toJS());
  };

  const confirmData = (e: CheckboxChangeEvent) => {
    const value = Map(dataBookBank).set("isConsentBookBank", e.target.checked);
    setDataBookBank(value.toJS());
    checkValidate(value.toJS());
  };

  const checkValidate = async (data: DronerEntity) => {
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
            <Image
              src={icon.arrowDownWhite}
              style={{ width: "16px", height: "9px" }}
            />
          </div>
        </div>
        <Form form={form} key={defaultData?.id} className="p-4">
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
                defaultValue={defaultData?.bankName}
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
                defaultValue={defaultData?.bankAccountName}
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
              ]}
            >
              <Input
                placeholder="กรอกกรอกเลขบัญชีธนาคาร"
                type="number"
                autoComplete="off"
                defaultValue={defaultData?.accountNumber}
                onChange={onChangeBankAccountNumber}
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
                <Col span={6} className="align-self-center">
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
                defaultChecked={defaultData?.isConsentBookBank}
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
