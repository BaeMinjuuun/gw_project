import { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { Card, List, Typography, Button, Pagination } from "antd";
import { Link } from "react-router-dom";
import "../../../css/MainPostsBoard.css";
import { API_URL } from "../../../config/constants";

const { Title } = Typography;

const MainPostsBoard = () => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const postsPerPage = 5; // 페이지당 게시물 수

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/posts/getPosts`, {
          params: {
            page: currentPage,
            limit: postsPerPage,
          },
        });
        setPosts(response.data.posts);
        // console.log("response.data.posts =>", response.data.posts);
        setTotalPosts(response.data.totalPosts);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchPosts();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>에러발생! 에러내용: {error.message}</p>;
  return (
    <div className="boardContainer">
      <Card title="사내 게시판" bordered={true}>
        <Link to={"/writeBoard"}>
          <Button className="writeBtn">글쓰기</Button>
        </Link>

        <List
          itemLayout="horizontal"
          dataSource={posts}
          renderItem={(item, index) => (
            <Link className="postListLink" to={`/postDetail/${item.post_id}`}>
              <List.Item>
                <List.Item.Meta
                  title={
                    <Title level={4}>{`${
                      (currentPage - 1) * postsPerPage + index + 1
                    }. ${item.title}`}</Title>
                  }
                  description={item.content}
                />
                <div>
                  <p>
                    작성자: {item.user_id} {item.User.department}
                  </p>
                  <p>
                    작성일자:{""}
                    {dayjs(item.created_at).format("YYYY-MM-DD HH:mm:ss")}
                  </p>
                </div>
              </List.Item>
            </Link>
          )}
        />
      </Card>

      <Pagination
        align="center"
        current={currentPage}
        pageSize={postsPerPage}
        total={totalPosts}
        onChange={handlePageChange}
      />
    </div>
  );
};
export default MainPostsBoard;
