import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, message, Button, Modal, DatePicker } from "antd";
import axios from "axios";
import { API_URL } from "../config/constants";
import "./Signup.css";
import DaumPostCode from "../util/DaumPostCode";
import { formatPhoneNumber } from "../util/formatPhoneNumber";

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
  const [form] = Form.useForm();
  const [checkId, setCheckId] = useState(false); // 아이디 중복 여부 상태
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  // 아이디 중복 검사
  const checkUserId = (userId) => {
    axios
      .post(`${API_URL}/check-user-id`, { user_id: userId })
      .then((response) => {
        message.success(response.data);
        setCheckId(true);
      })
      .catch((error) => {
        message.error(
          error.response?.data || "아이디 중복 검사에 문제가 생겼습니다."
        );
        setCheckId(false);
      });
  };

  // 중복 검사 버튼 핸들러
  const handleCheckUserId = () => {
    const userId = form.getFieldValue("user_id");
    if (userId) {
      checkUserId(userId);
    } else {
      message.warning("아이디를 입력해주세요.");
    }
  };

  // 비밀번호 유효성 검사
  const checkPassword = (_, value) => {
    // 정규 표현식: 10자 이상, 대소문자 구분 없이 숫자와 특수문자 조합
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;
    if (!value) {
      return Promise.reject("비밀번호를 입력해주세요.");
    }
    if (!passwordRegex.test(value)) {
      return Promise.reject(
        "비밀번호는 최소 10자 이상이어야 하며, 대소문자 구분 없이 숫자와 특수 문자를 포함해야 합니다."
      );
    }
    return Promise.resolve();
  };

  // 비밀번호 확인 유효성 검사 함수
  const validateConfirmPassword = (_, value) => {
    const password = form.getFieldValue("password");
    if (value && value !== password) {
      return Promise.reject("비밀번호가 일치하지 않습니다.");
    }
    return Promise.resolve();
  };

  const handleAddressComplete = (address) => {
    setAddress(address);
    setIsModalVisible(false);
    form.setFieldsValue({ address }); // 폼에 주소 값 설정
  };

  const onSubmit = (values) => {
    if (!checkId) {
      message.error("아이디 중복 검사를 먼저 수행해주세요.");
      return;
    }
    // 서버로 보낼 데이터 준비
    const userData = {
      user_id: values.user_id,
      password: values.password,
      name: values.name,
      phone: formatPhoneNumber(values.phone),
      address: values.address,
      email: values.email,
      birthday: values.birthday.format("YYYY-MM-DD"),
    };

    axios
      .post(`${API_URL}/users`, userData)
      .then((result) => {
        console.log("회원가입 성공: ", result);
        message.success("회원가입이 성공적으로 완료되었습니다.");
        navigate("/", { replace: true });
      })
      .catch((error) => {
        console.error(error);
        message.error(`에러가 발생했습니다. ${error.message}`);
      });
  };

  return (
    <Form
      {...formItemLayout}
      className="signupContainer"
      onFinish={onSubmit}
      form={form} // Form 인스턴스를 지정합니다.
    >
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
        <div className="formItemFlex">
          <Input style={{ width: "70%" }} />
          <Button
            style={{ marginLeft: "10px" }}
            size="small"
            onClick={handleCheckUserId}
          >
            중복 검사
          </Button>
        </div>
      </Form.Item>

      <Form.Item
        label="비밀번호"
        name="password"
        rules={[
          {
            required: true,
            message: "비밀번호를 입력해주세요.",
          },
          {
            validator: checkPassword,
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="비밀번호 확인"
        name="confirm"
        dependencies={["password"]}
        rules={[
          {
            required: true,
            message: "비밀번호를 다시 입력해주세요.",
          },
          {
            validator: validateConfirmPassword,
          },
        ]}
      >
        <Input.Password />
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
        <Input placeholder="010-1234-5678" />
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
        <div className="formItemFlex">
          <Input value={address} readOnly />
          <Button
            style={{ marginLeft: "10px" }}
            size="small"
            onClick={() => setIsModalVisible(true)}
          >
            주소 검색
          </Button>
        </div>
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

      <Form.Item
        label="생년월일"
        name="birthday"
        rules={[
          {
            required: true,
            message: "생년월일을 입력해주세요.",
          },
        ]}
      >
        <DatePicker />
      </Form.Item>

      <Form.Item>
        <Button id="submit-button" size="large" htmlType="submit">
          회원가입
        </Button>
      </Form.Item>
      <Modal
        title="주소 검색"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <DaumPostCode onComplete={handleAddressComplete} />
      </Modal>
    </Form>
  );
};

export default Signup;
