import { useState, useEffect } from "react";
import { Modal, Button, Form, Input, Typography } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../../reducer/modalSlice";
import "./ModalOpen.css";

const UserInformationUpdateModal = () => {
  const [form] = Form.useForm();
  const isModalOpen = useSelector((state) => state.modal.isModalOpen);
  const dispatch = useDispatch();

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
    // 사용자 정보
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

  const { name, email, phone } = user;
  const { Text } = Typography;

  const handleOk = () => {
    form.submit();
    dispatch(closeModal());
  };

  const handleCancel = () => {
    dispatch(closeModal());
  };

  const handleFieldChangeClick = (field) => {
    setFields((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  // 비밀번호 유효성 검사
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

  // 폼 값 변경 핸들러
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  // 여기서부터**** 변경 요청된 정보 업데이트 하기!!!!
  const onSubmit = (values) => {
    alert(values.new_user_id);
  };

  return (
    <Modal
      title="개인정보 수정"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okButtonProps={{ disabled: !isFormChanged }}
    >
      <Form onFinish={onSubmit} form={form}>
        <Form.Item label="아이디" name="user_id">
          <Text className="formText">{name}</Text>
          <Button
            className="changeBtn"
            onClick={() => handleFieldChangeClick("user_id")}
          >
            변경
          </Button>
        </Form.Item>
        {fields.user_id && (
          <Form.Item label="새 아이디" name="new_user_id">
            <Input
              name="new_user_id"
              value={formValues.new_user_id}
              onChange={handleFormChange}
            />
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
          <Input.Password />
        </Form.Item>

        <Form.Item label="이메일" name="email">
          <Text className="formText">{email}</Text>
          <Button
            className="changeBtn"
            onClick={() => handleFieldChangeClick("email")}
          >
            변경
          </Button>
        </Form.Item>
        {fields.email && (
          <Form.Item label="새 이메일" name="new_email">
            <Input
              name="new_email"
              value={formValues.new_email}
              onChange={handleFormChange}
            />
          </Form.Item>
        )}

        <Form.Item label="휴대폰번호" name="phone">
          <Text className="formText">{phone}</Text>
          <Button
            className="changeBtn"
            onClick={() => handleFieldChangeClick("phone")}
          >
            변경
          </Button>
        </Form.Item>
        {fields.phone && (
          <Form.Item label="새 휴대폰번호" name="new_phone">
            <Input
              name="new_phone"
              value={formValues.new_phone}
              onChange={handleFormChange}
            />
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};

export default UserInformationUpdateModal;
