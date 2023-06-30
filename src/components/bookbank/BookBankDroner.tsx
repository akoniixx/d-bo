import { Checkbox, Col, Form, Image, Input, Row, Select } from "antd";
import React, { useEffect, useState } from "react";
import { color, image } from "../../resource";
import { numberWithCommas } from "../../utilities/TextFormatter";
import { CardContainer } from "../card/CardContainer";
import icon from "../../resource/icon";
import { resizeFileImg } from "../../utilities/ResizeImage";
import { DeleteOutlined } from "@ant-design/icons";
import { BookBankDatasource } from "../../datasource/BookBankDatasource";
import { DronerEntity } from "../../entities/DronerEntities";
import { CheckboxValueType } from "antd/lib/checkbox/Group";

const _ = require("lodash");
const { Map } = require("immutable");

interface BookBankDronerProps {
  callBack: (data: DronerEntity) => void;
  data: DronerEntity;
}
const BookBankDroner: React.FC<BookBankDronerProps> = ({ callBack, data }) => {
  const [form] = Form.useForm();
  const [bankImg, setBankImg] = useState<any>();
  const [bank, setBank] = useState<any>();
  const [bankName, setBankName] = useState<any>();
  const [bankImgCreate, setBankImgCreate] = useState<any>();
  const [dataBookBank, setDataBookBank] = useState<DronerEntity>(data);

  useEffect(() => {
    const getBank = async () => {
      await BookBankDatasource.getBankData().then((res) => {
        setBank(res);
      });
    };
    getBank();
  }, []);

  const onChangeImage = async (e: any) => {
    const source = e.target.files[0];
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

    setBankImg(img_base64);
    const d = Map(bankImgCreate).set(
      "file",
      isFileMoreThan2MB ? newSource : source
    );
    setBankImgCreate(d.toJS());
  };

  const onChangeBankName = (e: any) => {
    const value = Map(dataBookBank).set("bankName", e);
    setDataBookBank(value.toJS());
  };
  const onChangeBankAccountName = (e: any) => {
    const value = Map(dataBookBank).set("bankAccountName", e.target.value);
    setDataBookBank(value.toJS());
  };
  const onChangeBankAccountNumber = (e: any) => {
    const value = Map(dataBookBank).set("accountNumber", e.target.value);
    setDataBookBank(value.toJS());
  };
  const confirmData = (e:  CheckboxValueType) => {
    if (e === true) {
      const value = Map(dataBookBank).set("isConsentBookBank", true);
      setDataBookBank(value.toJS());
    } else {
      const value = Map(dataBookBank).set("isConsentBookBank", false);
      setDataBookBank(value.toJS());
    }
  };
      console.log(dataBookBank);

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
        <Form form={form} className="p-4">
          <div className="form-group">
            <label>ธนาคาร</label>
            <Form.Item name="bank">
              <Select
                placeholder="เลือกบัญชีธนาคาร"
                allowClear
                onChange={onChangeBankName}
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
            <label>ชื่อบัญชี</label>
            <Form.Item name="bankName">
              <Input
                placeholder="กรอกชื่อบัญชี"
                onChange={onChangeBankAccountName}
              />
            </Form.Item>
          </div>
          <div className="form-group ">
            <label>เลขบัญชีธนาคาร</label>
            <Form.Item name="bankNumber">
              <Input
                placeholder="กรอกกรอกเลขบัญชีธนาคาร"
                type="number"
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
                  <span>{bankImg && bankImgCreate.file.name}</span>
                </Col>
                <Col span={2} className="align-self-center">
                  <span>
                    {bankImg && (
                      <DeleteOutlined
                        style={{ fontSize: 18, color: color.Error }}
                        onClick={() => setBankImg(undefined)}
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
            <Form.Item name="bankNumber">
              <Checkbox onChange={(e:any)=> confirmData(e.target.checked)}>
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
