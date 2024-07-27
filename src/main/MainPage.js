import React, { useEffect, useState } from "react";
import { Breadcrumb, Layout, Menu, theme, Button, message } from "antd";
import { Outlet, Link, useNavigate } from "react-router-dom";
import "./MainPage.css";
import items1 from "./navBars/NavBar";
import items2 from "./categorys/Category";

const { Header, Content, Footer, Sider } = Layout;

const MainPage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // 로그아웃
  const handleLogout = () => {
    localStorage.removeItem("user"); // 로컬 스토리지에서 사용자 정보 삭제
    setUser(null);
    message.success("로그아웃 되었습니다.");
    navigate("/");
  };

  return (
    <Layout>
      <Header id="header">
        <div className="demo-logo">
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            items={items1}
            style={{ flex: 1, minWidth: 0 }}
          />
          <div className="button_div">
            {user ? (
              <div>
                {user.name}님 로그인중...
                <Button className="logOutBtn" onClick={handleLogout}>
                  로그아웃
                </Button>
              </div>
            ) : (
              <div>
                사용자 정보가 없습니다. 로그인 해주세요.
                <Link to={"/login"}>
                  <Button className="button">로그인</Button>
                </Link>
                <Link to={"/signup"}>
                  <Button className="button">회원가입</Button>
                </Link>
              </div>
            )}
          </div>
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
          }}
        >
          <Sider style={{ background: colorBgContainer }} width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%" }}
              items={items2}
            />
          </Sider>
          <Content id="content" style={{ padding: "0 24px", minHeight: 280 }}>
            <Outlet />
          </Content>
        </Layout>
      </Content>
      <Footer id="footer">
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default MainPage;
