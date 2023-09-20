import { Navigate, Outlet } from "react-router-dom";
import { DashboardLayout } from "./components/layout/Layout";
import {
  MaintenanceSystem,
  MaintenanceSystem_INIT,
} from "./entities/MaintenanceSystemEntities";
import moment from "moment";
import { MaintenanceDataSource } from "./datasource/MaintenanceDataSource";
import { convertBuddhistYear } from "./utilities/ConvertToBuddhistYear";
import React, { useEffect, useState } from "react";
import { ModalMaintence } from "./components/modal/ModalMaintenance";
import { useLocation } from "react-router-dom";
const useAuth = () => {
  const username = localStorage.getItem("token");
  if (username) {
    return true;
  } else {
    return false;
  }
};

const ProtectRoute = () => {
  const auth = useAuth();
  const [dataMaintance, setDataMaintance] = useState<MaintenanceSystem>(
    MaintenanceSystem_INIT
  );
  const [showModalMaintance, setShowModalMaintance] = useState<boolean>(true);
  const dateNow = moment(Date.now());
  const [checkTime, setCheckTime] = useState(false);
  const [start, setStart] = useState<any>();
  const [end, setEnd] = useState<any>();

  const location = useLocation();
  useEffect(() => {
    const getMaintenance = async () => {
      const value = await localStorage.getItem("Maintenance");
      await MaintenanceDataSource.getMaintenceSystem("BO")
        .then((res) => {
          if (res.responseData !== null) {
            setStart(
              convertBuddhistYear.toBuddhistYear(
                moment(res.responseData.dateStart),
                "DD MMMM YYYY ช่วงเวลา HH:mm "
              )
            );
            setEnd(
              convertBuddhistYear.toBuddhistYear(
                moment(res.responseData.dateEnd),
                "DD MMMM YYYY ช่วงเวลา HH:mm  "
              )
            );
            setCheckTime(
              checkTimeMaintance(
                moment(res.responseData.dateNotiStart),
                moment(res.responseData.dateNotiEnd)
              )
            );
            if (value === "read") {
              setDataMaintance(res.responseData);
              setShowModalMaintance(false);
            } else {
              setDataMaintance(res.responseData);
              setShowModalMaintance(res.responseData.id ? true : false);
              res.responseData.textDate =
                "วันที่ " +
                convertBuddhistYear.toBuddhistYear(
                  moment(res.responseData.dateStart),
                  "DD MMMM YYYY ช่วงเวลา HH:mm - "
                ) +
                moment(res.responseData.dateEnd).format("HH:mm น.");
            }
          }
        })
        .catch((err) => console.log(err));
    };
    getMaintenance();
  }, [location]);

  const checkTimeMaintance = (startDate: any, endDate: any) => {
    return dateNow.isBetween(startDate, endDate, "milliseconds");
  };

  return auth ? (
    <DashboardLayout>
      <Outlet />
      {checkTime === true && (
        <ModalMaintence
          show={showModalMaintance}
          onClose={async () => {
            await localStorage.setItem("Maintenance", "read");
            await localStorage.setItem("MA1", start);
            await localStorage.setItem("MA2", end);
            setShowModalMaintance(!showModalMaintance);
          }}
          data={dataMaintance}
        />
      )}
    </DashboardLayout>
  ) : (
    <Navigate to="" />
  );
};

export default ProtectRoute;
