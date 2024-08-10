import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import axios from "axios";
import { API_URL } from "../../../config/constants";
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
import ConferenceRoomModal from "./ConferenceRoomModal";
// react time range Selector
const { Option } = Select;

const ConferenceRoom = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [form] = Form.useForm();
  const [formData, setFormdata] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/reservationCategories/getCategories`)
      .then((result) => {
        setCategories(result.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  console.log("CATEGORIES => ", categories);
  if (!categories) {
    return <div>로딩중</div>;
  }

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
        setFormdata(values);
        form.resetFields();
        console.log("FORMDATA => ", formData);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  console.log("FORMDATA => ", formData);
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
        {categories.length > 0 ? (
          categories.map((category) => (
            <p key={category.category_id}>{category.category_name}</p>
          ))
        ) : (
          <p>로딩중</p>
        )}
      </Card>

      <ConferenceRoomModal
        visible={isModalVisible}
        onClose={handleCancel}
        onOk={handleOk}
        categories={categories}
        form={form}
      />
    </div>
  );
};

export default ConferenceRoom;
