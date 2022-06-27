import { Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import React from "react";
import color from "../../resource/color";

function EditButton() {
  return (
    <div>
      <Button
        style={{
          borderRadius: "7px 7px 7px 7px",
          color: color.primary1,
        }}
        icon={<EditOutlined />}
      />
    </div>
  );
}

export default EditButton;
