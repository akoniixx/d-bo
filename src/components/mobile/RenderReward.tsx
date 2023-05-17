import React, { useLayoutEffect, useRef } from "react";
import { Image } from "antd";
import parse from "html-react-parser";
import { CardHeaderPromotion } from "../header/CardHeaderPromotion";
import uploadImg from "../../resource/media/empties/upload_img_news.png";
import {
  numberWithCommas,
  numberWithCommasToFixed,
} from "../../utilities/TextFormatter";
import { formatMoney } from "../../utilities/TextFormatter";

interface RenderReward {
  img: string;
  name: any;
  description: any;
  condition: any;
  point: any;
  count: any;
}

const RenderReward: React.FC<RenderReward> = ({
  img,
  name,
  description,
  condition,
  point,
  count,
}) => {
  const div = useRef<any>();
  useLayoutEffect(() => {
    const divAnimate = div.current.getBoundingClientRect().top;
    const onScroll = () => {
      if (divAnimate < window.scrollY) {
        div.current.style.position = "sticky";
        div.current.style.top = 0;
      } else {
        div.current.style.position = "relative";
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="col-lg-12">
      <div ref={div}>
        <CardHeaderPromotion
          textHeader="ตัวอย่างในแอปพลิเคชั่น"
          center={true}
        />
        <div
          style={{
            width: "100%",
          }}
          className="bg-white"
        >
          <div
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <Image
              src={img ? img : uploadImg}
              width={"100%"}
              height={"26.7%"}
              preview={false}
            />
            <div className="p-4">
              <p style={{ fontSize: "23px", fontWeight: "600" }}>
                {!name ? "ชื่อของรางวัล" : name}
              </p>
              <p style={{ fontSize: "18px", fontWeight: "400" }}>{`ใช้คะแนน  ${
                !point ? 0 : numberWithCommas(parseFloat(point))
              } คะแนน`}</p>
              <div
                style={{
                  width: "170px",
                  height: "62px",
                  backgroundColor: "#FFEFDD",
                  borderRadius: 12,
                }}
              >
                <div style={{ paddingLeft: "12px", paddingTop: "8px" }}>
                  <h1 style={{ color: "#B26003", fontSize: "15px" }}>
                    จำนวนคงเหลือ
                  </h1>
                  <p style={{ fontSize: "17px", fontWeight: "bold" }}>
                    {count}
                  </p>
                </div>
              </div>
              <br />
              <p>รายละเอียด</p>
              <p>{!description ? "-" : parse(description)}</p>
              <p>เงื่อนไข</p>
              <p>{!condition ? "-" : parse(condition)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenderReward;
