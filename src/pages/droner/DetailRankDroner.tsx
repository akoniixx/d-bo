import { Col, Form, Image, Input, Layout, Row } from 'antd';
import React from 'react'
import CardHeader from 'react-bootstrap/esm/CardHeader';
import { BackButton, BackIconButton } from '../../components/button/BackButton';
import SaveButtton from '../../components/button/SaveButton';
import { CardContainer } from '../../components/card/CardContainer';

function DetailRankDroner() {
    const renderLand = (
        <div className="col-lg-4">
          <CardContainer style={{ height: "640px" }}>
            <CardHeader />
            <Form>
              <div className="container text-center" style={{ padding: "30px" }}>
                <div className="row">
                  <div className="form-group text-center pb-5">
                    <Image
                      style={{ width: "160px", height: "160px" }}
                    //   src={image.drone}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-lg-12 text-start">
                    <label>Drone ID</label>
                    <Form>{}</Form>
    
                    <Form.Item>
                      <Input disabled />
                    </Form.Item>
                    <label>ชื่อ</label>
                    <Form.Item>
                      <Input disabled />
                    </Form.Item>
                    <label>นามสกุล</label>
                    <Form.Item>
                      <Input disabled />
                    </Form.Item>
                    <label>เบอร์โทร</label>
                    <Form.Item>
                      <Input disabled />
                    </Form.Item>
                  </div>
                </div>
              </div>
            </Form>
          </CardContainer>
        </div>
      );
  return (
    <Layout>
    <Row>
      <BackIconButton onClick={() => (window.location.href = "/IndexRateDroner")} />
      <span className="pt-4">
        <strong style={{ fontSize: "20px" }}>รายละเอียดการให้บริการนักบินโดรน</strong>
      </span>
    </Row>
    <Row className="d-flex justify-content-around">
      {renderLand}
      {/* {renderFromData} */}
    </Row>
    <br />
    <Row>
      <Col span={22}>
        <BackButton onClick={() => (window.location.href = "/DroneList")} />
      </Col>
      <Col>
        {/* <SaveButtton onClick={() => UpdateDroneList(id)} /> */}
      </Col>
    </Row>
  </Layout>
  )
}

export default DetailRankDroner