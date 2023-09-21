import React from "react";
import { BackIconButton } from "../../components/button/BackButton";
import { useNavigate } from "react-router-dom";
import { Checkbox, Form, Input, Row, Table } from "antd";
import color from "../../resource/color";
import { CardHeader } from "../../components/header/CardHearder";
import { CardContainer } from "../../components/card/CardContainer";
import FooterPage from "../../components/footer/FooterPage";
import Swal from "sweetalert2";

function EditPermission() {
  const navigate = useNavigate();
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const listMenu = [
    {
      id: 0,
      menu: "ติดตามงาน",
    },
    {
      id: 1,
      menu: "ข้อมูลเกษตรกร",
    },
    {
      id: 2,
      menu: "ข้อมูลนักบินโดรน",
    },
    {
      id: 3,
      menu: "ข่าวสาร / กูรูเกษตร",
    },
    {
      id: 4,
      menu: "โปรโมชั่น / คูปอง",
    },
    {
      id: 5,
      menu: "แต้มสะสม",
    },
    {
      id: 6,
      menu: "ของรางวัล",
    },
    {
      id: 7,
      menu: "ภารกิจ",
    },
    {
      id: 8,
      menu: "ชาเลนจ์",
    },
    {
      id: 9,
      menu: "ผู้ดูแลระบบ",
    },
    {
      id: 10,
      menu: "ตั้งค่า",
    },
  ];
  const columns = [
    {
      title: "ชื่อเมนู",
      dataIndex: "menu",
      key: "menu",
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{value}</span>,
        };
      },
    },
    {
      title: "เพิ่ม (Add)",
      dataIndex: "add",
      key: "add",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <Checkbox />
            </>
          ),
        };
      },
    },
    {
      title: "ดูข้อมูล (View)",
      dataIndex: "view",
      key: "view",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <Checkbox />
            </>
          ),
        };
      },
    },
    {
      title: "แก้ไข (Edit)",
      dataIndex: "edit",
      key: "edit",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <Checkbox />
            </>
          ),
        };
      },
    },
    {
      title: "ลบ (Delete)",
      dataIndex: "delete",
      key: "delete",
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <Checkbox />
            </>
          ),
        };
      },
    },
  ];
  const permissionData = (
    <div className="pt-1">
      <CardContainer>
        <CardHeader textHeader="ข้อมูลบทบาทผู้ดูแล" />
        <Form style={{ padding: "32px" }} className="row">
          <div className="form-group col-lg-6">
            <label>
              ชื่อบทบาท <span style={{ color: "red" }}>*</span>
            </label>
            <Form.Item
              name="permission"
              rules={[
                {
                  required: true,
                  message: "กรุณากรอกชื่อบทบาท!",
                },
              ]}
            >
              <Input
                placeholder="กรอกชื่อบทบาท"
                defaultValue="Super Admin"
                onChange={handleOnChange}
                autoComplete="off"
              />
            </Form.Item>
          </div>
          <div className="form-group col-lg-6">
            <label>จำนวนผู้ดูแลระบบ</label>
            <Form.Item name="permission">
              <Input placeholder="2 คน" disabled />
            </Form.Item>
          </div>
        </Form>
      </CardContainer>
    </div>
  );
  const listMenuData = (
    <div className="pt-3">
      <Table columns={columns} dataSource={listMenu} pagination={false} />
    </div>
  );
  const updatePermission = () => {
    Swal.fire({
      title: "บันทึกสำเร็จ",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    }).then(() => {
      navigate("/IndexPermission");
    });
  };
  return (
    <div>
      <Row>
        <BackIconButton onClick={() => navigate(-1)} />
        <span className="pt-3">
          <strong style={{ fontSize: "20px" }}>แก้ไขบทบาทผู้ดูแลระบบ</strong>
        </span>
      </Row>
      {permissionData}
      {listMenuData}
      <FooterPage
        onClickBack={() => navigate(-1)}
        onClickSave={updatePermission}
        // disableSaveBtn={saveBtnDisable}
      />
    </div>
  );
}

export default EditPermission;
