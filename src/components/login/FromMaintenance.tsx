import { Form } from "antd";
import { AuthDatasource } from "../../datasource/AuthDatasource";
import { MaintenanceSystem } from "../../entities/MaintenanceSystemEntities";
import { useLocalStorage } from "../../hook/useLocalStorage";
import color from "../../resource/color";
import { convertBuddhistYear } from "../../utilities/ConvertToBuddhistYear";
import moment from "moment";

interface FromMaintenanceProp {
  data: MaintenanceSystem;
}
export const FromMaintenance: React.FC<FromMaintenanceProp> = (data) => {
  const sameDay =
    convertBuddhistYear.toBuddhistYear(
      moment(data.data.dateStart),
      "DD MMMM YYYY"
    ) ===
    convertBuddhistYear.toBuddhistYear(
      moment(data.data.dateEnd),
      "DD MMMM YYYY"
    );
  return (
    <div className="col-lg-12">
      <div style={{ width: "100%" }}>
        <div className="text-center">
          <h3>{data.data.header}</h3>
        </div>
        <div className="text-center p-1">
          {sameDay === true ? (
            <h5>{data.data.textDate}</h5>
          ) : (
            <>
              <h5 style={{ fontSize: "17px" }}>
                วันที่{" "}
                {convertBuddhistYear.toBuddhistYear(
                  moment(data.data.dateStart),
                  "DD MMMM YYYY ช่วงเวลา HH:mm - 00:59 น."
                )}{" "}
              </h5>
              <h5 style={{ fontSize: "17px" }}>
                ถึงวันที่{" "}
                {convertBuddhistYear.toBuddhistYear(
                  moment(data.data.dateEnd),
                  "DD MMMM YYYY ช่วงเวลา 00:00 - HH:mm น."
                )}{" "}
              </h5>
            </>
          )}
        </div>
        <div className="text-center">
          <label style={{ color: color.Grey, fontSize: "16px" }}>
            {data.data.text}
          </label>
        </div>
        <div className="text-center">
          <label style={{ color: color.Grey, fontSize: "16px" }}>
            {data.data.footer}
          </label>
        </div>
      </div>
    </div>
  );
};
