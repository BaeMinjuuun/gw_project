import { Routes, Route } from "react-router-dom";
import MainPage from "./main/MainPage";
import Signup from "./login/Signup.js";
import Login from "./login/Login";
import Profile from "./main/categorys/User/Profile/Profile";
import AttendanceRecord from "./main/categorys/Attendance/AttendanceRecord";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="attendance" element={AttendanceRecord} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
