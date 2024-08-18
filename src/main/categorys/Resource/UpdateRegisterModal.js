import { Modal, Form, Input, Select, Button, message } from "antd";
const UpdatedRegisterModal = ({ visible, onClose, registerData }) => {
  const [form] = Form.useForm();
  console.log("registerData => ", registerData);

  const handleOk = () => {
    form.submit();
  };

  const onFinish = async (values) => {
    console.log("values => ", values);
    // try {
    //   const result = await axios.put(
    //     `${API_URL}/resourceBookings/updateBooking/${values.resource_id}`,
    //     values
    //   );
    //   message.success("업데이트가 완료되었습니다.");
    //   onClose();
    // } catch (error) {
    //   console.error("업데이트 실패:", error);
    //   message.error("에러가 발생했습니다.", error);
    // }
  };
  return (
    <Modal
      title="Update Registration"
      visible={visible}
      onCancel={onClose}
      onOk={onClose}
    >
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          label="항목"
          name="fk_category_id"
          rules={[{ required: true, message: "카테고리를 선택해주세요." }]}
        >
          <Select style={{ width: 200 }} placeholder="항목선택"></Select>
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
          <Select style={{ width: 70 }} placeholder="최소시간 선택"></Select>
        </Form.Item>
        <Form.Item
          label="최대시간"
          name="max_value"
          rules={[{ required: true, message: "최대시간을 입력해주세요." }]}
        >
          <Select style={{ width: 70 }} placeholder="최대시간 선택"></Select>
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
        ></Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdatedRegisterModal;
