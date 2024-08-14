import { useState, useEffect } from "react";
import { Modal, Form, Input, Select, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { API_URL } from "../../../config/constants";

const { Option } = Select;

const AddRegisterModal = ({ visible, onClose, onSubmit, form, categories }) => {
  const [minValueOptions, setMinValueOptions] = useState([]);
  const [maxValueOptions, setMaxValueOptions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  const onFinish = (values) => {
    axios
      .post(`${API_URL}/resourceRegisters/upload`, values)
      .then((response) => {
        console.log(response.data);
        onSubmit(values);
        window.location.href("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleOk = () => {
    form.submit();
  };

  const handleCategoryChange = (categoryId) => {
    const category = categories.find((cat) => cat.category_id === categoryId);

    if (category) {
      setSelectedCategory(categoryId);

      // 최대값에 따라 최소값 범위 계산
      const maxOptions = Array.from(
        { length: category.max_value + 1 },
        (_, i) => i
      );

      const minOptions = Array.from(
        { length: category.max_value },
        (_, i) => i
      ).filter((value) => value <= category.max_value - 1);

      setMinValueOptions(minOptions);
      setMaxValueOptions(maxOptions);
    }
  };

  useEffect(() => {
    if (categories.length > 0) {
      // 기본 카테고리의 min_value와 max_value로 초기화
      handleCategoryChange(categories[0].category_id);
    }
  }, [categories]);

  const handleChange = (info) => {
    if (info.fileList.length > 0) {
      const file = info.fileList[0].originFileObj;
      const objectUrl = URL.createObjectURL(file);
      setImagePreviewUrl(objectUrl); // 미리보기 URL 설정
    } else {
      setImagePreviewUrl(""); // 파일이 없으면 미리보기 URL 초기화
    }
  };

  return (
    <Modal
      title="자원 추가"
      visible={visible}
      onCancel={onClose}
      onOk={handleOk}
      okText="확인"
      cancelText="취소"
    >
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          label="항목"
          name="fk_category_id"
          rules={[{ required: true, message: "카테고리를 선택해주세요." }]}
        >
          <Select
            style={{ width: 200 }}
            placeholder="항목선택"
            onChange={handleCategoryChange}
          >
            {categories.map((category) => (
              <Option key={category.category_id} value={category.category_id}>
                {category.category_name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="자원이름"
          name="resource_name"
          rules={[{ required: true, message: "자원이름을 입력해주세요." }]}
        >
          <Input placeholder="ex) 회의실3, 쏘렌토 2024, 빔프로젝터1" />
        </Form.Item>
        <Form.Item
          label="최소시간"
          name="min_value"
          rules={[{ required: true, message: "최소시간을 입력해주세요." }]}
        >
          <Select style={{ width: 70 }} placeholder="최소시간 선택">
            {minValueOptions.map((value) => (
              <Option key={value} value={value}>
                {value}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="최대시간"
          name="max_value"
          rules={[{ required: true, message: "최대시간을 입력해주세요." }]}
        >
          <Select style={{ width: 70 }} placeholder="최대시간 선택">
            {maxValueOptions.map((value) => (
              <Option key={value} value={value}>
                {value}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="설명"
          name="description"
          rules={[
            {
              required: true,
              message: "해당 항목의 설명을 기재해주세요.",
            },
          ]}
        >
          <Input.TextArea
            placeholder="ex) 청결유지요망, 차량주의사항 등"
            rows={2}
          />
        </Form.Item>
        <Form.Item label="이미지" name="image_url">
          <Upload
            listType="picture"
            showUploadList={false}
            onChange={handleChange} // 이미지 변경 시 호출되는 핸들러
          >
            <Button icon={<UploadOutlined />}>업로드</Button>
          </Upload>
          {imagePreviewUrl && (
            <div style={{ marginTop: "10px" }}>
              <img
                src={imagePreviewUrl}
                alt="이미지 미리보기"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
            </div>
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddRegisterModal;
