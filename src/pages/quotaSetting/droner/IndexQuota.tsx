import {
  DeleteOutlined,
  EditOutlined,
  FolderViewOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Badge,
  Button,
  Checkbox,
  DatePicker,
  Divider,
  Input,
  Modal,
  Pagination,
  Select,
  Table,
} from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { color, icon } from "../../../resource";
import ActionButton from "../../../components/button/ActionButton";
import { ColumnsType } from "antd/lib/table";
import { DateTimeUtil } from "../../../utilities/DateTimeUtil";
import { useNavigate } from "react-router-dom";
import { GetAllRewardEntities } from "../../../entities/RewardEntites";
import { REWARD_STATUS } from "../../../definitions/Status";
import { CampaignDatasource } from "../../../datasource/CampaignDatasource";

function IndexQuota() {
  const navigate = useNavigate();
  const { RangePicker } = DatePicker;
  const dateFormat = "DD/MM/YYYY";
  const dateSearchFormat = "YYYY-MM-DD";
  const row = 10;
  const [current, setCurrent] = useState(1);
  const [data, setData] = useState<GetAllRewardEntities>();
  const [startDate, setStartDate] = useState<any>(null);
  const [endDate, setEndDate] = useState<any>(null);
  const [status, setStatus] = useState<any>();
  const [searchText, setSearchText] = useState<any>();
  const [showModal, setShowModal] = useState(false);
  const [quotaId, setQuotaId] = useState("");

  const getAllQuota = () => {
    CampaignDatasource.getCampaignList(
      "QUATA",
      row,
      current,
      startDate,
      endDate,
      status,
      searchText,
      "DRONER"
    ).then((res) => {
      setData(res);
    });
  };
  useEffect(() => {
    getAllQuota();
  }, [current, startDate, endDate]);
  const onChangePage = (page: number) => {
    setCurrent(page);
  };
  const handleSearchDate = (e: any) => {
    if (e != null) {
      setStartDate(moment(new Date(e[0])).format(dateSearchFormat));
      setEndDate(moment(new Date(e[1])).format(dateSearchFormat));
    } else {
      setStartDate(e);
      setEndDate(e);
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
  const showDelete = (id: string) => {
    setQuotaId(id);
    setShowModal(!showModal);
  };
  const removeQuotaList = () => {
    // CampaignDatasource.deleteCampaign(quotaId).then((res) => {
    //   setShowModal(!showModal);
    //   setQuotaId("");
    //   getAllQuota();
    // });
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
            <strong>ชาเลนจ์ (นักบินโดรน)</strong>
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
            onClick={() => navigate("/AddQuota")}
          >
            + เพิ่มชาเลนจ์
          </Button>
        </div>
      </div>
      <div
        className="container d-flex justify-content-between"
        style={{ padding: "8px" }}
      >
        <div className="col-lg-9 p-1">
          <Input
            allowClear
            prefix={<SearchOutlined style={{ color: color.Disable }} />}
            placeholder="ค้นหาชื่อชาเลนจ์ / Challenge No."
            className="col-lg-12 p-1"
            onChange={changeTextSearch}
          />
        </div>
        <div className="col-lg-2 p-1">
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
        </div>
        <div className="pt-1">
          <Button
            style={{
              borderColor: color.Success,
              borderRadius: "5px",
              color: color.secondary2,
              backgroundColor: color.Success,
            }}
            onClick={getAllQuota}
          >
            ค้นหาข้อมูล
          </Button>
        </div>
      </div>
    </>
  );
  const columns: ColumnsType<any> = [
    {
      title: "ชื่อชาเลนจ์",
      dataIndex: "campaignName",
      key: "campaignName",
      sorter: (a: any, b: any) => sorter(a.campaignName, b.campaignName),
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span className="text-dark-75  d-block font-size-lg">
                {row.campaignName}
              </span>
              <span style={{ color: color.Grey, fontSize: "12px" }}>
                {row.missionNo ? row.missionNo : "-"}
              </span>
            </>
          ),
        };
      },
    },
    {
      title: "เวลาเริ่ม - สิ้นสุด",
      dataIndex: "startDate",
      key: "startDate",
      sorter: (a: any, b: any) => sorter(a.startDate, b.startDate),
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <div style={{ paddingLeft: "3px" }}>
                {row.startDate
                  ? DateTimeUtil.formatDateTime(row.startDate) +
                    " - " +
                    DateTimeUtil.formatDateTime(row.endDate)
                  : "-"}
              </div>
            </>
          ),
        };
      },
    },
    {
      title: "จำนวนผู้ใช้ที่ได้สิทธิ",
      dataIndex: "rewardType",
      key: "rewardType",
      sorter: (a: any, b: any) => sorter(a.rewardType, b.rewardType),
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span style={{ color: color.Success }}>500 สิทธิ</span>
            </>
          ),
        };
      },
    },
    {
      title: "จำนวนผู้ใช้ที่ได้รับรางวัล",
      dataIndex: "score",
      key: "score",
      sorter: (a: any, b: any) => sorter(a.score, b.score),
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span style={{ color: color.Success }}>13 คน</span>
            </>
          ),
        };
      },
    },
    {
      title: "สถานะ",
      dataIndex: "status",
      key: "status",
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
                  icon={<FolderViewOutlined />}
                  color={
                    row.status === "DRAFTING" ? color.Grey : color.primary1
                  }
                  actionDisable={row.status === "DRAFTING" ? true : false}
                  onClick={() => navigate("/QuotaReport/id=" + row.id)}
                />
              </div>
              <div className="col-lg-4">
                <ActionButton
                  icon={<EditOutlined />}
                  color={color.primary1}
                  onClick={() => navigate("/EditQuota/id=" + row.id)}
                />
              </div>
              <div className="col-lg-4">
                <ActionButton
                  icon={<DeleteOutlined />}
                  color={
                    row.status === "DRAFTING" || checkDelete === true
                      ? color.Error
                      : color.Grey
                  }
                  onClick={() => showDelete(row.id)}
                  actionDisable={
                    row.status === "DRAFTING" || checkDelete === true
                      ? false
                      : true
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
      <Table columns={columns} dataSource={data?.data} pagination={false} />

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
              โปรดตรวจสอบชาเลนจ์ที่คุณต้องการลบ ก่อนที่จะกดยืนยันการลบ
            </span>
            <p className="text-secondary">
              เพราะอาจส่งผลต่อการทำงานของผู้ดูแลระบบ
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
              onClick={() => removeQuotaList()}
            >
              ยืนยัน
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
}
export default IndexQuota;
