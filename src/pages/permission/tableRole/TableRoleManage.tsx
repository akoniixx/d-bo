import React from 'react'
import { Button, Modal, Table } from 'antd'
import { InfoCircleFilled, LeftOutlined } from '@ant-design/icons'

interface TableRoleManageProps {
  columns: any[]
  listMenu: any[]
}
export const TableRoleManage: React.FC<TableRoleManageProps> = ({
    columns,
    listMenu,
}) => (
 <>
 <Table columns={columns} dataSource={listMenu} pagination={false} />
 </>
)
