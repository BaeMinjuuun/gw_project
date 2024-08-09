import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, Button } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { API_URL } from "../../../config/constants";
import "./PostDetail.css";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    axios
      .get(`${API_URL}/posts/getPostDetail/${id}`)
      .then((result) => {
        setPost(result.data);
        console.log("post => ", post);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  console.log("post => ", post);
  if (!post) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Card title={`사내 게시판 > ${post.Category.name}`}>
        <Card title={post.title}>
          <div className="postContent">
            <span>{post.content}</span>
          </div>
          <div className="postInfo">
            <p>작성자 : {post.User.department}/{post.user_id}</p>
            <p>
              작성일자: {dayjs(post.created_at).format("YYYY-MM-DD HH:mm:ss")}
            </p>
          </div>
        </Card>
      </Card>
      {user.user_id === post.user_id ? <Button>수정</Button> : null}
    </div>
  );
};

export default PostDetail;
