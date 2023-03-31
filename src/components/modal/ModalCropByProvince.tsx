import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Select, Table } from "antd";
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
  data: any;
}
const ModalCropByProvince: React.FC<ModalCropProps> = ({
  show,
  backButton,
  data,
}) => {
  const [dataPlant, setDataPlant] = useState<AllLocatePriceEntity>(data);
  const [crops, setCrop] = useState<AllLocatePriceEntity[]>();
  const [searchText, setSearchText] = useState<string>("");
  const [selectedId, setSelectedId] = useState(null);
  const [counter, setCounter] = useState(0);

  const fetchLocationPrice = async () => {
    await LocationPriceDatasource.getAllLocationPrice(
      data.province_name,
      searchText
    ).then((res) => {
      setCrop(res.data);
    });
  };

  const changeTextSearch = (search: any) => {
    setSearchText(search.target.value);
  };

  const columns = [
    {
      title: "ชื่อพืช",
      dataIndex: "plants",
      key: "plants",
      width: "50%",
      render: (value: any, row: any, index: any) => {
        const plantArr = crops?.map(
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
        const plantArr = crops?.map(
          (x) => x.plants.map((x) => x.price.toFixed(2))[index]
        );

        return {
          children: (
            <>{searchText ? plantArr : `${row.price.toFixed(2)}  ` + "บาท"}</>
          ),
        };
      },
    },
  ];
  return (
    <>
      <Modal
        key={data}
        width={575}
        title={
          <div
            style={{
              cursor: "move",
            }}
          >
            {`รายการพืช : จังหวัด${data.province_name}`}
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
        {searchText ? (
          <Table
            dataSource={crops}
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
      </Modal>
    </>
  );
};

export default ModalCropByProvince;
