// BookingModal.js
import { useState } from "react";
import { Modal, Form, Input, TimePicker, Button, message, Select } from "antd";
import axios from "axios";
import { API_URL } from "../../../config/constants";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

const BookingModal = ({ visible, onClose, resources }) => {
  const [form] = Form.useForm();
  const userInfo = useSelector((state) => state.user.userInfo);
  const [existingBookings, setExistingBookings] = useState(null);
  // 항목 선택 시 실시간 예약 내역 조회
  const handleResourceChange = (value) => {
    if (value) {
      axios
        .get(`${API_URL}/resourceBookings/getRegisterTime/${value}`)
        .then((response) => {
          setExistingBookings(response.data);
        })
        .catch((error) => {
          console.error("예약 내역 가져오는 중 오류 발생:", error);
        });
    }
  };

  // 시간 겹침 확인 함수
  const isTimeOverlapping = (
    newStartTime,
    newEndTime,
    existingStartTime,
    existingEndTime
  ) => {
    return newStartTime < existingEndTime && newEndTime > existingStartTime;
  };

  const handleFormSubmit = (values) => {
    const [startMoment, endMoment] = values.timeValues;
    console.log("startMoment => ", startMoment);
    console.log("endMoment => ", endMoment);

    const formattedStartTime = startMoment.format("YYYY-MM-DD HH:mm:ss");
    const formattedEndTime = endMoment.format("YYYY-MM-DD HH:mm:ss");
    console.log("formattedStartTime => ", formattedStartTime);
    console.log("formattedEndTime => ", formattedEndTime);

    const submitData = {
      fk_resource_id: values.fk_resource_id,
      start_time: formattedStartTime,
      end_time: formattedEndTime,
      fk_user_id: userInfo.user_id,
      purpose: values.purpose,
    };
    axios
      .post(`${API_URL}/resourceBookings/addBooking`, submitData)
      .then((result) => {
        console.log(result);
        message.success("예약이 성공적으로 완료되었습니다.");
        onClose();
      })
      .catch((error) => {
        console.error(error);
        message.error(`에러가 발생했습니다. ${error.message}`);
      });
  };

  const handleTimeChange = (value) => {
    const newStartTime = dayjs(value[0]);
    const newEndTime = dayjs(value[1]);
    existingBookings.forEach((booking) => {
      const existingStartTime = booking.start_time;
      const existingEndTime = booking.end_time;

      if (
        isTimeOverlapping(
          newStartTime,
          newEndTime,
          existingStartTime,
          existingEndTime
        )
      ) {
        console.log("예약 불가: 선택한 시간대가 기존 예약과 겹칩니다.");
      } else {
        console.log("예약 가능: 선택한 시간대는 기존 예약과 겹치지 않습니다.");
      }
    });
  };

  console.log(resources);

  return (
    <Modal title="예약하기" visible={visible} onCancel={onClose} footer={null}>
      <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
        <Form.Item
          name="fk_resource_id"
          label="예약 항목"
          rules={[{ required: true, message: "예약항목을 선택해주세요" }]}
        >
          <Select
            placeholder="예약항목을 선택하세요"
            style={{ width: 120 }}
            onChange={handleResourceChange}
          >
            {resources.map((resource) => (
              <Select.Option
                key={resource.resource_id}
                value={resource.resource_id}
              >
                {resource.resource_name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="시간 설정"
          name="timeValues"
          rules={[{ required: true, message: "시작 시간을 선택해주세요." }]}
        >
          <TimePicker.RangePicker
            format="HH:mm"
            style={{ width: "100%" }}
            onChange={handleTimeChange}
          />
        </Form.Item>

        <Form.Item
          label="목적"
          name="purpose"
          rules={[{ required: true, message: "목적을 입력해주세요." }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            예약
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default BookingModal;
