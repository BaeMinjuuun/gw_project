import React, { useState, useEffect } from "react";
import { Table, Button, Collapse, DatePicker } from "antd";
import moment from "moment";
import "moment/locale/ko";
import { useSelector } from "react-redux";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import axios from "axios"; // axios import 추가
import { API_URL } from "../../../config/constants";
import "../../../css/MyAttendance.css";

const { Panel } = Collapse;
const { MonthPicker } = DatePicker;

moment.locale("ko");

const AttendanceTracker = () => {
  const [weeklyData, setWeeklyData] = useState({});
  const [currentDate, setCurrentDate] = useState(moment());
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  const userInfo = useSelector((state) => state.user.userInfo);

  // 주차별 데이터 가져오기
  const fetchWeeklyData = async () => {
    const startOfMonth = currentDate
      .clone()
      .startOf("month")
      .format("YYYY-MM-DD");
    const endOfMonth = currentDate.clone().endOf("month").format("YYYY-MM-DD");
    const user_id = userInfo.user_id;

    console.log("startOfMonth => ", startOfMonth);
    console.log("endOfMonth => ", endOfMonth);
    console.log("user_id => ", user_id);

    try {
      // axios를 사용하여 API 호출
      const response = await axios.get(`${API_URL}/attendances/getMyRecord`, {
        params: {
          user_id: user_id,
          start_date: startOfMonth,
          end_date: endOfMonth,
        },
      });

      const data = response.data;

      // 데이터 확인
      console.log("data => ", data);

      // 데이터가 객체일 때, 배열로 변환
      const entries = Object.values(data).flat();
      console.log("entries => ", entries);

      // 데이터가 배열인지 확인
      if (!Array.isArray(entries)) {
        console.error("에러내용 :", entries);
        return;
      }

      // 주차별 데이터 가공
      const groupedData = entries.reduce((acc, entry) => {
        const weekNumber = moment(entry.date).week();
        const weekKey = `week${weekNumber}`;
        if (!acc[weekKey]) acc[weekKey] = [];
        acc[weekKey].push({
          id: entry.id,
          user_id: entry.user_id,
          date: moment(entry.date).format("YYYY-MM-DD (dd)"),
          check_in_time: entry.check_in_time,
          check_out_time: entry.check_out_time,
          total_hours: calculateHours(
            entry.check_in_time,
            entry.check_out_time
          ),
        });
        return acc;
      }, {});

      console.log("groupedData => ", groupedData);

      setWeeklyData(groupedData);
    } catch (error) {
      console.error("에러내용 :", error);
    }
  };

  useEffect(() => {
    fetchWeeklyData();
  }, [currentDate, userInfo.user_id]);

  const handlePrevMonth = () => {
    setCurrentDate(currentDate.clone().subtract(1, "months"));
  };

  const handleNextMonth = () => {
    setCurrentDate(currentDate.clone().add(1, "months"));
  };

  const handleDateChange = (date) => {
    setCurrentDate(date);
    setIsDatePickerVisible(false);
  };

  // 시간 계산 함수
  const calculateHours = (checkInTime, checkOutTime) => {
    const format = "HH:mm";
    const checkIn = moment(checkInTime, format);
    const checkOut = moment(checkOutTime, format);
    const duration = moment.duration(checkOut.diff(checkIn));
    return duration.asHours().toFixed(1); // 소수점 1자리까지
  };

  // 테이블 컬럼 정의
  const columns = [
    { title: "일자", dataIndex: "date", key: "date", align: "center" },
    {
      title: "업무시작",
      dataIndex: "check_in_time",
      key: "check_in_time",
      align: "center",
    },
    {
      title: "업무종료",
      dataIndex: "check_out_time",
      key: "check_out_time",
      align: "center",
    },
    {
      title: "총근무시간",
      dataIndex: "total_hours",
      key: "total_hours",
      align: "center",
    },
    { title: "기타", dataIndex: "", key: "", align: "center" },
  ];

  return (
    <div className="myAttendanceListContainer">
      <div className="monthContainer">
        <Button size="small" onClick={handlePrevMonth}>
          <LeftOutlined />
        </Button>
        <div className="dateSpan">
          <span onClick={() => setIsDatePickerVisible(true)}>
            {currentDate.format("YYYY-MM")}
          </span>
        </div>
        {isDatePickerVisible && (
          <MonthPicker
            defaultValue={currentDate}
            onChange={handleDateChange}
            open={true}
            onOpenChange={(open) => setIsDatePickerVisible(open)}
            style={{ position: "absolute", zIndex: 1000 }}
          />
        )}
        <Button size="small" onClick={handleNextMonth}>
          <RightOutlined />
        </Button>
      </div>
      <div style={{ marginTop: "10px" }}>
        <Collapse>
          {Object.keys(weeklyData).map((week, index) => (
            <Panel header={`${index + 1}주차`} key={week}>
              <Table
                dataSource={weeklyData[week]}
                columns={columns}
                pagination={false}
                rowKey="id"
                className="myAttendanceTable"
              />
            </Panel>
          ))}
        </Collapse>
      </div>
    </div>
  );
};

export default AttendanceTracker;
