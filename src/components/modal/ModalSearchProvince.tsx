/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react'
import { Form, Input, Modal } from 'antd'
import FooterPage from '../footer/FooterPage'
import Select from 'react-select'
import { LocationDatasource } from '../../datasource/LocationDatasource'
import {
  ProvinceEntity,
  ProvincePriceEntity,
  ProvincePriceEntity_INIT,
} from '../../entities/LocationEntities'
import color from '../../resource/color'
interface ModalSearchProvinceProps {
  show: boolean
  backButton: () => void
  title: string
  callBack: (data: ProvincePriceEntity[]) => void
  data: any
}
const ModalSearchProvince: React.FC<ModalSearchProvinceProps> = ({
  show,
  backButton,
  title,
  callBack,
}) => {
  const [dropdownVisible, setDropdownVisible] = useState(false)
  const [form] = Form.useForm()
  const [searchFilterProvince, setSearchFilterProvince] = useState<string>('')
  const [provinceListDropdown, setProvinceListDropdown] = useState<any>([])
  const [selectProvince, setSelectProvince] = useState<any>([])
  const [data, setData] = useState<ProvincePriceEntity>(ProvincePriceEntity_INIT)
  const [saveBtnDisable, setBtnSaveDisable] = useState<boolean>(true)

  useEffect(() => {
    fetchProvince()
  }, [])

  const fetchProvince = async () => {
    await LocationDatasource.getProvince().then((res: ProvinceEntity[]) => {
      const data = res.map((item: { provinceName: string; provinceId: number }) => {
        return {
          ...item,
          label: item.provinceName,
          value: item.provinceId,
        }
      })
      setProvinceListDropdown(data)
    })
  }
  useEffect(() => {
    LocationDatasource.getProvince().then((res: ProvinceEntity[]) => {
      const data = res.map((item: { provinceName: string; provinceId: number }) => {
        return {
          ...item,
          label: item.provinceName,
          value: item.provinceId,
        }
      })
      setProvinceListDropdown(data)
    })
  }, [searchFilterProvince])

  const handleDropdownVisibility = (visible: boolean | ((prevState: boolean) => boolean)) => {
    setDropdownVisible(visible)
  }
  const handleInputChange = (inputValue: any) => {
    setSearchFilterProvince(inputValue)
  }
  const handleSearchProvince = (id: any) => {
    setSelectProvince(id)
  }
  const handleOnPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    if (inputValue.length === 1 && inputValue.startsWith('0')) {
      return
    }
    const convertedNumber = inputValue.replace(/[^\d1-9]/g, '')
    setData((prev: any) => ({
      ...prev,
      price: convertedNumber,
    }))
  }
  const isDisabled = !data.price

  const onFieldsChange = () => {
    const searchProvince = form.getFieldValue('searchProvince')
    if (searchProvince.length > 0) {
      setBtnSaveDisable(false)
    } else {
      setBtnSaveDisable(true)
    }
  }
  const submit = () => {
    const dataArray: ProvincePriceEntity[] = []
    for (const province of selectProvince) {
      const sumValue: ProvincePriceEntity = {
        provinceId: province.provinceId,
        price: data.price,
      }
      dataArray.push(sumValue)
    }

    callBack(dataArray)
  }
  return (
    <>
      <Modal
        title={
          <div
            style={{
              width: '100%',
              cursor: 'move',
            }}
          >
            {title}
          </div>
        }
        visible={show}
        onCancel={() => {
          backButton()
          form.resetFields()
          setData(ProvincePriceEntity_INIT)
          setSelectProvince([])
        }}
        width={600}
        footer={[
          <FooterPage
            onClickBack={() => {
              backButton()
              form.resetFields()
              setSelectProvince([])
              setData(ProvincePriceEntity_INIT)
            }}
            onClickSave={() => {
              backButton()
              form.resetFields()
              setSelectProvince([])
              setData(ProvincePriceEntity_INIT)
              submit()
            }}
            disableSaveBtn={saveBtnDisable || isDisabled}
          />,
        ]}
      >
        <div className='form-group' style={{ height: dropdownVisible ? '380px' : 'max-content' }}>
          <Form form={form} onFieldsChange={onFieldsChange}>
            <label>
              จังหวัด<span style={{ color: color.Error }}>*</span>
            </label>
            <Form.Item name='searchProvince'>
              <Select
                placeholder='ค้นหาชื่อจังหวัด'
                isSearchable
                isMulti
                isClearable
                closeMenuOnSelect={false}
                onMenuOpen={() => handleDropdownVisibility(true)}
                onMenuClose={() => handleDropdownVisibility(false)}
                onInputChange={handleInputChange}
                onChange={(selectedOptions: any) => {
                  handleSearchProvince(selectedOptions)
                }}
                options={provinceListDropdown}
                value={selectProvince}
              />
            </Form.Item>
            {selectProvince.length > 0 && (
              <>
                <label>
                  ราคา<span style={{ color: color.Error }}>*</span>
                </label>
                <Input
                  placeholder='กรุณากรอกราคา'
                  suffix='บาท'
                  onChange={(e) => handleOnPrice(e)}
                  autoComplete='off'
                  value={data.price}
                />
              </>
            )}
          </Form>
        </div>
      </Modal>
    </>
  )
}

export default ModalSearchProvince
