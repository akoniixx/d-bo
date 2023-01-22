import DatePicker from 'antd/lib/date-picker';
import React from 'react'
import Search from "antd/lib/input/Search";
import AddButtton from '../../components/button/AddButton';
import Layouts from '../../components/layout/Layout'
import Select from 'antd/lib/select';
import { Option } from "antd/lib/mentions";
import Table from 'antd/lib/table';
import Pagination from 'antd/lib/pagination';
import { useNavigate } from 'react-router-dom';

function PromotionPage() {
  const dateSearchFormat = "YYYY-MM-DD";
  const navigate = useNavigate();
  const { RangePicker } = DatePicker;
  const PageTitle = (
    <>
      <div
        className="container d-flex justify-content-between"
        style={{ padding: "10px" }}>
        <div>
          <span
            className="card-label font-weight-bolder text-dark"
            style={{
              fontSize: 22,
              fontWeight: "bold",
              padding: "8px",
            }}>
            <strong>คูปอง (Coupon)</strong>
          </span>
        </div>
        <div className='d-flex'>
          <RangePicker
            allowClear
            onCalendarChange={(val : any) => {}}
            format={dateSearchFormat}
          />
          <div className='ps-3'>
            <AddButtton
              text="เพิ่มคูปอง"
              onClick={() => navigate("/AddPromotion")}
            />
          </div>
        </div>
      </div>
      <div
        className="container d-flex justify-content-between"
        style={{ padding: "8px" }}>
        <div className="col-lg-3">
          <Search
            placeholder="ค้นหาชื่อคูปอง หรือรหัส"
            className="col-lg-12 p-1"
            // value={searchText}
            // onSearch={changeTextSearch}
          />
        </div>
        <div className="col">
          <Select
            className="col-lg-12 p-1"
            onClear={() => {

            }}
            placeholder="เลือกประเภทคูปอง"
            // onChange={handleDistrict}
            showSearch
            // value={"INJECTION"}
            allowClear
            optionFilterProp="children"
            filterOption={(input: any, option: any) =>
              option.children.includes(input)
            }
            filterSort={(optionA, optionB) =>
              optionA.children
                .toLowerCase()
                .localeCompare(optionB.children.toLowerCase())
            }
            >
              <Option value={"INJECTION"}>
                การฉีดพ่น
              </Option>
              <Option value={"DRUG"}>
                ปุ๋ยและยา
              </Option>
          </Select>
        </div>
        <div className="col">
          <Select
            className="col-lg-12 p-1"
            onClear={() => {

            }}
            placeholder="เลือกรูปแบบคูปอง"
            // onChange={handleDistrict}
            showSearch
            // value={"ONLINE"}
            allowClear
            optionFilterProp="children"
            filterOption={(input: any, option: any) =>
              option.children.includes(input)
            }
            filterSort={(optionA, optionB) =>
              optionA.children
                .toLowerCase()
                .localeCompare(optionB.children.toLowerCase())
            }
            >
              <Option value={"ONLINE"}>
                ออนไลน์ (Online)
              </Option>
              <Option value={"OFFLINE"}>
                ออฟไลน์ (Offline)
              </Option>
          </Select>
        </div>
        <div className="col">
          <Select
            className="col-lg-12 p-1"
            onClear={() => {

            }}
            placeholder="เลือกสถานะ"
            // onChange={handleDistrict}
            showSearch
            // value={"ONLINE"}
            allowClear
            optionFilterProp="children"
            filterOption={(input: any, option: any) =>
              option.children.includes(input)
            }
            filterSort={(optionA, optionB) =>
              optionA.children
                .toLowerCase()
                .localeCompare(optionB.children.toLowerCase())
            }
            >
              <Option value={"ACTIVE"}>
                 ใช้งาน
              </Option>
              <Option value={"DRAFTING"}>
                แบบร่าง
              </Option>
              <Option value={"INACTIVE"}>
                ปิดการใช้งาน
              </Option>
          </Select>
        </div>
      </div>
    </>
  );

  const columns = [
    {
      title: () => {
        return (
          <div
            style={{ display: "flex", gap: 8, alignItems: "center" }}>
            ชื่อคูปอง
          </div>
        );
      },
      key: "couponName",
      // render: (value: { updatedAt: string; updateBy?: string }) => {
      //   return {
      //     children: (
      //       <div className="container">
      //         <span className="text-dark-75  d-block font-size-lg">
      //           {moment(value.updatedAt).format("DD/MM/YYYY HH:mm")}
      //         </span>
      //         {value.updateBy && (
      //           <div>
      //             <span
      //               className=" d-block font-size-lg"
      //               style={{ color: color.Grey }}>
      //               <UserOutlined style={{ padding: "0 4px 0 0" }} />

      //               {value?.updateBy}
      //             </span>
      //           </div>
      //         )}
      //       </div>
      //     ),
      //   };
      // },
    },
    {
      title: "ประเภทคูปอง",
      dataIndex: "couponType",
      key: "couponType",
      // render: (value: any, row: any, index: number) => {
      //   return {
      //     children: (
      //       <div className="container">
      //         <span className="text-dark-75  d-block font-size-lg">
      //           {row.firstname + " " + row.lastname}
      //         </span>
      //         <span style={{ color: color.Disable }}>{row.pin}</span>
      //       </div>
      //     ),
      //   };
      // },
    },
    {
      title: "รูปแบบ",
      dataIndex: "couponInfo",
      key: "couponInfo",
      // render: (value: any, row: any, index: number) => {
      //   const subdistrict = row.address.subdistrict;
      //   return {
      //     children: (
      //       <span className="text-dark-75  d-block font-size-lg">
      //         {subdistrict !== undefined
      //           ? subdistrict.subdistrictName
      //           : null}
      //       </span>
      //     ),
      //   };
      // },
    },
    {
      title: "ช่วงเวลาเริ่มต้น - สิ้นสุด",
      dataIndex: "district",
      key: "district",
      // render: (value: any, row: any, index: number) => {
      //   const district = row.address.district;
      //   return {
      //     children: (
      //       <div className="container">
      //         <span className="text-dark-75  d-block font-size-lg">
      //           {district !== undefined
      //             ? district.districtName
      //             : null}
      //         </span>
      //       </div>
      //     ),
      //   };
      // },
    },
    {
      title: "ทั้งหมด",
      dataIndex: "province",
      key: "province",
      // render: (value: any, row: any, index: number) => {
      //   const province = row.address.province;
      //   return {
      //     children: (
      //       <div className="container">
      //         <span className="text-dark-75  d-block font-size-lg">
      //           {province !== undefined
      //             ? province.provinceName
      //             : null}
      //         </span>
      //       </div>
      //     ),
      //   };
      // },
    },
    {
      title: "ถูกใช้แล้ว",
      dataIndex: "telephoneNo",
      key: "telephoneNo",
    },
    {
      title: "สถานะ",
      dataIndex: "totalDroneCount",
      key: "totalDroneCount",
    },
  ];


  return (
    <Layouts>
       {PageTitle}
       <br />
       <Table
        columns={columns}
        // dataSource={data?.data}
        pagination={false}
        scroll={{ x: "max-content" }}
        // rowClassName={(a) =>
        //   a.status == "PENDING" &&
        //   moment(Date.now()).diff(
        //     moment(new Date(a.createdAt)),
        //     "day"
        //   ) >= 3
        //     ? "PENDING" &&
        //       moment(Date.now()).diff(
        //         moment(new Date(a.createdAt)),
        //         "day"
        //       ) >= 7
        //       ? "table-row-older"
        //       : "table-row-old"
        //     : "table-row-lasted"
        // }
      />
      <div className="d-flex justify-content-between pt-5">
        <p>รายการทั้งหมด 0 รายการ</p>
        <Pagination
          // current={current}
          // total={data?.count}
          // onChange={onChangePage}
          // pageSize={row}
          showSizeChanger={false}
        />
      </div>
    </Layouts>
  )
}

export default PromotionPage