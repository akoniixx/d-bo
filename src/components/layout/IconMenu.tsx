import {
  ContactsFilled,
  GiftFilled,
  MacCommandFilled,
  ProfileFilled,
  RadarChartOutlined,
  SettingFilled,
  StarFilled,
  UserOutlined,
} from '@ant-design/icons'
import { Image } from 'antd'
import React from 'react'
import { color, icon } from '../../resource'

export const IconMenu = {
  task: (
    <Image
      src={icon.task_inactive}
      preview={false}
      style={{ width: 18, height: 22, color: color.BK, paddingBottom: 4 }}
    />
  ),
  farmer: (
    <Image
      src={icon.farmer_inactive}
      preview={false}
      style={{ width: 18, height: 22, color: color.BK, paddingBottom: 4 }}
    />
  ),
  news: (
    <Image
      src={icon.icon_news}
      preview={false}
      style={{ width: 18, height: 22, color: color.BK, paddingBottom: 4 }}
    />
  ),
  droner: (
    <Image
      src={icon.droner_inactive}
      preview={false}
      style={{ width: 18, height: 22, color: color.BK, paddingBottom: 4 }}
    />
  ),
  campaign: (
    <Image
      src={icon.pointRankInActive}
      preview={false}
      style={{ width: 19, height: 22, color: color.BK, paddingBottom: 4 }}
    />
  ),
  admin: (
    <Image
      src={icon.admin_inactive}
      preview={false}
      style={{ width: 18, height: 22, color: color.BK, paddingBottom: 4 }}
    />
  ),
  setting: (
    <SettingFilled
      style={{
        fontSize: '16px',
        color: '#231F20',
      }}
    />
  ),
  mission: (
    <Image
      src={icon.targetInActive}
      preview={false}
      style={{ width: 18, height: 18, color: color.BK }}
    />
  ),
  promotion: (
    <Image
      src={icon.news_inactive}
      preview={false}
      style={{ width: 18, height: 18, color: color.BK }}
    />
  ),
  rewards: (
    <Image
      src={icon.icon_reward}
      preview={false}
      style={{ width: 18, height: 18, color: color.BK }}
    />
  ),
  challenge: (
    <Image
      src={icon.icon_challenge}
      preview={false}
      style={{ width: 18, height: 18, color: color.BK }}
    />
  ),
}
export const IconMenuActive = {
  task: (
    <Image
      src={icon.task_active}
      preview={false}
      style={{ width: 18, height: 22, color: color.BK, paddingBottom: 4 }}
    />
  ),
  farmer: (
    <Image
      src={icon.farmer_active}
      preview={false}
      style={{ width: 18, height: 22, color: color.BK, paddingBottom: 4 }}
    />
  ),
  news: (
    <Image
      src={icon.icon_news_active}
      preview={false}
      style={{ width: 18, height: 22, color: color.BK, paddingBottom: 4 }}
    />
  ),
  droner: (
    <Image
      src={icon.droner_active}
      preview={false}
      style={{ width: 18, height: 22, color: color.BK, paddingBottom: 4 }}
    />
  ),
  campaign: (
    <Image
      src={icon.pointRankActive}
      preview={false}
      style={{ width: 18, height: 22, color: color.BK, paddingBottom: 4 }}
    />
  ),
  admin: (
    <Image
      src={icon.admin_active}
      preview={false}
      style={{ width: 18, height: 19, color: color.BK, paddingBottom: 4 }}
    />
  ),
  setting: (
    <SettingFilled
      style={{
        fontSize: '16px',
        color: '#FFCA37',
      }}
    />
  ),
  mission: <Image src={icon.targetActive} preview={false} style={{ width: 18, height: 18 }} />,
  promotion: (
    <Image
      src={icon.news_active}
      preview={false}
      style={{ width: 18, height: 18, color: color.BK }}
    />
  ),
  rewards: (
    <Image
      src={icon.icon_reward_active}
      preview={false}
      style={{ width: 18, height: 18, color: color.BK }}
    />
  ),
  challenge: (
    <Image
      src={icon.icon_challenge_active}
      preview={false}
      style={{ width: 18, height: 18, color: color.BK }}
    />
  ),
}
