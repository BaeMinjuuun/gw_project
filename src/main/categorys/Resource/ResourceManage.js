import { useState, useEffect } from "react";
import { Card, Table, Button, Form } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import "../../../css/ResourceManage.css";
import { API_URL } from "../../../config/constants";
import AddRegisterModal from "./AddRegisterModal";
import ResourceDetails from "./ResourceDetails";

const ResourceManage = () => {
  const [categories, setCategories] = useState([]);
  const [resourceList, setResourceList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false); // 모달 on, off
  const [selectedResource, setSelectedResource] = useState(null); // 선택된 자원 정보
  const [form] = Form.useForm();

  useEffect(() => {
    // 자원내역 가져오기
    axios
      .get(`${API_URL}/resourceRegisters/getResourceList`)
      .then((result) => {
        setResourceList(result.data);
      })
      .catch((error) => {
        console.error(error);
      });

    // 자원카테고리 가져오기
    axios
      .get(`${API_URL}/resourceCategories/getCategories`)
      .then((result) => {
        setCategories(result.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (!categories || !resourceList) {
    return <div>로딩중</div>;
  }

  const columns = [
    {
      title: "자원 이름",
      dataIndex: "resource_name",
      key: "resource_name",
    },
    {
      title: "분류코드",
      dataIndex: "fk_category_id",
      key: "fk_category_id",
    },
    {
      title: "최소시간",
      dataIndex: "min_value",
      key: "min_value",
    },
    {
      title: "최대시간",
      dataIndex: "max_value",
      key: "max_value",
    },
    {
      title: "설명",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "이미지",
      dataIndex: "image_url",
      key: "image_url",
      render: () => (
        <img alt="자원 이미지" style={{ width: "50px", height: "50px" }} />
      ),
    },
  ];

  const handleRowClick = (record) => {
    setSelectedResource(record); // 클릭한 행의 데이터 저장
  };

  // 모달관련
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleSubmit = async () => {
    const values = await form.validateFields();
    setIsModalVisible(false);
    console.log("FORM VALUES => ", values);
  };

  return (
    <div>
      <Card
        title="자원 내역"
        extra={
          <>
            <Button size="small">메뉴항목 수정</Button>
            <Button
              type="primary"
              size="small"
              icon={<PlusOutlined />}
              style={{ marginLeft: "10px" }}
            >
              선택사항수정
            </Button>
          </>
        }
        style={{ marginTop: "20px" }}
      >
        <Table
          columns={columns}
          dataSource={resourceList}
          rowKey="resource_id"
          pagination={false}
          onRow={(record) => ({
            onClick: () => handleRowClick(record), // 클릭 시 처리할 함수
          })}
        />
        <Button
          style={{ float: "right", marginTop: "10px" }}
          onClick={showModal}
        >
          추가
        </Button>
      </Card>
      <AddRegisterModal
        visible={isModalVisible}
        onClose={handleCancel}
        onSubmit={handleSubmit}
        form={form}
        categories={categories}
      />
      {selectedResource && <ResourceDetails data={selectedResource} />}
    </div>
  );
};

export default ResourceManage;
