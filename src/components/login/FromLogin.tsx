import { Button, Divider, Form, Input, message, Space } from "antd";
import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthDatasource } from "../../datasource/AuthDatasource";
import { useLocalStorage } from "../../hook/useLocalStorage";
import color from "../../resource/color";
import { MaintenanceDataSource } from "../../datasource/MaintenanceDataSource";
import moment from "moment";
import { convertBuddhistYear } from "../../utilities/ConvertToBuddhistYear";

const FromLogin: React.FC = () => {
  const style: React.CSSProperties = {
    height: "35px",
    borderRadius: "5px",
  };
  const [formLogin] = Form.useForm();
  const [persistedProfile, setPersistedProfile] = useLocalStorage(
    "profile",
    []
  );
  const [start, setStart] = useState<any>();
  const [end, setEnd] = useState<any>();

  const navigate = useNavigate();
  const [token, setToken] = useLocalStorage("token", []);
  useEffect(() => {
    const getMaintenance = async () => {
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
          }
        })
        .catch((err) => console.log(err));
    };
    getMaintenance();
  }, []);

  const handlerSubmitFrom = (data: any) => {
    AuthDatasource.login(data.username, data.password)
      .then((res: any) => {
        if (res.accessToken) {
          localStorage.setItem("MA1", start);
          localStorage.setItem("MA2", end);
          message.success("Login Successful");
          setPersistedProfile(res.data);
          setToken(res.accessToken);
          return navigate("HomePage");
        } else if (res.responseCode == "F101-Permission") {
          message.error("user นี้ไม่มีสิทธิ์เข้าใช้งาน กรุณาติดต่อเจ้าหน้าที่");
        } else if (
          res.responseCode == "F102-This user does not exist in the system."
        ) {
          message.error("user นี้ไม่มีในระบบ");
        }
      })
      .catch((error) => {
        message.error("username หรือ password ไม่ถูกต้อง");
      });
  };

  return (
    <div className="col-lg-12">
      <Form
        form={formLogin}
        name="formLogin"
        layout="vertical"
        onFinish={handlerSubmitFrom}
      >
        <div className="text-start">
          <label>
            Username <span style={{ color: "red" }}>*</span>
          </label>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "กรุณากรอกชื่อผู้ใช้",
              },
            ]}
          >
            <Input placeholder="กรอกชื่อผู้ใช้" style={style} />
          </Form.Item>
        </div>
        <div className="text-start">
          <label>
            Password <span style={{ color: "red" }}>*</span>
          </label>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "กรุณากรอกรหัสผ่าน",
              },
            ]}
          >
            <Input.Password placeholder="กรอกรหัสผ่าน" style={style} />
          </Form.Item>
          <div className="text-start">
            <Form.Item>
              <Button
                className="col-lg-12"
                style={{
                  borderRadius: "5px",
                  height: "35px",
                  backgroundColor: color.primary1,
                  color: color.White,
                }}
                type="ghost"
                htmlType="submit"
              >
                Login
              </Button>
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
};
export default FromLogin;
