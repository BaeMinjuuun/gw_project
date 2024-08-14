import { useEffect } from "react";
import axios from "axios";
import { Modal, Form, Input, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { API_URL } from "../../../config/constants";

const EditRegisterModal = ({ visible, onClose, onSubmit, resource }) => {
  const [form] = Form.useForm();

  // 폼의 초기값을 선택된 자원 정보로 설정
  useEffect(() => {
    if (resource) {
      form.setFieldsValue({
        resource_name: resource.resource_name,
        fk_category_id: resource.fk_category_id,
        description: resource.description,
        image_url: resource.image_url,
        min_value: resource.min_value,
        max_value: resource.max_value,
        resource_id: resource.resource_id,
      });
    }
  }, [resource]);

  const handleOk = () => {
    form.submit();
  };

  const onFinish = async (values) => {
    try {
      const result = await axios.put(
        `${API_URL}/resourceRegisters/updateList/${values.resource_id}`,
        values
      );
      message.success("업데이트가 완료되었습니다.");
      onClose();
    } catch (error) {
      console.error("업데이트 실패:", error);
      message.error("에러가 발생했습니다.", error);
    }
  };

  return (
    <Modal
      title="자원 수정"
      visible={visible}
      onCancel={onClose}
      onOk={handleOk}
      okText="변경"
      cancelText="취소"
    >
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item name="resource_name" label="자원 이름">
          <Input />
        </Form.Item>
        <Form.Item name="description" label="설명">
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="min_value" label="최소시간">
          <Input type="number" />
        </Form.Item>
        <Form.Item name="max_value" label="최대시간">
          <Input type="number" />
        </Form.Item>
        <Form.Item name="resource_id" noStyle>
          <Input type="hidden" />
        </Form.Item>
        <Form.Item name="fk_category_id" noStyle>
          <Input type="hidden" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditRegisterModal;
