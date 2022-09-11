import { StarFilled } from "@ant-design/icons";
import { Badge, Form, Modal, Row, Table } from "antd";
import React, { useEffect, useState } from "react";
import { TaskDronerTempDataSource } from "../../../../datasource/TaskDronerTempDatasource";
import { TaskDronerTempEntity } from "../../../../entities/TaskDronerTemp";
import { color } from "../../../../resource";
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
      width: "20%",
      render: (value: any, row: any, index: number) => {
        let data = JSON.parse(row.dronerDetail[0]);
        return {
          children: (
            <>
              <span>{data.firstname + " " + data.lastname}</span>
              <br />
              <span style={{ color: color.Grey }}>{data.droner_code}</span>
            </>
          ),
        };
      },
    },
    {
      title: "เบอร์โทร",
      render: (value: any, row: any, index: number) => {
        let data = JSON.parse(row.dronerDetail[0]);
        return {
          children: (
            <>
              <span>{data.telephone_no}</span>
            </>
          ),
        };
      },
    },
    {
      title: "Rating",
      render: (value: any, row: any, index: number) => {
        let data = JSON.parse(row.dronerDetail[0]);
        const checkRating = () => {
          return data.rating_avg > 0 ? true : false;
        };
        return {
          children: (
            <>
              {checkRating() ? (
                <Row>
                  <div style={{ color: "#FFCA37", fontSize: "16px" }}>
                    <StarFilled />
                  </div>
                  <span className="pt-2 ps-1">
                    {parseFloat(data.rating_avg).toFixed(2)}
                  </span>
                </Row>
              ):<p>-</p>}
            </>
          ),
        };
      },
    },
    {
      title: "ตำบล",
      render: (value: any, row: any, index: number) => {
        let data = JSON.parse(row.dronerDetail[0]);
        return {
          children: (
            <>
              <span>{data.district_name}</span>
            </>
          ),
        };
      },
    },
    {
      title: "อำเภอ",
      render: (value: any, row: any, index: number) => {
        let data = JSON.parse(row.dronerDetail[0]);
        return {
          children: (
            <>
              <span>{data.subdistrict_name}</span>
            </>
          ),
        };
      },
    },
    {
      title: "จังหวัด",
      render: (value: any, row: any, index: number) => {
        let data = JSON.parse(row.dronerDetail[0]);
        return {
          children: (
            <>
              <span>{data.province_name}</span>
            </>
          ),
        };
      },
    },
    {
      title: "ยี่ห้อ",
      render: (value: any, row: any, index: number) => {
        let data = JSON.parse(row.dronerDetail[0]);
        return {
          children: (
            <>
              <span>{data.drone_brand}</span>
            </>
          ),
        };
      },
    },
    {
      title: "สถานะ",
      render: (value: any, row: any, index: number) => {
        let data = JSON.parse(row.dronerDetail[0]);
        return {
          children: (
            <>
              <span
                style={{
                  color:
                    data.droner_status == "สะดวก" ? color.Success : color.Error,
                }}
              >
                <Badge
                  color={
                    data.droner_status == "สะดวก" ? color.Success : color.Error
                  }
                />
                {data.droner_status}
                <br />
              </span>
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
