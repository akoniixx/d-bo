import { DeleteOutlined, StarFilled } from "@ant-design/icons";
import { Badge, Form, Modal, Row, Table } from "antd";
import React, { useEffect, useState } from "react";
import { TaskSearchDroner } from "../../../../entities/TaskSearchDroner";
import { color } from "../../../../resource";
import ActionButton from "../../../button/ActionButton";
import { CardContainer } from "../../../card/CardContainer";
import FooterPage from "../../../footer/FooterPage";
interface ModalSelectedDronerProps {
  show: boolean;
  backButton: () => void;
  dataDroner: TaskSearchDroner[];
  title: string;
  callBack: (data: TaskSearchDroner[]) => void;
}
const ModalSelectedDroner: React.FC<ModalSelectedDronerProps> = ({
  show,
  backButton,
  dataDroner,
  title,
  callBack,
}) => {
  const [data, setData] = useState<TaskSearchDroner[]>(dataDroner);
  const removeDroner = (e: any) => {
    let d = data.filter((x) => x.droner_id != e.droner_id);
    setData(d);
  };
  const handelCallBack = () => {
    callBack(data);
  };

  const columns = [
    {
      title: "ชื่อนักบินโดรน",
      width: "15%",
      dataIndex: "fullname",
      key: "fullname",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span>{row.firstname + " " + row.lastname}</span>
              <br />
              <span style={{ color: color.Grey }}></span>
            </>
          ),
        };
      },
    },
    {
      title: "เบอร์โทร",
      dataIndex: "telephone_no",
      key: "telephone_no",
    },
    {
      title: "Rating",
      dataIndex: "rating_avg",
      key: "rating_avg",
      render: (value: any, row: any, index: number) => {
        const checkRating = () => {
          return row.rating_avg > 0 ? true : false;
        };
        return {
          children: (
            <>
              {checkRating() && (
                <Row>
                  <div style={{ color: "#FFCA37", fontSize: "16px" }}>
                    <StarFilled />
                  </div>
                  <span className="pt-2 ps-1">
                    {parseFloat(row.rating_avg).toFixed(2)}
                  </span>
                </Row>
              )}
            </>
          ),
        };
      },
    },
    {
      title: "ตำบล",
      dataIndex: "subdistrict_name",
      key: "subdistrict_name",
    },
    {
      title: "อำเภอ",
      dataIndex: "district_name",
      key: "district_name",
    },
    {
      title: "จังหวัด",
      dataIndex: "province_name",
      key: "province_name",
    },
    {
      title: "ยี่หัอ",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "สถานะ",
      dataIndex: "droner_status",
      key: "droner_status",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span style={{ color: "สะดวก" ? color.Success : color.Error }}>
                <Badge color={"สะดวก" ? color.Success : color.Error} />
                {row.droner_status}
                <br />
              </span>
            </>
          ),
        };
      },
    },
    {
      title: "",
      width: "7%",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div className="d-flex flex-row justify-content-between">
              <ActionButton
                icon={<DeleteOutlined />}
                color={color.Error}
                onClick={() => removeDroner(row)}
              />
            </div>
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
        width={1300}
        visible={show}
        onCancel={backButton}
        footer={[
          <FooterPage
            onClickBack={backButton}
            onClickSave={() => handelCallBack()}
            disableSaveBtn={false}
          />,
        ]}
      >
        <Form>
          <CardContainer>
            <Table
              dataSource={data.filter((x) => x.isChecked)}
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
export default ModalSelectedDroner;
