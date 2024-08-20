import React, { useState, useEffect } from "react";
import { Button, Collapse, Table, Card } from "antd";
import axios from "axios";
import moment from "moment";
import "moment/locale/ko";
import { useSelector } from "react-redux";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import "../../../css/MyAttendance.css";
import "antd/dist/reset.css";
import { API_URL } from "../../../config/constants";

const { Panel } = Collapse;

moment.locale("ko");

const MyAttendance = () => {
  const [thisMonth, setThisMonth] = useState(moment().format("YYYY-MM"));
  const [attendanceData, setAttendanceData] = useState([]);

  const userInfo = useSelector((state) => state.user.userInfo);
  const user_id = userInfo.user_id;

  useEffect(() => {
    const fetchAttendanceData = async () => {
      console.log("THISMONTH => ", thisMonth);
      try {
        const response = await axios.get(
          `${API_URL}/attendances/getAttendancesByMonth`,
          {
            params: { user_id: user_id, thisMonth: thisMonth },
          }
        );
        setAttendanceData(response.data);
        console.log("ATTENDANCEDATA => ", response.data);
      } catch (error) {
        console.error("근무 내역을 가져오는 데 오류가 발생했습니다.", error);
      }
    };

    fetchAttendanceData();
  }, [thisMonth]);

  const handleMonthChange = (months) => {
    const newMonth = moment(thisMonth).add(months, "months").format("YYYY-MM");
    setThisMonth(newMonth);
  };

  // 주차별 데이터 그룹화
  const groupedData = attendanceData.reduce((acc, record) => {
    const weekOfMonth =
      moment(record.date).week() -
      moment(record.date).startOf("month").week() +
      1;
    if (!acc[weekOfMonth]) {
      acc[weekOfMonth] = [];
    }
    acc[weekOfMonth].push(record);
    return acc;
  }, {});

  // 시간 포맷팅 함수
  const formatTime = (dateTime) => {
    if (!dateTime) return "N/A";
    return moment(dateTime).format("HH:mm:ss");
  };

  // 날짜와 요일 포맷팅 함수
  const formatDateWithDay = (date) => {
    if (!date) return "N/A";
    return moment(date).format("YYYY-MM-DD (ddd)"); // 일자 (요일) 형식으로 포맷
  };

  // 하루의 근무 시간을 계산하는 함수
  const calculateWorkHours = (checkInTime, checkOutTime) => {
    if (!checkInTime || !checkOutTime) return 0;
    const checkIn = moment(checkInTime);
    const checkOut = moment(checkOutTime);
    const duration = moment.duration(checkOut.diff(checkIn));
    return duration.asHours();
  };

  // 패널
  const renderPanels = () => {
    const totalWeeks = 5;
    let panels = [];
    for (let week = 1; week <= totalWeeks; week++) {
      panels.push(
        <Panel header={`Week ${week}`} key={week}>
          <Table
            dataSource={groupedData[week] || []}
            pagination={false}
            rowKey="id"
            columns={[
              {
                title: "일자",
                dataIndex: "date",
                key: "date",
                align: "center",
                render: formatDateWithDay,
              },
              {
                title: "출근 시간",
                dataIndex: "check_in_time",
                key: "check_in_time",
                align: "center",
                render: formatTime,
              },
              {
                title: "퇴근 시간",
                dataIndex: "check_out_time",
                key: "check_out_time",
                align: "center",
                render: formatTime,
              },
              {
                title: "누적 시간",
                dataIndex: "total_time",
                key: "total_time",
                align: "center",
              },
            ]}
          />
        </Panel>
      );
    }
    return panels;
  };

  // 예시 데이터 (주 및 월 통계)
  const data = {
    weekTotal: "12:30",
    weekOvertime: "03:45",
    weekRemaining: "00:00",
    monthTotal: "50:00",
    monthOvertime: "15:00",
  };

  return (
    <div className="myAttendanceListContainer">
      <div className="totalContainer">
        <Card title="이번주 누적" bordered={false}>
          <h2>{data.weekTotal}</h2>
        </Card>
        <Card title="이번주 초과" bordered={false}>
          <h2>{data.weekOvertime}</h2>
        </Card>
        <Card title="이번주 잔여" bordered={false}>
          <h2>{data.weekRemaining}</h2>
        </Card>
        <Card title="이번달 누적" bordered={false}>
          <h2>{data.monthTotal}</h2>
        </Card>
        <Card title="이번달 연장" bordered={false}>
          <h2>{data.monthOvertime}</h2>
        </Card>
      </div>
      <div className="monthContainer">
        <Button size="small" onClick={() => handleMonthChange(-1)}>
          <LeftOutlined />
        </Button>
        <div className="dateSpan">
          <span>{thisMonth}</span>
        </div>
        <Button size="small" onClick={() => handleMonthChange(1)}>
          <RightOutlined />
        </Button>
      </div>
      <div style={{ marginTop: "10px" }}>
        <Collapse>{renderPanels()}</Collapse>
      </div>
    </div>
  );
};

export default MyAttendance;
