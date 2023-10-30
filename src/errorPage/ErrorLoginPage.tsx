import React, { Component } from 'react'
import image from '../resource/image'
export default class ErrorLoginPage extends Component {
  logout = () => {
    localStorage.clear()
    const url = window.location.href
    const arr = url.split('/')
    const resultUrlHost = arr[0] + '//' + arr[2]
    window.location.href = '/'
  }
  render() {
    return (
      <div className='d-flex justify-content-center'>
        <div className='error error-6 d-flex flex-row-fluid bgi-size-cover bgi-position-center'>
          <div className='d-flex flex-column flex-row-fluid text-center'>
            <div style={{ marginTop: '10%' }}>
              <img src={image.errorPage} className='max-w-300px mt-1ถ mt-md-0 mb-12' />
            </div>
            <br />
            <h1 className='error-title font-weight-boldest mb-8' style={{ color: '#99A2B2' }}>
              กรุณาเข้าสู่ระบบใหม่อีกครั้ง
            </h1>
            <h2 className='font-weight-bold text-gray' style={{ color: '#99A2B2' }}>
              กรุณาออกจากระบบ
              <br />
              และเข้าสู่ระบบด้วย Username และ Password ที่ถูกต้อง
            </h2>
            <div className='text-center mt-5'>
              <button
                type='button'
                className='btn btn-primary font-weight-boldest'
                onClick={() => this.logout()}
              >
                ออกจากระบบ
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
