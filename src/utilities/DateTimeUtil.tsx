import moment from 'moment'
import localeTh from 'antd/es/date-picker/locale/th_TH'
export class DateTimeUtil {
  static getTimestampSecond(dt: Date): number {
    return Math.floor(dt.getTime() / 1000)
  }

  static formatDateTh = (date: string) => {
    const formatDate = new Date(date)
    return formatDate.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  static formatDateThShort = (date: string) => {
    const formatDate = new Date(date)
    return formatDate.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  static formatTime = (date: string) => {
    const formatTime = new Date(date)
    return formatTime.toLocaleTimeString('th-TH', {
      hour: 'numeric',
      minute: 'numeric',
    })
  }
  static formatDateTime = (date: string) => {
    return moment(date).format('DD/MM/yyyy HH:mm')
  }

  static formatDate = (date: string) => {
    return moment(date).format('DD/MM/yyyy')
  }

  static calculateDay = (date: string) => {
    const now = new Date().getTime()
    const expired = new Date(date).getTime()
    const result = (expired - now) / 86400000
    return result < 0 ? 0 : parseInt(result.toString())
  }
}
export const newLocale = {
  ...localeTh,
}
