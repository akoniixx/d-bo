import { Checkbox, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { method } from '../../pages/permission/DefaultRole'

interface TableHeaderRoleProps {
  onChange: (data: any, key: string, checked: boolean, index: number) => void
  data: any
  header: string
  subColumns: JSX.Element
  stateHeader: boolean[]
  showHeader: boolean
}
const TableHeaderRole: React.FC<TableHeaderRoleProps> = ({
  onChange,
  data,
  header,
  subColumns,
  stateHeader,
  showHeader,
}) => {
  useEffect(() => {}, [stateHeader])

  const onChangeHeader = (data: any, key: string, checked: boolean, index: number) => {
    onChange(data, key, checked, index)
  }

  const column = [
    {
      title: 'ชื่อเมนู',
      dataIndex: 'name',
      key: 'name',
      width: '21%',
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{header}</span>,
        }
      },
    },
    {
      title: 'ดูข้อมูล (View)',
      dataIndex: 'view',
      key: 'view',
      width: '11%',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <Checkbox
                disabled={value?.disabled}
                onChange={(e) => onChangeHeader(row.name, 'view', e.target.checked, index)}
                checked={!stateHeader[method.indexOf('view')]}
              />
            </>
          ),
        }
      },
    },
    {
      title: 'เพิ่ม (Add)',
      dataIndex: 'add',
      key: 'add',
      width: '11%',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <Checkbox
                disabled={value?.disabled}
                onChange={(e) => onChangeHeader(row.name, 'add', e.target.checked, index)}
                checked={!stateHeader[method.indexOf('add')]}
              />
            </>
          ),
        }
      },
    },
    {
      title: 'แก้ไข (Edit)',
      dataIndex: 'edit',
      key: 'edit',
      width: '11%',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <Checkbox
                disabled={value?.disabled}
                onChange={(e) => onChangeHeader(row.name, 'edit', e.target.checked, index)}
                checked={!stateHeader[method.indexOf('edit')]}
              />
            </>
          ),
        }
      },
    },
    {
      title: 'ลบ (Delete)',
      dataIndex: 'delete',
      key: 'delete',
      width: '11%',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <Checkbox
                disabled={value?.disabled}
                onChange={(e) => onChangeHeader(row.name, 'delete', e.target.checked, index)}
                checked={!stateHeader[method.indexOf('delete')]}
              />
            </>
          ),
        }
      },
    },
    {
      title: 'ยกเลิก (cancel)',
      dataIndex: 'cancel',
      key: 'cancel',
      width: '13%',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <Checkbox
                disabled={value?.disabled}
                onChange={(e) => onChangeHeader(row.name, 'cancel', e.target.checked, index)}
                checked={!stateHeader[method.indexOf('cancel')]}
              />
            </>
          ),
        }
      },
    },
    {
      title: 'บันทึกไฟล์ (Export File)',
      dataIndex: 'excel',
      key: 'excel',
      width: '18%',
      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <>
              <Checkbox
                disabled={value?.disabled}
                onChange={(e) => onChangeHeader(row.name, 'excel', e.target.checked, index)}
                checked={!stateHeader[method.indexOf('excel')]}
              />
            </>
          ),
        }
      },
    },
  ]

  return (
    <Table
      rowClassName={'table-head-role'}
      showHeader={showHeader}
      columns={column}
      dataSource={data}
      pagination={false}
      expandable={{
        expandedRowRender: () => subColumns,
      }}
    />
  )
}

export default TableHeaderRole
