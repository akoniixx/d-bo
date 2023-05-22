import {
  CalendarOutlined,
  ClockCircleOutlined,
  CloseCircleFilled,
  StarFilled,
} from "@ant-design/icons";
import {
  Avatar,
  Badge,
  Button,
  Form,
  Input,
  Radio,
  RadioChangeEvent,
  Row,
  Select,
  Space,
  Spin,
  Tag,
  UploadFile,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import Upload from "antd/lib/upload/Upload";
import moment from "moment";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { BackIconButton } from "../../components/button/BackButton";
import { CardContainer } from "../../components/card/CardContainer";
import FooterPage from "../../components/footer/FooterPage";
import { CardHeader } from "../../components/header/CardHearder";
import GoogleMap from "../../components/map/GoogleMap";
import { CouponDataSource } from "../../datasource/CouponDatasource";
import { TaskFinishedDatasource } from "../../datasource/TaskFinishDatasource";
import { LAT_LNG_BANGKOK } from "../../definitions/Location";
import {
  DetailFinishTask,
  DetailFinishTask_INIT,
  updateStatusPays,
  updateStatusPays_INIT,
} from "../../entities/TaskFinishEntities";
import { color } from "../../resource";
import {
  numberWithCommas,
  numberWithCommasToFixed,
} from "../../utilities/TextFormatter";
import { UpdateStatusPaymentDatasource } from "../../datasource/UpdateStatusPaymentDatasource";
import { TASK_HISTORY } from "../../definitions/FinishTask";
import {
  HistoryEntity,
  HistoryEntity_INIT,
} from "../../entities/HistoryEntities";
import { ReportDocDatasource } from "../../datasource/ReportDocument";
import { DashboardLayout } from "../../components/layout/Layout";
import { useNavigate } from "react-router-dom";
const { Map } = require("immutable");
const _ = require("lodash");
const dateFormat = "DD/MM/YYYY";
const timeFormat = "HH:mm";

function EditReport() {
  let queryString = _.split(window.location.search, "=");
  const navigate = useNavigate();
  const profile = JSON.parse(localStorage.getItem("profile") || "{  }");
  const taskId = queryString[1];
  const [couponData, setCouponData] = useState<{
    couponCode: string;
    couponName: string;
    couponDiscount: number | null;
  }>({
    couponCode: "",
    couponName: "",
    couponDiscount: null,
  });
  const [data, setData] = useState<DetailFinishTask>(DetailFinishTask_INIT);
  const [statusPayment, setStatusPayment] = useState<any>();
  const [updateStatusPayment, setUpdateStatusPayment] =
    useState<updateStatusPays>(updateStatusPays_INIT);
  const [history, setHistory] = useState<HistoryEntity>(HistoryEntity_INIT);
  const [loading, setLoading] = useState(false);
  const [mapPosition, setMapPosition] = useState<{ lat: number; lng: number }>({
    lat: LAT_LNG_BANGKOK.lat,
    lng: LAT_LNG_BANGKOK.lng,
  });
  const fetchDetailTask = async () => {
    await TaskFinishedDatasource.getDetailFinishTaskById(taskId).then((res) => {
      console.log("report edit", res);

      if (res.data.couponId !== null) {
        CouponDataSource.getPromotionCode(res.data.couponId).then((result) =>
          setCouponData({
            couponCode: res.data.couponCode ?? "",
            couponDiscount: !res.data.discount
              ? null
              : parseInt(res.data.discount),
            couponName: result.couponName ?? "",
          })
        );
      }
      setHistory(res.data.taskHistory[0]);
      setData(res);
      setMapPosition({
        lat: parseFloat(res.data.farmerPlot.lat),
        lng: parseFloat(res.data.farmerPlot.long),
      });
    });
  };
  useEffect(() => {
    fetchDetailTask();
  }, []);
  const onPreviewImg = async () => {
    let src = data.imageTaskUrl;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  const handleChangeStatus = (e: any) => {
    setStatusPayment(e.target.value);
  };
  const UpdateStatusPayment = async () => {
    Swal.fire({
      title: "ยืนยันการเปลี่ยนสถานะ",
      text: "โปรดตรวจสอบงานที่คุณต้องการเปลี่ยนสถานะ ก่อนที่จะกดยืนยัน เพราะอาจส่งผลต่อการจ่ายเงินของนักบินโดรนในระบบ",
      cancelButtonText: "ยกเลิก",
      confirmButtonText: "บันทึก",
      confirmButtonColor: color.Success,
      showCancelButton: true,
      showCloseButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const updateBy = profile.firstname + " " + profile.lastname;
        const updateInfo = { ...updateStatusPayment };
        updateInfo.id = [taskId];
        updateInfo.statusPayment = statusPayment;
        updateInfo.updateBy = updateBy;
        await UpdateStatusPaymentDatasource.UpdateStatusPayment(
          updateInfo
        ).then((res) => {
          navigate("/IndexReport")
        });
      }
      fetchDetailTask();
    });
  };
  const IdCard: UploadFile[] = [
    {
      uid: "",
      name: data.imageIdCard.fileName,
      url: data.imageIdCard.path,
      thumbUrl: data.imageIdCard.path,
    },
  ];
  const BookBank: UploadFile[] = [
    {
      uid: "",
      name: data.imageBookBank.fileName,
      url: data.imageBookBank.path,
      thumbUrl: data.imageBookBank.path,
    },
  ];
  const starIcon = (
    <StarFilled
      style={{
        color: "#FFCA37",
        fontSize: "20px",
        marginRight: "10px",
      }}
    />
  );
  const renderAppointment = (
    <Form style={{ padding: "32px" }}>
      <div className="row">
        <div className="col-lg-6">
          <div className="row">
            <div className="col-lg-6">
              <label>วันที่นัดหมาย</label>
              <Form.Item>
                <Input
                  style={{ width: "100%" }}
                  value={moment(new Date(data.data.dateAppointment)).format(
                    dateFormat
                  )}
                  disabled
                  suffix={<CalendarOutlined />}
                />
              </Form.Item>
            </div>
            <div className="col-lg-6">
              <label>เวลานัดหมาย</label>
              <Form.Item>
                <Input
                  style={{ width: "100%" }}
                  value={moment(new Date(data.data.dateAppointment)).format(
                    timeFormat
                  )}
                  disabled
                  suffix={<ClockCircleOutlined />}
                />
              </Form.Item>
            </div>
          </div>
          <label>ช่วงเวลาฉีดพ่น</label>
          <Form.Item>
            <Select
              disabled
              value={
                data.data.purposeSpray !== null
                  ? data.data.purposeSpray.purposeSprayName
                  : "-"
              }
            />
          </Form.Item>
          <label>เป้าหมายการฉีดพ่น</label>
          <Form.Item>
            <span style={{ color: color.Grey }}>
              {data.data.targetSpray != null
                ? data.data.targetSpray.join(",")
                : "-"}
            </span>
          </Form.Item>
          <label>การเตรียมยา</label>
          <Form.Item>
            <span style={{ color: color.Grey }}>
              {data.data.preparationBy !== null ? data.data.preparationBy : "-"}
            </span>
          </Form.Item>
          <label>ภาพงานจากนักบินโดรน</label>
          <br />
          <div className="pb-2">
            <div
              className="hiddenFileInput"
              style={{
                backgroundImage: `url(${data.imageTaskUrl})`,
                display:
                  data.imageTaskUrl !== null
                    ? `url(${data.imageTaskUrl})`
                    : undefined,
              }}
            ></div>
            <div className="ps-5">
              {data.imageTaskUrl !== "object" &&
              Object.keys(data.imageTaskUrl).length !== 0 ? (
                <>
                  <Tag
                    color={color.Success}
                    onClick={onPreviewImg}
                    style={{ cursor: "pointer", borderRadius: "5px" }}
                  >
                    View
                  </Tag>
                </>
              ) : undefined}
            </div>
          </div>
          <br />
          <label>หมายเหตุ</label>
          <Form.Item>
            <span style={{ color: color.Grey }}>
              {!data.data.comment && "-"}
            </span>
          </Form.Item>
        </div>
        <div className="col-lg-1"></div>
        <div className="col-lg-5">
          <br />
          <Form.Item>
            <div className="row">
              <div className="col-lg-3">คะแนนรีวิว </div>
              <div className="col-lg-6">
                <span>
                  {data.data.reviewDronerAvg > "0" ? (
                    <Row>
                      {starIcon}
                      <span>
                        {parseFloat(data.data.reviewDronerAvg).toFixed(1)}
                      </span>
                    </Row>
                  ) : (
                    "-"
                  )}
                </span>
              </div>
            </div>
          </Form.Item>
          <Form.Item>
            <div className="row">
              <div className="col-lg-6" style={{ color: color.Grey }}>
                1. มารยาทนักบิน{" "}
              </div>
              <div className="col-lg-6">
                {data.data.reviewDronerDetail !== null ? (
                  <Row>
                    {starIcon}
                    <span>
                      {parseFloat(
                        data.data.reviewDronerDetail.pilotEtiquette
                      ).toFixed(1)}
                    </span>
                  </Row>
                ) : (
                  "-"
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6" style={{ color: color.Grey }}>
                2. ความตรงต่อเวลา{" "}
              </div>
              <div className="col-lg-6">
                {data.data.reviewDronerDetail !== null ? (
                  <Row>
                    {starIcon}
                    <span>
                      {parseFloat(
                        data.data.reviewDronerDetail.punctuality
                      ).toFixed(1)}
                    </span>
                  </Row>
                ) : (
                  "-"
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6" style={{ color: color.Grey }}>
                3. ความเชี่ยวชาญในการพ่น{" "}
              </div>
              <div className="col-lg-6">
                {data.data.reviewDronerDetail !== null ? (
                  <Row>
                    {starIcon}
                    <span>
                      {parseFloat(
                        data.data.reviewDronerDetail.sprayExpertise
                      ).toFixed(1)}
                    </span>
                  </Row>
                ) : (
                  "-"
                )}
              </div>
            </div>
          </Form.Item>
          <Form.Item>
            <TextArea
              rows={3}
              disabled
              value={
                data.data.reviewDronerDetail != null
                  ? data.data.reviewDronerDetail.comment
                  : undefined
              }
            />
          </Form.Item>
          <label>สถานะ</label>

          {data.data.statusPayment != null &&
          data.data.statusPayment != "SUCCESS" ? (
            <Form.Item key={data.data.statusPayment}>
              <Radio.Group
                defaultValue={data.data.statusPayment}
                onChange={handleChangeStatus}
              >
                <Space direction="vertical">
                  <Radio value={"WAIT_PAYMENT"}>รอจ่ายเงิน</Radio>
                  <Radio value={"DONE_PAYMENT"}>จ่ายเงินแล้ว</Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
          ) : (
            <>
              {data.data.status === "WAIT_REVIEW" && (
                <div>
                  <Badge color={color.blue} style={{ width: 20 }} />
                  <span style={{ color: color.blue }}>รอรีวิว</span>
                </div>
              )}
              {data.data.status === "CANCELED" && (
                <div>
                  <Badge color={color.Error} style={{ width: 20 }} />
                  <span style={{ color: color.Error }}>
                    ยกเลิก
                    {history != null
                      ? " " + "(" + TASK_HISTORY[history.beforeValue] + ")"
                      : null}
                  </span>
                </div>
              )}
              {data.data.status === "DONE" && (
                <div>
                  <Badge color={"#F2994A"} style={{ width: 20 }} />
                  <span style={{ color: "#F2994A" }}>เสร็จสิ้น</span>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Form>
  );
  const renderFarmer = (
    <Form key={data.data.farmerId}>
      <div className="container text-center" style={{ padding: "30px" }}>
        <div className="row">
          <div className="col-lg-4 text-start">
            <label>ชื่อ-นามสกุล</label>
            <Form.Item>
              <Input
                disabled
                defaultValue={
                  data.data.farmer.firstname + " " + data.data.farmer.lastname
                }
              />
            </Form.Item>
          </div>
          <div className="col-lg-4 text-start">
            <label>เบอร์โทร</label>
            <Form.Item>
              <Input disabled defaultValue={data.data.farmer.telephoneNo} />
            </Form.Item>
          </div>
          <div className="col-lg-4 text-start">
            <label>แปลง</label>
            <Form.Item>
              <Select disabled defaultValue={data.data.farmerPlot.plotName} />
            </Form.Item>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 text-start">
            <label>พืชที่ปลูก</label>
            <Form.Item>
              <Input disabled defaultValue={data.data.farmerPlot.plantName} />
            </Form.Item>
          </div>
          <div className="col-lg-4 text-start">
            <label>ค่าบริการ/ไร่</label>
            <Form.Item>
              <Input
                disabled
                defaultValue={data.data.unitPrice}
                suffix={"บาท/ไร่"}
              />
            </Form.Item>
          </div>
          <div className="col-lg-4 text-start">
            <label>จำนวนไร่</label>
            <Form.Item>
              <Input
                disabled
                defaultValue={data.data.farmerPlot.raiAmount}
                suffix="ไร่"
              />
            </Form.Item>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 text-start">
            <label>พื้นที่แปลงเกษตร</label>
            <Form.Item>
              <Input
                disabled
                defaultValue={
                  data.data.farmerPlot.plotArea !== null
                    ? data.data.farmerPlot.plotArea.subdistrictName +
                      "/" +
                      data.data.farmerPlot.plotArea.districtName +
                      "/" +
                      data.data.farmerPlot.plotArea.provinceName
                    : "-"
                }
              />
            </Form.Item>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 text-start">
            <label>Latitude (ละติจูด)</label>
            <Form.Item key={mapPosition.lat}>
              <Input disabled defaultValue={mapPosition.lat} />
            </Form.Item>
          </div>
          <div className="col-lg-6 text-start">
            <label>Longitude (ลองติจูด)</label>
            <Form.Item key={mapPosition.lng}>
              <Input disabled defaultValue={mapPosition.lng} />
            </Form.Item>
          </div>
        </div>
        <GoogleMap
          width="100%"
          height="300px"
          zoom={17}
          lat={mapPosition.lat}
          lng={mapPosition.lng}
        />
        <div className="row">
          <div className="col-lg-12 text-start">
            <label>จุดสังเกต</label>
            <Form.Item>
              <Input disabled value={data.data.farmerPlot.landmark} />
            </Form.Item>
          </div>
        </div>
      </div>
    </Form>
  );
  const renderDroner = (
    <Form key={data.data.dronerId} style={{ padding: "32px" }}>
      <div className="row">
        <div className="col-lg">
          <p>Droner ID</p>
          <Input disabled defaultValue={data.data.droner.dronerCode} />
        </div>
        <div className="col-lg">
          <p>ชื่อ</p>
          <Input disabled defaultValue={data.data.droner.firstname} />
        </div>
        <div className="col-lg">
          <p>นามสกุล</p>
          <Input disabled defaultValue={data.data.droner.lastname} />
        </div>
      </div>
      <div className="row pt-4">
        <div className="col-lg-4">
          <p>เบอร์โทร</p>
          <Input disabled defaultValue="0957796588" />
        </div>
        <div className="col-lg-4">
          <p>โดรน</p>
          <Input
            disabled
            prefix={
              <Avatar
                size={25}
                src={
                  data.data.droner.dronerDrone[0] != null
                    ? data.data.droner.dronerDrone[0].drone.droneBrand
                        .logoImagePath
                    : null
                }
                style={{ marginRight: "5px" }}
              />
            }
            defaultValue="DJI (AGRAS T20)"
          />
        </div>
      </div>
      <div className="row pt-4 d-flex justify-content-between">
        {data.imageIdCard.path != "" ? (
          <div className="col-lg-6">
            <Form
              style={{
                padding: "20px",
                backgroundColor: "#2196531A",
                borderRadius: 5,
              }}
            >
              <span style={{ color: color.primary1 }}>บัตรประชาชน</span> <br />
              <span>รูปถ่ายผู้สมัครคู่กับบัตรประชาชน </span>
              <Upload
                listType="picture"
                defaultFileList={[...IdCard]}
                disabled
              />
            </Form>
          </div>
        ) : (
          <div className="col-lg-6">
            <Form
              style={{
                padding: "20px",
                backgroundColor: "#FCE3E3",
                borderRadius: 5,
              }}
            >
              <span style={{ color: color.primary1 }}>บัตรประชาชน</span> <br />
              <span>รูปถ่ายผู้สมัครคู่กับบัตรประชาชน </span>
              <div
                style={{
                  backgroundColor: color.White,
                  width: "100%",
                  height: "70px",
                  borderRadius: 3,
                }}
              >
                <div>
                  <CloseCircleFilled
                    className="col-lg-3"
                    style={{
                      color: color.Error,
                      width: "42px",
                      fontSize: "42px",
                      padding: 15,
                    }}
                  />
                  <span style={{ color: color.Error, margin: 50 }}>
                    ยังไม่มีรูปถ่ายผู้สมัครคู่กับบัตรประชาชน
                  </span>
                </div>
              </div>
            </Form>
          </div>
        )}
        {data.imageBookBank.path != "" ? (
          <div className="col-lg-6">
            <Form
              style={{
                padding: "20px",
                backgroundColor: "#2196531A",
                borderRadius: 5,
              }}
            >
              <span style={{ color: color.primary1 }}>สมุดธนาคาร</span> <br />
              <span>รูปภาพหน้าสมุดธนาคาร </span>
              <Upload
                listType="picture"
                defaultFileList={[...BookBank]}
                disabled
              />
            </Form>
          </div>
        ) : (
          <div className="col-lg-6">
            <Form
              style={{
                padding: "20px",
                backgroundColor: "#FCE3E3",
                borderRadius: 5,
              }}
            >
              <span style={{ color: color.primary1 }}>สมุดธนาคาร</span> <br />
              <span>รูปภาพหน้าสมุดธนาคาร </span>
              <div
                style={{
                  backgroundColor: color.White,
                  width: "100%",
                  height: "70px",
                  borderRadius: 3,
                }}
              >
                <div>
                  <CloseCircleFilled
                    className="col-lg-3"
                    style={{
                      color: color.Error,
                      width: "42px",
                      fontSize: "42px",
                      padding: 15,
                    }}
                  />
                  <span style={{ color: color.Error, margin: 50 }}>
                    ยังไม่มีเอกสารหน้าสมุดธนาคาร
                  </span>
                </div>
              </div>
            </Form>
          </div>
        )}
      </div>
    </Form>
  );
  const renderPrice = (
    <Form style={{ padding: "20px" }}>
      <Form style={{ padding: "20px", backgroundColor: "#2196531A" }}>
        <div className="row">
          <div className="col-lg-3">
            <label>ยอดรวมค่าบริการ (เกษตรกร)</label>
            <h5 style={{ color: color.Success }} className="p-2">
              {data.data.totalPrice !== null
                ? numberWithCommasToFixed(parseFloat(data.data.totalPrice)) +
                  " บาท"
                : "0 บาท"}
            </h5>
          </div>
          <div
            className="col-lg-3"
            style={{ paddingLeft: "40px", borderLeft: "solid" }}
          >
            <label>รายได้ที่นักบินโดรนได้รับ</label>
            <h5 style={{ color: color.Warning }} className="p-2">
              {data?.data.price &&
                numberWithCommasToFixed(
                  parseFloat(data?.data.price) +
                    parseFloat(data?.data.revenuePromotion)
                )}{" "}
              บาท
            </h5>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4">
            <Form.Item>
              <label>ค่าบริการ (ก่อนคิดค่าธรรมเนียม)</label>
              <Input
                disabled
                value={
                  data.data.price !== null
                    ? numberWithCommasToFixed(parseFloat(data.data.price))
                    : 0
                }
                suffix="บาท"
              />
            </Form.Item>
          </div>
          <div className="col-lg-4">
            <Form.Item>
              <label>ค่าธรรมเนียม (5% ของค่าบริการ)</label>
              <Input
                disabled
                placeholder="0.0"
                value={
                  data.data.fee !== null
                    ? numberWithCommasToFixed(parseFloat(data.data.fee))
                    : 0
                }
                suffix="บาท"
              />
            </Form.Item>
          </div>
          <div className="col-lg-4">
            <Form.Item>
              <label>ส่วนลดค่าธรรมเนียม</label>
              <Input
                disabled
                value={
                  data.data.discountFee !== null
                    ? numberWithCommasToFixed(parseFloat(data.data.discountFee))
                    : 0
                }
                suffix="บาท"
              />
            </Form.Item>
          </div>
        </div>
        <div className="row">
          <div className="form-group col-lg-4">
            <label>รหัสคูปอง</label>
            <Input
              value={couponData.couponCode != "" ? couponData.couponCode : "-"}
              disabled
              autoComplete="off"
            />
          </div>
          <div className="form-group col-lg-4">
            <label>ชื่อคูปอง</label>
            <Input
              value={couponData.couponName != "" ? couponData.couponName : "-"}
              disabled
              autoComplete="off"
            />
          </div>
          <div className="form-group col-lg-4">
            <label>ส่วนลดคูปอง</label>
            <Input
              value={numberWithCommasToFixed(couponData.couponDiscount!)}
              disabled
              autoComplete="off"
            />
          </div>
        </div>
        <div className="row pt-3">
          <div className="form-group col-lg-6 p-2">
            <label>โปรโมชั่นนักบินโดรน</label>
            <Input
              suffix="บาท"
              value={data.data.discountPromotion}
              disabled
              autoComplete="off"
            />
          </div>
          <div className="form-group col-lg-6 p-2">
            <label>โปรโมชั่นเกษตรกร</label>
            <Input
              suffix="บาท"
              value={data.data.revenuePromotion}
              disabled
              autoComplete="off"
            />
          </div>
        </div>
      </Form>
    </Form>
  );
  const DownloadPDF = async () => {
    setLoading(true);
    const filterId = [data.data.id];
    const downloadBy = `${profile.firstname} ${profile.lastname}`;
    await ReportDocDatasource.getFileName("PDF", downloadBy, filterId).then(
      (res) => {
        if (res.responseData) {
          const idFileName = res.responseData.id;
          const fileName = res.responseData.fileName;
          ReportDocDatasource.reportPDF(filterId, downloadBy, idFileName)
            .then((res) => {
              const blob = new Blob([res], { type: "application/pdf" });
              const a = document.createElement("a");
              a.href = window.URL.createObjectURL(blob);
              a.download = fileName;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
        }
      }
    );
  };
  return (
    <>
      <Spin tip="Loading..." size="large" spinning={loading}>
        <div className="container d-flex justify-content-between pt-1">
          <div className="pt-1">
            <BackIconButton
              onClick={() => navigate("/IndexReport")}
            />
          </div>
          <div className="col-lg-9 pt-4">
            <strong style={{ fontSize: "20px" }}>
              รายละเอียดงาน {data.data.taskNo}
            </strong>
          </div>
          <div className="col-lg pt-4">
            {data.data.statusPayment === "WAIT_PAYMENT" ||
            data.data.statusPayment === "DONE_PAYMENT" ? (
              <Button
                className="col-lg-9 p-1"
                style={{
                  color: color.secondary2,
                  backgroundColor: color.primary1,
                  borderRadius: "5px",
                }}
                onClick={DownloadPDF}
              >
                ดาวน์โหลดไฟล์ PDF
              </Button>
            ) : (
              <Button
                disabled
                className="col-lg-9 p-1"
                style={{
                  padding: "8 0",
                  backgroundColor: color.Disable,
                  color: color.Grey,
                  borderColor: color.Disable,
                  borderRadius: "5px",
                }}
              >
                ดาวน์โหลดไฟล์ PDF
              </Button>
            )}
          </div>
        </div>
        <CardContainer>
          <CardHeader textHeader="นัดหมายบริการ" />
          {renderAppointment}
        </CardContainer>
        <br />
        <CardContainer>
          <CardHeader textHeader="ข้อมูลเกษตรกรและแปลง" />
          {renderFarmer}
        </CardContainer>
        <br />
        <CardContainer>
          <CardHeader textHeader="รายชื่อนักบินโดรน" />
          {renderDroner}
        </CardContainer>
        <br />
        <CardContainer>
          <CardHeader textHeader="ยอดรวมค่าบริการ" />
          {renderPrice}
        </CardContainer>
        <FooterPage
          onClickBack={() => navigate("/IndexReport")}
          onClickSave={() => UpdateStatusPayment()}
        />
      </Spin>
    </>
  );
}

export default EditReport;
