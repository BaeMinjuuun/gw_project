import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../../config/constants";
import { Card, Button, Form, notification } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ConferenceRoomModal from "./ConferenceRoomModal";
import "./ConferenceRoom.css";

const ConferenceRoom = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [form] = Form.useForm();
  const [user, setUser] = useState(null); // 사용자 정보
  const [roomReservation, setRoomReservation] = useState([]); // 예약현황

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    axios
      .get(`${API_URL}/reservationCategories/getCategories`)
      .then((result) => {
        setCategories(result.data);
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get(`${API_URL}/reservations/getRoomReservation`)
      .then((result) => {
        setRoomReservation(result.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  console.log("RoomReservation => ", roomReservation);

  // 데이터를 category_id 기준으로 그룹화
  const groupedReservations = roomReservation.reduce((acc, roomReservation) => {
    const { category_id } = roomReservation;
    if (!acc[category_id]) {
      acc[category_id] = [];
    }
    acc[category_id].push(roomReservation);
    return acc;
  }, {});

  console.log("groupedReservations => ", groupedReservations);

  if (!categories) {
    return <div>로딩중</div>;
  }

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setIsModalVisible(false);

      const formatTime = (time) => (time ? time.format("HH:mm") : "");

      const { room, date, time, purpose } = values;
      const [start_time, end_time] = time;
      const storedUser = user.user_id;

      const submitData = {
        status: "예약됨",
        user_id: storedUser,
        start_time: formatTime(start_time),
        end_time: formatTime(end_time),
        category_id: room,
        date: date.format("YYYY-MM-DD"),
        purpose,
      };
      console.log("submitData => ", submitData);

      await axios.post(`${API_URL}/reservations/request`, submitData);

      // 예약 성공 후 카테고리 상태 업데이트
    await axios.patch(`${API_URL}/reservationCategories/${room}`, {
      status: "예약됨",
    });

      notification.success({
        message: "예약 성공",
        description: "회의실 예약이 성공적으로 완료되었습니다.",
      });

      form.resetFields();
    } catch (error) {
      console.error("예약 실패:", error);
      notification.error({
        message: "예약 실패",
        description:
          error.response?.data?.message || "예약 중 문제가 발생했습니다.",
      });
    }
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
        {categories.length > 0 ? (
          categories.map((category) => (
            <div className="categoryBox" key={category.category_id}>
              <span className="categoryName">{category.category_name}</span>

              <span className="reservationDetails">
                {groupedReservations[category.category_id]?.length > 0 ? (
                  groupedReservations[category.category_id].map(
                    (reservation) => (
                      <div
                        key={reservation.reservation_id}
                        className="reservationList"
                      >
                        <span>예약자: {reservation.user_id} </span>
                        <br />
                        <span>
                          일자: {reservation.date}
                          <br />
                          시간: {reservation.start_time} -{" "}
                          {reservation.end_time}
                        </span>
                        <br />
                        <span> 목적: {reservation.purpose}</span>
                      </div>
                    )
                  )
                ) : (
                  <p>예약 없음</p>
                )}
              </span>

              <span className="categoryStatus"></span>
            </div>
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
