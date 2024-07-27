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
        label: <Link to="/profile">Profile</Link>,
      },
      {
        key: "2",
        label: "Account",
      },
      {
        key: "3",
        label: "Notifications",
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
    label: "부서",
    children: [
      {
        key: "5",
        label: "Laptop",
      },
      {
        key: "6",
        label: "Mobile",
      },
      {
        key: "7",
        label: "Tablet",
      },
      {
        key: "8",
        label: "Accessories",
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
