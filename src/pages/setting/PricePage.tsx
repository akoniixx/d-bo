import { EditOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input, Pagination, Select, Table } from "antd";
import { useEffect, useState } from "react";
import ActionButton from "../../components/button/ActionButton";
import { CardContainer } from "../../components/card/CardContainer";
import Layouts from "../../components/layout/Layout";
import ModalCropByProvince from "../../components/modal/ModalCropByProvince";
import ModalEditLocationPrice from "../../components/modal/ModalEditLocationPrice";
import color from "../../resource/color";

function PricePage() {
  const [current, setCurrent] = useState(1);
  const [showModalEdit, setShowModalEdit] = useState<boolean>(false);
  const [showModalCrop, setShowModalCrop] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>();

  const changeTextSearch = (searchText: any) => {
    setSearchText(searchText.target.value);
    setCurrent(1);
  };
  const columns = [
    {
      title: "จังหวัด",
      dataIndex: "province",
      key: "province",
      width: "25%",
    },
    {
      title: "พืช",
      dataIndex: "crop",
      key: "crop",
      width: "15%",
      render: (value: any, row: any, index: number) => {
        const previewCrop = async () => {
          setShowModalCrop((prev) => !prev);
          //getCropList
        };
        return {
          children: (
            <div>
              <span
                style={{
                  cursor: "pointer",
                  color: color.Success,
                  textDecorationLine: "underline",
                }}
                onClick={previewCrop}
              >
                ดูรายการพืช
              </span>
            </div>
          ),
        };
      },
    },
    {
      title: "ช่วงราคาฉีดพ่น",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "จำนวนอำเภอ",
      dataIndex: "district",
      key: "district",
    },
    {
      title: "จำนวนตำบล",
      dataIndex: "subDistrict",
      key: "subDistrict",
    },
    {
      title: "อัพเดตล่าสุด",
      dataIndex: "updates",
      key: "updates",
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      width: "6%",
      render: (value: any, row: any, index: number) => {
        const handleModalEdit = () => {
          setShowModalEdit((prev) => !prev);
        };
        return {
          children: (
            <div className="d-flex flex-row justify-content-between">
              <ActionButton
                icon={<EditOutlined />}
                color={color.primary1}
                onClick={() => handleModalEdit()}
              />
            </div>
          ),
        };
      },
    },
  ];
  const datas = [
    {
      province: "สระบุรี",
      price: "60",
      crop: "นาข้าว",
      district: "13 อำเภอ",
      subDistrict: "28 ตำบล",
      updates: "15/02/2023, 10:00",
    },
  ];
  useEffect(() => {
    fetchPrice();
  }, [current]);
  const fetchPrice = async () => {};
  const pageTitle = (
    <div className="container d-flex" style={{ padding: "8px" }}>
      <div className="col-lg-6">
        <span
          className="card-label font-weight-bolder text-dark"
          style={{ fontSize: 22, fontWeight: "bold", padding: "8px" }}
        >
          <strong>ราคาฉีดพ่น (Price)</strong>
        </span>
      </div>
      <div className="col-lg-3 p-1">
        <Input
          allowClear
          prefix={<SearchOutlined style={{ color: color.Disable }} />}
          placeholder="ค้นหาจังหวัด, อำเภอ, หรือตำบล"
          className="col-lg-12 p-1"
          onChange={changeTextSearch}
        />
      </div>
      <div className="col-lg p-1">
        <Button
          style={{
            borderColor: color.Success,
            borderRadius: "5px",
            color: color.secondary2,
            backgroundColor: color.Success,
          }}
          className="col-lg-12"
          onClick={fetchPrice}
        >
          ค้นหาข้อมูล
        </Button>
      </div>
      <div className="col-lg p-1">
        <Button
          style={{
            borderColor: color.Success,
            borderRadius: "5px",
            color: color.secondary2,
            backgroundColor: color.Success,
          }}
        >
          อัพโหลดราคา Excel
        </Button>
      </div>
    </div>
  );
  const updateLocationPrice = async (data: any) => {
  };
  return (
    <Layouts>
      {pageTitle}
      <CardContainer>
        <Table
          dataSource={datas}
          columns={columns}
          pagination={false}
          size="large"
          tableLayout="fixed"
        />
      </CardContainer>
      <div className="d-flex justify-content-between pt-5">
        <p>รายการทั้งหมด 0 รายการ</p>
      </div>
      {showModalEdit && (
        <ModalEditLocationPrice
          show={showModalEdit}
          backButton={() => setShowModalEdit((prev) => !prev)}
          title="แก้ไขราคา: สระบุรี"
          callBack={updateLocationPrice}
        />
      )}
      {showModalCrop && (
        <ModalCropByProvince
          show={showModalCrop}
          backButton={() => setShowModalCrop((prev) => !prev)}
          title="รายการพืช: จังหวัดสระบุรี"
        />
      )}
    </Layouts>
  );
}
export default PricePage;
