import React, { useEffect, useState } from "react";
import { Form, Input, Modal, Tag } from "antd";
import FooterPage from "../footer/FooterPage";

import TextArea from "antd/lib/input/TextArea";
import { color } from "../../resource";
import bth_img_empty from "../../resource/media/empties/upload_Img_btn.png";
import {
  FarmerPlotEntity,
  HistoryEditRaiEntity,
  HistoryFarmerPlotEntity,
} from "../../entities/FarmerPlotEntities";
import { resizeFileImg } from "../../utilities/ResizeImage";
import {
  UploadImageEntity,
  UploadImageEntity_INTI,
} from "../../entities/UploadImageEntities";
import { FarmerPlotDatasource } from "../../datasource/FarmerPlotDatasource";
import { useNavigate } from "react-router-dom";

interface ModalEditRaiAmountProps {
  show: boolean;
  backButton: () => void;
  isEditModal?: boolean;
  data: FarmerPlotEntity;
  callBackEditRai: (data?: any) => void;
  callBackReturn: (data: boolean) => void;
}
const _ = require("lodash");
const { Map } = require("immutable");
const ModalEditRaiAmount: React.FC<ModalEditRaiAmountProps> = ({
  show,
  backButton,
  isEditModal,
  data,
  callBackEditRai,
  callBackReturn,
}) => {
  const profile = JSON.parse(localStorage.getItem("profile") || "{  }");
  const [form] = Form.useForm();
  const [saveBtnDisable, setBtnSaveDisable] = useState<boolean>(true);

  const [imgPlot, setImgPlot] = useState<any>();
  const [createImgPlot, setCreateImgPlot] = useState<UploadImageEntity>(
    UploadImageEntity_INTI
  );
  const onFieldsChange = () => {
    const { file, raiAmount } = form.getFieldsValue();
    let fieldInfo = false;
    let fieldapp = false;
    let fieldimg = false;
    let fieldCateGory = false;

    if (file) {
      fieldInfo = false;
    } else {
      fieldInfo = true;
    }

    if (!file) {
      fieldimg = true;
    } else {
      fieldimg = false;
    }
    setBtnSaveDisable(fieldInfo || fieldimg);
  };

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

    setImgPlot(img_base64);
    const d = Map(createImgPlot).set(
      "file",
      isFileMoreThan2MB ? newSource : source
    );
    setBtnSaveDisable(false);
    setCreateImgPlot(d.toJS());
  };
  const onPreviewImg = async () => {
    let src = imgPlot;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(imgPlot);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  const removeImg = () => {
    setImgPlot(undefined);
    setCreateImgPlot(UploadImageEntity_INTI);
  };
  const handelCallBack = () => {
    const { reason, raiAmount } = form.getFieldsValue();
    const farmerId = data.farmerId;
    const farmerPlotId = data.id;
    const raiBefore = data.raiAmount;

    FarmerPlotDatasource.updateHistoryFarmerPlot({
      createBy: profile.firstname + " " + profile.lastname,
      farmerId: farmerId!,
      farmerPlotId: farmerPlotId!,
      file: createImgPlot.file,
      raiBefore: raiBefore!,
      raiAfter: raiAmount,
      reason: reason,
    }).then((res) => {
      callBackEditRai(res);
    });
  };

  return (
    <>
      <Modal
        width={600}
        title={
          <div
            style={{
              width: "100%",
              cursor: "move",
            }}
          >
            แก้ไขจำนวนไร่
          </div>
        }
        visible={show}
        onCancel={backButton}
        footer={[
          <FooterPage
            onClickBack={() => callBackReturn(true)}
            onClickSave={() => form.submit()}
            disableSaveBtn={saveBtnDisable}
          />,
        ]}
      >
        <Form
          key={data.plotId}
          form={form}
          onFinish={handelCallBack}
          onFieldsChange={onFieldsChange}
        >
          <div className="form-group">
            <label>
              จำนวนไร่ <span style={{ color: "red" }}>*</span>
            </label>
            <Form.Item
              name="raiAmount"
              rules={[
                {
                  required: true,
                  message: "กรุณากรอกจำนวนไร่!",
                },
                {
                  pattern: new RegExp(/^[0-9\b]+$/),
                  message: "กรุณากรอกเบอร์โทรให้ถูกต้อง!",
                },
              ]}
            >
              <Input
                placeholder="กรอกจำนวนไร่"
                autoComplete="off"
                suffix="ไร่"
              />
            </Form.Item>
          </div>
          <div className="form-group col-lg-12 pb-5">
            <label>
              อัพโหลดหลักฐาน <span style={{ color: "red" }}>*</span>
            </label>
            <Form.Item
              name="file"
              rules={[
                {
                  required: true,
                  message: "กรุณาแนบรูปหลักฐาน!",
                },
              ]}
            >
              <div className="pb-2">
                <div
                  className="hiddenFileInput"
                  style={{
                    backgroundImage: `url(${imgPlot})`,
                    display: imgPlot != undefined ? "block" : "none",
                  }}
                />
              </div>
              <div className="text-left ps-4">
                {imgPlot != undefined && (
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
                      onClick={removeImg}
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
              <div
                className="hiddenFileBtn"
                style={{
                  backgroundImage: `url(${bth_img_empty})`,
                  display: imgPlot == undefined ? "block" : "none",
                }}
              >
                <input
                  key={imgPlot}
                  type="file"
                  onChange={onChangeImg}
                  title="เลือกรูป"
                />
              </div>
            </Form.Item>
          </div>
          <div className="form-group">
            <label>หมายเหตุ</label>
            <Form.Item name="reason">
              <TextArea
                placeholder="กรอกหมายเหตุเพิ่มเติม"
                autoComplete="off"
                rows={4}
              />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default ModalEditRaiAmount;
