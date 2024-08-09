import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import {
  Calendar,
  Card,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  TimePicker,
  Select,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

const ConferenceRoom = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const onDateChange = (date) => {
    setSelectedDate(date);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("Success:", values);
        setIsModalVisible(false);
        form.resetFields();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div style={{ padding: "30px" }}>
      <Card
        title="회의실 목록"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
            예약
          </Button>
        }
        style={{ marginTop: "20px" }}
      >
        <p>Room 1</p>
        <p>Room 2</p>
        <p>Room 3</p>
      </Card>

      <Modal
        title="회의실 예약"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleOk}>
          <Form.Item
            name="room"
            label="회의실 목록"
            rules={[{ required: true, message: "회의실 선택을 해주세요." }]}
          >
            <Select placeholder="회의실 선택">
              <Option value="room1">Room 1</Option>
              <Option value="room2">Room 2</Option>
              <Option value="room3">Room 3</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="date"
            label="Date"
            rules={[{ required: true, message: "날짜 선택을 해주세요." }]}
          >
            <DatePicker
              defaultValue={selectedDate}
              format="YYYY-MM-DD"
              style={{ width: "100%" }}
            />
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
    </div>
  );
};

export default ConferenceRoom;
