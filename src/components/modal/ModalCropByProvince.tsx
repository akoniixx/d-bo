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
}
const ModalCropByProvince: React.FC<ModalMapPlotProps> = ({
  show,
  backButton,
  title,
}) => {
  const [form] = Form.useForm();
  const [data, setData] = useState<any>();
  const [value, setValue] = useState(1);

  const dataSource = [
    {
      crop: "นาข้าว1",
      price: "100.00",
    },
    {
      crop: "นาข้าว2",
      price: "100.00",
    },
    {
      crop: "นาข้าว3",
      price: "100.00",
    },
    {
      crop: "นาข้าว4",
      price: "100.00",
    },
    {
      crop: "นาข้าว1",
      price: "100.00",
    },
    {
      crop: "นาข้าว2",
      price: "100.00",
    },
    {
      crop: "นาข้าว3",
      price: "100.00",
    },
    {
      crop: "นาข้าว4",
      price: "100.00",
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
        footer={false}
        visible={show}
        onCancel={backButton}
      >
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          scroll={{ x: 0, y: 300 }}
        />
      </Modal>
    </>
  );
};

export default ModalCropByProvince;
