import { useState, useEffect } from "react";
import dayjs from "dayjs";
import "dayjs/locale/ko"; // 한국어 로케일을 불러옵니다

const useRealTime = () => {
  const [formattedTime, setFormattedTime] = useState(() => {
    const now = dayjs();
    return now.locale("ko").format("YYYY년 MM월 DD일 (ddd) HH:mm:ss");
  });

  useEffect(() => {
    const updateTime = () => {
      const now = dayjs();
      setFormattedTime(
        now.locale("ko").format("YYYY년 MM월 DD일 (ddd) HH:mm:ss")
      );
    };

    // 1초마다 updateTime 함수 호출
    const intervalId = setInterval(updateTime, 1000);

    // 컴포넌트 언마운트 시 interval 클리어
    return () => clearInterval(intervalId);
  }, []);

  return formattedTime;
};

export default useRealTime;
