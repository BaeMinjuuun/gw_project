import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Button } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { API_URL } from "../../../config/constants";
import "./PostDetail.css";

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
