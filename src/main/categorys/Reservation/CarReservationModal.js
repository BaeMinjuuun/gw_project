import { useEffect, useState } from "react";
import { Modal, Form, Input, DatePicker, Select, TimePicker } from "antd";
import "../../../css/CarReservationModal.css";

const { Option } = Select;

const CarReservationModal = ({
  visible,
  onClose,
  onSubmit,
  form,
  data,
  user,
}) => {
  const [passenger, setPassenger] = useState(0); // 탑승 인원 저장
  const [usage_peroid, setUsage_peroid] = useState(0); // 대여일
  const onFinish = (values) => {
    onSubmit(values);
  };

  const handleOk = () => {
    form.submit();
    console.log("passenger => ", passenger);
    console.log("usage_peroid => ", usage_peroid);
  };

  if (!data) {
    return <div>로딩중</div>;
  }
  console.log("data => ", data);
  if (!user) {
    return <div>로딩중</div>;
  }

  const numbers = Array.from({ length: 11 }, (_, i) => i);
  const numbers2 = Array.from({ length: 11 }, (_, i) => i);

  return (
    <Modal
      title="차량 예약"
      visible={visible}
      onCancel={onClose}
      onOk={handleOk}
      okText="확인"
      cancelText="취소"
    >
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          label="차량명 :"
          name="car_name"
          initialValue={data.category_name}
        >
          <span>{data.category_name}</span>
        </Form.Item>
        <Form.Item
          label="차량 설명 :"
          name="description"
          initialValue={data.description}
        >
          <span>{data.description}</span>
        </Form.Item>
        <Form.Item
          name="rental_date"
          label="대여일자"
          rules={[{ required: true, message: "날짜 선택을 해주세요." }]}
        >
          <DatePicker format="YYYY-MM-DD" style={{ width: 120 }} />
        </Form.Item>
        <Form.Item
          label="탑승 인원 :"
          name="passenger"
          rules={[{ required: true, message: "탑승인원을 선택해주세요" }]}
        >
          <Select
            defaultValue={0}
            style={{ width: 120 }}
            onChange={(value) => setPassenger(value)}
          >
            {numbers.map((number) => (
              <Option key={number} value={number}>
                {number}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="dispatch_datetime"
          label="출발시간"
          rules={[{ required: true, message: "시간을 선택해주세요." }]}
        >
          <TimePicker format="YYYY-MM-DD HH:mm" style={{ width: 120 }} />
        </Form.Item>
        <Form.Item
          label="대여기간(일단위) :"
          name="usage_peroid"
          rules={[{ required: true, message: "대여기간을 선택해주세요" }]}
        >
          <Select
            defaultValue={0}
            style={{ width: 120 }}
            onChange={(value) => setUsage_peroid(value)}
          >
            {numbers.map((number2) => (
              <Option key={number2} value={number2}>
                {number2}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="차량고유번호 :"
          name="category_id"
          initialValue={data.category_id}
        >
          <span>{data.category_id}</span>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CarReservationModal;
