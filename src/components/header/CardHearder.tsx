import React from "react";
import { Button } from "antd";
import { color } from "../../resource";

interface CardHeaderProps {
  onClick?: Function;
  showButton: boolean;
  textHeader:string;
  textButton?: string;
}
export const CardHeader: React.FC<CardHeaderProps> = ({ onClick, showButton,textHeader,textButton }) => (
    <div
    style={{
      backgroundColor: color.Success,
      borderRadius: "12px 12px 0px 0px",
      padding: "10px 10px 10px 10px",
    }}
    className="d-flex justify-content-between"
  >
    <h4 className="pt-2 ps-3" style={{ color: "white" }}>
      {textHeader}
    </h4>
    {showButton ? (
      <Button className="pt-2" style={{backgroundColor:color.secondary1,color:'white', border:'none', borderRadius:'5px'}}>
        {textButton}
      </Button>
    ) : (
      <></>
    )}
  </div>
);

export default CardHeader;
