import { Button } from "antd";
import React from "react";
import color from "../../resource/color";

function LoginButton() {
  return (
    <div>
      <Button
        onClick={() => (window.location.href = "/OverviewPage")}
        style={{
          backgroundColor: color.primary1,
          color: color.White,
          width: "400px",
          height: "40px",
          borderRadius: "5px",
          marginTop: 10,
        }}
      >
        Login
      </Button>
    </div>
  );
}

export default LoginButton;
