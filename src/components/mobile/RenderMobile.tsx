import React, { useLayoutEffect, useRef } from "react";
import { icon } from "../../resource";
import { CardHeaderPromotion } from "../header/CardHeaderPromotion";
import { Image } from "antd";
import parse from "html-react-parser";

interface RenderMobile {
  couponName: string;
  couponType: string;
  promotionStatus: string;
  count: string;
  startDate: string;
  expiredDate: string;
  startTime: string;
  expiredTime: string;
  expiredDateTitle: string;
  raiConditionMin: string;
  raiConditionMax: string;
  serviceConditionMin: string;
  serviceConditionMax: string;
  plantName: string;
  province: string[];
  descriptionEditor: string;
  conditionEditor: string;
  raiCondition: boolean;
  serviceCondition: boolean;
  couponPlant: boolean;
  couponProvince: boolean;
  // ref : any
}
const RenderMobile: React.FC<RenderMobile> = ({
  couponName,
  couponType,
  promotionStatus,
  count,
  startDate,
  expiredDate,
  startTime,
  expiredTime,
  expiredDateTitle,
  raiConditionMin,
  raiConditionMax,
  serviceConditionMin,
  serviceConditionMax,
  plantName,
  province,
  descriptionEditor,
  conditionEditor,
  raiCondition,
  serviceCondition,
  couponPlant,
  couponProvince,
  // ref
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
  function checkRai(min: number | null, max: number | null): string {
    let result;
    if (!min && !max) {
      result = "ไม่จำกัดไร่";
    } else if (!min && max) {
      result = `เมื่อจ้างไม่เกิน ${max} ไร่`;
    } else if (min && !max) {
      result = `เมื่อจ้างขั้นต่ำ ${min} ไร่`;
    } else {
      result = `เมื่อจ้างไม่เกิน ${max} ไร่`;
    }
    return result;
  }

  const generateRaiText = () => {
    if (raiConditionMin === "" && raiConditionMax === "") {
      return "จำนวนไร่ขั้นต่ำที่ฉีดพ่น XX ไร่";
    } else if (raiConditionMin != "" && raiConditionMax === "") {
      return `จำนวนไร่ขั้นต่ำที่ฉีดพ่น ${raiConditionMin} ไร่`;
    } else if (raiConditionMin === "" && raiConditionMax != "") {
      return `จำนวนไร่ที่ฉีดพ่นต้องไม่เกิน ${raiConditionMax} ไร่`;
    } else {
      return `จำนวนไร่ขั้นต่ำที่ฉีดพ่น ${raiConditionMin} ไร่ และไม่เกิน ${raiConditionMax} ไร่`;
    }
  };

  const generateServiceText = () => {
    if (serviceConditionMin === "" && serviceConditionMax === "") {
      return "ค่าบริการขั้นต่ำ XX บาท";
    } else if (serviceConditionMin != "" && serviceConditionMax === "") {
      return `ค่าบริการขั้นต่ำ ${serviceConditionMin} บาท`;
    } else if (serviceConditionMin === "" && raiConditionMax != "") {
      return `ค่าบริการต้องไม่เกิน ${serviceConditionMax} บาท`;
    } else {
      return `ค่าบริการขั้นต่ำ ${serviceConditionMin} บาทและไม่เกิน ${serviceConditionMax} บาท`;
    }
  };
  return (
    <div className="col-4">
      <div ref={div}>
        <CardHeaderPromotion textHeader="ตัวอย่างในแอปพลิเคชั่น" center={true} />
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
            <div
              style={{
                width: "100%",
                height: "120px",
                backgroundColor: "#2EC56E",
                padding: "15px",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "10px",
                  backgroundColor: "#FFF",
                  display: "flex",
                  padding: "0px 20px",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "20px",
                    backgroundColor: "#ECFBF2",
                    marginRight: "15px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {
                    !couponType?
                    <></>:
                    <img
                    src={
                      couponType === "INJECTION" ? icon.injection : icon.drug
                    }
                  />
                  }
                </div>
                <div>
                  <p
                    style={{
                      margin: "0px",
                      padding: "0px",
                      fontSize: "16px",
                    }}
                  >
                    {couponName === "" ? "ชื่อคูปอง" : couponName}
                  </p>
                  <p
                    style={{
                      margin: "0px",
                      padding: "0px",
                      fontSize: "12px",
                    }}
                  >
                    {checkRai(
                      parseInt(raiConditionMin),
                      parseInt(raiConditionMax)
                    )}
                  </p>
                  <p
                    style={{
                      margin: "0px",
                      padding: "0px",
                      fontSize: "12px",
                      color: "#747F8B",
                    }}
                  >
                    {expiredDate === ""
                      ? "หมดเขต XX เดือน XXXX"
                      : `หมดเขต ${expiredDate}`}
                  </p>
                </div>
              </div>
            </div>
            <div
              style={{
                width: "100%",
                height: "15%",
                backgroundColor: "#F7FFF0",
                display: "flex",
                flexFlow: "column",
                alignItems: "center",
                padding: "12px 20px",
              }}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <p
                  style={{
                    fontSize: "16px",
                  }}
                >
                  คูปองเหลือ
                </p>
                <p
                  style={{
                    fontSize: "16px",
                    color: "#FB8705",
                  }}
                >
                  {count === "" ? "XX" : count}
                  <span
                    style={{
                      color: "#000",
                    }}
                  >
                    /{count === "" ? "XX" : count} สิทธิ
                  </span>
                </p>
              </div>
              <div
                style={{
                  width: "100%",
                  height: "10px",
                  
                  borderRadius: "5px",
                  backgroundImage:
                    "linear-gradient(67.07deg, #FB8705 14.86%, #FFCF75 85.14%)",
                }}
              ></div>
            </div>
            <div
              style={{
                width: "100%",
                maxHeight : '450px',
                overflow : 'scroll',
                padding: "10px 20px",
              }}
            >
              <p
                style={{
                  fontSize: "16px",
                }}
              >
                ช่วงเวลาที่ใช้งานได้
              </p>
              <p
                style={{
                  fontSize: "16px",
                  color: "#5F6872",
                }}
              >
                {`${
                  startDate === ""
                    ? `XX XXXX${
                        startTime === "" ? ", XX:XX น." : `, ${startTime} น.`
                      }`
                    : `${startDate}${
                        startTime === "" ? ", XX:XX น." : `, ${startTime} น.`
                      }`
                } ถึง ${
                  expiredDate === ""
                    ? `XX XXXX${
                        expiredTime === ""
                          ? ", XX:XX น."
                          : `, ${expiredTime} น.`
                      }`
                    : `${expiredDate}${
                        expiredTime === ""
                          ? ", XX:XX น."
                          : `, ${expiredTime} น.`
                      }`
                }`}
              </p>
              <p
                style={{
                  fontSize: "16px",
                }}
              >
                รายละเอียด
              </p>
              {
                <p>
                  {parse(
                    descriptionEditor ?? `<p style="font-size : 16px">...</p>`
                  )}
                </p>
              }
              <p
                style={{
                  fontSize: "16px",
                }}
              >
                เงื่อนไข
              </p>
              {
                <p>
                  {parse(
                    conditionEditor ?? `<p style="font-size : 16px">...</p>`
                  )}
                </p>
              }
              <p
                style={{
                  fontSize: "16px",
                }}
              >
                เงื่อนไขการใช้คูปอง
              </p>
              <ul>
                {raiCondition ? <li>{generateRaiText()}</li> : <></>}
                {serviceCondition ? <li>{generateServiceText()}</li> : <></>}
                {couponPlant ? <li>พืชที่ใช้คูปองได้ {plantName}</li> : <></>}
                {couponProvince ? (
                  <li>
                    จังหวัด{" "}
                    {province.map((item: any) => {
                      return item + " ";
                    })}
                  </li>
                ) : (
                  <li>ใช้ได้ทุกจังหวัด</li>
                )}
              </ul>
              <div
                style={{
                  margin: "10px 0px",
                  width: "100%",
                  height: "54px",
                  backgroundColor: "#2EC46D",
                  borderRadius: "8px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <p
                  style={{
                    margin: "0px",
                    color: "#FFF",
                    fontSize: "18px",
                  }}
                >
                  เก็บส่วนลด
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenderMobile;
