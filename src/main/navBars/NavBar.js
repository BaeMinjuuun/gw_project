import { Link } from "react-router-dom";

// items1: 상단 메뉴 항목
const items1 = [
  {
    key: "home",
    label: <Link to="/mainHome">Home</Link>,
  },
  {
    key: "about",
    label: "About",
  },
  {
    key: "contact",
    label: "Contact",
  },
];

export default items1;
