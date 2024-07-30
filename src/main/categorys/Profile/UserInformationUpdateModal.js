import { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Form, Input, Typography, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../../../reducer/modalSlice";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../config/constants";
import "./ModalOpen.css";

const UserInformationUpdateModal = () => {
  const [form] = Form.useForm();
  const isModalOpen = useSelector((state) => state.modal.isModalOpen);
  const [checkId, setCheckId] = useState(false); // 아이디 중복 여부 상태
  const [isUserIdValid, setIsUserIdValid] = useState(true); // 아이디 유효성 상태
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [fields, setFields] = useState({
    user_id: false,
    email: false,
    phone: false,
  });
  const [formValues, setFormValues] = useState({
    new_user_id: "",
    new_email: "",
    new_phone: "",
  });
  const [isFormChanged, setIsFormChanged] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const hasChanges = Object.values(formValues).some((value) => value !== "");
    setIsFormChanged(hasChanges);
  }, [formValues]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const { name, user_id, email, phone } = user;
  const { Text } = Typography;

  const resetFormAndFields = () => {
    form.resetFields();
    setFields({
      user_id: false,
      email: false,
      phone: false,
    });
  };

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    resetFormAndFields();
    dispatch(closeModal());
  };

  const handleFieldChangeClick = (field) => {
    setFields((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const checkPassword = (_, value) => {
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

  const handleFormChange = (changedValues) => {
    setFormValues((prev) => ({ ...prev, ...changedValues }));
  };

  // 아이디 중복 검사
  const checkUserId = (userId) => {
    axios
      .post(`${API_URL}/users/check-user-id`, { user_id: userId })
      .then((response) => {
        message.success(response.data);
        setIsUserIdValid(true);
        setCheckId(true);
      })
      .catch((error) => {
        message.error(
          error.response?.data || "아이디 중복 검사에 문제가 생겼습니다."
        );
        setIsUserIdValid(false);
        setCheckId(false);
      });
  };

  // 중복 검사 버튼 핸들러
  const handleCheckUserId = () => {
    const userId = form.getFieldValue("new_user_id");
    if (userId) {
      checkUserId(userId);
    } else {
      message.warning("아이디를 입력해주세요.");
    }
  };

  const onSubmit = async (values) => {
    if (!checkId) {
      message.error("아이디 중복 검사를 먼저 수행해주세요.");
      return;
    }
    try {
      const { new_user_id } = values;

      // 아이디를 변경하려는 경우
      if (fields.user_id && new_user_id) {
        const response = await fetch(`${API_URL}/users/updateUserId`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: user.user_id, new_user_id }),
        });

        const result = await response.json();

        if (response.ok) {
          console.log("Update successful:", result);
          window.location.href = "/";
        } else {
          console.error("Update failed:", result);
        }
      }

      resetFormAndFields();
      dispatch(closeModal());
      message.success({
        content: (
          <div>
            아이디 변경이 완료되었습니다.
            <br />
            새로고침을 해주세요.
          </div>
        ),
        duration: 3,
      });
      localStorage.removeItem("user");
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
      message.error(`에러가 발생했습니다. ${error.message}`);
    }
  };

  return (
    <Modal
      title="개인정보 수정"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okButtonProps={{ disabled: !isFormChanged || !isUserIdValid }}
    >
      <Form onFinish={onSubmit} form={form} onValuesChange={handleFormChange}>
        <Form.Item label="아이디">
          <div>
            <Text className="formText">{user_id}</Text>
            <Button
              className="changeBtn"
              onClick={() => handleFieldChangeClick("user_id")}
            >
              변경
            </Button>
          </div>
        </Form.Item>
        {fields.user_id && (
          <Form.Item label="새 아이디" name="new_user_id">
            <div className="formItemFlex">
              <Input
                name="new_user_id"
                value={formValues.new_user_id}
                onChange={(e) =>
                  handleFormChange({ new_user_id: e.target.value })
                }
              />
              <Button size="small" onClick={handleCheckUserId}>
                중복검사
              </Button>
            </div>
          </Form.Item>
        )}

        <Form.Item
          label="비밀번호"
          name="password"
          rules={[
            {
              validator: checkPassword,
            },
          ]}
        >
          <Input.Password autoComplete="current-password" />
        </Form.Item>

        <Form.Item label="이메일">
          <div>
            <Text className="formText">{email}</Text>
            <Button
              className="changeBtn"
              onClick={() => handleFieldChangeClick("email")}
            >
              변경
            </Button>
          </div>
        </Form.Item>
        {fields.email && (
          <Form.Item label="새 이메일" name="new_email">
            <Input
              name="new_email"
              value={formValues.new_email}
              onChange={(e) => handleFormChange({ new_email: e.target.value })}
            />
          </Form.Item>
        )}

        <Form.Item label="휴대폰번호">
          <div>
            <Text className="formText">{phone}</Text>
            <Button
              className="changeBtn"
              onClick={() => handleFieldChangeClick("phone")}
            >
              변경
            </Button>
          </div>
        </Form.Item>
        {fields.phone && (
          <Form.Item label="새 휴대폰번호" name="new_phone">
            <Input
              name="new_phone"
              value={formValues.new_phone}
              onChange={(e) => handleFormChange({ new_phone: e.target.value })}
            />
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};

export default UserInformationUpdateModal;
