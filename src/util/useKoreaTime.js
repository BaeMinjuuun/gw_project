import moment from "moment-timezone";

function useKoreaTime() {
  return moment().tz("Asia/Seoul").format("YYYY-MM-DD HH:mm:ss");
}

console.log(`현재 한국 시간: ${useKoreaTime()}`);

export default useKoreaTime;
