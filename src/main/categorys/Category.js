import React from "react";
import { Link } from "react-router-dom";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";

const Category = ({ user }) => {
  const Items = [
    {
      key: "sub1",
      icon: <UserOutlined />,
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
      icon: (
        <div style={{ display: "flex", alignItems: "center" }}>
          <LaptopOutlined />
        </div>
      ),
      label: (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>예약</span>
          {user?.user_id === "admin" && (
            <Link to="/resourceManage">
              <SettingOutlined style={{ marginLeft: 8 }} />
            </Link>
          )}
        </div>
      ),
      children: [
        {
          key: "5",
          label: <Link to="/conferenceRoom">회의실</Link>,
        },
        {
          key: "6",
          label: <Link to="/car">차량</Link>,
        },
        {
          key: "7",
          label: "장비",
        },
      ],
    },
    {
      key: "sub3",
      icon: <NotificationOutlined />,
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

  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      style={{ height: "100%" }}
      items={Items}
    />
  );
};

export default Category;
