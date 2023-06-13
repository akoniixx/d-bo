import {
  Button,
  DatePicker,
  Divider,
  Dropdown,
  Form,
  Image,
  Input,
  Menu,
  Modal,
  Pagination,
  Popover,
  Select,
  Table,
} from "antd";
import { ColumnsType } from "antd/lib/table";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { color, icon } from "../../../resource";
import { InfoCircleFilled, SearchOutlined } from "@ant-design/icons";
import { BackIconButton } from "../../../components/button/BackButton";
import { numberWithCommas } from "../../../utilities/TextFormatter";
import TextArea from "antd/lib/input/TextArea";
import { QuotaDatasource } from "../../../datasource/QuotaDatasource";
import { AllQuotaReportEntity } from "../../../entities/QuotaReportEntities";
import { DateTimeUtil } from "../../../utilities/DateTimeUtil";

const _ = require("lodash");
function QuotaReport() {
  let queryString = _.split(window.location.pathname, "=");

  const id = "274d2935-95ac-447b-a671-b89b6b1719ae";
  const navigate = useNavigate();
  const row = 10;
  const [current, setCurrent] = useState(1);
  const onChangePage = (page: number) => {
    setCurrent(page);
  };
  const [rewardName, setRewardName] = useState<string>();
  const [searchText, setSearchText] = useState<any>();
  const [data, setData] = useState<AllQuotaReportEntity>();
  const [showModal, setShowModal] = useState(false);
  const [visible, setVisible] = useState(false);
  const handleVisible = (newVisible: any) => {
    setVisible(newVisible);
  };
  const showModalAddReward = (e: any) => {
    setShowModal(!showModal);
  };

  const isNumber = (n: any) => {
    return !isNaN(parseFloat(n)) && isFinite(n);
  };
  const getQuotaReport = async () => {
    await QuotaDatasource.getAllQuotaReport(id, row, current, searchText).then(
      (res) => {
        setData(res);
      }
    );
  };
  useEffect(() => {
    getQuotaReport();
  }, [current]);
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
  const changeTextSearch = (searchText: any) => {
    setSearchText(searchText.target.value);
    setCurrent(1);
  };
  const downloadListName = (
    <Menu
      items={[
        {
          label: <span>ดาวน์โหลดรายชื่อผู้ใช้ที่มีสิทธิ</span>,
          key: "1",
        },
        {
          label: <span>ดาวน์โหลดรายชื่อผู้ใช้ที่ได้รับรางวัล</span>,
          key: "2",
        },
      ]}
    />
  );
  const PageTitle = (
    <>
      <div
        className="container d-flex justify-content-start"
        style={{ padding: "8px" }}
      >
        <div className="col-lg-0">
          <BackIconButton
            onClick={() => {
              navigate(-1);
            }}
          />
        </div>
        <div className="col-lg-9 pt-3">
          <span
            className="card-label font-weight-bolder text-dark"
            style={{
              fontSize: 22,
              fontWeight: "bold",
              padding: "8px",
            }}
          >
            <strong>
              จัดการคนที่ได้รับสิทธิ | บินปั๊บรับแต้ม แถมโชค 3 ชั้น | CL00000003
            </strong>
          </span>
        </div>
        <div className="col-lg" />
        <div className="col-lg pt-3">
          <Dropdown
            overlay={downloadListName}
            trigger={["click"]}
            className="col-lg-12 "
            onVisibleChange={handleVisible}
            visible={visible}
          >
            <Button
              style={{
                width: 225,
                borderColor: color.Success,
                borderRadius: "5px",
                color: color.secondary2,
                backgroundColor: color.Success,
              }}
            >
              <span style={{ paddingRight: "inherit" }}>ดาวน์โหลดข้อมูล</span>
              <Image
                src={icon.arrowReport}
                preview={false}
                style={{ width: 15, height: 16 }}
              />
            </Button>
          </Dropdown>
        </div>
      </div>
      <div
        className="container d-flex justify-content-between"
        style={{ padding: "8px" }}
      >
        <div className="col-lg-10">
          <Input
            allowClear
            prefix={<SearchOutlined style={{ color: color.Disable }} />}
            placeholder="ค้นหาชื่อนักบินโดรน / เบอร์โทร"
            className="col-lg-12 p-1"
            onChange={changeTextSearch}
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
            onClick={getQuotaReport}
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
      sorter: (a: any, b: any) => sorter(a.updateAt, b.updateAt),
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              {row.updateAt ? DateTimeUtil.formatDateTime(row.updateAt) : " - "}
            </>
          ),
        };
      },
    },
    {
      title: "ชื่อนักบินโดรน",
      dataIndex: "droner",
      key: "droner",
      width: "20%",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span
              // style={{
              //   color: color.Success,
              //   cursor: "pointer",
              //   fontWeight: "bold",
              // }}
              // onClick={() => navigate}
              >
                {row.firstname + " " + row.lastname}
              </span>
            </>
          ),
        };
      },
    },
    {
      title: "เบอร์โทร",
      dataIndex: "phoneNo",
      key: "phoneNo",
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{row.telephoneNo}</span>,
        };
      },
    },
    {
      title: "จำนวนไร่สะสม",
      dataIndex: "raiAmount",
      key: "raiAmount",
      sorter: (a: any, b: any) => sorter(a.raiAmount, b.raiAmount),
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{numberWithCommas(row.allRai)}</span>,
        };
      },
    },
    {
      title: "จำนวนสิทธิที่ได้รับ",
      dataIndex: "quotaAmount",
      key: "quotaAmount",
      sorter: (a: any, b: any) => sorter(a.quotaAmount, b.quotaAmount),
      render: (value: any, row: any, index: number) => {
        var sumAmount = row.quotaAmount - row.amountReceive;
        return {
          children: (
            <>
              <span>{numberWithCommas(row.quotaAmount)}</span>
              <Popover
                title={
                  <span
                    style={{
                      color: color.White,
                    }}
                  >
                    รายละเอียดสิทธิ
                  </span>
                }
                content={
                  <table style={{ width: "300px" }}>
                    <tr>
                      <td>
                        สิทธิที่ได้รับทั้งหมด
                        <br />
                        <div style={{ fontSize: "12px", color: color.Disable }}>
                          (500 ไร่ / 1 สิทธิ)
                        </div>
                      </td>
                      <td style={{ textAlign: "right" }}>
                        {numberWithCommas(row.quotaAmount)}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ paddingTop: 10 }}>จำนวนรางวัลที่ได้รับ</td>
                      <td style={{ textAlign: "right", color: color.Error }}>
                        {numberWithCommas(row.amountReceive)}
                      </td>
                    </tr>

                    <tr>
                      <td colSpan={2}>
                        <Divider />
                      </td>
                    </tr>
                    <tr>
                      <td>จำนวนสิทธิคงเหลือ</td>
                      <td
                        style={{
                          textAlign: "right",
                          color: color.Success,
                          fontWeight: "bold",
                        }}
                      >
                        {numberWithCommas(sumAmount)}
                      </td>
                    </tr>
                  </table>
                }
              >
                <InfoCircleFilled
                  style={{
                    color: color.Success,
                    fontSize: "15px",
                    marginLeft: "7px",
                    verticalAlign: 1.5,
                  }}
                />
              </Popover>
            </>
          ),
        };
      },
    },
    {
      title: "จำนวนรางวัลที่ได้รับ",
      dataIndex: "amountReceive",
      key: "amountReceive",
      sorter: (a: any, b: any) => sorter(a.amountReceive, b.amountReceive),
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span
                style={{
                  cursor: "pointer",
                  color: color.Success,
                  textDecorationLine: "underline",
                }}
              >
                {row.amountReceive}
              </span>
            </>
          ),
        };
      },
    },
    {
      title: "",
      dataIndex: "Action",
      key: "Action",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div>
              <Button
                onClick={() => showModalAddReward(row)}
                style={{
                  padding: 5,
                  borderColor: color.Success,
                  borderRadius: 5,
                  paddingTop: 2,
                }}
              >
                <Image
                  src={icon.iconQuotaReport}
                  style={{ width: 20, height: 20 }}
                  preview={false}
                />
              </Button>
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
          title="เพิ่มรางวัลที่ได้รับ"
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
          <div className="p-4">
            <div className="form-group col-lg-12">
              <label>
                ชื่อของรางวัล <span style={{ color: "red" }}>*</span>
              </label>
              <Form.Item
                name="rewardName"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกชื่อของรางวัล!",
                  },
                ]}
              >
                <Input
                  placeholder="กรอกชื่อของรางวัล"
                  autoComplete="off"
                  onChange={(e) => {
                    setRewardName(e.target.value);
                  }}
                />
              </Form.Item>
            </div>
            <div className="form-group col-lg-12">
              <label>
                เลือกรอบที่จับรางวัล <span style={{ color: "red" }}>*</span>
              </label>
              <Form.Item
                name="rewardName"
                rules={[
                  {
                    required: true,
                    message: "กรุณาเลือกรอบรางวัลที่จับ!",
                  },
                ]}
              >
                <Select placeholder="เลือกรอบรางวัลที่จับ" />
              </Form.Item>
            </div>
            <div className="form-group col-lg-12">
              <label>หมายเหตุ</label>
              <Form.Item
                name="rewardName"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกชื่อของรางวัล!",
                  },
                ]}
              >
                <TextArea rows={6} placeholder="กรอกหมายเหตุ" />
              </Form.Item>
            </div>
          </div>
          <Divider
            style={{
              marginBottom: "20px",
            }}
          />
          <div className="d-flex justify-content-between px-4 pt-3 pb-3">
            <Button
              style={{
                borderColor: color.Success,
                color: color.Success,
              }}
              onClick={() => {
                setShowModal(!showModal);
              }}
            >
              ยกเลิก
            </Button>
            <Button
              style={{
                borderColor: color.Success,
                backgroundColor: color.Success,
                color: color.White,
              }}
              onClick={() => {
                setShowModal(!showModal);
              }}
            >
              บันทึก
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
}
export default QuotaReport;
