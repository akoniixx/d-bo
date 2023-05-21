import { Row } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BackIconButton } from "../../components/button/BackButton";
import Layouts from "../../components/layout/Layout";

const DetailDronerRedeem = () => {
  const navigate = useNavigate();
  return (
    <Layouts>
      <Row>
        <BackIconButton onClick={() => navigate(-1)} />
        <span className="pt-3">
          <strong style={{ fontSize: "20px" }}>
            รายละเอียดการแลกแต้ม | RD0000001
          </strong>
        </span>
      </Row>
    </Layouts>
  );
};

export default DetailDronerRedeem;
