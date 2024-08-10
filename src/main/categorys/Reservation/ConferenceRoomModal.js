import { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  DatePicker,
  TimePicker,
  Select,
  Button,
} from "antd";

const { Option } = Select;

const ConferenceRoomModal = ({ visible, onClose, onOk, categories, form }) => {
  return (
    <Modal
      title="회의실 예약"
      visible={visible}
      onOk={onOk}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={onOk}>
        <Form.Item
          name="room"
          label="회의실 목록"
          rules={[{ required: true, message: "회의실 선택을 해주세요." }]}
        >
          <Select placeholder="회의실 선택">
            {categories.length > 0 ? (
              categories.map((category) => (
                <Option key={category.category_id} value={category.category_id}>
                  {category.category_name}
                </Option>
              ))
            ) : (
              <Option disabled>데이터 로딩 중</Option>
            )}
          </Select>
        </Form.Item>
        <Form.Item
          name="date"
          label="Date"
          rules={[{ required: true, message: "날짜 선택을 해주세요." }]}
        >
          <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          name="time"
          label="Time"
          rules={[{ required: true, message: "시간을 선택해주세요." }]}
        >
          <TimePicker.RangePicker format="HH:mm" style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item name="purpose" label="목적">
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ConferenceRoomModal;
