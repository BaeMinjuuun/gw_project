import { useState, useEffect } from "react";
import { Button, Progress, Table } from "antd";
import dayjs from "dayjs";
import useRealTime from "../../../util/useRealTime";

const AttendanceMain = () => {
  const formattedTime = useRealTime();
  const [user, setUser] = useState(null);

  const [data, setData] = useState([
    {
      key: "1",
      clockIn: "미등록",
      clockOut: "미등록", // 예시로 퇴근시간을 고정값으로 설정
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
    return dayjs().format("HH:mm:ss");
  };

  // 출근하기 버튼 클릭 핸들러
  const handleClockIn = () => {
    setData((prevData) => [
      {
        ...prevData[0],
        clockIn: getCurrentTime(), // 출근시간 업데이트
      },
    ]);
  };

  // 퇴근하기 버튼 클릭 핸들러
  const handleClockOut = () => {
    setData((prevData) => [
      {
        ...prevData[0],
        clockOut: getCurrentTime(), // 퇴근시간 업데이트 (원하는 로직으로 변경 가능)
      },
    ]);
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
