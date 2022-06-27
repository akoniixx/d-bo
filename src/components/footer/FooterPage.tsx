import React from "react";
import { Button, Row } from "antd";
import { color } from "../../resource";
import { Footer } from "antd/lib/layout/layout";
import BackPagebtn from "../button/BackPagebtn";
import SavePagebtn from "../button/SavePagebtn";

interface FoolterPageProps {
  onClick?: Function;
}
export const FooterPage: React.FC<FoolterPageProps> = ({ onClick }) => (
  <Footer>
    <Row className="d-flex justify-content-between">
      <BackPagebtn />
      <SavePagebtn />
    </Row>
  </Footer>
);

export default FooterPage;
