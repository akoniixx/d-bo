import {
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  FileSearchOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Badge,
  Button,
  Checkbox,
  Col,
  DatePicker,
  Divider,
  Dropdown,
  Image,
  Input,
  Menu,
  Modal,
  Pagination,
  Row,
  Select,
  Table,
} from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import { color, icon } from "../../../resource";
import { numberWithCommas } from "../../../utilities/TextFormatter";
import ActionButton from "../../../components/button/ActionButton";
import { ColumnsType } from "antd/lib/table";
import { DateTimeUtil } from "../../../utilities/DateTimeUtil";
import { useNavigate } from "react-router-dom";
import { RewardDatasource } from "../../../datasource/RewardDatasource";
import { GetAllRewardEntities } from "../../../entities/RewardEntites";
import { UploadImageDatasouce } from "../../../datasource/UploadImageDatasource";
import { REWARD_STATUS } from "../../../definitions/Status";

function IndexReward() {
  const navigate = useNavigate();
  const { RangePicker } = DatePicker;
  const dateFormat = "DD/MM/YYYY";
  const dateSearchFormat = "YYYY-MM-DD";
  const row = 10;
  const [current, setCurrent] = useState(1);
  const [data, setData] = useState<GetAllRewardEntities>();
  const [startExchangeDate, setStartExchangeDate] = useState<any>(null);
  const [expiredExchangeDate, setExpiredExchangeDate] = useState<any>(null);
  const [status, setStatus] = useState<any>();
  const [rewardType, setRewardType] = useState<any>();
  const [rewardExchange, setRewardExchange] = useState<any>();
  const [searchText, setSearchText] = useState<any>();
  const [visible, setVisible] = useState(false);
  const handleVisible = (newVisible: any) => {
    setVisible(newVisible);
  };
  const [showModal, setShowModal] = useState(false);
  const [rewardId, setRewardId] = useState("");

  const [checkedListDigi, setCheckedListDigi] = useState<CheckboxValueType[]>();
  const [checkedListPhy, setCheckedListPhy] = useState<CheckboxValueType[]>();

  const [inDigi, setInDigi] = useState(false);
  const [inPhy, setInPhy] = useState(false);
  const [checkAllDigi, setCheckAllDigi] = useState(false);
  const [checkAllPhy, setCheckAllPhy] = useState(false);
  const [statusArr, setStatusArr] = useState<string[]>([]);
  const statusOptions = ["SCORE", "MISSION"];

  const getAllReward = () => {
    RewardDatasource.getAllReward(
      row,
      current,
      startExchangeDate,
      expiredExchangeDate,
      status,
      rewardType,
      rewardExchange,
      searchText
    ).then((res) => {
      setData(res);
    });
  };

  useEffect(() => {
    getAllReward();
  }, [current, startExchangeDate, expiredExchangeDate]);
  const onChangePage = (page: number) => {
    setCurrent(page);
  };
  const handleSearchDate = (e: any) => {
    if (e != null) {
      setStartExchangeDate(moment(new Date(e[0])).format(dateSearchFormat));
      setExpiredExchangeDate(moment(new Date(e[1])).format(dateSearchFormat));
    } else {
      setStartExchangeDate(e);
      setExpiredExchangeDate(e);
    }
    setCurrent(1);
  };
  const changeTextSearch = (searchText: any) => {
    setSearchText(searchText.target.value);
    setCurrent(1);
  };

  const onChangeStatus = (checkedValues: any) => {
    setStatus(checkedValues);
  };

  const onCheckAllPhysical = (e: any) => {
    let value = e.target.value;
    let checked = e.target.checked;
    let arr: any = 0;
    if (checked === true) {
      arr = [...statusArr, value];
      setStatusArr([...statusArr, value]);
      setRewardType(value);
    } else {
      let d: string[] = statusArr.filter((x) => x != value);
      arr = [...d];
      setStatusArr(d);
      if (d.length == 0) {
        arr = undefined;
      }
      setRewardType(undefined);
    }
    setRewardType(arr);
    setCheckedListPhy(e.target.checked ? statusOptions : []);
    setInPhy(false);
    setCheckAllPhy(e.target.checked);
  };
  const onCheckAllDigital = (e: any) => {
    let value = e.target.value;
    let checked = e.target.checked;
    let arr: any = 0;
    if (checked === true) {
      arr = [...statusArr, value];
      setStatusArr([...statusArr, value]);
      setRewardType(value);
    } else {
      let d: string[] = statusArr.filter((x) => x != value);
      arr = [...d];
      setStatusArr(d);
      if (d.length == 0) {
        arr = undefined;
      }
      setRewardType(undefined);
    }
    setRewardType(arr);
    setCheckedListDigi(e.target.checked ? statusOptions : []);
    setInDigi(false);
    setCheckAllDigi(e.target.checked);
  };
  const onChangeSubPhy = (list: CheckboxValueType[]) => {
    let arr: any = 0;
    arr = [...list];
    if (arr.length > 0) {
      setRewardType("PHYSICAL");
    } else {
      setRewardType(undefined);
    }
    setRewardExchange(arr);
    setCheckedListPhy(list);
    setInPhy(!!list.length && list.length < statusOptions.length);
    setCheckAllPhy(list.length === statusOptions.length);
  };

  const onChangeSubDigi = (list: CheckboxValueType[]) => {
    let arr: any = 0;
    arr = [...list];
    if (arr.length > 0) {
      setRewardType("DIGITAL");
    } else {
      setRewardType(undefined);
    }
    setRewardExchange(arr);
    setCheckedListDigi(list);
    setInDigi(!!list.length && list.length < statusOptions.length);
    setCheckAllDigi(list.length === statusOptions.length);
  };
  const statusRewardType = (
    <Menu
      items={[
        {
          label: (
            <>
              <Checkbox
                indeterminate={inPhy}
                onChange={onCheckAllPhysical}
                checked={checkAllPhy}
                value="PHYSICAL"
              >
                Physical
              </Checkbox>
              <br />
              <Checkbox.Group
                value={checkedListPhy}
                style={{ width: "100%" }}
                onChange={onChangeSubPhy}
              >
                <Row>
                  <Checkbox style={{ marginLeft: "20px" }} value="SCORE">
                    ใช้แต้ม
                  </Checkbox>
                </Row>
                <Row>
                  <Checkbox style={{ marginLeft: "20px" }} value="MISSION">
                    ภารกิจ
                  </Checkbox>
                </Row>
              </Checkbox.Group>
            </>
          ),
          key: "2",
        },
        {
          label: (
            <>
              <Checkbox
                indeterminate={inDigi}
                onChange={onCheckAllDigital}
                checked={checkAllDigi}
                value="DIGITAL"
              >
                Digital
              </Checkbox>
              <br />
              <Checkbox.Group
                value={checkedListDigi}
                style={{ width: "100%" }}
                onChange={onChangeSubDigi}
              >
                <Row>
                  <Checkbox style={{ marginLeft: "20px" }} value="SCORE">
                    ใช้แต้ม
                  </Checkbox>
                </Row>
                <Row>
                  <Checkbox style={{ marginLeft: "20px" }} value="MISSION">
                    ภารกิจ
                  </Checkbox>
                </Row>
              </Checkbox.Group>
            </>
          ),
          key: "3",
        },
      ]}
    />
  );

  const showDelete = (id: string) => {
    setRewardId(id);
    setShowModal(!showModal);
  };
  const removeReward = () => {
    RewardDatasource.deleteReward(rewardId)
      .then((res) => {
        setShowModal(!showModal);
        setRewardId("");
        getAllReward();
      })
      .catch((err) => console.log(err));
  };

  const isNumber = (n: any) => {
    return !isNaN(parseFloat(n)) && isFinite(n);
  };
  const sorter = (a: any, b: any) => {
    if (a === null) {
      return 1;
    }
    if (b === null) {
      return -1;
    }
    if (isNumber(a) && isNumber(b)) {
      if (parseInt(a, 10) === parseInt(b, 10)) {
        return 0;
      }
      return parseInt(a, 10) > parseInt(b, 10) ? 1 : -1;
    }
    if (isNumber(a)) {
      return -1;
    }
    if (isNumber(b)) {
      return 1;
    }
    if (a === b) {
      return 0;
    }
    return a > b ? 1 : -1;
  };
  const PageTitle = (
    <>
      <div
        className="container d-flex justify-content-between"
        style={{ padding: "8px" }}
      >
        <div className="col-lg-7 p-1">
          <span
            className="card-label font-weight-bolder text-dark"
            style={{
              fontSize: 22,
              fontWeight: "bold",
              padding: "8px",
            }}
          >
            <strong>ของรางวัลนักบินโดรน</strong>
          </span>
        </div>
        <div className="col-lg">
          <RangePicker
            allowClear
            onCalendarChange={(val) => handleSearchDate(val)}
            format={dateFormat}
          />
        </div>
        <div>
          <Button
            style={{
              width: 170,
              borderColor: color.Success,
              borderRadius: "5px",
              color: color.secondary2,
              backgroundColor: color.Success,
            }}
            onClick={() => navigate("/AddReward")}
          >
            + เพิ่มของรางวัล
          </Button>
        </div>
      </div>
      <div
        className="container d-flex justify-content-between"
        style={{ padding: "8px" }}
      >
        <div className="col-lg-6 p-1">
          <Input
            allowClear
            prefix={<SearchOutlined style={{ color: color.Disable }} />}
            placeholder="ค้นหาชื่อของรางวัล/รหัสของรางวัล"
            className="col-lg-12 p-1"
            onChange={changeTextSearch}
          />
        </div>
        <div className="col-lg p-1">
          <Dropdown
            overlay={statusRewardType}
            trigger={["click"]}
            className="col-lg-12 "
            onVisibleChange={handleVisible}
            visible={visible}
          >
            <Button style={{ color: color.Disable }}>
              เลือกประเภท
              <DownOutlined />
            </Button>
          </Dropdown>
        </div>
        <div className="col-lg p-1">
          <Select
            className="col-lg-12"
            placeholder="เลือกสถานะ"
            allowClear
            onChange={onChangeStatus}
          >
            {REWARD_STATUS.map((x) => (
              <Checkbox value={x.value}>{x.name}</Checkbox>
            ))}
          </Select>
          {/* <Dropdown
            overlay={SubStatus}
            trigger={["click"]}
            className="col-lg-12 "
            onVisibleChange={handleVisibleStatus}
            visible={visibleStatus}
          >
            <Button style={{ color: color.Disable }}>
              เลือกสะถานะ
              <DownOutlined />
            </Button>
          </Dropdown> */}
        </div>
        <div className="pt-1">
          <Button
            style={{
              borderColor: color.Success,
              borderRadius: "5px",
              color: color.secondary2,
              backgroundColor: color.Success,
            }}
            onClick={getAllReward}
          >
            ค้นหาข้อมูล
          </Button>
        </div>
      </div>
    </>
  );
  const columns: ColumnsType<any> = [
    {
      title: "วันที่อัพเดต",
      dataIndex: "updateAt",
      key: "updateAt",
      width: "15%",
      fixed: "left",
      sorter: (a: any, b: any) => sorter(a.updateAt, b.updateAt),
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span className="text-dark-75  d-block font-size-lg">
                {moment(row.updateAt).format("DD/MM/YYYY")},{" "}
                {moment(row.updateAt).format("HH:mm")}
              </span>
              <span style={{ color: color.Grey, fontSize: "12px" }}>
                <UserOutlined
                  style={{ padding: "0 4px 0 0", verticalAlign: 2 }}
                />
                {row.createBy ? row.createBy : "-"}
              </span>
            </>
          ),
        };
      },
    },
    {
      title: "ชื่อของรางวัล",
      dataIndex: "rewardName",
      key: "rewardName",
      width: "28%",
      fixed: "left",
      sorter: (a: any, b: any) => sorter(a.rewardName, b.rewardName),
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <Row>
                <Col>
                  <Image
                    src={row.imagePath}
                    style={{ width: 50, height: 50 }}
                    preview={false}
                  />
                </Col>
                <Col style={{ padding: 10 }}>
                  <span className="text-dark-75  d-block font-size-lg">
                    {row.rewardName !== null ? row.rewardName : null}
                  </span>
                  <span style={{ color: color.Grey, fontSize: "12px" }}>
                    {row.rewardNo}
                  </span>
                </Col>
              </Row>
            </>
          ),
        };
      },
    },
    {
      title: "ประเภทของรางวัล",
      dataIndex: "rewardType",
      key: "rewardType",
      width: "12%",
      sorter: (a: any, b: any) => sorter(a.rewardType, b.rewardType),
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span className="text-dark-75  d-block font-size-lg">
                {row.rewardType === "DIGITAL" ? "Digital" : "Physical"}
                {row.rewardExchange === "SCORE" ? (
                  <span style={{ color: color.secondary1, fontSize: "12px" }}>
                    {` (ใช้แต้ม)`}
                  </span>
                ) : (
                  <span style={{ color: color.Success, fontSize: "12px" }}>
                    {` (ภารกิจ)`}
                  </span>
                )}
              </span>
            </>
          ),
        };
      },
    },
    {
      title: "แต้มที่ใช้แลก",
      dataIndex: "score",
      key: "score",
      width: "10%",
      sorter: (a: any, b: any) => sorter(a.score, b.score),
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span className="text-dark-75  d-block font-size-lg">
                {row.score ? numberWithCommas(row.score) + ` แต้ม` : "-"}
              </span>
            </>
          ),
        };
      },
    },
    {
      title: "ช่วงเวลาที่แลก",
      dataIndex: "startExchangeDate",
      key: "startExchangeDate",
      width: "15%",
      sorter: (a: any, b: any) =>
        sorter(a.startExchangeDate, b.startExchangeDate),
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <div style={{ paddingLeft: "3px" }}>
                {row.startExchangeDate
                  ? DateTimeUtil.formatDateTime(row.startExchangeDate) +
                    " - " +
                    DateTimeUtil.formatDateTime(row.expiredExchangeDate)
                  : "-"}
              </div>
            </>
          ),
        };
      },
    },
    {
      title: "ช่วงเวลาที่ใช้ได้",
      dataIndex: "startUsedDate",
      key: "startUsedDate",
      width: "15%",
      sorter: (a: any, b: any) => sorter(a.startUsedDate, b.startUsedDate),
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <div style={{ paddingLeft: "3px" }}>
                {row.startUsedDate
                  ? DateTimeUtil.formatDateTime(row.startUsedDate) +
                    " - " +
                    DateTimeUtil.formatDateTime(row.expiredUsedDate)
                  : "-"}
              </div>
            </>
          ),
        };
      },
    },
    {
      title: "ทั้งหมด",
      dataIndex: "amount",
      key: "amount",
      width: "8%",
      sorter: (a: any, b: any) => sorter(a.amount, b.amount),
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span className="text-dark-75  d-block font-size-lg">
                {row.amount}
              </span>
            </>
          ),
        };
      },
    },
    {
      title: "แลกแล้ว",
      dataIndex: "used",
      key: "used",
      width: "8%",
      sorter: (a: any, b: any) => sorter(a.used, b.used),
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span className="text-dark-75  d-block font-size-lg">
                {row.used}
              </span>
            </>
          ),
        };
      },
    },
    {
      title: "คงเหลือ",
      dataIndex: "remain",
      key: "remain",
      width: "8%",
      sorter: (a: any, b: any) => sorter(a.remain, b.remain),
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span className="text-dark-75  d-block font-size-lg">
                {row.remain}
              </span>
            </>
          ),
        };
      },
    },
    {
      title: "สถานะ",
      dataIndex: "status",
      key: "status",
      fixed: "right",
      width: "8%",
      sorter: (a: any, b: any) => sorter(a.status, b.status),
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              {row.status === "ACTIVE" && (
                <span style={{ color: color.Success }}>
                  <Badge color={color.Success} style={{ right: 5 }} />
                  ใช้งาน
                </span>
              )}
              {row.status === "INACTIVE" && (
                <span style={{ color: color.Error }}>
                  <Badge color={color.Error} style={{ right: 5 }} />
                  ปิดการใช้งาน
                </span>
              )}
              {row.status === "DRAFTING" && (
                <span style={{ color: color.Grey }}>
                  <Badge color={color.Grey} style={{ right: 5 }} />
                  รอเปิดใช้งาน
                </span>
              )}
            </>
          ),
        };
      },
    },
    {
      title: "",
      dataIndex: "Action",
      key: "Action",
      width: "10%",
      fixed: "right",
      render: (value: any, row: any, index: number) => {
        const checkDelete = row.status === "INACTIVE" && row.used === 0;
        return {
          children: (
            <div
              className="d-flex flex-row"
              style={{ justifyContent: "center" }}
            >
              <div className="col-lg-4">
                <ActionButton
                  icon={
                    <Image
                      src={icon.inforedeem}
                      style={{ width: 20, height: 17 }}
                      preview={false}
                    />
                  }
                  color={color.primary1}
                  onClick={() => navigate("/RedeemHistory")}
                />
              </div>
              <div className="col-lg-4">
                <ActionButton
                  icon={<EditOutlined />}
                  color={color.primary1}
                  onClick={() => navigate("/EditReward/id=" + row.id)}
                />
              </div>
              <div>
                <ActionButton
                  icon={<DeleteOutlined />}
                  color={
                    row.status === "DRAFTING" || checkDelete === true
                      ? color.Error
                      : color.Grey
                  }
                  onClick={() => showDelete(row.id)}
                  actionDisable={
                    row.status === "DRAFTING" || checkDelete === true ? false : true
                  }
                />
              </div>
            </div>
          ),
        };
      },
    },
  ];
  return (
    <>
      {PageTitle}
      <br />
      <Table
        columns={columns}
        dataSource={data?.data}
        pagination={false}
        scroll={{ x: 1800 }}
      />

      <div className="d-flex justify-content-between pt-3 pb-3">
        <p>รายการทั้งหมด {data?.count} รายการ</p>
        <Pagination
          current={current}
          total={data?.count}
          onChange={onChangePage}
          pageSize={row}
          showSizeChanger={false}
        />
      </div>

      {showModal && (
        <Modal
          title="ยืนยันการลบ"
          onCancel={() => {
            setShowModal(!showModal);
          }}
          open={showModal}
          footer={null}
          bodyStyle={{
            padding: 0,
          }}
          style={{ top: "25%" }}
        >
          <div className="px-4 pt-4">
            <span className="text-secondary">
              โปรดตรวจสอบของรางวัลที่คุณต้องการลบ ก่อนที่จะกดยืนยันการลบ
            </span>
            <p className="text-secondary">
              เพราะอาจส่งผลต่อการแลกของรางวัลในระบบ
            </p>
          </div>
          <Divider
            style={{
              marginBottom: "20px",
            }}
          />
          <div className="d-flex justify-content-between px-4 pt-3 pb-3">
            <Button
              style={{
                borderColor: color.Error,
                color: color.Error,
              }}
              onClick={() => {
                setShowModal(!showModal);
              }}
            >
              ยกเลิก
            </Button>
            <Button
              style={{
                borderColor: color.Error,
                backgroundColor: color.Error,
                color: color.White,
              }}
              onClick={() => removeReward()}
            >
              ยืนยัน
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
}
export default IndexReward;
