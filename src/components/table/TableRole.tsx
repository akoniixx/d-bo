import { Table } from 'antd'
interface ConvertedDataType {
  name: string;
  value: {
      [key: string]: any;
  };
}
interface TableRoleProps {
  dataJob: ConvertedDataType[]
  dataFarmer: ConvertedDataType[]
  dataDroner: ConvertedDataType[]
  dataGuru: ConvertedDataType[]
  dataReward: ConvertedDataType[]
  dataMission: ConvertedDataType[]
  dataPromotion: ConvertedDataType[]
  dataPointResult: ConvertedDataType[]
  dataAdmin: ConvertedDataType[]
  dataSetting: ConvertedDataType[]
  dataPoint: ConvertedDataType[]
  dataChallenge: ConvertedDataType[]
  column: any[]
  subColumn: any[]
  onChangeJob: (e: any) => void
  onChangeFarmer: (e: any) => void
  onChangeDroner: (e: any) => void
  onChangeGuru: (e: any) => void
  onChangeReward: (e: any) => void
  onChangeMission: (e: any) => void
  onChangePromotion: (e: any) => void
  onChangePointResult: (e: any) => void
  onChangeAdmin: (e: any) => void
  onChangeSetting: (e: any) => void
  onChangePoint: (e: any) => void
  onChangeChallenge: (e: any) => void
}

function TableRole({
  dataJob,
  dataFarmer,
  dataDroner,
  dataGuru,
  dataReward,
  dataMission,
  dataPromotion,
  dataPointResult,
  dataAdmin,
  dataSetting,
  dataPoint,
  dataChallenge,
  column,
  subColumn,
  onChangeJob,
  onChangeFarmer,
  onChangeDroner,
  onChangeGuru,
  onChangeReward,
  onChangeMission,
  onChangePromotion,
  onChangePointResult,
  onChangeAdmin,
  onChangeSetting,
  onChangePoint,
  onChangeChallenge,
}: TableRoleProps) {
  return (
    <div className='pt-3'>
      <Table
        columns={column}
        dataSource={dataJob}
        pagination={false}
        expandable={{
          expandedRowRender: () => (
            <Table showHeader={false} columns={subColumn} dataSource={dataJob[0].value.followJob} pagination={false} />
          ),
        }}
      />
      <Table
        showHeader={false}
        columns={column}
        dataSource={dataFarmer}
        pagination={false}
        expandable={{
          expandedRowRender: () => (
            <Table
              showHeader={false}
              columns={subColumn}
              dataSource={dataFarmer}
              pagination={false}
            />
          ),
        }}
      />
      <Table
        showHeader={false}
        columns={column}
        dataSource={dataDroner}
        pagination={false}
        expandable={{
          expandedRowRender: () => (
            <Table
              showHeader={false}
              columns={subColumn}
              dataSource={dataDroner}
              pagination={false}
            />
          ),
        }}
      />
      <Table
        showHeader={false}
        columns={column}
        dataSource={dataGuru}
        pagination={false}
        expandable={{
          expandedRowRender: () => (
            <Table
              showHeader={false}
              columns={subColumn}
              dataSource={dataGuru}
              pagination={false}
            />
          ),
        }}
      />
      <Table
        showHeader={false}
        columns={column}
        dataSource={dataPromotion}
        pagination={false}
        expandable={{
          expandedRowRender: () => (
            <Table
              showHeader={false}
              columns={subColumn}
              dataSource={dataPromotion}
              pagination={false}
            />
          ),
        }}
      />
      <Table
        showHeader={false}
        columns={column}
        dataSource={dataPointResult}
        pagination={false}
        expandable={{
          expandedRowRender: () => (
            <Table
              showHeader={false}
              columns={subColumn}
              dataSource={dataPointResult}
              pagination={false}
            />
          ),
        }}
      />
      <Table
        showHeader={false}
        columns={column}
        dataSource={dataReward}
        pagination={false}
        expandable={{
          expandedRowRender: () => (
            <Table
              showHeader={false}
              columns={subColumn}
              dataSource={dataReward}
              pagination={false}
            />
          ),
        }}
      />
      <Table
        showHeader={false}
        columns={column}
        dataSource={dataMission}
        pagination={false}
        expandable={{
          expandedRowRender: () => (
            <Table
              showHeader={false}
              columns={subColumn}
              dataSource={dataMission}
              pagination={false}
            />
          ),
        }}
      />
      <Table
        showHeader={false}
        columns={column}
        dataSource={dataChallenge}
        pagination={false}
        expandable={{
          expandedRowRender: () => (
            <Table
              showHeader={false}
              columns={subColumn}
              dataSource={dataChallenge}
              pagination={false}
            />
          ),
        }}
      />
      <Table
        showHeader={false}
        columns={column}
        dataSource={dataAdmin}
        pagination={false}
        expandable={{
          expandedRowRender: () => (
            <Table
              showHeader={false}
              columns={subColumn}
              dataSource={dataAdmin}
              pagination={false}
            />
          ),
        }}
      />
      <Table
        showHeader={false}
        columns={column}
        dataSource={dataSetting}
        pagination={false}
        expandable={{
          expandedRowRender: () => (
            <Table
              showHeader={false}
              columns={subColumn}
              dataSource={dataSetting}
              pagination={false}
            />
          ),
        }}
      />
      <Table
        showHeader={false}
        columns={column}
        dataSource={dataPoint}
        pagination={false}
        expandable={{
          expandedRowRender: () => (
            <Table
              showHeader={false}
              columns={subColumn}
              dataSource={dataPoint}
              pagination={false}
            />
          ),
        }}
      />
    </div>
  )
}

export default TableRole
