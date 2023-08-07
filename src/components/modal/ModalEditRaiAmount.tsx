import React, { useEffect, useState } from "react";
import { Form, Input, Modal, Tag } from "antd";
import FooterPage from "../footer/FooterPage";

import TextArea from "antd/lib/input/TextArea";
import { color } from "../../resource";
import bth_img_empty from "../../resource/media/empties/upload_Img_btn.png";
import { FarmerPlotEntity } from "../../entities/FarmerPlotEntities";

interface ModalEditRaiAmountProps {
  show: boolean;
  backButton: () => void;
  isEditModal?: boolean;
  data: FarmerPlotEntity;
  callBackEditRai: (data: FarmerPlotEntity) => void;
}
const ModalEditRaiAmount: React.FC<ModalEditRaiAmountProps> = ({
  show,
  backButton,
  isEditModal,
  data,
  callBackEditRai,
}) => {
  const [form] = Form.useForm();
  const [saveBtnDisable, setBtnSaveDisable] = useState<boolean>(
    isEditModal ? false : true
  );
  const [imgEvidence, setImgEvidence] = useState<any>();
  const checkValidate = (data: FarmerPlotEntity) => {
    let checkEmpty = ![data.raiAmount].includes("");
    let checkEmptyNumber = ![data.plotAreaId].includes(0);
    if (checkEmpty && checkEmptyNumber) {
      setBtnSaveDisable(false);
    } else {
      setBtnSaveDisable(true);
    }
  };
  const onFieldsChange = () => {
    const valuesForm = form.getFieldsValue();
    checkValidate(valuesForm);
  };
  const handelCallBack = async (values: any) => {
    const payload = {
      ...values,
      plotId: data.id,
    };
    callBackEditRai(payload);
    console.log(payload);
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
            <div className="pb-2">
              <div
                className="hiddenFileInput"
                style={{
                  backgroundImage: `url(${imgEvidence})`,
                  display: imgEvidence != undefined ? "block" : "none",
                }}
              />
            </div>
            <div className="text-left ps-4">
              {imgEvidence != undefined && (
                <>
                  <Tag
                    color={color.Success}
                    // onClick={onPreviewIdCard}
                    style={{
                      cursor: "pointer",
                      borderRadius: "5px",
                    }}
                  >
                    View
                  </Tag>
                  <Tag
                    color={color.Error}
                    // onClick={removeImgIdCard}
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
                display: imgEvidence == undefined ? "block" : "none",
              }}
            >
              <input
                key={imgEvidence}
                type="file"
                // onChange={onChangeIdCard}
                title="เลือกรูป"
              />
            </div>
          </div>
          <div className="form-group">
            <label>
              หมายเหตุ <span style={{ color: "red" }}>*</span>
            </label>
            <Form.Item
              name="reason"
              rules={[
                {
                  required: true,
                  message: "กรอกหมายเหตุเพิ่มเติม!",
                },
              ]}
            >
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
