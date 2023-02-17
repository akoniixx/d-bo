import { SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Modal,
  Radio,
  RadioChangeEvent,
  Table,
} from "antd";
import React, { useEffect, useState } from "react";
import { color } from "../../resource";
import FooterPage from "../footer/FooterPage";

interface ModalMapPlotProps {
  show: boolean;
  backButton: () => void;
  title: string;
  isEditModal?: boolean;
  callBack: (data: any) => void;
}
const ModalEditLocationPrice: React.FC<ModalMapPlotProps> = ({
  show,
  backButton,
  title,
  isEditModal,
  callBack,
}) => {
  const [form] = Form.useForm();
  const [data, setData] = useState<any>();
  const [value, setValue] = useState(1);
  const [searchText, setSearchText] = useState<string>();
  const [saveBtnDisable, setBtnSaveDisable] = useState<boolean>(
    isEditModal ? false : true
  );

  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  const checkValidate = (data: any) => {
    let checkEmpty = ![data].includes("");
    let checkEmptyNumber = ![data].includes(0);
    if (checkEmpty && checkEmptyNumber) {
      setBtnSaveDisable(false);
    } else {
      setBtnSaveDisable(true);
    }
  };
  const handelCallBack = async (values: any) => {
    console.log(values);
  };
  const onFieldsChange = () => {
    const valuesForm = form.getFieldsValue();
    checkValidate(valuesForm);
  };
  const handlePriceByCrop = (e: React.ChangeEvent<HTMLInputElement>) => {};
  const changeTextSearch = (searchText: any) => {
    setSearchText(searchText.target.value);
  };
  const fetchCrop = async () => {};

  const dataSource = [
    {
      crop: "นาข้าว1",
    },
    {
      crop: "นาข้าว2",
    },
    {
      crop: "นาข้าว3",
    },
    {
      crop: "นาข้าว4",
    },
  ];
  const columns = [
    {
      title: "ชื่อพืช",
      dataIndex: "crop",
      key: "crop",
    },
    {
      title: "ราคา",
      dataIndex: "price",
      key: "price",
      width: "65%",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div className="flex-row justify-content-between">
              <Input
                autoComplete="off"
                suffix="บาท"
                onChange={handlePriceByCrop}
              />
            </div>
          ),
        };
      },
    },
  ];
  return (
    <>
      <Modal
        width={575}
        title={
          <div
            style={{
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
        <Form
          key={"/"}
          form={form}
          onFinish={handelCallBack}
          onFieldsChange={onFieldsChange}
        >
          <div className="form-group">
            <label style={{ color: "#636E72" }}>
              โปรดตรวจสอบราคาการฉีดพ่นก่อนที่จะกดบันทึกเสมอ
              เพราะอาจจะทำให้ราคาฉีดพ่น ของอำเภอ และตำบลทั้งหมดเปลี่ยนแปลงตาม
              อาจจะส่งผลต่อการจ้างงานในระบบ
            </label>
          </div>
          <div className="p-1"></div>
          <div className="form-group col-lg-12">
            <label>
              ราคา <span style={{ color: "red" }}>*</span>
            </label>
            <div className="row pt-2">
              <Radio.Group onChange={onChange} value={value}>
                <Radio value={1}>ใช้ราคาเท่ากันทั้งหมด</Radio>
                <Radio value={2}>กำหนดรายพืช</Radio>
                {value === 2 ? (
                  <div className="pt-1">
                    <div className="row col-lg-12 pb-3 pt-2">
                      <div className="col-lg-10">
                        <Input
                          allowClear
                          prefix={
                            <SearchOutlined style={{ color: color.Disable }} />
                          }
                          placeholder="ค้นหาชื่อพืช"
                          onChange={changeTextSearch}
                        />
                      </div>
                      <div className="col-lg-2">
                        <Button
                          style={{
                            borderColor: color.Success,
                            borderRadius: "5px",
                            color: color.secondary2,
                            backgroundColor: color.Success,
                            padding: 6,
                            paddingTop: 4,
                          }}
                          onClick={fetchCrop}
                        >
                          ค้นหาข้อมูล
                        </Button>
                      </div>
                    </div>

                    <Table
                      dataSource={dataSource}
                      columns={columns}
                      pagination={false}
                      scroll={{ x: 0, y: 300 }}
                    />
                  </div>
                ) : (
                  <div className="pt-2">
                    <Form.Item
                      name=""
                      rules={[
                        {
                          pattern: new RegExp(/^[0-9\b]+$/),
                          message: "กรุณากรอกราคาให้ถูกต้อง!",
                        },
                      ]}
                    >
                      <Input autoComplete="off" suffix="บาท" />
                    </Form.Item>
                  </div>
                )}
              </Radio.Group>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default ModalEditLocationPrice;
