import { DeleteOutlined } from "@ant-design/icons";
import { Form, Modal, Table } from "antd";
import React, { useEffect, useState } from "react";
import { TaskDronerTempDataSource } from "../../../../datasource/TaskDronerTempDatasource";
import { TaskDronerTempEntity } from "../../../../entities/TaskDronerTemp";
import { color } from "../../../../resource";
import ActionButton from "../../../button/ActionButton";
import { CardContainer } from "../../../card/CardContainer";

interface ModalDronerListProps {
  show: boolean;
  backButton: () => void;
  taskId: string;
  title: string;
}
const ModalDronerList: React.FC<ModalDronerListProps> = ({
  show,
  backButton,
  taskId,
  title,
}) => {
  const [data, setData] = useState<TaskDronerTempEntity[]>();

  const fetchDronerList = async () => {
    await TaskDronerTempDataSource.getDronerList(taskId).then((res) => {
      console.log(res);
      setData(res);
    });
  };

  useEffect(() => {
    fetchDronerList();
  }, []);

  const columns = [
    {
      title: "ชื่อนักบินโดรน",
    },
    {
      title: "เบอร์โทร",
    },
    {
      title: "Rating",
    },
    {
      title: "ตำบล",
    },
    {
      title: "อำเภอ",
    },
    {
      title: "จังหวัด",
    },
    {
      title: "สะดวก/ไม่สะดวก",
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
        width={1000}
        footer={false}
      >
        <Form>
          <CardContainer>
            <Table
              dataSource={data}
              columns={columns}
              pagination={false}
              size="large"
              tableLayout="fixed"
            />
          </CardContainer>
        </Form>
      </Modal>
    </>
  );
};

export default ModalDronerList;
