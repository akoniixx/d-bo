import { Button, Divider, Form, Input, message, Space } from "antd";
import React, { SyntheticEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthDatasource } from "../../datasource/AuthDatasource";
import { useLocalStorage } from "../../hook/useLocalStorage";
import color from "../../resource/color";

const FromLogin: React.FC = () => {
  const style: React.CSSProperties = {
    width: "400px",
    height: "40px",
    borderRadius: "5px",
  };
  const [formLogin] = Form.useForm();
  const [persistedProfile, setPersistedProfile] = useLocalStorage(
    "profile",
    []
  );

  const navigate = useNavigate();
  const [token, setToken] = useLocalStorage("token", []);
  
  const handlerSubmitFrom = (data: any) => {
    AuthDatasource.login(data.username, data.password).then((res: any) => {
      if (res.accessToken) {
        console.log(res.accessToken);
        message.success("Login Successful");
        setPersistedProfile(res.data);
        setToken(res.accessToken);
        return navigate("HomePage");
      } else {
        return message.error("กรุณากรอกชื่อผู้ใช้หรือรหัสผ่านที่ถูกต้อง");
      }
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
            <Input placeholder="กรอกชื่อผู้ใช้" />
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
            <Input.Password placeholder="กรอกรหัสผ่าน" />
          </Form.Item>
          <div className="text-start">
            <Form.Item>
              <Button
                className="col-lg-12"
                style={{
                  borderRadius: "5px",
                  backgroundColor: color.primary1,
                }}
                type="primary"
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
