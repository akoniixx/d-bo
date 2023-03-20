import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
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
  callBack: (data: UpdateLocationPriceList[]) => void;
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
  const [locationPrice, setLocationPrice] =
    useState<UpdateLocationPriceList[]>(editIndex);
  const [getSearch, setGetSearch] = useState<AllLocatePriceEntity[]>();
  const [saveBtnDisable, setBtnSaveDisable] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");

  const searchPlants = async () => {
    await LocationPriceDatasource.getPrice(data.province_name, searchText).then(
      (res) => {
        if (searchText.length > 0) {
          setGetSearch(res.data);
        } else {
          setGetSearch(undefined);
        }
      }
    );
  };
  const changeTextSearch = (search: any) => {
    setSearchText(search.target.value);
  };
  const handelCallBack = async () => {
    callBack(locationPrice);
  };
  const columns = [
    {
      title: "ชื่อพืช",
      dataIndex: "plant_name",
      key: "plant_name",
      width: "50%",
      render: (value: any, row: any, index: any) => {
        return {
          children: <>{row.plant_name}</>,
        };
      },
    },
    {
      title: "ราคา",
      dataIndex: "price",
      key: "price",
      width: "50%",
      render: (value: any, row: any, index: number) => {
        const handleItemClick = (indexData: number, newItem: number) => {
          const newItems = [...locationPrice];
          const dataChange: UpdateLocationPriceList[] = [];
          const price_id = Map(dataChange).set("location_price_id", row.id);
          const price = Map(price_id.toJS()).set("price", newItem);
          newItems[indexData] = price.toJS();
          setLocationPrice(newItems);

          {
            !newItem ? setBtnSaveDisable(true) : setBtnSaveDisable(false);
          }
        };
        return {
          children: (
            <>
              <InputNumber
                key={row.price}
                style={{ width: 200 }}
                defaultValue={row.price}
                step="0.01"
                onChange={(event) => handleItemClick(index, event)}
                stringMode
                addonAfter="บาท"
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
        <Form key={data.plants} form={form} onFinish={handelCallBack}>
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
                onClick={searchPlants}
              >
                ค้นหาข้อมูล
              </Button>
            </div>
          </div>
          {getSearch ? (
            <Table
              dataSource={getSearch?.map((x) => x.plants)[0]}
              columns={columns}
              pagination={false}
              scroll={{ x: 0, y: 300 }}
            />
          ) : (
            <Table
              dataSource={data.plants}
              columns={columns}
              pagination={false}
              scroll={{ x: 0, y: 300 }}
            />
          )}
        </Form>
      </Modal>
    </>
  );
};

export default ModalEditLocationPrice;
