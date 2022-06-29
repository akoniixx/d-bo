import { Button, Divider, Form, Input, Space } from "antd";
import React, { SyntheticEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthDatasource } from "../../datasource/AuthDatasource";
import { useLocalStorage } from "../../hook/useLocalStorage";
const FromLogin: React.FC = () => {
  const style: React.CSSProperties = {
    width: "400px",
    height: "40px",
    borderRadius: "5px",
  };
  const [formLogin] = Form.useForm();
  const [token, setToken] = useLocalStorage("token", []);
  let navigate = useNavigate();

  const handlerSubmitFrom = async (values: any) => {
    console.log(values);
    await AuthDatasource.login(values.username, values.password).then(
      (response: any) => {
        console.log(response);
      }
    );
  };

  return (
    <div>
      <Form
        form={formLogin}
        name="formLogin"
        layout="vertical"
        onFinish={handlerSubmitFrom}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please enter your username",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please enter your password",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Divider>
            <Space>
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </Space>
          </Divider>
        </Form.Item>
      </Form>
    </div>
  );
};
export default FromLogin;
