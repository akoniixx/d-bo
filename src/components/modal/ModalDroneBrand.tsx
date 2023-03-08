import { Form, Input, Modal, Radio, Select, Space, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { DroneDatasource } from "../../datasource/DroneDatasource";
import {
  CreateDroneBrandEntity,
  CreateDroneEntity,
  DroneBrandEntity,
} from "../../entities/DroneBrandEntities";
import { DroneEntity } from "../../entities/DroneEntities";
import { DronerDroneEntity } from "../../entities/DronerDroneEntities";
import { UploadImageEntity } from "../../entities/UploadImageEntities";
import FooterPage from "../footer/FooterPage";
import { UploadImageDatasouce } from "../../datasource/UploadImageDatasource";
import { REASON_IS_CHECK } from "../../definitions/Reason";

const _ = require("lodash");
const { Map } = require("immutable");

interface ModalDroneProps {
  show: boolean;
  backButton: () => void;
  callBack: (data: CreateDroneEntity) => void;
  data: CreateDroneEntity;
  editIndex: number;
  title: string;
  isEditModal?: boolean;
}
const ModalDroneBrand: React.FC<ModalDroneProps> = ({
  show,
  backButton,
  callBack,
  data,
  editIndex,
  isEditModal = false,
  title,
}) => {
  const [form] = Form.useForm();
  const [dataDrone, setDataDrone] = useState<CreateDroneEntity>(data);
  const [droneList, setDroneList] = useState<CreateDroneBrandEntity[]>();
  const [droneId, setdroneId] = useState<string>();
  const [seriesDrone, setSeriesDrone] = useState<DroneEntity[]>();
  const [searchSeriesDrone, setSearchSeriesDrone] = useState<DroneEntity[]>();
  const [saveBtnDisable, setBtnSaveDisable] = useState<boolean>(
    isEditModal ? false : true
  );
  const [imgLicenseDroner, setImgLicenseDroner] = useState<any>(false);
  const fetchDrone = async () => {
    await DroneDatasource.getDroneBrandList().then((res) => {
      setDroneList(res.data);
    });
  };
  const fetchDroneSeries = async () => {
    await DroneDatasource.getDroneList(1, 500, droneId).then((res) => {
      setSeriesDrone(res.data);
      setSearchSeriesDrone(res.data);
    });
  };

  useEffect(() => {
    fetchDrone();
    fetchDroneSeries();
  }, [droneId]);

  const handleSeries = (value: any) => {
    !value.target.value ? setBtnSaveDisable(true) : setBtnSaveDisable(false);
    const m = Map(dataDrone).set("series", value.target.value);
    const s = Map(m.toJS()).set("isActive", true);
    console.log(m.toJS());
    setDataDrone(s.toJS());
  };

  const handleCallBack = async (values: CreateDroneEntity) => {
    const payload = {
      ...dataDrone,
      ...values,
      droneId: editIndex,
    };
    callBack(payload);
  };

  return (
    <>
      <Modal
        title={
          <div
            style={{
              width: "100%",
              cursor: "move",
            }}
          >
            {title}
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
        <Form key={data.droneId} form={form} onFinish={handleCallBack}>
          <div className="form-group">
            <label>
              ชื่อรุ่นโดรน <span style={{ color: "red" }}>*</span>
            </label>
            {isEditModal ? (
              <Form.Item
                name="series"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกชื่อรุ่นโดรน",
                  },
                ]}
              >
                <Input
                  placeholder="กรอกชื่อรุ่นโดรน"
                  allowClear
                  onChange={handleSeries}
                  defaultValue={dataDrone.series}
                />

                <Radio.Group
                  defaultValue={dataDrone.isActive}
                  style={{ marginTop: 20 }}
                >
                  <label>
                    สถานะ <span style={{ color: "red" }}>*</span>
                  </label>
                  <br />
                  <Space direction="vertical" style={{ marginTop: 10 }}>
                    <Radio value={true}>ใช้งาน</Radio>
                    <Radio value={false}>ปิดการใช้งาน</Radio>
                  </Space>
                </Radio.Group>
              </Form.Item>
            ) : (
              <Form.Item
                name="series"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกชื่อรุ่นโดรน",
                  },
                ]}
              >
                <Input
                  placeholder="กรอกชื่อรุ่นโดรน"
                  allowClear
                  onChange={handleSeries}
                  defaultValue={dataDrone.series}
                />
              </Form.Item>
            )}
          </div>
        </Form>
      </Modal>
    </>
  );
};
export default ModalDroneBrand;
