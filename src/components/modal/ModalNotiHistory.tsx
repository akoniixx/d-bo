import { StarFilled } from "@ant-design/icons";
import { Avatar, Badge, Form, Modal, Row, Table } from "antd";
import React, { useEffect, useState } from "react";
import color from "../../resource/color";
import { CardContainer } from "../card/CardContainer";
import styled from "styled-components";

const NewTable = styled(Table)`
   .ant-table-container table thead tr th {
    background-color:rgba(232, 236, 243, 1) !important;
    font-family: "Prompt" !important;
    font-weight: 500 !important;
    color: #2b2b2b !important;
    font-weight: bold !important;
  }
`;

interface ModalNotiHisProps {
  show: boolean;
  backButton: () => void;
  newsId: string;
  title: string;
}
const ModalNotiHistory: React.FC<ModalNotiHisProps> = ({
  show,
  backButton,
  newsId,
  title,
}) => {
  const data: any[] = [
    {
      id: 1,
      headNews: "เกษตรกรยุคใหม่ ทำเกษตรเงินล้าน",
      dateNoti: "18/05/2565, 11:00",
      status: "รอแจ้งเตือน",
    },
    {
      id: 2,
      headNews: "รอบรู้เกษตร กับกูรู้กูรูเกษตร",
      dateNoti: "18/05/2565, 11:00",
      status: "รอแจ้งเตือน",
    },
  ];
  const columns = [
    {
      title: "พาดหัว",
      dataIndex: "headNews",
      key: "headNews",
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>เกษตรกรยุคใหม่ ทำเกษตรเงินล้าน</span>,
        };
      },
    },
    {
      title: "วัน/เวลาแจ้งเตือน",
      dataIndex: "dateNoti",
      key: "dateNoti",
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>18/05/2565, 11:00</span>,
        };
      },
    },
    {
      title: "สถานะ",
      dataIndex: "status",
      key: "status",
      render: (value: any, row: any, index: number) => {
        return {
          children: <span style={{ color: color.Warning }}>รอแจ้งเตือน</span>,
        };
      },
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span></span>
            </>
          ),
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
            {title}
          </div>
        }
        visible={show}
        onCancel={backButton}
        width={1200}
        footer={false}
      >
        <Form>
          <CardContainer>
            <NewTable dataSource={data} columns={columns} pagination={false} />
          </CardContainer>
        </Form>
      </Modal>
    </>
  );
};

export default ModalNotiHistory;
