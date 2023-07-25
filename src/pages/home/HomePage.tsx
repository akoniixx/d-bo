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

  const checkMaintence = () => {
    MaintenanceDataSource.getMaintenceSystem("BO").then((res) => {
      setShowModalMaintance(res.id ? true : false);
      res.textDate =
        "วันที่ " +
        convertBuddhistYear.toBuddhistYear(
          moment(res.dateStart),
          "DD MMMM YYYY ช่วงเวลา HH:mm - "
        ) +
        moment(res.dateEnd).format("HH:mm น.");
      setDataMaintance(res);
    });
  };

  useEffect(() => {
    checkMaintence();
  }, []);

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
          // width: "100%",
          textAlign: "center",
          // backgroundColor: color.BG,
        }}
      >
        <span>version {version}</span>
        <span>{process.env.NODE_ENV}</span>
        <span>{BASE_URL}</span>
      </footer>
      </div>
      

      {dataMaintance.id && (
        <ModalMaintence
          show={showModalMaintance}
          onClose={() => setShowModalMaintance(!showModalMaintance)}
          data={dataMaintance}
        />
      )}
    </div>
  );
}
