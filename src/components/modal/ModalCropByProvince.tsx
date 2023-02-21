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
import { LocationPriceDatasource } from "../../datasource/LocationPriceDatasource";
import {
  LocationPricePageEntity,
  PricePlantsEntity,
} from "../../entities/LocationPrice";
import { color } from "../../resource";
import FooterPage from "../footer/FooterPage";

interface ModalMapPlotProps {
  show: boolean;
  backButton: () => void;
  title: string;
  index: string;
}
const ModalCropByProvince: React.FC<ModalMapPlotProps> = ({
  show,
  backButton,
  title,
  index,
}) => {
  const [data, setData] = useState<any>(index);
  const [searchText, setSearchText] = useState<string>();
  const changeTextSearch = (searchText: any) => {
    setSearchText(searchText.target.value);
  };
  const columns = [
    {
      title: "ชื่อพืช",
      dataIndex: "plants",
      key: "plants",
      width: "50%",
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{row.plant_name}</span>,
        };
      },
    },
    {
      title: "ราคา",
      dataIndex: "province_name",
      key: "province_name",
      width: "50%",
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{row.price}</span>,
        };
      },
    },
  ];
  const searchPlants = () => {};
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
            {`รายการพืช : จังหวัด ${title}`}
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
              onClick={searchPlants}
            >
              ค้นหาข้อมูล
            </Button>
          </div>
        </div>
        <Table
          dataSource={data}
          columns={columns}
          pagination={false}
          scroll={{ x: 0, y: 300 }}
        />
      </Modal>
    </>
  );
};

export default ModalCropByProvince;
