export const formatPhoneNumber = (value) => {
  // 숫자만 필터링
  const digits = value.replace(/\D/g, "");

  // 하이픈 삽입
  if (digits.length < 4) {
    return digits;
  }
  if (digits.length < 7) {
    return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  }
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`;
};
