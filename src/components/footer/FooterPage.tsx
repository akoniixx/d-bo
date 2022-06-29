import React from "react";
import { Button, Row } from "antd";
import { color } from "../../resource";
import { Footer } from "antd/lib/layout/layout";
import { BackButton } from "../button/BackButton";
import SaveButton from "../button/SaveButton";

interface FoolterPageProps {
  onClickBack?: () => void;
  onClickSave?: () => void;
}
export const FooterPage: React.FC<FoolterPageProps> = ({
  onClickBack,
  onClickSave,
}) => (
  <Footer>
    <Row className="d-flex justify-content-between">
      <BackButton onClick={onClickBack} />
      <SaveButton onClick={onClickSave} />
    </Row>
  </Footer>
);

export default FooterPage;
