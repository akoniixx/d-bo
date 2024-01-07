import { Checkbox, Table } from 'antd'
import React, { useEffect, useState } from 'react'
interface TableInSubRoleProps {
  onChange: (data: any, index: number, category: string) => void
  data: any
}
const TableInSubRole: React.FC<TableInSubRoleProps> = ({ onChange, data }) => {
  const onChangeValue = (data: any, key: string, checked: boolean, index: number) => {
    const values = data
    values[key].value = checked
    onChange(values, index, key)
  }
  console.log(data)

  const subColumn = [
    {
      title: 'ชื่อเมนู',
      dataIndex: 'name',
      key: 'name',
      width: '17%',
      render: (value: any, row: any, index: number) => {
        return {
          children: <span>{value}</span>,
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
                onChange={(e) => onChangeValue(row, 'view', e.target.checked, index)}
                checked={value?.disabled ? false : row['view'].value}
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
                onChange={(e) => onChangeValue(row, 'add', e.target.checked, index)}
                checked={value?.disabled ? false : row['add'].value}
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
                onChange={(e) => onChangeValue(row, 'edit', e.target.checked, index)}
                checked={value?.disabled ? false : row['edit'].value}
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
                onChange={(e) => onChangeValue(row, 'delete', e.target.checked, index)}
                checked={value?.disabled ? false : row['delete'].value}
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
                onChange={(e) => onChangeValue(row, 'cancel', e.target.checked, index)}
                checked={value?.disabled ? false : row['cancel'].value}
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
                onChange={(e) => onChangeValue(row, 'excel', e.target.checked, index)}
                checked={value?.disabled ? false : row['excel'].value}
              />
            </>
          ),
        }
      },
    },
  ]

  return <Table showHeader={false} columns={subColumn} dataSource={data} pagination={false} />
}

export default TableInSubRole
