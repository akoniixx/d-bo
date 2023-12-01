import React from 'react'
import { BackIconButton } from '../../components/button/BackButton'
import { useNavigate } from 'react-router-dom'
import { Badge, Checkbox, Dropdown, Form, Input, Row, Space, Table } from 'antd'
import color from '../../resource/color'
import { CardHeader } from '../../components/header/CardHearder'
import { CardContainer } from '../../components/card/CardContainer'
import FooterPage from '../../components/footer/FooterPage'
import Swal from 'sweetalert2'
import { DownOutlined } from '@ant-design/icons'
import type { TableColumnsType } from 'antd';
interface ExpandedDataType {
  key: React.Key;
  date: string;
  name: string;
  upgradeNum: string;
}
function AddPermission() {
  const navigate = useNavigate()
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
  }
  const listMenu = [
    {
      id: 0,
      menu: 'ติดตามงาน',
    },
    {
      id: 1,
      menu: 'ข้อมูลเกษตรกร',
    },
    {
      id: 2,
      menu: 'ข้อมูลนักบินโดรน',
    },
    {
      id: 3,
      menu: 'ข่าวสาร / กูรูเกษตร',
    },
    {
      id: 4,
      menu: 'โปรโมชั่น',
    },
    {
      id: 5,
      menu: 'แต้มสะสม',
    },
    {
      id: 6,
      menu: 'ของรางวัล',
    },
    {
      id: 7,
      menu: 'ภารกิจ',
    },
    {
      id: 8,
      menu: 'ชาเลนจ์',
    },
    {
      id: 9,
      menu: 'ผู้ดูแลระบบ',
    },
    {
      id: 10,
      menu: 'ตั้งค่า',
    },
  ]
  // const columns = [
  //   {
  //     title: 'ชื่อเมนู',
  //     dataIndex: 'menu',
  //     key: 'menu',
  //     render: (value: any, row: any, index: number) => {
  //       return {
  //         children: <span>{value}</span>,
  //       }
  //     },
  //   },
  //   {
  //     title: 'เพิ่ม (Add)',
  //     dataIndex: 'add',
  //     key: 'add',
  //     render: (value: any, row: any, index: number) => {
  //       return {
  //         children: (
  //           <>
  //             <Checkbox />
  //           </>
  //         ),
  //       }
  //     },
  //   },
  //   {
  //     title: 'ดูข้อมูล (View)',
  //     dataIndex: 'view',
  //     key: 'view',
  //     render: (value: any, row: any, index: number) => {
  //       return {
  //         children: (
  //           <>
  //             <Checkbox />
  //           </>
  //         ),
  //       }
  //     },
  //   },
  //   {
  //     title: 'แก้ไข (Edit)',
  //     dataIndex: 'edit',
  //     key: 'edit',
  //     render: (value: any, row: any, index: number) => {
  //       return {
  //         children: (
  //           <>
  //             <Checkbox />
  //           </>
  //         ),
  //       }
  //     },
  //   },
  //   {
  //     title: 'ลบ (Delete)',
  //     dataIndex: 'delete',
  //     key: 'delete',
  //     render: (value: any, row: any, index: number) => {
  //       return {
  //         children: (
  //           <>
  //             <Checkbox />
  //           </>
  //         ),
  //       }
  //     },
  //   },
  // ]

  // const expandedRowRender = () => {
  //   const columns = [
  //     {
  //       title: '',
  //       dataIndex: 'menu',
  //       key: 'menu',
  //       render: (value: any, row: any, index: number) => {
  //         return {
  //           children: <span>{value}</span>,
  //         }
  //       },
  //     },
  //     {
  //       title: '',
  //       dataIndex: 'add',
  //       key: 'add',
  //       render: (value: any, row: any, index: number) => {
  //         return {
  //           children: (
  //             <>
  //               <Checkbox />
  //             </>
  //           ),
  //         }
  //       },
  //     },
  //     {
  //       title: '',
  //       dataIndex: 'view',
  //       key: 'view',
  //       render: (value: any, row: any, index: number) => {
  //         return {
  //           children: (
  //             <>
  //               <Checkbox />
  //             </>
  //           ),
  //         }
  //       },
  //     },
  //     {
  //       title: '',
  //       dataIndex: 'edit',
  //       key: 'edit',
  //       render: (value: any, row: any, index: number) => {
  //         return {
  //           children: (
  //             <>
  //               <Checkbox />
  //             </>
  //           ),
  //         }
  //       },
  //     },
  //     {
  //       title: '',
  //       dataIndex: 'delete',
  //       key: 'delete',
  //       render: (value: any, row: any, index: number) => {
  //         return {
  //           children: (
  //             <>
  //               <Checkbox />
  //             </>
  //           ),
  //         }
  //       },
  //     },
  //   ]
  //   const listMenu = [
  //     {
  //       id: 0,
  //       menu: 'ติดตามงาน',
  //     },
  //     {
  //       id: 1,
  //       menu: 'ข้อมูลเกษตรกร',
  //     },
  //     {
  //       id: 2,
  //       menu: 'ข้อมูลนักบินโดรน',
  //     },
  //     {
  //       id: 3,
  //       menu: 'ข่าวสาร / กูรูเกษตร',
  //     },
  //     {
  //       id: 4,
  //       menu: 'โปรโมชั่น',
  //     },
  //     {
  //       id: 5,
  //       menu: 'แต้มสะสม',
  //     },
  //     {
  //       id: 6,
  //       menu: 'ของรางวัล',
  //     },
  //     {
  //       id: 7,
  //       menu: 'ภารกิจ',
  //     },
  //     {
  //       id: 8,
  //       menu: 'ชาเลนจ์',
  //     },
  //     {
  //       id: 9,
  //       menu: 'ผู้ดูแลระบบ',
  //     },
  //     {
  //       id: 10,
  //       menu: 'ตั้งค่า',
  //     },
  //   ]
  //   return <Table columns={columns} dataSource={listMenu} pagination={false} showHeader={false}/>;
  // }

  // const permissionData = (
  //   <div className='pt-1'>
  //     <CardContainer>
  //       <CardHeader textHeader='ข้อมูลบทบาทผู้ดูแล' />
  //       <Form style={{ padding: '32px' }}>
  //         <div className='form-group col-lg'>
  //           <label>
  //             ชื่อบทบาท <span style={{ color: 'red' }}>*</span>
  //           </label>
  //           <Form.Item
  //             name='permission'
  //             rules={[
  //               {
  //                 required: true,
  //                 message: 'กรุณากรอกชื่อบทบาท!',
  //               },
  //             ]}
  //           >
  //             <Input placeholder='กรอกชื่อบทบาท' onChange={handleOnChange} autoComplete='off' />
  //           </Form.Item>
  //         </div>
  //       </Form>
  //     </CardContainer>
  //   </div>
  // )
  // const listMenuData = (
  //   <div className='pt-3'>
  //     <Table
  //       columns={columns}
  //       expandable={{ expandedRowRender, defaultExpandedRowKeys: ['0'] }}
  //       dataSource={listMenu}
  //     />
  //   </div>
  // )
  // const insertPermission = () => {
  //   Swal.fire({
  //     title: 'บันทึกสำเร็จ',
  //     icon: 'success',
  //     timer: 1500,
  //     showConfirmButton: false,
  //   }).then(() => {
  //     navigate('/IndexPermission')
  //   })
  // }
  // return (
  //   <div>
  //     <Row>
  //       <BackIconButton onClick={() => navigate(-1)} />
  //       <span className='pt-3'>
  //         <strong style={{ fontSize: '20px' }}>เพิ่มบทบาทผู้ดูแลระบบ</strong>
  //       </span>
  //     </Row>
  //     {permissionData}
  //     {listMenuData}
  //     <FooterPage
  //       onClickBack={() => navigate(-1)}
  //       onClickSave={insertPermission}
  //       // disableSaveBtn={saveBtnDisable}
  //     />
  //   </div>
  // )
  const expandedRowRender = () => {
    const columns: TableColumnsType<ExpandedDataType> = [
      { title: 'Date', dataIndex: 'date', key: 'date' },
      { title: 'Name', dataIndex: 'name', key: 'name' },
      {
        title: 'Status',
        key: 'state',
        render: () => <Badge status="success" text="Finished" />,
      },
      { title: 'Upgrade Status', dataIndex: 'upgradeNum', key: 'upgradeNum' },
      {
        title: 'Action',
        dataIndex: 'operation',
        key: 'operation',
        render: () => (
          <Space size="middle">
            <a>Pause</a>
            <a>Stop</a>
          
          </Space>
        ),
      },
    ];

    const data = [];
    for (let i = 0; i < 3; ++i) {
      data.push({
        key: i.toString(),
        date: '2014-12-24 23:12:00',
        name: 'This is production name',
        upgradeNum: 'Upgraded: 56',
      });
    }
    return <Table columns={columns} dataSource={data} pagination={false} showHeader={false}/>;
  };

  const columns: TableColumnsType<any> = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Platform', dataIndex: 'platform', key: 'platform' },
    { title: 'Version', dataIndex: 'version', key: 'version' },
    { title: 'Upgraded', dataIndex: 'upgradeNum', key: 'upgradeNum' },
    { title: 'Creator', dataIndex: 'creator', key: 'creator' },
    { title: 'Date', dataIndex: 'createdAt', key: 'createdAt' },
    { title: 'Action', key: 'operation', render: () => <a>Publish</a> },
  ];

  const data: any[] = [];
  for (let i = 0; i < 3; ++i) {
    data.push({
      key: i.toString(),
      name: 'Screen',
      platform: 'iOS',
      version: '10.3.4.5654',
      upgradeNum: 500,
      creator: 'Jack',
      createdAt: '2014-12-24 23:12:00',
    });
  }

  return (
    <>
      <Table
        columns={columns}
        expandable={{ expandedRowRender, defaultExpandedRowKeys: ['0'] }}
        dataSource={data}
      />
    </>
  );
}

export default AddPermission
