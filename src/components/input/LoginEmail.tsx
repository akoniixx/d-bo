import { Form, Input } from "antd";
import React from "react";

function LoginEmail() {
  const style: React.CSSProperties = {
    width: "400px",
    height: "40px",
    borderRadius: "5px",
  };
  return (
    <div>
      <Form layout="vertical">
        <Form.Item label="Username">
          <Input style={style} placeholder="กรอกชื่อผู้ใช้" />
        </Form.Item>
        <Form.Item label="Password">
          <Input.Password style={style} placeholder="กรอกรหัสผ่าน" />
        </Form.Item>
      </Form>
    </div>
  );
}

export default LoginEmail;
