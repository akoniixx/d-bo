import React, { useEffect, useState } from "react";
import { useLocalStorage } from "../../hook/useLocalStorage";
import packageJson from "../../../package.json";
import { ModalMaintence } from "../../components/modal/ModalMaintenance";
import { MaintenanceDataSource } from "../../datasource/MaintenanceDataSource";
import {
  MaintenanceSystem,
  MaintenanceSystem_INIT,
} from "../../entities/MaintenanceSystemEntities";
import moment from "moment";
import { convertBuddhistYear } from "../../utilities/ConvertToBuddhistYear";
import { DashboardLayout } from "../../components/layout/Layout";
import color from "../../resource/color";
import { BASE_URL } from "../../config/config";

export function HomePage() {
  let version = packageJson.version;
  const [persistedProfile, setPersistedProfile] = useLocalStorage(
    "profile",
    []
  );
  const [dataMaintance, setDataMaintance] = useState<MaintenanceSystem>(
    MaintenanceSystem_INIT
  );
  const [showModalMaintance, setShowModalMaintance] = useState<boolean>(true);
  const dateNow = moment(Date.now());
  const [checkTime, setCheckTime] = useState(false);

  useEffect(() => {
    const getMaintenance = async () => {
      const value = await localStorage.getItem("Maintenance");
      await MaintenanceDataSource.getMaintenceSystem("BO")
        .then((res) => {
          if (res.responseData !== null) {
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
  }, []);

  const checkTimeMaintance = (startDate: any, endDate: any) => {
    return dateNow.isBetween(startDate, endDate, "milliseconds");
  };

  return (
    <div>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <h1>ยินดีต้อนรับ</h1>
        <h2>
          คุณ {persistedProfile.firstname + " " + persistedProfile.lastname}
        </h2>
        <footer
          style={{
            position: "fixed",
            bottom: 0,
            textAlign: "center",
          }}
        >
          <span>version {version}</span>
        </footer>
      </div>

      {checkTime === true && (
        <ModalMaintence
          show={showModalMaintance}
          onClose={async () => {
            await localStorage.setItem("Maintenance", "read");
            setShowModalMaintance(!showModalMaintance);
          }}
          data={dataMaintance}
        />
      )}
    </div>
  );
}
