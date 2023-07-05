import { SearchOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Select, Table } from "antd";
import React, { useEffect, useState } from "react";
import { color } from "../../resource";
import TextArea from "antd/lib/input/TextArea";
import { AddQuotaRedeemHisEntity } from "../../entities/QuotaReportEntities";
import FooterPage from "../footer/FooterPage";

interface ModalQuotaRedeemProps {
  round: any;
  show: boolean;
  backButton: () => void;
  data: AddQuotaRedeemHisEntity;
  callBack: (data: AddQuotaRedeemHisEntity) => void;
  editIndex?: any;
  isEditModal?: boolean;
}
const ModalQuotaRedeem: React.FC<ModalQuotaRedeemProps> = ({
  round,
  show,
  backButton,
  data,
  callBack,
  editIndex,
  isEditModal = false,
}) => {
  const [form] = Form.useForm();
  const [saveBtnDisable, setBtnSaveDisable] = useState<boolean>(
    isEditModal ? false : true
  );
  const rewardRound = [];
  for (let i = 1; i <= round; i++) {
    rewardRound.push(i);
  }
  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        ...data,
      });
    }
  }, [data, form, isEditModal]);
  const checkValidate = (data: AddQuotaRedeemHisEntity) => {
    let checkEmpty = ![data.rewardName, data.roundNo].includes("");
    let checkNo = ![data.roundNo].includes(undefined);
    if (checkEmpty && checkNo) {
      setBtnSaveDisable(false);
    } else {
      setBtnSaveDisable(true);
    }
  };
  const onFieldsChange = () => {
    const valuesForm = form.getFieldsValue();
    checkValidate(valuesForm);
  };
  const handelCallBack = async (value: AddQuotaRedeemHisEntity) => {
    callBack(value);
  };

  return (
    <>
      <Modal
        key={data.id}
        width={575}
        title="เพิ่มรางวัลที่ได้รับ"
        visible={show}
        onCancel={backButton}
        footer={[
          <div className="d-flex justify-content-between p-3 ">
            <Button
              style={{
                borderColor: color.Success,
                color: color.Success,
              }}
              onClick={backButton}
            >
              ยกเลิก
            </Button>
            <Button
              style={{
                borderColor: saveBtnDisable ? color.Disable : color.Success,
                backgroundColor: saveBtnDisable ? color.Disable : color.Success,
                color: saveBtnDisable ? color.Grey : color.White,
              }}
              disabled={saveBtnDisable}
              onClick={() => form.submit()}
            >
              บันทึก
            </Button>
          </div>,
        ]}
      >
        <Form
          key={data.id}
          form={form}
          onFinish={handelCallBack}
          onFieldsChange={onFieldsChange}
        >
          <div className="form-group col-lg-12">
            <label>
              ชื่อของรางวัล <span style={{ color: "red" }}>*</span>
            </label>
            <Form.Item
              name="rewardName"
              rules={[
                {
                  required: true,
                  message: "กรุณากรอกชื่อของรางวัล!",
                },
              ]}
            >
              <Input
                placeholder="กรอกชื่อของรางวัล"
                autoComplete="off"
                defaultValue={data.rewardName ? data.rewardName : undefined}
              />
            </Form.Item>
          </div>
          <div className="form-group col-lg-12">
            <label>
              เลือกรอบที่จับรางวัล <span style={{ color: "red" }}>*</span>
            </label>
            <Form.Item
              name="roundNo"
              rules={[
                {
                  required: true,
                  message: "กรุณาเลือกรอบรางวัลที่จับ!",
                },
              ]}
            >
              <Select allowClear placeholder="เลือกรอบรางวัลที่จับ">
                {rewardRound.map((number) => (
                  <Select.Option value={number}>{number}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>
          <div className="form-group col-lg-12">
            <label>หมายเหตุ</label>
            <Form.Item name="description">
              <TextArea
                rows={6}
                placeholder="กรอกหมายเหตุ"
                defaultValue={data.description ? data.description : undefined}
              />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default ModalQuotaRedeem;
