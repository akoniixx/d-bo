import { EditOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input, Pagination, Select, Table } from "antd";
import { useEffect, useState } from "react";
import ActionButton from "../../components/button/ActionButton";
import Layouts from "../../components/layout/Layout";
import ModalCropByProvince from "../../components/modal/ModalCropByProvince";
import ModalEditLocationPrice from "../../components/modal/ModalEditLocationPrice";
import color from "../../resource/color";
import { LocationPriceDatasource } from "../../datasource/LocationPriceDatasource";
import {
  LocationPricePageEntity,
  UpdateLocationPrice,
  UpdateLocationPriceList,
  UpdateLocationPrice_INIT,
} from "../../entities/LocationPrice";
import moment from "moment";

function PricePage() {
  const row = 10;
  const [current, setCurrent] = useState(1);
  const [data, setData] = useState<LocationPricePageEntity>();
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [editIndex, setEditIndex] = useState();
  const [showModalCrop, setShowModalCrop] = useState(false);
  const [searchText, setSearchText] = useState<string>();
  const [provinceId, setProvinceId] = useState();
  const [editLocationPrice, setEditLocationPrice] =
    useState<UpdateLocationPrice>(UpdateLocationPrice_INIT);
  useEffect(() => {
    fetchLocationPrice();
  }, [current]);
  const fetchLocationPrice = async () => {
    await LocationPriceDatasource.getAllLocationPrice(
      current,
      row,
      searchText
    ).then((res: LocationPricePageEntity) => {
      setData(res);
    });
  };
  const handleModalEdit = (plants: UpdateLocationPrice, index: any) => {
    setShowModalEdit((prev) => !prev);
    setEditIndex(index);
    setEditLocationPrice(plants);
  };
  const onChangePage = (page: number) => {
    setCurrent(page);
  };
  const changeTextSearch = (searchText: any) => {
    setSearchText(searchText.target.value);
    setCurrent(1);
  };
  const previewCrop = (province: any) => {
    setShowModalCrop((prev) => !prev);
    setProvinceId(province);
  };
  const sorter = (a: any, b: any) => {
    if (a === b) return 0;
    else if (a === null) return 1;
    else if (b === null) return -1;
    else return a.localeCompare(b);
  };
  const updatePriceCrop = async (dataUpdate: UpdateLocationPriceList[]) => {
    if (dataUpdate !== undefined) {
      const dataArrPlants = {
        priceData: dataUpdate,
      };
      await LocationPriceDatasource.updateLocationPrice(dataArrPlants);
      setShowModalEdit((prev) => !prev);
      fetchLocationPrice();
    }
  };
  const columns = [
    {
      title: "จังหวัด",
      dataIndex: "province_name",
      key: "province_name",
      width: "25%",
      sorter: (a: any, b: any) => sorter(a.province_name, b.province_name),
    },
    {
      title: "พืช",
      dataIndex: "plants",
      key: "plants",
      width: "15%",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <span
              style={{
                cursor: "pointer",
                color: color.Success,
                textDecorationLine: "underline",
                fontWeight: "700",
              }}
              onClick={() => previewCrop(row)}
            >
              ดูรายการพืช
            </span>
          ),
        };
      },
    },
    {
      title: "ช่วงราคาฉีดพ่น",
      dataIndex: "price",
      key: "price",
      sorter: (a: any, b: any) => sorter(a.min_price, b.max_price),
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <span style={{ color: color.primary1, fontWeight: "700" }}>
              {`${row.min_price + " - " + row.max_price + " บาท"}`}
            </span>
          ),
        };
      },
    },
    {
      title: "จำนวนอำเภอ",
      dataIndex: "count_district",
      key: "count_district",
      sorter: (a: any, b: any) => sorter(a.count_district, b.count_district),
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{row.count_district + `  อำเภอ`}</span>,
        };
      },
    },
    {
      title: "จำนวนตำบล",
      dataIndex: "count_subdistrict",
      key: "count_subdistrict",
      sorter: (a: any, b: any) =>
        sorter(a.count_subdistrict, b.count_subdistrict),
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{row.count_subdistrict + `  ตำบล`}</span>,
        };
      },
    },
    {
      title: "อัพเดตล่าสุด",
      dataIndex: "update_at",
      key: "update_at",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div className="container">
              <span className="text-dark-75  d-block font-size-lg">
                {moment(row.update_at).format("DD/MM/YYYY, HH:mm")}
              </span>
            </div>
          ),
        };
      },
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      width: "6%",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div className="d-flex flex-row justify-content-between">
              <ActionButton
                icon={<EditOutlined />}
                color={color.primary1}
                onClick={() => handleModalEdit(row, row.plants)}
              />
            </div>
          ),
        };
      },
    },
  ];
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
          placeholder="ค้นหาจังหวัด"
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
          onClick={fetchLocationPrice}
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

  return (
    <Layouts>
      {pageTitle}
      <Table columns={columns} dataSource={data?.data} pagination={false} />
      <div className="d-flex justify-content-between pt-5">
        <p>รายการทั้งหมด {data?.count} รายการ</p>
        <Pagination
          current={current}
          total={data?.count}
          onChange={onChangePage}
          pageSize={row}
          showSizeChanger={false}
        />
      </div>

      {showModalEdit && (
        <ModalEditLocationPrice
          isEditModal
          show={showModalEdit}
          backButton={() => setShowModalEdit((prev) => !prev)}
          callBack={updatePriceCrop}
          data={editLocationPrice}
          editIndex={editIndex}
        />
      )}
      {showModalCrop && (
        <ModalCropByProvince
          show={showModalCrop}
          data={provinceId}
          backButton={() => setShowModalCrop((prev) => !prev)}
        />
      )}
    </Layouts>
  );
}
export default PricePage;
