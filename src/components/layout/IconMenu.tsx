import { Image } from 'antd'
import React from 'react'
import { color, icon } from '../../resource'

export const IconMenu = {
  task: (
    <Image
      src={icon.task_inactive}
      preview={false}
      style={{ width: 20, height: 24, paddingBottom: 4 }}
    />
  ),
  farmer: (
    <Image
      src={icon.farmer_inactive}
      preview={false}
      style={{ width: 22, height: 26, paddingBottom: 4 }}
    />
  ),
  news: (
    <Image
      src={icon.icon_news}
      preview={false}
      style={{ width: 20, height: 24, paddingBottom: 4 }}
    />
  ),
  droner: (
    <Image
      src={icon.droner_inactive}
      preview={false}
      style={{ width: 26, height: 30, paddingBottom: 4 }}
    />
  ),
  campaign: (
    <Image
      src={icon.pointRankInActive}
      preview={false}
      style={{ width: 22, height: 26, paddingBottom: 4 }}
    />
  ),
  admin: (
    <Image
      src={icon.admin_inactive}
      preview={false}
      style={{ width: 22, height: 26, paddingBottom: 4 }}
    />
  ),
  setting: (
    <Image
      src={icon.icon_setting_inactive}
      preview={false}
      style={{ width: 22, height: 26, paddingBottom: 4 }}
    />
  ),
  mission: <Image src={icon.targetInActive} preview={false} style={{ width: 22, height: 22 }} />,
  promotion: <Image src={icon.news_inactive} preview={false} style={{ width: 22, height: 22 }} />,
  rewards: <Image src={icon.icon_reward} preview={false} style={{ width: 20, height: 20 }} />,
  challenge: <Image src={icon.icon_challenge} preview={false} style={{ width: 20, height: 20 }} />,
  infinity: (
    <Image
      src={icon.droner_inactive}
      preview={false}
      style={{ width: 26, height: 30, paddingBottom: 4 }}
    />
  ),
}
export const IconMenuActive = {
  task: (
    <Image
      src={icon.task_active}
      preview={false}
      style={{ width: 20, height: 22, paddingBottom: 4 }}
    />
  ),
  farmer: (
    <Image
      src={icon.farmer_active}
      preview={false}
      style={{ width: 22, height: 26, paddingBottom: 4 }}
    />
  ),
  news: (
    <Image
      src={icon.icon_news_active}
      preview={false}
      style={{ width: 20, height: 24, paddingBottom: 4 }}
    />
  ),
  droner: (
    <Image
      src={icon.droner_active}
      preview={false}
      style={{ width: 26, height: 30, paddingBottom: 4 }}
    />
  ),
  campaign: (
    <Image
      src={icon.pointRankActive}
      preview={false}
      style={{ width: 22, height: 26, paddingBottom: 4 }}
    />
  ),
  admin: (
    <Image
      src={icon.admin_active}
      preview={false}
      style={{ width: 22, height: 26, paddingBottom: 4 }}
    />
  ),
  setting: (
    <Image
      src={icon.icon_setting}
      preview={false}
      style={{ width: 22, height: 26, paddingBottom: 4 }}
    />
  ),
  mission: <Image src={icon.targetActive} preview={false} style={{ width: 22, height: 22 }} />,
  promotion: <Image src={icon.news_active} preview={false} style={{ width: 22, height: 22 }} />,
  rewards: (
    <Image src={icon.icon_reward_active} preview={false} style={{ width: 20, height: 20 }} />
  ),
  challenge: (
    <Image src={icon.icon_challenge_active} preview={false} style={{ width: 20, height: 20 }} />
  ),
  infinity: (
    <Image
      src={icon.droner_active}
      preview={false}
      style={{ width: 26, height: 30, paddingBottom: 4 }}
    />
  ),
}
