import React from "react";
import { Breadcrumb, Layout, Menu, theme, Button, message, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Outlet, Link, useNavigate } from "react-router-dom";
import "../css/MainPage.css";
import items1 from "./navBars/NavBar";
import Category from "./categorys/Category";
import { useSelector, useDispatch } from "react-redux";
import { clearUserInfo } from "../reducer/userSlice";

const { Header, Content, Footer, Sider } = Layout;

const MainPage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const user = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 로그아웃
  const handleLogout = () => {
    dispatch(clearUserInfo()); // 리덕스 상태에서 사용자 정보 제거
    message.success("로그아웃 되었습니다.");
    navigate("/");
  };

  return (
    <Layout>
      <Header id="header">
        <div className="demo-logo">
          <div className="button_div">
            {user ? (
              <div>
                <Avatar id="userImg" icon={<UserOutlined />} />
                <span className="loginSpan">{user.name}님 로그인중...</span>
                <Button className="logOutBtn" onClick={handleLogout}>
                  로그아웃
                </Button>
              </div>
            ) : (
              <div>
                <span className="loginSpan">
                  사용자 정보가 없습니다. 로그인 해주세요.
                </span>
                <Link to={"/login"}>
                  <Button className="button">로그인</Button>
                </Link>
                <Link to={"/signup"}>
                  <Button className="button">회원가입</Button>
                </Link>
              </div>
            )}
          </div>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            items={items1}
            style={{ flex: 1, minWidth: 0 }}
          />
        </div>
      </Header>
      <Content style={{ padding: "0 48px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Layout
          style={{
            padding: "24px 0",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            minHeight: "500px",
          }}
        >
          <Sider style={{ background: colorBgContainer }} width={200}>
            <Category user={user} />
          </Sider>
          <Content id="content" style={{ padding: "0 24px", minHeight: 280 }}>
            <Outlet />
          </Content>
        </Layout>
      </Content>
      <Footer id="footer"></Footer>
    </Layout>
  );
};

export default MainPage;
