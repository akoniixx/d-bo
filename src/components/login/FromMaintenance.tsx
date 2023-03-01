import { Form } from "antd";
import { AuthDatasource } from "../../datasource/AuthDatasource";
import { MaintenanceSystem } from "../../entities/MaintenanceSystemEntities";
import { useLocalStorage } from "../../hook/useLocalStorage";
import color from "../../resource/color";

interface FromMaintenanceProp {
  data: MaintenanceSystem;
}
export const FromMaintenance: React.FC<FromMaintenanceProp> = (data) => {
  return (
    <div className="col-lg-12">
      <div style={{ width: "100%" }}>
        <div className="text-center">
          <h3>{data.data.header}</h3>
        </div>
        <div className="text-center p-1">
          <h5>{data.data.textDate}</h5>
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
