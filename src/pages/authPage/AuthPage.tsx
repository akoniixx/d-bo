import moment from "moment";
import React, { useEffect, useState } from "react";
import FromLogin from "../../components/login/FromLogin";
import { FromMaintenance } from "../../components/login/FromMaintenance";
import { MaintenanceDataSource } from "../../datasource/MaintenanceDataSource";
import {
  MaintenanceSystem,
  MaintenanceSystem_INIT,
} from "../../entities/MaintenanceSystemEntities";
import color from "../../resource/color";
import icon from "../../resource/icon";
import image from "../../resource/image";
import { convertBuddhistYear } from "../../utilities/ConvertToBuddhistYear";

const AuthPage: React.FC = () => {
  const dateNow = moment(Date.now());
  const [dataMaintance, setDataMaintance] =
    useState<MaintenanceSystem>(MaintenanceSystem_INIT);
  const [checkTime, setCheckTime] = useState(false);
  const checkMaintance = () => {
    MaintenanceDataSource.getMaintenceSystem("BO").then((res) => {
      setCheckTime(
        checkTimeMaintance(
          moment(res.responseData.dateStart),
          moment(res.responseData.dateEnd)
        )
      );
      res.responseData.textDate =
        "วันที่ " +
        convertBuddhistYear.toBuddhistYear(
          moment(res.responseData.dateStart),
          "DD MMMM YYYY ช่วงเวลา HH:mm - "
        ) +
        moment(res.responseData.dateEnd).format("HH:mm น.");
      setDataMaintance(res.responseData);
    });
  };

  useEffect(() => {
    checkMaintance();
  }, []);

  const checkTimeMaintance = (startDate: any, endDate: any) => {
    return dateNow.isBetween(startDate, endDate, "milliseconds");
  };

  return (
    <div
      className=" overflow-hidden "
      style={{ backgroundColor: color.BG }}>
      <div className="row">
        <div className="col-lg-6">
          <div className="d-flex justify-content-start">
            <img
              alt="imageLogin"
              src={image.login}
              className="w-100 vh-100"
            />
          </div>
        </div>
        <div className="col-lg-6">
          <div
            style={{
              marginTop: "35%",
              paddingLeft: "20%",
              paddingRight: "20%",
            }}>
            <div className="text-center">
              <img
                alt="logo"
                src={
                  checkTime ? dataMaintance.imagePath : icon.iconLogin
                }
                width={"40%"}
              />
            </div>
            <div className="text-center justify-content-center">
              {!checkTime ? (
                <FromLogin />
              ) : (
                <FromMaintenance data={dataMaintance} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AuthPage;
