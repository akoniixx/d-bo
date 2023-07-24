import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { CouponDataSource } from '../../datasource/CouponDatasource';
import {
    Image, Pagination
} from 'antd'
import { icon } from '../../resource';
import { CardHeaderPromotion } from '../header/CardHeaderPromotion';
interface RenderMobile {
    id : string;
}
const RenderOffline:React.FC<RenderMobile> = ({id})=> {
    // const div = useRef<any>();
    // useLayoutEffect(() => {
    //   const divAnimate = div.current.getBoundingClientRect().top;
    //   const onScroll = () => {
    //     if (divAnimate < window.scrollY) {
    //       console.log("ok");
    //       div.current.style.position = "fixed";
    //       div.current.style.bottom = 0;
    //     } else {
    //       div.current.style.position = "relative";
    //     }
    //   };
    //   window.addEventListener("scroll", onScroll);
    //   return () => window.removeEventListener("scroll", onScroll);
    // }, []);
    const [page,setPage] = useState<number>(1);
    const [data,setData] = useState<any>([])
    useEffect(()=>{
        CouponDataSource.getAllOffline(id,page,10).then(
            res => {
                setData(res.promotions)
            }
        )
    },[page])

    const statusRender = (status : boolean)=>{
        return ( 
        (status)?<div className='d-flex'>
            <span className='ps-2 text-error'><Image src={icon.pointDisabled} width={10} height={10} /> ถูกใช้งาน</span>
        </div>:
        <div className='d-flex'>
            <span className='ps-2 text-warning'><Image src={icon.pointWarning} width={10} height={10} /> ยังไม่ได้ถูกใช้งาน</span>
        </div>
        );
    }
    return (
      <div className="col-4">
        <div>
        <CardHeaderPromotion textHeader="รายการรหัสคูปอง" center={true}/>
        <div style={{
          width : '100%',
        }} className="bg-white">
            {
                data.map((item : any,index : number)=> (
                    <div className='py-4 px-3 d-flex flex-row justify-content-between align-items-center border-bottom' style={{
                        width : '100%'
                    }}>
                        <div className='d-flex flex-row justify-content-between align-items-center'>
                            <p className='m-0'>{index + 10*(page-1) + 1}</p>
                            <p className='m-0 ps-4'>รหัสคูปอง : {item.couponCode}</p>
                        </div>
                        <div>
                            {statusRender(item.used)}
                        </div>
                    </div>
                ))
            }
            <div className='p-3'>
                <Pagination 
                    size='small'
                    simple defaultCurrent={1} 
                    total={100} 
                    showTotal={(total) => `ทั้งหมด ${total} รายการ`}
                    onChange={(page,pageNumber)=>{
                        setPage(page)
                    }}
                />
            </div>
        </div>
        </div>
      </div>
    )
}

export default RenderOffline