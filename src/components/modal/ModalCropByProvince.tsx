import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Table } from "antd";
import React, { useEffect, useState } from "react";
import { LocationPriceDatasource } from "../../datasource/LocationPriceDatasource";
import {
  AllLocatePriceEntity,
  LocationPricePageEntity,
  PricePlantsEntity,
} from "../../entities/LocationPrice";
import { color } from "../../resource";

interface ModalCropProps {
  show: boolean;
  backButton: () => void;
  index: any;
}
const ModalCropByProvince: React.FC<ModalCropProps> = ({
  show,
  backButton,
  index,
}) => {
  const [data, setData] = useState<AllLocatePriceEntity>(index);
  const [plants, setPlants] = useState();
  const [searchText, setSearchText] = useState<string>();

  const fetchLocationPrice = async () => {
    await LocationPriceDatasource.getAllLocationPrice(index.province_name, searchText).then(
      (res) => {
          setData(res.data);
      }
    );
  };
  const changeTextSearch = (search: any) => {
    setSearchText(search.target.value);
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
        return {
          children: <span>{`${row.price.toFixed(2)}  ` + "บาท"}</span>,
        };
      },
    },
  ];
  return (
    <>
      <Modal
        key={index}
        width={575}
        title={
          <div
            style={{
              cursor: "move",
            }}
          >
            {`รายการพืช : จังหวัด${index.province_name}`}
          </div>
        }
        footer={false}
        visible={show}
        onCancel={backButton}
      >
        <div className="row col-lg-12 pb-3 pt-2">
          <div className="col-lg-10">
            <Input
              allowClear
              prefix={<SearchOutlined style={{ color: color.Disable }} />}
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
              onClick={fetchLocationPrice}
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
      </Modal>
    </>
  );
};

export default ModalCropByProvince;
