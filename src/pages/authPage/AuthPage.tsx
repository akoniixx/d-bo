import { Button } from "antd";
import React, { useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import FromLogin from "../../components/login/FromLogin";
import color from "../../resource/color";
import icon from "../../resource/icon";
import image from "../../resource/image";

export const AuthPage: React.FC = () => {

  return (
    <div
      className="px-0 vh-100 row overflow-hidden "
      style={{ backgroundColor: color.BG }}
    >
      <div className="h-100 row">
        <div className="col-lg-6">
          <div className="d-flex flex-column h-100 justify-content-center">
            <div className="d-flex justify-content-center">
              <img alt="imageLogin" src={image.login} width={"100%"} />
            </div>
            <div
              style={{
                position: "absolute",
                zIndex: "99px",
                marginTop: "55rem",
                marginLeft: "2rem",
              }}
            >
              <img alt="imageLogin" src={icon.logoLogin} width={"30%"} />
            </div>
          </div>
        </div>
        <Col className="gutter-row d-flex align-item-center justify-content-center height-res">
          <div
            className="login-content flex-row-fluid d-flex flex-column justify-content-center position-relative overflow-hidden mx-auto"
            style={{ paddingBottom: "10rem" }}
          >
            <div className="d-flex justify-content-center">
              <img alt="logo" src={icon.logoLogin} width={"30%"} />
            </div>
            <div className="d-flex justify-content-center">
              <FromLogin />
            </div>
          </div>
        </Col>
      </div>
    </div>
  );
};

export default AuthPage;
