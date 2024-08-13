import React, { useState, useEffect } from "react";
import { Card, Button, Form, notification } from "antd";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import CarAddModal from "./CarAddModal";
import CarReservationModal from "./CarReservationModal";
import axios from "axios";
import { API_URL } from "../../../config/constants";

const Car = () => {
  const [user, setUser] = useState(null);
  // ----- 차량 추가 관련 ----- //
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  // ----- 차량 추가 관련 ----- //

  // ----- 차량 예약 관련 ----- //
  const [reservationModalVisible, setReservationModalVisible] = useState(false);
  const [reservationForm] = Form.useForm();
  const [selectedCategoryId, setSelectedCategoryId] = useState(null); // 클릭한 차량의 ID
  const [carReservation, setCarReservation] = useState([]);
  // ----- 차량 예약 관련 ----- //

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    axios
      .get(`${API_URL}/carCategories/getReservation`)
      .then((result) => {
        setCarReservation(result.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (!user) {
    return <div>로딩중</div>;
  }

  // ----- 차량 추가 모달 시작 ----- //
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setIsModalVisible(false);

      await axios.post(`${API_URL}/carCategories/newCategories`, values);

      notification.success({
        message: "차량 추가 성공",
        description: "차량 추가가 성공적으로 완료되었습니다.",
      });

      form.resetFields();
    } catch (error) {
      console.error("에러가 발생하였습니다.:", error);

      notification.error({
        message: "차량 추가 실패",
        description: "차량 추가에 실패하였습니다. 다시 시도해 주세요.",
      });
    }
  };
  // ----- 차량 추가 모달 끝 ----- //

  // ----- 차량 예약 모달 시작 ----- //
  const openReservationModal = (category_id) => {
    setSelectedCategoryId(category_id); // 클릭한 차량 ID 저장
    setReservationModalVisible(true);
  };

  const closeReservationModal = () => {
    setReservationModalVisible(false);
    reservationForm.resetFields();
    setSelectedCategoryId(null); // 모달 닫을 때 ID 초기화
  };

  const reservationSubmit = async () => {
    try {
      const values = await reservationForm.validateFields();
      
      await 

      closeReservationModal();
    } catch (error) {
      console.error("예약 에러 발생:", error);

      notification.error({
        message: "차량 예약 실패",
        description: "차량 예약에 실패하였습니다. 다시 시도해 주세요.",
      });
    }
  };
  // ----- 차량 예약 모달 끝 ----- //

  const carButtonClick = (id) => {
    openReservationModal(id);
  };

  console.log(carReservation);

  return (
    <div style={{ padding: "30px" }}>
      <Card
        title="차량 예약"
        extra={
          <>
            {user.user_id === "admin" && (
              <Button
                type="default"
                icon={<EditOutlined />}
                style={{ marginRight: 8 }}
                onClick={showModal}
              >
                추가
              </Button>
            )}
          </>
        }
        style={{ marginTop: "20px" }}
      >
        <Card className="noticeBoard">
          <p style={{ fontWeight: "bold", fontSize: "17px" }}>
            차량 예약 이용 안내
          </p>
          <p>
            1. 사용 신청 이후 운영관리자에게 차키와 운행일지를 수령, 사용 후
            반납해 주세요.
          </p>
          <p>
            2. 차량 반납 시 차량내부의 쓰레기 등을 반드시 수거하여 차량 청결에
            유의해 주세요.
          </p>
          <p>3. 차량 내부에서는 절대 금연합니다. </p>
          <p>
            4. 차량이용자는 운전 전 차량의 상태 (안전사항 및 청결도)를 확인하며,
            이상이 있을 경우 즉시 운영관리자에게 연락 주세요.
          </p>
          <p>◎ 운영관리자 : 업무지원팀 ( ☎ 8888)</p>
        </Card>
        {carReservation.length > 0 ? (
          carReservation.map((category) => (
            <div key={category.category_id} className="categoryBox">
              <span>{category.category_name}</span>
              <Button
                size="small"
                onClick={() => carButtonClick(category.category_id)}
              >
                대여
              </Button>
            </div>
          ))
        ) : (
          <p>로딩중</p>
        )}
      </Card>
      <CarAddModal
        visible={isModalVisible}
        onClose={handleCancel}
        onSubmit={handleSubmit}
        form={form}
      />
      <CarReservationModal
        visible={reservationModalVisible}
        onClose={closeReservationModal}
        onSubmit={reservationSubmit}
        form={reservationForm}
        data={carReservation.find(
          (item) => item.category_id === selectedCategoryId
        )}
        user={user}
      />
    </div>
  );
};

export default Car;
