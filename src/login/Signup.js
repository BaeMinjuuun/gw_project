import React, { useState, useEffect } from "react";
import { DatePicker, Form, Input } from "antd";
import axios from "axios";
import "./Signup.css";
const { RangePicker } = DatePicker;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 14,
    },
  },
};

const Signup = () => {
  return (
    <Form {...formItemLayout} variant="filled" className="signupContainer">
      <Form.Item
        label="아이디"
        name="user_id"
        rules={[
          {
            required: true,
            message: "아이디를 입력해주세요.",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="비밀번호"
        name="password"
        rules={[
          {
            required: true,
            message: "비밀번호를 입력해주세요.",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="이름"
        name="name"
        rules={[
          {
            required: true,
            message: "이름을 입력해주세요.",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="휴대폰번호"
        name="phone"
        rules={[
          {
            required: true,
            message: "휴대폰번호를 입력해주세요.",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="주소"
        name="address"
        rules={[
          {
            required: true,
            message: "주소를 입력해주세요.",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="이메일"
        name="email"
        rules={[
          {
            required: true,
            message: "이메일을 입력해주세요.",
          },
        ]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
};

export default Signup;
