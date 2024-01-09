import { Checkbox, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { method } from './TableRole'

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
  const [checkAllView, setCheckAllView] = useState<boolean>(false)
  const [checkAllAdd, setCheckAllAdd] = useState<boolean>(false)
  const [checkAllEdit, setCheckAllEdit] = useState<boolean>(false)
  const [checkAllDelete, setCheckAllDelete] = useState<boolean>(false)
  const [checkAllCancel, setCheckAllCancel] = useState<boolean>(false)
  const [checkAllExcel, setCheckAllExcel] = useState<boolean>(false)
  const [sub, setSub] = useState<boolean>(false)


  const onChangeHeader = (data: any, key: string, checked: boolean, index: number) => {
    onChange(data, key, checked, index)
  }
  console.log(data)

  const mergedArray = [
    'followJob',
    'farmerJob',
    'dronerJob',
    'guru',
    'promotion',
    'pointResult',
    'reward',
    'mission',
    'challenge',
    'admin',
    'settings',
    'point',
  ]

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
        let allSubAreTrue = true;
         mergedArray.forEach((name) => {
          const nameHead = row.value[name]
          nameHead?.forEach((job: any) => {
            if (job.sub === false) {
              allSubAreTrue = false;
            }
            setCheckAllView(job.view.value)
            
          })
        })
        if(allSubAreTrue){
          console.log(1)
        }
        return {
          children: (
            <>
              <Checkbox
                disabled={value?.disabled}
                onChange={(e) => onChangeHeader(row.name, 'view', e.target.checked, index)}
                checked={!stateHeader[method.indexOf('view')] || checkAllView}
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
                checked={
                  value?.disabled ? false : !stateHeader[method.indexOf('add')]
                }
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
                checked={!stateHeader[method.indexOf('excel')] || checkAllExcel}
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
