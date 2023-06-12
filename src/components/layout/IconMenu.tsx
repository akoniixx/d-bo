import {
  ContactsFilled,
  GiftFilled,
  MacCommandFilled,
  ProfileFilled,
  RadarChartOutlined,
  SettingFilled,
  StarFilled,
  UserOutlined,
} from "@ant-design/icons";
import { Image } from "antd";
import React from "react";
import { color, icon } from "../../resource";

export const IconMenu = {
  task: (
    <ProfileFilled
      style={{
        fontSize: "16px",
        color: "#231F20",
      }}
    />
  ),
  IndexFarmer: (
    <ContactsFilled
      style={{
        fontSize: "16px",
        color: "#231F20",
      }}
    />
  ),
  news: (
    <GiftFilled
      style={{
        fontSize: "16px",
        color: "#231F20",
      }}
    />
  ),
  droner: (
    <MacCommandFilled
      style={{
        fontSize: "16px",
        color: "#231F20",
      }}
    />
  ),
  campaign: (
    <Image
      src={icon.pointRankInActive}
      preview={false}
      style={{ width: 18, height: 22, color: color.BK, paddingBottom: 4 }}
    />
  ),
  admin: (
    <UserOutlined
      style={{
        fontSize: "16px",
        color: "#231F20",
      }}
    />
  ),
  setting: (
    <SettingFilled
      style={{
        fontSize: "16px",
        color: "#231F20",
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
};
export const IconMenuInActive = {
  task: (
    <ProfileFilled
      style={{
        fontSize: "16px",
        color: "#FFCA37",
      }}
    />
  ),
  IndexFarmer: (
    <ContactsFilled
      style={{
        fontSize: "16px",
        color: "#FFCA37",
      }}
    />
  ),
  news: (
    <GiftFilled
      style={{
        fontSize: "16px",
        color: "#FFCA37",
      }}
    />
  ),
  droner: (
    <MacCommandFilled
      style={{
        fontSize: "16px",
        color: "#FFCA37",
      }}
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
    <UserOutlined
      style={{
        fontSize: "16px",
        color: "#FFCA37",
      }}
    />
  ),
  setting: (
    <SettingFilled
      style={{
        fontSize: "16px",
        color: "#FFCA37",
      }}
    />
  ),
  mission: (
    <Image
      src={icon.targetActive}
      preview={false}
      style={{ width: 18, height: 18 }}
    />
  ),
};
