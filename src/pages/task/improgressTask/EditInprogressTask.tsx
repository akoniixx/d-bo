import { Row } from "antd";
import React, { useEffect, useState } from "react";
import { BackIconButton } from "../../../components/button/BackButton";
import Layouts from "../../../components/layout/Layout";
import { TaskDatasource } from "../../../datasource/TaskDatasource";
import { TaskInprogressEntity } from "../../../entities/TaskInprogress";

const _ = require("lodash");
const { Map } = require("immutable");
let queryString = _.split(window.location.pathname, "=");

const EditInprogressTask = () => {
  const [data, setData] = useState<TaskInprogressEntity>();

  const fetchInprogressTask = async () => {
    await TaskDatasource.getInprogressTaskById(queryString[1]).then((res) => {
      console.log(res);
      setData(res);
    });
  };

  useEffect(() => {
    fetchInprogressTask();
  }, []);

  return (
    <>
      <Layouts>
        <Row>
          <BackIconButton
            onClick={() => (window.location.href = "/IndexInprogressTask")}
          />
          <span className="pt-3">
            <strong style={{ fontSize: "20px" }}>แก้ไขงาน</strong>
          </span>
        </Row>
      </Layouts>
    </>
  );
};
export default EditInprogressTask;
