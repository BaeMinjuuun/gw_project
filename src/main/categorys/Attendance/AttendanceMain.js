import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Progress, Table, notification } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import useRealTime from "../../../util/useRealTime";
import { API_URL } from "../../../config/constants";
import "./AttendanceMain.css";

const AttendanceMain = () => {
  const formattedTime = useRealTime();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [attendance, setAttendance] = useState(null);

  const [data, setData] = useState([
    {
      key: "1",
      clockIn: "미등록",
      clockOut: "미등록",
    },
  ]); //d

  useEffect(() => {
    // 사용자 정보
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      // 사용자 ID가 있는지 확인
      if (parsedUser.user_id) {
        axios
          .get(`${API_URL}/attendances/getAttendance`, {
            params: { user_id: parsedUser.user_id }, // 쿼리 파라미터로 user_id 전송
          })
          .then((response) => {
            setAttendance(response.data);
            setLoading(false);
          })
          .catch((error) => {
            console.error("에러 :", error);
            setLoading(false);
            notification.error({
              message: "출근 기록 조회 실패",
              description: error.message,
            });
          });
      } else {
        setLoading(false);
        notification.error({
          message: "사용자 정보 오류",
          description: "사용자 ID가 로컬 스토리지에 없습니다.",
        });
      }
    } else {
      setLoading(false);
      notification.error({
        message: "로그인 필요",
        description: "로컬 스토리지에 사용자 정보가 없습니다.",
      });
    }
  }, []);

  if (!user) {
    return <div>로그인이 필요한 서비스 입니다.</div>;
  }

  if (!attendance) {
    return <p>출근 기록이 없습니다.</p>;
  }

  const getCurrentTime = () => {
    return dayjs().toISOString();
  };

  // 출근하기 버튼 클릭 핸들러
  const handleClockIn = async () => {
    const utc = require("dayjs/plugin/utc");
    const timezone = require("dayjs/plugin/timezone");

    dayjs.extend(utc);
    dayjs.extend(timezone);
    const currentTime = dayjs().tz("Asia/Seoul").format(); // Asia/Seoul 타임존으로 시간 설정
    const currentDate = dayjs().tz("Asia/Seoul").format("YYYY-MM-DD");

    try {
      const response = await axios.post(`${API_URL}/attendances/clockin`, {
        user_id: user.user_id,
        check_in_time: currentTime,
        date: currentDate,
      });

      if (response.status === 201) {
        setData((prevData) => [
          {
            ...prevData[0],
            clockIn: currentTime,
          },
        ]);
        notification.success({
          message: "출근 성공",
          description: "출근 기록이 성공적으로 저장되었습니다.",
        });
        window.location.reload();
      }
    } catch (error) {
      console.error("출근 기록 저장에 실패했습니다.", error);
      notification.error({
        message: "출근 실패",
        description: error.response?.data || "출근 기록 저장에 실패했습니다.",
      });
    }
  };

  // 퇴근하기 버튼 클릭 핸들러
  const handleClockOut = async () => {
    const currentTime = getCurrentTime();
    const currentDate = dayjs().format("YYYY-MM-DD");

    try {
      const response = await axios.post(`${API_URL}/attendances/clockout`, {
        user_id: user.user_id,
        check_out_time: currentTime,
        date: currentDate,
      });

      if (response.status === 200) {
        setData((prevData) => [
          {
            ...prevData[0],
            clockOut: currentTime,
          },
        ]);
        notification.success({
          message: "퇴근 성공",
          description: "퇴근 기록이 성공적으로 저장되었습니다.",
        });
        window.location.reload();
      }
    } catch (error) {
      console.error("퇴근 기록 저장에 실패했습니다.", error);
      notification.error({
        message: "퇴근 실패",
        description: error.response?.data || "퇴근 기록 저장에 실패했습니다.",
      });
    }
  };

  const columns = [
    {
      title: "출근시간",
      dataIndex: "clockIn",
      key: "clockIn",
      render: (time) => (
        <div className="nowTime">
          {attendance.check_in_time
            ? dayjs(attendance.check_in_time).format("HH:mm:ss")
            : "미등록"}
        </div>
      ), // 시간 포맷팅
      className: "table-header-center",
    },
    {
      title: "퇴근시간",
      dataIndex: "clockOut",
      key: "clockOut",
      render: (time) => (
        <div className="nowTime">
          {attendance.check_out_time
            ? dayjs(attendance.check_out_time).format("HH:mm:ss")
            : "미등록"}
        </div>
      ), // 시간 포맷팅
      className: "table-header-center",
    },
  ];

  return (
    <div className="attendanceContainer">
      <div className="contents">
        <span id="title">근태관리</span>
        <div className="today">{formattedTime}</div>
        <div className="progress">
          <Progress
            type="line"
            percent={30} // 진행률 (0~100%)
            strokeColor="#1890ff" // 진행률 색상
            strokeWidth={12} // 진행률 바의 두께
            trailColor="#e6e6e6" // 배경 색상
            showInfo={false} // 진행률 텍스트 표시 여부
          />
        </div>
        <div>
          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            bordered
          />
        </div>
        <div className="buttonContainer">
          <Button className="attendanceBtn" onClick={handleClockIn}>
            출근하기
          </Button>
          <Button className="attendanceBtn" onClick={handleClockOut}>
            퇴근하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AttendanceMain;
