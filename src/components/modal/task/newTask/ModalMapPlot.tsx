import { Button, Form, Input, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { FarmerPlotDatasource } from "../../../../datasource/FarmerPlotDatasource";
import { LAT_LNG_BANGKOK } from "../../../../definitions/Location";
import { FarmerPlotEntity } from "../../../../entities/FarmerPlotEntities";
import { color } from "../../../../resource";
import GoogleMap from "../../../map/GoogleMap";

interface ModalMapPlotProps {
  show: boolean;
  backButton: () => void;
  plotId: string;
  title: string;
}
const ModalMapPlot: React.FC<ModalMapPlotProps> = ({
  show,
  backButton,
  plotId,
  title,
}) => {
  const [data, setData] = useState<FarmerPlotEntity>();
  const [mapPosition, setMapPosition] = useState<{ lat: number; lng: number }>(
    LAT_LNG_BANGKOK
  );

  const fetchFarmerPlot = async () => {
    await FarmerPlotDatasource.getFarmerPlotById(plotId).then((res) => {
      console.log(res);
      setMapPosition({ lat: parseFloat(res.lat), lng: parseFloat(res.long) });
      setData(res);
    });
  };

  useEffect(() => {
    fetchFarmerPlot();
  }, []);

  return (
    <>
      <Modal
        title={
          <div
            style={{
              width: "100%",
              cursor: "move",
            }}
          >
            {title}
          </div>
        }
        visible={show}
        onCancel={backButton}
        footer={
          <Button
            style={{
              width: "100%",
              padding: "8 0",
              color: color.Success,
              borderColor: color.Success,
              borderRadius: "5px",
            }}
          >
            ดูข้อมูล Google Map
          </Button>
        }
      >
        <Form key={plotId}>
          <div className="form-group">
            <label>พื้นที่แปลงเกษตร</label>
            <Form.Item key={data?.plotName}>
              <Input defaultValue={data?.plotName} disabled />
            </Form.Item>
          </div>
          <div className="row">
            <div className="form-group col-lg-6">
              <label>Latitude</label>
              <Form.Item key={mapPosition?.lat}>
                <Input defaultValue={mapPosition?.lat} disabled />
              </Form.Item>
            </div>
            <div className="form-group col-lg-6">
              <label>Longtitude</label>
              <Form.Item key={mapPosition?.lng}>
                <Input defaultValue={mapPosition?.lng} disabled />
              </Form.Item>
            </div>
          </div>
          <div className="form-group">
            <label>จุดสังเกต</label>
            <Form.Item key={data?.landmark}>
              <Input defaultValue={data?.landmark} disabled />
            </Form.Item>
          </div>
          <GoogleMap
            width="100%"
            height="300px"
            zoom={17}
            lat={mapPosition.lat}
            lng={mapPosition.lng}
          />
        </Form>
      </Modal>
    </>
  );
};

export default ModalMapPlot;
