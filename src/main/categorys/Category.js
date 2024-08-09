import React from "react";
import { Link } from "react-router-dom";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";

const items2: MenuProps["items"] = [
  {
    key: "sub1",
    icon: React.createElement(UserOutlined),
    label: "사용자",
    children: [
      {
        key: "1",
        label: <Link to="/profile">프로필</Link>,
      },
      {
        key: "2",
        label: <Link to="/attendance">출퇴근</Link>,
      },
      {
        key: "3",
        label: <Link to="/mainPostsBoard">게시판</Link>,
      },
      {
        key: "4",
        label: "Privacy",
      },
    ],
  },
  {
    key: "sub2",
    icon: React.createElement(LaptopOutlined),
    label: "예약",
    children: [
      {
        key: "5",
        label: <Link to="/conferenceRoom">회의실</Link>,
      },
      {
        key: "6",
        label: "차량",
      },
      {
        key: "7",
        label: "장비",
      },
    ],
  },
  {
    key: "sub3",
    icon: React.createElement(NotificationOutlined),
    label: "공지사항",
    children: [
      {
        key: "9",
        label: "Alerts",
      },
      {
        key: "10",
        label: "Messages",
      },
      {
        key: "11",
        label: "Updates",
      },
      {
        key: "12",
        label: "Reminders",
      },
    ],
  },
];

export default items2;
