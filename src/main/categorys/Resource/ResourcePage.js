import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Card, Col, Row } from "antd";
import { API_URL } from "../../../config/constants";

const ResourcePage = () => {
  const { id } = useParams(); // URL에서 category_id 추출

  const [categoryData, setCategoryData] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/resourceCategories/getCategory/${id}`)
      .then((result) => {
        setCategoryData(result.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  if (!categoryData) {
    return <div>로딩중</div>;
  }

  // console.log("DATA => ", categoryData);
  // {fk_user_id: 'zxnm46', booking_id: 1, fk_resource_id: 17, start_time: '2024-08-16T13:00:00.000Z', end_time: '2024-08-16T16:00:00.000Z', …}

  return (
    <div style={{ padding: "20px" }}>
      <Row gutter={16}>
        <Col span={6}></Col>
        <Col span={18}>
          <Card style={{ marginBottom: "20px" }}>
            <div>카테고리 이름넣기</div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ResourcePage;
