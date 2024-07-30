import { useState, useEffect } from "react";
import { Button, Progress, Table, notification } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import useRealTime from "../../../util/useRealTime";
import { API_URL } from "../../../config/constants";
import "./AttendanceMain.css";

const AttendanceMain = () => {
  const formattedTime = useRealTime();
  const [user, setUser] = useState(null);

  const [data, setData] = useState([
    {
      key: "1",
      clockIn: "미등록",
      clockOut: "미등록",
    },
  ]);

  useEffect(() => {
    // 사용자 정보
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return <div>로그인이 필요한 서비스 입니다.</div>;
  }

  const getCurrentTime = () => {
    return dayjs().toISOString();
  };

  // 출근하기 버튼 클릭 핸들러
  const handleClockIn = async () => {
    const currentTime = getCurrentTime();
    const currentDate = dayjs().format("YYYY-MM-DD");

    try {
      const response = await axios.post(`${API_URL}/attendance/clockin`, {
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
      const response = await axios.post(`${API_URL}/attendance/clockout`, {
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
      render: (time) => <div className="nowTime">{time}</div>, // 시간 포맷팅
      className: "table-header-center",
    },
    {
      title: "퇴근시간",
      dataIndex: "clockOut",
      key: "clockOut",
      render: (time) => <div className="nowTime">{time}</div>, // 시간 포맷팅
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
