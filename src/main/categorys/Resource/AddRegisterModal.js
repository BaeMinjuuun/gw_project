import { useState } from "react";
import { Modal, Form, Input, Select } from "antd";
const { Option } = Select;
const AddRegisterModal = ({ visible, onClose, onSubmit, form, categories }) => {
  const onFinish = (values) => {
    onSubmit(values);
  };

  const handleOk = () => {
    form.submit();
  };

  const categoryNameMap = {
    1: "회의실",
    2: "차량",
    3: "장비",
    4: "기타",
  };
  const [usage_peroid, setUsage_peroid] = useState(0);
  // 최대 이용시간
  const max_value = Array.from({ length: 11 }, (_, i) => i);
  // 최소 이용시간
  const min_value = Array.from({ length: 11 }, (_, i) => i);
  return (
    <Modal
      title="차량 추가"
      visible={visible}
      onCancel={onClose}
      onOk={handleOk}
      okText="확인"
      cancelText="취소"
    >
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          label="항목"
          name="category_id"
          rules={[{ required: true, message: "자원이름을 입력해주세요." }]}
        >
          <Select style={{ width: 200 }} placeholder="항목선택">
            {categories.map((category) => (
              <Option key={category.category_id} value={category.category_id}>
                {categoryNameMap[category.category_id] || "기타"}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="자원이름"
          name="resource_name"
          rules={[{ required: true, message: "자원이름을 입력해주세요." }]}
        >
          <Input placeholder="ex) 회의실3, 쏘렌토 2024, 빔프로젝터1" />
        </Form.Item>
        <Form.Item label="최소시간" name="min_value">
          <Select
            defaultValue={1}
            style={{ width: 70 }}
            onChange={(value) => setUsage_peroid(value)}
          >
            {max_value.map((number2) => (
              <Option key={number2} value={number2}>
                {number2}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddRegisterModal;
