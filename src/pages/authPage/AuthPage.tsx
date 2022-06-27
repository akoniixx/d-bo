import { Button } from "antd";
import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import LoginButton from "../../components/button/LoginButton";
import LoginEmail from "../../components/input/LoginEmail";
import color from "../../resource/color";
import icon from "../../resource/icon";
import image from "../../resource/image";

export const AuthPage: React.FC = () => {
  return (
    <Container
      fluid
      className="px-0 vh-100 overflow-hidden "
      style={{ backgroundColor: color.BG }}
    >
      <Row xs={1} md={1} lg={2} className="h-100">
        <Col lg={{ span: 6 }}>
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
        </Col>
        <Col className="gutter-row d-flex align-item-center justify-content-center height-res">
          <div className="login-content flex-row-fluid d-flex flex-column justify-content-center position-relative overflow-hidden p-7 mx-auto">
            <div className="d-flex justify-content-center">
              <img alt="logo" src={icon.logoLogin} width={"30%"} />
            </div>
            <div className="d-flex justify-content-center">
              <LoginEmail />
            </div>
            <div className="d-flex justify-content-center">
              <LoginButton />
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AuthPage;
