import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BackIconButton } from "../../../components/button/BackButton";
import Table, { ColumnsType } from "antd/lib/table";
import { Button, Divider, Modal, Pagination } from "antd";
import color from "../../../resource/color";
import ActionButton from "../../../components/button/ActionButton";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { QuotaDatasource } from "../../../datasource/QuotaDatasource";
import {
  AddQuotaRedeemHisEntity,
  AddQuotaRedeemHisEntity_INIT,
  AllQuotaRRedeemEntity,
} from "../../../entities/QuotaReportEntities";
import { DateTimeUtil } from "../../../utilities/DateTimeUtil";
import ModalQuotaRedeem from "../../../components/modal/ModalQuotaRedeem";
import Swal from "sweetalert2";
import { CampaignDatasource } from "../../../datasource/CampaignDatasource";

const _ = require("lodash");
const { Map } = require("immutable");
function RewardReceived() {
  let queryString = _.split(window.location.pathname, "=");
  const navigate = useNavigate();
  const row = 10;
  const [current, setCurrent] = useState(1);
  const [editIndex, setEditIndex] = useState(0);
  const [dronerName, setDronerName] = useState<any | undefined>();
  const [showEditModal, setShowEditModal] = useState(false);
  const [data, setData] = useState<AllQuotaRRedeemEntity>();
  const [quotaId, setQuotaId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editRedeem, setEditRedeem] = useState<AddQuotaRedeemHisEntity>(
    AddQuotaRedeemHisEntity_INIT
  );
  const [rewardRound, setRewardRound] = useState<any>();
  useEffect(() => {
    const getRewardRound = async () => {
      await CampaignDatasource.getCampaignQuota("DRONER").then((res) => {
        if (res.data) {
          const camId = localStorage.getItem("id");
          let dataFilter = res.data.filter((x: any) => x.id === camId);
          setRewardRound(
            dataFilter.map((x: any) => x.condition[0].rewardRound)[0]
          );
        }
      });
    };
    getRewardRound();
  }, []);
  useEffect(() => {
    const getQuotaReport = async () => {
      const camId: any = localStorage.getItem("id");

      await QuotaDatasource.getAllQuotaReport(camId).then((res) => {
        if (res.data) {
          let dataFilter = res.data.filter(
            (x) => x.dronerId === queryString[1]
          );
          setDronerName(
            dataFilter.map((x) => x.firstname + " " + x.lastname)[0]
          );
        }
      });
    };
    getQuotaReport();
  }, []);
  const getQuotaRedeem = async () => {
    const camId: any = localStorage.getItem("id");
    await QuotaDatasource.getQuotaRedeemHisId(
      queryString[1],
      camId,
      current,
      row
    ).then((res) => {
      setData(res);
    });
  };

  useEffect(() => {
    getQuotaRedeem();
  }, [current]);
  const onChangePage = (page: number) => {
    setCurrent(page);
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
  const showDelete = (id: string) => {
    setQuotaId(id);
    setShowModal(!showModal);
  };
  const editQuotaRedeem = (data: AddQuotaRedeemHisEntity, index: number) => {
    setShowEditModal((prev) => !prev);
    setEditIndex(index);
    setEditRedeem(data);
  };
  const updateRewardReceive = async (
    dataQuotaRedeem: AddQuotaRedeemHisEntity
  ) => {
    const camId: any = localStorage.getItem("id");
    const fName = Map(dataQuotaRedeem).set("firstName", editRedeem.firstName);
    const lName = Map(fName.toJS()).set("lastName", editRedeem.lastName);
    const dronerId = Map(lName.toJS()).set("dronerId", editRedeem.dronerId);
    const dataId = Map(dronerId.toJS()).set("id", editRedeem.id);
    const cpId = Map(dataId.toJS()).set("campaignId", camId);

    await QuotaDatasource.editQuotaRedeem(cpId.toJS()).then((res) => {
      Swal.fire({
        title: "บันทึกสำเร็จ",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      }).then((time) => {
        getQuotaRedeem();
      });
      setShowEditModal(false);
    });
  };
  const removeQuota = () => {
    QuotaDatasource.deleteQuotaRedeemHisId(quotaId)
      .then((res) => {
        setShowModal(!showModal);
        setQuotaId("");
        getQuotaRedeem();
      })
      .catch((err) => console.log(err));
  };

  const PageTitle = (
    <>
      <div
        className="container d-flex justify-content-start"
        style={{ padding: "4px" }}
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
            <strong>รางวัลที่ได้รับ | {dronerName} </strong>
          </span>
        </div>
        <div className="col-lg" />
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
      title: "ชื่อของรางวัลที่ได้รับ",
      dataIndex: "rewardName",
      key: "rewardName",
      width: "20%",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <span>{row.rewardName}</span>
            </>
          ),
        };
      },
    },
    {
      title: "รอบที่",
      dataIndex: "roundNo",
      key: "roundNo",
      sorter: (a: any, b: any) => sorter(a.roundNo, b.roundNo),
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{row.roundNo}</span>,
        };
      },
    },
    {
      title: "หมายเหตุ",
      dataIndex: "description",
      key: "description",
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{row.description ? row.description : "-"}</span>,
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
            <div
              className="d-flex flex-row"
              style={{ justifyContent: "center" }}
            >
              <div className="col-lg-3">
                <ActionButton
                  icon={<EditOutlined />}
                  color={color.primary1}
                  onClick={() => editQuotaRedeem(row, row.id)}
                />
              </div>
              <div className="col-lg-3">
                <ActionButton
                  icon={<DeleteOutlined />}
                  color={color.Error}
                  onClick={() => showDelete(row.id)}
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
              โปรดตรวจสอบของรางวัลที่คุณต้องการลบ ก่อนที่จะกดยืนยันการลบ
            </span>
            <p className="text-secondary">
              เพราะอาจส่งผลต่อการทำงานของความเข้าใจของผู้ใช้ในแอปพลิเคชัน
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
              onClick={() => removeQuota()}
            >
              ยืนยัน
            </Button>
          </div>
        </Modal>
      )}
      {showEditModal && (
        <ModalQuotaRedeem
          isEditModal
          show={showEditModal}
          backButton={() => setShowEditModal((prev) => !prev)}
          callBack={updateRewardReceive}
          data={editRedeem}
          editIndex={editIndex}
          round={rewardRound}
        />
      )}
    </>
  );
}
export default RewardReceived;
