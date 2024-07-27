import { useEffect, useState } from "react";
import { Table, Button } from "antd";
import { useDispatch } from "react-redux";
import "./Profile.css";
import ModalOpen, { showModal } from "./ModalOpen";
import { openModal } from "../../reducer/modalSlice";

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
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 사용자 정보
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }
  const data = [
    { key: "1", item: "아이디", value: user.user_id },
    { key: "2", item: "이름", value: user.name },
    { key: "3", item: "이메일", value: user.email },
    { key: "4", item: "휴대폰번호", value: user.phone },
    { key: "5", item: "생년월일", value: user.birthday },
    { key: "6", item: "주소", value: user.address },
  ];

  return (
    <div className="tableContainer">
      <h1>{user.name}님의 프로필</h1>
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
