import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { API_URL } from "../../config/constants";

const Category = ({ user }) => {
  const [category, setCategory] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/resourceCategories/getCategories`)
      .then((result) => {
        setCategory(result.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (!category) {
    return <div>로딩중</div>;
  }

  const categoryItems = category.map((item) => ({
    key: item.category_id,
    label: (
      <Link to={`/resourcePage/${item.category_id}`}>{item.category_name}</Link>
    ),
  }));

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
      children: categoryItems,
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
