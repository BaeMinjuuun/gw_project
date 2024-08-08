import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../config/constants";
import { Form, Input, Button, Select, message } from "antd";

const WriteBoard = () => {
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
    axios
      .get(`${API_URL}/categories/getCategories`)
      .then((response) => {
        console.log("data => ", response.data);
        setCategories(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>에러발생! 에러내용: {error.message}</p>;

  const handleSubmit = (values) => {
    const postData = {
      ...values,
      user_id: user?.user_id,
    };
    console.log("postData: ", postData);
    axios
      .post(`${API_URL}/posts/postWrite`, postData)
      .then((result) => {
        console.log(result);
        message.success("글쓰기가 성공적으로 완료되었습니다.");
        navigate("/mainPostsBoard", { replace: true });
      })
      .catch((error) => {
        console.error(error);
        message.error(`에러가 발생했습니다. ${error.message}`);
      });
  };

  return (
    <div>
      <h1>글쓰기</h1>
      <Form onFinish={handleSubmit}>
        <Form.Item
          name="title"
          rules={[{ required: true, message: "제목을 입력해주세요." }]}
        >
          <Input placeholder="제목" />
        </Form.Item>
        <Form.Item
          name="category_id"
          rules={[{ required: true, message: "카테고리를 선택해주세요." }]}
        >
          <Select
            placeholder="카테고리"
            style={{ width: 120 }}
            loading={loading}
            options={categories.map((category) => ({
              value: category.category_id,
              label: category.name,
            }))}
          />
        </Form.Item>
        <Form.Item
          name="content"
          rules={[{ required: true, message: "내용을 입력해주세요." }]}
        >
          <Input.TextArea placeholder="내용" rows={5} />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">글쓰기</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default WriteBoard;
