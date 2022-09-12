import { Row, Steps } from "antd";
import React, { useEffect, useState } from "react";
import { BackIconButton } from "../../../components/button/BackButton";
import Layouts from "../../../components/layout/Layout";

const _ = require("lodash");
const { Map } = require("immutable");
let queryString = _.split(window.location.pathname, "=");
console.log(queryString);

const EditNewTask = () => {
  const profile = JSON.parse(localStorage.getItem("profile") || "{  }");
  const [current, setCurrent] = useState(0);
 
  return (
    <>
      <Layouts>
        <Row>
          <BackIconButton
            onClick={() => (window.location.href = "/IndexNewTask")}
          />
          <span className="pt-3">
            <strong style={{ fontSize: "20px" }}>แก้ไขงานบินใหม่</strong>
          </span>
        </Row>
      </Layouts>
    </>
  );
};
export default EditNewTask;
