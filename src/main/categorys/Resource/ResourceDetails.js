import { useEffect, useState } from "react";
import { Card, Table } from "antd";
import "../../../css/ResourceDetails.css";

const ResourceDetails = ({ data, resource_name }) => {
  const columns = [
    { title: "예약자", dataIndex: "fk_user_id", key: "fk_user_id" },
    { title: "예약일자", dataIndex: "date", key: "date" },
    { title: "시작시간", dataIndex: "start_time", key: "start_time" },
    { title: "종료시간", dataIndex: "end_time", key: "end_time" },
    { title: "목적", dataIndex: "purpose", key: "purpose" },
  ];

  const dataSource = data.map((data) => ({
    key: data.booking_id,
    fk_user_id: data.fk_user_id,
    date: data.start_time.substring(0, 10),
    start_time: data.start_time.split("T")[1].split(":").slice(0, 2).join(":"),
    end_time: data.end_time.split("T")[1].split(":").slice(0, 2).join(":"),
    purpose: data.purpose,
    image_url: "data.image_url",
  }));

  return (
    <Card title={resource_name} style={{ marginTop: "20px" }}>
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
