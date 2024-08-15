import { useState, useEffect } from "react";
import { Card, Table, Button, Form, message, Modal } from "antd";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import axios from "axios";
import { API_URL } from "../../../config/constants";
import AddRegisterModal from "./AddRegisterModal";
import ResourceDetails from "./ResourceDetails";
import EditRegisterModal from "./EditRegisterModal";
import "../../../css/ResourceManage.css";

const ResourceManage = () => {
  const [categories, setCategories] = useState([]);
  const [resourceList, setResourceList] = useState([]);
  const [selectedResource, setSelectedResource] = useState(null); // 선택된 자원 정보
  const [detailBookingList, setDetailBookingList] = useState([]);
  const [form] = Form.useForm();

  // 모달 on, off 관리 state
  const [modalState, setModalState] = useState({
    addModal: false,
    editModal: false,
  });

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
    // 이미지 안뜨는 이유 = 현재 파일이 나눠져 있기 때문에 합치면 보일것으로 예상
    {
      title: "이미지",
      dataIndex: "image_url",
      key: "image_url",
      render: (imageUrl) => (
        <img
          alt="자원 이미지"
          src={`${API_URL}/images/${imageUrl}`} // `imageUrl`을 사용하여 이미지 경로를 설정
          style={{ width: "50px", height: "50px", objectFit: "cover" }}
        />
      ),
    },
    {
      title: "수정",
      key: "edit",
      render: (record) => (
        <>
          <Button
            size="small"
            onClick={(event) => handleEditClick(event, record)}
          >
            수정
          </Button>
          <Button
            size="small"
            onClick={(event) => handleDeleteClick(event, record)}
            style={{ marginLeft: "5px" }}
          >
            삭제
          </Button>
        </>
      ),
    },
  ];

  const handleRowClick = (record) => {
    const resource_id = record.resource_id;

    axios
      .get(`${API_URL}/resourceBookings/getBookingList/${resource_id}`)
      .then((result) => {
        setDetailBookingList(result.data);
      })
      .catch((error) => {
        console.error(error);
      });

    // 클릭한 행의 데이터가 이미 선택된 자원이라면 선택 해제
    if (
      selectedResource &&
      selectedResource.resource_id === record.resource_id
    ) {
      setSelectedResource(null);
    } else {
      setSelectedResource(record); // 새로운 자원 선택
    }
  };

  // 모달관련
  const showModal = (modalType) => {
    setModalState({ ...modalState, [modalType]: true });
  };
  const handleCancel = (modalType) => {
    setModalState({ ...modalState, [modalType]: false });
  };
  const handleSubmit = async (modalType) => {
    const values = await form.validateFields();
    setModalState({ ...modalState, [modalType]: false });
  };

  // 수정 버튼 클릭시 호출
  const handleEditClick = (event, resource) => {
    event.stopPropagation();
    showModal("editModal");
    setSelectedResource(resource);
  };

  // 삭제 버튼 클릭시
  const handleDeleteClick = async (event, resource) => {
    event.stopPropagation();
    const resource_id = resource.resource_id;

    showConfirm(resource_id, async (id) => {
      try {
        const response = await axios.delete(
          `${API_URL}/resourceRegisters/deleteList/${id}`
        );
        console.log("삭제 성공:", response.data);
        message.success("자원 삭제가 완료되었습니다.");
      } catch (error) {
        console.error("삭제 실패:", error);
        message.error("삭제 중 오류가 발생했습니다.");
      }
    });
  };

  // modal confirm
  const showConfirm = (resource_id, handleDelete) => {
    Modal.confirm({
      title: "Are you sure you want to delete this item?",
      content: "This action cannot be undone.",
      okText: "Yes",
      cancelText: "No",
      onOk() {
        handleDelete(resource_id);
      },
      onCancel() {
        console.log("Cancelled");
      },
    });
  };

  return (
    <div>
      <Card
        title="자원 내역"
        extra={
          <>
            <Button
              type="primary"
              size="small"
              icon={<PlusOutlined />}
              style={{ marginLeft: "10px" }}
              onClick={() => {
                showModal("addModal");
              }}
            >
              추가
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
          className="centered-table"
        />
      </Card>
      <AddRegisterModal
        visible={modalState.addModal}
        onClose={() => {
          handleCancel("addModal");
        }}
        onSubmit={() => {
          handleSubmit("addModal");
        }}
        form={form}
        categories={categories}
      />
      {selectedResource && (
        <ResourceDetails
          data={detailBookingList}
          resource_name={selectedResource.resource_name}
        />
      )}
      <EditRegisterModal
        visible={modalState.editModal}
        onClose={() => handleCancel("editModal")}
        onSubmit={() => handleSubmit("editModal")}
        resource={selectedResource}
      />
    </div>
  );
};

export default ResourceManage;
