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
    <div className=" overflow-hidden " style={{ backgroundColor: color.BG }}>
      <div className="row">
        <div className="col-lg-6">
          <div className="d-flex justify-content-start">
            <img alt="imageLogin" src={image.login} width={"100%"} />
          </div>
        </div>
        <div className="col-lg-6 ">
          <div
            style={{
              marginTop: "25%",
              paddingLeft: "25%",
              paddingRight: "25%",
            }}
          >
            <div className="text-center">
              <img alt="logo" src={icon.iconLogin} width={"60%"} />
            </div>
            <div
              className="text-center justify-content-center"
              style={{ marginTop: "3rem" }}
            >
              <FromLogin />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
