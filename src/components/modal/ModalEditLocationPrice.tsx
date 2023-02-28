import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  Modal,
  Radio,
  RadioChangeEvent,
  Select,
  Space,
  Table,
} from "antd";
import FooterPage from "../footer/FooterPage";
import {
  AllLocatePriceEntity,
  LocationPricePageEntity,
  PricePlantsEntity,
  UpdateLocationPrice,
  UpdateLocationPriceList,
  UpdateLocationPriceList_INIT,
  UpdateLocationPrice_INIT,
} from "../../entities/LocationPrice";
import { LocationPriceDatasource } from "../../datasource/LocationPriceDatasource";
import { SearchOutlined } from "@ant-design/icons";
import { color } from "../../resource";

const _ = require("lodash");
const { Map } = require("immutable");

interface ModalLocationPriceProps {
  show: boolean;
  backButton: () => void;
  callBack: (data: UpdateLocationPrice) => void;
  data: any;
  editIndex: any;
  isEditModal?: boolean;
}
const ModalEditLocationPrice: React.FC<ModalLocationPriceProps> = ({
  show,
  backButton,
  callBack,
  data,
  editIndex,
  isEditModal = false,
}) => {
  const [form] = Form.useForm();
  const [priceList, setPriceList] = useState<UpdateLocationPrice>();
  const [locationPrice, setLocationPrice] =
    useState<UpdateLocationPrice>(editIndex);
  const [saveData, setSaveData] = useState<any>();
  const [saveBtnDisable, setBtnSaveDisable] = useState<boolean>(
    isEditModal ? false : true
  );
  const [searchText, setSearchText] = useState<string>("");
  // useEffect(() => {
  //   searchPlants();
  // }, []);
  // const searchPlants = async () => {
  //   await LocationPriceDatasource.getAllLocationPrice(searchText).then(
  //     (res) => {
  //       setLocationPrice(res);
  //     }
  //   );
  // };

  const changeTextSearch = (search: any) => {
    setSearchText(search.target.value);
  };

  const handelCallBack = async () => {
    callBack(locationPrice);
  };
  const checkValidate = (data: UpdateLocationPrice) => {
    // let checkEmpty = ![
    //   data.priceData[0].location_price_id,
    //   data.priceData[0].price,
    // ].includes("");
    // let checkEmptyNumber = ![
    //   data.priceData[0].location_price_id,
    //   data.priceData[0].price,
    // ].includes(0);
    // if (checkEmpty && checkEmptyNumber) {
    //   setBtnSaveDisable(false);
    // } else {
    //   setBtnSaveDisable(true);
    // }
  };
  const onFieldsChange = () => {
    const valuesForm = form.getFieldsValue();
    checkValidate(valuesForm);
  };
  const columns = [
    {
      title: "ชื่อพืช",
      dataIndex: "plant_name",
      key: "plant_name",
      width: "50%",
    },
    {
      title: "ราคา",
      dataIndex: "price",
      key: "price",
      width: "50%",
      render: (value: any, row: any, index: number) => {
        const indexPlant = index;
        const handleOnChangePrice = (e: any) => {
          const filterId = row.id;
          const price_id = Map(priceList).set("location_price_id", filterId);
          const price = Map(price_id.toJS()).set("price", e.target.value);
          const dataHi = {
            priceData: [price.toJS()],
          };
          setLocationPrice(dataHi);
        };
        return {
          children: (
            <>
              <Input
                onBlur={handleOnChangePrice}
                defaultValue={row.price.toFixed(2)}
                suffix="บาท"
                autoComplete="off"
              />
            </>
          ),
        };
      },
    },
  ];

  return (
    <>
      <Modal
        key={data}
        title={
          <div
            style={{
              width: "100%",
              cursor: "move",
            }}
          >
            {`แก้ไขราคา : จังหวัด${data.province_name}`}
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
          key={data.plants}
          form={form}
          onFinish={handelCallBack}
          onFieldsChange={onFieldsChange}
        >
          <div className="row col-lg-12 pb-3">
            <span style={{ color: color.Grey }}>
              โปรดตรวจสอบราคาการฉีดพ่นก่อนที่จะกดบันทึกเสมอ
              เพราะอาจจะทำให้ราคาฉีดพ่น ของอำเภอ และตำบลทั้งหมดเปลี่ยนแปลงตาม
              อาจจะส่งผลต่อการจ้างงานในระบบ
            </span>
            <div className="col-lg-10 pt-3">
              <Input
                allowClear
                prefix={<SearchOutlined style={{ color: color.Disable }} />}
                placeholder="ค้นหาชื่อพืช"
                onChange={changeTextSearch}
              />
            </div>
            <div className="col-lg-2 pt-3">
              <Button
                style={{
                  borderColor: color.Success,
                  borderRadius: "5px",
                  color: color.secondary2,
                  backgroundColor: color.Success,
                  padding: 6,
                  paddingTop: 4,
                }}
                // onClick={searchPlants}
              >
                ค้นหาข้อมูล
              </Button>
            </div>
          </div>
          <Table
            dataSource={data.plants}
            columns={columns}
            pagination={false}
            scroll={{ x: 0, y: 300 }}
          />
        </Form>
      </Modal>
    </>
  );
};

export default ModalEditLocationPrice;
