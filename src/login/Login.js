import { useState } from "react";
import { Input, Button, message } from "antd";
import axios from "axios";
import { API_URL } from "../config/constants";
import "./Login.css";

const Login = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!userId || !password) {
      message.error("아이디와 비밀번호를 입력해 주세요.");
      return;
    }

    // 로그인 요청
    axios
      .post(`${API_URL}/auth/login`, { user_id: userId, password })
      .then((result) => {
        message.success("로그인 성공!");
        console.log("RESULT DATA: ", result.data);
        const { token, user } = result.data;

        // 로컬 스토리지에 저장
        localStorage.setItem("token", token); // JWT 토큰 저장
        localStorage.setItem("user", JSON.stringify(user)); // 사용자 정보 저장
        window.location.href = "/mainHome";
      })
      .catch((error) => {
        console.error(error);
        message.error(
          "로그인 실패: ",
          error.response?.data?.message || error.message
        );
      });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleLogin();
    }
  };

  return (
    <div style={{ maxWidth: "300px", margin: "0 auto", padding: "20px" }}>
      <Input
        placeholder="아이디"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        style={{ marginBottom: "10px" }}
        onKeyDown={handleKeyDown}
        autoCoplete="on"
      />
      <Input.Password
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button className="loginBtn" type="primary" onClick={handleLogin}>
        로그인
      </Button>
    </div>
  );
};

export default Login;
