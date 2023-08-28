import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { Button } from "antd/lib/radio";
import color from "../../resource/color";
import { MaintenanceSystem } from "../../entities/MaintenanceSystemEntities";
import { convertBuddhistYear } from "../../utilities/ConvertToBuddhistYear";
import moment from "moment";

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
  const sameDay = moment(data.dateStart).isSame(data.dateEnd);

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
            <div className="text-center">
              <label style={{ fontSize: "20px", font: "bold" }}>
                {data?.header}
              </label>{" "}
            </div>
            <div className="text-center">
              {sameDay === true ? (
                <label style={{ fontSize: "17px" }}>{data.textDate}</label>
              ) : (
                <>
                  <label style={{ fontSize: "17px" }}>
                    วันที่{" "}
                    {convertBuddhistYear.toBuddhistYear(
                      moment(data.dateStart),
                      "DD MMMM YYYY ช่วงเวลา HH:mm - 23:59 น."
                    )}{" "}
                  </label>
                  <label style={{ fontSize: "17px" }}>
                    ถึงวันที่{" "}
                    {convertBuddhistYear.toBuddhistYear(
                      moment(data.dateEnd),
                      "DD MMMM YYYY ช่วงเวลา 00:00 - HH:mm น."
                    )}{" "}
                  </label>
                </>
              )}
            </div>
            <div className="text-center">
              <label style={{ fontSize: "15px", color: color.Grey }}>
                {data?.text}
              </label>{" "}
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
