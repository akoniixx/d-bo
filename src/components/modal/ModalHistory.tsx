import React, { useEffect, useState } from "react";
import { Form, Input, Modal, Pagination, Table, Tag } from "antd";
import { color } from "../../resource";
import bth_img_empty from "../../resource/media/empties/upload_Img_btn.png";
import { numberWithCommas } from "../../utilities/TextFormatter";
import {
  AllHistoryFarmerPlotEntity,
  FarmerPlotEntity,
} from "../../entities/FarmerPlotEntities";
import { FarmerPlotDatasource } from "../../datasource/FarmerPlotDatasource";
import moment from "moment";
interface ModalHistoryProps {
  show: boolean;
  backButton: () => void;
  data: FarmerPlotEntity;
}
const ModalHistory: React.FC<ModalHistoryProps> = ({
  show,
  backButton,
  data,
}) => {
  const [form] = Form.useForm();
  const [historyPlot, setHistoryPlot] = useState<AllHistoryFarmerPlotEntity>();
  const [current, setCurrent] = useState<number>(1);
  const [row, setRow] = useState(5);

  const getHistoryPlot = async () => {
    await FarmerPlotDatasource.getHistoryFarmerPlot(
      data.farmerId!,
      data.id!,
      current,
      row
    ).then((res) => {
      setHistoryPlot(res);
    });
  };
  useEffect(() => {
    getHistoryPlot();
  }, [current, data]);

  const onPreviewImg = async (e: any) => {
    let src = e;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(e);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  const onChangePage = (page: number) => {
    setCurrent(page);
  };
  const columns = [
    {
      title: "วัน/เวลา",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <span>{moment(row.updatedAt).format("DD/MM/YYYY, HH:mm")}</span>
          ),
        };
      },
    },
    {
      title: "จำนวนไร่",
      dataIndex: "raiAmount",
      key: "raiAmount",
      render: (value: any, row: any, index: number) => {
        return {
          children: <>{numberWithCommas(row.raiAfter) + " ไร่"}</>,
        };
      },
    },
    {
      title: "หลักฐาน",
      dataIndex: "evidence",
      key: "evidence",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <span
              style={{
                color: color.Success,
                textDecoration: "underline",
                cursor: "pointer",
              }}
              onClick={() => onPreviewImg(row.pathFile)}
            >
              {row.fileName ? row.fileName : "-"}
            </span>
          ),
        };
      },
    },
    {
      title: "ผู้อัพเดต",
      dataIndex: "createBy",
      key: "createBy",
      render: (value: any, row: any, index: number) => {
        return {
          children: <>{row.createBy}</>,
        };
      },
    },
    {
      title: "หมายเหตุ",
      dataIndex: "reason",
      key: "reason",
      render: (value: any, row: any, index: number) => {
        return {
          children: <>{row.reason ? row.reason : "-"}</>,
        };
      },
    },
  ];
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
            ประวัติการแก้ไขจำนวนไร่
          </div>
        }
        width={1000}
        visible={show}
        onCancel={backButton}
        footer={false}
      >
        <Table
          className="tableModal"
          dataSource={historyPlot?.data}
          columns={columns}
          pagination={false}
        />
        <div className="d-flex justify-content-between pt-4 pb-3">
          <p>รายการทั้งหมด {historyPlot?.count} รายการ</p>
          <Pagination
            current={1}
            onChange={onChangePage}
            total={historyPlot?.count}
          />
        </div>
      </Modal>
    </>
  );
};

export default ModalHistory;
