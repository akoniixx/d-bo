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

interface ModalEditRaiAmountProps {
  show: boolean;
  backButton: () => void;
  isEditModal?: boolean;
  data: FarmerPlotEntity;
  callBackEditRai: (data: FarmerPlotEntity) => void;
}
const _ = require("lodash");
const { Map } = require("immutable");
const ModalEditRaiAmount: React.FC<ModalEditRaiAmountProps> = ({
  show,
  backButton,
  isEditModal,
  data,
  callBackEditRai,
}) => {
  const profile = JSON.parse(localStorage.getItem("profile") || "{  }");

  const [form] = Form.useForm();
  const [saveBtnDisable, setBtnSaveDisable] = useState<boolean>(
    isEditModal ? false : true
  );
  const [img, setImg] = useState<any>();
  const [createImg, setCreateImg] = useState<UploadImageEntity>(
    UploadImageEntity_INTI
  );
  const checkValidate = (data: HistoryEditRaiEntity) => {
    let checkEmpty = ![data.raiAfter, !data.file].includes("");
    if (checkEmpty) {
      setBtnSaveDisable(false);
    } else {
      setBtnSaveDisable(true);
    }
  };
  const onFieldsChange = () => {
    const valuesForm = form.getFieldsValue();
    checkValidate(valuesForm);
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

    setImg(img_base64);
    const d = Map(createImg).set(
      "file",
      isFileMoreThan2MB ? newSource : source
    );
    setCreateImg(d.toJS());
  };
  const onPreviewImg = async () => {
    let src = img;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  const removeImg = () => {
    setImg(undefined);
    setCreateImg(UploadImageEntity_INTI);
  };
  const handelCallBack = async (values: any) => {
    const payload = {
      ...values,
      farmerId: data.farmerId,
      plotId: data.id,
      raiBefore: data.raiAmount,
      createBy: profile.firstname + " " + profile.lastname,
      file: createImg ? createImg.file : undefined,
    };
    console.log(payload);
    if (payload) {
      FarmerPlotDatasource.updateHistoryFarmerPlot(payload).then((res) => {
        console.log(res);
      });
    }

    // callBackEditRai(payload);
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
            onClickBack={backButton}
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
            <br />
            <Form.Item name="file">
              <div className="pb-2">
                <div
                  className="hiddenFileInput"
                  style={{
                    backgroundImage: `url(${img})`,
                    display: img != undefined ? "block" : "none",
                  }}
                />
              </div>
              <div className="text-left ps-4">
                {img != undefined && (
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
                  display: img == undefined ? "block" : "none",
                }}
              >
                <input
                  key={img}
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
