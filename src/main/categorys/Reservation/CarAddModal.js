import React from "react";
import { Modal, Form, Input } from "antd";

const CarAddModal = ({ visible, onClose, onSubmit, form }) => {
  const onFinish = (values) => {
    onSubmit(values);
  };

  const handleOk = () => {
    form.submit();
  };

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
          label="차량명"
          name="category_name"
          rules={[{ required: true, message: "차량명을 입력해 주세요!" }]}
        >
          <Input placeholder="ex) 쏘렌토 1004(차량번호)" />
        </Form.Item>
        <Form.Item
          label="차량 설명"
          name="description"
          rules={[
            {
              required: true,
              message: "차량 설명이 필요합니다. ex) 차량번호, 상태 등",
            },
          ]}
        >
          <Input.TextArea placeholder="ex) 차량번호, 상태 등" rows={5} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CarAddModal;
