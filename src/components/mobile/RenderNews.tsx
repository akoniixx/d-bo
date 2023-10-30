import React, { useLayoutEffect, useRef } from 'react'
import { CardHeaderPromotion } from '../header/CardHeaderPromotion';
import uploadImg from "../../resource/media/empties/upload_img_news.png";
import { Image } from 'antd';
import parse from "html-react-parser";
import "../../news.css"

interface RenderNews{
    img : string;
    name : string;
    description : string;

}

const RenderNews : React.FC<RenderNews> = ({
    img,
    name,
    description
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
                   <Image src={img??uploadImg} width={'100%'} height={'26.7%'} preview={false}/> 
                   <div className='p-4'>
                      <h5>{
                        !name?
                        'หัวข้อ' : name
                      }</h5>
                      <p>{} อ่านแล้ว 0 ครั้ง</p>
                      <p>{
                        !description?
                        "รายละเอียด" : 
                        parse(description)
                      }</p>
                   </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default RenderNews