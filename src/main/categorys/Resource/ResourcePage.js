import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Card, Button, Table, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { API_URL } from "../../../config/constants";
import "../../../css/ResourceDetails.css";
import { useSelector } from "react-redux";
import BookingModal from "./BookingModal";

const ResourcePage = () => {
  const { id } = useParams(); // URL에서 category_id 추출
  const [categoryInfo, setCategoryInfo] = useState({}); // 대카테고리
  const [categoryNames, setCategoryNames] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false); // 모달 표시 여부
  const [registers, setRegisters] = useState([]); // 리소스 등록 데이터 저장
  const [resources, setResources] = useState([]); // 모든 리소스 저장
  const userInfo = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    // 해당 카테고리별 데이터 가져오기
    axios
      .get(`${API_URL}/resourceCategories/getCategoryList/${id}`)
      .then((result) => {
        setCategoryNames(result.data);
        setResources(result.data); // 모든 리소스를 저장

        const fetchRegisterPromises = result.data.map((item) =>
          axios.get(
            `${API_URL}/resourceRegisters/getRegisterList/${item.resource_id}`
          )
        );
        Promise.all(fetchRegisterPromises)
          .then((responses) => {
            // 모든 응답 데이터를 배열로 저장
            const registerData = responses.flatMap((response) => response.data);
            const formattedData = registerData.map((reg) => ({
              ...reg,
              date: reg.start_time.substring(0, 10),
              start_time: reg.start_time
                .split("T")[1]
                .split(":")
                .slice(0, 2)
                .join(":"),
              end_time: reg.end_time
                .split("T")[1]
                .split(":")
                .slice(0, 2)
                .join(":"),
            }));
            setRegisters(formattedData);
          })
          .catch((error) => {
            console.error("등록 데이터 가져오는 중 오류 발생:", error);
          });
      })
      .catch((error) => {
        console.error(error);
      });

    // 해당 카테고리 이름 가져오기
    axios
      .get(`${API_URL}/resourceCategories/getCategoryName/${id}`)
      .then((result) => {
        setCategoryInfo(result.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const columns = [
    {
      title: "예약자ID",
      dataIndex: "fk_user_id",
      key: "fk_user_id",
    },
    {
      title: "예약일자",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "시작시간",
      dataIndex: "start_time",
      key: "start_time",
    },
    {
      title: "종료시간",
      dataIndex: "end_time",
      key: "end_time",
    },
    {
      title: "목적",
      dataIndex: "purpose",
      key: "purpose",
    },
    {
      title: "삭제",
      key: "delete",
      render: (text, record) =>
        userInfo && userInfo.user_id === record.fk_user_id ? (
          <>
            <Button size="small">수정</Button>
            <Button
              size="small"
              style={{ marginLeft: "5px" }}
              onClick={() => {
                handleDelete(record.booking_id);
              }}
            >
              삭제
            </Button>
          </>
        ) : null,
    },
  ];

  const handleDelete = (booking_id) => {
    try {
      axios
        .delete(`${API_URL}/resourceBookings/deleteBooking/${booking_id}`)
        .then(() => {
          // 삭제 후 데이터 갱신
          const updatedRegisters = registers.filter(
            (reg) => reg.booking_id !== booking_id
          );
          setRegisters(updatedRegisters);
          message.success("자원 삭제가 완료되었습니다.");
        });
    } catch (error) {
      console.error("삭제 중 오류 발생:", error);
      message.error("삭제 중 오류가 발생했습니다.");
    }
  };

  // 예약모달 열기
  const handleModalOpen = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <div style={{ padding: "30px" }}>
      <Card
        style={{ marginBottom: "20px" }}
        title={categoryInfo.category_name}
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleModalOpen}
          >
            예약
          </Button>
        }
      >
        {categoryNames.length > 0
          ? categoryNames.map((resource) => (
              <Card key={resource.resource_id} title={resource.resource_name}>
                <Table
                  dataSource={registers.filter(
                    (reg) => reg.fk_resource_id === resource.resource_id
                  )}
                  pagination={false}
                  columns={columns}
                  className="centered-table"
                ></Table>
              </Card>
            ))
          : null}
      </Card>
      {isModalVisible && (
        <BookingModal
          visible={isModalVisible}
          onClose={handleModalClose}
          resources={resources}
          id={id}
        />
      )}
    </div>
  );
};

export default ResourcePage;
