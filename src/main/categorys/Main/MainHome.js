// src/components/MainHome.js
import React from "react";
import "./MainHome.css";
import { Card } from "antd";
import Board from "../Board/RecentPostsBoard";

const MainHome = () => {
  return (
    <div>
      <div className="topPlace">
        <div className="profile">
          <Card title="프로필" style={{ marginBottom: 20 }}>
            <p>이름: 홍길동</p>
            <p>부서: 개발팀</p>
            <p>직급: 대리</p>
          </Card>
        </div>
        <div className="board">
          <Board />
        </div>
      </div>
    </div>
  );
};

export default MainHome;
