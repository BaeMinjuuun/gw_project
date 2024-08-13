import React from "react";
import { Card, Table } from "antd";
import "../../../css/ResourceDetails.css";

const ResourceDetails = ({ data }) => {
  const columns = [
    { title: "예약자", dataIndex: "resource_name", key: "resource_name" },
    { title: "예약일자", dataIndex: "fk_category_id", key: "fk_category_id" },
    { title: "시작시간", dataIndex: "min_value", key: "min_value" },
    { title: "종료시간", dataIndex: "max_value", key: "max_value" },
    { title: "목적", dataIndex: "description", key: "description" },
  ];

  const dataSource = [
    {
      key: 1,
      resource_name: "data.resource_name",
      fk_category_id: "data.fk_category_id",
      min_value: "data.min_value",
      max_value: "data.max_value",
      description: "data.description",
      image_url: "data.image_url",
    },
  ];

  return (
    <Card title="자원 세부정보" style={{ marginTop: "20px" }}>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        rowKey="key"
        className="centered-table"
      />
    </Card>
  );
};

export default ResourceDetails;
