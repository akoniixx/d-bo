import { SearchOutlined } from "@ant-design/icons";
import { Button, Divider, Form, Input, Modal, Select, Table } from "antd";
import React, { useState } from "react";
import { color } from "../../resource";
import TextArea from "antd/lib/input/TextArea";
import { AddQuotaRedeemHisEntity } from "../../entities/QuotaReportEntities";

interface ModalQuotaRedeemProps {
  show: boolean;
  backButton: () => void;
  data: any;
  callBack: (data: AddQuotaRedeemHisEntity) => void;
  editIndex: any;
}
const ModalQuotaRedeem: React.FC<ModalQuotaRedeemProps> = ({
  show,
  backButton,
  data,
  callBack,
  editIndex,
}) => {
  const [dataQuota, setDataQuota] =
    useState<AddQuotaRedeemHisEntity>(editIndex);

  const handelCallBack = async () => {
    callBack(dataQuota);
  };

  return (
    <>
      <Modal
        key={data}
        width={575}
        title="เพิ่มรางวัลที่ได้รับ"
        footer={false}
        visible={show}
        onCancel={backButton}
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
              onChange={(e) => {
                // setRewardName(e.target.value);
              }}
            />
          </Form.Item>
        </div>
        <div className="form-group col-lg-12">
          <label>
            เลือกรอบที่จับรางวัล <span style={{ color: "red" }}>*</span>
          </label>
          <Form.Item
            name="rewardName"
            rules={[
              {
                required: true,
                message: "กรุณาเลือกรอบรางวัลที่จับ!",
              },
            ]}
          >
            <Select placeholder="เลือกรอบรางวัลที่จับ" />
          </Form.Item>
        </div>
        <div className="form-group col-lg-12">
          <label>หมายเหตุ</label>
          <Form.Item
            name="rewardName"
            rules={[
              {
                required: true,
                message: "กรุณากรอกชื่อของรางวัล!",
              },
            ]}
          >
            <TextArea rows={6} placeholder="กรอกหมายเหตุ" />
          </Form.Item>
        </div>
        <Divider
          style={{
            marginBottom: "20px",
          }}
        />
        <div className="d-flex justify-content-between ">
          <Button
            style={{
              borderColor: color.Success,
              color: color.Success,
            }}
            onClick={() => {
              // setShowModal(!showModal);
            }}
          >
            ยกเลิก
          </Button>
          <Button
            style={{
              borderColor: color.Success,
              backgroundColor: color.Success,
              color: color.White,
            }}
            //   onClick={() => updateRewardReceive}
          >
            บันทึก
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default ModalQuotaRedeem;
