import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { Button } from "antd/lib/radio";
import color from "../../resource/color";
import { MaintenanceSystem } from "../../entities/MaintenanceSystemEntities";

interface ModalMaintenceProp {
  show: boolean;
  onClose: () => void;
  data: MaintenanceSystem;
}
export const ModalMaintence: React.FC<ModalMaintenceProp> = ({
  show,
  onClose,
  data,
}) => {
  console.log("data", show);
  const footerClose = () => {
    return (
      <div className="text-center">
        <Button
          style={{ color: color.Error, borderColor: color.Error }}
          onClick={onClose}
        >
          ปิด
        </Button>
      </div>
    );
  };
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
            <div style={{ fontSize: "20px" }} className="text-center">
              **แจ้งเตือนการปิดระบบ**
            </div>
          </div>
        }
        closable={false}
        footer={footerClose()}
        visible={show}
      >
        <div className="text-center">
          <img alt="logo" src={data?.imagePath} width={"30%"} />
        </div>
        <div className="col-lg-12">
          <div style={{ width: "100%" }}>
            <div className="text-center p-1">
              <label style={{ fontSize: "20px" }}>{data?.text}</label>{" "}
            </div>
            <div className="text-center">
              <h5 style={{ color: color.Error }}>
                {data.textDate}
              </h5>
            </div>
            <div className="text-center">
              <label style={{ fontSize: "15px", color: color.Grey }}>
                {data?.footer}
              </label>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
