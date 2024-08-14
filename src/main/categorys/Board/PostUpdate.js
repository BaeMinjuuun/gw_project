// import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "antd";
import "../../../css/PostDetail.css";

const PostUpdate = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <div>
      <Card title={`사내 게시판 >`}>
        <Card>
          <div className="postContent">
            <span></span>
          </div>
          <div className="postInfo"></div>
        </Card>
      </Card>
    </div>
  );
};

export default PostUpdate;
