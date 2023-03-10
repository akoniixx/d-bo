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
  const [changeUpSearch, setChangeUpSearch] =
    useState<UpdateLocationPriceList[]>(editIndex);
  const [saveBtnDisable, setBtnSaveDisable] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const searchPlants = async () => {
    await LocationPriceDatasource.getAllLocationPrice(
      data.province_name,
      searchText
    ).then((res) => {
      setGetSearch(res.data);
    });
  };
  const changeTextSearch = (search: any) => {
    setSearchText(search.target.value);
  };
  const handelCallBack = async () => {
    if (searchText) {
      callBack(changeUpSearch);
    } else {
      callBack(locationPrice);
    }
  };
  const columns = [
    {
      title: "ชื่อพืช",
      dataIndex: "plant_name",
      key: "plant_name",
      width: "50%",
      render: (value: any, row: any, index: any) => {
        const plantArr: any = getSearch?.map(
          (x) => x.plants.map((x) => x.plant_name)[index]
        );
        return {
          children: <>{searchText ? plantArr : row.plant_name}</>,
        };
      },
    },
    {
      title: "ราคา",
      dataIndex: "price",
      key: "price",
      width: "50%",
      render: (value: any, row: any, index: number) => {
        const plantArr: any = getSearch?.map(
          (x) => x.plants.map((x) => x.price.toFixed(2))[0]
        );
        const plantId = getSearch?.map((x) => x.plants.map((x) => x.id));
        const handleItemClick = (indexData: number, newItem: number) => {
          const newItems = [...locationPrice];
          const searchItem: any = [plantArr];
          const dataChange: UpdateLocationPriceList[] = [];
          const dataChangeSearch: UpdateLocationPriceList[] = [];
          const price_id = Map(dataChange).set("location_price_id", row.id);
          const price = Map(price_id.toJS()).set("price", newItem);
          newItems[indexData] = price.toJS();
          setLocationPrice(newItems);
          const price_id_search = Map(dataChangeSearch).set(
            "location_price_id",
            plantId?.join("")
          );
          const price_search = Map(price_id_search.toJS()).set(
            "price",
            newItem
          );
          searchItem[indexData] = price_search.toJS();
          setChangeUpSearch(searchItem);
          !newItem ? setBtnSaveDisable(true) : setBtnSaveDisable(false);
        };
        return {
          children: (
            <>
              {searchText ? (
                <InputNumber
                  style={{ width: 200 }}
                  defaultValue={plantArr}
                  step="0.01"
                  onChange={(event) => handleItemClick(index, event)}
                  stringMode
                  addonAfter="บาท"
                />
              ) : (
                <InputNumber
                  style={{ width: 200 }}
                  defaultValue={row.price}
                  step="0.01"
                  onChange={(event) => handleItemClick(index, event)}
                  stringMode
                  addonAfter="บาท"
                />
              )}
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
          {searchText ? (
            <Table
              dataSource={getSearch}
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