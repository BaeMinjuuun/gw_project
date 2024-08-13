import { useEffect, useState } from "react";
import { Card, Descriptions } from "antd";
import "../../../css/ResourceDetails.css";
const ResourceDetails = ({ data }) => {
  return (
    <Card title="자원 세부정보" style={{ marginTop: "20px" }}>
      <Descriptions bordered>
        <Descriptions.Item label="자원 이름">
          {data.resource_name}
        </Descriptions.Item>
        <Descriptions.Item label="분류코드">
          {data.fk_category_id}
        </Descriptions.Item>
        <Descriptions.Item label="최소시간">{data.min_value}</Descriptions.Item>
        <Descriptions.Item label="최대시간">{data.max_value}</Descriptions.Item>
        <Descriptions.Item label="설명">{data.description}</Descriptions.Item>
        <Descriptions.Item label="이미지">
          <img
            alt="자원 이미지"
            src={data.image_url}
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default ResourceDetails;
