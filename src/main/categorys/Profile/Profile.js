import { useEffect, useState } from "react";
import { Table, Button } from "antd";
import "../../../css/Profile.css";
import ModalOpen, { showModal } from "./UserInformationUpdateModal";
import { openModal } from "../../../reducer/modalSlice";
import { useSelector, useDispatch } from "react-redux";

const columns = [
  {
    title: "항목",
    dataIndex: "item",
    key: "item",
  },
  {
    title: "값",
    dataIndex: "value",
    key: "value",
  },
];

const Profile = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();

  if (!userInfo) {
    return <div>로그인이 필요한 서비스 입니다.</div>;
  }

  const data = [
    { key: "1", item: "아이디", value: userInfo.user_id },
    { key: "2", item: "이름", value: userInfo.name },
    { key: "3", item: "이메일", value: userInfo.email },
    { key: "4", item: "휴대폰번호", value: userInfo.phone },
    { key: "5", item: "생년월일", value: userInfo.birthday },
    { key: "6", item: "주소", value: userInfo.address },
    { key: "7", item: "부서", value: userInfo.department },
  ];

  return (
    <div className="tableContainer">
      <h1>{userInfo.name}님의 프로필</h1>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        bordered
        showHeader={false}
        className="profileTable"
      />
      <Button className="updateBtn" onClick={() => dispatch(openModal())}>
        수정
      </Button>
      <ModalOpen />
    </div>
  );
};

export default Profile;
