import React, { useEffect, useState } from "react";
import { Form, Input, Modal, Pagination, Table, Tag } from "antd";
import { color } from "../../resource";
import bth_img_empty from "../../resource/media/empties/upload_Img_btn.png";
import { numberWithCommas } from "../../utilities/TextFormatter";
interface ModalHistoryProps {
  show: boolean;
  backButton: () => void;
}
const ModalHistory: React.FC<ModalHistoryProps> = ({
  show,
  backButton,
}) => {
  const [form] = Form.useForm();
  const data = [
    {
      date: "22/12/2023 18:00",
      raiAmount: "2000",
      evidence: "droner_capture.jpg",
      updateBy: "สายไหม",
      reason: "นักบินโทรแจ้ง call center และส่งรูปในไลน์",
    },
    {
      date: "22/12/2023 18:00",
      raiAmount: "70",
      evidence: "droner_capture.jpg",
      updateBy: "สายไหม",
      reason: "-",
    },
  ];

  const columns = [
    {
      title: "วัน/เวลา",
      dataIndex: "date",
      key: "date",
      render: (value: any, row: any, index: number) => {
        return {
          children: <>{row.date}</>,
        };
      },
    },
    {
      title: "จำนวนไร่",
      dataIndex: "raiAmount",
      key: "raiAmount",
      render: (value: any, row: any, index: number) => {
        return {
          children: <>{numberWithCommas(row.raiAmount) + " ไร่"}</>,
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
            >
              {row.evidence}
            </span>
          ),
        };
      },
    },
    {
      title: "ผู้อัพเดต",
      dataIndex: "updateBy",
      key: "updateBy",
      render: (value: any, row: any, index: number) => {
        return {
          children: <>{row.updateBy}</>,
        };
      },
    },
    {
      title: "หมายเหตุ",
      dataIndex: "reason",
      key: "reason",
      render: (value: any, row: any, index: number) => {
        return {
          children: <>{row.reason}</>,
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
          dataSource={data}
          columns={columns}
          pagination={false}
        />
        <div className="d-flex justify-content-between pt-4 pb-3">
          <p>รายการทั้งหมด {data.length} รายการ</p>
          <Pagination
            current={1}
            //   onChange={onChangePage}
            total={data.length}
          />
        </div>
      </Modal>
    </>
  );
};

export default ModalHistory;
